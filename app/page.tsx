import { getProductsList } from "@/actions/products";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

const Home = async () => {
  const { products, count } = await getProductsList(0, 12);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter text-zinc-900">
            Featured Products
          </h1>
          <p className="text-zinc-500 font-medium text-lg">
            Showing <span className="text-black">{products?.length || 0}</span>{" "}
            of {count || 0} items
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products?.map((product: Product) => (
          <ProductCard key={product.uid} product={product} />
        )) || (
          <div className="col-span-full py-24 text-center">
            <p className="text-zinc-400 text-lg">
              No products found. Check your API connection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
