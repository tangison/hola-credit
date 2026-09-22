import type { Metadata } from "next";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Hola Credit. Email hola@tangison.com or call +264 83 411 522 for pilot access, methodology questions, or a walkthrough of the assessment for your lending team.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "hola@tangison.com",
    href: "mailto:hola@tangison.com",
    note: "For pilot access, methodology questions and security discussions.",
  },
  {
    icon: Phone,
    label: "Main line",
    value: "+264 83 411 522",
    href: "tel:+26483411522",
    note: "Tangison Technologies, Windhoek. Office hours, Namibia time.",
  },
  {
    icon: MapPin,
    label: "Where we build",
    value: "Windhoek, Namibia",
    href: undefined,
    note: "A product of Tangison Technologies, designed for the Namibian market first.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="Contact"
          title="Say hola. We answer in full."
          lead="Questions about methodology, data handling, retention, limits or pilot access. Reach us directly, and a person who works on the product will reply."
        />

        <section className="border-b border-sand-300 bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {CHANNELS.map((channel, i) => (
                <Reveal key={channel.label} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-sand-300 p-8">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                      <channel.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">{channel.label}</p>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="mt-2 font-serif text-2xl font-semibold tracking-tight text-ink underline decoration-sand-400 decoration-2 underline-offset-8 transition-colors hover:text-teal-600 hover:decoration-teal-400"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-2 font-serif text-2xl font-semibold tracking-tight text-ink">{channel.value}</p>
                    )}
                    <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">{channel.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-sand-50 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl">
                The fastest route is the waitlist.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-ink/65">
                Tell us about your lending desk and we will set up pilot access for your team,
                including full visibility into the evidence, confidence and policy versions behind
                each assessment.
              </p>
              <a
                href="https://hola.tangison.com/waitlist"
                className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
              >
                Join the waitlist
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
