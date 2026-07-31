import { SymbolMark } from "@/components/shared/logo";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-sand"
      aria-busy="true"
      aria-label="Loading"
    >
      <SymbolMark className="h-10 w-[60px] animate-pulse" />
      <p className="mt-4 text-sm text-ink/50 motion-safe:animate-pulse">Loading&hellip;</p>
    </div>
  );
}
