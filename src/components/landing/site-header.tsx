"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV = [
  { label: "Product", href: "/product" },
  { label: "Microlenders", href: "/for-microlenders" },
  { label: "Retailers", href: "/for-retailers" },
  { label: "Security", href: "/security" },
  { label: "FAQ", href: "/faq" },
];

const DEMO_URL = "https://hola.tangison.com/app";
const WAITLIST_URL = "https://hola.tangison.com/waitlist";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on navigation. Adjusting state during render is the
  // React-recommended pattern for reacting to prop/location changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-sand-300 bg-sand-50/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <nav aria-label="Primary" className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center rounded-lg" aria-label="Hola Credit, home">
            <img
              src="/logos/hola-credit-horizontal.svg"
              alt="Hola Credit"
              width={150}
              height={32}
              className="h-7 w-auto"
            />
          </Link>

          {/* Desktop: plain text links, no dropdowns */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`py-2 text-[13.5px] font-semibold tracking-wide transition-colors duration-ui ${
                    active ? "text-teal-600" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <a
              href={DEMO_URL}
              className="py-2 text-[13.5px] font-semibold text-ink/70 transition-colors duration-ui hover:text-ink"
            >
              Sign in
            </a>
            <a
              href={WAITLIST_URL}
              className="group inline-flex items-center gap-1.5 rounded-none bg-ink px-5 py-2.5 text-[13.5px] font-bold text-sand-50 transition-colors duration-ui hover:bg-ink-50"
            >
              Join the waitlist
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-ui group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand-300 bg-sand-50 text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </nav>
      </div>

      {/* Mobile: one plain list, nothing nested */}
      {open && (
        <div className="border-t border-sand-300 bg-sand-50 lg:hidden">
          <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
            <div className="grid gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-3 font-serif text-2xl font-semibold text-ink hover:bg-sand-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/about" className="rounded-lg px-2 py-3 font-serif text-2xl font-semibold text-ink/60 hover:bg-sand-200">
                About
              </Link>
              <Link href="/contact" className="rounded-lg px-2 py-3 font-serif text-2xl font-semibold text-ink/60 hover:bg-sand-200">
                Contact
              </Link>
            </div>
            <div className="mt-6 grid gap-2.5">
              <a
                href={WAITLIST_URL}
                className="inline-flex items-center justify-center rounded-none bg-ink px-5 py-3 text-sm font-bold text-sand-50"
              >
                Join the waitlist
              </a>
              <a
                href={DEMO_URL}
                className="inline-flex items-center justify-center rounded-none border border-sand-400 px-5 py-3 text-sm font-bold text-ink"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
