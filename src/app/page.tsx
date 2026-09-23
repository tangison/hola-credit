import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/reveal";
import { GhostNumeral } from "@/components/landing/ghost-numeral";

export const metadata: Metadata = {
  title: "Hola Credit · Say hola to the income a payslip never shows",
  description:
    "Cash-flow underwriting for Namibian microlenders and retailers. Hola Credit turns a borrower-authorised bank statement into structured evidence: income floor, consistency, volatility and red flags.",
  alternates: { canonical: "/" },
};

const DEMO_URL = "https://hola.tangison.com/app";
const WAITLIST_URL = "https://hola.tangison.com/waitlist";

const STEPS = [
  {
    n: "01",
    title: "Record consent",
    line: "The applicant authorises the assessment first. The consent artefact carries purpose, scope, expiry and actor, before any file exists in the system.",
  },
  {
    n: "02",
    title: "Upload securely",
    line: "The loan officer uploads the bank statement, PDF preferred. The file is quarantined, scanned and stored inside the organisation's tenant.",
  },
  {
    n: "03",
    title: "Extract and check",
    line: "Transactions are extracted and categorised with confidence scores. Uncertain rows are flagged for human eyes, never guessed silently.",
  },
  {
    n: "04",
    title: "Review the assessment",
    line: "Income floor, consistency, volatility and red flags, with a plain-language explanation. The decision stays with the lender.",
  },
];

const SIGNALS = [
  {
    title: "Income floor",
    line: "The minimum reliable monthly income the statement can support, discounted for concentration and volatility. Conservative by design.",
  },
  {
    title: "Consistency",
    line: "How much of the income lands in a steady band around the median. A rhythm you can plan around, or the absence of one.",
  },
  {
    title: "Volatility",
    line: "How wide the swings run between the strongest and weakest months. Context for any repayment plan a human might build.",
  },
  {
    title: "Red flags",
    line: "Patterns that deserve a human eye before a decision: gambling-shaped activity, sudden reversals, unexplained round figures.",
  },
];

