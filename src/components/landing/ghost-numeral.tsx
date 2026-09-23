"use client";

import { useEffect, useRef } from "react";

interface GhostNumeralProps {
  /** The numeral text, e.g. "01" */
  n: string;
  /** Extra classes for sizing and tint (positioning stays with the parent) */
  className?: string;
}

/**
 * Editorial ghost numeral with a quiet scroll-linked drift (parallax).
 * Transform-only, rAF-throttled, and fully disabled under
 * prefers-reduced-motion, where it renders as a static numeral.
 */
export function GhostNumeral({ n, className }: GhostNumeralProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewport = window.innerHeight / 2;
      // Normalised position of the numeral relative to viewport centre, -1..1
      const rel = Math.max(-1, Math.min(1, (center - viewport) / viewport));
      node.style.transform = `translateY(${(-rel * 26).toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none will-change-transform ${className ?? ""}`}
    >
      {n}
    </span>
  );
}
