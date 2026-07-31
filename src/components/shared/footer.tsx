import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const footerLinks = {
  Product: [
    { href: "/product", label: "Product" },
    { href: "/how-scoring-works", label: "How scoring works" },
    { href: "/security", label: "Security" },
  ],
  "For Lenders": [
    { href: "/for-microlenders", label: "For Microlenders" },
    { href: "/for-retailers", label: "For Retailers" },
  ],
  Resources: [
    { href: "/resources", label: "Resources" },
    { href: "/resources/guides", label: "Guides" },
    { href: "/resources/statement-readiness", label: "Statement readiness" },
    { href: "/resources/responsible-credit", label: "Responsible credit" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/brand", label: "Brand" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/consent", label: "Consent" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-sand-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo variant="reversed" />
            <p className="mt-4 text-sm text-sand-300 max-w-xs">
              Cash-flow underwriting support for Namibian lenders and retailers.
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-sand-100 mb-3">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sand-300 hover:text-sand-100 transition-colors duration-ui"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ink-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sand-300">
            <a
              href="https://tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sand-100 transition-colors duration-ui"
            >
              A product by Tangison Technologies
            </a>
          </p>
          <p className="text-sm text-sand-300">
            <a href="mailto:hola@tangison.com" className="hover:text-sand-100 transition-colors duration-ui">
              hola@tangison.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
