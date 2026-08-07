"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface AccordionItem {
  title: string;
  content: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="space-y-0 divide-y divide-sand-300">
      {items.map((item, i) => (
        <AccordionRow key={i} title={item.title} content={item.content} id={`accordion-${i}`} />
      ))}
    </div>
  );
}

function AccordionRow({ title, content, id }: { title: string; content: string; id: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;

    if (open) {
      gsap.set(bodyRef.current, { display: "block" });
      const h = bodyRef.current.scrollHeight;
      gsap.fromTo(
        bodyRef.current,
        { height: 0 },
        { height: h, duration: 0.3, ease: "power2.out", onComplete: () => {
          if (bodyRef.current) gsap.set(bodyRef.current, { height: "auto" });
        }}
      );
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (bodyRef.current) gsap.set(bodyRef.current, { display: "none" });
        },
      });
    }
  }, [open]);

  useEffect(() => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, {
      rotate: open ? 180 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [open]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="text-lg font-semibold text-ink group-hover:text-teal-600 transition-colors duration-ui">{title}</span>
        <svg
          ref={iconRef}
          className="w-5 h-5 text-ink/40 flex-shrink-0 ml-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div ref={bodyRef} id={id} className="overflow-hidden" style={{ height: 0, display: "none" }}>
        <p className="text-ink/70 leading-relaxed pb-4 max-w-2xl">{content}</p>
      </div>
    </div>
  );
}
