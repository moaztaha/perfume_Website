"use client";

import { useState } from "react";
import Image from "next/image";

type ImageUploadProps = {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
};

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      <label className="block text-[13px] font-medium text-[#1a1a1a]">
        Product Images
        <span className="ml-1 text-[#8a837a]">
          ({images.length}/{maxImages})
        </span>
      </label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg border border-[#ebe6de] bg-[#f4f0eb]"
            >
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                sizes="200px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L9 9M9 3L3 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-medium text-white">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 transition-colors ${
            dragActive
              ? "border-[#1a1a1a] bg-[#faf8f5]"
              : "border-[#ebe6de] bg-white"
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#8a837a]"
          >
            <path
              d="M20 5V35M5 20H35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-4 text-[13px] font-medium text-[#1a1a1a]">
            Click to upload or drag and drop
          </p>
          <p className="mt-1 text-[12px] text-[#8a837a]">
            PNG, JPG, WebP up to 10MB
          </p>
        </div>
      )}

      <p className="text-[11px] text-[#8a837a]">
        Note: This is a UI-only demo. File uploads are not actually processed.
      </p>
    </div>
  );
}
