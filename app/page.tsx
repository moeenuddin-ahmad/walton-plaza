import { getProductsList } from "@/actions/products";
import ProductList from "@/components/products/ProductList";
import { DEFAULT_LIMIT } from "@/constants";

const Home = async () => {
  const { products, count } = await getProductsList(0, DEFAULT_LIMIT);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center md:mb-12 mb-5 flex-wrap">
        <h1 className="text-2xl md:text-4xl font-black text-black font-semibold">
          Featured Products
        </h1>
        <p className="text-gray-500 font-normal text-sm md:text-base">
          Showing <span className="text-black">{products?.length || 0}</span> of{" "}
          <span className="text-black">{count || 0}</span> items
        </p>
      </div>
      <ProductList initialProducts={products} totalCount={count} />
    </div>
  );
};

export default Home;
