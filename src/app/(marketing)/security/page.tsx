import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shared/marketing-header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export const metadata: Metadata = {
  description: "How Hola Credit protects borrower data. Encryption at rest and in transit, consent-gated access, Namibian POPIA compliance, and secure statement processing.",
};

export default function SecurityPage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-teal-500 mb-4 tracking-wide uppercase">Security</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                Security and data handling
              </h1>
              <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                Financial data should have a short, accountable life. Hola Credit is designed around consent, tenant isolation, auditability, and intentionally limited raw-file retention. This page explains the controls that are in place, the controls that are planned, and the areas where legal verification is still required before production use.
              </p>
            </div>
          </div>
        </section>

        {/* Consent */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Consent before processing
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Before any processing begins, the applicant explicitly authorises the organisation to use their bank statement for a defined credit assessment. The consent artefact records the purpose, the data categories, the organisation, the retention scope, the expiry, and the actor who captured the consent. No preselected or bundled consent is permitted — the applicant must actively grant each consent for each specific purpose.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Consent withdrawal is recorded without rewriting history. When an applicant withdraws consent, the withdrawal is logged as a new event with its own timestamp, and the associated data is flagged for deletion according to the retention schedule. The original consent record is preserved for audit purposes, but the withdrawal event clearly marks the point at which processing authorisation ended.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Tenant isolation
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Every application, statement, and assessment belongs to the organisation that created it. Loan officers see only their own cases. Risk managers can review across their organisation. Compliance auditors can read cases and audit history without editing decisions. At no point can one organisation access another organisation&apos;s data, even through the same platform.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Tenant boundaries are enforced on the server, not just in the interface. Every server operation resolves the valid session, the active organisation, the active membership, the required permission, the resource tenant ownership, and the resource state permitting the action. Organisation ID is never accepted from the browser as authoritative. Cross-tenant access is prevented by deny-by-default server-side checks, and integration tests verify that cross-tenant access is not possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Auditability */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Auditability: every material action is logged</h2>
            <div className="space-y-16">
              {[
                {
                  title: "Append-only audit events",
                  description: "Audit logs record sign-in risk events, organisation changes, invitations, role changes, consent capture, upload, file access, extraction correction, score generation, assessment viewing, human decisions, exports, API-key lifecycle, and administrative access. Every event is timestamped, actor-attributed, tenant-scoped, and protected from ordinary edits. The audit trail is append-only: once an event is recorded, it cannot be deleted or modified by any user, including system administrators.",
                },
                {
                  title: "Extraction and scoring traceability",
                  description: "Every assessment records the extraction model version, the scoring policy version, the input statement IDs, the data sufficiency rating, and the component values that contributed to the result. When a loan officer or risk manager corrects an extraction result, the correction is recorded as a review event with before-and-after values and the actor who made the change. The original extraction is never overwritten — it remains in the audit trail alongside the correction.",
                },
                {
                  title: "Human decision ownership",
                  description: "The final lending decision is recorded separately from the Hola Credit assessment. The audit trail shows who made the decision, when, and what evidence they considered. This separation ensures that the lender owns the decision, not the system. Hola Credit can supply evidence, but the decision record is always attributed to the human who made it, with their own notes and rationale.",
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

        {/* Data minimisation and access controls */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Data minimisation
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit collects only the data required for the assessment. Full national identifiers are not stored in general application tables. Sensitive values are not placed in URLs or search indexes. Production and development data are kept strictly separate, with synthetic fixtures used in development and CI environments. The system is designed to collect the minimum necessary, process it, and retain the derived data separately from the raw files.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  When the processing is complete, the structured assessment output is retained for the lender to review, but the raw bank statement file is scheduled for deletion according to the retention policy. The retention of derived data is managed separately from the retention of raw files, so that the lender can retain the assessment evidence without keeping the original statement beyond the necessary period.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Access controls and encryption
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Access is restricted by organisation and role. The system supports organisation owners, risk managers, loan officers, compliance auditors, and platform operations staff, each with defined permissions that are enforced on the server. No role may gain access solely through hidden UI — every permission must be enforced in server-side functions. Multi-factor authentication is required for administrative access.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  Field-level encryption is applied where recovery of the original value is legally required. Identity lookup tokens use HMAC-SHA-256 with a rotated server-held pepper, rather than unsalted hashing. Production model prompts, scoring weights, API keys, webhook secrets, and encryption keys are never committed to the public repository. All secrets are managed through server-only adapters, and logs are redacted to prevent accidental leakage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Short raw-file retention */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">Short raw-file retention</h2>
              <p className="text-ink/70 leading-relaxed mb-6">
                Raw bank statement files are retained only for the period necessary to support the assessment and any required review. After that period, the files are scheduled for automated deletion. The system supports per-artifact retention classes, deletion due dates, legal holds with authorised reasons, and deletion confirmation with failure alerting. If a deletion fails, the system alerts the operations team rather than silently retaining the file.
              </p>
              <p className="text-ink/70 leading-relaxed mb-6">
                The file lifecycle follows a defined state machine: a file moves from quarantine through scanning, acceptance or rejection, parsing, and then either a retention hold or deletion. Every transition is server-validated and idempotent. The deletion proof is recorded in the audit trail, so that the organisation can demonstrate that the file was deleted within the required timeframe.
              </p>
              <div className="mt-8 border-l-4 border-warning bg-sand-100 p-6 rounded-r-md">
                <p className="text-ink/80 leading-relaxed">
                  <strong className="text-ink">Retention duration requires legal verification.</strong> The exact retention period for raw statement files and derived assessment data has not yet been confirmed. Engineering supports configurable retention classes and automated deletion, but the specific durations must be verified with Namibia-qualified privacy and financial-services counsel before production use. Hola Credit does not claim compliance with any specific retention regulation until this verification is complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Threat model and compliance */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Threat model
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  The Hola Credit threat model addresses cross-tenant access, insecure direct object references, malicious file uploads, prompt injection through statement text, model hallucination, secret leakage, duplicate processing, insider misuse, consent misuse, excess retention, overconfident decisioning, and supply-chain compromise. Each threat has a defined required control, and the controls are verified through unit tests, integration tests, adversarial file corpora, prompt-injection test corpora, and static and dynamic analysis.
                </p>
                <p className="text-ink/70 leading-relaxed">
                  The system is designed to deny by default. Every access check starts from the assumption that the request should be denied, and then evaluates the session, organisation, membership, permission, tenant ownership, and resource state before allowing the action. This approach is applied consistently across all server operations, not just the most obvious ones.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ink tracking-tight mb-6">
                  Compliance status
                </h2>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Hola Credit is designed as supplementary underwriting support, not a credit bureau or final decision maker. The product is Namibia-first, and the regulatory posture reflects the requirements of the Namibian financial-services environment. Required conversations before production use include the Bank of Namibia, NAMFISA where the participating provider falls within its supervision, Namibia-qualified privacy and financial-services counsel, and participating lenders&apos; compliance and information-security teams.
                </p>
                <p className="text-ink/70 leading-relaxed mb-6">
                  Shared borrower profiles, cross-lender access, automated adverse decisions, and reporting to formal bureaus remain blocked until Namibia-specific legal and regulator review is complete. Credit bureau names are not used in integration or contribution claims until approved by the bureaus themselves.
                </p>
                <div className="border-l-4 border-warning bg-sand-100 p-6 rounded-r-md">
                  <p className="text-ink/80 leading-relaxed">
                    <strong className="text-ink">Do not claim compliance.</strong> Hola Credit does not claim compliance with any specific regulation, standard, or framework until Namibia-specific counsel confirms that the controls meet the legal requirements. The security measures described on this page represent the engineering design, not a legal attestation. Organisations evaluating Hola Credit should conduct their own compliance assessment with qualified Namibian legal counsel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about security or data handling?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your organisation needs to evaluate Hola Credit&apos;s security controls as part of your pilot assessment, contact us to discuss the threat model, audit capabilities, and retention policies in detail.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui">
                Request pilot access
              </Link>
              <Link href="/how-scoring-works" className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui">
                How scoring works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
