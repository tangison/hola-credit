import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Underwriting support for Namibian microlenders reviewing irregular-income applicants. See income patterns, consistency, and red flags from bank statements.",
};

export default function ForMicrolendersPage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8 text-teal-400">
                  <path d="M4 20h16M6 17h12M7 17V9m5 8V9m5 8V9M4 7l8-4 8 4z" />
                </svg>
                <p className="text-sm font-medium text-teal-500 tracking-wide uppercase">For Microlenders</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Review more than a salary line.
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Many Namibian microlenders work with applicants who earn consistently but not through a single employer deposit. Hola Credit provides structured cash-flow evidence from borrower-authorised bank statements so that loan officers can review irregular-income applicants with the same rigour they apply to salaried cases, without assuming that every viable borrower arrives with a payslip.
              </p>
            </div>
          </div>
        </section>

        {/* Exception underwriting */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Exception underwriting, not exception handling
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  When a loan officer encounters an applicant without a standard salary deposit, the typical response is to escalate, request additional documentation, or decline the case on incomplete information. This is not a failure of the applicant — it is a gap in the evidence available to the underwriter. Hola Credit addresses that gap by converting the bank statement the applicant already has into structured, reviewable cash-flow evidence.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The assessment is designed to sit alongside the lender&apos;s existing bureau checks and human judgement. It does not replace the lender&apos;s own policies, override risk thresholds, or make the lending decision. It supplies supplementary evidence that the loan officer can weigh, question, and act on — or choose not to act on — exactly as they would with any other input in their review process.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  What the evidence trail looks like
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Every Hola Credit assessment includes an income floor, a consistency measure, a volatility indicator, a trend direction, concentration signals, and a plain-language explanation of what the data can and cannot support. Each of these components is derived from the extracted transactions in the statement, and each carries a confidence level that reflects the quality of the underlying data.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Low-confidence or uncertain transactions are flagged for human review rather than silently included. The loan officer can see exactly which transactions contributed to each component, which were excluded, and why. This is not a black-box score — it is a structured evidence trail that the lender can trace from the raw statement through to the final assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk review */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Built for how risk teams actually review</h2>
            <div className="space-y-16">
              {[
                {
                  title: "Organisation-scoped cases",
                  description: "Each application belongs to the lending organisation that created it. Loan officers see only their own cases. Risk managers can review all applications, overrides, and flags across the organisation. Compliance auditors can read cases, consent records, and audit history without the ability to edit decisions. Role boundaries are enforced on the server, not just in the interface.",
                },
                {
                  title: "Deterministic scoring, not model discretion",
                  description: "The cash-flow assessment is calculated by versioned, deterministic code. The same inputs and the same policy version always produce the same result. AI is used to extract and categorise transactions, but the scoring engine itself does not use a model that could vary its output. When the policy changes, the version is recorded immutably so that every historical assessment remains traceable to the rules that produced it.",
                },
                {
                  title: "Human ownership of the final decision",
                  description: "Hola Credit does not approve or decline an applicant. The assessment supplies evidence, confidence levels, and limitations. The lender adds their own notes, applies their own policies, and makes the final decision. That decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis.",
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

        {/* Operational speed */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Operational speed without cutting corners</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Microlending operations process high volumes of applications with limited staff. Hola Credit is designed to reduce the time a loan officer spends interpreting a bank statement, not to eliminate the review step. The upload-to-assessment pipeline targets completion within sixty seconds at the defined percentile, but this is a processing-time target, not a claim about decision quality or approval outcomes.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                When the extraction model encounters low-confidence data, the system routes the case to a human review queue rather than guessing. This means that the fastest cases are the ones where the data is clear, and the cases that need more attention receive it. The operational gain comes from structuring the evidence so that the loan officer can focus on judgement rather than manual statement parsing, not from automating the decision itself.
              </p>
              <p className="text-ink/70 leading-relaxed">
                Hola Credit does not promise higher approval rates or lower default rates. Those are outcomes that depend on the lender&apos;s own policies, the quality of their existing bureau data, and the repayment behaviour of their portfolio — none of which are within Hola Credit&apos;s control or claim.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Explore how Hola Credit fits your lending workflow</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              Pilot access is available for authorised Namibian microlenders who want to evaluate cash-flow evidence alongside their existing assessment process.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/how-scoring-works" className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                See how scoring works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
