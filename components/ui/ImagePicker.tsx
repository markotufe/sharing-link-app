"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type ImagePickerProps = {
  handleSelectImage: (image: File) => void;
  previewUrl: string;
  setPreviewImage: (previewUrl: string) => void;
};

export const ImagePicker = ({
  handleSelectImage,
  setPreviewImage,
  previewUrl
}: ImagePickerProps) => {
  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;

    if (selectedFiles.length) {
      handleSelectImage(selectedFiles?.[0]);
      setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    }
  };

  let pickerContent = (
    <>
      <input
        id="upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onSelectImage}
      />
      <label htmlFor="upload" className="cursor-pointer space-y-2">
        <PhotoIcon fill="#633CFF" className="w-12 h-12 mx-auto" />
        <h5 className="mb-2 text-heading-s font-semibold text-purple">
          + Upload Image
        </h5>
      </label>
    </>
  );

  if (previewUrl) {
    pickerContent = (
      <>
        <Image
          fill
          src={previewUrl}
          alt="Image preview"
          className="rounded-md"
        />

        <input
          id="upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onSelectImage}
        />

        <label
          htmlFor="upload"
          className="cursor-pointer space-y-2 absolute bg-darkGrey/50 top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col rounded-md"
        >
          <PhotoIcon fill="#FFFF" className="w-12 h-12 mx-auto" />
          <h5 className="mb-2 text-heading-s font-semibold text-white">
            Change Image
          </h5>
        </label>
      </>
    );
  }

  return (
    <div className="w-[196px] h-[196px] bg-lightPurple rounded-lg flex justify-center items-center cursor-pointer relative">
      {pickerContent}
    </div>
  );
};
