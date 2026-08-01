import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Built by Tangison Technologies in Windhoek, Namibia. We serve authorised lenders and retailers needing structured cash-flow evidence for applicant review.",
};

export default function AboutPage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero with stacked logo */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-8">
                {/* Stacked logo — pure paths + HTML text, renders on all devices */}
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
                Hola Credit is supplementary decision-support software for Namibian lenders and retailers. It converts borrower-authorised bank statements into structured cash-flow evidence and an explainable assessment that supports, but never replaces, formal bureau checks and human lending decisions.
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
                Many Namibians earn consistently without receiving a fixed salary. Freelancers, consultants, contractors, transport operators, traders, and other self-employed professionals may have a real and assessable cash-flow history in their bank statements, but that history is not always visible to the standard underwriting process. A payslip and three-month bank statement remain a common path to proving creditworthiness, and when the payslip is missing, the evidence in the statement is often overlooked.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                Hola Credit structures the cash flow already visible in the statement. It identifies the income patterns, measures the consistency and volatility, flags the risk signals, and presents the evidence in a format that a loan officer or risk manager can review, question, and act on. The assessment is explainable — it shows which transactions contributed to each component, which were excluded, and what the data can and cannot support.
              </p>
              <p className="text-ink/70 leading-relaxed">
                Making cash flow legible does not mean making it simple. The assessment preserves the complexity and uncertainty that real financial data contains. Low-confidence transactions are flagged for human review rather than silently included. Insufficient data is reported as insufficient, not dressed up as a definitive score. The goal is to make the evidence visible and structured, not to make the decision for the lender.
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
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit is not a credit bureau. It does not maintain a database of borrower profiles, it does not share information between lenders, and it does not replace formal bureau checks from Compuscan or TransUnion. It is a supplementary tool that provides an additional source of evidence for lenders and retailers who are already conducting their own credit assessments.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The assessment is designed to sit alongside the lender&apos;s existing policies, bureau enquiries, and human judgement. It adds structured cash-flow evidence to the information the lender already has, so that the loan officer can make a more informed decision. The decision itself — approve, decline, or adjust — always belongs to the lender, not to Hola Credit.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Built for Namibia
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit is designed specifically for the Namibian financial-services environment. The initial launch supports statements from FNB Namibia, Bank Windhoek, Standard Bank Namibia, and Nedbank Namibia. The extraction and categorisation process is tuned for Namibian transaction patterns, currency, and banking formats, not adapted from a generic international template.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The regulatory posture reflects the Namibian context. Hola Credit is positioned as supplementary underwriting support, not as a licensed credit bureau or a replacement for formal bureau checks. Required conversations with the Bank of Namibia, NAMFISA, and Namibia-qualified privacy and financial-services counsel are planned before production use. The product does not claim regulatory approval or compliance until those conversations are complete and confirmed by qualified counsel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Hola Credit is not */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">What Hola Credit is not</h2>
            <div className="space-y-16">
              {[
                {
                  title: "Not a licensed credit bureau",
                  description: "Hola Credit does not maintain a database of borrower credit histories, does not share information between lenders, and does not report to formal credit bureaus. It is a supplementary assessment tool that processes a single borrower-authorised statement for a single lender. Cross-lender reusable borrower profiles are not part of the MVP, and shared borrower access remains blocked until Namibia-specific legal and regulator review is complete.",
                },
                {
                  title: "Not a replacement for formal bureau checks",
                  description: "Lenders who are required to conduct formal bureau enquiries should continue to do so. Hola Credit provides an additional source of evidence — structured cash-flow analysis — that complements the bureau data. It does not replace the bureau check, and it should not be used as a substitute for any check that the lender is legally or contractually required to perform.",
                },
                {
                  title: "Not a decision maker",
                  description: "Hola Credit does not approve or decline an applicant. The assessment supplies evidence, confidence levels, and limitations. The lender adds their own notes, applies their own policies, and makes the final decision. The decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis. AI extracts and categorises transactions, but the scoring is deterministic and the decision is always human.",
                },
              ].map((item, i) => (
                <div key={i} className="grid lg:grid-cols-[120px_1fr] gap-6">
                  <div className="text-5xl font-bold text-sand-300">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink mb-3">{item.title}</h3>
                    <p className="text-ink/70 leading-relaxed max-w-2xl">{item.description}</p>
                  </div>
                </div>
              ))}
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
                  Hola Credit is currently in development and preparing for pilot access. If you are an authorised Namibian lender or retailer interested in evaluating structured cash-flow evidence alongside your existing assessment process, we would like to hear from you.
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
                  Hola Credit is a product of Tangison Technologies. The team builds financial-tools software with a focus on explainability, auditability, and responsible data handling. The product is designed to serve the Namibian market first, with the specific needs of Namibian lenders, retailers, and regulators in mind.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  If you want to learn more about Tangison Technologies or explore other products and services, visit{" "}
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
              Pilot access is available for authorised Namibian lenders and retailers who want to evaluate Hola Credit alongside their existing assessment process.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/product" className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
