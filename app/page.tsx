import { getProductsList } from "@/actions/products";
import ProductList from "@/components/products/ProductList";

const Home = async () => {
  const { products, count } = await getProductsList(0, 10);

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
      <ProductList initialProducts={products} totalCount={count} />
    </div>
  );
};

export default Home;
