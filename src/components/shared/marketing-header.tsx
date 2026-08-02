"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Logo } from "@/components/shared/logo";
import gsap from "gsap";

/* ─── Navigation Data ─── */

interface MegaMenuItem {
  href: string;
  label: string;
  description: string;
}

interface MegaMenuCategory {
  trigger: string;
  items: MegaMenuItem[];
  featuredImage: string;
  featuredTitle: string;
  featuredDescription: string;
}

const megaMenuCategories: MegaMenuCategory[] = [
  {
    trigger: "Product",
    items: [
      { href: "/product", label: "Overview", description: "Cash-flow underwriting for Namibian lenders" },
      { href: "/how-scoring-works", label: "How Scoring Works", description: "From statement to reviewable evidence" },
      { href: "/security", label: "Security", description: "Data protection, consent, and retention" },
    ],
    featuredImage: "/images/cash-flow-to-clear-signal-640.webp",
    featuredTitle: "See the income a payslip misses",
    featuredDescription: "Structure cash-flow evidence from bank statements to support informed lending decisions.",
  },
  {
    trigger: "Solutions",
    items: [
      { href: "/for-microlenders", label: "For Microlenders", description: "Underwriting for irregular-income applicants" },
      { href: "/for-retailers", label: "For Retailers", description: "Credit assessment at the point of sale" },
    ],
    featuredImage: "/images/cash-flow-to-clear-signal-640.webp",
    featuredTitle: "Built for Namibian lending",
    featuredDescription: "Supporting microlenders and retailers with real cash-flow insight from bank statements.",
  },
  {
    trigger: "Resources",
    items: [
      { href: "/resources", label: "Resource Hub", description: "Guides, documentation, and support" },
      { href: "/resources/guides", label: "Guides", description: "Step-by-step instructions for loan officers" },
      { href: "/resources/statement-readiness", label: "Statement Readiness", description: "Preparing bank statements for assessment" },
      { href: "/resources/responsible-credit", label: "Responsible Credit", description: "Ethical lending principles and practices" },
    ],
    featuredImage: "/images/cash-flow-to-clear-signal-640.webp",
    featuredTitle: "Learn and improve",
    featuredDescription: "Practical resources for loan officers and credit teams making better decisions.",
  },
];

const topLevelLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ─── Mobile nav: grouped by category, minimal ─── */

