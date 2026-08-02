import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Complete sitemap of Hola Credit. All pages, resources, and documentation for the Namibian cash-flow assessment platform by Tangison Technologies in Windhoek.",
};

const siteSections = [
  {
    heading: "Product",
    links: [
      { href: "/", label: "Home" },
      { href: "/product", label: "Product" },
      { href: "/how-scoring-works", label: "How scoring works" },
      { href: "/security", label: "Security and data handling" },
    ],
  },
  {
    heading: "For Lenders",
    links: [
      { href: "/for-microlenders", label: "For Microlenders" },
      { href: "/for-retailers", label: "For Retailers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/resources", label: "Resources" },
      { href: "/resources/guides", label: "Guides for credit teams" },
      { href: "/resources/statement-readiness", label: "Statement readiness" },
      { href: "/resources/responsible-credit", label: "Responsible credit review" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/brand", label: "Brand" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/consent", label: "Consent framework" },
    ],
  },
  {
    heading: "Application",
    links: [
      { href: "/sign-in", label: "Sign in" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Sitemap</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Sitemap
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                A human-readable index of all public routes on the Hola Credit marketing site, organised by category. For a machine-readable version, see the{" "}
                <Link href="/sitemap.xml" className="text-teal-600 hover:text-teal-700 transition-colors duration-ui underline underline-offset-4">
                  XML sitemap
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Sitemap content */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {siteSections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-lg font-semibold text-ink mb-4 border-b border-sand-300 pb-2">{section.heading}</h2>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-ink/70 hover:text-ink transition-colors duration-ui"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All routes detail */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">All public routes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-sand-300">
                    <th className="pb-3 pr-4 text-sm font-semibold text-ink">Route</th>
                    <th className="pb-3 pr-4 text-sm font-semibold text-ink">Title</th>
                    <th className="pb-3 text-sm font-semibold text-ink">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { route: "/", title: "Hola Credit", category: "Product" },
                    { route: "/product", title: "Product", category: "Product" },
                    { route: "/for-microlenders", title: "Cash-flow underwriting for microlenders", category: "For Lenders" },
                    { route: "/for-retailers", title: "Credit assessment support for retailers", category: "For Lenders" },
                    { route: "/how-scoring-works", title: "How Hola Credit scoring works", category: "Product" },
                    { route: "/security", title: "Security and data handling", category: "Product" },
                    { route: "/resources", title: "Resources for responsible cash-flow review", category: "Resources" },
                    { route: "/resources/guides", title: "Guides for credit teams", category: "Resources" },
                    { route: "/resources/statement-readiness", title: "Statement readiness", category: "Resources" },
                    { route: "/resources/responsible-credit", title: "Responsible credit review", category: "Resources" },
                    { route: "/about", title: "About", category: "Company" },
                    { route: "/contact", title: "Contact", category: "Company" },
                    { route: "/brand", title: "Brand", category: "Company" },
                    { route: "/privacy", title: "Privacy policy", category: "Legal" },
                    { route: "/terms", title: "Terms of service", category: "Legal" },
                    { route: "/consent", title: "Consent framework", category: "Legal" },
                    { route: "/sitemap", title: "Sitemap", category: "Utility" },
                  ].map((page) => (
                    <tr key={page.route} className="border-b border-sand-300">
                      <td className="py-3 pr-4">
                        <Link
                          href={page.route}
                          className="font-mono text-sm text-teal-600 hover:text-teal-700 transition-colors duration-ui"
                        >
                          {page.route}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-ink/70">{page.title}</td>
                      <td className="py-3 text-ink/60 text-sm">{page.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Could not find what you were looking for?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If you need information that is not listed here, contact us and we will help you find the right page.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Contact us
              </Link>
              <Link
                href="/sitemap.xml"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                XML sitemap
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
