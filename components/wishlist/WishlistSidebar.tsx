"use client";

import React, { useEffect } from "react";
import {
  X,
  Trash2,
  Heart,
  ArrowRight,
  ShoppingCart,
  ShoppingBag,
  Plus,
} from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

export const WishlistSidebar: React.FC = () => {
  const { items, isOpen, closeWishlist, toggleWishlist, getTotalItems } =
    useWishlistStore();

  const addItemToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleMoveToCart = (product: any) => {
    addItemToCart(product);
    toggleWishlist(product);
    closeWishlist();
    openCart();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-end transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#233f6c]/30 backdrop-blur-[6px] transition-opacity duration-700 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeWishlist}
      />

      {/* Sidebar Content */}
      <div
        className={`relative w-full max-w-[440px] bg-white h-full shadow-[0_0_80px_rgba(35,63,108,0.15)] flex flex-col transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="relative p-5 border-b border-zinc-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-lg shadow-lg shadow-red-900/20">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ring-2 ring-red-500/10">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#233f6c] tracking-tight leading-none mb-1 uppercase">
                  Wishlist
                </h2>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                  Your curated collection
                </p>
              </div>
            </div>
            <button
              onClick={closeWishlist}
              className="p-2.5 border border-zinc-200 hover:bg-zinc-50 rounded-full transition-all group active:scale-90"
            >
              <X className="w-6 h-6 text-gray-400 group-hover:text-zinc-900 transition-colors" />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-10 h-10 text-red-200" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#233f6c] to-[#004a99] w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-black text-[#233f6c] mb-2 uppercase tracking-tight">
                Nothing here yet
              </h3>
              <p className="text-sm font-medium text-zinc-500 mb-8 leading-relaxed">
                Start saving your favorite products by clicking the heart icon
                on any product card.
              </p>
              <button
                onClick={closeWishlist}
                className="group flex items-center gap-3 bg-[#233f6c] text-white font-black py-4 px-8 rounded-2xl hover:bg-[#004a99] transition-all shadow-xl shadow-blue-9100/10 active:scale-[0.98]"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, idx) => {
                const variant = item.variants?.[0];
                const mrp = variant?.mrpPrice || 0;
                const discount = variant?.discount;

                let price = mrp;
                if (discount && discount.type !== "NOT_AVAILABLE") {
                  if (discount.type === "PERCENTAGE") {
                    price = mrp - (mrp * discount.value) / 100;
                  } else if (discount.type === "FLAT") {
                    price = mrp - discount.value;
                  }
                }

                return (
                  <div
                    key={item.uid}
                    className="flex gap-5 group/item transition-all hover:translate-x-1"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative w-24 h-24 bg-white rounded-lg p-3 flex-none flex items-center justify-center overflow-hidden transition-all duration-300 border border-zinc-100">
                      <img
                        src={item.images?.[0]?.url || ""}
                        alt={item.enName}
                        className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="text-[13px] font-black text-[#233f6c] line-clamp-2 leading-snug flex-1 uppercase tracking-tight">
                            {item.enName}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="text-zinc-300 hover:text-red-500 transition-all p-1 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-black text-[#004a99]">
                            ৳ {Math.round(price).toLocaleString()}
                          </span>
                          {discount && (
                            <span className="text-[10px] font-bold text-zinc-400 line-through">
                              ৳ {mrp.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="relative group mt-3 overflow-hidden bg-zinc-50 hover:bg-[#233f6c] text-[#233f6c] hover:text-white py-3 rounded-lg transition-all active:scale-[0.98] border border-zinc-100 hover:border-[#233f6c]"
                      >
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="relative flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                            Add to Cart
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {items.length > 0 && (
          <div className="p-5 relative bg-[#FFFFF6]">
            {/* Gloss Decoration */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

            <button
              onClick={closeWishlist}
              className="w-full py-4 font-medium bg-[#233f6c] text-white text-xs font-black rounded-lg hover:bg-[#004a99] transition-all shadow-lg active:scale-95 uppercase tracking-[0.2em]"
            >
              Browse More Favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
