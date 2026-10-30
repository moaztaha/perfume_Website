"use client";

import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductCard } from "@/features/products/components/ProductCard";
import type { ProductId } from "@/features/products/types/product.types";

type ProductCompanionsProps = {
  currentProductId: ProductId;
  category?: string;
};


export function ProductCompanions({
  currentProductId,
  category,
}: ProductCompanionsProps) {

  
  const categoryQuery = useProducts({
    category: category || undefined,
    pageSize: 8,
  });

  
  const fallbackQuery = useProducts({
    pageSize: 6,
  });

  const categoryItems = (categoryQuery.data?.items ?? []).filter(
    (p) => p.id !== currentProductId,
  );

  const fallbackItems = (fallbackQuery.data?.items ?? []).filter(
    (p) => p.id !== currentProductId,
  );

  const companions = (
    categoryItems.length > 0 ? categoryItems : fallbackItems
  ).slice(0, 4);

  const isLoading = categoryQuery.isLoading && fallbackQuery.isLoading;

  if (isLoading || companions.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="companions-heading"
      className="w-full bg-[#f4f0eb] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <h2
            id="companions-heading"
            className="font-[family-name:var(--font-instrument-serif)] text-[36px] sm:text-[44px] lg:text-[48px] font-normal text-[#1a1a1a]"
          >
            Olfactory Companions
          </h2>
          <p className="text-[12px] sm:text-[14px] uppercase tracking-widest text-[#605a54]">
            Fragrances of Synonymous Sophistication
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companions.map((companion) => (
            <ProductCard key={companion.id} product={companion} />
          ))}
        </div>
      </div>
    </section>
  );
}
