import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export const metadata: Metadata = {
  description: "How Hola Credit scores cash-flow reliability. Income floor, consistency, volatility, trend, and concentration. Deterministic scoring with full auditability.",
};

export default function HowScoringWorksPage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">How Scoring Works</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                How Hola Credit scoring works
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Every Hola Credit assessment is built from structured evidence, bounded by confidence limits, and produced by versioned deterministic code. This page explains what the assessment measures, how it is calculated, what it cannot prove, and how the policy versioning ensures that every result is traceable.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring components */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">What the assessment measures</h2>
            <p className="text-ink/70 leading-relaxed max-w-3xl mb-12">
              The Hola Credit scoring engine evaluates the cash-flow evidence in a borrower-authorised bank statement across seven components. Each component captures a different dimension of the applicant&apos;s financial pattern, and each carries its own confidence level based on the quality and sufficiency of the underlying data.
            </p>
            <div className="space-y-16">
              {[
                {
                  title: "Income floor",
                  description: "The income floor is the minimum reliable monthly income the statement can support. It is derived from the consistent credit transactions identified in the statement period, discounted for concentration risk and volatility. The income floor is not a prediction of future earnings — it is a conservative measure of what the statement evidence can demonstrate the applicant has earned. When the data is insufficient or the extraction confidence is low, the income floor may be null rather than a potentially misleading number.",
                },
                {
                  title: "Consistency",
                  description: "Consistency measures how regular the applicant&apos;s income pattern is from month to month. A freelancer who receives similar amounts on a predictable schedule scores higher on consistency than one with large, irregular deposits separated by long gaps. This is not a judgement about which pattern is better — it is an observation about the predictability of the cash flow, which is relevant to a lender assessing repayment capacity. The consistency measure is derived from the number of active earning days, the frequency of income deposits, and the month-to-month variation in income totals.",
                },
                {
                  title: "Volatility",
                  description: "Volatility captures the degree of fluctuation in the applicant&apos;s cash flow over the statement period. High volatility means that income and spending vary significantly from month to month, which may affect the applicant&apos;s ability to meet fixed repayment obligations. Low volatility indicates a more stable pattern. The volatility measure is calculated from the standard deviation of monthly net cash flow, adjusted for the statement length. It is presented as a numerical value, not a pass-or-fail threshold, because different lenders have different risk tolerances for cash-flow variability.",
                },
                {
                  title: "Trend",
                  description: "The trend component indicates whether the applicant&apos;s cash flow is improving, stable, declining, or uncertain over the statement period. It is calculated from the direction of change in monthly income totals, adjusted for one-off transactions that could distort the trend. A declining trend does not mean the applicant is uncreditworthy — it means the lender should consider whether the current cash flow is sustainable. An uncertain trend indicates that the data does not support a clear directional assessment, which may be the case for short statement periods or highly variable income patterns.",
                },
                {
                  title: "Concentration",
                  description: "Concentration measures how dependent the applicant&apos;s income is on a single payer or source. An applicant who receives all income from one client is more concentrated than one who earns from multiple sources. High concentration does not inherently mean higher risk — a salaried employee is, by definition, concentrated in one employer — but it does mean that the loss of a single income source would have a disproportionate impact. The concentration measure is derived from the distribution of credit amounts across identified income sources.",
                },
                {
                  title: "Red flags",
                  description: "Red flags are specific signals that the lender should review carefully. These include negative-balance occurrences, failed-payment indicators, loan-proceeds deposits that suggest existing debt obligations, and unusually large or atypical transactions that could distort the cash-flow picture. Each flag carries a severity level — information, review, or material — and is linked to the specific transactions that triggered it. Red flags are not a recommendation to decline; they are a recommendation to look more closely.",
                },
                {
                  title: "Data sufficiency",
                  description: "Data sufficiency indicates whether the statement provides enough information to support a reliable assessment. A statement that covers only one month, has many uncertain or low-confidence transactions, or contains significant gaps may be rated as limited or needs_review rather than sufficient. This is not a reflection on the applicant — it is a reflection on the quality of the evidence available. When data sufficiency is low, the assessment components may carry null values or wider confidence bounds, and the lender should weigh the evidence accordingly.",
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

        {/* Deterministic scoring */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Deterministic scoring: the same inputs always produce the same result
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The Hola Credit scoring engine is deterministic. It does not use a machine-learning model to calculate the assessment — it uses versioned code with fixed rules. Given the same extracted transactions and the same policy version, the engine will always produce the same score, the same component values, and the same flags. There is no randomness, no hidden state, and no model discretion in the scoring step.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  This is a deliberate design choice. AI is used in the extraction and categorisation phase — identifying transactions, normalising amounts, and assigning categories — but the scoring engine itself is a separate, deterministic process. The extraction model may produce slightly different results on different runs, and when it does, the extraction model version is recorded so that the variation is traceable. The scoring engine, however, is not subject to model variation.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  AI extracts. AI does not decide.
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The boundary between AI-assisted extraction and deterministic scoring is fundamental to how Hola Credit works. The extraction model identifies transactions in the bank statement, categorises them, and assigns confidence scores. These are the inputs to the scoring engine. The scoring engine then applies fixed, versioned rules to calculate the assessment. The AI never sets credit limits, adjusts policy weights, or makes lending decisions.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  When the extraction model produces low-confidence results, the system flags the affected transactions for human review rather than silently including them in the assessment. The model gets no tools, no network access, and no secrets. Its output is validated against a strict schema, and any transaction that fails validation is treated as uncertain. This separation ensures that the assessment is explainable in terms of the rules that produced it, not in terms of a model&apos;s internal state.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Versioned policy */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Versioned policy: every assessment is traceable</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                The scoring policy is versioned and immutable once used. Every assessment records the policy version, the extraction model version, and the input data that produced it. When the policy changes — because the lender adjusts the weights, or because new evidence components are added — the change is recorded as a new version, and all subsequent assessments use the new version. Historical assessments are never retroactively recalculated.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                This versioning is essential for auditability. If a lender needs to explain why a particular assessment produced a particular result, they can trace it to the exact policy version and the exact inputs. If the policy has since changed, the historical assessment still reflects the rules that were in effect at the time it was generated. The policy version is included in the assessment summary, alongside the extraction model version and the data quality indicator.
              </p>
              <p className="text-ink/70 leading-relaxed">
                The exact policy weights require documented underwriter input and later calibration against repayment outcomes. They are not approved in this repository and should not be assumed to be final. The versioning system is designed to accommodate this evolution without compromising the traceability of any individual assessment.
              </p>
            </div>
          </div>
        </section>

        {/* Assessment summary schema */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-4">Assessment summary schema</h2>
            <p className="text-ink/70 leading-relaxed max-w-3xl mb-8">
              Every Hola Credit assessment produces a structured summary that the lender can review, question, and use alongside their own policies. The schema below shows the fields included in the assessment output. This is a contract example, not application code — it describes the shape of the data, not the implementation.
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
            <div className="mt-6 space-y-4 max-w-3xl">
              <p className="text-ink/70 leading-relaxed">
                <strong className="text-ink">scoreRunId</strong> uniquely identifies the assessment run. <strong className="text-ink">statementPeriod</strong> defines the date range covered by the statement. <strong className="text-ink">dataQuality</strong> indicates whether the statement provides sufficient, limited, or review-needed evidence. <strong className="text-ink">extractionConfidence</strong> is a numerical value reflecting the reliability of the transaction extraction.
              </p>
              <p className="text-ink/70 leading-relaxed">
                <strong className="text-ink">incomeFloorMinor</strong>, <strong className="text-ink">consistency</strong>, and <strong className="text-ink">volatility</strong> are the core scoring components. Any of these may be null when the data does not support a reliable calculation. <strong className="text-ink">trend</strong> indicates the direction of cash-flow change. <strong className="text-ink">flags</strong> are specific signals with severity levels linked to the transactions that triggered them.
              </p>
              <p className="text-ink/70 leading-relaxed">
                <strong className="text-ink">score</strong> and <strong className="text-ink">tier</strong> are optional outputs that depend on the policy version. <strong className="text-ink">scoringPolicyVersion</strong> and <strong className="text-ink">extractionModelVersion</strong> ensure traceability. <strong className="text-ink">limitations</strong> lists the specific caveats that apply to the assessment, such as short statement periods, high concentration, or uncertain data.
              </p>
            </div>
          </div>
        </section>

        {/* Cold-start disclosure */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Honest about what the first score can prove</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                At launch, the quality of Hola Credit&apos;s extraction can be measured against labelled statements, and the assessments can be compared with experienced human review. This provides a meaningful baseline: if the system extracts the same transactions that a skilled loan officer would identify, and if the assessment reflects the same cash-flow pattern that an experienced reviewer would describe, then the system is working as designed.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                What the first score cannot prove is predictive accuracy against repayment outcomes. That calibration requires real pilot loans to be originated, repaid (or not), and the outcomes to be compared with the initial assessments. This process takes six to twelve months of seasoning before the results are statistically meaningful. Hola Credit does not claim predictive accuracy before that data exists.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                The cold-start disclosure is not a limitation unique to Hola Credit — it applies to any new credit assessment tool that has not yet been validated against actual repayment outcomes. The difference is that Hola Credit states it explicitly, rather than implying predictive validity from extraction quality alone. The extraction quality target is that at least ninety-five percent of supported test statements complete parsing and categorisation without an unrecoverable pipeline failure. This is a format-processing target, not a claim of transaction-level accuracy or predictive power.
              </p>
              <p className="text-ink/70 leading-relaxed">
                Post-launch, the long-run predictive metric will be defined and measured with qualified statistical and legal review. The system is designed to support this evaluation — every assessment is traceable to its inputs, its policy version, and its extraction model — but the evaluation itself can only begin after real loans have seasoned. Until then, the assessment should be treated as supplementary evidence, not as a validated predictor of repayment.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about the scoring methodology?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              The assessment is designed to be explainable. If you want to understand how it would apply to your lending or retail credit workflow, pilot access includes full visibility into the evidence, confidence, and policy versions behind each assessment.
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
      <Footer />
    </>
  );
}
