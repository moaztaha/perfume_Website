"use client";

import type { ProductSort } from "@/features/products/types/product.types";


export function useProductSort(sort?: ProductSort) {
  return {
    sort,
    setSort: (value: ProductSort | undefined) => {
      void value;
    },
  };
}
