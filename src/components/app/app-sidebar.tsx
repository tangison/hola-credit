"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/app", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { href: "/app/applications", label: "Applications", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/app/borrowers", label: "Borrowers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/app/consents", label: "Consents", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { href: "/app/team", label: "Team", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" },
  { href: "/app/audit-log", label: "Audit log", icon: "M7 3h10v18H7zM10 8h4m-4 4h4m-4 4h3" },
  { href: "/app/settings/organisation", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-sand-300 h-screen sticky top-0">
      <div className="p-6 border-b border-sand-300">
        <Link href="/" aria-label="Hola Credit home">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 84" role="img" aria-label="Hola Credit" className="h-8 w-auto">
            <g transform="translate(0 10)">
              <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
              <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
            </g>
            <text x="112" y="57" fill="#111512" fontFamily="Manrope, system-ui, sans-serif" fontSize="44" fontWeight="550" letterSpacing="-1.8">hola credit</text>
          </svg>
        </Link>
        <div className="mt-3 px-2 py-1 bg-sand-100 rounded-md text-xs text-ink/60">
          Organisation: Demo Lender
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Application navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-ui ${
                isActive
                  ? "bg-teal-50 text-teal-500"
                  : "text-ink/60 hover:bg-sand-100 hover:text-ink"
              }`}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
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
      </nav>

      <div className="p-4 border-t border-sand-300">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 text-sm font-medium">
            LO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink truncate">Loan Officer</p>
            <p className="text-xs text-ink/50 truncate">officer@demo.na</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
