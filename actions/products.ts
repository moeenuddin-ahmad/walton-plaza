"use server";

import { GET_PRODUCT_DETAIL } from "@/queries/products";
import { GET_PRODUCTS_LIST } from "@/queries/products";

// check env please
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// list page
export async function getProductsList(
  skip: number = 0,
  limit: number = 10,
): Promise<any> {
  try {
    const response = await fetch(API_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_PRODUCTS_LIST,
        variables: { skip, limit },
      }),
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    return null;
  }
}

// details page
export async function getProductDetail(uid: string): Promise<any> {
  try {
    const response = await fetch(API_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_PRODUCT_DETAIL,
        variables: { uid },
      }),
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}
