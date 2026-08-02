import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description: "How Hola Credit handles borrower consent. Explicit permission for bank statement access, data categorisation, and assessment sharing with authorised lenders.",
};

export default function ConsentPage() {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Legal / Consent</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Consent framework
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Hola Credit does not process a bank statement without the applicant&apos;s explicit consent. This page explains how consent is captured, what it covers, how long it lasts, and how it can be withdrawn. The consent framework is designed to be transparent, auditable, and respectful of the applicant&apos;s rights.
              </p>
            </div>
          </div>
        </section>

        {/* Purpose and scope */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Purpose
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Before any processing begins, the applicant explicitly authorises the organisation to use their bank statement for a defined credit assessment. The consent is not generic, it is specific to the purpose of the assessment, the data categories being processed, the organisation conducting the assessment, and the retention scope of the data. The applicant must understand what they are consenting to, and the consent must be granted actively, not through a preselected checkbox or a bundled agreement.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The purpose of the consent is to ensure that the applicant is informed and that the processing has a lawful basis. The consent artefact records the purpose, the data categories, the organisation, the retention scope, the expiry, and the actor who captured the consent. This information is available to the applicant, the organisation, and any auditor who needs to verify that the processing was conducted with proper authorisation.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Scope
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The consent covers the processing of the applicant&apos;s bank statement for the purpose of a cash-flow assessment by the specified organisation. The consent does not cover sharing the assessment with other organisations, constructing cross-lender borrower profiles, or using the data for any purpose other than the one specified in the consent artefact. The scope is limited by design, the consent is granular, not blanket.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The data categories covered by the consent include the bank statement file, the extracted transaction data, the assessment output, and the consent record itself. The consent does not authorise the collection of any data that is not necessary for the assessment. If the organisation needs to process additional data or use the data for a different purpose, a new consent must be obtained. The original consent does not extend to the new purpose or the new data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expiry and withdrawal */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Expiry
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Every consent artefact has an expiry date. After the consent expires, the organisation may no longer process the applicant&apos;s data under that consent. The expiry date is recorded in the consent artefact and is visible to the applicant, the organisation, and any auditor. The organisation must ensure that the assessment is completed before the consent expires, or obtain a new consent if the assessment requires additional time.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The expiry date is set at the time the consent is captured and cannot be extended without a new consent. If the organisation needs to retain the data beyond the expiry date for legal or regulatory reasons, the organisation must obtain a new consent or rely on a separate lawful basis. The system does not automatically extend consent, it respects the expiry date as recorded in the artefact.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Withdrawal
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The applicant may withdraw consent at any time. Withdrawal is recorded as a new event with its own timestamp, and the associated data is flagged for deletion according to the retention schedule. The original consent record is preserved for audit purposes, but the withdrawal event clearly marks the point at which processing authorisation ended.
                </p>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Consent withdrawal does not rewrite history. The assessment that was produced before the withdrawal remains on the record, because it was produced under valid consent. The withdrawal affects future processing, the organisation may no longer process the applicant&apos;s data under the withdrawn consent, but it does not erase the evidence that was legitimately produced while the consent was in effect. This approach preserves the audit trail and ensures that the lender can demonstrate that the assessment was conducted with proper authorisation.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  After withdrawal, the system flags the associated data for deletion according to the retention schedule. The deletion is not immediate, it follows the retention policy and any legal hold requirements, but the data is no longer accessible for processing under the withdrawn consent. The applicant can contact the organisation or Hola Credit to confirm the withdrawal and to request confirmation of the deletion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Versioned artefacts and no preselected consent */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Versioned artefacts
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Each consent artefact is a separate, versioned record with its own identifier, timestamp, and version number. When the consent terms change, for example, when the purpose or retention scope is updated, a new consent artefact is created, and the applicant must actively grant the new consent. Previous consent artefacts are preserved for audit purposes, so the organisation can always demonstrate what the applicant consented to at any given time.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Versioning ensures that the consent record is accurate and that the organisation cannot retroactively change the terms of the consent. The version number is included in the consent artefact and is visible to the applicant, the organisation, and any auditor. The assessment is linked to the specific consent version that was in effect at the time, so the audit trail is always clear about which consent governed which processing.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  No preselected consent
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  No preselected or bundled consent is permitted. The applicant must actively grant each consent for each specific purpose. The consent interface does not include pre-checked boxes, default opt-ins, or bundled consent for multiple purposes. The applicant must take a deliberate action, such as checking an unchecked box or confirming a consent prompt, to grant consent.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  This requirement is a design principle, not just a legal compliance measure. The goal is to ensure that the applicant is aware of what they are consenting to and that the consent is genuine. Preselected consent is not genuine consent, it is a form of default that the applicant may not notice or understand. Hola Credit requires active, informed consent for every processing purpose, and the consent interface is designed to make the consent decision clear and unambiguous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about the consent framework?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your organisation needs to evaluate Hola Credit&apos;s consent controls as part of your compliance assessment, contact us to discuss purpose, scope, expiry, and withdrawal in detail.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Contact us
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
