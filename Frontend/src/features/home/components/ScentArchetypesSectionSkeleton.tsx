import { Skeleton } from "@/components/ui/Skeleton";

export function ScentArchetypesSectionSkeleton() {
  return (
    <section className="bg-[#f4f0eb] px-4 py-20 sm:px-6 lg:px-20">
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-[family-name:var(--font-instrument-serif)] text-[40px] text-[#1a1a1a] sm:text-[48px]">
          Scent Archetypes
        </h2>
        <p className="text-[14px] text-[#605a54]">
          CURATE YOUR PRESENCE BY SCENT PROFILE
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative flex h-[280px] items-end overflow-hidden rounded-lg p-6">
            <Skeleton className="absolute inset-0" />
            <div className="relative z-20 w-full space-y-2">
              <Skeleton className="h-7 w-2/3 bg-white/20" />
              <Skeleton className="h-3 w-1/2 bg-white/15" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
