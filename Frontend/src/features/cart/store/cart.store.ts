"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AddToCartInput,
  CartLine,
} from "@/features/cart/types/cart.types";
import { getCartLineId } from "@/features/cart/utils/cart.utils";
import { toast } from "@/lib/toast";

type CartStore = {
  lines: CartLine[];
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  increment: (lineId: string) => void;
  decrement: (lineId: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (input) =>
        set((state) => {
          const id = getCartLineId(input.productId, input.selectedOptions);
          const existing = state.lines.find((line) => line.id === id);

          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
              ),
            };
          }

          toast.success("Added to cart", {
            description: `${input.name} has been added to your cart`,
          });
          return {
            lines: [...state.lines, { ...input, id, quantity: 1 }],
          };
        }),
      removeItem: (lineId) =>
        set((state) => {
          const item = state.lines.find((line) => line.id === lineId);
          if (item) {
            toast.success("Removed from cart", {
              description: `${item.name} has been removed from your cart`,
            });
          }
          return {
            lines: state.lines.filter((line) => line.id !== lineId),
          };
        }),
      increment: (lineId) =>
        set((state) => {
          
          return {
            lines: state.lines.map((line) =>
              line.id === lineId ? { ...line, quantity: line.quantity + 1 } : line,
            ),
          };
        }),
      decrement: (lineId) =>
        set((state) => {
          const item = state.lines.find((line) => line.id === lineId);
          if (item && item.quantity > 1) {
            toast.success("Quantity updated", {
              description: `${item.name} quantity decreased to ${item.quantity - 1}`,
            });
          }
          return {
            lines: state.lines.map((line) => {
              if (line.id !== lineId) {
                return line;
              }
             
              if (line.quantity <= 1) {
                return line;
              }
              return { ...line, quantity: line.quantity - 1 };
            }),
          };
        }),
    }),
    {
      name: "odoratus-cart-storage", // 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
