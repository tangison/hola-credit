"use client";

import Link from "next/link";
import { AuthLogo } from "@/components/shared/auth-logo";

export default function SignInPage() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <AuthLogo />
        </div>
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
