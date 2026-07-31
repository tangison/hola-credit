import Link from "next/link";

export default function AccessDeniedPage() {
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
          <path d="M4.93 4.93l14.14 14.14M14.828 9.172a4 4 0 010 5.656M9.172 14.828a4 4 0 010-5.656" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-ink">No account needed yet</h1>
      <p className="mt-3 text-sm text-ink/60 max-w-sm mx-auto">
        Hola Credit is in early access. You can explore the demo freely — no signup required. Full accounts with organisation setup will be available at launch.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/app"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
        >
          Try the demo
        </Link>
        <Link
          href="/waitlist"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-sand-300 text-ink rounded-md text-sm font-medium hover:bg-sand-100 transition-colors duration-ui"
        >
          Join the waitlist
        </Link>
      </div>
    </div>
  );
}
