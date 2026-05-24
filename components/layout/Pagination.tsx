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
    <div className="mt-16 bg-white border border-zinc-100 rounded-md p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 group/pagination">
        {/* Left side: Simple Limit Selector */}
        <div className="flex items-center gap-3 group/limit">
          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="appearance-none bg-white border border-zinc-200 rounded-lg pl-4 pr-9 py-2 text-sm font-bold text-zinc-900 focus:outline-none focus:border-[#233f6c] transition-all cursor-pointer hover:bg-zinc-50"
            >
              {[12, 24, 36].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </div>
          <span className="text-xs font-medium tracking-wider text-gray-500">
            Products
          </span>
        </div>

        {/* Right side: Simple Pagination Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#233f6c] hover:text-white hover:border-[#233f6c] transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>

          <div className="flex items-center gap-1">
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
                  className={`w-10 h-10 rounded-full text-sm font-bold border transition-all duration-300 ${
                    isActive
                      ? "bg-[#233f6c] text-white border-[#233f6c] shadow-sm"
                      : "text-zinc-500 border-zinc-200 hover:bg-[#233f6c] hover:text-white hover:border-[#233f6c]"
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
            className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#233f6c] hover:text-white hover:border-[#233f6c] transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};