const PEOPLE = [
  { name: "Nangula", role: "Freelance designer", city: "Windhoek", img: "/images/landing/persona-freelancer.webp" },
  { name: "Tangeni", role: "Transport operator", city: "Walvis Bay", img: "/images/landing/persona-transport.webp" },
  { name: "Katuuti", role: "Market trader", city: "Oshakati", img: "/images/landing/persona-trader.webp" },
  { name: "Sanna", role: "Shop owner", city: "Swakopmund", img: "/images/landing/persona-retailer.webp" },
];

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Hola Credit",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Cash-flow underwriting support for Namibian microlenders and retailers. Converts borrower-authorised bank statements into structured cash-flow evidence: income floor, consistency, volatility and red flags.",
    url: "https://hola.tangison.com",
    producer: {
      "@type": "Organization",
      name: "Tangison Technologies",
      url: "https://tangison.com",
      address: { "@type": "PostalAddress", addressLocality: "Windhoek", addressCountry: "NA" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+264-83-411-522",
        email: "hola@tangison.com",
        contactType: "customer support",
      },
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "NAD", description: "Demo access without an account. Pilot access via waitlist." },
  };

  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {/* Hero: one statement, one paragraph, two doors, one image */}
        <section className="bg-sand-50 pb-4 pt-28 lg:pt-36">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-teal-600">
                Cash-flow underwriting for Namibia
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-balance text-ink sm:text-6xl lg:text-8xl">
                Say hola to the{" "}
                <span className="relative inline-block">
                  income a payslip
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-[0.14em] w-full"
                  >
                    <path
                      d="M1.5 7.5 C 25 3.5, 62 3, 98.5 6"
                      fill="none"
                      stroke="#16b8a6"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      pathLength="1"
                      className="draw-line"
                    />
                  </svg>
                </span>{" "}
                never shows.
              </h1>
              <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65 lg:text-lg">
                Hola Credit turns a borrower-authorised bank statement into structured cash-flow evidence.
                Income floor, consistency, volatility, red flags. In plain language, for the desk that has
                to decide.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={DEMO_URL}
                  className="press group inline-flex items-center justify-center gap-2 rounded-none bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 hover:bg-ink-50"
                >
                  Try the demo
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
                </a>
                <a
                  href={WAITLIST_URL}
                  className="inline-flex items-center justify-center rounded-none border border-sand-400 px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-ui hover:border-ink"
                >
                  Join the waitlist
                </a>
              </div>
            </Reveal>
          </div>
          <div className="mt-12 lg:mt-16">
            <Reveal delay={120}>
              <img
                src="/images/landing/hero-greeting.webp"
                alt="Illustration of a Namibian woman greeting the reader with a wave"
                width={1280}
                height={640}
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full"
              />
            </Reveal>
          </div>
        </section>

        {/* Manifesto: large serif lede */}
        <section className="bg-sand-50 py-28 lg:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <Reveal>
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  Irregular does not mean invisible.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="space-y-6 text-[17px] leading-relaxed text-ink/70 lg:text-lg">
                  <p>
                    Freelancers, contractors, traders, transport operators and shop owners across Namibia
                    earn consistently without ever receiving a fixed salary deposit. Salary-only underwriting
                    reads them as blank pages. Their bank statements tell a different story.
                  </p>
                  <p>
                    Hola Credit makes that story legible. It converts a real statement into structured
                    evidence a lender can read, question and stand behind. The assessment is explainable,
                    the extraction is checkable, and the decision remains exactly where it belongs, with
                    the lender.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Four steps: editorial numbered list */}
        <section id="how" className="border-t border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="How it works"
              title="From statement to signal in four steps."
              lead="No black box. Every step leaves an auditable trace, and every assessment can be walked back to the transactions behind it."
            />
            <div className="mt-14 border-t border-sand-300">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 60}>
                  <div className="relative border-b border-sand-300 py-12 lg:py-16">
                    <GhostNumeral
                      n={step.n}
                      className="absolute -top-3 font-serif font-semibold text-[7rem] italic leading-none text-sand-300/70 sm:-left-14 sm:text-[9rem] lg:-left-24 lg:text-[11rem]"
                    />
                    <div className="relative grid gap-4 sm:grid-cols-[minmax(200px,280px)_1fr] sm:gap-14 lg:grid-cols-[minmax(240px,320px)_1fr]">
                      <h3 className="relative font-serif text-[1.45rem] font-semibold leading-snug tracking-tight text-ink sm:translate-y-3 lg:translate-y-4">
                        {step.title}
                      </h3>
                      <p className="relative max-w-xl text-[15.5px] leading-[1.75] text-ink/60 sm:translate-y-3 lg:translate-y-4">
                        {step.line}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <Link
                href="/product"
                className="group mt-10 inline-flex items-center gap-2 py-1.5 text-sm font-bold text-teal-600 transition-colors hover:text-ink"
              >
                See the product in detail
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Four signals */}
        <section id="signals" className="border-t border-sand-300 bg-teal-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="The assessment"
              title="Four signals. One clear picture."
              lead="Each signal answers one question a lender actually asks, and each carries its own confidence level based on the quality of the data behind it."
            />
            <div className="mt-14 grid gap-px overflow-hidden rounded-none border border-sand-300 bg-sand-300 sm:grid-cols-2">
              {SIGNALS.map((signal, i) => (
                <Reveal key={signal.title} delay={i * 60} className="bg-sand-50">
                  <div className="h-full p-10 lg:p-12">
                    <h3 className="font-serif text-[1.65rem] font-semibold tracking-tight text-ink">{signal.title}</h3>
                    <p className="mt-5 text-[15.5px] leading-[1.75] text-ink/60">{signal.line}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Honesty band */}
        <section className="bg-ink py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-gold-400">Honesty first</p>
                <p className="mt-6 font-serif text-3xl font-semibold italic leading-snug text-sand-50 sm:text-4xl">
                  Evidence for a decision, never the decision itself.
                </p>
                <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-sand-50/60">
                  Predictive accuracy against repayment outcomes can only be proven once real pilot loans
                  have seasoned, six to twelve months in. We say so up front, because a credit tool that
                  sells certainty it has not earned is not a tool you should underwrite with.
                </p>
                <Link
                  href="/faq"
                  className="group mt-9 inline-flex items-center gap-2 py-1.5 text-sm font-bold text-teal-300 transition-colors hover:text-sand-50"
                >
                  Read the honest FAQ
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* People strip */}
        <section id="people" className="border-t border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Who it is for"
              title="The people behind the statements."
              lead="Illustrative personas of Namibian self-employed earners. Not real applicants, but the pattern is real: steady work, irregular deposits."
            />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
              {PEOPLE.map((person, i) => (
                <Reveal
                  key={person.name}
                  delay={i * 60}
                  variant="clip"
                  className={i % 2 === 1 ? "lg:mt-12" : undefined}
                >
                  <div className="overflow-hidden rounded-none border border-sand-300">
                    <img
                      src={person.img}
                      alt={`Illustration of ${person.name}, a ${person.role.toLowerCase()} in ${person.city}`}
                      width={640}
                      height={854}
                      loading="lazy"
                      className="h-auto w-full"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The real economy band */}
        <section className="border-t border-sand-300 bg-sand-100 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
              <Reveal variant="clip">
                <div className="overflow-hidden rounded-none border border-sand-300">
                  <img
                    src="/images/landing/market-dawn.webp"
                    alt="Illustration of a market vendor arranging her stall at first light"
                    width={1280}
                    height={640}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-teal-600">The real economy</p>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-balance text-ink sm:text-4xl">
                  The statements begin before the city wakes.
                </h2>
                <p className="mt-5 text-[16.5px] leading-relaxed text-ink/70">
                  Market vendors, transport operators, freelancers and shop owners open earlier than most
                  ledgers can record. Their income is real, steady and legible to anyone who reads the
                  statement instead of the payslip. That is the economy Hola Credit is built to read.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl">
                The next hola is yours.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-ink/65">
                Pilot access is open to authorised Namibian lenders and retailers who want to read cash
                flow properly.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={WAITLIST_URL}
                  className="press group inline-flex items-center justify-center gap-2 rounded-none bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 hover:bg-ink-50"
                >
                  Join the waitlist
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-none border border-sand-400 px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-ui hover:border-ink"
                >
                  Talk to us
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
