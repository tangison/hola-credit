import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Hola Credit privacy policy. How we collect, use, and protect borrower and lender data. Namibian POPIA-compliant data processing and retention practices.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Legal</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Privacy policy
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                This privacy policy describes how Hola Credit, a product of Tangison Technologies, handles personal data when organisations use the service to assess applicants&apos; bank statements. It covers the data controller, data processor, data categories, retention, borrower rights, consent, and access and correction.
              </p>
            </div>
          </div>
        </section>

        {/* Data controller and processor */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Data controller
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The data controller is the organisation that uses Hola Credit to assess an applicant&apos;s bank statement. The controller determines the purpose and means of processing the applicant&apos;s personal data. When a loan officer creates an application, uploads a statement, and records consent, the controller is the organisation on whose behalf the assessment is conducted, not Hola Credit and not Tangison Technologies.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The controller is responsible for ensuring that the processing has a lawful basis, that the applicant has been informed of their rights, and that the data is handled in accordance with applicable Namibian data-protection law. Hola Credit provides the tools, consent capture, audit logging, retention management, and access controls, that help the controller meet these obligations, but the legal responsibility for the processing rests with the controller.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Data processor
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Tangison Technologies, the provider of Hola Credit, acts as the data processor. The processor handles personal data on behalf of the controller, according to the controller&apos;s instructions and the terms of service. The processor does not determine the purpose of the processing, does not use the data for its own purposes, and does not share the data with other organisations.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The processor is responsible for maintaining the security of the platform, enforcing tenant isolation, implementing the retention and deletion controls, and providing the audit trail that the controller needs to demonstrate compliance. The processor does not access tenant data unless specifically required for platform operations, and any such access is logged and auditable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data categories */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Data categories</h2>
            <div className="space-y-16">
              {[
                {
                  title: "Application and identity data",
                  description:
                    "When an organisation creates an application in Hola Credit, the system records the applicant's name, the organisation, the date, the consent artefact, and the case reference. Full national identifiers are not stored in general application tables. Identity lookup tokens use HMAC-SHA-256 with a rotated server-held pepper, rather than unsalted hashing. The application record is the organising unit for all subsequent data, the statement, the extraction, the assessment, and the decision.",
                },
                {
                  title: "Bank statement data",
                  description:
                    "The raw bank statement file is uploaded by the loan officer and stored securely. The system extracts and categorises the transactions from the statement, producing structured data that includes transaction dates, amounts, descriptions, and categories. The extraction also produces confidence scores and source-page provenance for each transaction. The raw file and the extracted data are retained separately, with different retention schedules.",
                },
                {
                  title: "Assessment and decision data",
                  description:
                    "The assessment record includes the cash-flow scoring, the income floor, consistency, volatility, risk signals, and the plain-language explanation. The decision record, which is created separately by the lender, includes the lender's decision, their notes, and the evidence they considered. The assessment is produced by Hola Credit, but the decision is recorded by the lender and is owned by the lender's organisation.",
                },
                {
                  title: "Consent and audit data",
                  description:
                    "The consent artefact records the purpose, data categories, organisation, retention scope, expiry, and the actor who captured the consent. The audit trail records every material action: sign-in, organisation changes, consent capture, upload, file access, extraction correction, score generation, assessment viewing, human decisions, exports, and administrative access. Every event is timestamped, actor-attributed, tenant-scoped, and protected from ordinary edits.",
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

        {/* Retention */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Retention</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Raw bank statement files are retained only for the period necessary to support the assessment and any required review. After that period, the files are scheduled for automated deletion. The system supports per-artifact retention classes, deletion due dates, legal holds with authorised reasons, and deletion confirmation with failure alerting. If a deletion fails, the system alerts the operations team rather than silently retaining the file.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                The retention of derived data, the structured assessment output, is managed separately from the retention of raw files. The lender can retain the assessment evidence without keeping the original statement beyond the necessary period. The file lifecycle follows a defined state machine: a file moves from quarantine through scanning, acceptance or rejection, parsing, and then either a retention hold or deletion. Every transition is server-validated and idempotent.
              </p>
              <div className="border-l-4 border-warning bg-sand-100 p-6 rounded-r-md">
                <p className="text-ink/80 leading-relaxed">
                  <strong className="text-ink">Retention duration requires legal verification.</strong> The exact retention period for raw statement files and derived assessment data has not yet been confirmed. Engineering supports configurable retention classes and automated deletion, but the specific durations must be verified with Namibia-qualified privacy and financial-services counsel before production use. Hola Credit does not claim compliance with any specific retention regulation until this verification is complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Borrower rights, consent, access and correction */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Borrower rights
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The applicant whose bank statement is processed by Hola Credit has the right to know what data is being processed, for what purpose, by which organisation, and for how long. The applicant has the right to access their data, to request correction of inaccurate data, and to withdraw consent for further processing. These rights are exercised through the controller, the organisation that created the application, not directly through Hola Credit.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  When an applicant withdraws consent, the withdrawal is recorded as a new event with its own timestamp, and the associated data is flagged for deletion according to the retention schedule. The original consent record is preserved for audit purposes, but the withdrawal event clearly marks the point at which processing authorisation ended. Withdrawal does not rewrite history, it records the change in consent status going forward.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Consent
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Before any processing begins, the applicant explicitly authorises the organisation to use their bank statement for a defined credit assessment. The consent artefact records the purpose, the data categories, the organisation, the retention scope, the expiry, and the actor who captured the consent. No preselected or bundled consent is permitted, the applicant must actively grant each consent for each specific purpose.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Consent is versioned and auditable. Each consent artefact is a separate record with its own identifier, timestamp, and version. When the consent terms change, for example, when the purpose or retention scope is updated, a new consent artefact is created, and the applicant must actively grant the new consent. Previous consent artefacts are preserved for audit purposes. The consent framework is documented in detail on the consent page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Access and correction */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Access and correction</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                The applicant has the right to access the data that has been processed about them. Access requests are made through the controller, the organisation that created the application, not directly through Hola Credit. The controller can export the application data, including the assessment, the consent record, and the audit trail, and provide it to the applicant.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                If the applicant believes that the data is inaccurate, they can request correction through the controller. Corrections are recorded as review events with before-and-after values and the actor who made the change. The original data is never overwritten, it remains in the audit trail alongside the correction. This ensures that the audit trail is always complete and that the lender can see both the original and the corrected values.
              </p>
              <p className="text-ink/70 leading-relaxed">
                If the applicant wishes to exercise any of these rights and the controller is unable or unwilling to assist, the applicant may contact Hola Credit directly at{" "}
                <a href="mailto:hola@tangison.com" className="text-teal-600 hover:text-teal-700 transition-colors duration-ui underline underline-offset-4">
                  hola@tangison.com
                </a>. Hola Credit will work with the controller to ensure that the applicant&apos;s rights are respected.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about privacy?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your organisation needs to evaluate Hola Credit&apos;s privacy controls as part of your compliance assessment, contact us to discuss data handling, retention, and borrower rights in detail.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Contact us
              </Link>
              <Link
                href="/consent"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                Consent framework
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
