"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

/* ─── Navigation Data ─── */

const navItems = [
  { href: "/app", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { href: "/app/applications", label: "Applications", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/app/borrowers", label: "Borrowers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/app/consents", label: "Consents", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { href: "/app/team", label: "Team", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V21" },
  { href: "/app/audit-log", label: "Audit log", icon: "M7 3h10v18H7zM10 8h4m-4 4h4m-4 4h3" },
];

const settingsItems = [
  { href: "/app/settings/organisation", label: "Organisation", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { href: "/app/settings/security", label: "Security", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { href: "/app/settings/api", label: "API", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
];

const adminItems = [
  { href: "/app/admin/review-queue", label: "Review queue", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { href: "/app/admin/model-runs", label: "Model runs", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { href: "/app/admin/system-health", label: "System health", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
];

/* ─── Collapsible Section ─── */

function CollapsibleSection({
  label,
  icon,
  items,
  pathname,
  defaultOpen,
}: {
  label: string;
  icon: string;
  items: { href: string; label: string; icon: string }[];
  pathname: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  /* GSAP: smooth expand/collapse */
  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [open]);

  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink/50 hover:bg-sand-100 hover:text-ink/70 transition-colors duration-ui w-full group"
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
        <span className="flex-1 text-left">{label}</span>
        <svg
          className={`w-4 h-4 text-ink/30 transition-transform duration-ui ${open ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={defaultOpen ? undefined : { height: 0, opacity: 0 }}>
        <div className="ml-4 mt-0.5 mb-1 space-y-0.5">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-ui ${
                  isActive
                    ? "bg-teal-50 text-teal-500"
                    : "text-ink/40 hover:bg-sand-100 hover:text-ink/70"
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Sidebar Component ─── */

export function AppSidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  /* GSAP: entrance animation */
  useEffect(() => {
    if (!sidebarRef.current) return;
    const items = sidebarRef.current.querySelectorAll(".sidebar-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <aside ref={sidebarRef} className={`flex flex-col w-64 bg-white border-r border-sand-300/60 h-screen sticky top-0 ${className}`}>
      {/* Logo area */}
      <div className="p-5 border-b border-sand-300/60">
        <div className="flex items-center justify-between">
          <Logo variant="horizontal" />
          <span className="px-2.5 py-1 bg-teal-50 rounded-full text-[11px] font-semibold text-teal-500 border border-teal-200/60">
            Demo
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto" aria-label="Application navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-ui ${
                isActive
                  ? "bg-teal-50 text-teal-500 shadow-sm shadow-teal-100"
                  : "text-ink/50 hover:bg-sand-100 hover:text-ink/70"
              }`}
            >
              <svg
                className={`w-5 h-5 flex-shrink-0 transition-colors duration-ui ${isActive ? "text-teal-400" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}

        {/* Collapsible sections */}
        <CollapsibleSection
          label="Settings"
          icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          items={settingsItems}
          pathname={pathname}
          defaultOpen={pathname.startsWith("/app/settings")}
        />

        <CollapsibleSection
          label="Admin"
          icon="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          items={adminItems}
          pathname={pathname}
          defaultOpen={pathname.startsWith("/app/admin")}
        />
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sand-300/60">
        <Link
          href="/waitlist"
          className="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-teal-500 hover:bg-teal-50 transition-colors duration-ui group"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="flex-1">Join waitlist</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink/20 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all duration-ui">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
