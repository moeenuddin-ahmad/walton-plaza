import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  isOpen: boolean;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (uid: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
  openWishlist: () => void;
  closeWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleWishlist: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((item) => item.uid === product.uid);

        if (exists) {
          set({
            items: currentItems.filter((item) => item.uid !== product.uid),
          });
        } else {
          set({ items: [...currentItems, product] });
        }
      },

      isInWishlist: (uid) => {
        return get().items.some((item) => item.uid === uid);
      },

      clearWishlist: () => set({ items: [] }),

      getTotalItems: () => get().items.length,

      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),
    }),
    {
      name: "walton-wishlist-storage",
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen state
    },
  ),
);
