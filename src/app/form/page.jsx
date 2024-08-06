"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import ImagePreview from '../components/ImagePreview';
import StrictModeDroppable from '../components/StrictModeDroppable';
import { addReview } from '../../app/utils';
import Image from 'next/image';
import CustomTextArea from '../components/CustomTextArea';
import NormalTextArea from '../components/NormalTextArea';
import Modal from '../components/Modal';
import generateImage from '../api/image/generateImage';
import { generateMultipleAIImages } from '../api/image/generateAIImage';
import uploadFileToSupabase from '../api/image/uploadFileToSupabase';
import LoadingStatus from '../components/LoadingStatus';
import { useAuth } from '@/context/AuthContext';
import { useUserData } from '@/context/UserContext';

const callApiWithLogging = async (name, apiCall, updateApiCallStatus) => {
  updateApiCallStatus(name, true);

  try {
    const response = await apiCall();
    updateApiCallStatus(name, false);
    return response;
  } catch (error) {
    updateApiCallStatus(name, false, true);
    throw error;
  }
};

export default function Form() {
  const [token, setToken] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [product_description, setProductDescription] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [length, setLength] = useState('');
  const [video_description, setVideoDescription] = useState('');
  const [doRelight, setDoRelight] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiCalls, setApiCalls] = useState([]);
  const router = useRouter();
  const showExampleModalRef = useRef(null);
  const { user } = useAuth();
  const { setUserId, setImageIds, setNoBgImageIds, setHasProductIndexes } = useUserData();

  useEffect(() => {
    const checkIfInputsAreFilled = () => {
      if (title && width && height && length && product_description && images.length > 0) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };

    checkIfInputsAreFilled();
  }, [title, width, height, length, product_description]);

  const updateApiCallStatus = (name, isLoading, isError = false) => {
    setApiCalls((prevCalls) => {
      const index = prevCalls.findIndex((call) => call.name === name);
      const newCall = { name, isLoading, isError };
      if (index === -1) {
        return [...prevCalls, newCall];
      } else {
        const updatedCalls = [...prevCalls];
        updatedCalls[index] = newCall;
        return updatedCalls;
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const readerPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises)
        .then((newImages) => {
          setImages((prevImages) => {
            const combinedImages = [...prevImages, ...newImages];
            return combinedImages.slice(0, 5);
          });
        })
        .catch((error) => {
          console.error('Error reading files', error);
        });
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setImages(reorderedImages);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      id: `${Date.now()}`,
      title,
      product_description,
      video_description,
      width,
      height,
      length,
      images,
    };

    try {
      const response = await callApiWithLogging(
        'Adding Review API',
        () => addReview(formData, user, images),
        updateApiCallStatus
      );

      const combinedResponse = await callApiWithLogging(
        'Generating Image API',
        () => beginGeneration(response),
        updateApiCallStatus
      );

      // use the imported methods to save user data to the context
      setUserId(user);
      setImageIds(combinedResponse.imageIds);
      setNoBgImageIds(combinedResponse.noBgImageIds);
      setHasProductIndexes(combinedResponse.hasProducts);

      // route to next page
      router.push(`/review/${response.script_id}`);
    } catch (error) {
      console.error('Error processing request', error);
    }
  };

  const mergeAndSortBySceneNumbers = async (responseObj, AIResponseObj, sortedSceneNumbers) => {
    const combinedResponse = {};

    Object.keys(responseObj).forEach(async key => {
      if (key !== 'sceneNumbers' && key !== 'bgRemovedImageIds') {
        combinedResponse[key] = await sortedSceneNumbers.map(sceneNumber => {
          const index = responseObj.sceneNumbers.indexOf(sceneNumber);
          if (index !== -1) {
            return responseObj[key][index];
          } else {
            const aiIndex = AIResponseObj.sceneNumbers.indexOf(sceneNumber);
            if (aiIndex !== -1) {
              return AIResponseObj[key][aiIndex];
            } else {
              return null;
            }
          }
        });
      }
    });
    return combinedResponse;
  };

  const beginGeneration = async (generated_script) => {
    try {
      const uploadedFilesURLs = await callApiWithLogging(
        'Uploading File to Supabase API',
        () => uploadFileToSupabase(user, images, 'image/jpeg'),
        updateApiCallStatus
      );

      const response = await callApiWithLogging(
        'Generating Image API',
        () => generateImage(
          user,
          title,
          width,
          height,
          product_description,
          uploadedFilesURLs,
          doRelight,
          false,
          [],
          generated_script.narration_script,
          generated_script.script_id,
        ),
        updateApiCallStatus
      );

      const AIImageResponse = await callApiWithLogging(
        'Generating Multiple AI Images API',
        () => generateMultipleAIImages(
          generated_script.narration_script,
          user,
          generated_script.script_id
        ),
        updateApiCallStatus
      );

      const sortedSceneNumbers = [...response.sceneNumbers, ...AIImageResponse.sceneNumbers].sort((a, b) => a - b);

      const combinedResponse = await callApiWithLogging(
        'Merging and Sorting by Scene Numbers',
        () => mergeAndSortBySceneNumbers(response, AIImageResponse, sortedSceneNumbers),
        updateApiCallStatus
      );
      
      // let combinedResponse = await mergeAndSortBySceneNumbers(response, AIImageResponse, sortedSceneNumbers);
      combinedResponse.bgRemovedImageIds = response.bgRemovedImageIds;

      return combinedResponse;
    } catch (error) {
      console.error('Error generating image', error);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center p-24">
      {isLoading ? (
        <LoadingStatus apiCalls={apiCalls} />
      ) : (
        <div className={`w-full max-w-2xl flex flex-col justify-center items-center ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
          <div className="pb-10">
            <Image src="/images/arcticons_form.svg" width={82} height={82} alt="form icon" />
          </div>
          <div className="mb-10">
            <DragDropContext onDragEnd={onDragEnd}>
              <StrictModeDroppable droppableId="droppable">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-wrap"
                  >
                    {images.map((image, index) => (
                      <Draggable key={index} draggableId={`${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ImagePreview
                              index={index}
                              image={image}
                              removeImage={removeImage}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-xl w-full">
            <input
              disabled={images.length >= 5}
              onChange={handleImageUpload}
              className="block p-2 border border-[#949494] rounded-lg w-full"
              id="multiple_files"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              multiple
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="p-2 border border-[#949494] rounded-lg w-full"
            />
            <NormalTextArea
              value={product_description}
              onChange={setProductDescription}
              placeholder="Product Description"
            />
            <CustomTextArea
              value={video_description}
              onChange={setVideoDescription}
              onClick={(e) => {
                e.preventDefault();
                showExampleModalRef.current.showModal();
              }}
              placeholder="(Optional) Describe what kind of video you want."
            />
            <div className="flex space-x-2 w-full">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width"
                className="p-2 border border-[#949494] rounded-lg flex-1 min-w-0"
              />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height"
                className="p-2 border border-[#949494] rounded-lg flex-1 min-w-0"
              />
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Length"
                className="p-2 border border-[#949494] rounded-lg flex-1 min-w-0"
              />
            </div>
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className={`p-2 w-1/2 bg-[#4F4CDB] rounded text-white ${isButtonDisabled ? "opacity-60" : ""}`}
                disabled={isButtonDisabled}
              >
                Generate & Edit
              </button>
            </div>
          </form>
        </div>
      )}
      <Modal
        ref={showExampleModalRef}
        title="Try this example!"
        onCancel={() => showExampleModalRef.current.closeModal()}
        outerClassName="bg-white"
        titleClassName="text-black"
      >
        <p className='text-black'>You will be charged after this point and cannot revert your action. Do you want to proceed with this information?</p>
      </Modal>
    </main>
  );
}
