"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "@/components/shared/logo";

const mainNav = [
  { href: "/product", label: "Product" },
  { href: "/for-microlenders", label: "For Microlenders" },
  { href: "/for-retailers", label: "For Retailers" },
  { href: "/how-scoring-works", label: "How Scoring Works" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > 80 && y > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastY(y);
    };
    // Check initial scroll position on mount
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-ui ease-entrance ${
        mounted && hidden ? "-translate-y-full" : "translate-y-0"
      } ${mounted && scrolled ? "bg-sand/95 backdrop-blur-sm border-b border-sand-300 shadow-sm" : "bg-transparent"}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16" aria-label="Primary navigation">
        <Logo variant="horizontal" />

        <div className="hidden lg:flex items-center gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/70 hover:text-ink transition-colors duration-ui"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/app"
            className="text-sm font-medium text-ink/70 hover:text-ink transition-colors duration-ui"
          >
            Explore the demo
          </Link>
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center rounded-md bg-ink text-sand-50 px-4 py-2 text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
          >
            Join waitlist
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2 text-ink"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-sand border-t border-sand-300 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-ink/70 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-sand-300 space-y-2">
              <Link
                href="/app"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-ink/70 hover:text-ink"
              >
                Explore the demo
              </Link>
              <Link
                href="/waitlist"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium text-teal-500 hover:text-teal-600"
              >
                Join waitlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
