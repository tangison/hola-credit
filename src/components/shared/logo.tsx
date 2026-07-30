import Link from "next/link";

export function Logo({ variant = "horizontal", className = "" }: { variant?: "horizontal" | "symbol" | "stacked" | "reversed" | "mono"; className?: string }) {
  if (variant === "symbol") {
    return (
      <Link href="/" aria-label="Hola Credit home" className={`inline-block ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" role="img" aria-label="Hola Credit" className="h-8 w-12">
          <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
          <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
        </svg>
      </Link>
    );
  }

  if (variant === "reversed") {
    return (
      <Link href="/" aria-label="Hola Credit home" className={`inline-block ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit" className="h-10 w-auto min-w-[132px]">
          <g transform="translate(0 10)">
            <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
            <path fill="#FFFFFF" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
          </g>
          <text x="112" y="57" fill="#FFFFFF" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
        </svg>
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link href="/" aria-label="Hola Credit home" className={`inline-block ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 176" role="img" aria-label="Hola Credit" className="h-28 w-auto">
          <g transform="translate(42 4)">
            <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
            <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
          </g>
          <text x="90" y="113" textAnchor="middle" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="38" fontWeight="550" letterSpacing="-1.4">hola</text>
          <text x="90" y="151" textAnchor="middle" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="38" fontWeight="550" letterSpacing="-1.4">credit</text>
        </svg>
      </Link>
    );
  }

  return (
    <Link href="/" aria-label="Hola Credit home" className={`inline-block ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit" className="h-10 w-auto min-w-[132px]">
        <g transform="translate(0 10)">
          <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
          <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
        </g>
        <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
      </svg>
    </Link>
  );
}
