import Link from "next/link";

/**
 * Centered logo for auth pages.
 * Uses the pure-path symbol mark + HTML text.
 * No SVG <text> elements — renders on all devices including mobile.
 */
export function AuthLogo() {
  return (
    <Link href="/" aria-label="Hola Credit home" className="inline-flex items-center gap-2.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" className="h-10 w-[60px]" aria-hidden="true">
        <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
        <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
      </svg>
      <span className="font-sans text-xl font-semibold tracking-tight text-ink whitespace-nowrap">
        hola credit
      </span>
    </Link>
  );
}
