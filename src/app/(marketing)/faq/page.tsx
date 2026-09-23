import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock3, FileCheck2, LineChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Honest answers about Hola Credit: how scoring works, which Namibian banks are supported, how borrower data is protected, and what the first score can and cannot prove.",
  alternates: { canonical: "/faq" },
};

const HONESTY = [
  {
    id: "measure",
    title: "What we can measure at launch",
    content:
      "Extraction quality can be measured against labelled statements, and assessments can be compared with experienced human review. If the system extracts the same transactions a skilled loan officer would identify, and the assessment reflects the same cash-flow pattern, the system is working as designed. That is the bar we hold ourselves to today.",
  },
  {
    id: "cannot-prove",
    title: "What we cannot prove yet",
    content:
      "Predictive accuracy against repayment outcomes can only be tested after real pilot loans have seasoned. That takes six to twelve months before results are statistically meaningful. Hola Credit does not claim predictive accuracy before that data exists, and any tool that does is selling certainty it has not earned.",
  },
  {
    id: "why-explicit",
    title: "Why we state this explicitly",
    content:
      "The cold-start reality applies to any new credit assessment tool that has not yet been validated against actual repayment outcomes. Hola states it plainly rather than implying predictive validity from extraction quality alone. Treat the assessment as supplementary evidence, not a validated predictor of repayment, until real loans have seasoned.",
  },
];

const LEDGER_TODAY = [
  { icon: FileCheck2, label: "Extraction quality", detail: "Checked against labelled statements and human review." },
  { icon: LineChart, label: "Assessment consistency", detail: "Same statement in, same cash-flow picture out." },
];

const LEDGER_LATER = [
  { icon: Clock3, label: "Predictive accuracy", detail: "Only testable once real pilot loans season, six to twelve months in." },
];

const FAQ_GROUPS = [
  {
    heading: "The basics",
    items: [
      {
        title: "Who is Hola Credit for?",
        content:
          "Hola Credit is designed for authorised Namibian microlenders and retail credit teams who assess applicants whose income patterns do not fit a salary-only model. If you lend to self-employed, freelance, or irregular-income applicants, Hola Credit can help structure the cash-flow evidence from their bank statements.",
      },
      {
        title: "Is Hola Credit a credit bureau?",
        content:
          "No. Hola Credit does not maintain a database of borrower credit histories, does not share information between lenders, and does not report to formal credit bureaus. It processes a single borrower-authorised statement for a single lender. Cross-lender shared borrower profiles are not part of the current product.",
      },
      {
        title: "Does Hola Credit approve or decline applicants?",
        content:
          "No. Hola Credit supplies evidence, confidence levels, and limitations. The lender adds their own notes, applies their own policies, and makes the final decision. That decision is recorded separately from the Hola Credit assessment, so the audit trail is always clear about who decided what and on what basis.",
      },
    ],
  },
  {
    heading: "How it works",
    items: [
      {
        title: "What does the assessment measure?",
        content:
          "The assessment evaluates cash-flow evidence across seven components: income floor, consistency, volatility, trend, concentration, red flags, and data sufficiency. Each component captures a different dimension of the applicant's financial pattern, and each carries its own confidence level based on the quality and sufficiency of the underlying data.",
      },
      {
        title: "How long does an assessment take?",
        content:
          "The upload-to-assessment pipeline targets completion within sixty seconds at the defined percentile. This is a processing-time target, not a claim about decision quality or approval outcomes. Cases with low-confidence data are routed to a human review queue rather than rushed through.",
      },
      {
        title: "What banks are supported?",
        content:
          "The initial launch supports statements from FNB Namibia, Bank Windhoek, Standard Bank Namibia, and Nedbank Namibia. Format validation and extraction accuracy are measured separately for each bank.",
      },
      {
        title: "What file formats are accepted?",
        content:
          "PDF, PNG, and JPEG. PDF is always preferred because it preserves the original layout and text encoding, which makes extraction more reliable. Image-based uploads go through OCR as a fallback, which is less reliable than direct PDF text extraction.",
      },
    ],
  },
  {
    heading: "Scoring",
    items: [
      {
        title: "Is the scoring deterministic?",
        content:
          "Yes. The scoring engine uses versioned code with fixed rules. Given the same extracted transactions and the same policy version, the engine will always produce the same score. There is no randomness, no hidden state, and no model discretion in the scoring step. AI is used in the extraction and categorisation phase, but the scoring engine is a separate, deterministic process.",
      },
      {
        title: "What is the income floor?",
        content:
          "The income floor is the minimum reliable monthly income the statement can support. It is derived from consistent credit transactions, discounted for concentration risk and volatility. It is not a prediction of future earnings. It is a conservative measure of what the statement evidence can demonstrate. When data is insufficient, the income floor may be null rather than a potentially misleading number.",
      },
      {
        title: "Can the first score predict repayment outcomes?",
        content:
          "No. Predictive accuracy against repayment outcomes can only be tested after real pilot loans have seasoned. This process takes six to twelve months before the results are statistically meaningful. Hola Credit does not claim predictive accuracy before that data exists. The assessment should be treated as supplementary evidence, not as a validated predictor of repayment.",
      },
    ],
  },
];

