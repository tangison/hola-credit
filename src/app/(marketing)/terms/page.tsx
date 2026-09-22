import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Usage conditions for Hola Credit, the cash-flow assessment platform by Tangison Technologies: service description, acceptable use, user responsibilities, data processing and liability limitations.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Terms of service."
          lead="These terms of service govern the use of Hola Credit, a product of Tangison Technologies. By using the service, the organisation agrees to these terms. Hola Credit is supplementary decision-support software, not a credit bureau. It does not make lending decisions and does not replace formal bureau checks."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal>
              <div className="rounded-2xl border-l-4 border-teal-400 bg-teal-50 p-6">
                <p className="text-[15.5px] font-semibold leading-relaxed text-ink/80">
                  Hola Credit is supplementary decision support. It does not approve or decline an
                  applicant, it does not replace formal bureau checks, and it does not make the
                  lending decision. The assessment supplies evidence, confidence levels and
                  limitations. The decision belongs to the lender.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 space-y-14">
              <Reveal>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Service description</h2>
                <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                  <p>
                    Hola Credit is a web-based service that converts borrower-authorised bank
                    statements into structured cash-flow evidence and an explainable assessment. The
                    service is designed for authorised Namibian lenders and retail credit providers
                    who want to supplement their existing credit assessment process with
                    cash-flow evidence.
                  </p>
                  <p>
                    The service includes the following capabilities: consent capture and management,
                    bank statement upload and validation, AI-assisted transaction extraction and
                    categorisation, deterministic cash-flow scoring, assessment review with
                    transaction-level evidence and confidence scores, human decision recording with
                    notes, and audit logging of every material action.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={40}>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Acceptable use</h2>
                <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                  <p>
                    The service may only be used for the purpose of assessing applicants' cash-flow
                    evidence in connection with a legitimate credit assessment. Organisations must
                    be authorised credit providers operating under Namibian regulation. The service
                    must not be used to process statements without the applicant's explicit,
                    informed and recorded consent.
                  </p>
                  <p>
                    The service must not be used to process statements from applicants who have not
                    been informed of the purpose, scope and retention of the processing.
                    Organisations must not represent the Hola Credit assessment as a credit bureau
                    report, a credit score, or a lending decision. The assessment is supplementary
                    evidence only.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">User responsibilities</h2>
                <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                  <p>
                    The organisation is responsible for ensuring that all statements processed
                    through the service have been obtained with the applicant's explicit consent,
                    that the consent artefact is accurate and complete, and that the applicant has
                    been informed of their rights. The organisation is responsible for the lawfulness
                    of the processing it instructs.
                  </p>
                  <p>
                    The organisation is responsible for the accuracy of the information it enters
                    into the system, for the security of its user accounts, and for the actions of
                    its team members. The organisation must not share login credentials, must not
                    attempt to access another organisation's data, and must not use the service to
                    build cross-lender borrower profiles.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Data processing</h2>
                <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                  <p>
                    Tangison Technologies processes personal data on behalf of the organisation, as
                    described in the privacy policy. The organisation is the data controller and
                    Tangison Technologies is the data processor. The processor handles personal data
                    only according to the controller's instructions and the terms of service.
                  </p>
                  <p>
                    The processor is responsible for maintaining the security of the platform,
                    enforcing tenant isolation, implementing the retention and deletion controls,
                    and providing the audit trail that the controller needs to demonstrate
                    compliance. The processor does not access tenant data unless specifically
                    required for platform operations, and any such access is logged and auditable.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Liability limitations</h2>
                <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                  <p>
                    Hola Credit is provided as supplementary decision-support software. The
                    assessment is based on the data provided, the extraction and categorisation
                    process, and the scoring policy in effect at the time. The accuracy of the
                    assessment depends on the quality of the input data, the reliability of the
                    extraction and the appropriateness of the policy for the given case.
                  </p>
                  <p>
                    The organisation acknowledges that the assessment is one input into the lending
                    decision, not the decision itself. The organisation is solely responsible for
                    the lending decision and for ensuring that the decision complies with the
                    organisation's own policies and applicable law. Tangison Technologies is not
                    liable for lending decisions made on the basis of the assessment.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Changes to terms</h2>
                <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink/70">
                  <p>
                    Tangison Technologies may update these terms of service from time to time. When
                    the terms change, the updated version will be published on this page with a
                    revised effective date. Organisations will be notified of material changes
                    through the email address associated with their organisation account.
                  </p>
                  <p>
                    If a change to these terms materially affects the organisation's use of the
                    service, the organisation may choose to discontinue use of the service. In that
                    case, the organisation should contact Tangison Technologies to arrange for the
                    export or deletion of its data in accordance with the retention schedule.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">Questions about the terms?</h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink/65">
                If your organisation needs to review the terms of service as part of your compliance
                assessment, contact us to discuss your requirements.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
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
