import type { Metadata } from "next";
import { Accordion } from "@/components/shared/accordion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Hola Credit. How scoring works, data security, consent, and what the assessment can and cannot prove.",
};

const faqSections = [
  {
    heading: "General",
    items: [
      {
        title: "What is Hola Credit?",
        content: "Hola Credit is supplementary decision-support software for Namibian lenders and retailers. It converts borrower-authorised bank statements into structured cash-flow evidence and an explainable assessment. It supports, but never replaces, formal bureau checks and human lending decisions.",
      },
      {
        title: "Who is Hola Credit for?",
        content: "Hola Credit is designed for authorised Namibian microlenders and retail credit teams who assess applicants whose income patterns do not fit a salary-only model. If you lend to self-employed, freelance, or irregular-income applicants, Hola Credit can help structure the cash-flow evidence from their bank statements.",
      },
      {
        title: "Is Hola Credit a credit bureau?",
        content: "No. Hola Credit does not maintain a database of borrower credit histories, does not share information between lenders, and does not report to formal credit bureaus. It processes a single borrower-authorised statement for a single lender. Cross-lender shared borrower profiles are not part of the current product.",
      },
      {
        title: "Does Hola Credit approve or decline applicants?",
        content: "No. Hola Credit supplies evidence, confidence levels, and limitations. The lender adds their own notes, applies their own policies, and makes the final decision. That decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis.",
      },
    ],
  },
  {
    heading: "How it works",
    items: [
      {
        title: "What does the assessment measure?",
        content: "The assessment evaluates cash-flow evidence across seven components: income floor, consistency, volatility, trend, concentration, red flags, and data sufficiency. Each component captures a different dimension of the applicant's financial pattern, and each carries its own confidence level based on the quality and sufficiency of the underlying data.",
      },
      {
        title: "How long does an assessment take?",
        content: "The upload-to-assessment pipeline targets completion within sixty seconds at the defined percentile. This is a processing-time target, not a claim about decision quality or approval outcomes. Cases with low-confidence data are routed to a human review queue rather than rushed through.",
      },
      {
        title: "What banks are supported?",
        content: "The initial launch supports statements from FNB Namibia, Bank Windhoek, Standard Bank Namibia, and Nedbank Namibia. Format validation and extraction accuracy are measured separately for each bank.",
      },
      {
        title: "What file formats are accepted?",
        content: "PDF, PNG, and JPEG. PDF is always preferred because it preserves the original layout and text encoding, which makes extraction more reliable. Image-based uploads go through OCR as a fallback, which is less reliable than direct PDF text extraction.",
      },
    ],
  },
  {
    heading: "Scoring",
    items: [
      {
        title: "Is the scoring deterministic?",
        content: "Yes. The scoring engine uses versioned code with fixed rules. Given the same extracted transactions and the same policy version, the engine will always produce the same score. There is no randomness, no hidden state, and no model discretion in the scoring step. AI is used in the extraction and categorisation phase, but the scoring engine is a separate, deterministic process.",
      },
      {
        title: "What is the income floor?",
        content: "The income floor is the minimum reliable monthly income the statement can support. It is derived from consistent credit transactions, discounted for concentration risk and volatility. It is not a prediction of future earnings. It is a conservative measure of what the statement evidence can demonstrate. When data is insufficient, the income floor may be null rather than a potentially misleading number.",
      },
      {
        title: "Can the first score predict repayment outcomes?",
        content: "No. Predictive accuracy against repayment outcomes can only be tested after real pilot loans have seasoned. This process takes six to twelve months before the results are statistically meaningful. Hola Credit does not claim predictive accuracy before that data exists. The assessment should be treated as supplementary evidence, not as a validated predictor of repayment.",
      },
    ],
  },
  {
    heading: "Security and data",
    items: [
      {
        title: "How is borrower data protected?",
        content: "Access is restricted by organisation and role. Tenant boundaries are enforced on the server, not just in the interface. Every material action is logged in an append-only audit trail. Consent is recorded before processing begins. Raw bank statement files are retained only for the period necessary to support the assessment and any required review, after which they are scheduled for automated deletion.",
      },
      {
        title: "How does consent work?",
        content: "Before any processing begins, the applicant explicitly authorises the organisation to use their bank statement for a defined credit assessment. The consent artefact records purpose, data categories, organisation, retention scope, expiry, and the actor who captured it. No preselected or bundled consent is permitted. Consent withdrawal is recorded without rewriting history.",
      },
      {
        title: "How long is the raw statement retained?",
        content: "Raw bank statement files are retained only for the period necessary to support the assessment and any required review. After that period, the files are scheduled for automated deletion. The system supports per-artifact retention classes, deletion due dates, legal holds, and deletion confirmation with failure alerting. The exact retention period must be verified with Namibia-qualified privacy and financial-services counsel before production use.",
      },
      {
        title: "Can one lender see another lender's data?",
        content: "No. Every application, statement, and assessment belongs to the organisation that created it. Tenant boundaries are enforced on the server. Organisation ID is never accepted from the browser as authoritative. Cross-tenant access is prevented by deny-by-default server-side checks, and integration tests verify that cross-tenant access is not possible.",
      },
    ],
  },
  {
    heading: "Access",
    items: [
      {
        title: "How do I get access?",
        content: "Pilot access is available for authorised Namibian microlenders and retailers. Contact us at hola@tangison.com to request pilot access for your organisation.",
      },
      {
        title: "Is there a demo?",
        content: "Yes. You can try the demo at hola.tangison.com/app. No account is needed. The demo uses synthetic data to show how the assessment works.",
      },
      {
        title: "What roles are available?",
        content: "Loan officers create applications, upload statements, and review cases. Risk managers can review all applications, overrides, and flags across the organisation. Compliance auditors can read cases, consent records, and audit history, but cannot edit decisions. Organisation owners manage membership and settings. Role boundaries are enforced on the server.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">FAQ</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Frequently asked questions.
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Common questions about Hola Credit, how scoring works, data security, consent, and what the assessment can and cannot prove.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ sections */}
        {faqSections.map((section) => (
          <section key={section.heading} className="bg-white py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-ink tracking-tight mb-6">{section.heading}</h2>
                <Accordion items={section.items} />
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Still have questions?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              Contact us to discuss how Hola Credit fits your lending workflow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/how-scoring-works" className="inline-flex items-center justify-center rounded-full border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                How scoring works
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
}
