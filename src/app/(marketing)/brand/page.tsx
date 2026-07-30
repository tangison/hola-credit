import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

const palette = [
  { token: "Ink", hex: "#111512", purpose: "Primary type, dark surfaces", textColor: "text-sand-100" },
  { token: "Sand", hex: "#F3EFE4", purpose: "Main canvas", textColor: "text-ink" },
  { token: "Mineral Teal", hex: "#16B8A6", purpose: "Progress, focus, selected evidence", textColor: "text-ink" },
  { token: "Stone", hex: "#A8AAA3", purpose: "Secondary borders and metadata", textColor: "text-ink" },
  { token: "White", hex: "#FFFFFF", purpose: "High-contrast text and clean surfaces", textColor: "text-ink" },
  { token: "Alert", hex: "#B9382E", purpose: "Errors and material red flags only", textColor: "text-sand-100" },
  { token: "Warning", hex: "#A46300", purpose: "Review-needed states", textColor: "text-ink" },
  { token: "Success", hex: "#197A55", purpose: "Completed operational states, never loan approval", textColor: "text-sand-100" },
];

const motionTokens = [
  { name: "UI state", duration: "160ms", use: "Hover, focus, selection, toggles" },
  { name: "Drawer or modal", duration: "280ms", use: "Slide-in panels, overlay transitions" },
  { name: "First hero choreography", duration: "520ms max", use: "Initial page load animation, once per session" },
];

const motionCurves = [
  { name: "Entrance", curve: "cubic-bezier(0.22, 1, 0.36, 1)", use: "Elements entering the viewport" },
  { name: "Exit", curve: "cubic-bezier(0.4, 0, 1, 1)", use: "Elements leaving the viewport" },
  { name: "State", curve: "cubic-bezier(0.2, 0, 0, 1)", use: "In-place state changes like colour, opacity, scale" },
];

