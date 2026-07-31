import { Skeleton } from "@/components/ui/skeleton";

export default function ConsentsLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Filter skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-md" />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
        {/* Desktop header */}
        <div className="hidden sm:block border-b border-sand-300">
          <div className="flex px-4 py-3 gap-6">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-18" />
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-22" />
          </div>
        </div>
        {/* Desktop rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="hidden sm:flex px-4 py-3 gap-6 border-b border-sand-300 last:border-0">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
        {/* Mobile cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="sm:hidden p-4 border-b border-sand-300 last:border-0 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
