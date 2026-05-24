export interface AttributeEntry {
  enLabel: string;
  values: { enName: string }[];
}

export interface Product {
  uid: string;
  enName: string;
  images: { url: string }[];
  variants: ProductVariant[];
  productAttributes?: AttributeEntry[] | null;
  detailedDescriptions?: AttributeEntry[] | null;
  deliveries?: AttributeEntry[] | null;
  serviceAndDeliveries?: AttributeEntry[] | null;
  priceAndStocks?: AttributeEntry[] | null;
}

export interface ProductVariant {
  mrpPrice: number;
  quantity: number;
  ebsItemCode?: string;
  posItemCode?: string;
  discount?: ProductDiscount | null;
}

export interface ProductDiscount {
  amount: number;
  value: number;
  type: "PERCENTAGE" | "FLAT" | "NOT_AVAILABLE";
}
