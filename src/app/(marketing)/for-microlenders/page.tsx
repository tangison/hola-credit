import type { Metadata } from "next";
import { Accordion } from "@/components/shared/accordion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Microlenders",
  description: "Underwriting support for Namibian microlenders reviewing irregular-income applicants. See income patterns, consistency, and red flags from bank statements.",
};

export default function ForMicrolendersPage() {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8 text-teal-400">
                    <path d="M4 20h16M6 17h12M7 17V9m5 8V9m5 8V9M4 7l8-4 8 4z" />
                  </svg>
                  <p className="text-sm font-medium text-teal-600 tracking-wide uppercase">For Microlenders</p>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                  Review more than a salary line.
                </h1>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                  Many Namibian microlenders work with applicants who earn consistently but not through a single employer deposit. Hola Credit provides structured cash-flow evidence from borrower-authorised bank statements, so loan officers can review irregular-income applicants with the same rigour they apply to salaried cases.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source srcSet="/images/freelance-professional-studio-640.webp 640w, /images/freelance-professional-studio-960.webp 960w, /images/freelance-professional-studio-1280.webp 1280w, /images/freelance-professional-studio-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/freelance-professional-studio-master.png" type="image/png" />
                  <img src="/images/freelance-professional-studio-1280.webp" alt="Freelance professional working in a studio, representing irregular-income applicants" width={1672} height={941} loading="eager" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
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
                <p className="text-ink/70 leading-relaxed">
                  When a loan officer encounters an applicant without a standard salary deposit, the typical response is to escalate, request additional documentation, or decline the case on incomplete information. This is not a failure of the applicant. It is a gap in the evidence available to the underwriter. Hola Credit addresses that gap by converting the bank statement the applicant already has into structured, reviewable cash-flow evidence.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  What the evidence trail looks like
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Every assessment includes an income floor, consistency measure, volatility indicator, trend direction, concentration signals, and a plain-language explanation of what the data can and cannot support. Low-confidence or uncertain transactions are flagged for human review rather than silently included. The loan officer can see exactly which transactions contributed to each component and which were excluded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk review: accordion */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Built for how risk teams actually review</h2>
            <Accordion
              items={[
                {
                  title: "Organisation-scoped cases",
                  content: "Each application belongs to the lending organisation that created it. Loan officers see only their own cases. Risk managers can review all applications, overrides, and flags across the organisation. Compliance auditors can read cases, consent records, and audit history without the ability to edit decisions. Role boundaries are enforced on the server, not just in the interface.",
                },
                {
                  title: "Deterministic scoring, not model discretion",
                  content: "The cash-flow assessment is calculated by versioned, deterministic code. The same inputs and the same policy version always produce the same result. AI is used to extract and categorise transactions, but the scoring engine itself does not use a model that could vary its output. When the policy changes, the version is recorded immutably so that every historical assessment remains traceable to the rules that produced it.",
                },
                {
                  title: "Human ownership of the final decision",
                  content: "Hola Credit does not approve or decline an applicant. The assessment supplies evidence, confidence levels, and limitations. The lender adds their own notes, applies their own policies, and makes the final decision. That decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis.",
                },
              ]}
            />
          </div>
        </section>

        {/* Operational speed */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Operational speed without cutting corners</h2>
              <p className="text-ink/70 leading-relaxed">
                Hola Credit is designed to reduce the time a loan officer spends interpreting a bank statement, not to eliminate the review step. The upload-to-assessment pipeline targets completion within sixty seconds. When the extraction model encounters low-confidence data, the system routes the case to a human review queue rather than guessing. The operational gain comes from structuring the evidence so the loan officer can focus on judgement rather than manual statement parsing.
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
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/how-scoring-works" className="inline-flex items-center justify-center rounded-full border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                See how scoring works
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
