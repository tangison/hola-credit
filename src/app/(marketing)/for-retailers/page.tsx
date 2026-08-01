import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Retail credit assessment for Namibian stores. Evaluate customers for goods on credit using cash-flow data from bank statements instead of payslip-only models.",
};

export default function ForRetailersPage() {
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
                  <path d="M4 9h16l-2-5H6zM5 9v11h14V9M9 20v-6h6v6" />
                </svg>
                <p className="text-sm font-medium text-teal-600 tracking-wide uppercase">For Retailers</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Credit checks built for how customers actually earn.
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Retail credit teams in Namibia regularly assess customers who want to purchase goods on credit but do not earn a fixed salary. Hola Credit helps those teams understand the cash-flow evidence in a borrower-authorised bank statement, so the assessment reflects how the customer actually earns rather than forcing every case into a payslip model.
              </p>
            </div>
          </div>
        </section>

        {/* Point-of-sale review */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Point-of-sale review that fits the counter
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  When a customer applies for store credit, the credit team needs to make a timely assessment. Hola Credit is designed to work within that workflow: the applicant consents, the staff member uploads the bank statement, and the system returns structured cash-flow evidence that the credit team can review alongside their existing checks. The assessment is supplementary — it does not replace the retailer&apos;s own policies, bureau enquiries, or the judgement of the person reviewing the case.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The web portal is built for low-bandwidth and lower-spec devices, which matters in retail environments where staff may be working on shared or older hardware. Upload progress is visible, cancellation is safe, and statements are never previewed by default in open retail spaces where customer data could be overlooked.
                </p>
              </div>
              <div className="flex items-center">
                <picture>
                  <source srcSet="/images/retail-credit-conversation-640.webp 640w, /images/retail-credit-conversation-960.webp 960w, /images/retail-credit-conversation-1280.webp 1280w, /images/retail-credit-conversation-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/retail-credit-conversation-master.png" type="image/png" />
                  <img
                    src="/images/retail-credit-conversation-master.png"
                    alt="A retail credit conversation between staff and customer"
                    width={960}
                    height={640}
                    className="w-full rounded-md border border-sand-300"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Staff roles */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Staff roles that match retail operations</h2>
            <div className="space-y-16">
              {[
                {
                  title: "Loan officers handle daily assessments",
                  description: "Loan officers create applications, upload statements, and review the cases assigned to them. They see the structured evidence — income floor, consistency, volatility, flags, and the plain-language explanation — and they record their own notes and the final decision. The system does not make the decision for them, and their notes are clearly attributed to them, not to Hola Credit.",
                },
                {
                  title: "Risk managers oversee quality and consistency",
                  description: "Risk managers can review all applications, overrides, and flags across the organisation. This is important in retail credit where multiple locations or branches may be processing cases independently. The risk manager can see whether the same cash-flow pattern is being assessed consistently, whether overrides are being used appropriately, and whether the evidence is being interpreted as intended.",
                },
                {
                  title: "Compliance auditors verify process without editing outcomes",
                  description: "Compliance auditors can read cases, consent records, and audit history, but they cannot edit decisions. This separation ensures that the audit function remains independent. The audit trail records every material action — who viewed the case, who uploaded the statement, who captured consent, who made the decision — with timestamps and actor attribution that cannot be rewritten after the fact.",
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

        {/* Case consistency */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Case consistency across locations and staff</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Retail credit teams often operate across multiple branches or counters, and the quality of the assessment can vary depending on which staff member handles the case. Hola Credit addresses this by applying the same deterministic scoring policy to every application, regardless of who uploads the statement or which branch processes the case. The same inputs and the same policy version always produce the same result.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                This does not mean that every case gets the same outcome — the evidence differs between applicants, and the lender&apos;s own decision still applies. It means that the cash-flow evidence is structured and scored consistently, so that the variation in outcomes comes from the applicant&apos;s actual financial situation and the lender&apos;s judgement, not from inconsistency in how the statement was interpreted.
              </p>
              <p className="text-ink/70 leading-relaxed">
                The scoring policy version is recorded immutably with every assessment. When the policy changes, all new assessments use the new version, but every historical assessment remains traceable to the exact policy that produced it. This is essential for retailers who need to demonstrate to auditors or regulators that their assessment process is consistent and defensible.
              </p>
            </div>
          </div>
        </section>

        {/* Future API integration */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Future API integration
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The initial launch provides a web portal for credit assessment. A REST API is planned after the portal flow is proven, so that retailers can integrate Hola Credit assessments directly into their own point-of-sale or loan-management systems. This is a stated roadmap direction, not a currently available feature.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The API will follow the same consent, isolation, and auditability standards as the portal. Organisations will manage their own API credentials, which will be scoped, expirable, and auditable. Webhook endpoints are also planned for event-driven workflows. Retailers who want to be notified when the API becomes available can register their interest through the pilot access process.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  What Hola Credit does not claim
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit does not claim instant approval. The assessment is designed to be fast — the processing pipeline targets completion within sixty seconds — but the quality of the assessment depends on the quality of the statement data, and cases with low-confidence data are routed to human review rather than rushed through. Speed is a processing attribute, not a decision guarantee.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Hola Credit does not replace formal bureau checks. It is a supplementary source of evidence that the credit team can use alongside their existing bureau enquiries and policy requirements. Retailers should continue to follow their own compliance and regulatory obligations, and should not treat the Hola Credit assessment as a substitute for any check they are legally or contractually required to perform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Evaluate Hola Credit for your retail credit team</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              Pilot access is available for authorised Namibian retailers who want to test structured cash-flow evidence alongside their existing credit assessment process.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/product" className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
