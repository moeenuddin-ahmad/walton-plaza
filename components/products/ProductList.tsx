"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Pagination } from "../layout/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";

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
    handlePageChange,
    handleLimitChange,
  } = useProducts({ initialProducts, totalCount });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isPending
          ? Array.from({ length: limit }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))
          : products?.map((product: Product) => (
              <ProductCard key={product.uid} product={product} />
            )) || (
              <div className="col-span-full py-24 text-center">
                <p className="text-zinc-400 text-lg">
                  No products found. Check your API connection.
                </p>
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
    </>
  );
};

export default ProductList;
