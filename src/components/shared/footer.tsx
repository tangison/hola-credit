import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { href: "/product", label: "Overview" },
      { href: "/how-scoring-works", label: "How Scoring Works" },
      { href: "/security", label: "Security" },
    ],
  },
  solutions: {
    title: "Solutions",
    links: [
      { href: "/for-microlenders", label: "For Microlenders" },
      { href: "/for-retailers", label: "For Retailers" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { href: "/resources", label: "Resource Hub" },
      { href: "/resources/guides", label: "Guides" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-ink text-sand-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer: logo + link columns */}
        <div className="py-10 lg:py-14 grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Logo column */}
          <div className="col-span-2">
            <Logo variant="reversed" />
            <p className="mt-4 text-sm text-sand-400 leading-relaxed max-w-xs">
              Cash-flow underwriting support for Namibian lenders and retailers.
            </p>
            <a
              href="mailto:hola@tangison.com"
              className="inline-block mt-4 text-sm text-sand-400 hover:text-teal-400 transition-colors duration-ui"
            >
              hola@tangison.com
            </a>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <p className="text-[11px] font-semibold text-sand-500 uppercase tracking-[0.15em] mb-3">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sand-400 hover:text-sand-100 transition-colors duration-ui"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar: copyright + Tangison credit */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sand-500">
            &copy; {new Date().getFullYear()} Hola Credit. All rights reserved.
          </p>
          <a
            href="https://tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sand-500 hover:text-sand-300 transition-colors duration-ui"
          >
            A product by Tangison Technologies
          </a>
        </div>
      </div>
    </footer>
  );
}
