import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hola Credit is supplementary decision-support software for Namibian lenders and retailers, built by Tangison Technologies in Windhoek. Cash flow made legible.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="About"
          title="Cash flow made legible."
          lead="Hola Credit is supplementary decision-support software for Namibian lenders and retailers. It converts borrower-authorised bank statements into structured cash-flow evidence and an explainable assessment that supports, but never replaces, a human decision."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <Reveal>
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  Built for Namibia, first.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="space-y-6 text-[16.5px] leading-relaxed text-ink/70">
                  <p>
                    Many Namibians earn consistently without receiving a fixed salary. Freelancers,
                    consultants, contractors, transport operators, traders and other self-employed
                    professionals may have a real and assessable cash-flow history, spread across
                    clients, months and accounts. A payslip-only process cannot see it, and treating
                    these applicants as manual exceptions does not scale.
                  </p>
                  <p>
                    Hola Credit exists to close that gap. It reads the statement the applicant
                    authorises, structures the evidence, and leaves the judgement to the lender. The
                    assessment is deterministic and versioned. The extraction is checkable. The
                    limitations are stated, not implied.
                  </p>
                  <p>
                    It is a product of Tangison Technologies, built in Windhoek with a focus on
                    explainability, auditability and responsible data handling. The design goal is
                    simple to state and hard to do: a lender should be able to explain, to the
                    applicant and to themselves, exactly why an assessment says what it says.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-b border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Product by Tangison Technologies"
              title="Sovereign infrastructure, built where it is used."
              lead="Tangison Technologies builds financial-tools software with a focus on explainability, auditability and responsible data handling, designed to serve the Namibian market first."
            />
            <Reveal delay={120}>
              <div className="mt-12 flex flex-col items-start gap-6 rounded-2xl border border-sand-300 bg-sand-100 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div>
                  <p className="font-serif text-2xl font-semibold tracking-tight text-ink">Tangison Technologies</p>
                  <p className="mt-2 text-sm text-ink/60">Windhoek, Namibia · tangison.com</p>
                </div>
                <a
                  href="https://tangison.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
                >
                  Visit tangison.com
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <SectionHeading
              align="center"
              eyebrow="Pilot access"
              title="Help shape a more useful way to review cash flow."
              lead="If you are an authorised Namibian lender or retailer interested in evaluating structured cash-flow evidence alongside your existing process, we would like to hear from you."
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
