export interface Product {
  uid: string;
  enName: string;
  images: { url: string }[];
  variants: ProductVariant[];
}

export interface ProductVariant {
  mrpPrice: number;
  quantity: number;
  discount: ProductDiscount;
}

export interface ProductDiscount {
  amount: number;
  value: number;
  type: "PERCENTAGE" | "FLAT" | "NOT_AVAILABLE";
}
