import Link from "next/link";

const LINKS = [
  { label: "Product", href: "/product" },
  { label: "Microlenders", href: "/for-microlenders" },
  { label: "Retailers", href: "/for-retailers" },
  { label: "Security", href: "/security" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Brand", href: "/brand" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-sand-50">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-20 sm:px-8 lg:pt-28">
        <p className="font-serif text-6xl font-semibold italic leading-none tracking-tight text-sand-50 lg:text-7xl">
          hola.
        </p>
        <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-sand-50/55">
          Cash-flow underwriting for Namibian lenders and retailers.
        </p>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[14.5px]">
          <a href="mailto:hola@tangison.com" className="py-1 text-sand-50/80 transition-colors hover:text-teal-300">
            hola@tangison.com
          </a>
          <span aria-hidden="true" className="text-sand-50/25">·</span>
          <a href="tel:+26483411522" className="py-1 text-sand-50/80 transition-colors hover:text-teal-300">
            +264 83 411 522
          </a>
          <span aria-hidden="true" className="text-sand-50/25">·</span>
          <span className="py-1 text-sand-50/60">Windhoek, Namibia</span>
        </div>

        <nav aria-label="Footer" className="mt-14 border-t border-sand-50/10 pt-10">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="py-1 text-[13.5px] font-semibold text-sand-50/55 transition-colors hover:text-teal-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col gap-5 border-t border-sand-50/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="py-1 text-[13px] text-sand-50/60">© 2026 Hola Credit, a product of Tangison Technologies.</p>
          <a
            href="https://tangison.com"
            className="group inline-flex items-center gap-2.5 py-1 transition-opacity hover:opacity-80"
            aria-label="Tangison Technologies, tangison.com"
          >
            <span className="flex h-7 items-center rounded-full bg-sand-50 px-2.5">
              <img src="/logos/tangison-logo.svg" alt="" width={88} height={18} className="h-4 w-auto" />
            </span>
            <span className="text-[12.5px] font-semibold text-sand-50/55">A Tangison Technologies product</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
