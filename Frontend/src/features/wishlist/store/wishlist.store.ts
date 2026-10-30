"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { WishlistItem } from "@/features/wishlist/types/wishlist.types";
import { toast } from "@/lib/toast";

type WishlistStore = {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, "id" | "addedAt">) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (input) =>
        set((state) => {
          // Check if already in wishlist
          const exists = state.items.some(
            (item) => item.productId === input.productId
          );

          if (exists) {
            toast.info("Already in wishlist", {
              description: `${input.name} is already in your wishlist`,
            });
            return state;
          }

          const newItem: WishlistItem = {
            ...input,
            id: `wishlist-${input.productId}-${Date.now()}`,
            addedAt: new Date().toISOString(),
          };

          toast.success("Added to wishlist", {
            description: `${input.name} has been added to your wishlist`,
          });

          return {
            items: [...state.items, newItem],
          };
        }),
      removeItem: (productId) =>
        set((state) => {
          const item = state.items.find((i) => i.productId === productId);
          if (item) {
            toast.success("Removed from wishlist", {
              description: `${item.name} has been removed from your wishlist`,
            });
          }
          return {
            items: state.items.filter((i) => i.productId !== productId),
          };
        }),
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
      clearWishlist: () =>
        set(() => {
          toast.info("Wishlist cleared", {
            description: "All items have been removed from your wishlist",
          });
          return { items: [] };
        }),
    }),
    {
      name: "odoratus-wishlist-storage", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
