"use client";

import React, { useOptimistic, useTransition, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { Heart, ShoppingCart, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  // Instantly reflect the adding status using React 19 logic
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    "idle",
    (state, newStatus: string) => newStatus,
  );

  const isLiked = isInWishlist(product.uid);
  const { discountedPrice, savedAmount, discountDisplay, mrp, discount } =
    React.useMemo(() => {
      const variant = product.variants?.[0];
      const mrp = variant?.mrpPrice || 0;
      const discount = variant?.discount;

      let discountedPrice = mrp;
      let savedAmount = 0;
      let discountDisplay = "";

      if (discount && discount.type !== "NOT_AVAILABLE") {
        if (discount.type === "PERCENTAGE") {
          savedAmount = (mrp * (discount.amount || discount.value)) / 100;
          discountedPrice = mrp - savedAmount;
          discountDisplay = `${discount.amount || discount.value}% OFF`;
        } else if (discount.type === "FLAT") {
          savedAmount = discount.amount || discount.value;
          discountedPrice = mrp - savedAmount;
          discountDisplay = `SAVE ${discount.amount || discount.value}`;
        }
      }

      return { discountedPrice, savedAmount, discountDisplay, mrp, discount };
    }, [product.variants]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setOptimisticStatus("adding");
      addItem(product);

      // Delay for a short moment to ensure the UI feels responsive to the action
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    });
  };

  return (
    <div className="group relative bg-white rounded-lg border border-zinc-100 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-zinc-200/50 transition-all duration-500 flex flex-col h-full">
      <Link href={`/product/${product.uid}`} className="flex flex-col flex-1">
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

        <div className="relative aspect-[4/3] p-6 flex items-center justify-center bg-white group-hover:p-4 transition-all duration-500">
          {product.images?.[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.enName}
              fill
              className="object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-zinc-50 rounded-2xl" />
          )}
        </div>

        <div className="p-0 flex flex-col flex-1 px-4">
          <div className="mb-4 text-center">
            <p className="text-zinc-400 text-[10px] font-black tracking-wider uppercase mb-1">
              {product.uid}
            </p>
            <h3 className="text-[#233f6c] font-black text-sm line-clamp-2 leading-snug group-hover:text-[#004a99] transition-colors duration-300 uppercase tracking-tight">
              {product.enName}
            </h3>
          </div>

          <div className="mt-auto bg-[#FFFFF6] -mx-4 p-4 border-t border-[#fff5c2]">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[#004a99] text-lg font-black tracking-tighter">
                  ৳ {Math.round(discountedPrice).toLocaleString()}
                </span>
                {savedAmount > 0 && (
                  <span className="text-zinc-400 line-through text-[10px] font-bold">
                    ৳{mrp.toLocaleString()}
                  </span>
                )}
              </div>
              {savedAmount > 0 && (
                <span className="bg-[#e31e24]/10 text-[#e31e24] text-[9px] font-black px-2 py-1 rounded">
                  SAVE ৳{Math.round(savedAmount).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 flex justify-between gap-2.5 items-center bg-white border-t border-zinc-100 mt-auto">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`flex-none w-11 h-11 flex items-center justify-center rounded-lg border transition-all active:scale-90 ${
            isLiked
              ? "bg-red-50 border-red-100 text-red-500 shadow-inner"
              : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:border-zinc-300"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-all ${isLiked ? "fill-red-500 scale-110" : ""}`}
          />
        </button>

        <button
          disabled={isPending || isSuccess}
          onClick={handleAddToCart}
          className={`flex-1 h-11 relative overflow-hidden font-black rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 border ${
            isSuccess
              ? "bg-green-600 border-green-600 text-white"
              : "bg-[#233f6c] text-white border-[#233f6c] hover:bg-[#004a99] hover:border-[#004a99] shadow-lg shadow-blue-900/10"
          }`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 animate-in zoom-in duration-300" />
              <span className="text-[10px] uppercase tracking-widest animate-in slide-in-from-bottom-1 duration-300">
                Added!
              </span>
            </>
          ) : optimisticStatus === "adding" ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-[10px] uppercase tracking-widest opacity-80">
                Adding...
              </span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest">
                Add to Cart
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
