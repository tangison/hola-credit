import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-sand"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        {/* Logo skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Heading skeleton */}
        <div className="text-center space-y-2">
          <Skeleton className="h-7 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* Form skeleton */}
        <div className="bg-white border border-sand-300 rounded-lg p-6 space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
