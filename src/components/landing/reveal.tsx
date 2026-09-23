"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in milliseconds before the reveal starts once visible */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  /** "up" fades and rises, "clip" uncovers via clip-path (for imagery) */
  variant?: "up" | "clip";
}

/**
 * Lightweight scroll-reveal wrapper. Adds the `reveal-visible` class once the
 * element enters the viewport. Honours prefers-reduced-motion via globals.css.
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className, id, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      id={id}
      ref={ref}
      className={`${visible ? "reveal-visible" : ""} ${className ?? ""}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {variant === "clip" ? (
        // The clip lives on an inner wrapper: a fully-clipped element has zero
        // visible area, which would stop IntersectionObserver from ever firing.
        <div className={`reveal-clip ${visible ? "reveal-visible" : ""}`} style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}
