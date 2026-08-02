import type { Metadata } from "next";
import { Accordion } from "@/components/shared/accordion";
import Link from "next/link";

export const metadata: Metadata = {
  description: "How Hola Credit structures cash-flow evidence from statements. AI-assisted categorisation, income floor, and consistency scoring for Namibian lenders.",
};

export default function ProductPage() {
  return (
    <main className="flex-1">
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Product</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                  From statement to structured evidence.
                </h1>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                  Hola Credit converts borrower-authorised bank statements into structured cash-flow evidence and an explainable assessment. It supports, but never replaces, formal bureau checks and human lending decisions.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source srcSet="/images/self-employed-studio-owner-640.webp 640w, /images/self-employed-studio-owner-960.webp 960w, /images/self-employed-studio-owner-1280.webp 1280w, /images/self-employed-studio-owner-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/self-employed-studio-owner-master.png" type="image/png" />
                  <img src="/images/self-employed-studio-owner-1280.webp" alt="Self-employed studio owner, representing the professionals Hola Credit serves" width={1672} height={941} loading="eager" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">How it works</h2>
            <Accordion
              items={[
                {
                  title: "1. Record consent",
                  content: "The applicant authorises the organisation to use their bank statement for a defined credit assessment. The consent artefact records purpose, data categories, organisation, retention scope, expiry, and the actor who captured it. No preselected consent is permitted and withdrawal is recorded without rewriting history.",
                },
                {
                  title: "2. Upload securely",
                  content: "A loan officer submits a supported PDF or image through the secure portal. The system validates file type, size, and integrity on the server side. Upload progress is visible and cancellation is safe. Statements are never previewed by default in open office environments.",
                },
                {
                  title: "3. Extract and categorise",
                  content: "The system identifies transactions, normalises amounts and dates, and categorises cash flow using AI-assisted extraction. Every transaction retains source-page provenance and a confidence score. Categories follow an approved enum, not free-form model labels. Low-confidence or uncertain data is flagged for human review.",
                },
                {
                  title: "4. Calculate the assessment",
                  content: "Deterministic, versioned code calculates the cash-flow assessment. The scoring engine considers income floor, consistency, volatility, concentration, trend, and negative-balance signals. The policy version, extraction model version, and all inputs are recorded immutably. The score never changes unless the inputs or policy change.",
                },
                {
                  title: "5. Review the evidence",
                  content: "The lender sees income floor, consistency, volatility, red flags, categorised income evidence, uncertain transactions, scoring-policy and extraction-model versions, and a plain-language explanation. Human notes and the final lending decision are clearly owned by the lender, not by Hola Credit.",
                },
              ]}
            />
          </div>
        </section>

        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Supported banks</h2>
            <p className="text-ink/70 leading-relaxed max-w-2xl mb-8">
              Designed to work with statements from Namibian banks. Format validation and extraction accuracy are measured separately for each.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {["FNB Namibia", "Bank Windhoek", "Standard Bank Namibia", "Nedbank Namibia"].map((bank) => (
                <div key={bank} className="bg-white rounded-xl border border-sand-300 p-4 text-center">
                  <p className="font-medium text-ink">{bank}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Ready to explore pilot access?</h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">Request pilot access</Link>
            </div>
          </div>
        </section>
      </main>
  );
}
