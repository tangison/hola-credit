import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/reveal";
import { RhythmSlider } from "@/components/landing/rhythm-slider";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Hola Credit works: consent first, secure upload, AI-assisted extraction with human checks, deterministic scoring and a reviewable assessment. Built for Namibian lenders.",
  alternates: { canonical: "/product" },
};

const STEPS = [
  {
    n: "01",
    title: "Record consent",
    lines: [
      "Before any processing begins, the applicant explicitly authorises the organisation to use their bank statement for a defined credit assessment. No preselected or bundled consent is permitted.",
      "The consent artefact records the purpose, data categories, organisation, retention scope, expiry, and the actor who captured it. Consent is versioned, auditable, and withdrawal is recorded without rewriting history.",
    ],
  },
  {
    n: "02",
    title: "Upload securely",
    lines: [
      "The loan officer uploads the bank statement inside the organisation's tenant. PDF is preferred because it preserves layout and text encoding, which makes extraction more reliable. PNG and JPEG are accepted with OCR as a fallback.",
      "The file moves through a defined lifecycle: quarantine, scanning, acceptance or rejection, parsing, then a retention hold with a deletion due date. Statements from FNB Namibia, Bank Windhoek, Standard Bank Namibia and Nedbank Namibia are supported at launch.",
    ],
  },
  {
    n: "03",
    title: "Extract and check",
    lines: [
      "Transactions are extracted and categorised, each with a confidence score and source-page provenance. Low-confidence rows are flagged for human review rather than guessed silently. Corrections are recorded as review events with before-and-after values.",
      "This is the only place AI touches the pipeline. AI extracts, it does not decide.",
    ],
  },
  {
    n: "04",
    title: "Review the assessment",
    lines: [
      "The assessment summarises the cash-flow evidence across its components, each with its own confidence level, plus a plain-language explanation a lender can read aloud to a colleague.",
      "The lender adds their own notes, applies their own policy, and makes the decision. The decision record is owned by the lender's organisation and stored separately from the assessment.",
    ],
  },
];

const SIGNALS = [
  {
    title: "Income floor",
    question: "What can this applicant genuinely rely on?",
    line: "The minimum reliable monthly income the statement can support, derived from consistent credit transactions and discounted for concentration risk and volatility. When data is insufficient, the income floor is null rather than a misleading number.",
  },
  {
    title: "Consistency",
    question: "How regular is the rhythm?",
    line: "How much of the income lands in a steady band around the median. Months inside the band, months outside it, and no reward for one lucky deposit.",
  },
  {
    title: "Volatility",
    question: "How wide does income swing?",
    line: "The spread between the strongest and weakest months, relative to the median. Context for any repayment plan a human might build.",
  },
  {
    title: "Red flags",
    question: "What needs a human eye?",
    line: "Patterns that deserve attention before a decision: gambling-shaped activity, sudden reversals, unexplained round figures. Flags are surfaced, never acted on automatically.",
  },
];

export default function ProductPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="Product"
          title="Structure the evidence. Then hand it to a human."
          lead="Hola Credit converts a borrower-authorised bank statement into structured cash-flow evidence, bounded by confidence levels and produced by versioned deterministic code. Same inputs, same policy version, same result. Every time."
        />

        {/* Four steps, detailed */}
        <section className="border-b border-sand-300 bg-sand-50 py-28 lg:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading eyebrow="How it works" title="Four steps, fully auditable." />
            <div className="mt-14 space-y-16">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 40}>
                  <div className="relative border-t border-sand-300 py-12 lg:py-16">
                    <span aria-hidden="true" className="pointer-events-none absolute -top-3 select-none font-serif text-[7rem] italic leading-none text-sand-300/70 sm:-left-14 sm:text-[9rem] lg:-left-24 lg:text-[11rem]">
                      {step.n}
                    </span>
                    <div className="relative grid gap-4 sm:grid-cols-[minmax(200px,280px)_1fr] sm:gap-14">
                      <h3 className="relative font-serif text-[1.45rem] font-semibold leading-snug tracking-tight text-ink sm:translate-y-3 lg:translate-y-4">
                        {step.title}
                      </h3>
                      <div className="relative max-w-2xl space-y-4 text-[15.5px] leading-[1.75] text-ink/65 sm:translate-y-3 lg:translate-y-4">
                        {step.lines.map((line) => (
                          <p key={line.slice(0, 24)}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Rhythm explorer */}
        <RhythmSlider />

        {/* Signals detail */}
        <section className="border-t border-sand-300 bg-sand-50 py-28 lg:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="The assessment"
              title="Four signals, in the words a lender uses."
              lead="Each signal answers one question, and each carries its own confidence level based on the quality and sufficiency of the underlying data."
            />
            <div className="mt-14 border-t border-sand-300">
              {SIGNALS.map((signal, i) => (
                <Reveal key={signal.title} delay={i * 40}>
                  <div className="grid gap-3 border-b border-sand-300 py-9 sm:grid-cols-[240px_1fr] sm:gap-10">
                    <div>
                      <h3 className="font-serif text-2xl font-semibold tracking-tight text-ink">{signal.title}</h3>
                      <p className="mt-1.5 text-sm font-semibold text-teal-600">{signal.question}</p>
                    </div>
                    <p className="max-w-2xl text-[15.5px] leading-relaxed text-ink/70">{signal.line}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Deterministic note */}
        <section className="border-t border-sand-300 bg-sand-50 py-28 lg:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <Reveal>
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  AI extracts. AI does not decide.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="space-y-6 text-[16.5px] leading-relaxed text-ink/70">
                  <p>
                    The scoring engine does not use a machine-learning model to calculate the assessment.
                    It uses versioned code with fixed rules. Given the same extracted transactions and the
                    same policy version, the engine will always produce the same score. No randomness, no
                    hidden state, no model discretion.
                  </p>
                  <p>
                    Every assessment records the policy version that produced it, so results are traceable
                    and comparable over time. And because the first score cannot yet be validated against
                    repayment outcomes, it is presented as supplementary evidence, not a prediction.
                    <Link href="/faq" className="ml-1 font-semibold text-teal-600 underline decoration-teal-300 underline-offset-4 transition-colors hover:text-ink">
                      The honest detail is in the FAQ.
                    </Link>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-sand-300 bg-sand-50 py-28 lg:py-40">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl">
                See it read a real statement.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-ink/65">
                The demo walks the full pipeline with a sample file. No account needed.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://hola.tangison.com/app"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
                >
                  Try the demo
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/security"
                  className="inline-flex items-center justify-center rounded-full border border-sand-400 px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-ui hover:border-ink"
                >
                  Security and consent
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
