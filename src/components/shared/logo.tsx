/**
 * Hola Credit, Authoritative Logo System
 *
 * SymbolMark: Pure SVG paths only. No <text>. Renders on all devices.
 * Logo: SymbolMark + HTML wordmark. Supports all variants.
 * AuthLogo: Reuses Logo for centred auth layouts.
 *
 * Colour logic from BRAND.md:
 *   Teal: #16B8A6 (Mineral Teal)
 *   Ink: #111512 (Ink)
 *   White: #FFFFFF (reversed variant)
 */

import Link from "next/link";

/* ─── Symbol Mark ─── */

interface SymbolMarkProps {
  className?: string;
  inverted?: boolean;
}

export function SymbolMark({ className = "h-8 w-12", inverted = false }: SymbolMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
      <path fill={inverted ? "#FFFFFF" : "#111512"} d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
    </svg>
  );
}

/* ─── Wordmark ─── */

interface WordmarkProps {
  className?: string;
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
};

export function Wordmark({ className = "", inverted = false, size = "md" }: WordmarkProps) {
  return (
    <span
      className={[
        "font-sans font-semibold tracking-tight whitespace-nowrap select-none",
        sizeMap[size],
        inverted ? "text-white" : "text-ink",
        className,
      ].join(" ")}
      style={{ fontFamily: "Manrope, 'Noto Sans SC', system-ui, -apple-system, sans-serif" }}
    >
      hola credit
    </span>
  );
}

/* ─── Logo Variants ─── */

type LogoVariant = "horizontal" | "stacked" | "compact" | "mono" | "reversed";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  href?: string;
  label?: string;
}

export function Logo({ variant = "horizontal", className = "", href = "/", label = "Hola Credit home" }: LogoProps) {
  const isReversed = variant === "reversed";
  const isStacked = variant === "stacked";
  const isCompact = variant === "compact";
  const isMono = variant === "mono";

  const symbolInverted = isReversed;

  const wordmarkColor = isMono ? "text-ink" : undefined;

  const content = (
    <>
      {isStacked ? (
        <div className="inline-flex flex-col items-center gap-1">
          <SymbolMark className="h-12 w-[72px]" inverted={symbolInverted} />
          <span className="text-center">
            <span
              className="block font-sans text-xl font-semibold tracking-tight leading-none"
              style={{
                fontFamily: "Manrope, 'Noto Sans SC', system-ui, -apple-system, sans-serif",
                color: isReversed ? "#FFFFFF" : isMono ? "#111512" : undefined,
              }}
            >
              hola
            </span>
            <span
              className="block font-sans text-xl font-semibold tracking-tight leading-none mt-0.5"
              style={{
                fontFamily: "Manrope, 'Noto Sans SC', system-ui, -apple-system, sans-serif",
                color: isReversed ? "#FFFFFF" : isMono ? "#111512" : undefined,
              }}
            >
              credit
            </span>
          </span>
        </div>
      ) : isCompact ? (
        <SymbolMark className="h-8 w-12" inverted={symbolInverted} />
      ) : (
        <div className="inline-flex items-center gap-2">
          <SymbolMark className="h-8 w-12" inverted={symbolInverted} />
          <Wordmark
            size="md"
            inverted={isReversed}
            className={wordmarkColor}
          />
        </div>
      )}
    </>
  );

  return (
    <Link
      href={href}
      aria-label={label}
      className={`inline-block ${className}`}
    >
      {content}
    </Link>
  );
}

/* ─── Auth Logo ─── */

export function AuthLogo({ variant = "horizontal" }: { variant?: LogoVariant }) {
  return (
    <div className="flex justify-center">
      <Logo variant={variant} />
    </div>
  );
}
