"use client";

import Link from "next/link";
import {
  demoBorrowers,
  demoApplications,
  demoConsents,
  applicationStatusConfig,
  consentStatusConfig,
  formatNADShort,
} from "@/lib/demo-data";

export default function BorrowerDetailPage({ params }: { params: Promise<{ borrowerId: string }> }) {
  // For demo, resolve from URL path
  const borrowerId = typeof window !== "undefined"
    ? window.location.pathname.split("/").pop() ?? ""
    : "";

  const borrower = demoBorrowers.find((b) => b.id === borrowerId) ?? demoBorrowers[0];
  const applications = demoApplications.filter((a) => a.borrowerId === borrower.id);
  const consents = demoConsents.filter((c) => c.borrowerId === borrower.id);

  // Calculate assessment summary
  const completedApps = applications.filter((a) => a.assessment);
  const avgScore = completedApps.length > 0
    ? Math.round(completedApps.reduce((sum, a) => sum + (a.assessment?.score ?? 0), 0) / completedApps.length)
    : null;
  const avgIncomeFloor = completedApps.length > 0
    ? Math.round(completedApps.reduce((sum, a) => sum + (a.assessment?.incomeFloorMinor ?? 0), 0) / completedApps.length)
    : null;
  const avgConsistency = completedApps.length > 0
    ? Math.round(completedApps.reduce((sum, a) => sum + (a.assessment?.consistency ?? 0), 0) / completedApps.length * 100)
    : null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-ink/50">
        <Link href="/app/borrowers" className="hover:text-ink transition-colors duration-ui">Borrowers</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        <span className="text-ink">{borrower.displayName}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 text-lg font-bold">
            {borrower.displayName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-ink">{borrower.displayName}</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
                Demo
              </span>
            </div>
            <p className="text-sm text-ink/60">Reference: {borrower.localReference} &middot; Added {borrower.createdAt}</p>
          </div>
        </div>
        <Link
          href="/app/applications/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui whitespace-nowrap"
        >
          New application
        </Link>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Associated applications */}
          <section className="bg-white border border-sand-300 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-ink mb-4">Applications</h2>
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-ink/50">No applications for this borrower yet.</p>
                <Link
                  href="/app/applications/new"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors duration-ui"
                >
                  Create one now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-sand-300">
                {applications.map((app) => {
                  const config = applicationStatusConfig[app.status];
                  return (
                    <Link key={app.id} href={`/app/applications/${app.id}`} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-sand-50 -mx-2 px-2 rounded transition-colors duration-ui">
                      <div>
                        <p className="text-sm font-medium text-teal-500">{app.reference}</p>
                        <p className="text-xs text-ink/50">{app.productType} &middot; {app.createdAt}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                        {config.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Consent history */}
          <section className="bg-white border border-sand-300 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-ink mb-4">Consent history</h2>
            {consents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-ink/50">No consent records for this borrower yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-sand-300">
                {consents.map((consent) => {
                  const config = consentStatusConfig[consent.status];
                  return (
                    <div key={consent.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-ink">{consent.purpose}</p>
                        <p className="text-xs text-ink/50">Captured {consent.capturedDate} &middot; Expires {consent.expiryDate}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right column - profile + assessment summary */}
        <div className="space-y-6">
          <section className="bg-white border border-sand-300 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-ink mb-3">Borrower profile</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-ink/50">Display name</p>
                <p className="text-sm font-medium text-ink">{borrower.displayName}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Local reference</p>
                <p className="text-sm text-ink">{borrower.localReference}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Occupation</p>
                <p className="text-sm text-ink">{borrower.occupation}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Bank</p>
                <p className="text-sm text-ink">{borrower.bank}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Record created</p>
                <p className="text-sm text-ink">{borrower.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Total applications</p>
                <p className="text-sm text-ink">{applications.length}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Active consents</p>
                <p className="text-sm text-ink">{consents.filter((c) => c.status === "active").length}</p>
              </div>
            </div>
          </section>

          {/* Assessment summary */}
          {completedApps.length > 0 && (
            <section className="bg-white border border-sand-300 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-ink mb-3">Assessment summary</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink/50">Average score</p>
                  <p className="text-lg font-bold text-ink">{avgScore}</p>
                </div>
                <div>
                  <p className="text-xs text-ink/50">Average income floor</p>
                  <p className="text-sm font-medium text-ink">{avgIncomeFloor ? formatNADShort(avgIncomeFloor) : ", "}</p>
                </div>
                <div>
                  <p className="text-xs text-ink/50">Average consistency</p>
                  <p className="text-sm font-medium text-ink">{avgConsistency !== null ? `${avgConsistency}%` : ", "}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-ink/50">
                Based on {completedApps.length} completed assessment{completedApps.length !== 1 ? "s" : ""}. This is synthetic demo data.
              </p>
            </section>
          )}

          {/* Demo notice */}
          <div className="p-4 bg-sand-50 border border-sand-300 rounded-lg">
            <p className="text-xs text-ink/50">
              This borrower record uses synthetic demo data. No real personal or financial information is being displayed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
