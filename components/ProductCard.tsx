import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const variant = product.variants?.[0];
  const mrp = variant?.mrpPrice || 0;
  const discount = variant?.discount;

  let discountedPrice = mrp;
  let savedAmount = 0;
  let discountDisplay = "";

  if (discount && discount.type !== "NOT_AVAILABLE") {
    if (discount.type === "PERCENTAGE") {
      savedAmount = (mrp * discount.value) / 100;
      discountedPrice = mrp - savedAmount;
      discountDisplay = `${discount.value}% OFF`;
    } else if (discount.type === "FLAT") {
      savedAmount = discount.value;
      discountedPrice = mrp - savedAmount;
      discountDisplay = `SAVE ${discount.value}`;
    }
  }

  return (
    <div className="group relative bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 flex flex-col h-full">
      <Link href={`/product/${product.uid}`} className="flex flex-col flex-1">
        {/* Discount Badge */}
        {discountDisplay && (
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center">
            <div className="bg-[#e31e24] text-white text-[10px] font-bold px-2 py-3 rounded-b-lg shadow-lg flex flex-col items-center leading-tight">
              <span className="text-sm">{discount.value}%</span>
              <span>OFF</span>
            </div>
            <div className="text-[#fabb05] -mt-1 text-lg">★</div>
          </div>
        )}

        {/* Image Area */}
        <div className="relative aspect-[4/3] p-6 flex items-center justify-center bg-white group-hover:p-4 transition-all duration-500">
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.enName}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          ) : (
            <div className="w-full h-full bg-zinc-50 rounded-2xl" />
          )}
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-4 text-center">
            <p className="text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-1">
              {product.uid}
            </p>
            <h3 className="text-[#004a99] font-bold text-lg line-clamp-2 leading-tight">
              {product.enName}
            </h3>
          </div>

          {/* Pricing Box */}
          <div className="mt-auto bg-[#fffdf0] rounded-2xl p-4 border border-[#fff5c2]">
            <div className="flex justify-between items-start mb-1">
              <div className="space-y-0.5">
                <p className="text-[#e31e24] line-through text-sm font-medium">
                  MSRP ৳ {mrp.toLocaleString()}
                </p>
                <p className="text-[#2e7d32] text-xs font-bold">
                  Save: ৳ {savedAmount.toLocaleString()} ({discount.value}%)
                </p>
              </div>
              <div className="text-[#004a99] text-xl font-black">
                ৳ {Math.round(discountedPrice).toLocaleString()}
              </div>
            </div>
            <p className="text-[#004a99] text-[10px] font-bold uppercase tracking-tight">
              Available In Selected Plaza
            </p>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="p-5 pt-0 flex gap-3 items-center">
        <button className="flex-none p-3 rounded-xl border-2 border-zinc-100 hover:border-[#004a99] hover:bg-[#004a99]/5 transition-colors group/heart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-zinc-400 group-hover/heart:text-[#004a99] transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
        <button className="flex-1 bg-[#004a99] text-white font-bold py-3.5 rounded-xl transition-all hover:bg-[#003366] hover:shadow-lg active:scale-[0.98]">
          Buy Now
        </button>
      </div>
    </div>
  );
};
