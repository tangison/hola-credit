"use client";

import { Logo } from "@/components/shared/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-sand px-4 font-sans">
        <div className="text-center max-w-lg">
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

          <h1 className="text-2xl font-bold text-ink mb-3">Something went wrong</h1>
          <p className="text-sm text-ink/60 mb-8 max-w-sm mx-auto">
            We hit an unexpected problem loading this page. This is not your fault, please try again.
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
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-sand-300 text-ink rounded-md text-sm font-medium hover:bg-sand-100 transition-colors duration-ui focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            >
              Go home
            </a>
          </div>
        </div>

        <footer className="mt-auto py-6 text-center">
          <p className="text-sm text-ink/50">
            <a
              href="https://tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink/70 transition-colors"
            >
              A product by Tangison Technologies
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
