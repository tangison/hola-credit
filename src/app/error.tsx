"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-sand px-4 font-sans">
        <div className="text-center max-w-lg">
          <p className="text-7xl font-bold text-sand-300 mb-4">500</p>
          <h1 className="text-3xl font-bold text-ink mb-4">Something went wrong</h1>
          <p className="text-ink/70 mb-8">
            An unexpected error occurred. Please try again in a few moments. If the problem persists, please contact our support team.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-ink text-sand-50 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
          >
            Return home
          </a>
        </div>
        <footer className="mt-auto py-6 text-center">
          <p className="text-sm text-ink/50">
            <a href="https://tangison.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink/70 transition-colors">
              A product by Tangison Technologies
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
