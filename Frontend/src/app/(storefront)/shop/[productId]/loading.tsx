import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="border-b border-[#ebe6de] bg-white px-4 py-4 sm:px-6 lg:px-20">
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Product details skeleton */}
      <div className="px-4 py-12 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image gallery skeleton */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <Skeleton className="aspect-square w-full rounded-lg" />
            
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="size-20 rounded" />
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="flex flex-col gap-6">
            <Skeleton className="h-12 w-3/4" />
            
            <Skeleton className="h-8 w-24" />
            
            <div className="flex gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            <Skeleton className="h-4 w-2/3" />
            
            <Skeleton className="h-px w-full" />
            
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
              </div>
            </div>
            
            <Skeleton className="h-px w-full" />
            
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded" />
                <Skeleton className="h-16 w-full rounded" />
                <Skeleton className="h-16 w-full rounded" />
              </div>
            </div>
            
            {/* Divider */}
            <Skeleton className="h-px w-full" />
            
            {/* Actions */}
            <div className="flex gap-3">
              <Skeleton className="h-14 flex-1 rounded" />
              <Skeleton className="size-14 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ebe6de] bg-white px-4 py-16 sm:px-6 lg:px-20">
        <Skeleton className="mx-auto mb-12 h-10 w-64" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4 rounded-lg bg-white p-4">
              <Skeleton className="h-80 w-full rounded" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
