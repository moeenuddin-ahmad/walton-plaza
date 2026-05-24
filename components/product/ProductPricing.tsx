"use client";

import { Tag, Package } from "lucide-react";

interface ProductPricingProps {
  mrp: number;
  selling: number;
  savings: number;
  discountLabel: string | null;
  inStock: boolean;
  quantityAvailable?: number;
}

export const ProductPricing = ({
  mrp,
  selling,
  savings,
  discountLabel,
  inStock,
  quantityAvailable,
}: ProductPricingProps) => {
  return (
    <div className="bg-[#FFFFF6] border border-[#fff5c2] rounded-lg p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff5c2]/30 rounded-full -mr-16 -mt-16 blur-3xl" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-4xl md:text-5xl font-black text-[#004a99] tracking-tighter">
              ৳{Math.round(selling).toLocaleString()}
            </span>
            {savings > 0 && (
              <span className="text-xl text-zinc-400 line-through font-medium">
                ৳{mrp.toLocaleString()}
              </span>
            )}
          </div>
          {savings > 0 && (
            <div className="flex items-center gap-2">
              <div className="bg-[#e31e24] p-1 rounded-sm">
                <Tag className="w-3 h-3 text-white" />
              </div>
              <span className="text-[11px] font-black text-[#e31e24] uppercase tracking-widest">
                Save ৳{Math.round(savings).toLocaleString()} ({discountLabel})
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 bg-white/60 backdrop-blur-md border border-zinc-100 rounded-lg px-5 py-3 w-fit shadow-sm">
          <Package className="w-4 h-4 text-zinc-400" />
          <span
            className={`text-[11px] font-black uppercase tracking-wider ${
              inStock ? "text-green-600" : "text-red-500"
            }`}
          >
            {inStock
              ? `${quantityAvailable?.toLocaleString()} Units In Stock`
              : "Temporarily Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
};
