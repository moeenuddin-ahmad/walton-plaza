"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER = "https://placehold.co/600x600/f4f4f5/a1a1aa?text=No+Image";

import ReactImageMagnify from "react-image-magnify";

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
  const mainImage = currentImages[selectedImageIdx]?.url || PLACEHOLDER;

  return (
    <div className="space-y-4">
      {/* Main Image with Magnify */}
      <div className="relative aspect-square bg-white rounded-lg border border-zinc-100 overflow-hidden group z-40">
        <div className="w-full h-full [&>div]:!shadow-none [&>div>img]:object-contain [&>div>img]:p-10 [&>div>img]:mix-blend-multiply">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: productName,
                isFluidWidth: true,
                src: mainImage,
              },
              largeImage: {
                src: mainImage,
                width: 1200,
                height: 1200,
              },
              enlargedImagePosition: "beside",
              enlargedImageContainerClassName:
                "z-[100] rounded-2xl border border-zinc-100 shadow-2xl bg-white",
              hoverDelayInMs: 0,
              hoverOffDelayInMs: 0,
              fadeDurationInMs: 300,
            }}
          />
        </div>

        {/* Navigation Arrows */}
        {currentImages.length > 1 && (
          <div className="pointer-events-none absolute inset-0 z-50">
            <button
              onClick={() =>
                setSelectedImageIdx(Math.max(0, selectedImageIdx - 1))
              }
              disabled={selectedImageIdx === 0}
              className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-zinc-500 hover:text-[#233f6c] disabled:opacity-20 transition-all"
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
              className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-zinc-500 hover:text-[#233f6c] disabled:opacity-20 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Discount Badge */}
        {discountLabel && (
          <div className="absolute top-4 left-4 bg-[#e31e24] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl z-10 pointer-events-none">
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
