"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products/paths";
import { toast } from "@/lib/toast";
import type { TrendingProduct } from "@/features/home/data/home-sections.data";
import { FadeIn, FadeInStagger, FadeInStaggerItem, AnimatedButton } from "@/components/animations";

type TrendingSectionProps = {
  products: TrendingProduct[];
};

export function TrendingSection({ products }: TrendingSectionProps) {
  const { addItem } = useCart();

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-20">
      <FadeIn className="mb-12 text-center">
        <h2 className="mb-3 font-[family-name:var(--font-instrument-serif)] text-[40px] text-[#1a1a1a] sm:text-[48px]">
          Olfactory Signatures
        </h2>
        <p className="text-[14px] text-[#605a54]">
          THE CURRENTLY HIGHLY COVETED EXTRACTIONS
        </p>
      </FadeIn>

      <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <FadeInStaggerItem key={product.id}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-4 rounded-lg bg-white p-4 transition-shadow hover:shadow-lg cursor-pointer"
            >
              <Link
                href={`${productPaths.list}/${product.id}`}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative h-80 overflow-hidden rounded bg-[#f4f0eb]"
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="size-full object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="size-full bg-[#e5e5e5]" />
                  )}
                </motion.div>
              </Link>
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`${productPaths.list}/${product.id}`}
                    className="flex-1"
                  >
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-[22px] text-[#1a1a1a]">
                      {product.name}
                    </h3>
                    <p className="text-[11px] uppercase text-[#c5a880]">
                      {product.notes}
                    </p>
                  </Link>
                  <span className="text-[15px] font-semibold text-[#1a1a1a]">
                    ${product.price}
                  </span>
                </div>
                <AnimatedButton
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    addItem({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      selectedOptions: {},
                    });
                    toast.success("Added to cart", {
                      description: `${product.name} added to your cart`,
                    });
                  }}
                  className="w-full rounded border border-[#ebe6de] py-3 text-[11px] font-semibold uppercase text-[#1a1a1a] transition-colors hover:bg-[#f4f0eb] cursor-pointer"
                >
                  Add to Cart +
                </AnimatedButton>
              </div>
            </motion.div>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </section>
  );
}
