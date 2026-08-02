"use client";

import { Logo } from "@/components/shared/logo";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Logo variant="compact" />
        </div>

        <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink/40"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-ink mb-3">This section didn&apos;t load</h1>
        <p className="text-sm text-ink/60 mb-8 max-w-sm mx-auto">
          Something went wrong while loading this part of the app. Please try again, if the problem persists, head back to the dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            Try again
          </button>
          <a
            href="/app"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-sand-300 text-ink rounded-md text-sm font-medium hover:bg-sand-100 transition-colors duration-ui focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            Back to dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
