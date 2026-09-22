import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "Security and consent",
  description:
    "How Hola Credit protects borrower data: consent before processing, tenant isolation, append-only audit logging, data minimisation and intentionally short raw-file retention.",
  alternates: { canonical: "/security" },
};

const PRINCIPLES = [
  {
    title: "Consent before processing",
    body: "The applicant explicitly authorises the organisation to use their bank statement for a defined credit assessment. The consent artefact records purpose, data categories, organisation, retention scope, expiry, and the actor who captured the consent. No preselected or bundled consent is permitted. Withdrawal is recorded as a new event, without rewriting history.",
  },
  {
    title: "Tenant isolation",
    body: "Every application, statement and assessment belongs to the organisation that created it. Loan officers see only their own cases. Risk managers can review across their organisation. At no point can one organisation access another's data. The boundary is enforced on the server, not just in the interface.",
  },
  {
    title: "Every material action is logged",
    body: "Sign-in, organisation changes, consent capture, upload, file access, extraction correction, score generation, assessment viewing, human decisions, exports and administrative access. Every event is timestamped, actor-attributed, tenant-scoped and protected from ordinary edits. The trail is append-only.",
  },
  {
    title: "Data minimisation",
    body: "Hola Credit collects only the data required for the assessment. Full national identifiers are not stored in general application tables. Sensitive values are not placed in URLs or search indexes. Production and development environments are separated, with production access logged and auditable.",
  },
  {
    title: "Intentionally short retention",
    body: "Raw bank statement files are retained only for the period necessary to support the assessment and any required review, after which they are scheduled for automated deletion. The system supports per-artifact retention classes, deletion due dates, legal holds with authorised reasons, and deletion confirmation with failure alerting.",
  },
];

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="Security and data handling"
          title="Financial data should have a short, accountable life."
          lead="Hola Credit is designed around consent, tenant isolation, auditability and intentionally limited raw-file retention. Here is what that means in practice, in plain language."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
                <figure className="overflow-hidden rounded-2xl border border-sand-300">
                  <img
                    src="/images/landing/consent-security.webp"
                    alt="Illustration of a professional holding a blank consent document"
                    width={960}
                    height={549}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </figure>
                <p className="mt-4 text-sm text-ink/55">
                  The consent artefact is captured before any statement is uploaded, and it stays attached to the case for its entire life.
                </p>
              </Reveal>
              <div className="space-y-14">
                {PRINCIPLES.map((p, i) => (
                  <Reveal key={p.title} delay={i * 40}>
                    <div className="border-t border-sand-300 pt-7">
                      <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tight text-ink">
                        {p.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink/70">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl">
                Questions about security or data handling?
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-ink/65">
                Contact us to discuss the threat model, audit capabilities and retention policies in detail.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
                >
                  Talk to us
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-full border border-sand-400 px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-ui hover:border-ink"
                >
                  Read the privacy policy
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
