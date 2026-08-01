import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Practical guides for Namibian lenders on cash-flow assessment. Statement preparation, scoring interpretation, and responsible lending for credit teams.",
};

const guides = [
  {
    title: "What irregular income looks like on a bank statement",
    description:
      "Many Namibians earn consistently without receiving a fixed salary. This guide explains the patterns that irregular income can produce on a bank statement: repeated deposits from the same client or platform, variable but consistent monthly inflows, seasonal peaks, and the difference between a genuine income pattern and a one-off transfer. It is written for loan officers who need to recognise legitimate cash-flow evidence without stereotyping applicants or forcing every case into a salary-only model. The guide does not define what counts as income — that remains the lender's policy decision — but it helps officers see the patterns that are already present in the data.",
    status: "Recommended",
  },
  {
    title: "Preparing a statement for cash-flow assessment",
    description:
      "A bank statement that cannot be read or processed benefits no one. This guide covers the practical steps that applicants and staff can take to ensure a statement is usable for assessment: downloading the correct PDF from the bank's online portal, avoiding screenshots of partial pages, checking that the statement covers the required period, and ensuring the file is not corrupted or password-protected in a way that prevents extraction. The goal is to reduce the number of unreadable and incomplete uploads, so that the assessment runs on the best available data rather than on a file that fails at the extraction stage.",
    status: "Recommended",
  },
  {
    title: "Why Hola Credit does not make the lending decision",
    description:
      "Hola Credit is supplementary decision-support software. It does not approve or decline an applicant, it does not replace formal bureau checks, and it does not make the lending decision. This guide explains the product's position: the assessment supplies evidence, confidence levels, and limitations, and the lender adds their own notes, applies their own policies, and makes the final decision. The decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis. The guide is written for risk and compliance teams who need to understand the boundary between evidence and decision.",
    status: "Approved direction",
  },
  {
    title: "Cash-flow evidence for retail credit teams",
    description:
      "Retail credit teams evaluate customers applying to purchase goods on credit, often at the point of sale. This guide translates the Hola Credit assessment into the language and workflow of store-credit operations: how to read the cash-flow evidence, what the confidence levels mean for a retail decision, how to handle low-confidence transactions, and how to record the final decision alongside the assessment. The guide does not claim instant approval — it is about giving the credit team a more complete picture of the applicant's cash flow, so that the decision is better informed even when it must be made quickly.",
    status: "Recommended",
  },
  {
    title: "Extraction confidence: when a human must review",
    description:
      "Not every transaction can be extracted and categorised with the same level of confidence. Some transactions are ambiguous, some are partially obscured by poor image quality, and some fall into categories that the extraction model handles with lower accuracy. This guide explains the confidence system: how confidence scores are assigned, what the threshold values mean, when a human review is required rather than optional, and how the system flags uncertain data for attention. The guide is written for operations staff who need to understand when they can trust the extraction and when they must intervene.",
    status: "Approved direction",
  },
];

export default function GuidesPage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Resources / Guides</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Guides for credit teams
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Practical briefs for loan officers, risk managers, compliance auditors, and operations staff who are integrating structured cash-flow evidence into their credit review process. Each guide addresses a specific topic, explains the relevant product behaviour, and provides clear guidance on how to use the assessment alongside existing policies.
              </p>
            </div>
          </div>
        </section>

        {/* Guide list */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {guides.map((guide, i) => (
                <div key={i} className="grid lg:grid-cols-[120px_1fr] gap-6">
                  <div className="text-5xl font-bold text-sand-300">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="flex items-start gap-4 mb-3">
                      <h2 className="text-xl font-semibold text-ink">{guide.title}</h2>
                      <span className="shrink-0 inline-block text-xs font-medium tracking-wide uppercase px-2 py-0.5 rounded border border-sand-300 text-ink/60 bg-sand-100">
                        {guide.status}
                      </span>
                    </div>
                    <p className="text-ink/70 leading-relaxed max-w-2xl">{guide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">Related resources</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                href="/resources/statement-readiness"
                className="block bg-white border border-sand-300 p-6 hover:border-teal-400 transition-colors duration-ui"
              >
                <h3 className="text-lg font-semibold text-ink mb-2">Statement readiness</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  What makes a bank statement usable for cash-flow assessment, and how to avoid common extraction problems.
                </p>
              </Link>
              <Link
                href="/resources/responsible-credit"
                className="block bg-white border border-sand-300 p-6 hover:border-teal-400 transition-colors duration-ui"
              >
                <h3 className="text-lg font-semibold text-ink mb-2">Responsible credit review</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Why Hola Credit does not make the lending decision, and how to use the assessment alongside existing policies.
                </p>
              </Link>
              <Link
                href="/how-scoring-works"
                className="block bg-white border border-sand-300 p-6 hover:border-teal-400 transition-colors duration-ui"
              >
                <h3 className="text-lg font-semibold text-ink mb-2">How scoring works</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Understand the evidence, limits, confidence, and policy versions behind a Hola Credit assessment.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Need guidance for your team?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your organisation needs additional guidance on integrating cash-flow evidence into your credit review process, contact us to discuss your requirements.
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
      </main>
      <Footer />
    </>
  );
}