export default function FaqPage() {
  // FAQPage structured data, validated against the visible accordion content above
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...HONESTY.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: { "@type": "Answer", text: item.content },
      })),
      ...FAQ_GROUPS.flatMap((group) =>
        group.items.map((item) => ({
          "@type": "Question",
          name: item.title,
          acceptedAnswer: { "@type": "Answer", text: item.content },
        })),
      ),
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="FAQ"
          title="Honest from the first hello."
          lead="Any new credit tool owes you the truth about what it can prove. Here is ours, in plain language, followed by the questions lenders actually ask."
        />

        {/* Proof ledger */}
        <section className="border-b border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-5 lg:gap-10">
              <Reveal className="lg:col-span-2">
                <div className="relative h-full overflow-hidden rounded-none bg-ink p-7 text-sand-50 sm:p-8">
                  <p className="font-serif text-lg italic leading-snug text-sand-50/90">
                    We show our work, and we mark what is still pending.
                  </p>
                  <div className="mt-7 space-y-3">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-teal-300">Measured today</p>
                    {LEDGER_TODAY.map(({ icon: Icon, label, detail }) => (
                      <div key={label} className="flex items-start gap-3 rounded-none border border-sand-50/10 p-4">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-teal-300">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-sand-50">{label}</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-sand-50/60">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-3">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-sand-50/60">
                      Proven later, with real loans
                    </p>
                    {LEDGER_LATER.map(({ icon: Icon, label, detail }) => (
                      <div key={label} className="flex items-start gap-3 rounded-none border border-dashed border-sand-50/15 p-4">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-50/[0.06] text-sand-50/50">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-sand-50/80">{label}</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-sand-50/60">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex items-center gap-2.5 border-t border-sand-50/10 pt-5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                    <p className="text-[12.5px] leading-snug text-sand-50/55">
                      Evidence for a decision, never the decision itself.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-3">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="measure"
                  className="h-full rounded-none border border-sand-300 bg-sand-50 px-6 sm:px-8"
                >
                  {HONESTY.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-sand-300">
                      <AccordionTrigger className="py-6 text-left text-[16.5px] font-bold tracking-tight text-ink hover:no-underline hover:text-teal-600">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-7 text-[15px] leading-relaxed text-ink/70">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Full FAQ */}
        <section className="bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading eyebrow="Common questions" title="The questions lenders actually ask." />
            <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
              {FAQ_GROUPS.map((group) => (
                <div key={group.heading}>
                  <Reveal>
                    <h3 className="border-b border-sand-300 pb-4 font-serif text-xl font-semibold tracking-tight text-ink">
                      {group.heading}
                    </h3>
                  </Reveal>
                  <div className="mt-2 divide-y divide-sand-300">
                    {group.items.map((item, i) => (
                      <Reveal key={item.title} delay={i * 40}>
                        <details className="group py-5">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-bold tracking-tight text-ink marker:content-none hover:text-teal-600">
                            {item.title}
                            <span
                              aria-hidden="true"
                              className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sand-400 text-ink/60 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                            >
                              <span className="absolute h-[9px] w-[1.5px] rounded bg-current" />
                              <span className="absolute h-[1.5px] w-[9px] rounded bg-current" />
                            </span>
                          </summary>
                          <p className="mt-3.5 max-w-xl text-[14.5px] leading-relaxed text-ink/70">{item.content}</p>
                        </details>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-sand-300 bg-sand-50 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="mx-auto max-w-xl font-serif text-3xl font-semibold leading-tight tracking-tight text-balance text-ink sm:text-4xl">
                Still weighing a question we did not answer?
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ink/65">
                Ask it directly. We answer questions about methodology, data handling and limits in full.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 py-1.5 text-sm font-bold text-teal-600 transition-colors hover:text-ink"
              >
                Talk to us
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
