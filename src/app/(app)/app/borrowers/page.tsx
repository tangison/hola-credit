"use client";

import Link from "next/link";
import { useState } from "react";
import { demoBorrowers, demoApplications, applicationStatusConfig } from "@/lib/demo-data";

export default function BorrowersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBorrowers = demoBorrowers.filter((b) => {
    if (!searchQuery.trim()) return true;
    return (
      b.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.localReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.occupation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ink">Borrowers</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
              Demo
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/60">
            View and manage borrower records within your organisation. All data shown is synthetic.
          </p>
        </div>
        <Link
          href="/app/applications/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui whitespace-nowrap"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New application
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, reference, or occupation..."
          aria-label="Search borrowers by name, reference, or occupation"
          className="w-full pl-10 pr-3 py-2 border border-sand-300 rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui bg-white"
        />
      </div>

      {/* Borrowers list */}
      <div className="bg-white border border-sand-300 rounded-2xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-300">
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Display name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Reference</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Occupation</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Bank</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Cases</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Latest status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300">
              {filteredBorrowers.map((borrower) => {
                const apps = demoApplications.filter((a) => a.borrowerId === borrower.id);
                const latestApp = apps[0];
                const latestStatus = latestApp ? applicationStatusConfig[latestApp.status] : null;
                return (
                  <tr key={borrower.id} className="hover:bg-sand-50 transition-colors duration-ui">
                    <td className="px-4 py-3">
                      <Link href={`/app/borrowers/${borrower.id}`} className="text-sm font-medium text-teal-500 hover:text-teal-600">
                        {borrower.displayName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink/60">{borrower.localReference}</td>
                    <td className="px-4 py-3 text-sm text-ink/60">{borrower.occupation}</td>
                    <td className="px-4 py-3 text-sm text-ink/60">{borrower.bank}</td>
                    <td className="px-4 py-3 text-sm text-ink">{apps.length}</td>
                    <td className="px-4 py-3">
                      {latestStatus ? (
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${latestStatus.className}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${latestStatus.dotClassName}`} />
                          {latestStatus.label}
                        </span>
                      ) : (
                        <span className="text-sm text-ink/40">, </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-sand-300">
          {filteredBorrowers.map((borrower) => {
            const apps = demoApplications.filter((a) => a.borrowerId === borrower.id);
            const latestApp = apps[0];
            const latestStatus = latestApp ? applicationStatusConfig[latestApp.status] : null;
            return (
              <Link key={borrower.id} href={`/app/borrowers/${borrower.id}`} className="block p-4 hover:bg-sand-50 transition-colors duration-ui">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-teal-500">{borrower.displayName}</p>
                  {latestStatus && (
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${latestStatus.className}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${latestStatus.dotClassName}`} />
                      {latestStatus.label}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/60 mt-0.5">{borrower.occupation}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-ink/50">
                  <span>{borrower.localReference}</span>
                  <span>&middot;</span>
                  <span>{apps.length} case{apps.length !== 1 ? "s" : ""}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
