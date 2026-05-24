"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Tag,
  Package,
} from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { AttributeSection } from "@/components/product/AttributeSection";

const PLACEHOLDER = "https://placehold.co/600x600/f4f4f5/a1a1aa?text=No+Image";

// ── Price Calculation ──────────────────────────────────────────────────────────
function calcPricing(variant?: ProductVariant) {
  if (!variant) return { mrp: 0, selling: 0, savings: 0, discountLabel: null };
  const mrp = variant.mrpPrice || 0;
  const d = variant.discount;

  if (!d || d.type === "NOT_AVAILABLE") {
    return { mrp, selling: mrp, savings: 0, discountLabel: null };
  }

  let selling = mrp;
  let discountLabel: string | null = null;

  if (d.type === "FLAT") {
    selling = mrp - d.amount;
    discountLabel = `Save ৳${d.amount.toLocaleString()}`;
  } else if (d.type === "PERCENTAGE") {
    selling = mrp - (mrp * d.amount) / 100;
    discountLabel = `${d.amount}% OFF`;
  }

  // Use discount.value as truth if available and reasonable
  if (d.value && d.value < mrp && d.value > 0) selling = d.value;

  return { mrp, selling, savings: mrp - selling, discountLabel };
}

// ── Tab Definitions ────────────────────────────────────────────────────────────
const TABS = [
  { key: "attributes", label: "Specifications" },
  { key: "description", label: "Description" },
  { key: "delivery", label: "Delivery" },
  { key: "service", label: "Service" },
  { key: "pricing", label: "Price & Stock" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// ── Component ──────────────────────────────────────────────────────────────────
export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("attributes");

  const variant = product.variants?.[selectedVariantIdx];
  const { mrp, selling, savings, discountLabel } = calcPricing(variant);
  const inStock = (variant?.quantity ?? 0) > 0;
  const images = product.images?.length
    ? product.images
    : [{ url: PLACEHOLDER }];

  return (
    <div className="container mx-auto py-12 px-4">
      {/* ── Top: Gallery + Info ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden group">
            <Image
              src={images[selectedImageIdx]?.url || PLACEHOLDER}
              alt={product.enName}
              fill
              className="object-contain p-10 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIdx((i) => Math.max(0, i - 1))}
                  disabled={selectedImageIdx === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow flex items-center justify-center text-zinc-500 hover:text-[#004a99] disabled:opacity-20 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIdx((i) =>
                      Math.min(images.length - 1, i + 1),
                    )
                  }
                  disabled={selectedImageIdx === images.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow flex items-center justify-center text-zinc-500 hover:text-[#004a99] disabled:opacity-20 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            {discountLabel && (
              <div className="absolute top-4 left-4 bg-[#e31e24] text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                {discountLabel}
              </div>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                <span className="text-zinc-400 font-black text-xl uppercase tracking-widest">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIdx(i)}
                  className={`shrink-0 w-20 h-20 rounded-2xl border-2 overflow-hidden bg-white transition-all duration-200 ${
                    i === selectedImageIdx
                      ? "border-[#004a99] shadow-lg shadow-blue-900/10"
                      : "border-zinc-100 hover:border-zinc-300"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt=""
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-1 mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-6">
          {/* UID badge */}
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-50 border border-zinc-100 rounded-full px-4 py-1.5 w-fit">
            {product.uid}
          </span>

          {/* Name */}
          <h1 className="text-3xl font-black text-zinc-900 leading-tight">
            {product.enName}
          </h1>

          {/* Pricing */}
          <div className="bg-zinc-50/60 border border-zinc-100 rounded-3xl p-6 space-y-3">
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-5xl font-black text-[#004a99] tabular-nums">
                ৳{Math.round(selling).toLocaleString()}
              </span>
              {savings > 0 && (
                <span className="text-xl text-zinc-400 line-through tabular-nums mb-1">
                  ৳{mrp.toLocaleString()}
                </span>
              )}
            </div>
            {savings > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#e31e24]" />
                <span className="text-sm font-bold text-[#e31e24]">
                  You save ৳{Math.round(savings).toLocaleString()}{" "}
                  {discountLabel && `(${discountLabel})`}
                </span>
              </div>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4 text-zinc-400" />
            {inStock ? (
              <span className="text-sm font-bold text-green-600">
                In Stock — {variant?.quantity?.toLocaleString()} units available
              </span>
            ) : (
              <span className="text-sm font-bold text-[#e31e24]">
                Out of Stock
              </span>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 1 && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-zinc-400 mb-3">
                Variants
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariantIdx(i)}
                    className={`px-4 py-2 rounded-2xl border-2 text-sm font-bold transition-all duration-200 ${
                      i === selectedVariantIdx
                        ? "border-[#004a99] bg-[#004a99] text-white shadow-lg shadow-blue-900/20"
                        : "border-zinc-100 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {v.posItemCode || `Variant ${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="h-px bg-zinc-100" />

          {/* Quantity */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-zinc-400 mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-1 bg-white border-2 border-zinc-100 rounded-2xl w-fit p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-50 font-bold text-zinc-600 transition-colors text-lg"
              >
                −
              </button>
              <span className="w-12 text-center font-black text-zinc-900 text-lg tabular-nums">
                {qty}
              </span>
              <button
                onClick={() =>
                  setQty((q) => Math.min(variant?.quantity || 99, q + 1))
                }
                disabled={!inStock}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-50 font-bold text-zinc-600 transition-colors text-lg disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              disabled={!inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-[#004a99] text-white font-black py-4 rounded-2xl text-base hover:bg-[#003a77] transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button className="w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-zinc-100 text-zinc-400 hover:border-[#e31e24] hover:text-[#e31e24] transition-all duration-300 active:scale-90">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Tabs: Specifications, Description, Delivery, etc. ── */}
      <div className="border border-zinc-100 rounded-3xl bg-white shadow-sm overflow-hidden">
        {/* Tab Bar */}
        <div className="flex overflow-x-auto border-b border-zinc-100">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "border-[#004a99] text-[#004a99]"
                  : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "attributes" && (
            <AttributeSection data={product.productAttributes} />
          )}
          {activeTab === "description" && (
            <AttributeSection data={product.detailedDescriptions} />
          )}
          {activeTab === "delivery" && (
            <AttributeSection data={product.deliveries} />
          )}
          {activeTab === "service" && (
            <AttributeSection data={product.serviceAndDeliveries} />
          )}
          {activeTab === "pricing" && (
            <AttributeSection data={product.priceAndStocks} />
          )}
        </div>
      </div>
    </div>
  );
}
