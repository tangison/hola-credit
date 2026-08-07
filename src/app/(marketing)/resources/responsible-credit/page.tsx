import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Responsible Credit",
  description: "Responsible credit practices for Namibian lenders. How cash-flow assessment supports fair lending, avoids over-indebtedness, and respects borrower dignity.",
};

export default function ResponsibleCreditPage() {
  return (
    <div className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Resources / Responsible credit</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Responsible credit review
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Hola Credit is supplementary decision-support software. It does not approve or decline an applicant, it does not replace formal bureau checks, and it does not make the lending decision. Responsible credit review means using the Hola Credit assessment as one input alongside the lender's existing policies, bureau enquiries, and human judgement.
              </p>
            </div>
          </div>
        </section>

        {/* Human oversight */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Human oversight
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Every Hola Credit assessment is designed to be reviewed by a human before it informs a lending decision. The assessment supplies evidence, confidence levels, and limitations, but it does not make the decision. The loan officer or risk manager adds their own notes, applies their own policies, and records the final decision separately from the Hola Credit output. This separation ensures that the audit trail is always clear about who decided what and on what basis.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Human oversight is not optional, it is a design principle. The system flags low-confidence transactions for human review, reports insufficient data as insufficient rather than dressing it up as a definitive score, and preserves the original extraction alongside any corrections the human reviewer makes. The assessment is structured to support the reviewer's judgement, not to replace it. When the reviewer corrects an extraction result, the correction is recorded as a review event with before-and-after values and the actor who made the change.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Formal bureau checks
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit is not a credit bureau. It does not maintain a database of borrower credit histories, does not share information between lenders, and does not report to formal credit bureaus. Lenders who are required to conduct formal bureau enquiries, from Compuscan, TransUnion, or any other licensed bureau, should continue to do so. Hola Credit provides an additional source of evidence that complements the bureau data, not a substitute for any check that the lender is legally or contractually required to perform.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The assessment is designed to sit alongside the lender's existing bureau checks and underwriting policies. It adds structured cash-flow evidence to the information the lender already has, so that the loan officer can make a more informed decision. The bureau check and the Hola Credit assessment serve different purposes and provide different types of evidence. Neither replaces the other, and the responsible approach is to use both.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Affordability and explainability */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Affordability
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The Hola Credit assessment provides structured cash-flow evidence that can inform an affordability assessment, but it does not determine affordability on its own. Affordability depends on the lender's own policies, the applicant's full financial picture, and the specific terms of the credit product being offered. The assessment shows the income floor, consistency, volatility, and risk signals in the statement, but the lender must combine this with their own affordability criteria and any other information they have about the applicant.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The assessment does not recommend a loan amount, a repayment schedule, or a credit limit. It does not predict whether the applicant will repay. It provides evidence about the cash-flow patterns in the statement, and the lender uses that evidence alongside their own policies and judgement to make an affordability determination. The assessment is one input, not the final word.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Explainability
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Every Hola Credit assessment includes a plain-language explanation of the result. The explanation shows which transactions contributed to each component of the assessment, which were excluded, and what the data can and cannot support. The scoring is deterministic and versioned, the same inputs with the same policy version always produce the same result. The policy version, extraction model version, and all inputs are recorded immutably, so the assessment can be reproduced and audited at any time.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Explainability is not a feature added on top of the assessment, it is a design requirement. The assessment is built to be understood by the loan officer who reviews it, the compliance auditor who audits it, and the regulator who may examine it. The goal is to make the evidence visible and structured, not to produce a black-box score that the lender must accept on trust. If the assessment cannot explain a component, it flags it as uncertain rather than producing a confident-sounding result from uncertain data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Hola Credit does not make the lending decision */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Why Hola Credit does not make the lending decision</h2>
            <div className="space-y-16">
              {[
                {
                  title: "The decision belongs to the lender",
                  description:
                    "Hola Credit does not approve or decline an applicant. The assessment supplies evidence, confidence levels, and limitations. The lender adds their own notes, applies their own policies, and makes the final decision. The decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis. This separation is not a limitation, it is a deliberate design choice that ensures the lender retains ownership and accountability for the decisions they make.",
                },
                {
                  title: "The assessment is one input, not the whole picture",
                  description:
                    "A lending decision depends on more than cash-flow evidence. It depends on the lender's own policies, the applicant's full financial picture, the terms of the credit product, the regulatory requirements, and the lender's risk appetite. The Hola Credit assessment provides structured cash-flow evidence that is one input into this broader decision. It is designed to complement, not replace, the other inputs. The lender who uses the assessment as a substitute for their own policies, bureau checks, or human judgement is using it incorrectly.",
                },
                {
                  title: "AI extracts and categorises, but the scoring is deterministic",
                  description:
                    "The extraction and categorisation of transactions is AI-assisted, which means it can produce uncertain results that require human review. The scoring, however, is deterministic and versioned, the same inputs with the same policy version always produce the same result. The scoring does not change unless the inputs or the policy change. This distinction is important: the AI component may introduce uncertainty, but the scoring component does not introduce randomness. The assessment is reproducible and auditable, and the lender can see exactly which inputs produced the result.",
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

        {/* Supplementary assessment */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">The importance of supplementary assessment</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Supplementary assessment means using the Hola Credit output alongside the lender's existing policies, bureau checks, and human judgement, not as a replacement for any of them. The assessment provides structured cash-flow evidence that is not available from a bureau check alone, because the bureau does not see the transaction-level detail in the applicant's bank statement. This additional evidence can help the lender make a more informed decision, especially for applicants whose income patterns do not fit the salary-only model.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                The supplementary approach also protects the lender from over-reliance on any single source of evidence. No assessment, whether from a bureau, a cash-flow tool, or a manual review, should be the sole basis for a lending decision. The responsible approach is to combine multiple sources, weigh the evidence, and make a decision that the lender can justify and defend. The Hola Credit assessment is designed to be one of those sources, not the only one.
              </p>
              <p className="text-ink/70 leading-relaxed">
                The assessment is also designed to be transparent about its limitations. When the data is insufficient, the assessment says so. When the confidence is low, the assessment flags it. When the extraction is uncertain, the assessment shows the uncertainty. This transparency is what makes the assessment suitable for supplementary use, the lender can see exactly what the assessment can and cannot support, and they can combine it with their other evidence knowing the boundaries of each source.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about responsible credit review?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your organisation needs to evaluate how Hola Credit fits alongside your existing credit assessment process, contact us to discuss your requirements.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Request pilot access
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                All resources
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
}
