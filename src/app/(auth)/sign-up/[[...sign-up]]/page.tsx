"use client";

import { WaitingListForm } from "@/components/shared/waiting-list-form";
import Link from "next/link";
import { AuthLogo } from "@/components/shared/auth-logo";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <AuthLogo />
        </div>
        <h1 className="text-2xl font-bold text-ink">Join the waitlist</h1>
        <p className="mt-2 text-sm text-ink/60">
          Hola Credit is in early access. Join the waitlist and we&apos;ll reach out when it&apos;s your turn.
        </p>
      </div>

      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <WaitingListForm />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-ink/50">
          Want to explore the demo first?{" "}
          <Link href="/app" className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-ui">
            Try it now
          </Link>
        </p>
      </div>
    </div>
  );
}
