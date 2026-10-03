"use client";

import { useState } from "react";
import { useCart } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";
import type { Product } from "@/features/products";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductDetailsWithCartProps = {
  productId: string;
  initialProduct?: Product;
};

export function ProductDetailsWithCart({
  productId,
  initialProduct,
}: ProductDetailsWithCartProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  return (
    <ProductDetailsPage
      productId={productId}
      initialProduct={initialProduct}
      actions={({
        product,
        selectedOptions,
        quantity,
        currentPrice,
        totalPrice,
      }) => {
        const handleAddToCart = () => {
          for (let i = 0; i < quantity; i++) {
            addItem({
              productId: product.id,
              name: product.name,
              price: currentPrice,
              image: product.images[0],
              selectedOptions,
            });
          }
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 2000);
        };

        return (
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex h-[50px] flex-1 items-center justify-center rounded bg-[#1a1a1a] px-6 text-[13px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#333333] active:scale-[0.99]"
          >
            {justAdded
              ? "Added to Cart ✓"
              : `Add to Cart / ${formatWholePrice(totalPrice)}`}
          </button>
        );
      }}
    />
  );
}