export default function BrandPage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-500 mb-4 tracking-wide uppercase">Brand</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Hola Credit brand system
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                The Hola Credit brand is designed to feel precise enough for a risk manager, clear enough for a loan officer, and humane enough for a borrower. The symbol shows multiple transaction paths becoming one structured signal. This page documents the logo family, palette, typography, icon system, and motion register.
              </p>
            </div>
          </div>
        </section>

        {/* Logo family */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">Logo family</h2>
            <p className="text-ink/70 leading-relaxed max-w-2xl mb-12">
              The Hola Credit logo family includes five variants for different contexts. The minimum digital symbol size is 20px. The minimum horizontal lockup width is 132px. Maintain clear space of at least half the symbol width on every side of the logo.
            </p>
            <div className="space-y-12">
              {/* Horizontal */}
              <div className="border border-sand-300 p-8">
                <p className="text-sm font-medium text-stone mb-4 tracking-wide uppercase">Horizontal — Default public and application header</p>
                <div className="bg-sand p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit horizontal" className="h-12 w-auto max-w-full">
                    <g transform="translate(0 10)">
                      <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
                      <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
                    </g>
                    <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
                  </svg>
                </div>
              </div>

              {/* Stacked */}
              <div className="border border-sand-300 p-8">
                <p className="text-sm font-medium text-stone mb-4 tracking-wide uppercase">Stacked — Constrained vertical placements</p>
                <div className="bg-sand p-6 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 176" role="img" aria-label="Hola Credit stacked" className="h-32 w-auto">
                    <g transform="translate(42 4)">
                      <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
                      <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
                    </g>
                    <text x="90" y="113" textAnchor="middle" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="38" fontWeight="550" letterSpacing="-1.4">hola</text>
                    <text x="90" y="151" textAnchor="middle" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="38" fontWeight="550" letterSpacing="-1.4">credit</text>
                  </svg>
                </div>
              </div>

              {/* Symbol */}
              <div className="border border-sand-300 p-8">
                <p className="text-sm font-medium text-stone mb-4 tracking-wide uppercase">Symbol — App icon and compact navigation</p>
                <div className="bg-sand p-6 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" role="img" aria-label="Hola Credit symbol" className="h-16 w-auto">
                    <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
                    <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
                  </svg>
                </div>
              </div>

              {/* Mono */}
              <div className="border border-sand-300 p-8">
                <p className="text-sm font-medium text-stone mb-4 tracking-wide uppercase">Mono — Single-colour light backgrounds</p>
                <div className="bg-sand p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit mono" className="h-12 w-auto max-w-full">
                    <g fill="#111512" transform="translate(0 10)">
                      <path d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
                      <path d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
                    </g>
                    <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
                  </svg>
                </div>
              </div>

              {/* Reversed */}
              <div className="border border-sand-300 p-8">
                <p className="text-sm font-medium text-stone mb-4 tracking-wide uppercase">Reversed — Dark backgrounds</p>
                <div className="bg-ink p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit reversed" className="h-12 w-auto max-w-full">
                    <g transform="translate(0 10)">
                      <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
                      <path fill="#FFFFFF" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
                    </g>
                    <text x="112" y="57" fill="#FFFFFF" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Palette */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">Palette</h2>
            <p className="text-ink/70 leading-relaxed max-w-2xl mb-12">
              The palette is designed for clarity and restraint. Validate all text and interactive colour combinations against WCAG 2.2 AA. Mineral Teal is not a safe default for small text on Sand or White. Success green means a completed operational state, never loan approval.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {palette.map((colour) => (
                <div key={colour.token} className="border border-sand-300 bg-white overflow-hidden">
                  <div
                    className="h-24 flex items-end p-4"
                    style={{ backgroundColor: colour.hex }}
                  >
                    <span className={`text-sm font-mono font-medium ${colour.textColor}`}>{colour.hex}</span>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-ink">{colour.token}</p>
                    <p className="text-sm text-ink/70 mt-1">{colour.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">Typography</h2>
            <p className="text-ink/70 leading-relaxed max-w-2xl mb-12">
              The recommended typefaces are Söhne or Neue Haas Grotesk for display and interface use, with Manrope as the open-source fallback for interface and Source Serif 4 for long-form explanations. Do not default to Inter, Poppins, Roboto, or Arial as the visible brand face. Use system fallbacks only for resilience.
            </p>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-semibold text-ink mb-4">Interface and display</h3>
                <div className="bg-sand p-8 mb-6">
                  <p className="font-sans text-4xl font-bold text-ink tracking-tight mb-2">Manrope</p>
                  <p className="font-sans text-lg text-ink/70">The open-source fallback for display and interface text. Used in production when licensed typefaces are not available.</p>
                </div>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Font weight 550 is used for the logo lockup. Headings use font-bold (700). Body text uses the default font-weight. Letter spacing is tight on headings (-0.025em) and normal on body text.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink mb-4">Long-form explanations</h3>
                <div className="bg-sand p-8 mb-6">
                  <p className="font-serif text-4xl font-bold text-ink tracking-tight mb-2">Source Serif 4</p>
                  <p className="font-serif text-lg text-ink/70">The open-source fallback for long-form explanations and legal text. Used when a serif face improves readability.</p>
                </div>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Serif typefaces are used sparingly — for legal documents, policy explanations, and other long-form content where a serif improves readability. The marketing site and application interface use sans-serif throughout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Icon system */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">Icon system</h2>
            <p className="text-ink/70 leading-relaxed max-w-2xl mb-12">
              The Hola Credit icon system uses a consistent set of rules that ensure visual coherence across the marketing site and application. Icons are functional, not decorative — use them only where they improve scanning or communicate an action.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { rule: "24 × 24 viewBox", description: "All icons use a 24 by 24 viewBox. This ensures consistent sizing and alignment across all contexts." },
                { rule: "1.75px stroke", description: "All icons use a 1.75px stroke width. This matches the visual weight of the logo and UI elements without appearing too heavy or too thin." },
                { rule: "Rounded linecap and linejoin", description: "All icons use rounded linecap and linejoin. This creates a soft, approachable appearance that matches the brand tone." },
                { rule: "currentColor", description: "All icons use currentColor for their stroke and fill. This allows icons to inherit the text colour of their parent element, ensuring consistency." },
                { rule: "No coloured circles behind icons", description: "Icons do not sit inside coloured circles or badge containers. The icon stands on its own, with the background colour of the page providing the context." },
                { rule: "Use only where they improve scanning", description: "Icons are functional, not decorative. Use them only where they improve scanning or communicate an action. Do not add icons to every heading or section." },
              ].map((item) => (
                <div key={item.rule} className="bg-white border border-sand-300 p-6">
                  <p className="font-semibold text-ink mb-2">{item.rule}</p>
                  <p className="text-sm text-ink/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            {/* Example icons */}
            <div className="mt-12 bg-white border border-sand-300 p-8">
              <p className="text-sm font-medium text-stone mb-6 tracking-wide uppercase">Example icons at 24×24</p>
              <div className="flex flex-wrap gap-6 items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink" aria-label="Upload">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink" aria-label="Review">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink" aria-label="Consent">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink" aria-label="Document">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink" aria-label="Check">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Motion register */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">Motion register</h2>
            <p className="text-ink/70 leading-relaxed max-w-2xl mb-12">
              Motion in the Hola Credit brand is technical, precise, and quiet. Prefer CSS transforms and opacity. Use one primary motion engine only if CSS cannot express the approved choreography. Navigation hides on scroll down and returns on scroll up using translateY. Drawers enter from their anchored edge. Expanding content changes in place. Prefers-reduced-motion receives immediate state changes with preserved feedback.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-lg font-semibold text-ink mb-4">Duration tokens</h3>
                <div className="space-y-4">
                  {motionTokens.map((token) => (
                    <div key={token.name} className="border border-sand-300 p-4 bg-sand-50">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="font-semibold text-ink">{token.name}</p>
                        <p className="text-sm font-mono text-teal-500">{token.duration}</p>
                      </div>
                      <p className="text-sm text-ink/70">{token.use}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink mb-4">Easing curves</h3>
                <div className="space-y-4">
                  {motionCurves.map((curve) => (
                    <div key={curve.name} className="border border-sand-300 p-4 bg-sand-50">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="font-semibold text-ink">{curve.name}</p>
                        <p className="text-xs font-mono text-teal-500">{curve.curve}</p>
                      </div>
                      <p className="text-sm text-ink/70">{curve.use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <h3 className="text-lg font-semibold text-ink mb-4">Motion rules</h3>
              <ul className="space-y-3">
                {[
                  "Marketing hero flow lines may reveal once using SVG stroke progression.",
                  "Application tables, typing, repeated row actions and keyboard navigation must not animate beyond essential feedback.",
                  "Navigation hides on scroll down and returns on scroll up using translateY.",
                  "Drawers enter from their anchored edge.",
                  "Expanding content changes in place.",
                  "prefers-reduced-motion receives immediate state changes with preserved feedback.",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1 shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <p className="text-ink/70 leading-relaxed">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about the brand system?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If you need brand assets, usage guidelines, or have questions about applying the Hola Credit brand, contact us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Contact us
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                About Hola Credit
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
