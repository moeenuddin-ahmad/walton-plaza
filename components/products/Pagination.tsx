"use client";

import React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-t border-zinc-100 mt-16 group/pagination">
      {/* Left side: Premium Limit Selector */}
      <div className="flex items-center gap-4 group/limit">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover/limit:text-[#004a99] transition-colors duration-300">
          Showing
        </label>
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="appearance-none bg-white border-2 border-zinc-100 rounded-2xl pl-5 pr-10 py-2.5 text-sm font-bold text-zinc-900 focus:outline-none focus:border-[#004a99] transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95"
          >
            {[12, 24, 48, 96].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover/limit:text-[#004a99] transition-colors duration-300">
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
          </div>
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Products
        </span>
      </div>

      {/* Right side: Modern Pagination Controls */}
      <div className="flex items-center gap-2 p-1.5 bg-zinc-50/50 rounded-[22px] border border-zinc-100 shadow-inner">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-zinc-100 text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#004a99] hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 transform active:scale-90"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5) {
              if (currentPage > 3) pageNum = currentPage - 2 + i;
              if (pageNum + (4 - i) > totalPages)
                pageNum = totalPages - (4 - i);
            }

            if (pageNum <= 0) return null;
            if (pageNum > totalPages) return null;

            const isActive = currentPage === pageNum;

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-11 h-11 rounded-2xl text-sm font-black transition-all duration-500 transform active:scale-90 ${
                  isActive
                    ? "bg-[#004a99] text-white shadow-xl shadow-blue-900/30 ring-4 ring-blue-50"
                    : "text-zinc-500 hover:bg-white hover:text-black hover:shadow-md"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-zinc-100 text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#004a99] hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 transform active:scale-90"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
