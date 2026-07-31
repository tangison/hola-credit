"use client";

import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <Link href="/" aria-label="Hola Credit home">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit" className="h-10 w-auto mx-auto mb-4">
            <g transform="translate(0 10)">
              <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
              <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
            </g>
            <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-ink">No sign-in needed</h1>
        <p className="mt-2 text-sm text-ink/60">
          Hola Credit is in early access. You can explore the demo right now — no account required.
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href="/app"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Try the demo
        </Link>
        <Link
          href="/waitlist"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-sand-300 text-ink rounded-md text-sm font-medium hover:bg-sand-100 transition-colors duration-ui"
        >
          Join the waitlist
        </Link>
      </div>

      <p className="mt-6 text-xs text-ink/50 text-center">
        Full accounts with organisation setup and team management will be available when we launch.
      </p>
    </div>
  );
}
