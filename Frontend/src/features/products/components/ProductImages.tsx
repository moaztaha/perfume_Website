"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  // معالجة الروابط وتحويل localhost إلى 127.0.0.1 لتجنب مشاكل الـ Next.js Image

  const rawImages = product.images.length > 0 ? product.images : [];
  const images = rawImages.map((img) => {
    const url = typeof img === 'string' ? img : (img as any)?.url || '';
    if (!url) return '';
    const fullUrl = url.startsWith("http") ? url : `http://127.0.0.1:1337${url}`;
    return fullUrl.replace("localhost", "127.0.0.1");
  }).filter(Boolean);

  const [selectedImage, setSelectedImage] = useState<string>(images[0] ?? "");

  // Fallback if no images
  if (images.length === 0) {
    return (
      <div className="flex h-[420px] sm:h-[500px] lg:h-[600px] w-full items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54]">
        No product images available
      </div>
    );
  }

  // Current active image to display (defaulting to first image if selected is somehow invalid)
  const currentImage = images.includes(selectedImage) ? selectedImage : images[0];

  // Additional thumbnails (all images, or up to 3 thumbnails)
  const thumbnails = images.length > 1 ? images.slice(1, 4) : [];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Viewport */}
      <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full overflow-hidden rounded-lg bg-[#ebe6de]">
        <Image
          src={currentImage}
          alt={product.name}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {/* Thumbnails Row */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
          {thumbnails.map((thumbUrl, idx) => {
            const isSelected = currentImage === thumbUrl;
            return (
              <button
                key={thumbUrl}
                type="button"
                onClick={() => setSelectedImage(thumbUrl)}
                className={`group relative h-24 sm:h-28 lg:h-[120px] w-full overflow-hidden rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2 ${isSelected
                  ? "ring-2 ring-[#1a1a1a] ring-offset-2 opacity-100"
                  : "opacity-80 hover:opacity-100 hover:ring-2 hover:ring-[#c5a880]"
                  }`}
                aria-label={`View ${product.name} image ${idx + 2}`}
                aria-current={isSelected ? "true" : undefined}
              >
                <Image
                  src={thumbUrl}
                  alt={`${product.name} thumbnail ${idx + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 16vw, 33vw"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}