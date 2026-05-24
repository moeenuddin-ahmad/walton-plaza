"use client";

import { useOptimistic, useTransition, useState } from "react";
import { ShoppingCart, ShoppingBag, Heart, CheckCircle2 } from "lucide-react";

interface ProductActionsProps {
  inStock: boolean;
  qty: number;
  setQty: (qty: number) => void;
  maxQty: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onToggleWishlist: () => void;
  isLiked: boolean;
}

export const ProductActions = ({
  inStock,
  qty,
  setQty,
  maxQty,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isLiked,
}: ProductActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  // Instantly reflect the adding status using React 19 optimistic updates
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    "idle",
    (state, newStatus: string) => newStatus,
  );

  const handleAddToCart = async () => {
    startTransition(async () => {
      setOptimisticStatus("adding");
      onAddToCart();

      // Give the user a moment to see the 'Adding' state for better feel
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Set Quantity
        </p>
        <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-lg p-1.5 w-fit focus-within:border-[#233f6c] focus-within:bg-white transition-all shadow-sm">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm font-bold text-zinc-600 transition-all active:scale-90"
          >
            −
          </button>
          <span className="w-14 text-center font-black text-zinc-900 text-lg tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty(Math.min(maxQty, qty + 1))}
            disabled={!inStock}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm font-bold text-zinc-600 transition-all active:scale-90 disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          disabled={!inStock || isPending}
          onClick={onBuyNow}
          className="flex-[2] relative group overflow-hidden bg-[#233f6c] text-white font-black py-4.5 rounded-lg transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98] disabled:opacity-40"
        >
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="relative flex items-center justify-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.2em]">Buy Now</span>
          </div>
        </button>

        <button
          disabled={!inStock || isPending || isSuccess}
          onClick={handleAddToCart}
          className={`flex-1 min-w-[150px] relative group overflow-hidden font-black py-4.5 rounded-lg transition-all border active:scale-[0.98] ${
            isSuccess
              ? "bg-green-600 border-green-600 text-white"
              : "bg-zinc-50 hover:bg-[#233f6c] text-[#233f6c] hover:text-white border-zinc-200 hover:border-[#233f6c]"
          }`}
        >
          <div className="relative flex items-center justify-center gap-2">
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-in zoom-in duration-300" />
                <span className="text-[10px] uppercase tracking-[0.15em] animate-in slide-in-from-bottom-1 duration-300">
                  Added!
                </span>
              </>
            ) : optimisticStatus === "adding" ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] uppercase tracking-[0.15em] opacity-70">
                  Adding...
                </span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.15em]">
                  Add to Cart
                </span>
              </>
            )}
          </div>
        </button>

        <button
          onClick={onToggleWishlist}
          className={`w-14 h-14 flex items-center justify-center rounded-lg border transition-all duration-300 active:scale-90 shrink-0 ${
            isLiked
              ? "bg-red-50 border-red-100 text-red-500 shadow-inner"
              : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300"
          }`}
        >
          <Heart
            className={`w-6 h-6 transition-all ${isLiked ? "fill-red-500 scale-110" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};
