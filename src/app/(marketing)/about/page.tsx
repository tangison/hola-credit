import type { Metadata } from "next";
import { Accordion } from "@/components/shared/accordion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Cash-Flow Assessment for Namibian Lenders",
  description: "Built by Tangison Technologies in Windhoek, Namibia. We serve authorised lenders and retailers needing structured cash-flow evidence for applicant review.",
};

export default function AboutPage() {
  return (
    <div className="flex-1">
        {/* Hero with stacked logo */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-8">
                <div className="inline-flex flex-col items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" className="h-16 w-24 sm:h-20 sm:w-30" aria-hidden="true">
                    <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
                    <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
                  </svg>
                  <span className="text-center">
                    <span className="block font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-none">hola</span>
                    <span className="block font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-none mt-0.5">credit</span>
                  </span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Cash flow made legible.
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Supplementary decision-support software for Namibian lenders and retailers. It converts borrower-authorised bank statements into structured cash-flow evidence and an explainable assessment that supports, but never replaces, formal bureau checks and human lending decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Brand statement */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">What we mean by legible</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Many Namibians earn consistently without receiving a fixed salary. Freelancers, consultants, contractors, transport operators, traders, and other self-employed professionals may have a real and assessable cash-flow history in their bank statements, but that history is not always visible to the standard underwriting process.
              </p>
              <p className="text-ink/70 leading-relaxed">
                Hola Credit structures the cash flow already visible in the statement. It identifies the income patterns, measures the consistency and volatility, flags the risk signals, and presents the evidence in a format that a loan officer or risk manager can review, question, and act on. The assessment preserves the complexity and uncertainty that real financial data contains. Low-confidence transactions are flagged for human review. Insufficient data is reported as insufficient, not dressed up as a definitive score.
              </p>
            </div>
          </div>
        </section>

        {/* Product positioning */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Supplementary decision support
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Hola Credit is not a credit bureau. It does not maintain a database of borrower profiles, does not share information between lenders, and does not replace formal bureau checks. It is a supplementary tool that provides an additional source of evidence for lenders and retailers who are already conducting their own credit assessments. The decision itself always belongs to the lender, not to Hola Credit.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source srcSet="/images/independent-transport-professional-640.webp 640w, /images/independent-transport-professional-960.webp 960w, /images/independent-transport-professional-1280.webp 1280w, /images/independent-transport-professional-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/independent-transport-professional-master.png" type="image/png" />
                  <img src="/images/independent-transport-professional-1280.webp" alt="Independent transport professional, representing the irregular-income earners Hola Credit serves" width={1672} height={941} loading="lazy" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Namibia */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="relative order-2 lg:order-1">
                <picture>
                  <source srcSet="/images/freelance-professional-studio-640.webp 640w, /images/freelance-professional-studio-960.webp 960w, /images/freelance-professional-studio-1280.webp 1280w, /images/freelance-professional-studio-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/freelance-professional-studio-master.png" type="image/png" />
                  <img src="/images/freelance-professional-studio-1280.webp" alt="Freelance professional in Namibia, representing the people Hola Credit serves" width={1672} height={941} loading="lazy" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Built for Namibia
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Designed specifically for the Namibian financial-services environment. The initial launch supports statements from FNB Namibia, Bank Windhoek, Standard Bank Namibia, and Nedbank Namibia. The extraction and categorisation process is tuned for Namibian transaction patterns, currency, and banking formats. The regulatory posture reflects the Namibian context: supplementary underwriting support, not a licensed credit bureau.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Hola Credit is not: accordion */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">What Hola Credit is not</h2>
              <Accordion
                items={[
                  {
                    title: "Not a licensed credit bureau",
                    content: "Hola Credit does not maintain a database of borrower credit histories, does not share information between lenders, and does not report to formal credit bureaus. It is a supplementary assessment tool that processes a single borrower-authorised statement for a single lender. Cross-lender reusable borrower profiles are not part of the MVP, and shared borrower access remains blocked until Namibia-specific legal and regulator review is complete.",
                  },
                  {
                    title: "Not a replacement for formal bureau checks",
                    content: "Lenders who are required to conduct formal bureau enquiries should continue to do so. Hola Credit provides an additional source of evidence, structured cash-flow analysis, that complements the bureau data. It does not replace the bureau check, and it should not be used as a substitute for any check that the lender is legally or contractually required to perform.",
                  },
                  {
                    title: "Not a decision maker",
                    content: "Hola Credit does not approve or decline an applicant. The assessment supplies evidence, confidence levels, and limitations. The lender adds their own notes, applies their own policies, and makes the final decision. The decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis. AI extracts and categorises transactions, but the scoring is deterministic and the decision is always human.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Contact and product */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Get in touch</h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  If you are an authorised Namibian lender or retailer interested in evaluating structured cash-flow evidence alongside your existing assessment process, we would like to hear from you.
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-ink/60 mb-1">Email</p>
                    <a href="mailto:hola@tangison.com" className="text-lg text-ink hover:text-teal-500 transition-colors duration-ui">
                      hola@tangison.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink/60 mb-1">Product domain</p>
                    <p className="text-lg text-ink">hola.tangison.com</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Product by Tangison Technologies</h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Tangison Technologies builds financial-tools software with a focus on explainability, auditability, and responsible data handling. The product is designed to serve the Namibian market first.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Learn more at{" "}
                  <a
                    href="https://tangison.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-teal-500 transition-colors duration-ui underline underline-offset-4"
                  >
                    tangison.com
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Help shape a more useful way to review cash flow</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              Pilot access is available for authorised Namibian lenders and retailers.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/product" className="inline-flex items-center justify-center rounded-full border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
}
