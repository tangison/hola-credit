"use client";

import { useState } from "react";

type ConsentStatus = "active" | "expired" | "withdrawn";

interface ConsentRecord {
  id: string;
  applicantName: string;
  purpose: string;
  status: ConsentStatus;
  capturedDate: string;
  expiryDate: string;
  applicationReference: string;
}

const consentStatusConfig: Record<ConsentStatus, { label: string; className: string; dotClassName: string }> = {
  active: { label: "Active", className: "bg-emerald-50 text-success", dotClassName: "bg-success" },
  expired: { label: "Expired", className: "bg-sand-100 text-ink/50", dotClassName: "bg-ink/30" },
  withdrawn: { label: "Withdrawn", className: "bg-red-50 text-alert", dotClassName: "bg-alert" },
};

const consents: ConsentRecord[] = [];

type FilterType = "all" | ConsentStatus;

export default function ConsentsPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredConsents = filter === "all" ? consents : consents.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink">Consents</h1>
        <p className="mt-1 text-sm text-ink/60">
          Track and manage data processing consents for all applicants. Each consent is linked to a specific application and purpose.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "active", "expired", "withdrawn"] as FilterType[]).map((filterType) => (
          <button
            key={filterType}
            type="button"
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-ui ${
              filter === filterType
                ? "bg-ink text-sand-50"
                : "bg-white border border-sand-300 text-ink/60 hover:text-ink hover:border-sand-400"
            }`}
          >
            {filterType === "all" ? "All" : consentStatusConfig[filterType].label}
          </button>
        ))}
      </div>

      {/* Consents list */}
      {filteredConsents.length === 0 ? (
        <div className="bg-white border border-sand-300 rounded-lg">
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">
              {filter === "all" ? "No consents yet" : `No ${filter} consents`}
            </p>
            <p className="mt-1 text-sm text-ink/50 max-w-sm">
              {filter === "all"
                ? "Consents are captured automatically when you create a new application and the applicant confirms data processing terms."
                : "Try adjusting the filter to see other consent records."}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Applicant</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Purpose</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Captured</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Expiry</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                {filteredConsents.map((consent) => {
                  const config = consentStatusConfig[consent.status];
                  return (
                    <tr key={consent.id} className="hover:bg-sand-50 transition-colors duration-ui">
                      <td className="px-4 py-3 text-sm font-medium text-ink">{consent.applicantName}</td>
                      <td className="px-4 py-3 text-sm text-ink/60">{consent.purpose}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink/60">{consent.capturedDate}</td>
                      <td className="px-4 py-3 text-sm text-ink/60">{consent.expiryDate}</td>
                      <td className="px-4 py-3 text-sm text-teal-500">{consent.applicationReference}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-sand-300">
            {filteredConsents.map((consent) => {
              const config = consentStatusConfig[consent.status];
              return (
                <div key={consent.id} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-ink">{consent.applicantName}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-ink/60">{consent.purpose}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-ink/50">
                    <span>Captured: {consent.capturedDate}</span>
                    <span>&middot;</span>
                    <span>Expires: {consent.expiryDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
