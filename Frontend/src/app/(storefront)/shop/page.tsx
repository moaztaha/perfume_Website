import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsPage } from "@/features/products";
import type { ProductSearchParams } from "@/features/products";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "All Fragrances | Odoratus",
  description:
    "Explore our complete collection of slow-luxury liquid narratives and botanical extractions.",
};

function ShopLoadingState() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
      {/* Sort control skeleton */}
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>
      
      {/* Product grid skeleton */}
      <ProductGridSkeleton count={8} />
      
      {/* Pagination skeleton */}
      <div className="flex w-full items-center justify-center gap-2 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

export default async function ShopRoute({
  searchParams,
}: {
  searchParams: Promise<ProductSearchParams>;
}) {
  const params = await searchParams;
  
  return (
    <section className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs />
      <FadeIn className="flex w-full flex-col items-start px-4 pb-8 sm:px-6 md:px-10 lg:px-20 lg:pb-10">
        <h1 className="w-full font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a] sm:text-[52px] lg:text-[64px] lg:leading-normal">
          All Fragrances
        </h1>
        <p className="mt-2 w-full text-[14px] font-normal text-[#605a54] sm:mt-0">
          Cultivated formulations curated to command atmospheric space.
        </p>
      </FadeIn>
      <div className="flex flex-col items-stretch gap-8 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:items-start lg:gap-12 lg:px-20 lg:pb-[100px]">
        <ProductFilters />
        <Suspense key={JSON.stringify(params)} fallback={<ShopLoadingState />}>
          <ProductsPage searchParams={params} />
        </Suspense>
      </div>
    </section>
  );
}
