"use client";

import React, { useEffect } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Truck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export const CartSidebar: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const freeShippingThreshold = 250000; // Example threshold
  const shippingProgress = Math.min(
    (totalPrice / freeShippingThreshold) * 100,
    100,
  );

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

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-end transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#233f6c]/30 backdrop-blur-[6px] transition-opacity duration-700 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
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
                <div className="bg-gradient-to-br from-[#233f6c] to-[#004a99] p-3 rounded-2xl shadow-lg shadow-blue-900/20">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ring-2 ring-red-500/20">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#233f6c] tracking-tight leading-none mb-1">
                  YOUR CART
                </h2>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                  Select products to checkout
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2.5 border border-zinc-200 hover:bg-zinc-50 rounded-full transition-all group active:scale-90"
            >
              <X className="w-6 h-6 text-gray-400 group-hover:text-zinc-900 transition-colors" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="p-5 bg-zinc-50/50 border-y border-zinc-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Truck
                  className={`w-4 h-4 ${shippingProgress >= 100 ? "text-green-500" : "text-[#233f6c]"}`}
                />
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide">
                  {shippingProgress >= 100
                    ? "You unlocked Free Shipping!"
                    : `Add ৳ ${(freeShippingThreshold - totalPrice).toLocaleString()} more for Free Shipping`}
                </span>
              </div>
              <span className="text-[11px] font-black text-[#233f6c]">
                {Math.round(shippingProgress)}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#233f6c] to-[#004a99] transition-all duration-1000 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center animate-pulse">
                  <ShoppingBag className="w-10 h-10 text-zinc-200" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-black text-[#233f6c] mb-2 uppercase tracking-tight">
                Empty Cart
              </h3>
              <p className="text-sm font-medium text-zinc-500 mb-8 leading-relaxed">
                Explore our featured products and add them to your cart for a
                premium shopping experience.
              </p>
              <button
                onClick={closeCart}
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
                    <div className="relative w-24 h-24 bg-white rounded-3xl p-3 flex-none flex items-center justify-center overflow-hidden transition-all duration-300">
                      <img
                        src={item.images?.[0]?.url || ""}
                        alt={item.enName}
                        className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="text-[13px] font-medium font-black text-[#233f6c] line-clamp-2 leading-snug flex-1 uppercase tracking-tight">
                            {item.enName}
                          </h4>
                          <button
                            onClick={() => removeItem(item.uid)}
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

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-zinc-50 border border-zinc-100 rounded-xl p-1 shadow-inner">
                          <button
                            onClick={() =>
                              updateQuantity(item.uid, item.count - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all text-zinc-400 hover:text-[#233f6c]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-xs font-black text-[#233f6c]">
                            {item.count}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.uid, item.count + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all text-zinc-400 hover:text-[#233f6c]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-black text-[#233f6c]">
                          ৳ {(Math.round(price) * item.count).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {items.length > 0 && (
          <div className="p-5 space-y-6 relative">
            <div className="absolute inset-0 bg-[#FFFFF6] -z-10" />
            {/* Gloss Decoration */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                <span>Order Summary</span>
                <span>{getTotalItems()} Items</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-zinc-900">
                    ৳ {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  <span>GST / Tax</span>
                  <span className="text-zinc-900">৳ 0</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                      Grand Total
                    </p>
                    <p className="text-3xl font-black text-[#233f6c] tracking-tighter">
                      ৳ {totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-green-600 mb-1 justify-end">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest">
                        Secure Order
                      </span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                      Inc. all localized taxes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="relative group w-full overflow-hidden bg-[#233f6c] text-white font-black py-5 rounded-2xl transition-all shadow-[0_20px_40px_rgba(35,63,108,0.2)] hover:shadow-[0_25px_50px_rgba(35,63,108,0.3)] hover:-translate-y-1 active:scale-[0.98]">
              {/* Shine Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative flex items-center justify-center gap-4">
                <span className="tracking-[0.2em] text-xs">
                  PROCEED TO SECURE CHECKOUT
                </span>
                <div className="bg-white/10 p-1.5 rounded-lg border border-white/10">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
            <p className="text-[9px] text-center text-zinc-400 font-bold uppercase tracking-[0.2em]">
              Pay securely via Walton Payment Gateway
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
