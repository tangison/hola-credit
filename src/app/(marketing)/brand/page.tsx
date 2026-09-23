import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Hola Credit brand assets and guidelines: logo system, colour palette, typography and usage rules for the Tangison Technologies cash-flow assessment product.",
  alternates: { canonical: "/brand" },
};

const COLORS = [
  { name: "Ink", hex: "#111512", note: "Primary text, dark bands, buttons", cls: "bg-ink" },
  { name: "Sand", hex: "#F3EFE4", note: "Backgrounds, warm surfaces", cls: "bg-sand" },
  { name: "Mineral teal", hex: "#16B8A6", note: "Accents, links, signal colour", cls: "bg-teal-400" },
  { name: "Deep teal", hex: "#0E8A7D", note: "Hover states, secondary accents", cls: "bg-teal-500" },
  { name: "Stone", hex: "#A8AAA3", note: "Muted text on light surfaces", cls: "bg-stone" },
  { name: "Alert", hex: "#B9382E", note: "Red-flag states only, never decoration", cls: "bg-alert" },
];

const LOGOS = [
  { label: "Horizontal (default)", src: "/logos/hola-credit-horizontal.svg", dark: false },
  { label: "Stacked", src: "/logos/hola-credit-stacked.svg", dark: false },
  { label: "Symbol mark", src: "/logos/hola-credit-symbol.svg", dark: false },
  { label: "Reversed, on ink", src: "/logos/hola-credit-reversed.svg", dark: true },
];

export default function BrandPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="Brand"
          title="Hola Credit brand assets."
          lead="Official logos, colours and typography for Hola Credit. Use these assets when referencing the product in presentations, documents or partner materials. Do not alter, recolour or reshape the mark."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Logo variants</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {LOGOS.map((logo, i) => (
                <Reveal key={logo.label} delay={i * 40}>
                  <figure
                    className={`flex min-h-[200px] flex-col justify-between overflow-hidden rounded-none border p-8 ${
                      logo.dark ? "border-ink bg-ink" : "border-sand-300 bg-sand-50"
                    }`}
                  >
                    <img src={logo.src} alt={`Hola Credit logo, ${logo.label}`} className="h-10 w-auto self-start" />
                    <figcaption className={`mt-10 text-sm ${logo.dark ? "text-sand-50/60" : "text-ink/55"}`}>
                      {logo.label}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/65">
                Clear space: keep at least the height of the letter h around the wordmark. Minimum
                size: 120 pixels wide for the horizontal lockup. The reversed logo is for use on ink
                or photography only, never on light backgrounds.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Colour palette</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COLORS.map((color, i) => (
                <Reveal key={color.name} delay={i * 40}>
                  <div className="overflow-hidden rounded-none border border-sand-300">
                    <div className={`h-28 ${color.cls}`} />
                    <div className="bg-sand-50 p-5">
                      <p className="font-bold text-ink">{color.name}</p>
                      <p className="mt-0.5 font-mono text-[13px] text-ink/55">{color.hex}</p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{color.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Typography</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal>
                <div className="rounded-none border border-sand-300 p-8">
                  <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-teal-600">Display · Source Serif 4</p>
                  <p className="mt-5 font-serif text-4xl font-semibold italic leading-tight tracking-tight text-ink">
                    Say hola.
                  </p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink/65">
                    Serif carries the voice: headlines, pull quotes and the italic accents. Set tight,
                    large and confident.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="rounded-none border border-sand-300 p-8">
                  <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-teal-600">Text · Manrope</p>
                  <p className="mt-5 text-[17px] font-semibold leading-relaxed text-ink">
                    The plain language a lender reads aloud.
                  </p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink/65">
                    Sans carries the work: body copy, labels, interface and data. Plain, warm, never
                    decorative.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
