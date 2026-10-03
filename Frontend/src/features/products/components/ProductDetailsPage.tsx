"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import {
  ProductDetailsHeader,
  ProductScentAnatomy,
} from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { ProductCompanions } from "@/features/products/components/ProductCompanions";
import { useProduct } from "@/features/products/hooks/useProduct";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  currentPrice: number;
  totalPrice: number;
};

type ProductDetailsPageProps = {
  productId: string;
  initialProduct?: Product;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  initialProduct,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = initialProduct ?? productQuery.data;

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [giftWrapping, setGiftWrapping] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Determine current volume and unit price based on selection
  const { selectedVolume, currentPrice } = useMemo(() => {
    if (!product) {
      return { selectedVolume: "100 ml", currentPrice: 0 };
    }

    const volumeOpts =
      product.volumeOptions && product.volumeOptions.length > 0
        ? product.volumeOptions
        : [
          { size: "30 ml", price: 140 },
          { size: "50 ml", price: 180 },
          { size: "100 ml", price: product.price },
        ];

    const chosen =
      selectedOptions["volume"] ?? volumeOpts[volumeOpts.length - 1]?.size ?? "100 ml";
    const matched = volumeOpts.find((v) => v.size === chosen);

    return {
      selectedVolume: chosen,
      currentPrice: matched ? matched.price : product.price,
    };
  }, [product, selectedOptions]);

  const totalPrice = currentPrice * quantity;

  // Combine options including volume and gift wrapping for cart storage
  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    const base: Record<string, string> = {
      volume: selectedVolume,
      ...selectedOptions,
    };

    if (giftWrapping) {
      base["giftWrapping"] = "Signature Gift Wrapping";
    }

    return base;
  }, [product, selectedVolume, selectedOptions, giftWrapping]);

  if (!initialProduct && productQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-[#605a54]">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
        <p className="text-lg font-semibold text-[#1a1a1a]">Product not found</p>
        <p className="text-sm text-[#605a54]">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Trail */}
      <ProductBreadcrumbs productName={product.name} />

      {/* Main Product Details View */}
      <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 md:px-10 lg:px-20 lg:py-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column: Gallery */}
          <ProductImages product={product} />

          {/* Right Column: Information & Actions */}
          <div className="space-y-6">
            <ProductDetailsHeader
              product={product}
              currentPrice={currentPrice}
            />

            <hr className="border-t border-[#ebe6de]" />

            <ProductOptions
              product={product}
              selectedOptions={{ ...selectedOptions, volume: selectedVolume }}
              onChange={(optionId, value) =>
                setSelectedOptions((current) => ({
                  ...current,
                  [optionId]: value,
                }))
              }
              giftWrapping={giftWrapping}
              onToggleGiftWrapping={setGiftWrapping}
            />

            {/* Actions: Quantity Stepper & Add to Cart */}
            <div className="flex items-center gap-4 pt-1">
              {/* Stepper */}
              <div className="flex h-[50px] w-28 shrink-0 items-center justify-between rounded border border-[#ebe6de] px-4">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="text-lg text-[#605a54] transition-colors hover:text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-[14px] font-semibold text-[#1a1a1a]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-lg text-[#605a54] transition-colors hover:text-[#1a1a1a] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary Action Button */}
              {actions ? (
                actions({
                  product,
                  selectedOptions: resolvedOptions,
                  quantity,
                  currentPrice,
                  totalPrice,
                })
              ) : (
                <button
                  type="button"
                  className="flex h-[50px] flex-1 items-center justify-center rounded bg-[#1a1a1a] px-6 text-[13px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#333333] cursor-pointer"
                >
                  Add to Cart / {formatWholePrice(totalPrice)}
                </button>
              )}
            </div>

            <hr className="border-t border-[#ebe6de]" />

            {/* Scent Anatomy */}
            <ProductScentAnatomy product={product} />
          </div>
        </div>
      </section>

      {/* Related Products: Olfactory Companions */}
      <ProductCompanions currentProductId={product.id} category={product.category} />
    </div>
  );
}
