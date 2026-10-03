import { Skeleton } from "@/components/ui/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4">
      {/* Image skeleton */}
      <Skeleton className="h-80 w-full rounded" />
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            {/* Product name */}
            <Skeleton className="h-6 w-3/4" />
            {/* Notes */}
            <Skeleton className="h-3 w-1/2" />
          </div>
          {/* Price */}
          <Skeleton className="h-5 w-12" />
        </div>
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full rounded" />
      </div>
    </div>
  );
}
