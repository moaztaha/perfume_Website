import { ProductCardSkeleton } from "@/features/products/components/ProductCardSkeleton";

export function TrendingSectionSkeleton() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-20">
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-[family-name:var(--font-instrument-serif)] text-[40px] text-[#1a1a1a] sm:text-[48px]">
          Olfactory Signatures
        </h2>
        <p className="text-[14px] text-[#605a54]">
          THE CURRENTLY HIGHLY COVETED EXTRACTIONS
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
