"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/types/product";
import { AttributeSection } from "@/components/product/AttributeSection";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

// Modular Components
import { ProductGallery } from "./ProductGallery";
import { ProductPricing } from "./ProductPricing";
import { ProductActions } from "./ProductActions";
import { TrustBadges } from "./TrustBadges";

// ── Price Calculation Utility ──────────────────────────────────────────────────
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

  // Handle case where .value might be the final price
  if (d.value && d.value > mrp / 2 && d.value < mrp) selling = d.value;

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

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("attributes");

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.uid);
  const variant = product.variants?.[selectedVariantIdx];
  const { mrp, selling, savings, discountLabel } = calcPricing(variant);
  const inStock = (variant?.quantity ?? 0) > 0;

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-20">
        {/* Left: Gallery */}
        <ProductGallery
          images={product.images || []}
          selectedImageIdx={selectedImageIdx}
          setSelectedImageIdx={setSelectedImageIdx}
          productName={product.enName}
          discountLabel={discountLabel}
        />

        {/* Right: Info & Actions */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-50 border border-zinc-100 rounded-lg px-4 py-1.5 w-fit block">
              {product.uid}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight uppercase tracking-tight">
              {product.enName}
            </h1>
          </div>

          <ProductPricing
            mrp={mrp}
            selling={selling}
            savings={savings}
            discountLabel={discountLabel}
            inStock={inStock}
            quantityAvailable={variant?.quantity}
          />

          <ProductActions
            inStock={inStock}
            qty={qty}
            setQty={setQty}
            maxQty={variant?.quantity || 99}
            onAddToCart={() => addItem(product)}
            onBuyNow={() => addItem(product)}
            onToggleWishlist={() => toggleWishlist(product)}
            isLiked={isLiked}
          />

          <TrustBadges />
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="bg-white mb-20">
        <div className="flex overflow-x-auto border-b border-zinc-100 scrollbar-hide gap-3 py-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg ${
                activeTab === tab.key
                  ? "bg-[#233f6c] text-white shadow-lg shadow-blue-900/10"
                  : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <AttributeSection
            data={
              product[
                activeTab === "attributes"
                  ? "productAttributes"
                  : activeTab === "description"
                    ? "detailedDescriptions"
                    : activeTab === "delivery"
                      ? "deliveries"
                      : activeTab === "service"
                        ? "serviceAndDeliveries"
                        : "priceAndStocks"
              ] as any
            }
            variant={activeTab === "delivery" ? "minimal" : "default"}
          />
        </div>
      </div>
    </div>
  );
}
