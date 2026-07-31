import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="max-w-xl">
                <p className="text-sm font-medium text-teal-500 mb-4 tracking-wide uppercase">Cash-flow underwriting</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight text-balance">
                  See the income a payslip misses.
                </h1>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-lg">
                  A payslip and three-month bank statement remain a common path to proving creditworthiness. Hola Credit helps Namibian lenders and retailers understand real cash flow when an applicant is self-employed or earns irregularly.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/app"
                    className="inline-flex items-center justify-center rounded-md bg-ink text-sand-50 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
                  >
                    Try the demo
                  </Link>
                  <Link
                    href="/waitlist"
                    className="inline-flex items-center justify-center rounded-md border border-sand-300 text-ink px-6 py-3 text-base font-medium hover:bg-sand-100 transition-colors duration-ui"
                  >
                    Join the waitlist
                  </Link>
                </div>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/images/cash-flow-to-clear-signal-640.webp 640w, /images/cash-flow-to-clear-signal-960.webp 960w, /images/cash-flow-to-clear-signal-1280.webp 1280w, /images/cash-flow-to-clear-signal-1920.webp 1920w"
                    type="image/webp"
                  />
                  <source
                    srcSet="/images/cash-flow-to-clear-signal-master.png"
                    type="image/png"
                  />
                  <img
                    src="/images/cash-flow-to-clear-signal-1280.webp"
                    alt="Irregular transaction paths converging into a structured signal"
                    width={1672}
                    height={941}
                    loading="eager"
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Product truth */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                Irregular does not mean invisible.
              </h2>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Freelancers, consultants, contractors, transport operators, traders, creators and other self-employed professionals may earn consistently without receiving one fixed salary deposit. Hola Credit structures the cash flow already visible in their statements, then shows the evidence, confidence and limitations behind each assessment.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight text-center mb-16">
              From statement to reviewable evidence.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Record consent",
                  description: "The applicant authorises the organisation to process the statement for a defined credit assessment.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400">
                      <path d="M7 3h8l3 3v15H7z" /><path d="M15 3v4h4M10 12h5M10 16h3" /><path d="m3 13 2 2 3-4" />
                    </svg>
                  ),
                },
                {
                  step: "2",
                  title: "Upload securely",
                  description: "A loan officer submits a supported PDF or image through the secure portal.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400">
                      <path d="M6 3h8l4 4v14H6zM14 3v5h5" /><path d="M12 17V10m-3 3 3-3 3 3" />
                    </svg>
                  ),
                },
                {
                  step: "3",
                  title: "Extract and check",
                  description: "The system identifies transactions, categorises cash flow and flags uncertain data for review.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400">
                      <path d="M3 6h3c4 0 4 5 8 5h7" /><path d="M3 12h4c3 0 3-1 6-1" /><path d="M3 18h3c4 0 4-5 8-5h7" />
                    </svg>
                  ),
                },
                {
                  step: "4",
                  title: "Review the assessment",
                  description: "The lender sees income floor, consistency, volatility, red flags, evidence and a plain-language explanation.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400">
                      <circle cx="10" cy="10" r="6" /><path d="m14.5 14.5 5 5M7 10h6M10 7v6" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-md bg-teal-50 text-teal-400">
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold text-stone">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Human decision */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                Evidence for a decision. Not the decision itself.
              </h2>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Hola Credit does not approve or decline an applicant. It supplies a supplementary assessment alongside the lender&apos;s policies, formal credit-bureau checks and human judgement.
              </p>
            </div>
          </div>
        </section>

        {/* Segments */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white rounded-lg p-8 lg:p-10 border border-sand-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-teal-400 mb-4">
                  <path d="M4 20h16M6 17h12M7 17V9m5 8V9m5 8V9M4 7l8-4 8 4z" />
                </svg>
                <h3 className="text-2xl font-bold text-ink mb-3">For Microlenders</h3>
                <p className="text-ink/70 leading-relaxed">
                  Review applicants whose income patterns do not fit salary-only underwriting. Hola Credit structures the cash-flow evidence from borrower-consented bank statements, so loan officers can see income patterns, consistency and red flags alongside their existing policies and formal bureau checks.
                </p>
                <Link href="/for-microlenders" className="inline-flex items-center mt-4 text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors duration-ui">
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white rounded-lg p-8 lg:p-10 border border-sand-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-teal-400 mb-4">
                  <path d="M4 9h16l-2-5H6zM5 9v11h14V9M9 20v-6h6v6" />
                </svg>
                <h3 className="text-2xl font-bold text-ink mb-3">For Retail Credit</h3>
                <p className="text-ink/70 leading-relaxed">
                  Evaluate customers applying to purchase goods on credit without forcing every case into a payslip model. Hola Credit helps retail credit teams understand real customer cash flow from bank statements, supporting informed decisions at the point of sale.
                </p>
                <Link href="/for-retailers" className="inline-flex items-center mt-4 text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors duration-ui">
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cold-start disclosure */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight text-center mb-6">
                Honest about what the first score can prove.
              </h2>
              <p className="text-lg text-ink/70 leading-relaxed text-center">
                At launch, extraction quality can be measured against labelled statements and assessments can be compared with experienced human review. Predictive accuracy against repayment outcomes can only be tested after real pilot loans have seasoned. Hola Credit does not make predictive claims before that evidence exists.
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-6">
                Financial data should have a short, accountable life.
              </h2>
              <p className="text-lg text-ink/70 leading-relaxed">
                Access is restricted by organisation and role. Consent is recorded. Every material action is logged. Raw statement retention is intentionally limited and must be confirmed before production use.
              </p>
              <Link href="/security" className="inline-flex items-center mt-6 text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors duration-ui">
                Learn about security
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-sand-100 tracking-tight">
              Help shape a more useful way to review cash flow.
            </h2>
            <p className="mt-4 text-lg text-sand-300">
              Try the demo now — no account needed. Join the waitlist for full production access.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Try the demo
              </Link>
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
