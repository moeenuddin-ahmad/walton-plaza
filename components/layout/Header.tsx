"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Search, Heart, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const Header = () => {
  const { openCart, getTotalItems: getTotalCartItems } = useCartStore();
  const { getTotalItems: getTotalWishlistItems, openWishlist } =
    useWishlistStore();

  const cartItemCount = getTotalCartItems();
  const wishlistCount = getTotalWishlistItems();

  return (
    <header className="border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 lg:px-1 py-2.5 lg:py-4">
        {/* Top Row: Logo & Actions (Mobile) | All (Desktop) */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex-none -ml-1 hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          >
            <img
              src="/logo.svg"
              alt="Walton Plaza"
              className="h-4.5 sm:h-6 w-auto"
            />
          </Link>

          {/* Search Bar - Hidden on Mobile, Visible on Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-[#233f6c] transition-all" />
              </div>
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-4xl py-3 pl-12 pr-4 text-[15px] font-medium focus:outline-none focus:border-[#233f6c] focus:bg-white focus:ring-4 focus:ring-[#233f6c]/5 focus:shadow-md transition-all placeholder:text-zinc-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 p-1">
                <div className="hidden sm:flex items-center gap-1 bg-white border border-zinc-200 rounded-lg px-2 py-1 shadow-sm transition-all group-focus-within:opacity-0 pointer-events-none">
                  <kbd className="font-sans text-[10px] font-bold text-zinc-400">
                    ⌘
                  </kbd>
                  <kbd className="font-sans text-[10px] font-bold text-zinc-400">
                    K
                  </kbd>
                </div>
                <button className="hidden group-focus-within:flex items-center justify-center bg-[#233f6c] hover:bg-[#004a99] text-white rounded-lg px-4 py-1.5 text-xs font-bold transition-all animate-in fade-in slide-in-from-right-2 duration-300">
                  SEARCH
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-none">
            {/* Wishlist */}
            <button
              onClick={openWishlist}
              className="relative p-2 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-all group active:scale-90"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${wishlistCount > 0 ? "text-red-500 fill-red-500" : "text-zinc-600 group-hover:text-red-500"}`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-all group active:scale-90"
            >
              <ShoppingBag className="w-5 h-5 text-[#233f6c]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e31e24] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Account Divider */}
            <div className="hidden sm:block h-8 w-px bg-zinc-200 mx-1" />

            {/* Account */}
            <button className="flex items-center gap-2 p-1.5 sm:p-2 sm:px-3 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-all group active:scale-95">
              <div className="bg-[#233f6c] p-1.5 rounded-full">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-xs font-bold text-[#233f6c] uppercase tracking-wider">
                Login
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible under Logo/Actions row on max-lg screens */}
        <div className="lg:hidden mt-3">
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-[#233f6c] transition-all" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-[#233f6c] focus:bg-white transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
