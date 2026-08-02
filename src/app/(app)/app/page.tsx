"use client";

import Link from "next/link";
import { demoApplications, demoBorrowers, applicationStatusConfig, demoOrganisation } from "@/lib/demo-data";

export default function DashboardPage() {
  const activeApplications = demoApplications.filter(
    (a) => a.status === "processing" || a.status === "needs_review" || a.status === "consented"
  ).length;
  const pendingReview = demoApplications.filter((a) => a.status === "needs_review").length;
  const completedThisMonth = demoApplications.filter(
    (a) => a.status === "ready" || a.status === "reviewed"
  ).length;
  const recentApplications = demoApplications.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome + Demo badge */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-ink">
              Welcome back, {demoOrganisation.name}
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
              Demo environment
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/60">
            This is a demo environment with synthetic data. No real financial processing occurs.
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

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-sand-300 rounded-2xl p-5">
          <p className="text-sm font-medium text-ink/60">Active applications</p>
          <p className="mt-1 text-3xl font-bold text-ink">{activeApplications}</p>
          <p className="mt-1 text-xs text-ink/50">Applications currently in progress</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-2xl p-5">
          <p className="text-sm font-medium text-ink/60">Pending review</p>
          <p className="mt-1 text-3xl font-bold text-ink">{pendingReview}</p>
          <p className="mt-1 text-xs text-ink/50">Awaiting your assessment</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-2xl p-5">
          <p className="text-sm font-medium text-ink/60">Completed this month</p>
          <p className="mt-1 text-3xl font-bold text-ink">{completedThisMonth}</p>
          <p className="mt-1 text-xs text-ink/50">Assessments finalised</p>
        </div>
      </div>

      {/* Recent applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink">Recent applications</h2>
          <Link
            href="/app/applications"
            className="text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors duration-ui"
          >
            View all
          </Link>
        </div>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                {recentApplications.map((app) => {
                  const borrower = demoBorrowers.find((b) => b.id === app.borrowerId);
                  const statusInfo = applicationStatusConfig[app.status];
                  return (
                    <tr key={app.id} className="hover:bg-sand-50 transition-colors duration-ui">
                      <td className="px-4 py-3">
                        <Link href={`/app/applications/${app.id}`} className="text-sm font-medium text-teal-500 hover:text-teal-600">
                          {app.reference}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink">{borrower?.displayName ?? ", "}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClassName}`} />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink/60">{app.productType}</td>
                      <td className="px-4 py-3 text-sm text-ink/60">{app.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-sand-300">
            {recentApplications.map((app) => {
              const borrower = demoBorrowers.find((b) => b.id === app.borrowerId);
              const statusInfo = applicationStatusConfig[app.status];
              return (
                <Link key={app.id} href={`/app/applications/${app.id}`} className="block p-4 hover:bg-sand-50 transition-colors duration-ui">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-teal-500">{app.reference}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClassName}`} />
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink">{borrower?.displayName}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-ink/50">
                    <span>{app.productType}</span>
                    <span>&middot;</span>
                    <span>{app.createdAt}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/app/applications/new"
            className="flex items-center gap-3 p-4 bg-white border border-sand-300 rounded-2xl hover:border-teal-400 transition-colors duration-ui group"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-ink group-hover:text-teal-500 transition-colors duration-ui">New application</p>
              <p className="text-xs text-ink/50">Start a credit assessment</p>
            </div>
          </Link>
          <Link
            href="/app/borrowers"
            className="flex items-center gap-3 p-4 bg-white border border-sand-300 rounded-2xl hover:border-teal-400 transition-colors duration-ui group"
          >
            <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink/60">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-ink group-hover:text-teal-500 transition-colors duration-ui">Borrowers</p>
              <p className="text-xs text-ink/50">View borrower records</p>
            </div>
          </Link>
          <Link
            href="/app/consents"
            className="flex items-center gap-3 p-4 bg-white border border-sand-300 rounded-2xl hover:border-teal-400 transition-colors duration-ui group"
          >
            <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink/60">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-ink group-hover:text-teal-500 transition-colors duration-ui">Consents</p>
              <p className="text-xs text-ink/50">Manage data consents</p>
            </div>
          </Link>
          <Link
            href="/waitlist"
            className="flex items-center gap-3 p-4 bg-white border border-sand-300 rounded-2xl hover:border-teal-400 transition-colors duration-ui group"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-ink group-hover:text-teal-500 transition-colors duration-ui">Join waitlist</p>
              <p className="text-xs text-ink/50">Get full access when ready</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Inline waitlist CTA */}
      <div className="bg-white border border-sand-300 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-ink">Join the waitlist for full access</h2>
            <p className="mt-1 text-sm text-ink/60 max-w-lg">
              The demo lets you explore the assessment flow with synthetic data. When you&apos;re ready for real organisation setup, team management, and production data, join the waitlist and we&apos;ll get you set up.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-50 text-teal-500 rounded-full text-sm font-medium hover:bg-teal-100 transition-colors duration-ui border border-teal-200"
            >
              Join the waitlist
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
