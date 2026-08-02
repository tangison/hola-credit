import type { Metadata } from "next";
import { Accordion } from "@/components/shared/accordion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Scoring Works",
  description: "How Hola Credit scores cash-flow reliability. Income floor, consistency, volatility, trend, and concentration. Deterministic scoring with full auditability.",
};

export default function HowScoringWorksPage() {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">How Scoring Works</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                  How Hola Credit scoring works
                </h1>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                  Every assessment is built from structured evidence, bounded by confidence limits, and produced by versioned deterministic code. Same inputs, same policy version, same result. Every time.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source srcSet="/images/independent-transport-professional-640.webp 640w, /images/independent-transport-professional-960.webp 960w, /images/independent-transport-professional-1280.webp 1280w, /images/independent-transport-professional-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/independent-transport-professional-master.png" type="image/png" />
                  <img src="/images/independent-transport-professional-1280.webp" alt="Independent transport professional, representing the irregular-income earners Hola Credit assesses" width={1672} height={941} loading="eager" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Scoring components: accordion */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">What the assessment measures</h2>
            <p className="text-ink/70 leading-relaxed max-w-3xl mb-12">
              The scoring engine evaluates cash-flow evidence across seven components. Each captures a different dimension of the applicant&apos;s financial pattern, and each carries its own confidence level.
            </p>
            <Accordion
              items={[
                {
                  title: "Income floor",
                  content: "The minimum reliable monthly income the statement can support. Derived from consistent credit transactions, discounted for concentration risk and volatility. The income floor is not a prediction of future earnings. It is a conservative measure of what the statement evidence can demonstrate. When data is insufficient or extraction confidence is low, the income floor may be null rather than a potentially misleading number.",
                },
                {
                  title: "Consistency",
                  content: "How regular the applicant&apos;s income pattern is from month to month. A freelancer who receives similar amounts on a predictable schedule scores higher than one with large, irregular deposits separated by long gaps. This is not a judgement about which pattern is better. It is an observation about the predictability of the cash flow, which is relevant to a lender assessing repayment capacity.",
                },
                {
                  title: "Volatility",
                  content: "The degree of fluctuation in the applicant&apos;s cash flow over the statement period. High volatility means income and spending vary significantly from month to month, which may affect the ability to meet fixed repayment obligations. The volatility measure is presented as a numerical value, not a pass-or-fail threshold, because different lenders have different risk tolerances.",
                },
                {
                  title: "Trend",
                  content: "Whether the applicant&apos;s cash flow is improving, stable, declining, or uncertain over the statement period. Calculated from the direction of change in monthly income totals, adjusted for one-off transactions. A declining trend does not mean the applicant is uncreditworthy. It means the lender should consider whether the current cash flow is sustainable.",
                },
                {
                  title: "Concentration",
                  content: "How dependent the applicant&apos;s income is on a single payer or source. An applicant who receives all income from one client is more concentrated than one who earns from multiple sources. High concentration does not inherently mean higher risk, but it means the loss of a single income source would have a disproportionate impact.",
                },
                {
                  title: "Red flags",
                  content: "Specific signals the lender should review carefully: negative-balance occurrences, failed-payment indicators, loan-proceeds deposits, and unusually large or atypical transactions. Each flag carries a severity level: information, review, or material. Red flags are not a recommendation to decline. They are a recommendation to look more closely.",
                },
                {
                  title: "Data sufficiency",
                  content: "Whether the statement provides enough information to support a reliable assessment. A statement that covers only one month, has many uncertain or low-confidence transactions, or contains significant gaps may be rated as limited or needs_review rather than sufficient. When data sufficiency is low, assessment components may carry null values or wider confidence bounds.",
                },
              ]}
            />
          </div>
        </section>

        {/* Deterministic scoring */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Deterministic scoring: same inputs, same result
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  The scoring engine does not use a machine-learning model to calculate the assessment. It uses versioned code with fixed rules. Given the same extracted transactions and the same policy version, the engine will always produce the same score. There is no randomness, no hidden state, and no model discretion in the scoring step.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  AI extracts. AI does not decide.
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  AI is used in the extraction and categorisation phase: identifying transactions, normalising amounts, and assigning categories. The scoring engine is a separate, deterministic process. The AI never sets credit limits, adjusts policy weights, or makes lending decisions. When the extraction model produces low-confidence results, the system flags affected transactions for human review rather than silently including them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Versioned policy: accordion */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">Versioned policy: every assessment is traceable</h2>
              <Accordion
                items={[
                  {
                    title: "How versioning works",
                    content: "The scoring policy is versioned and immutable once used. Every assessment records the policy version, the extraction model version, and the input data that produced it. When the policy changes, the change is recorded as a new version, and all subsequent assessments use the new version. Historical assessments are never retroactively recalculated.",
                  },
                  {
                    title: "Why this matters for auditability",
                    content: "If a lender needs to explain why a particular assessment produced a particular result, they can trace it to the exact policy version and the exact inputs. If the policy has since changed, the historical assessment still reflects the rules that were in effect at the time it was generated.",
                  },
                  {
                    title: "Policy weights are not final",
                    content: "The exact policy weights require documented underwriter input and later calibration against repayment outcomes. They are not approved in this repository and should not be assumed to be final. The versioning system is designed to accommodate this evolution without compromising the traceability of any individual assessment.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Assessment summary schema */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">Assessment summary schema</h2>
            <p className="text-ink/70 leading-relaxed max-w-3xl mb-8">
              Every assessment produces a structured summary that the lender can review, question, and use alongside their own policies. This is a contract example, not application code.
            </p>
            <div className="bg-white rounded-xl border border-sand-300 overflow-x-auto">
              <pre className="p-6 text-sm text-ink/80 leading-relaxed font-mono whitespace-pre"><code>{`type Assessment = {
  scoreRunId: string
  statementPeriod: { from: string; to: string }
  dataQuality: "sufficient" | "limited" | "needs_review"
  extractionConfidence: number
  incomeFloorMinor: number | null
  consistency: number | null
  volatility: number | null
  trend: "improving" | "stable" | "declining" | "uncertain"
  flags: Array<{
    code: string
    severity: "information" | "review" | "material"
    evidenceTransactionIds: string[]
  }>
  score: number | null
  tier: string | null
  scoringPolicyVersion: string
  extractionModelVersion: string
  limitations: string[]
}`}</code></pre>
            </div>
          </div>
        </section>

        {/* Cold-start disclosure: accordion */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">Honest about what the first score can prove</h2>
              <Accordion
                items={[
                  {
                    title: "What extraction quality can prove",
                    content: "At launch, the quality of extraction can be measured against labelled statements, and the assessments can be compared with experienced human review. If the system extracts the same transactions that a skilled loan officer would identify, and the assessment reflects the same cash-flow pattern that an experienced reviewer would describe, then the system is working as designed.",
                  },
                  {
                    title: "What the first score cannot prove",
                    content: "Predictive accuracy against repayment outcomes. That calibration requires real pilot loans to be originated, repaid (or not), and the outcomes compared with the initial assessments. This process takes six to twelve months of seasoning before the results are statistically meaningful. Hola Credit does not claim predictive accuracy before that data exists.",
                  },
                  {
                    title: "Post-launch evaluation",
                    content: "Post-launch, the long-run predictive metric will be defined and measured with qualified statistical and legal review. Every assessment is traceable to its inputs, its policy version, and its extraction model, but the evaluation itself can only begin after real loans have seasoned. Until then, the assessment should be treated as supplementary evidence, not as a validated predictor of repayment.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about the scoring methodology?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              The assessment is designed to be explainable. Pilot access includes full visibility into the evidence, confidence, and policy versions behind each assessment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/security" className="inline-flex items-center justify-center rounded-full border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                Security and data handling
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
