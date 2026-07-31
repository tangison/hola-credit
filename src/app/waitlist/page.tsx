"use client";

import { WaitingListForm } from "@/components/shared/waiting-list-form";
import Link from "next/link";
import { AuthLogo } from "@/components/shared/auth-logo";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AuthLogo />
          </div>
          <h1 className="text-2xl font-bold text-ink">Join the waitlist</h1>
          <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
            Hola Credit is in early access. Solve a quick math question to prove you&apos;re human, then fill in your details to get notified when it&apos;s your turn.
          </p>
        </div>

        <div className="bg-white border border-sand-300 rounded-lg p-6 shadow-sm">
          <WaitingListForm />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-ink/50">
            Want to explore the demo first?{" "}
            <Link href="/app" className="text-teal-500 hover:text-teal-600 font-medium transition-colors duration-ui">
              Try it now — no account needed
            </Link>
          </p>
        </div>

        <p className="mt-8 text-xs text-ink/40 text-center">
          A product by{" "}
          <a href="https://tangison.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink/60 transition-colors duration-ui">
            Tangison Technologies
          </a>
        </p>
      </div>
    </div>
  );
}
