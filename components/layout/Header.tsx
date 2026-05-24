"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export const Header = () => {
  const { openCart, getTotalItems } = useCartStore();
  const itemCount = getTotalItems();

  return (
    <header className="border-b border-zinc-100 py-6 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="font-bold text-xl tracking-tight text-[#233f6c]">
        WALTON PLAZA
      </div>

      <nav className="hidden md:flex gap-8 text-sm font-bold text-zinc-500 uppercase tracking-widest">
        <a href="#" className="hover:text-[#233f6c] transition-colors">
          Shop
        </a>
        <a href="#" className="hover:text-[#233f6c] transition-colors">
          Categories
        </a>
        <a href="#" className="hover:text-[#233f6c] transition-colors">
          About
        </a>
      </nav>

      <div className="flex items-center gap-6">
        <button
          onClick={openCart}
          className="relative p-2.5 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-all group active:scale-90"
        >
          <ShoppingBag className="w-5 h-5 text-[#233f6c]" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e31e24] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
