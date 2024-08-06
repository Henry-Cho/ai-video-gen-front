"use client";

import Image from 'next/image';

const ImagePreview = ({ image, index, removeImage, isEditing = true }) => (
  <div className="relative m-2">
    <Image src={image} alt={`Preview ${index}`} width={100} height={100} className="rounded" />
    {isEditing && (
      <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 leading-5">
        x
      </button>
    )}
  </div>
);

export default ImagePreview;
