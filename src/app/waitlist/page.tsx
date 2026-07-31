"use client";

import { WaitingListForm } from "@/components/shared/waiting-list-form";
import Link from "next/link";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
          <h1 className="text-2xl font-bold text-ink">Join the waitlist</h1>
          <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
            Hola Credit is in early access. Solve a quick math question to prove you&apos;re human, then add your email to get notified when it&apos;s your turn.
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
