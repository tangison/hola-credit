import Link from "next/link";

/**
 * Logo component that renders reliably on all devices.
 *
 * The symbol mark is pure SVG paths (no <text> element), so it always renders.
 * The wordmark is HTML text, so it inherits the CSS font stack and renders
 * correctly on mobile where SVG <text> + custom fonts fail.
 */

function SymbolMark({ className = "h-8 w-12" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" className={className} aria-hidden="true">
      <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
      <path fill="currentColor" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  className = "",
}: {
  variant?: "horizontal" | "symbol" | "stacked" | "reversed" | "mono";
  className?: string;
}) {
  if (variant === "symbol") {
    return (
      <Link href="/" aria-label="Hola Credit home" className={`inline-block ${className}`}>
        <SymbolMark className="h-8 w-12" />
      </Link>
    );
  }

  if (variant === "reversed") {
    return (
      <Link href="/" aria-label="Hola Credit home" className={`inline-flex items-center gap-2 ${className}`}>
        <SymbolMark className="h-8 w-12" />
        <span className="text-[0px] leading-none whitespace-nowrap">
          <span
            className="font-sans text-lg font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(14px, 2.5vw, 20px)" }}
          >
            hola credit
          </span>
        </span>
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link href="/" aria-label="Hola Credit home" className={`inline-flex flex-col items-center gap-1 ${className}`}>
        <SymbolMark className="h-12 w-[72px]" />
        <span className="text-center">
          <span className="block font-sans text-xl font-semibold tracking-tight text-ink leading-none">hola</span>
          <span className="block font-sans text-xl font-semibold tracking-tight text-ink leading-none mt-0.5">credit</span>
        </span>
      </Link>
    );
  }

  // Default: horizontal (symbol + wordmark side by side)
  return (
    <Link href="/" aria-label="Hola Credit home" className={`inline-flex items-center gap-2 ${className}`}>
      <SymbolMark className="h-8 w-12" />
      <span className="font-sans text-lg font-semibold tracking-tight text-ink whitespace-nowrap">
        hola credit
      </span>
    </Link>
  );
}
