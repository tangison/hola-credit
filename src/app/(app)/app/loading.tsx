import { Skeleton } from "@/components/ui/skeleton";

export default function AppLoading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading">
      {/* Welcome skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Quick stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white border border-sand-300 rounded-lg p-5 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>

      {/* Recent applications skeleton */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:block border-b border-sand-300">
            <div className="flex px-4 py-3 gap-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="hidden sm:flex px-4 py-3 gap-4 border-b border-sand-300 last:border-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
          {/* Mobile cards */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="sm:hidden p-4 border-b border-sand-300 last:border-0 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions skeleton */}
      <div>
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white border border-sand-300 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-md flex-shrink-0" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
