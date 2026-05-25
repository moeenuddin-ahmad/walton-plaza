"use client";

import React from "react";
import { Filter, X, ChevronDown } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    isAvailable: boolean | null;
    category: string;
  };
  onFilterChange: (filters: any) => void;
  onClose?: () => void;
}

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onClose,
}: FilterSidebarProps) => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-8 sticky top-28">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#233f6c]" />
          <h2 className="text-sm font-black uppercase tracking-widest text-[#233f6c]">
            Filters
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-50 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Availability */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Availability
        </p>
        <div className="space-y-2">
          {[
            { label: "All Products", value: null },
            { label: "In Stock", value: true },
            { label: "Out of Stock", value: false },
          ].map((item) => (
            <label
              key={item.label}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.isAvailable === item.value}
                  onChange={() =>
                    onFilterChange({ ...filters, isAvailable: item.value })
                  }
                  className="peer appearance-none w-5 h-5 border-2 border-zinc-200 rounded-md checked:border-[#233f6c] checked:bg-[#233f6c] transition-all cursor-pointer"
                />
                <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none transition-opacity">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
              </div>
              <span className="text-xs font-bold text-zinc-600 group-hover:text-[#233f6c] transition-colors uppercase tracking-wider">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Category
        </p>
        <div className="relative group">
          <select
            value={filters.category}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-3 px-4 text-xs font-bold text-[#233f6c] appearance-none focus:outline-none focus:border-[#233f6c] transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="mobile">Mobile Phones</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
        </div>
      </div>

      <button
        onClick={() =>
          onFilterChange({
            isAvailable: null,
            category: "",
          })
        }
        className="w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-[#e31e24] transition-colors border-t border-zinc-50 pt-6"
      >
        Reset Filters
      </button>
    </div>
  );
};
