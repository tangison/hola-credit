"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/shared/logo";

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
    featuredImage: "/images/independent-transport-professional-640.webp",
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
      { href: "/faq", label: "FAQ", description: "Frequently asked questions" },
    ],
    featuredImage: "/images/freelance-professional-studio-640.webp",
    featuredTitle: "Learn and improve",
    featuredDescription: "Practical resources for loan officers and credit teams making better decisions.",
  },
];

const topLevelLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ─── All site pages for search ─── */

const searchablePages = [
  { href: "/product", label: "Product", keywords: "product overview how it works cash flow underwriting" },
  { href: "/how-scoring-works", label: "How Scoring Works", keywords: "scoring income floor consistency volatility deterministic" },
  { href: "/security", label: "Security", keywords: "security data protection consent retention encryption privacy" },
  { href: "/for-microlenders", label: "For Microlenders", keywords: "microlenders underwriting irregular income loan officers" },
  { href: "/for-retailers", label: "For Retailers", keywords: "retailers credit assessment point of sale store" },
  { href: "/resources", label: "Resources", keywords: "resources guides documentation support hub" },
  { href: "/resources/guides", label: "Guides", keywords: "guides instructions loan officers step by step" },
  { href: "/resources/statement-readiness", label: "Statement Readiness", keywords: "statement readiness bank pdf upload format" },
  { href: "/resources/responsible-credit", label: "Responsible Credit", keywords: "responsible credit ethical lending human oversight" },
  { href: "/faq", label: "FAQ", keywords: "faq questions answers frequently asked" },
  { href: "/about", label: "About", keywords: "about tangison namibia team" },
  { href: "/contact", label: "Contact", keywords: "contact email pilot access request" },
  { href: "/waitlist", label: "Join Waitlist", keywords: "waitlist join signup register" },
  { href: "/app", label: "Try the Demo", keywords: "demo try app dashboard" },
];

/* ─── Mobile nav: grouped by category ─── */

