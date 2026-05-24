import React from "react";

export const ProductCardSkeleton = () => {
  return (
    <div className="group relative bg-white rounded-3xl border border-zinc-100 overflow-hidden flex flex-col h-full animate-pulse">
      {/* Badge Placeholder */}
      <div className="absolute top-4 left-4 z-10 w-8 h-12 bg-zinc-100 rounded-b-lg" />

      {/* Image Area */}
      <div className="relative aspect-[4/3] p-6 flex items-center justify-center bg-white">
        <div className="w-full h-full bg-zinc-50 rounded-2xl" />
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4 text-center space-y-2">
          {/* UID Placeholder */}
          <div className="h-2 bg-zinc-50 w-16 mx-auto rounded" />
          {/* Title Placeholder */}
          <div className="h-5 bg-zinc-50 w-3/4 mx-auto rounded" />
          <div className="h-5 bg-zinc-50 w-1/2 mx-auto rounded" />
        </div>

        {/* Pricing Box */}
        <div className="mt-auto bg-[#fffdf0]/50 rounded-2xl p-4 border border-[#fff5c2]/50">
          <div className="flex justify-between items-start mb-1">
            <div className="space-y-2">
              <div className="h-3 bg-zinc-100 w-20 rounded" />
              <div className="h-2 bg-zinc-100 w-24 rounded" />
            </div>
            <div className="h-6 bg-zinc-100 w-20 rounded" />
          </div>
          <div className="mt-2 h-2 bg-zinc-100 w-32 rounded" />
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3 items-center">
          {/* Wishlist Placeholder */}
          <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100" />
          {/* Buy Now Placeholder */}
          <div className="flex-1 h-12 rounded-xl bg-zinc-50" />
        </div>
      </div>
    </div>
  );
};
