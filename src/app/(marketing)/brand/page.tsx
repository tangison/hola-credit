import type { Metadata } from "next";
import { Logo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Brand",
  description: "Hola Credit brand assets and guidelines. Logo system, colour palette, typography, and icon usage for the Tangison Technologies cash-flow assessment product.",
};

export default function BrandPage() {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Brand</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
              Hola Credit brand assets
            </h1>
            <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-2xl">
              Official logos, colours, and typography for Hola Credit. Use these assets when referencing the product in presentations, documents, or partner materials. Do not alter, recolour, or reshape the mark.
            </p>
          </div>
        </section>

        {/* Logo variants */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink mb-8">Logo variants</h2>
            <div className="grid gap-8">
              {/* Horizontal, default */}
              <div className="border border-sand-300 rounded-lg p-8">
                <p className="text-sm font-medium text-ink/60 mb-4">Horizontal (default)</p>
                <div className="flex items-center gap-4">
                  <Logo variant="horizontal" />
                </div>
              </div>

              {/* Symbol only */}
              <div className="border border-sand-300 rounded-lg p-8">
                <p className="text-sm font-medium text-ink/60 mb-4">Symbol mark</p>
                <div className="flex items-center gap-4">
                  <Logo variant="compact" />
                </div>
              </div>

              {/* Stacked */}
              <div className="border border-sand-300 rounded-lg p-8">
                <p className="text-sm font-medium text-ink/60 mb-4">Stacked</p>
                <div className="flex items-center gap-4">
                  <Logo variant="stacked" />
                </div>
              </div>

              {/* Reversed, on dark */}
              <div className="border border-sand-300 rounded-lg p-8 bg-ink">
                <p className="text-sm font-medium text-sand-300 mb-4">Reversed (on dark backgrounds)</p>
                <div className="flex items-center gap-4">
                  <Logo variant="reversed" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colours */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink mb-8">Colour palette</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Ink", hex: "#111512", className: "bg-ink" },
                { name: "Sand 50", hex: "#FAF9F7", className: "bg-sand-50 border border-sand-300" },
                { name: "Sand", hex: "#F5F4F0", className: "bg-sand border border-sand-300" },
                { name: "Mineral Teal", hex: "#16B8A6", className: "bg-teal-400" },
                { name: "Alert", hex: "#E11D48", className: "bg-red-500" },
              ].map((color) => (
                <div key={color.name} className="rounded-lg overflow-hidden border border-sand-300">
                  <div className={`h-20 ${color.className}`} />
                  <div className="p-3 bg-white">
                    <p className="text-sm font-medium text-ink">{color.name}</p>
                    <p className="text-xs text-ink/50">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink mb-8">Typography</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-ink/60 mb-2">Headings: Manrope</p>
                <p className="text-3xl font-bold text-ink tracking-tight">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div>
                <p className="text-sm font-medium text-ink/60 mb-2">Body: Source Serif 4</p>
                <p className="text-lg text-ink/70 leading-relaxed font-serif">
                  Cash-flow underwriting support for Namibian lenders and retailers. Hola Credit helps organisations understand real cash flow when an applicant is self-employed or earns irregularly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage rules */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink mb-8">Usage rules</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-sand-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-ink mb-3">Do</h3>
                <ul className="space-y-2 text-sm text-ink/70">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                    Use the horizontal logo in headers and navigation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                    Use the reversed logo on dark backgrounds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                    Maintain clear space around the mark equal to the height of the &quot;h&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                    Use the symbol mark when space is limited (favicons, avatars)
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-sand-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-ink mb-3">Do not</h3>
                <ul className="space-y-2 text-sm text-ink/70">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    Stretch, rotate, or skew the mark
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    Change the logo colours outside the approved palette
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    Place the dark logo on a dark background without a container
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    Add effects, shadows, or outlines to the mark
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
