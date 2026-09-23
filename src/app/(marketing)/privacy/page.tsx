import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Hola Credit handles personal data: controller, processor, data categories, retention, borrower rights and consent, under Namibian data-protection obligations.",
  alternates: { canonical: "/privacy" },
};

const DATA_CATEGORIES = [
  {
    title: "Application and identity data",
    body: "When an organisation creates an application in Hola Credit, the system records the applicant's name, the organisation, the date, the consent artefact, and the case reference. Full national identifiers are not stored in general application tables. Identity lookup tokens use HMAC-SHA-256 with a rotated server-held pepper, rather than unsalted hashing. The application record is the organising unit for all subsequent data: the statement, the extraction, the assessment, and the decision.",
  },
  {
    title: "Bank statement data",
    body: "The raw bank statement file is uploaded by the loan officer and stored securely. The system extracts and categorises the transactions from the statement, producing structured data that includes transaction dates, amounts, descriptions and categories. The extraction also produces confidence scores and source-page provenance for each transaction. The raw file and the extracted data are retained separately, with different retention schedules.",
  },
  {
    title: "Assessment and decision data",
    body: "The assessment record includes the cash-flow scoring, the income floor, consistency, volatility, risk signals and the plain-language explanation. The decision record, which is created separately by the lender, includes the lender's decision, their notes and the evidence they considered. The assessment is produced by Hola Credit, but the decision is recorded by the lender and is owned by the lender's organisation.",
  },
  {
    title: "Consent and audit data",
    body: "The consent artefact records the purpose, data categories, organisation, retention scope, expiry and the actor who captured the consent. The audit trail records every material action: sign-in, organisation changes, consent capture, upload, file access, extraction correction, score generation, assessment viewing, human decisions, exports and administrative access. Every event is timestamped, actor-attributed, tenant-scoped and protected from ordinary edits.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Privacy policy."
          lead="This privacy policy describes how Hola Credit, a product of Tangison Technologies, handles personal data when organisations use the service to assess applicants' bank statements. It covers the data controller, data processor, data categories, retention, borrower rights, consent, and access and correction."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Data controller</h2>
              <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                <p>
                  The data controller is the organisation that uses Hola Credit to assess an
                  applicant's bank statement. The controller determines the purpose and means of
                  processing the applicant's personal data. When a loan officer creates an
                  application, uploads a statement and records consent, the controller is the
                  organisation on whose behalf the assessment is conducted, not Hola Credit and not
                  Tangison Technologies.
                </p>
                <p>
                  The controller is responsible for ensuring that the processing has a lawful basis,
                  that the applicant has been informed of their rights, and that the data is handled
                  in accordance with applicable Namibian data-protection law. Hola Credit provides
                  the tools, consent capture, audit logging, retention management and access
                  controls, that help the controller meet these obligations, but the legal
                  responsibility for the processing rests with the controller.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-16 font-serif text-3xl font-semibold tracking-tight text-ink">Data processor</h2>
              <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                <p>
                  Tangison Technologies, the provider of Hola Credit, acts as the data processor.
                  The processor handles personal data on behalf of the controller, according to the
                  controller's instructions and the terms of service. The processor does not
                  determine the purpose of the processing, does not use the data for its own
                  purposes, and does not share the data with other organisations.
                </p>
                <p>
                  The processor is responsible for maintaining the security of the platform,
                  enforcing tenant isolation, implementing the retention and deletion controls, and
                  providing the audit trail that the controller needs to demonstrate compliance. The
                  processor does not access tenant data unless specifically required for platform
                  operations, and any such access is logged and auditable.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Data categories</h2>
            </Reveal>
            <div className="mt-10 space-y-10">
              {DATA_CATEGORIES.map((category, i) => (
                <Reveal key={category.title} delay={i * 40}>
                  <div className="border-t border-sand-300 pt-7">
                    <h3 className="text-lg font-bold tracking-tight text-ink">{category.title}</h3>
                    <p className="mt-3.5 text-[15.5px] leading-relaxed text-ink/70">{category.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Retention</h2>
              <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                <p>
                  Raw bank statement files are retained only for the period necessary to support the
                  assessment and any required review. After that period, the files are scheduled for
                  automated deletion. The system supports per-artifact retention classes, deletion
                  due dates, legal holds with authorised reasons, and deletion confirmation with
                  failure alerting. If a deletion fails, the system alerts the operations team
                  rather than silently keeping the file.
                </p>
                <p>
                  The retention of derived data, the structured assessment output, is managed
                  separately from the retention of raw files. The lender can retain the assessment
                  evidence without keeping the original statement beyond the necessary period. The
                  file lifecycle follows a defined state machine: a file moves from quarantine
                  through scanning, acceptance or rejection, parsing, and then either a retention
                  hold or scheduled deletion.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-16 font-serif text-3xl font-semibold tracking-tight text-ink">Borrower rights</h2>
              <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                <p>
                  The applicant whose bank statement is processed by Hola Credit has the right to
                  know what data is being processed, for what purpose, by which organisation and for
                  how long. The applicant has the right to access their data, to request correction
                  of inaccurate data, and to withdraw consent for further processing. These rights
                  are exercised through the controller, the organisation that created the
                  application.
                </p>
                <p>
                  When an applicant withdraws consent, the withdrawal is recorded as a new event with
                  its own timestamp, and the associated data is flagged for deletion according to
                  the retention schedule. The original consent record is preserved for audit
                  purposes, but the withdrawal event clearly marks the point at which processing
                  authorisation ended. Withdrawal does not rewrite history, it records the change in
                  authorisation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-16 font-serif text-3xl font-semibold tracking-tight text-ink">Consent</h2>
              <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                <p>
                  Before any processing begins, the applicant explicitly authorises the organisation
                  to use their bank statement for a defined credit assessment. The consent artefact
                  records the purpose, the data categories, the organisation, the retention scope,
                  the expiry and the actor who captured the consent. No preselected or bundled
                  consent is permitted, the applicant must actively grant each consent for each
                  application.
                </p>
                <p>
                  Consent is versioned and auditable. Each consent artefact is a separate record
                  with its own identifier, timestamp and version. When the consent terms change, for
                  example when the purpose or retention scope is updated, a new consent artefact is
                  created and the applicant must actively grant the new consent. Previous consent
                  artefacts are preserved for audit purposes.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <h2 className="mt-16 font-serif text-3xl font-semibold tracking-tight text-ink">Access and correction</h2>
              <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                <p>
                  The applicant has the right to access the data that has been processed about them.
                  Access requests are made through the controller, the organisation that created the
                  application, not directly through Hola Credit. The controller can export the
                  application data, including the assessment, the consent record and the audit
                  trail, and provide it to the applicant.
                </p>
                <p>
                  If the applicant believes that the data is inaccurate, they can request correction
                  through the controller. Corrections are recorded as review events with
                  before-and-after values and the actor who made the change. The original data is
                  never overwritten, it remains in the audit trail alongside the correction. This
                  ensures that the audit trail is always complete and that the lender can see both
                  the original value and the corrected one.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Questions about privacy?</h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink/65">
                If your organisation needs to evaluate Hola Credit's privacy controls as part of
                your compliance assessment, contact us to discuss data handling, retention and
                borrower rights in detail.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-none bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
              >
                Talk to us
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
