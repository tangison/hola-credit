import { Skeleton } from "@/components/ui/skeleton";

export default function BorrowersLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Search skeleton */}
      <Skeleton className="h-10 w-full max-w-sm rounded-md" />

      {/* Table skeleton */}
      <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
        {/* Desktop header */}
        <div className="hidden sm:block border-b border-sand-300">
          <div className="flex px-4 py-3 gap-6">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-22" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-22" />
          </div>
        </div>
        {/* Desktop rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="hidden sm:flex px-4 py-3 gap-6 border-b border-sand-300 last:border-0">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
        {/* Mobile cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="sm:hidden p-4 border-b border-sand-300 last:border-0 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
