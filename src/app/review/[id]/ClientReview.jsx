"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import Modal from '../../components/Modal';
import StrictModeDroppable from '../../components/StrictModeDroppable';
import { getReview, getAllScripts, getImages } from '../../utils';
import Image from 'next/image';
import Loading from '@/app/loading';
import generateImage from '@/app/api/image/generateImage';
import { getImage } from '@/app/db/image';
import { useAuth } from '@/context/AuthContext';
import { useUserData } from '@/context/UserContext';
import generateDubbing from '@/app/api/audio/generateDubbing';
import generateFinalVideo from '@/app/api/video/generateFinalVideo';
import generateBgmusic from '@/app/api/audio/generateBgmusic';
import ToggleColorList from '@/app/components/Dropdown';
import tinycolor from "tinycolor2";

export default function ClientReview({ params }) {
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [hasProductImages, setHasProductImages] = useState([]);
  const [confirmedImages, setConfirmedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [musicUrl, setMusicUrl] = useState('');
  const [selectedMusic, setSelectedMusic] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [bgRemovedImageIds, setBgRemovedImageIds] = useState([]);
  const [dubbing, setDubbing] = useState('');
  const [imageScriptText, setImageScriptText] = useState('');
  const showImageModalRef = useRef(null);
  const showFinalSubmitModalRef = useRef(null);
  const showMusicListModalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedVoice, setSelectedVoice] = useState('');
  const [selectedVoiceAudio, setSelectedVoiceAudio] = useState('');
  const audioRef = useRef(null);
  const [modalDataLoading, setModalDataLoading] = useState(false);
  const { user } = useAuth();
  const [selectedFont, selectedSetFont] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState(0);
  const [bgmusicScript, setBgmusicScript] = useState("");
  const [colorList ,setColorList] = useState([]);
  const [selectedColor, setSelectedColor] = useState(colorList[0]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // const [selectedColor, setSelectedColor] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const rawColorList = "b'AliceBlue', b'AntiqueWhite', b'aqua', b'aquamarine', b'azure', b'beige', b'bisque', b'black', b'BlanchedAlmond', b'blue', b'BlueViolet', b'brown', b'burlywood', b'CadetBlue', b'chartreuse', b'chocolate', b'coral', b'CornflowerBlue', b'cornsilk', b'crimson', b'cyan', b'DarkBlue', b'DarkCyan', b'DarkGoldenrod', b'DarkGoldenrod1', b'DarkGoldenrod2', b'DarkGoldenrod3', b'DarkGoldenrod4', b'DarkGray', b'DarkGreen', b'DarkGrey', b'DarkKhaki', b'DarkMagenta', b'DarkOliveGreen', b'DarkOliveGreen1', b'DarkOliveGreen2', b'DarkOliveGreen3', b'DarkOliveGreen4', b'DarkOrange', b'DarkOrange1', b'DarkOrange2', b'DarkOrange3', b'DarkOrange4', b'DarkOrchid', b'DarkOrchid1', b'DarkOrchid2', b'DarkOrchid3', b'DarkOrchid4', b'DarkRed', b'DarkSalmon', b'DarkSeaGreen', b'DarkSeaGreen1', b'DarkSeaGreen2', b'DarkSeaGreen3', b'DarkSeaGreen4', b'DarkSlateBlue', b'DarkSlateGray1', b'DarkSlateGray2', b'DarkSlateGray3', b'DarkSlateGray4', b'DarkSlateGrey', b'DarkTurquoise', b'DarkViolet', b'DeepPink', b'DeepPink1', b'DeepPink2', b'DeepPink3', b'DeepPink4', b'DeepSkyBlue', b'DeepSkyBlue1', b'DeepSkyBlue2', b'DeepSkyBlue3', b'DeepSkyBlue4', b'DimGrey', b'DodgerBlue', b'DodgerBlue1', b'DodgerBlue2', b'DodgerBlue3', b'DodgerBlue4', b'firebrick', b'firebrick1', b'firebrick2', b'firebrick3', b'firebrick4', b'FloralWhite', b'ForestGreen', b'fuchsia', b'gainsboro', b'GhostWhite', b'gold', b'gold1', b'gold2', b'gold3', b'gold4', b'goldenrod', b'goldenrod1', b'goldenrod2', b'goldenrod3', b'goldenrod4', b'gray', b'gray', b'gray0', b'gray1', b'gray10', b'gray100', b'gray100', b'gray11', b'gray12', b'gray13', b'gray14', b'gray15', b'gray16', b'gray17', b'gray18', b'gray19', b'gray2', b'gray20', b'gray21', b'gray22', b'gray23', b'gray24', b'gray25', b'gray26', b'gray27', b'gray28', b'gray29', b'gray3', b'gray30', b'gray31', b'gray32', b'gray33', b'gray34', b'gray35', b'gray36', b'gray37', b'gray38', b'gray39', b'gray4', b'gray40', b'gray41', b'gray42', b'gray43', b'gray44', b'gray45', b'gray46', b'gray47', b'gray48', b'gray49', b'gray5', b'gray50', b'gray51', b'gray52', b'gray53', b'gray54', b'gray55', b'gray56', b'gray57', b'gray58', b'gray59', b'gray6', b'gray60', b'gray61', b'gray62', b'gray63', b'gray64', b'gray65', b'gray66', b'gray67', b'gray68', b'gray69', b'gray7', b'gray70', b'gray71', b'gray72', b'gray73', b'gray74', b'gray75', b'gray76', b'gray77', b'gray78', b'gray79', b'gray8', b'gray80', b'gray81', b'gray82', b'gray83', b'gray84', b'gray85', b'gray86', b'gray87', b'gray88', b'gray89', b'gray9', b'gray90', b'gray91', b'gray92', b'gray93', b'gray94', b'gray95', b'gray96', b'gray97', b'gray98', b'gray99', b'green', b'green1', b'green2', b'green3', b'green4', b'GreenYellow', b'grey', b'grey0', b'grey1', b'grey10', b'grey100', b'grey11', b'grey12', b'grey13', b'grey14', b'grey15', b'grey16', b'grey17', b'grey18', b'grey19', b'grey2', b'grey20', b'grey21', b'grey22', b'grey23', b'grey24', b'grey25', b'grey26', b'grey27', b'grey28', b'grey29', b'grey3', b'grey30', b'grey31', b'grey32', b'grey33', b'grey34', b'grey35', b'grey36', b'grey37', b'grey38', b'grey39', b'grey4', b'grey40', b'grey41', b'grey42', b'grey43', b'grey44', b'grey45', b'grey46', b'grey47', b'grey48', b'grey49', b'grey5', b'grey50', b'grey51', b'grey52', b'grey53', b'grey54', b'grey55', b'grey56', b'grey57', b'grey58', b'grey59', b'grey6', b'grey60', b'grey61', b'grey62', b'grey63', b'grey64', b'grey65', b'grey66', b'grey67', b'grey68', b'grey69', b'grey7', b'grey70', b'grey71', b'grey72', b'grey73', b'grey74', b'grey75', b'grey76', b'grey77', b'grey78', b'grey79', b'grey8', b'grey80', b'grey81', b'grey82', b'grey83', b'grey84', b'grey85', b'grey86', b'grey87', b'grey88', b'grey89', b'grey9', b'grey90', b'grey91', b'grey92', b'grey93', b'grey94', b'grey95', b'grey96', b'grey97', b'grey98', b'grey99', b'honeydew', b'honeydew1', b'honeydew2', b'honeydew3', b'honeydew4', b'HotPink', b'HotPink1', b'HotPink2', b'HotPink3', b'HotPink4', b'IndianRed', b'IndianRed1', b'IndianRed2', b'IndianRed3', b'IndianRed4', b'indigo', b'ivory', b'ivory1', b'ivory2', b'ivory3', b'ivory4', b'khaki', b'khaki1', b'khaki2', b'khaki3', b'khaki4', b'lavender', b'LavenderBlush', b'LavenderBlush1', b'LavenderBlush2', b'LavenderBlush3', b'LavenderBlush4', b'LawnGreen', b'LemonChiffon', b'LemonChiffon1', b'LemonChiffon2', b'LemonChiffon3', b'LemonChiffon4', b'LightBlue', b'LightBlue1', b'LightBlue2', b'LightBlue3', b'LightBlue4', b'LightCoral', b'LightCyan', b'LightCyan1', b'LightCyan2', b'LightCyan3', b'LightCyan4', b'LightGoldenrod1', b'LightGoldenrod2', b'LightGoldenrod3', b'LightGoldenrod4', b'LightGoldenrodYellow', b'LightGray', b'LightGreen', b'LightGrey', b'LightPink', b'LightPink1', b'LightPink2', b'LightPink3', b'LightPink4', b'LightSalmon', b'LightSalmon1', b'LightSalmon2', b'LightSalmon3', b'LightSalmon4', b'LightSeaGreen', b'LightSkyBlue', b'LightSkyBlue1', b'LightSkyBlue2', b'LightSkyBlue3', b'LightSkyBlue4', b'LightSlateGray', b'LightSlateGrey', b'LightSteelBlue', b'LightSteelBlue1', b'LightSteelBlue2', b'LightSteelBlue3', b'LightSteelBlue4', b'LightYellow', b'LightYellow1', b'LightYellow2', b'LightYellow3', b'LightYellow4', b'lime', b'LimeGreen', b'linen', b'magenta', b'magenta1', b'magenta2', b'magenta3', b'magenta4', b'maroon', b'maroon', b'maroon1', b'maroon2', b'maroon3', b'maroon4', b'MediumAquamarine', b'MediumBlue', b'MediumOrchid', b'MediumOrchid1', b'MediumOrchid2', b'MediumOrchid3', b'MediumOrchid4', b'MediumPurple', b'MediumPurple1', b'MediumPurple2', b'MediumPurple3', b'MediumPurple4', b'MediumSeaGreen', b'MediumSlateBlue', b'MediumSpringGreen', b'MediumTurquoise', b'MediumVioletRed', b'MidnightBlue', b'MintCream', b'MistyRose', b'MistyRose1', b'MistyRose2', b'MistyRose3', b'MistyRose4', b'moccasin', b'NavajoWhite', b'NavajoWhite1', b'NavajoWhite2', b'NavajoWhite3', b'NavajoWhite4', b'navy', b'none', b'OldLace', b'olive', b'OliveDrab1', b'OliveDrab2', b'OliveDrab3', b'OliveDrab4', b'orange', b'orange1', b'orange2', b'orange3', b'orange4', b'OrangeRed', b'OrangeRed1', b'OrangeRed2', b'OrangeRed3', b'OrangeRed4', b'orchid', b'orchid1', b'orchid2', b'orchid3', b'orchid4', b'PaleGoldenrod', b'PaleGreen', b'PaleTurquoise', b'PaleVioletRed', b'PapayaWhip', b'PeachPuff', b'peru', b'pink', b'plum', b'PowderBlue', b'purple', b'red', b'RosyBrown', b'RoyalBlue', b'SaddleBrown', b'salmon', b'SandyBrown', b'SeaGreen', b'seashell', b'sienna', b'silver', b'SkyBlue', b'SlateBlue', b'SlateGrey', b'snow', b'SpringGreen', b'SteelBlue', b'tan', b'teal', b'thistle', b'tomato', b'transparent', b'turquoise', b'violet', b'VioletRed', b'wheat', b'white', b'WhiteSmoke', b'yellow', b'YellowGreen'"
    const cleanedStr = rawColorList
      .replace(/b'/g, '')   // b' 제거
      .replace(/'/g, '');   // ' 제거

    // 쉼표와 공백으로 구분된 배열로 변환
    const stringsArray = cleanedStr.split(', ');
    const filteredColorList = stringsArray.filter(color => !/\d/.test(color));
    setColorList(filteredColorList);
  }, []); // 이 useEffect는 컴포넌트가 처음 렌더링될 때만 실행됩니다.

  const colorNameToRgb = (colorNameStr) => {
    const color = tinycolor(colorNameStr);
    return color.toRgbString();
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    event.target.style = 'color: transparent'
  };
  const rgbColorList = colorList.map(colorName => colorNameToRgb(colorName));

  const handleFontChange = (event) => {
    setSelectedColor(event.target.value);
  }

  if (!user) {
    alert("User login required");
    router.push('/');
  }

  const handleVoiceSelect = (e) => {
    const voice = e.target.value;
    setSelectedVoice(voice);
    let voiceAudioUrl = '';

    // Set the audio URL based on the selected voice
    switch (voice) {
      case 'alloy':
        voiceAudioUrl = '/voices/alloy.mp3';
        break;
      case 'echo':
        voiceAudioUrl = '/voices/echo.mp3';
        break;
      case 'fable':
        voiceAudioUrl = '/voices/fable.mp3';
        break;
      case 'nova':
        voiceAudioUrl = '/voices/nova.mp3';
        break;
      case 'onyx':
        voiceAudioUrl = '/voices/onyx.mp3';
        break;
      case 'shimmer':
        voiceAudioUrl = '/voices/shimmer.mp3';
        break;
      default:
        voiceAudioUrl = '';
    }

    setSelectedVoiceAudio(voiceAudioUrl);

    if (audioRef.current && voiceAudioUrl) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, font, color, size } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setColor(color);
    setSize(size);

    if (name === 'dubbingScript') {
      setDubbing(value);
    }
  };

  const handleSearchMusic = () => {
    // Simulate loading
    setModalDataLoading(true);
    setTimeout(() => {
      console.log("Data loading...");
      setModalDataLoading(false);
      showMusicListModalRef.current.showModal();
    }, 2000);
  };

  const handleMusicSelect = (music) => {
    setSelectedMusic(music.title);
    showMusicListModalRef.current.closeModal();
  };

  // // importing user data from context (user data from form page)
  const { userId } = useUserData();

  useEffect(() => {
    const idArray = path.split('/');
    const userId = user.sub;
    const fetchImages = async () => {

      try {
        // Ensure script_id is available before making the request
        if (!idArray[2]) {
          console.error('No script_id found in router.query');
          return;
        }

        const data = await getImages(idArray[2], userId);
        const script = await getReview(idArray[2], user);

        // Extract image prompts
        const imagePrompts = script.narration_script.map(scene => scene.image_script);

        // Create a map for quick lookup
        const imageDataMap = new Map(data.map(image => [image.prompt, image]));

        // Sort data based on the order of imagePrompts
        const reorderedData = imagePrompts.map(prompt => imageDataMap.get(prompt)).filter(Boolean);

        setImageURLs(reorderedData.map(image => image.url));
        setBgRemovedImageIds(reorderedData.map(image => image.no_bg_image_id));
        setHasProductImages(reorderedData.map(image => image.has_product));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    // Fetch images only if script_id is available
    if (idArray[2]) {
      fetchImages();
    }
  }, []);



  useEffect(() => {
    const encodeImageUrls = async () => {
      const final_images_base64 = await Promise.all(imageURLs.map(async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }));
      setImages(final_images_base64);
      // setHasProductImages(hasProducts);
    };

    // setBgRemovedImageIds(noBgImageIds);
    encodeImageUrls();
  }, [imageURLs, user, bgRemovedImageIds]);

  const hasConfirmedBackRef = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handlePopState = () => {
      if (hasConfirmedBackRef.current || confirm('You may lose data and be charged again for regenerating AI images, dubbing, subtitles, and music. Do you still want to go back?')) {
        hasConfirmedBackRef.current = true;
        window.history.back();
      } else {
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReview(params.id, user);
        if (data) {
          setData(data);
          setConfirmedImages(new Array(imageURLs.length).fill(false));
          setBgmusicScript(JSON.stringify(data.background_music_selection))

          // console.log(JSON.stringify(data.background_music_selection))
          const dubbingScript = data.video_info.narration_script;
          setDubbing(dubbingScript || '');
          setMusicUrl(data.musicUrl || '');
          setMusicList(data.musicList || []);
        } else {
          router.push('/form');
        }
      } catch (error) {
        console.error('Error fetching review from supabase', error);
        router.push('/');
      }
    };

    fetchReview();
  }, [params.id, router, user, imageURLs]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { id } = data;

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...images];
    const reorderedConfirmedImages = [...confirmedImages];
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    const [movedConfirmed] = reorderedConfirmedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    reorderedConfirmedImages.splice(result.destination.index, 0, movedConfirmed);

    setImages(reorderedImages);
    setConfirmedImages(reorderedConfirmedImages);

    const reorderedHasProductImages = [...hasProductImages];
    const [movedHasProduct] = reorderedHasProductImages.splice(result.source.index, 1);
    reorderedHasProductImages.splice(result.destination.index, 0, movedHasProduct);

    setHasProductImages(reorderedHasProductImages);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setConfirmedImages((prevConfirmedImages) => prevConfirmedImages.filter((_, i) => i !== index));
    setHasProductImages((prevHasProductImages) => prevHasProductImages.filter((_, i) => i !== index));
  };

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setImageScriptText(images[index]?.image_script);
    showImageModalRef.current.showModal();
  };

  const handleConfirmImage = () => {
    setConfirmedImages((prevConfirmedImages) =>
      prevConfirmedImages.map((confirmed, i) => (i === currentImage ? !confirmed : confirmed))
    );
    showImageModalRef.current.closeModal();
  };

  const handleRegenerateImage = async () => {
    let newImage_url;
    if (hasProductImages[currentImage] === true) {
      const result = await generateImage("1", "1", "1", imageScriptText, [imageURLs[currentImage]], false, true, bgRemovedImageIds);
      // only one image is regenerated at a time
      newImage_url = result.final_images[0];
      setBgRemovedImageIds((prevBgRemovedImageIds) => [...prevBgRemovedImageIds, ...result.bgRemovedImageIds]);
    } else {
      const result = await generateSingleAIImage(imageScriptText, "regenerate", imageURLs[currentImage]);
      newImage_url = result.url;
    }

    const response = await fetch(newImage_url);
    const blob = await response.blob();
    const newImageBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    setImages((prevImages) => prevImages.map((image, i) => (i === currentImage ? newImage : image)));
    showImageModalRef.current.closeModal();
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    try {
      const script_id = params.id;
      const bgDuration = 60;
      // TODO: bgmusicScript should be fetche from data which has the ai generated script
      const bgmusicScript = data.background_music_selection.genre + data.background_music_selection.instrumentation
        + data.background_music_selection.tempo;
      const fontsize = 32; // default font size
      const subtitle_color = "yellow"; // default subtitle color
      const imageScripts = data.narration_script.map((script) => script.image_script);
      const finalVideoResponse = await generateFinalVideo(
        user,
        selectedVoice,
        dubbing,
        script_id,
        bgmusicScript,
        bgDuration,
        fontsize,
        subtitle_color,
        imageScripts,
        imageURLs
      )
      showFinalSubmitModalRef.current.closeModal();
      router.push(`/video/${params.id}`);
    } catch (error) {
        console.error('Error finalizing review:', error);
    } finally {
        setIsLoading(false);
    }
  };


  const handleConfirmMusicList = () => {
    // Handle confirm music list logic here
  };

