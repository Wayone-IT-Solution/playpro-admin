"use client";

import { toast } from "react-toastify";
import { IoCloudUpload } from "react-icons/io5";
import React, { FC, useState, useRef } from "react";
import { Patch } from "@/hooks/apiUtils";

interface SingleVideoUploaderProps {
  field: {
    name: string;
    label: string;
    value?: string;
    required?: boolean;
  };
  setFormData: (newState: any) => void; // Function to update parent state
}

const SingleVideoUploader: FC<SingleVideoUploaderProps> = ({
  field,
  setFormData,
}) => {
  const fieldname = field?.name;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(
    field.value ?? null
  );

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 1024 * 1024 * 20; // 20 MB
      const validTypes = ["video/mp4", "video/webm"]; // Acceptable video types

      if (file.size > maxSizeInBytes) {
        return toast.warn(
          "File size exceeds 5 MB. Please select a smaller file."
        );
      }

      if (!validTypes.includes(file.type)) {
        return toast.warn(
          "Invalid file type. Please select an MP4, WEBM video."
        );
      }

      const videoUrl = URL.createObjectURL(file);
      setSelectedVideo(videoUrl);

      const obj = fieldname ? { [fieldname]: file } : { videoUrl: file };
      setFormData((prev: any) => ({ ...prev, ...obj }));
    }
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input
    }
    // Clear the state in the parent component
    const obj = fieldname ? { [fieldname]: null } : { videoUrl: null };
    setFormData((prev: any) => ({ ...prev, ...obj }));
  };

  const deleteSelectedImages = async (folderName: string, fileName: string) => {
    try {
      if (!fileName || !folderName) return toast.warn("Something went wrong!");
      await Patch("/api/product/image", {
        folderId: folderName,
        filename: fileName,
      });
    } catch (error) {
      console.log("Failed to Delete images: " + error);
    }
  };

  const deleteImageOnHover = async (image: string) => {
    const parts = new URL(image).pathname.split("/").filter(Boolean);
    const folder = parts[parts.length - 2];
    const filename = parts[parts.length - 1];
    await deleteSelectedImages(folder, filename);
  };

  return (
    <div className="flex flex-col justify-start space-y-2">
      <label htmlFor={field.name} className="block font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        ref={fileInputRef}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col justify-start w-full bg-white h-48 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition ${
          selectedVideo ? "border-primary" : "border-gray-300"
        }`}
      >
        {selectedVideo ? (
          <>
            <video
              controls
              className="w-full h-full object-contain rounded-lg"
              src={selectedVideo}
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering file input
                if (
                  selectedVideo.includes("upload") &&
                  field.name === "coverImage"
                ) {
                  handleRemoveVideo();
                  deleteImageOnHover(selectedVideo);
                } else handleRemoveVideo();
              }}
              className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 flex justify-center items-center aspect-square rounded-full p-1 hover:bg-primary transition-all duration-200 ease-linear"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-gray-600">
            <h2 className="text-black-400 font-bold">Files Types We Accept</h2>
            <p className="text-gray-600 text-xs py-2">
              WEBM, MP4 (Max file size: 20MB)
            </p>
            <span>
              <IoCloudUpload size={50} className="text-gray-500" />
            </span>
            <span className="text-gray-700">Click to upload</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleVideoUploader;
