"use client";

import Link from "next/link";
import { useState } from "react";

type ApplicationStatus = "draft" | "submitted" | "processing" | "needs_review" | "ready" | "completed" | "withdrawn";

interface Application {
  id: string;
  reference: string;
  borrower: string;
  status: ApplicationStatus;
  date: string;
  assigned: string;
}

const statusConfig: Record<ApplicationStatus, { label: string; className: string; dotClassName: string }> = {
  draft: { label: "Draft", className: "bg-sand-100 text-ink/60", dotClassName: "bg-ink/40" },
  submitted: { label: "Submitted", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  processing: { label: "Processing", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400 animate-pulse" },
  needs_review: { label: "Needs review", className: "bg-amber-50 text-warning", dotClassName: "bg-warning" },
  ready: { label: "Ready", className: "bg-emerald-50 text-success", dotClassName: "bg-success" },
  completed: { label: "Completed", className: "bg-sand-100 text-ink/60", dotClassName: "bg-ink/40" },
  withdrawn: { label: "Withdrawn", className: "bg-sand-100 text-ink/40", dotClassName: "bg-ink/30" },
};

const allStatuses: ApplicationStatus[] = ["draft", "submitted", "processing", "needs_review", "ready", "completed", "withdrawn"];

export default function ApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const applications: Application[] = [];

  const filteredApplications = statusFilter === "all"
    ? applications
    : applications.filter((a) => a.status === statusFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Applications</h1>
          <p className="mt-1 text-sm text-ink/60">
            View and manage all credit assessment applications for your organisation.
          </p>
        </div>
        <Link
          href="/app/applications/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui whitespace-nowrap"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New application
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-ui ${
            statusFilter === "all"
              ? "bg-ink text-sand-50"
              : "bg-white border border-sand-300 text-ink/60 hover:text-ink hover:border-sand-400"
          }`}
        >
          All
        </button>
        {allStatuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-ui ${
              statusFilter === status
                ? "bg-ink text-sand-50"
                : "bg-white border border-sand-300 text-ink/60 hover:text-ink hover:border-sand-400"
            }`}
          >
            {statusConfig[status].label}
          </button>
        ))}
      </div>

      {/* Applications list */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white border border-sand-300 rounded-lg">
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">
              {statusFilter === "all" ? "No applications yet" : `No ${statusConfig[statusFilter as ApplicationStatus].label.toLowerCase()} applications`}
            </p>
            <p className="mt-1 text-sm text-ink/50 max-w-sm">
              {statusFilter === "all"
                ? "Create your first credit assessment application to get started."
                : "Try adjusting the filter or create a new application."}
            </p>
            {statusFilter === "all" && (
              <Link
                href="/app/applications/new"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-500 rounded-md text-sm font-medium hover:bg-teal-100 transition-colors duration-ui"
              >
                Create first application
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Reference</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Borrower</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                {filteredApplications.map((app) => {
                  const config = statusConfig[app.status];
                  return (
                    <tr key={app.id} className="hover:bg-sand-50 transition-colors duration-ui">
                      <td className="px-4 py-3">
                        <Link href={`/app/applications/${app.id}`} className="text-sm font-medium text-teal-500 hover:text-teal-600">
                          {app.reference}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink">{app.borrower}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink/60">{app.date}</td>
                      <td className="px-4 py-3 text-sm text-ink/60">{app.assigned}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-sand-300">
            {filteredApplications.map((app) => {
              const config = statusConfig[app.status];
              return (
                <Link key={app.id} href={`/app/applications/${app.id}`} className="block p-4 hover:bg-sand-50 transition-colors duration-ui">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-teal-500">{app.reference}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink">{app.borrower}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-ink/50">
                    <span>{app.date}</span>
                    <span>&middot;</span>
                    <span>{app.assigned}</span>
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
