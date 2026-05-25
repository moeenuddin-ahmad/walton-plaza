import { useState, useTransition } from "react";
import { Product } from "@/types/product";
import { getProductsList } from "@/actions/products";

import { DEFAULT_LIMIT } from "@/constants";

interface UseProductsProps {
  initialProducts: Product[];
  totalCount: number;
  initialLimit?: number;
}

export const useProducts = ({
  initialProducts,
  totalCount,
  initialLimit = DEFAULT_LIMIT,
}: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [isPending, startTransition] = useTransition();

  // Filters & Sorting
  const [filters, setFilters] = useState({
    isAvailable: null as boolean | null,
    category: "",
  });
  const [sort, setSort] = useState("default");

  const totalPages = Math.ceil(totalCount / limit);

  const fetchProducts = (
    page: number,
    newLimit: number,
    currentFilters = filters,
    currentSort = sort,
  ) => {
    if (page < 1 || (page > totalPages && totalPages !== 0)) return;

    startTransition(async () => {
      const skip = (page - 1) * newLimit;

      // Note: In a real scenario, we would pass currentFilters and currentSort
      // to the getProductsList action which would then pass them to GraphQL.
      const response = await getProductsList(skip, newLimit);

      if (response?.products) {
        setProducts(response.products);
        setCurrentPage(page);
        setLimit(newLimit);
        setFilters(currentFilters);
        setSort(currentSort);

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    fetchProducts(1, newLimit);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    fetchProducts(1, limit, newFilters);
  };

  const handleSortChange = (newSort: string) => {
    fetchProducts(1, limit, filters, newSort);
  };

  return {
    products,
    currentPage,
    limit,
    isPending,
    totalPages,
    filters,
    sort,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    handleSortChange,
  };
};
