"use client";

import Link from "next/link";
import { useState } from "react";
import { demoConsents, consentStatusConfig, type ConsentStatus } from "@/lib/demo-data";

type FilterType = "all" | ConsentStatus;

export default function ConsentsPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredConsents = filter === "all" ? demoConsents : demoConsents.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">Consents</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          Track and manage data processing consents for all applicants. Each consent is linked to a specific application and purpose. All data shown is synthetic.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "active", "expired", "withdrawn"] as FilterType[]).map((filterType) => (
          <button
            key={filterType}
            type="button"
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-ui ${
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
      <div className="bg-white border border-sand-300 rounded-2xl overflow-hidden">
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
                <p className="text-xs text-teal-500 mt-1">{consent.applicationReference}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
