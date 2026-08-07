import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import { Accordion } from "@/components/shared/accordion";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Cash-flow assessment for Namibian microlenders and retailers. Structure evidence from bank statements to support lending for irregular-income applicants.",
};

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
                <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Cash-flow underwriting</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight text-balance">
                  See the income a payslip misses.
                </h1>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-lg">
                  Structure cash-flow evidence from bank statements. Support lending decisions for self-employed and irregular-income applicants in Namibia.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/app"
                    className="inline-flex items-center justify-center rounded-full bg-ink text-sand-50 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui shadow-sm"
                  >
                    Try the demo
                  </Link>
                  <Link
                    href="/waitlist"
                    className="inline-flex items-center justify-center rounded-full border border-sand-300 text-ink px-6 py-3 text-base font-medium hover:bg-sand-100 transition-colors duration-ui"
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
                    className="rounded-2xl shadow-lg w-full h-auto"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Product truth */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                  Irregular does not mean invisible.
                </h2>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                  Freelancers, contractors, traders, and other self-employed professionals earn consistently without a fixed salary deposit. Hola Credit makes that cash flow visible and assessable.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source srcSet="/images/independent-transport-professional-640.webp 640w, /images/independent-transport-professional-960.webp 960w, /images/independent-transport-professional-1280.webp 1280w, /images/independent-transport-professional-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/independent-transport-professional-master.png" type="image/png" />
                  <img src="/images/independent-transport-professional-1280.webp" alt="Independent transport professional earning through irregular income" width={1672} height={941} sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400" aria-hidden="true">
                      <path d="M7 3h8l3 3v15H7z" /><path d="M15 3v4h4M10 12h5M10 16h3" /><path d="m3 13 2 2 3-4" />
                    </svg>
                  ),
                },
                {
                  step: "2",
                  title: "Upload securely",
                  description: "A loan officer submits a supported PDF or image through the secure portal.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400" aria-hidden="true">
                      <path d="M6 3h8l4 4v14H6zM14 3v5h5" /><path d="M12 17V10m-3 3 3-3 3 3" />
                    </svg>
                  ),
                },
                {
                  step: "3",
                  title: "Extract and check",
                  description: "The system identifies transactions, categorises cash flow, and flags uncertain data for review.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400" aria-hidden="true">
                      <path d="M3 6h3c4 0 4 5 8 5h7" /><path d="M3 12h4c3 0 3-1 6-1" /><path d="M3 18h3c4 0 4-5 8-5h7" />
                    </svg>
                  ),
                },
                {
                  step: "4",
                  title: "Review the assessment",
                  description: "The lender sees income floor, consistency, volatility, red flags, and a plain-language explanation.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-400" aria-hidden="true">
                      <circle cx="10" cy="10" r="6" /><path d="m14.5 14.5 5 5M7 10h6M10 7v6" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 text-teal-600">
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold text-ink/60">{item.step}</span>
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
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <picture>
                  <source srcSet="/images/self-employed-studio-owner-640.webp 640w, /images/self-employed-studio-owner-960.webp 960w, /images/self-employed-studio-owner-1280.webp 1280w, /images/self-employed-studio-owner-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/self-employed-studio-owner-master.png" type="image/png" />
                  <img src="/images/self-employed-studio-owner-1280.webp" alt="Self-employed studio owner whose cash flow Hola Credit makes assessable" width={1672} height={941} loading="lazy" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                  Evidence for a decision. Not the decision itself.
                </h2>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                  Hola Credit does not approve or decline an applicant. It supplies a supplementary assessment alongside the lender&apos;s policies, formal bureau checks, and human judgement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Segments */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white rounded-2xl overflow-hidden border border-sand-300">
                <div className="relative h-48 overflow-hidden">
                  <picture>
                    <source srcSet="/images/freelance-professional-studio-640.webp" type="image/webp" />
                    <source srcSet="/images/freelance-professional-studio-master.png" type="image/png" />
                    <img src="/images/freelance-professional-studio-640.webp" alt="Freelance professional working with irregular income" className="w-full h-full object-cover" loading="lazy" />
                  </picture>
                </div>
                <div className="p-8 lg:p-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-teal-400 mb-4" aria-hidden="true">
                    <path d="M4 20h16M6 17h12M7 17V9m5 8V9m5 8V9M4 7l8-4 8 4z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-ink mb-3">For Microlenders</h3>
                  <p className="text-ink/70 leading-relaxed">
                    Review applicants whose income patterns do not fit salary-only underwriting. See income patterns, consistency, and red flags alongside existing policies and bureau checks.
                  </p>
                  <Link href="/for-microlenders" aria-label="Learn more about microlender underwriting" className="inline-flex items-center mt-4 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-ui">
                    Learn more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden border border-sand-300">
                <div className="relative h-48 overflow-hidden">
                  <picture>
                    <source srcSet="/images/retail-credit-conversation-640.webp" type="image/webp" />
                    <source srcSet="/images/retail-credit-conversation-master.png" type="image/png" />
                    <img src="/images/retail-credit-conversation-640.webp" alt="Retail credit conversation between staff and customer" className="w-full h-full object-cover" loading="lazy" />
                  </picture>
                </div>
                <div className="p-8 lg:p-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-teal-400 mb-4" aria-hidden="true">
                    <path d="M4 9h16l-2-5H6zM5 9v11h14V9M9 20v-6h6v6" />
                  </svg>
                  <h3 className="text-2xl font-bold text-ink mb-3">For Retail Credit</h3>
                  <p className="text-ink/70 leading-relaxed">
                    Evaluate customers applying to purchase goods on credit without forcing every case into a payslip model. Understand real cash flow from bank statements.
                  </p>
                  <Link href="/for-retailers" aria-label="Learn more about retail credit assessment" className="inline-flex items-center mt-4 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-ui">
                    Learn more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cold-start disclosure: accordion */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight text-center mb-8">
                Honest about what the first score can prove.
              </h2>
              <Accordion
                items={[
                  {
                    title: "What we can measure at launch",
                    content: "Extraction quality can be measured against labelled statements and assessments can be compared with experienced human review. If the system extracts the same transactions a skilled loan officer would identify, and the assessment reflects the same cash-flow pattern, the system is working as designed.",
                  },
                  {
                    title: "What we cannot prove yet",
                    content: "Predictive accuracy against repayment outcomes can only be tested after real pilot loans have seasoned. This process takes six to twelve months before the results are statistically meaningful. Hola Credit does not claim predictive accuracy before that data exists.",
                  },
                  {
                    title: "Why we state this explicitly",
                    content: "The cold-start disclosure applies to any new credit assessment tool that has not yet been validated against actual repayment outcomes. Hola Credit states it explicitly rather than implying predictive validity from extraction quality alone. The assessment should be treated as supplementary evidence, not as a validated predictor of repayment, until real loans have seasoned.",
                  },
                ]}
              />
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
                Access is restricted by organisation and role. Consent is recorded. Every action is logged. Raw statement retention is intentionally limited.
              </p>
              <Link href="/security" className="inline-flex items-center mt-6 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-ui">
                Learn about security
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1" aria-hidden="true">
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
              Try the demo now. No account needed. Join the waitlist for full production access.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-full bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui shadow-sm"
              >
                Try the demo
              </Link>
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center rounded-full border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
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
