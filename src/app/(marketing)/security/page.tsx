import type { Metadata } from "next";
import { Accordion } from "@/components/shared/accordion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Data Handling — Hola Credit",
  description: "How Hola Credit protects borrower data. Encryption, consent-gated access, tenant isolation, and secure statement processing.",
};

export default function SecurityPage() {
  return (
    <div className="flex-1">
        <link rel="preload" as="image" type="image/webp" href="/images/retail-credit-conversation-1280.webp" />
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Security</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                  Security and data handling
                </h1>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                  Financial data should have a short, accountable life. Hola Credit is designed around consent, tenant isolation, auditability, and intentionally limited raw-file retention.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source srcSet="/images/retail-credit-conversation-640.webp 640w, /images/retail-credit-conversation-960.webp 960w, /images/retail-credit-conversation-1280.webp 1280w, /images/retail-credit-conversation-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/retail-credit-conversation-master.png" type="image/png" />
                  <img src="/images/retail-credit-conversation-1280.webp" alt="Secure handling of borrower data during a credit assessment conversation" width={1672} height={941} loading="eager" fetchPriority="high" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Consent & tenant isolation */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Consent before processing
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  The applicant explicitly authorises the organisation to use their bank statement for a defined credit assessment. The consent artefact records purpose, data categories, organisation, retention scope, expiry, and the actor who captured it. No preselected or bundled consent is permitted. Consent withdrawal is recorded without rewriting history.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Tenant isolation
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Every application, statement, and assessment belongs to the organisation that created it. Loan officers see only their own cases. Risk managers can review across their organisation. At no point can one organisation access another&apos;s data, even through the same platform. Tenant boundaries are enforced on the server, not just in the interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Auditability: accordion */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Every material action is logged</h2>
            <Accordion
              items={[
                {
                  title: "Append-only audit events",
                  content: "Audit logs record sign-in risk events, organisation changes, invitations, role changes, consent capture, upload, file access, extraction correction, score generation, assessment viewing, human decisions, exports, API-key lifecycle, and administrative access. Every event is timestamped, actor-attributed, tenant-scoped, and protected from ordinary edits. Once an event is recorded, it cannot be deleted or modified by any user, including system administrators.",
                },
                {
                  title: "Extraction and scoring traceability",
                  content: "Every assessment records the extraction model version, the scoring policy version, the input statement IDs, the data sufficiency rating, and the component values that contributed to the result. When a loan officer or risk manager corrects an extraction result, the correction is recorded as a review event with before-and-after values and the actor who made the change. The original extraction is never overwritten.",
                },
                {
                  title: "Human decision ownership",
                  content: "The final lending decision is recorded separately from the Hola Credit assessment. The audit trail shows who made the decision, when, and what evidence they considered. Hola Credit can supply evidence, but the decision record is always attributed to the human who made it, with their own notes and rationale.",
                },
              ]}
            />
          </div>
        </section>

        {/* Data minimisation & access controls */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Data minimisation
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Hola Credit collects only the data required for the assessment. Full national identifiers are not stored in general application tables. Sensitive values are not placed in URLs or search indexes. Production and development data are kept strictly separate. When processing is complete, the raw bank statement file is scheduled for deletion according to the retention policy.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Access controls and encryption
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Access is restricted by organisation and role. Every permission must be enforced in server-side functions. Multi-factor authentication is required for administrative access. Field-level encryption is applied where recovery of the original value is legally required. Identity lookup tokens use HMAC-SHA-256 with a rotated server-held pepper. Production secrets are never committed to the public repository.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Short raw-file retention: accordion */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">Short raw-file retention</h2>
              <Accordion
                items={[
                  {
                    title: "How file retention works",
                    content: "Raw bank statement files are retained only for the period necessary to support the assessment and any required review. After that period, the files are scheduled for automated deletion. The system supports per-artifact retention classes, deletion due dates, legal holds with authorised reasons, and deletion confirmation with failure alerting. If a deletion fails, the system alerts the operations team rather than silently retaining the file.",
                  },
                  {
                    title: "File lifecycle state machine",
                    content: "The file lifecycle follows a defined state machine: a file moves from quarantine through scanning, acceptance or rejection, parsing, and then either a retention hold or deletion. Every transition is server-validated and idempotent. The deletion proof is recorded in the audit trail, so that the organisation can demonstrate that the file was deleted within the required timeframe.",
                  },
                  {
                    title: "Retention duration requires legal verification",
                    content: "The exact retention period for raw statement files and derived assessment data has not yet been confirmed. Engineering supports configurable retention classes and automated deletion, but the specific durations must be verified with Namibia-qualified privacy and financial-services counsel before production use. Hola Credit does not claim compliance with any specific retention regulation until this verification is complete.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Threat model & compliance: accordion */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">Threat model and compliance</h2>
              <Accordion
                items={[
                  {
                    title: "Threat model",
                    content: "The Hola Credit threat model addresses cross-tenant access, insecure direct object references, malicious file uploads, prompt injection through statement text, model hallucination, secret leakage, duplicate processing, insider misuse, consent misuse, excess retention, overconfident decisioning, and supply-chain compromise. Each threat has a defined required control, and the controls are verified through unit tests, integration tests, adversarial file corpora, prompt-injection test corpora, and static and dynamic analysis. The system is designed to deny by default.",
                  },
                  {
                    title: "Compliance status",
                    content: "Hola Credit is designed as supplementary underwriting support, not a credit bureau or final decision maker. Required conversations before production use include the Bank of Namibia, NAMFISA where the participating provider falls within its supervision, Namibia-qualified privacy and financial-services counsel, and participating lenders&apos; compliance and information-security teams. Shared borrower profiles, cross-lender access, automated adverse decisions, and reporting to formal bureaus remain blocked until Namibia-specific legal and regulator review is complete.",
                  },
                  {
                    title: "Do not claim compliance",
                    content: "Hola Credit does not claim compliance with any specific regulation, standard, or framework until Namibia-specific counsel confirms that the controls meet the legal requirements. The security measures described on this page represent the engineering design, not a legal attestation. Organisations evaluating Hola Credit should conduct their own compliance assessment with qualified Namibian legal counsel.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about security or data handling?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              Contact us to discuss the threat model, audit capabilities, and retention policies in detail.
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
