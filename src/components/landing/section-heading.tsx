import { Reveal } from "@/components/landing/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({ eyebrow, title, lead, align = "left", dark = false }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className={`text-[12px] font-bold uppercase tracking-[0.22em] ${dark ? "text-teal-300" : "text-teal-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-sand-50" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-[17px] leading-relaxed ${dark ? "text-sand-50/65" : "text-ink/65"}`}>{lead}</p>
      )}
    </Reveal>
  );
}
