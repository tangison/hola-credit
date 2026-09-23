import { Reveal } from "@/components/landing/reveal";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}

/**
 * Shared minimal header for subpages. Clear headroom for the fixed nav,
 * one serif statement, one paragraph, one hairline. Nothing else.
 */
export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="border-b border-sand-300 bg-sand-50 pb-12 pt-32 lg:pb-16 lg:pt-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-teal-600">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ink/65 lg:text-lg">{lead}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
