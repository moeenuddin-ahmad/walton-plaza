import { useState, useTransition } from "react";
import { Product } from "@/types/product";
import { getProductsList } from "@/actions/products";

interface UseProductsProps {
  initialProducts: Product[];
  totalCount: number;
  initialLimit?: number;
}

export const useProducts = ({
  initialProducts,
  totalCount,
  initialLimit = 10,
}: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(totalCount / limit);

  const fetchProducts = (page: number, newLimit: number) => {
    if (page < 1 || (page > totalPages && totalPages !== 0)) return;

    startTransition(async () => {
      const skip = (page - 1) * newLimit;
      const response = await getProductsList(skip, newLimit);

      if (response?.products) {
        setProducts(response.products);
        setCurrentPage(page);
        if (newLimit !== limit) setLimit(newLimit);

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

  return {
    products,
    currentPage,
    limit,
    isPending,
    totalPages,
    handlePageChange,
    handleLimitChange,
  };
};