const mobileGroups = [
  {
    label: "Product",
    items: [
      { href: "/product", label: "Overview" },
      { href: "/how-scoring-works", label: "How Scoring Works" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { href: "/for-microlenders", label: "For Microlenders" },
      { href: "/for-retailers", label: "For Retailers" },
    ],
  },
  {
    label: "Resources",
    items: [
      { href: "/resources", label: "Resource Hub" },
      { href: "/resources/guides", label: "Guides" },
      { href: "/resources/statement-readiness", label: "Statement Readiness" },
      { href: "/resources/responsible-credit", label: "Responsible Credit" },
      { href: "/faq", label: "FAQ" },
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mountedRef = useRef(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* Hydration-safe mounted flag */
  useEffect(() => {
    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard hydration guard pattern
    setMounted(true);
  }, []);

  /* Scroll-aware hide/show */
  useEffect(() => {
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

  /* Focus search input when opened */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close search on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) {
          setSearchOpen(false);
          setSearchQuery("");
        }
        if (mobileOpen) {
          setMobileOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, mobileOpen]);

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

  /* Search results */
  const searchResults = searchQuery.trim().length > 1
    ? searchablePages.filter(
        (p) =>
          p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  return (
    <header
      ref={headerRef}
      suppressHydrationWarning
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-ui ease-entrance ${
        mounted && hidden ? "-translate-y-full" : "translate-y-0"
      } ${mounted && scrolled ? "bg-sand/95 backdrop-blur-md border-b border-sand-300/60 shadow-sm" : "bg-transparent"} ${
        mobileOpen ? "bg-transparent! border-b-transparent!" : ""
      }`}
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
                onClick={() => setActiveMenu(activeMenu === cat.trigger ? null : cat.trigger)}
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

        {/* Desktop: Search + CTA buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Search toggle */}
          <button
            type="button"
            onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); }}
            className="p-2 text-ink/60 hover:text-ink rounded-full hover:bg-sand-200/40 transition-colors duration-ui"
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </button>
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

        {/* Mobile: Search + Hamburger */}
        <div className="flex lg:hidden items-center gap-1">
          <button
            type="button"
            onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); }}
            className="p-2 text-ink/60 hover:text-ink rounded-full hover:bg-sand-200/40 transition-colors duration-ui"
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          {/* Two-line hamburger (Collins-style) — morphs to X */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -mr-2 text-ink rounded-full hover:bg-sand-200/40 transition-colors duration-ui relative w-10 h-10 flex items-center justify-center"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span className="relative w-5 h-[14px] flex flex-col justify-between">
              <span
                className={`block w-full h-[1.5px] bg-current origin-center transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mobileOpen ? "rotate-45 translate-y-[6.25px]" : ""
                }`}
              />
              <span
                className={`block w-full h-[1.5px] bg-current origin-center transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mobileOpen ? "-rotate-45 -translate-y-[6.25px]" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Search overlay (desktop + mobile) */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-sand-300 shadow-lg shadow-ink/5 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages..."
                aria-label="Search pages"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors duration-ui"
              />
            </div>
            {searchResults.length > 0 && (
              <div ref={searchResultsRef} className="mt-2 divide-y divide-sand-200">
                {searchResults.map((page) => (
                  <button
                    key={page.href}
                    type="button"
                    onClick={() => handleSearchSelect(page.href)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-sand-100 rounded-lg transition-colors duration-ui"
                  >
                    <svg className="w-4 h-4 text-ink/30 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span className="text-sm font-medium text-ink">{page.label}</span>
                  </button>
                ))}
              </div>
            )}
            {searchQuery.trim().length > 1 && searchResults.length === 0 && (
              <p className="mt-3 text-sm text-ink/50 px-3">No results found.</p>
            )}
          </div>
        </div>
      )}

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

      {/* Mobile: Full-screen overlay menu (Collins-inspired) */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

/* ─── Mobile Menu Component ─── */
/* Collins-inspired full-screen overlay with staggered reveal */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* Search results */
  const searchResults = searchQuery.trim().length > 1
    ? searchablePages.filter(
        (p) =>
          p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (href: string) => {
    setSearchQuery("");
    onClose();
    router.push(href);
  };

  /* Reset search when menu closes via close handler */
  const handleClose = useCallback(() => {
    setSearchQuery("");
    setSearchFocused(false);
    onClose();
  }, [onClose]);

  /* Focus trapping for mobile menu dialog */
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = panel.querySelectorAll<HTMLElement>(focusableSelector);

    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    /* Focus the first focusable element when menu opens */
    firstFocusable.focus();

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleTabTrap);
    return () => panel.removeEventListener("keydown", handleTabTrap);
  }, [open]);

  return (
    <div
      className={`lg:hidden fixed inset-0 z-[60] transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      {...(!open ? { inert: true, "aria-hidden": true } : {})}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-[420ms] ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Full-screen panel */}
      <div
        ref={panelRef}
        className={`absolute inset-0 bg-ink flex flex-col transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel header: logo + close */}
        <div className="flex items-center justify-between px-5 sm:px-8 h-16 flex-shrink-0">
          <Logo variant="reversed" tabIndex={open ? undefined : -1} />
          <button
            type="button"
            onClick={handleClose}
            tabIndex={open ? undefined : -1}
            className="p-2 -mr-2 text-sand-300 hover:text-white rounded-full hover:bg-white/10 transition-colors duration-ui"
            aria-label="Close menu"
          >
            <span className="relative w-5 h-[14px] flex flex-col justify-between">
              <span className="block w-full h-[1.5px] bg-current origin-center rotate-45 translate-y-[6.25px]" />
              <span className="block w-full h-[1.5px] bg-current origin-center -rotate-45 -translate-y-[6.25px]" />
            </span>
          </button>
        </div>

        {/* Search bar */}
        <div className="px-5 sm:px-8 py-3 flex-shrink-0">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-sand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search..."
              aria-label="Search pages"
              tabIndex={open ? undefined : -1}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/8 border border-white/10 rounded-xl text-sand-100 placeholder:text-sand-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-colors duration-ui"
            />
          </div>
          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-white/8 border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
              {searchResults.map((page) => (
                <button
                  key={page.href}
                  type="button"
                  onClick={() => handleSearchSelect(page.href)}
                  tabIndex={open ? undefined : -1}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-white/8 transition-colors duration-ui"
                >
                  <svg className="w-4 h-4 text-sand-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  <span className="text-sm font-medium text-sand-100">{page.label}</span>
                </button>
              ))}
            </div>
          )}
          {searchQuery.trim().length > 1 && searchResults.length === 0 && (
            <p className="mt-2 text-sm text-sand-500 px-3.5">No results found.</p>
          )}
        </div>

        {/* Navigation: scrollable content */}
        <nav className="flex-1 overflow-y-auto px-5 sm:px-8 pt-2 pb-4" aria-label="Mobile navigation">
          {mobileGroups.map((group, groupIndex) => (
            <div
              key={group.label}
              className={`mb-7 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: open ? `${150 + groupIndex * 70}ms` : "0ms" }}
            >
              <p className="text-[11px] font-semibold text-sand-500 uppercase tracking-[0.15em] mb-3">{group.label}</p>
              <div className="space-y-0">
                {group.items.map((item, itemIndex) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleClose}
                    tabIndex={open ? undefined : -1}
                    className={`block py-2 text-[22px] sm:text-2xl font-semibold text-sand-100 hover:text-teal-400 transition-colors duration-ui tracking-tight leading-snug ${
                      open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{
                      transitionProperty: "color, opacity, transform",
                      transitionDuration: "420ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      transitionDelay: open ? `${200 + groupIndex * 70 + itemIndex * 40}ms` : "0ms",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* CTA: two buttons */}
        <div className="flex-shrink-0 px-5 sm:px-8 py-5 border-t border-white/10">
          <div
            className={`flex flex-col sm:flex-row gap-2.5 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            <Link
              href="/app"
              onClick={handleClose}
              tabIndex={open ? undefined : -1}
              className="flex-1 flex items-center justify-center rounded-full bg-teal-400 text-ink px-5 py-3 text-sm font-semibold hover:bg-teal-300 transition-colors duration-ui"
            >
              Try the demo
            </Link>
            <Link
              href="/waitlist"
              onClick={handleClose}
              tabIndex={open ? undefined : -1}
              className="flex-1 flex items-center justify-center rounded-full border border-white/20 text-sand-100 px-5 py-3 text-sm font-medium hover:bg-white/8 transition-colors duration-ui"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
