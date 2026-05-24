import React from "react";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Area Skeleton */}
      <div className="relative aspect-[4/3] p-6 flex items-center justify-center bg-zinc-50/50">
        <div className="w-full h-full bg-zinc-100 rounded-lg" />
      </div>

      {/* Content Area Skeleton */}
      <div className="p-0 flex flex-col flex-1">
        <div className="py-6 px-4 text-center">
          {/* UID Skeleton */}
          <div className="h-3 w-20 bg-zinc-100 rounded mx-auto mb-3" />
          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-[85%] bg-zinc-100 rounded mx-auto" />
            <div className="h-4 w-[60%] bg-zinc-100 rounded mx-auto" />
          </div>
        </div>

        {/* Pricing Box Skeleton */}
        <div className="mt-auto bg-[#FFFFF6] p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
              <div className="h-3.5 w-24 bg-zinc-100 rounded" />
              <div className="h-3 w-32 bg-zinc-100/80 rounded" />
            </div>
            <div className="h-7 w-20 bg-zinc-200 rounded-lg" />
          </div>
          <div className="h-3 w-40 bg-zinc-100/60 rounded" />
        </div>
      </div>

      {/* Actions Skeleton */}
      <div className="p-4 flex justify-between gap-3 items-center bg-[#FFFFF6] border-t border-[#fff5c2]">
        <div className="w-11 h-11 rounded-full bg-zinc-200 flex-none" />
        <div className="flex-1 h-11 bg-zinc-200 rounded-md" />
      </div>
    </div>
  );
};
