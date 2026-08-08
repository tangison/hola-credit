import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Hola Credit",
  description: "Hola Credit terms of service. Usage conditions for the cash-flow assessment platform, including borrower consent requirements and all lender obligations.",
};

export default function TermsPage() {
  return (
    <div className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Legal</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Terms of service
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                These terms of service govern the use of Hola Credit, a product of Tangison Technologies. By using the service, the organisation agrees to these terms. Hola Credit is supplementary decision-support software, not a credit bureau. It does not make lending decisions and does not replace formal bureau checks.
              </p>
            </div>
          </div>
        </section>

        {/* Service description */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Service description</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Hola Credit is a web-based service that converts borrower-authorised bank statements into structured cash-flow evidence and an explainable assessment. The service is designed for authorised Namibian lenders and retail credit providers who want to supplement their existing credit assessment process with structured cash-flow evidence. The assessment is produced by deterministic, versioned code and is designed to be reviewed by a human before it informs a lending decision.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                The service includes the following capabilities: consent capture and management, bank statement upload and validation, AI-assisted transaction extraction and categorisation, deterministic cash-flow scoring, assessment review with transaction-level evidence and confidence scores, human decision recording, and audit logging. The service is accessed through a web portal, with a REST API planned for future use.
              </p>
              <div className="border-l-4 border-teal-400 bg-teal-50 p-6 rounded-r-md">
                <p className="text-ink/80 leading-relaxed">
                  <strong className="text-ink">Hola Credit is supplementary decision support.</strong> It does not approve or decline an applicant, it does not replace formal bureau checks, and it does not make the lending decision. The assessment supplies evidence, confidence levels, and limitations. The decision belongs to the lender.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Acceptable use and user responsibilities */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Acceptable use
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The service may only be used for the purpose of assessing applicants&apos; cash-flow evidence in connection with a legitimate credit assessment. Organisations must be authorised credit providers operating under Namibian regulation. The service must not be used to process statements without the applicant&apos;s explicit consent, to share assessment results with other organisations, to construct cross-lender borrower profiles, or to make automated adverse decisions without human review.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The service must not be used to process statements from applicants who have not been informed of the purpose, scope, and retention of the processing. Organisations must not represent the Hola Credit assessment as a credit bureau report, a credit score, or a lending decision. The assessment is supplementary evidence, not a substitute for any check that the organisation is legally or contractually required to perform.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  User responsibilities
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The organisation is responsible for ensuring that all statements processed through the service have been obtained with the applicant&apos;s explicit consent, that the consent artefact is accurate and complete, and that the applicant has been informed of their rights. The organisation is responsible for making the final lending decision, for recording the decision separately from the Hola Credit assessment, and for ensuring that the decision complies with the organisation&apos;s own policies and applicable law.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The organisation is responsible for the accuracy of the information it enters into the system, for the security of its user accounts, and for the actions of its team members. The organisation must not share login credentials, must not attempt to access another organisation&apos;s data, and must not use the service in a way that violates Namibian law or regulation. The organisation must report any suspected unauthorised access or data breach to Tangison Technologies immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data processing and liability */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Data processing
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Tangison Technologies processes personal data on behalf of the organisation, as described in the privacy policy. The organisation is the data controller and Tangison Technologies is the data processor. The processor handles personal data only according to the controller&apos;s instructions and the terms of service. The processor does not determine the purpose of the processing, does not use the data for its own purposes, and does not share the data with other organisations.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The processor is responsible for maintaining the security of the platform, enforcing tenant isolation, implementing the retention and deletion controls, and providing the audit trail that the controller needs to demonstrate compliance. The processor does not access tenant data unless specifically required for platform operations, and any such access is logged and auditable. The data processing terms are documented in the privacy policy and the consent framework.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Liability limitations
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit is provided as supplementary decision-support software. The assessment is based on the data provided, the extraction and categorisation process, and the scoring policy in effect at the time. The accuracy of the assessment depends on the quality of the input data, the reliability of the extraction, and the applicability of the scoring policy to the specific case. Tangison Technologies does not guarantee that the assessment will be accurate, complete, or suitable for any particular lending decision.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The organisation acknowledges that the assessment is one input into the lending decision, not the decision itself. The organisation is solely responsible for the lending decision and for ensuring that the decision complies with the organisation&apos;s own policies and applicable law. Tangison Technologies is not liable for any lending decision made by the organisation, whether or not the organisation used the Hola Credit assessment as part of that decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Changes to terms */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Changes to terms</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Tangison Technologies may update these terms of service from time to time. When the terms change, the updated version will be published on this page with a revised effective date. Organisations will be notified of material changes through the email address associated with their organisation account. Continued use of the service after the effective date of the updated terms constitutes acceptance of the changes.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                If a change to these terms materially affects the organisation&apos;s use of the service, the organisation may choose to discontinue use of the service. In that case, the organisation should contact Tangison Technologies to arrange for the export or deletion of its data in accordance with the retention policy. The organisation is responsible for ensuring that its use of the service complies with the terms in effect at the time of use.
              </p>
              <p className="text-ink/70 leading-relaxed">
                If you have questions about these terms, contact{" "}
                <a href="mailto:hola@tangison.com" className="text-teal-600 hover:text-teal-700 transition-colors duration-ui underline underline-offset-4">
                  hola@tangison.com
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about the terms?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your organisation needs to review the terms of service as part of your compliance assessment, contact us to discuss your requirements.
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
      </div>
  );
}
