"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/features/cart";
import { WishlistButton } from "@/features/wishlist";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";
import { ButtonSpinner } from "@/components/ui/ButtonSpinner";
import { AnimatedButton } from "@/components/animations";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // معالجة الرابط وتحويل localhost إلى 127.0.0.1
  const rawImage = product.images[0];
  const formattedUrl = typeof rawImage === 'string' ? rawImage : (rawImage as any)?.url || '';
  const image = formattedUrl
    ? (formattedUrl.startsWith("http")
      ? formattedUrl.replace("localhost", "127.0.0.1")
      : `http://127.0.0.1:1337${formattedUrl}`)
    : "";

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image,
        selectedOptions: {},
      });
      // Brief delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -8 }}
      className="flex min-w-0 flex-1 flex-col items-start gap-4 self-stretch rounded-lg bg-white p-4 transition-shadow hover:shadow-lg"
    >
      <div className="relative w-full">
        <Link
          href={productPaths.detail(product.id)}
          className="relative block h-[240px] w-full shrink-0 overflow-hidden rounded sm:h-[280px] lg:h-[320px]"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="size-full"
          >
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                className="rounded object-cover"
                sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
              />
            ) : (
              <div className="flex size-full items-center justify-center rounded bg-[#faf8f5] text-sm text-[#605a54]">
                No image
              </div>
            )}
          </motion.div>
        </Link>
        <div className="absolute right-2 top-2">
          <WishlistButton
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
            productImage={image}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-start justify-between">
          <Link
            href={productPaths.detail(product.id)}
            className="flex min-w-0 flex-col items-start gap-1 transition-colors hover:text-[#c5a880]"
          >
            <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] sm:truncate sm:text-[22px]">
              {product.name}
            </h2>
            <p className="w-full text-[11px] font-normal uppercase text-[#c5a880] sm:truncate">
              {product.notes}
            </p>
          </Link>
          <p className="shrink-0 text-[15px] font-semibold text-[#1a1a1a]">
            {formatWholePrice(product.price)}
          </p>
        </div>
        <AnimatedButton
          type="button"
          disabled={isAdding}
          className="flex w-full items-center justify-center gap-2 rounded border border-solid border-[#ebe6de] py-3 text-[11px] font-semibold uppercase whitespace-nowrap text-[#1a1a1a] transition-colors hover:bg-[#f4f0eb] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <>
              <ButtonSpinner />
              <span>Adding...</span>
            </>
          ) : (
            "Add to Cart +"
          )}
        </AnimatedButton>
      </div>
    </motion.article>
  );
}