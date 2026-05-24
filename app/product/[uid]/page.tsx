import { getProductDetail } from "@/actions/products";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ uid: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { uid } = await params;
  const product: Product = await getProductDetail(uid);

  if (!product) {
    notFound();
  }

  const variant = product.variants?.[0];
  const mrp = variant?.mrpPrice || 0;
  const discount = variant?.discount;

  let discountedPrice = mrp;
  if (discount && discount.type !== "NOT_AVAILABLE") {
    if (discount.type === "PERCENTAGE") {
      discountedPrice = mrp - (mrp * discount.value) / 100;
    } else if (discount.type === "FLAT") {
      discountedPrice = mrp - discount.value;
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-3xl border border-zinc-100 p-12 flex items-center justify-center">
            <img
              src={product.images?.[0]?.url}
              alt={product.enName}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img, index) => (
              <div
                key={index}
                className="aspect-square bg-white rounded-xl border border-zinc-100 p-2 cursor-pointer hover:border-black transition-colors"
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-zinc-400 font-bold tracking-widest uppercase text-sm mb-2">
            {product.uid}
          </p>
          <h1 className="text-4xl font-black text-[#004a99] mb-4 leading-tight">
            {product.enName}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl font-black text-black">
              ৳ {Math.round(discountedPrice).toLocaleString()}
            </div>
            {mrp > discountedPrice && (
              <div className="text-zinc-400 line-through text-xl">
                ৳ {mrp.toLocaleString()}
              </div>
            )}
            {discount?.value > 0 && (
              <div className="bg-[#e31e24] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {discount.value}% OFF
              </div>
            )}
          </div>

          <div className="h-px bg-zinc-100 w-full mb-8" />

          <div className="space-y-6 mb-12">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4">
                Availability
              </h3>
              <p className="text-zinc-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Available In Selected Plaza
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-4 border border-zinc-200 w-fit rounded-xl p-1">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 rounded-lg font-bold text-xl">
                  -
                </button>
                <span className="w-12 text-center font-bold">1</span>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 rounded-lg font-bold text-xl">
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto flex gap-4">
            <button className="flex-1 bg-[#004a99] text-white font-bold py-5 rounded-2xl text-lg hover:bg-[#003366] transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98]">
              Buy Now
            </button>
            <button className="px-6 rounded-2xl border-2 border-zinc-100 hover:border-[#004a99] hover:bg-zinc-50 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
