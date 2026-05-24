"use server";

import { GET_PRODUCT_DETAIL } from "@/queries/products";
import { GET_PRODUCTS_LIST } from "@/queries/products";

// check env please
const API_URL = process.env.API;

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
    });

    const { data } = await response.json();
    return {
      products: data?.getProducts?.result?.products,
      count: data?.getProducts?.result?.count,
    };
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
    });

    const json = await response.json();
    return json?.data?.getProducts?.result?.products?.[0] || null;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}
