import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "For microlenders",
  description:
    "Assess beyond the salary line. Structured cash-flow evidence from borrower-authorised bank statements for Namibian microlending books, with a full audit trail for every case.",
  alternates: { canonical: "/for-microlenders" },
};

const SECTIONS = [
  {
    title: "Exception underwriting, not exception handling",
    body: "Many Namibian microlenders work with applicants who earn consistently but not through a single employer deposit. These applicants are usually handled as manual exceptions, judged case by case, with the reasoning living in one officer's head. Hola Credit turns that exception into a structured, repeatable assessment: the same evidence, the same signals, the same audit trail, for every applicant whose income does not fit a payslip.",
  },
  {
    title: "What the evidence trail looks like",
    body: "Every assessment is anchored to the transactions behind it. A loan officer can open the income floor, click through to the exact deposits that support it, and check the confidence level on each one. If an extraction looks wrong, the correction is recorded with before-and-after values. When a risk manager asks how a case was assessed, the answer is a link, not a memory.",
  },
  {
    title: "Built for how risk teams actually review",
    body: "Loan officers see their own cases. Risk managers can review across the organisation. Low-confidence extractions are routed to a human review queue instead of being pushed through. Every material action, sign-in, upload, correction, score generation, decision, is logged in an append-only audit trail with timestamps and actor attribution.",
  },
  {
    title: "Operational speed without cutting corners",
    body: "The upload-to-assessment pipeline targets completion within sixty seconds at the defined percentile. That is a processing-time target, not a claim about decision quality. Cases that need a human eye still get one. Speed comes from removing clerical work, not judgement.",
  },
];

export default function ForMicrolendersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="For microlenders"
          title="Review more than a salary line."
          lead="Structured cash-flow evidence from borrower-authorised bank statements, so loan officers can assess the applicants salary-only underwriting turns away, with a full audit trail for every case."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <div className="space-y-16">
                {SECTIONS.map((section, i) => (
                  <Reveal key={section.title} delay={i * 40}>
                    <div className="border-t border-sand-300 pt-7">
                      <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[1.7rem]">
                        {section.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink/70">{section.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
                <figure className="overflow-hidden rounded-2xl border border-sand-300">
                  <img
                    src="/images/landing/persona-transport.webp"
                    alt="Illustration of a transport operator, one of the self-employed earners microlenders serve"
                    width={640}
                    height={854}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </figure>
                <figcaption className="mt-4 text-sm text-ink/55">
                  Illustrative persona. Transport operators are part of the self-employed
                  majority in Namibian lending.
                </figcaption>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <SectionHeading
              align="center"
              eyebrow="Pilot access"
              title="Assess the whole book, not just the easy files."
              lead="Pilot access is available for authorised Namibian microlenders who want to evaluate cash-flow evidence alongside their existing assessment process."
            />
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://hola.tangison.com/waitlist"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
              >
                Request pilot access
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-full border border-sand-400 px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-ui hover:border-ink"
              >
                See how scoring works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