if (isLoading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="w-full max-w-md mx-auto mt-6">
        <p className="text-center mb-2 text-white">Uploading: {uploadProgress.toFixed(2)}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

  return (
    <main className="flex-1 flex flex-col items-center p-24">
      <div className="w-full max-w-8xl pt-10">
        <div className="flex justify-center pb-10">
          <Image src="/images/arcticons_form.svg" width={82} height={82} alt="form icon" />
        </div>
        <div className="flex flex-row mx-24 w-full">
          <Image src="/images/reviewPage/timeline.svg" width={1300} height={40} alt="timeline icon" />
        </div>
        <div className="flex flex-row mt-4 mb-10 gap-x-20">
          <Image src="/images/reviewPage/image.svg" width={37} height={37} alt="image icon" />
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex overflow-x-auto"
                >
                  {images?.map((imageObj, index) => (
                    <Draggable key={index} draggableId={`${index}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex-none m-2 relative group"
                          onClick={(e) => {
                            e.preventDefault();
                            if (!snapshot.isDragging) {
                              handleImageClick(index);
                            }
                          }}
                        >
                          <img
                            src={imageObj}
                            alt={`Image ${index + 1}`}
                            className={`h-40 w-60 object-cover group-hover:opacity-60 ${confirmedImages[index] ? 'opacity-50' : ''}`}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute top-0 right-0 hidden group-hover:block bg-red-500 text-white p-1 rounded-full"
                          >
                            ✕
                          </button>
                          {confirmedImages[index] && (
                            <div className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full">
                              ✔
                            </div>
                          )}
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
        <div className="flex flex-row w-full mt-4 mb-12">
          <Image src="/images/reviewPage/mic.svg" width={40} height={40} alt="mic icon" className="mr-20" />
          <div className="w-full">
            <div>
              <textarea
                name="dubbingScript"
                value={dubbing}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-xl w-full mr-5 resize-none"
                placeholder="Enter dubbing script here..."
                rows={9}
              />
            </div>
            <div className="flex items-center">
              <select
                name="selectedVoice"
                value={selectedVoice}
                onChange={handleVoiceSelect}
                className="p-2 border border-gray-300 rounded-xl my-3 mr-2 w-[250px]"
              >
                <option value="">Select a voice</option>
                <option value="alloy">Alloy</option>
                <option value="echo">Echo</option>
                <option value="fable">Fable</option>
                <option value="nova">Nova</option>
                <option value="onyx">Onyx</option>
                <option value="shimmer">Shimmer</option>
              </select>
              {selectedVoice !== "" && (
                <audio controls className="w-[400px] mr-5" ref={audioRef}>
                  <source src={selectedVoiceAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-fit mt-4 mb-12">
          <Image src="/images/reviewPage/text.svg" width={40} height={40} alt="text icon" className="mr-20"/>
            <select
              value={selectedColor}
              onChange={handleColorChange}
              className="p-2 border border-gray-300 rounded-xl mr-5"
              style={{ backgroundColor: selectedColor }}
              placeholder="Color"
            >
              {colorList.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
            ))}
            </select>
            <input
              type="text"
              name="color"
              value={color}
              placeholder="Color"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-xl w-full mr-5"
            />
            <input
              type="number"
              name="size"
              placeholder="Size"
              value={size}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-xl w-full mr-5"
            />
        </div>
        <div className="flex flex-row w-fit mt-4 mb-1">
          <Image src="/images/reviewPage/music.svg" width={40} height={40} alt="music icon" className="mr-20" />
          <div className="flex items-center">
            <div className="flex flex-row">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-xl w-64 mr-2"
                placeholder="Search for music"
                onChange={handleInputChange}
              />
              <button
                onClick={handleSearchMusic}
                className="py-1 px-5 rounded-xl border border-gray-300 text-white bg-[#FF6C6C] active:bg-[#CC0000]"
              >
                Search
              </button>
            </div>
            {selectedMusic !== "" &&
              <div className="relative ml-3 text-black bg-white py-2 px-4 rounded-2xl max-w-fit">
                <button
                  className="absolute top-0 -right-1 bg-red-500 rounded-full w-4 h-4 leading-4"
                  onClick={() => setSelectedMusic("")}
                >x</button>
                <span>{selectedMusic}</span>
              </div>}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => showFinalSubmitModalRef.current.showModal()}
            className={`p-2 rounded text-white px-8 ${confirmedImages.every((confirmed) => confirmed) ? 'bg-[#4F4CDB]' : 'bg-gray-500 cursor-not-allowed'}`}
            // disabled={!confirmedImages.every((confirmed) => confirmed)}
          >
            Complete
          </button>
        </div>
      </div>

      <Modal
        ref={showFinalSubmitModalRef}
        onCancel={() => showFinalSubmitModalRef.current.closeModal()}
        title="Final Submit"
        outerClassName="bg-white"
        titleClassName="text-black"
      >
        <p className="text-black">You will be charged after this point and cannot revert your action. Do you want to proceed with this information?</p>
        <button onClick={handleFinalSubmit} className="mt-2 p-2 rounded bg-green-500">Final Confirm</button>
      </Modal>

      <Modal
        ref={showImageModalRef}
        title="Image Preview"
        onConfirm={handleConfirmImage}
        onCancel={() => showImageModalRef.current.closeModal()}
      >
        <div className="flex flex-col items-center w-[400px]">
          <div className="flex mb-4">
            <div className="flex-1 mr-2">
              <img src={images[currentImage]} alt="Large Preview" />
            </div>
            <textarea
              value={imageScriptText}
              onChange={(e) => setImageScriptText(e.target.value)}
              placeholder={"Create your own script for image generation."}
              className="p-2 border border-[#949494] rounded-lg resize-none min-h-[100px] flex-1"
              rows={4}
            />
          </div>
          <div className="flex space-x-4">
            <button onClick={handleRegenerateImage} className="p-2 bg-yellow-500 rounded text-white">
              Regenerate
            </button>
            <button
              onClick={handleConfirmImage}
              className={`p-2 rounded text-white ${confirmedImages[currentImage] ? 'bg-red-500' : 'bg-green-500'}`}
            >
              {confirmedImages[currentImage] ? 'Unconfirm' : 'Confirm'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        ref={showMusicListModalRef}
        isLoading={modalDataLoading}
        title="Music"
        onConfirm={handleConfirmMusicList}
        onCancel={() => showMusicListModalRef.current.closeModal()}
      >
        <div className="flex flex-col items-center w-[800px]">
          <div className="flex flex-col w-full h-[250px] overflow-y-auto">
            <table className="text-[#DEDEDE]">
              <thead>
                <tr className="border-b-2 border-[#616161]">
                  <th></th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Genre</th>
                  <th className="text-left">Mood</th>
                  <th className="text-left">Artist</th>
                </tr>
              </thead>
              <tbody>
                {musicList.map((music, index) => (
                  <tr key={index} className="border-b-2 border-[#616161] cursor-pointer hover:opacity-60">
                    <td className="py-2">
                      <img
                        src="/images/play_button.svg"
                        width={25}
                        height={25}
                        alt="play_button icon"
                        onClick={() => handleMusicSelect(music)}
                      />
                    </td>
                    <td className="py-2">{music.title}</td>
                    <td className="py-2">{music.genre}</td>
                    <td className="py-2">{music.mood}</td>
                    <td className="py-2">{music.artist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </main>
  );
}

// New generateStaticParams function
export async function generateStaticParams() {
  const response = await getAllScripts();
  const reviews = await response.json();

  return reviews.map((review) => ({
    params: {
      id: review.script_id.toString(),
    },
  }));
}
