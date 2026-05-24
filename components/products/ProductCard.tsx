import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.uid);
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
    <div className="group relative bg-white rounded-lg border border-zinc-100 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-zinc-200/50 transition-all duration-500 flex flex-col h-full">
      <Link href={`/product/${product.uid}`} className="flex flex-col flex-1">
        {/* Discount Badge */}
        {discountDisplay && (
          <div className="absolute top-0 left-5 z-10 flex flex-col items-center">
            <div className="bg-[#e31e24] text-white text-[10px] font-bold px-2 py-3 rounded-b-lg shadow-lg flex flex-col items-center leading-tight">
              <span className="text-[11px]">
                {discount?.type === "PERCENTAGE"
                  ? `${discount?.value}%`
                  : `৳${discount?.value}`}
              </span>
              <span className="text-[9px]">OFF</span>
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
        <div className="p-0 flex flex-col flex-1">
          <div className="mb-4 text-center">
            <p className="text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-1">
              {product.uid}
            </p>
            <h3 className="text-[#233f6c] font-semibold text-base line-clamp-2 leading-tight group-hover:text-[#004a99] transition-colors duration-300">
              {product.enName}
            </h3>
          </div>

          {/* Pricing Box */}
          <div className="mt-auto bg-[#FFFFF6] p-4">
            <div className="flex justify-between items-start mb-1">
              <div className="space-y-0.5">
                <p className="text-[#e31e24] line-through text-sm font-medium">
                  MSRP ৳ {mrp.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm font-medium">
                  Save: ৳ {savedAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-[#004a99] text-md font-black font-semibold">
                ৳ {Math.round(discountedPrice).toLocaleString()}
              </div>
            </div>
            <p className="text-[#004a99] text-medium font-medium uppercase tracking-tight">
              Available In Selected Plaza
            </p>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="p-4 flex justify-between gap-3 items-center bg-[#FFFFF6] border-t border-[#fff5c2]">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`flex-none p-2 rounded-full border-2 transition-all group/heart ${
            isLiked
              ? "bg-red-50 border-red-200"
              : "bg-white border-[#233f6c] hover:border-[#004a99] hover:bg-[#004a99]/5"
          }`}
        >
          <Heart
            className={`w-6 h-6 transition-all ${
              isLiked
                ? "text-red-500 fill-red-500 scale-110"
                : "text-[#233f6c] group-hover/heart:text-[#004a99]"
            }`}
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="flex-1 bg-zinc-50 text-[#233f6c] font-black py-2.5 rounded-lg transition-all duration-300 hover:bg-[#233f6c] hover:text-white border border-zinc-200 hover:border-[#233f6c] active:scale-[0.95] flex items-center justify-center gap-2 group/btn relative overflow-hidden"
        >
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10 text-[11px] uppercase tracking-wider">
            Add to Cart
          </span>
          <ShoppingCart className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
