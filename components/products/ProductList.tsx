"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Pagination } from "../layout/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";
import { FilterSidebar } from "./FilterSidebar";

const ProductList = ({
  initialProducts,
  totalCount,
}: {
  initialProducts: Product[];
  totalCount: number;
}) => {
  const {
    products,
    currentPage,
    limit,
    isPending,
    filters,
    sort,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    handleSortChange,
  } = useProducts({ initialProducts, totalCount });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="hidden lg:block w-72 shrink-0">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </aside>

      <div className="flex-1 space-y-8">
        {/* Sort & Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-4 bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#233f6c]">
              Sort By:
            </span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-[#233f6c] focus:ring-0 cursor-pointer"
            >
              <option value="default">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              View:
            </span>
            {[12, 24, 48].map((l) => (
              <button
                key={l}
                onClick={() => handleLimitChange(l)}
                className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
                  limit === l
                    ? "bg-[#233f6c] text-white shadow-lg shadow-blue-900/10"
                    : "bg-zinc-50 text-zinc-400 hover:bg-zinc-100"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {isPending
            ? Array.from({ length: limit }).map((_, i) => (
                <ProductCardSkeleton key={`skeleton-${i}`} />
              ))
            : products?.map((product: Product) => (
                <ProductCard key={product.uid} product={product} />
              )) || (
                <div className="col-span-full py-24 text-center">
                  <p className="text-zinc-400 text-lg font-medium">
                    No products found matching your criteria.
                  </p>
                  <button
                    onClick={() =>
                      handleFilterChange({
                        priceRange: [0, 500000],
                        isAvailable: null,
                        category: "",
                      })
                    }
                    className="mt-4 text-[#233f6c] font-black uppercase text-[10px] tracking-widest hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
        </div>

        <Pagination
          totalItems={totalCount}
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
