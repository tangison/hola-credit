"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { Logo } from "@/components/shared/logo";
import gsap from "gsap";

/**
 * Check if user prefers reduced motion.
 * Used to skip GSAP animations when accessibility settings request it.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* GSAP: mobile drawer slide-in animation (respects prefers-reduced-motion) */
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    const reducedMotion = prefersReducedMotion();

    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      if (reducedMotion) {
        /* Instant show for reduced motion preference */
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(panelRef.current, { visibility: "visible", x: "0%" });
      } else {
        gsap.set(panelRef.current, { visibility: "visible" });

        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
          0
        );
        tl.fromTo(
          panelRef.current,
          { x: "-100%" },
          { x: "0%", duration: 0.4, ease: "power3.out" },
          0
        );

        /* Stagger sidebar items */
        const sidebarItems = panelRef.current.querySelectorAll(".sidebar-item");
        if (sidebarItems.length) {
          tl.fromTo(
            sidebarItems,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.25, stagger: 0.03, ease: "power2.out" },
            0.2
          );
        }
      }
    } else {
      document.body.style.overflow = "";

      if (reducedMotion) {
        /* Instant hide */
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(panelRef.current, { visibility: "hidden", x: "-100%" });
      } else {
        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(panelRef.current, {
          x: "-100%",
          duration: 0.3,
          ease: "power3.in",
        });
        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        }, 0);
        tl.set(panelRef.current, { visibility: "hidden" });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  /* Close on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Focus trapping for mobile menu dialog */
  useEffect(() => {
    if (!mobileMenuOpen || !panelRef.current) return;

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
        /* Shift+Tab: if at first element, wrap to last */
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        /* Tab: if at last element, wrap to first */
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleTabTrap);
    return () => panel.removeEventListener("keydown", handleTabTrap);
  }, [mobileMenuOpen]);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="min-h-screen flex bg-sand">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile menu overlay */}
      <div
        ref={overlayRef}
        className="lg:hidden fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
        style={{ opacity: 0, pointerEvents: mobileMenuOpen ? "auto" : "none" }}
        onClick={closeMenu}
        {...(!mobileMenuOpen ? { inert: true } : {})}
      >
        <div
          ref={panelRef}
          className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl"
          style={{ visibility: "hidden", transform: "translateX(-100%)" }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Application navigation"
        >
          {/* Mobile sidebar - always visible in this panel */}
          <AppSidebar className="flex" />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sand-300/60 px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-ink rounded-full hover:bg-sand-100 transition-colors duration-ui"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Logo variant="compact" />
          <Link
            href="/app/applications/new"
            aria-label="New application"
            className="p-2 text-teal-500 rounded-full hover:bg-teal-50 transition-colors duration-ui"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Link>
        </header>

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
