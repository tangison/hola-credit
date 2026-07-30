import Link from "next/link";

export default function SessionExpiredPage() {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit" className="h-10 w-auto mx-auto mb-8">
        <g transform="translate(0 10)">
          <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
          <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
        </g>
        <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
      </svg>

      <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink/50">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-ink">Session expired</h1>
      <p className="mt-3 text-sm text-ink/60 max-w-sm mx-auto">
        Your session has expired due to inactivity. For security reasons, you need to sign in again to continue using the portal.
      </p>

      <div className="mt-6 bg-white border border-sand-300 rounded-lg p-5 text-left space-y-3">
        <h3 className="text-sm font-semibold text-ink">What happened</h3>
        <ul className="space-y-2 text-sm text-ink/60">
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-ink/30 mt-2 flex-shrink-0" />
            Your session timed out after a period of inactivity.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-ink/30 mt-2 flex-shrink-0" />
            Any unsaved work may have been lost. In-progress applications are saved automatically.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-ink/30 mt-2 flex-shrink-0" />
            This is a standard security measure to protect your account and data.
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
        >
          Sign in again
        </Link>
      </div>

      <p className="mt-4 text-xs text-ink/50">
        If you are experiencing repeated session expirations, please{" "}
        <a href="mailto:support@holacredit.na" className="text-teal-500 hover:text-teal-600 underline underline-offset-2">
          contact support
        </a>.
      </p>
    </div>
  );
}
