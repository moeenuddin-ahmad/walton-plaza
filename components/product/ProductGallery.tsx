"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER = "https://placehold.co/600x600/f4f4f5/a1a1aa?text=No+Image";

interface ProductGalleryProps {
  images: { url: string }[];
  selectedImageIdx: number;
  setSelectedImageIdx: (idx: number) => void;
  productName: string;
  discountLabel: string | null;
}

export const ProductGallery = ({
  images,
  selectedImageIdx,
  setSelectedImageIdx,
  productName,
  discountLabel,
}: ProductGalleryProps) => {
  const currentImages = images.length > 0 ? images : [{ url: PLACEHOLDER }];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg border border-zinc-100 overflow-hidden group">
        <Image
          src={currentImages[selectedImageIdx]?.url || PLACEHOLDER}
          alt={productName}
          fill
          className="object-contain p-6 md:p-10 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Navigation Arrows */}
        {currentImages.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedImageIdx(Math.max(0, selectedImageIdx - 1))
              }
              disabled={selectedImageIdx === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-zinc-500 hover:text-[#233f6c] disabled:opacity-20 transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setSelectedImageIdx(
                  Math.min(currentImages.length - 1, selectedImageIdx + 1),
                )
              }
              disabled={selectedImageIdx === currentImages.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-zinc-500 hover:text-[#233f6c] disabled:opacity-20 transition-all z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Discount Badge */}
        {discountLabel && (
          <div className="absolute top-4 left-4 bg-[#e31e24] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl z-10">
            {discountLabel}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {currentImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {currentImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImageIdx(i)}
              className={`shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden bg-white transition-all duration-300 ${
                i === selectedImageIdx
                  ? "border-[#233f6c] shadow-md scale-105"
                  : "border-zinc-100 hover:border-zinc-300"
              }`}
            >
              <Image
                src={img.url}
                alt=""
                width={80}
                height={80}
                className="w-full h-full object-contain p-1 mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
