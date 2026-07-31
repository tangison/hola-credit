import Link from "next/link";
import { AuthLogo } from "@/components/shared/auth-logo";

export default function AccessPendingPage() {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="flex justify-center mb-6">
        <AuthLogo />
      </div>

      <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-warning"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4m0 4h.01" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-ink">You&apos;re on the waitlist</h1>
      <p className="mt-3 text-sm text-ink/60 max-w-sm mx-auto">
        Full access is coming soon. We&apos;ll reach out when it&apos;s your turn. In the meantime, explore the demo with synthetic data.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/app"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          Explore the demo
        </Link>
        <Link
          href="/waitlist"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-sand-300 text-ink rounded-md text-sm font-medium hover:bg-sand-100 transition-colors duration-ui focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          View waitlist status
        </Link>
      </div>
    </div>
  );
}
