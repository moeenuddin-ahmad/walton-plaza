import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  count: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (uid: string) => void;
  updateQuantity: (uid: string, count: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.uid === product.uid,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.uid === product.uid
                ? { ...item, count: item.count + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, count: 1 }] });
        }
        set({ isOpen: true });
      },

      removeItem: (uid) => {
        set({
          items: get().items.filter((item) => item.uid !== uid),
        });
      },

      updateQuantity: (uid, count) => {
        if (count <= 0) {
          get().removeItem(uid);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.uid === uid ? { ...item, count } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.count, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const variant = item.variants?.[0];
          const mrp = variant?.mrpPrice || 0;
          const discount = variant?.discount;

          let price = mrp;
          if (discount && discount.type !== "NOT_AVAILABLE") {
            if (discount.type === "PERCENTAGE") {
              price = mrp - (mrp * discount.value) / 100;
            } else if (discount.type === "FLAT") {
              price = mrp - discount.value;
            }
          }

          return total + Math.round(price) * item.count;
        }, 0);
      },
    }),
    {
      name: "walton-cart-storage", // key in localStorage
    },
  ),
);
