import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description: "Resources for Namibian lenders using cash-flow assessment. Guides on statement readiness, responsible credit, and understanding the scoring methodology.",
};

const clusters = [
  {
    title: "Understanding irregular income",
    description:
      "Many Namibians earn consistently without receiving a fixed salary. Freelancers, consultants, contractors, transport operators, traders, and other self-employed professionals may have a real and assessable cash-flow history in their bank statements. This cluster explains what irregular income looks like on a bank statement, how it differs from informal or unstable earnings, and why the distinction matters for underwriting. The goal is to help loan officers and risk managers recognise legitimate income patterns without stereotyping applicants or forcing every case into a salary-only model.",
    links: [
      { href: "/resources/guides", label: "What irregular income looks like on a bank statement" },
    ],
  },
  {
    title: "Statement readiness",
    description:
      "A bank statement that cannot be read or processed benefits no one. Statement readiness covers the practical requirements that make a bank statement usable for cash-flow assessment: supported file types, image quality, completeness, and common extraction issues. This guidance is intended for staff who prepare or collect statements from applicants, so that the assessment can run on the best available data rather than on a file that fails at the extraction stage.",
    links: [
      { href: "/resources/statement-readiness", label: "Statement readiness guide" },
    ],
  },
  {
    title: "Responsible credit review",
    description:
      "Hola Credit is supplementary decision-support software. It does not approve or decline an applicant, it does not replace formal bureau checks, and it does not make the lending decision. Responsible credit review means using the Hola Credit assessment as one input alongside the lender's existing policies, bureau enquiries, and human judgement. This cluster covers human oversight, formal bureau checks, affordability, explainability, and the importance of supplementary assessment alongside existing policies.",
    links: [
      { href: "/resources/responsible-credit", label: "Responsible credit review guide" },
      { href: "/resources/guides", label: "Why Hola Credit does not make the lending decision" },
    ],
  },
  {
    title: "For credit teams",
    description:
      "Credit teams need to understand what the assessment shows, what it does not show, and how to use it alongside the evidence they already collect. This cluster provides practical guidance for loan officers, risk managers, and compliance auditors who are integrating structured cash-flow evidence into their daily workflow. It covers reading the assessment, interpreting confidence levels, handling low-confidence transactions, and recording the final decision separately from the Hola Credit output.",
    links: [
      { href: "/resources/guides", label: "Cash-flow evidence for retail credit teams" },
      { href: "/resources/guides", label: "Extraction confidence: when a human must review" },
    ],
  },
  {
    title: "Product transparency",
    description:
      "Transparency means explaining what the product does, how it works, and what it cannot do. This cluster documents the scoring methodology, the extraction and categorisation process, the confidence and limitations that appear in every assessment, and the versioning that ensures reproducibility. It also covers the consent framework, the data-handling policies, and the retention schedule. The goal is to ensure that every stakeholder, lender, regulator, applicant, or auditor, can understand the product without relying on marketing claims.",
    links: [
      { href: "/how-scoring-works", label: "How scoring works" },
      { href: "/security", label: "Security and data handling" },
      { href: "/consent", label: "Consent framework" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex-1">
        <link rel="preload" as="image" type="image/webp" href="/images/self-employed-studio-owner-1280.webp" />
        {/* Hero */}
        <section className="bg-sand pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-medium text-teal-600 mb-4 tracking-wide uppercase">Resources</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                  Resources for responsible cash-flow review
                </h1>
                <p className="mt-6 text-lg text-ink/70 leading-relaxed">
                  Practical guidance for lenders, retailers, and credit teams reviewing irregular income. These resources explain how to prepare statements, interpret assessments, and use structured cash-flow evidence alongside existing policies and formal bureau checks. They are written for the people doing the work, not for search engines.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source srcSet="/images/self-employed-studio-owner-640.webp 640w, /images/self-employed-studio-owner-960.webp 960w, /images/self-employed-studio-owner-1280.webp 1280w, /images/self-employed-studio-owner-1920.webp 1920w" type="image/webp" />
                  <source srcSet="/images/self-employed-studio-owner-master.png" type="image/png" />
                  <img src="/images/self-employed-studio-owner-1280.webp" alt="Self-employed professional, representing the people these resources help lenders serve" width={1672} height={941} loading="eager" fetchPriority="high" className="rounded-2xl shadow-lg w-full h-auto" />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial clusters */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {clusters.map((cluster, i) => (
                <div key={i} className="grid lg:grid-cols-[120px_1fr] gap-6">
                  <div className="text-5xl font-bold text-sand-300">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-ink tracking-tight mb-4">{cluster.title}</h2>
                    <p className="text-ink/70 leading-relaxed mb-6 max-w-2xl">{cluster.description}</p>
                    <ul className="space-y-2">
                      {cluster.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            href={link.href}
                            className="text-teal-600 hover:text-teal-700 transition-colors duration-ui underline underline-offset-4"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation links */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">Go deeper</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                href="/resources/guides"
                className="block bg-white border border-sand-300 p-6 hover:border-teal-400 transition-colors duration-ui"
              >
                <h3 className="text-lg font-semibold text-ink mb-2">Guides for credit teams</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Practical briefs for loan officers, risk managers, and compliance auditors using structured cash-flow evidence.
                </p>
              </Link>
              <Link
                href="/resources/statement-readiness"
                className="block bg-white border border-sand-300 p-6 hover:border-teal-400 transition-colors duration-ui"
              >
                <h3 className="text-lg font-semibold text-ink mb-2">Statement readiness</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  What makes a bank statement usable for cash-flow assessment, and how to avoid common extraction problems.
                </p>
              </Link>
              <Link
                href="/resources/responsible-credit"
                className="block bg-white border border-sand-300 p-6 hover:border-teal-400 transition-colors duration-ui"
              >
                <h3 className="text-lg font-semibold text-ink mb-2">Responsible credit review</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Why Hola Credit does not make the lending decision, and how to use the assessment alongside existing policies.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sand-100 tracking-tight">Questions about using these resources?</h2>
            <p className="mt-4 text-sand-300 max-w-xl mx-auto leading-relaxed">
              If your organisation needs additional guidance on integrating cash-flow evidence into your credit review process, contact us to discuss your requirements.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-teal-400 text-ink px-6 py-3 text-base font-medium hover:bg-teal-300 transition-colors duration-ui"
              >
                Request pilot access
              </Link>
              <Link
                href="/how-scoring-works"
                className="inline-flex items-center justify-center rounded-md border border-sand-300 text-sand-100 px-6 py-3 text-base font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                How scoring works
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
}
