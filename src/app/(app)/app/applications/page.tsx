"use client";

import Link from "next/link";
import { useState } from "react";
import {
  demoApplications,
  demoBorrowers,
  applicationStatusConfig,
  type ApplicationStatus,
} from "@/lib/demo-data";

const allStatuses: ApplicationStatus[] = [
  "draft", "consented", "uploaded", "processing", "needs_review", "ready", "reviewed", "archived", "cancelled", "failed",
];

export default function ApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = demoApplications
    .filter((a) => statusFilter === "all" || a.status === statusFilter)
    .filter((a) => {
      if (!searchQuery.trim()) return true;
      const borrower = demoBorrowers.find((b) => b.id === a.borrowerId);
      const name = borrower?.displayName.toLowerCase() ?? "";
      return (
        name.includes(searchQuery.toLowerCase()) ||
        a.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ink">Applications</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
              Demo
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/60">
            View and manage all credit assessment applications. All data shown is synthetic.
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
          placeholder="Search by borrower name or reference..."
          className="w-full pl-10 pr-3 py-2 border border-sand-300 rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui bg-white"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-ui ${
            statusFilter === "all"
              ? "bg-ink text-sand-50"
              : "bg-white border border-sand-300 text-ink/60 hover:text-ink hover:border-sand-400"
          }`}
        >
          All
        </button>
        {allStatuses.map((status) => {
          const count = demoApplications.filter((a) => a.status === status).length;
          if (count === 0) return null;
          const config = applicationStatusConfig[status];
          return (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-ui ${
                statusFilter === status
                  ? "bg-ink text-sand-50"
                  : "bg-white border border-sand-300 text-ink/60 hover:text-ink hover:border-sand-400"
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Applications list */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white border border-sand-300 rounded-2xl">
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">No applications match your search</p>
            <p className="mt-1 text-sm text-ink/50 max-w-sm">Try adjusting the filter or search query.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-sand-300 rounded-2xl overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Reference</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Borrower</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                {filteredApplications.map((app) => {
                  const borrower = demoBorrowers.find((b) => b.id === app.borrowerId);
                  const config = applicationStatusConfig[app.status];
                  return (
                    <tr key={app.id} className="hover:bg-sand-50 transition-colors duration-ui">
                      <td className="px-4 py-3">
                        <Link href={`/app/applications/${app.id}`} className="text-sm font-medium text-teal-500 hover:text-teal-600">
                          {app.reference}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink">{borrower?.displayName ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink/60">{app.productType}</td>
                      <td className="px-4 py-3 text-sm text-ink/60">{app.createdAt}</td>
                      <td className="px-4 py-3 text-sm text-ink/60">{app.assignedTo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-sand-300">
            {filteredApplications.map((app) => {
              const borrower = demoBorrowers.find((b) => b.id === app.borrowerId);
              const config = applicationStatusConfig[app.status];
              return (
                <Link key={app.id} href={`/app/applications/${app.id}`} className="block p-4 hover:bg-sand-50 transition-colors duration-ui">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-teal-500">{app.reference}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink">{borrower?.displayName ?? "—"}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-ink/50">
                    <span>{app.productType}</span>
                    <span>&middot;</span>
                    <span>{app.createdAt}</span>
                    <span>&middot;</span>
                    <span>{app.assignedTo}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