const mobileGroups = [
  {
    label: "Product",
    items: [
      { href: "/product", label: "Overview" },
      { href: "/how-scoring-works", label: "Scoring" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { href: "/for-microlenders", label: "Microlenders" },
      { href: "/for-retailers", label: "Retailers" },
    ],
  },
  {
    label: "Resources",
    items: [
      { href: "/resources", label: "Hub" },
      { href: "/resources/guides", label: "Guides" },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/* ─── Component ─── */

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* Scroll-aware hide/show */
  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > 80 && y > lastY) {
        setHidden(true);
        setActiveMenu(null);
        setMenuVisible(false);
      } else {
        setHidden(false);
      }
      setLastY(y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  /* Close mobile menu on resize */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* GSAP: animate mega-menu open/close */
  useEffect(() => {
    if (!menuRef.current || !menuContentRef.current) return;

    if (activeMenu && menuVisible) {
      const tl = gsap.timeline();
      tl.fromTo(
        menuRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
      tl.fromTo(
        menuContentRef.current.querySelectorAll(".mega-item"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
        0.1
      );
      tl.fromTo(
        menuContentRef.current.querySelectorAll(".mega-featured"),
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        0.15
      );
    } else if (!activeMenu && !menuVisible) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [activeMenu, menuVisible]);

  /* Hover handlers with delay for accidental hover */
  const handleMouseEnter = useCallback((category: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(category);
    setMenuVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setMenuVisible(false);
    }, 150);
  }, []);

  const currentCategory = megaMenuCategories.find((c) => c.trigger === activeMenu);

  return (
    <header
      ref={headerRef}
      suppressHydrationWarning
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-ui ease-entrance ${
        mounted && hidden ? "-translate-y-full" : "translate-y-0"
      } ${mounted && scrolled ? "bg-sand/95 backdrop-blur-md border-b border-sand-300/60 shadow-sm" : "bg-transparent"}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16" aria-label="Primary navigation">
        {/* Logo */}
        <Logo variant="horizontal" />

        {/* Desktop: Mega-menu triggers + top-level links */}
        <div className="hidden lg:flex items-center gap-1">
          {megaMenuCategories.map((cat) => (
            <div
              key={cat.trigger}
              onMouseEnter={() => handleMouseEnter(cat.trigger)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button
                type="button"
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors duration-ui ${
                  activeMenu === cat.trigger
                    ? "text-ink bg-sand-200/60"
                    : "text-ink/70 hover:text-ink hover:bg-sand-200/40"
                }`}
                aria-expanded={activeMenu === cat.trigger}
                aria-haspopup="true"
              >
                {cat.trigger}
                <svg
                  className={`inline-block w-3.5 h-3.5 ml-1 transition-transform duration-ui ${activeMenu === cat.trigger ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          ))}

          {topLevelLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-ink/70 hover:text-ink rounded-full hover:bg-sand-200/40 transition-colors duration-ui"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop: CTA buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/app"
            className="px-4 py-2 text-sm font-medium text-ink/70 hover:text-ink rounded-full hover:bg-sand-200/40 transition-colors duration-ui"
          >
            Try the demo
          </Link>
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center rounded-full bg-ink text-sand-50 px-5 py-2 text-sm font-medium hover:bg-ink-50 transition-colors duration-ui shadow-sm"
          >
            Join waitlist
          </Link>
        </div>

        {/* Mobile: Hamburger button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2 text-ink rounded-full hover:bg-sand-200/40 transition-colors duration-ui"
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

      {/* Desktop: Mega-menu dropdown */}
      {currentCategory && (
        <div
          ref={menuRef}
          className={`hidden lg:block absolute inset-x-0 top-full z-40 ${menuVisible ? "pointer-events-auto" : "pointer-events-none"}`}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white border-b border-sand-300 shadow-lg shadow-ink/5">
            <div ref={menuContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Links column */}
                <div className="lg:col-span-3 space-y-1">
                  {currentCategory.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveMenu(null);
                        setMenuVisible(false);
                      }}
                      className="mega-item flex items-start gap-4 p-3 rounded-xl hover:bg-sand-100 transition-colors duration-ui group"
                    >
                      <span className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-full bg-teal-50 text-teal-400 flex-shrink-0 group-hover:bg-teal-100 transition-colors duration-ui">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div>
                        <span className="block text-sm font-semibold text-ink group-hover:text-teal-500 transition-colors duration-ui">
                          {item.label}
                        </span>
                        <span className="block text-sm text-ink/50 mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Featured image column */}
                <div className="mega-featured lg:col-span-2">
                  <div className="relative rounded-2xl overflow-hidden bg-sand-100 h-full min-h-[200px]">
                    <img
                      src={currentCategory.featuredImage}
                      alt={currentCategory.featuredTitle}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-semibold text-sm leading-snug">
                        {currentCategory.featuredTitle}
                      </h3>
                      <p className="text-sand-200 text-xs mt-1 leading-relaxed">
                        {currentCategory.featuredDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile: Dark premium off-canvas menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

/* ─── Mobile Menu Component ─── */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* GSAP: slide-in animation with choreographed sequence */
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    /* Kill any running timeline */
    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (open) {
      document.body.style.overflow = "hidden";

      /* Make panel visible immediately (positioned off-screen by transform) */
      gsap.set(panelRef.current, { visibility: "visible" });

      const tl = gsap.timeline();
      tlRef.current = tl;

      /* 1. Backdrop fades in */
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        0
      );

      /* 2. Panel slides in from right */
      tl.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
        0
      );

      /* 3. Logo and close button fade in */
      if (panelRef.current.querySelector(".mobile-header")) {
        tl.fromTo(
          panelRef.current.querySelectorAll(".mobile-header"),
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          0.15
        );
      }

      /* 4. Nav groups stagger in from right */
      if (navItemsRef.current) {
        tl.fromTo(
          navItemsRef.current.querySelectorAll(".mob-group"),
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
          0.2
        );
      }

      /* 5. CTA buttons slide up */
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.querySelectorAll(".mob-cta"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" },
          0.5
        );
      }
    } else {
      document.body.style.overflow = "";

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(panelRef.current, {
        x: "100%",
        duration: 0.28,
        ease: "power3.in",
      });
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
      }, 0);

      /* Hide panel after animation completes */
      tl.set(panelRef.current, { visibility: "hidden" });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={overlayRef}
      className="lg:hidden fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
      style={{ opacity: 0, pointerEvents: open ? "auto" : "none" }}
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-sand-950 flex flex-col"
        style={{ visibility: "hidden", transform: "translateX(100%)" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel header: logo + close */}
        <div className="mobile-header flex items-center justify-between px-6 py-5 border-b border-sand-100/10">
          <Logo variant="reversed" />
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-sand-300 hover:text-white rounded-full hover:bg-sand-100/10 transition-colors duration-ui"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation: grouped, minimal */}
        <nav ref={navItemsRef} className="flex-1 overflow-y-auto px-6 pt-8 pb-4" aria-label="Mobile navigation">
          {mobileGroups.map((group) => (
            <div key={group.label} className="mob-group mb-6">
              <p className="text-xs font-semibold text-sand-400 uppercase tracking-wider mb-2">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 text-lg font-semibold text-sand-100 hover:text-teal-400 transition-colors duration-ui tracking-tight"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* CTA: two buttons */}
        <div ref={ctaRef} className="px-6 py-6 border-t border-sand-100/10 space-y-2.5">
          <Link
            href="/app"
            onClick={onClose}
            className="mob-cta flex items-center justify-center rounded-full bg-teal-400 text-ink px-5 py-3 text-sm font-semibold hover:bg-teal-300 transition-colors duration-ui"
          >
            Try the demo
          </Link>
          <Link
            href="/waitlist"
            onClick={onClose}
            className="mob-cta flex items-center justify-center rounded-full border border-sand-100/20 text-sand-100 px-5 py-3 text-sm font-medium hover:bg-sand-100/10 transition-colors duration-ui"
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
