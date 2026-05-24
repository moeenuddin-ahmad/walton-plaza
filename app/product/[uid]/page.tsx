import { getProductDetail } from "@/actions/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/product/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ uid: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { uid } = await params;
  const product = await getProductDetail(uid);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
