"use client";

import React from "react";

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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-12 border-t border-zinc-100 mt-12 w-full">
      {/* Left side: Limit Selector */}
      <div className="flex items-center gap-3 text-sm font-medium text-zinc-500">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#004a99] transition-all cursor-pointer shadow-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>items per page</span>
      </div>

      {/* Right side: Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2.5 rounded-xl border border-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
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

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 ${
                  currentPage === pageNum
                    ? "bg-[#004a99] text-white shadow-lg shadow-blue-900/20"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-black"
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
          className="p-2.5 rounded-xl border border-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
