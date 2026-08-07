import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-sand-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden sm:flex items-center gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
          <Skeleton className="sm:hidden h-9 w-9 rounded-md" />
        </div>
      </header>

      {/* Content skeleton */}
      <div className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {/* Hero skeleton */}
          <div className="space-y-4 max-w-2xl">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-5 w-full mt-4" />
            <Skeleton className="h-5 w-5/6" />
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-sand-300 rounded-lg p-6 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
