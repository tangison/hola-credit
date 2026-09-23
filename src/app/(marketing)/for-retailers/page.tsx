import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "For retail credit",
  description:
    "Credit checks built for how customers actually earn. Structured cash-flow evidence for Namibian retail credit teams assessing customers who do not earn a fixed salary.",
  alternates: { canonical: "/for-retailers" },
};

const SECTIONS = [
  {
    title: "Point-of-sale review that fits the counter",
    body: "Retail credit teams regularly assess customers who want to purchase goods on credit but do not earn a fixed salary. Hola Credit helps those teams understand the cash-flow evidence in a borrower-authorised bank statement, at the pace a counter actually moves at. The assessment is written in plain language, so it can be read, questioned and explained without a data specialist in the room.",
  },
  {
    title: "Staff roles that match retail operations",
    body: "Not every retail credit desk looks like a bank's. Hola Credit ships with roles that map onto how retail teams actually work: counter staff who start cases, credit leads who review assessments, and managers who see across the branch. Access is restricted by organisation and role, enforced on the server rather than only in the interface.",
  },
  {
    title: "Case consistency across locations and staff",
    body: "Two branches should not produce two different answers for the same kind of applicant. The assessment is deterministic: the same statement data and the same policy version produce the same result, whoever runs the case and wherever it is run. Consistency here is not a promise, it is a property of the design.",
  },
];

export default function ForRetailersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="For retail credit"
          title="Credit checks built for how customers actually earn."
          lead="Structured cash-flow evidence for retail credit teams, so a customer without a payslip can be assessed on what their money actually does, at the pace of the counter."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <Reveal delay={120} variant="clip" className="order-last lg:order-first lg:sticky lg:top-28 lg:self-start">
                <div className="overflow-hidden rounded-none border border-sand-300">
                  <img
                    src="/images/landing/persona-retailer.webp"
                    alt="Illustration of a shop owner at her counter, one of the earners retail credit teams serve"
                    width={640}
                    height={854}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
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
            </div>
          </div>
        </section>

        <section className="border-t border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <SectionHeading
              align="center"
              eyebrow="Pilot access"
              title="Sell on credit with evidence, not guesswork."
              lead="Pilot access is available for authorised Namibian retailers who want to test structured cash-flow evidence alongside their existing credit assessment process."
            />
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://hola.tangison.com/waitlist"
                className="press group inline-flex items-center justify-center gap-2 rounded-none bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 hover:bg-ink-50"
              >
                Request pilot access
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-none border border-sand-400 px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-ui hover:border-ink"
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
