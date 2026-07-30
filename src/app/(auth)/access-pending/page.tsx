import Link from "next/link";

export default function AccessPendingPage() {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit" className="h-10 w-auto mx-auto mb-8">
        <g transform="translate(0 10)">
          <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
          <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
        </g>
        <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
      </svg>

      <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4m0 4h.01" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-ink">Access pending</h1>
      <p className="mt-3 text-sm text-ink/60 max-w-sm mx-auto">
        Your organisation&apos;s compliance profile is currently being reviewed. You will not be able to access the credit assessment portal until your organisation has been approved.
      </p>

      <div className="mt-6 bg-white border border-sand-300 rounded-lg p-5 text-left space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink/60">Organisation status</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-warning">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            Pending approval
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink/60">Submitted</span>
          <span className="text-sm text-ink">Today</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink/60">Estimated review time</span>
          <span className="text-sm text-ink">1–2 business days</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/50">
        You will receive an email notification once your organisation has been approved. If you believe this is an error, please{" "}
        <a href="mailto:support@holacredit.na" className="text-teal-500 hover:text-teal-600 underline underline-offset-2">
          contact support
        </a>.
      </p>

      <div className="mt-6">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
