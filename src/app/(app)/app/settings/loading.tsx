import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Status card skeleton */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>

      {/* Form skeleton */}
      <div className="bg-white border border-sand-300 rounded-lg p-6 space-y-4">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full max-w-lg rounded-md" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full max-w-lg rounded-md" />
        </div>
        <div className="flex justify-end pt-2">
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>

      {/* Compliance profile skeleton */}
      <div className="bg-white border border-sand-300 rounded-lg p-6 space-y-3">
        <Skeleton className="h-6 w-36" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-sand-300 last:border-0">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
