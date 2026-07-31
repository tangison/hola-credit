"use client";

import Link from "next/link";
import { useState } from "react";
import {
  demoApplications,
  demoBorrowers,
  applicationStatusConfig,
  consentStatusConfig,
  formatNADShort,
  type DemoApplication,
  type DemoAssessment,
} from "@/lib/demo-data";

function AssessmentView({ assessment, transactions }: { assessment: DemoAssessment; transactions: DemoApplication["transactions"] }) {
  const tierLabel = assessment.tier
    ? assessment.tier.charAt(0).toUpperCase() + assessment.tier.slice(1)
    : "—";

  return (
    <div className="space-y-6">
      {/* Assessment summary */}
      <section className="bg-white border border-sand-300 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-ink">Assessment summary</h2>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo data
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-sand-50 rounded-md">
            <p className="text-2xl font-bold text-ink">{tierLabel}</p>
            <p className="mt-1 text-xs text-ink/50">Cash-flow tier</p>
          </div>
          <div className="text-center p-4 bg-sand-50 rounded-md">
            <p className="text-2xl font-bold text-ink">{assessment.score ?? "—"}</p>
            <p className="mt-1 text-xs text-ink/50">Assessment score</p>
          </div>
          <div className="text-center p-4 bg-sand-50 rounded-md">
            <p className="text-2xl font-bold text-ink">{formatNADShort(assessment.incomeFloorMinor)}</p>
            <p className="mt-1 text-xs text-ink/50">Income floor / month</p>
          </div>
          <div className="text-center p-4 bg-sand-50 rounded-md">
            <p className="text-2xl font-bold text-ink">
              {assessment.statementPeriod.from.slice(5)} – {assessment.statementPeriod.to.slice(5)}
            </p>
            <p className="mt-1 text-xs text-ink/50">Statement period</p>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Key metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-sand-50 rounded-md">
            <div>
              <p className="text-sm text-ink/60">Consistency</p>
              <p className="text-lg font-bold text-ink">{Math.round(assessment.consistency * 100)}%</p>
            </div>
            <div className="w-24 h-2 bg-sand-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${assessment.consistency > 0.7 ? "bg-teal-400" : assessment.consistency > 0.4 ? "bg-warning" : "bg-alert"}`}
                style={{ width: `${assessment.consistency * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-sand-50 rounded-md">
            <div>
              <p className="text-sm text-ink/60">Volatility</p>
              <p className="text-lg font-bold text-ink">{Math.round(assessment.volatility * 100)}%</p>
            </div>
            <div className="w-24 h-2 bg-sand-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${assessment.volatility < 0.3 ? "bg-teal-400" : assessment.volatility < 0.6 ? "bg-warning" : "bg-alert"}`}
                style={{ width: `${assessment.volatility * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-sand-50 rounded-md">
            <div>
              <p className="text-sm text-ink/60">Trend</p>
              <p className="text-lg font-bold text-ink capitalize">{assessment.trend}</p>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
              assessment.trend === "improving" ? "bg-teal-50 text-teal-500" :
              assessment.trend === "stable" ? "bg-sand-100 text-ink/60" :
              assessment.trend === "declining" ? "bg-red-50 text-alert" :
              "bg-amber-50 text-warning"
            }`}>
              {assessment.trend}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-sand-50 rounded-md">
            <div>
              <p className="text-sm text-ink/60">Data quality</p>
              <p className="text-lg font-bold text-ink capitalize">{assessment.dataQuality.replace("_", " ")}</p>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
              assessment.dataQuality === "sufficient" ? "bg-teal-50 text-teal-500" :
              assessment.dataQuality === "limited" ? "bg-amber-50 text-warning" :
              "bg-red-50 text-alert"
            }`}>
              {assessment.dataQuality.replace("_", " ")}
            </span>
          </div>
        </div>
        <p className="mt-4 text-xs text-ink/50">
          Extraction confidence: {Math.round(assessment.extractionConfidence * 100)}% &middot; Model version: {assessment.extractionModelVersion} &middot; Policy version: {assessment.scoringPolicyVersion}
        </p>
      </section>

      {/* Evidence and flags */}
      <section className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Evidence and flags</h2>
        <div className="space-y-3">
          {assessment.flags.map((flag, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-md border ${
                flag.severity === "material"
                  ? "bg-red-50/50 border-alert/20"
                  : flag.severity === "review"
                  ? "bg-amber-50/50 border-warning/20"
                  : "bg-teal-50/50 border-teal-200"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`mt-0.5 flex-shrink-0 ${
                  flag.severity === "material"
                    ? "text-alert"
                    : flag.severity === "review"
                    ? "text-warning"
                    : "text-teal-500"
                }`}
              >
                {flag.severity === "information" ? (
                  <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                ) : (
                  <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                )}
              </svg>
              <div>
                <p className="text-sm font-medium text-ink capitalize">{flag.code.replace(/_/g, " ")}</p>
                <p className="text-xs text-ink/60 mt-0.5">{flag.description}</p>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium mt-1 ${
                  flag.severity === "material"
                    ? "bg-red-100 text-alert"
                    : flag.severity === "review"
                    ? "bg-amber-100 text-warning"
                    : "bg-teal-100 text-teal-500"
                }`}>
                  {flag.severity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Limitations */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-ink mb-3">Limitations</h3>
          <ul className="space-y-2 text-sm text-ink/60">
            {assessment.limitations.map((limitation, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-ink/30 mt-2 flex-shrink-0" />
                {limitation}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cash flow breakdown */}
      <section className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Cash flow breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-300">
                <th className="text-left px-3 py-2 text-xs font-semibold text-ink/60 uppercase tracking-wider">Date</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-ink/60 uppercase tracking-wider">Description</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-ink/60 uppercase tracking-wider">Amount</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-ink/60 uppercase tracking-wider">Category</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-ink/60 uppercase tracking-wider">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-sand-50 transition-colors duration-ui">
                  <td className="px-3 py-2 text-sm text-ink/60 whitespace-nowrap">{tx.postedDate}</td>
                  <td className="px-3 py-2 text-sm text-ink">{tx.description}</td>
                  <td className={`px-3 py-2 text-sm text-right font-mono whitespace-nowrap ${tx.direction === "credit" ? "text-teal-500" : "text-ink"}`}>
                    {tx.direction === "credit" ? "+" : "−"}{formatNADShort(tx.amountMinor)}
                  </td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sand-100 text-ink/60">
                      {tx.category.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-sm text-right">
                    <span className={`font-medium ${tx.confidence >= 0.8 ? "text-teal-500" : tx.confidence >= 0.6 ? "text-warning" : "text-alert"}`}>
                      {Math.round(tx.confidence * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default function ApplicationDetailPage({ params }: { params: Promise<{ applicationId: string }> }) {
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewDecision, setReviewDecision] = useState<string>("");

  // We use a simple approach since params is async in Next.js 16
  // For demo purposes, we resolve the application from the static data
  const applicationId = typeof window !== "undefined"
    ? window.location.pathname.split("/").pop() ?? ""
    : "";

  const application = demoApplications.find((a) => a.id === applicationId) ?? demoApplications[0];
  const borrower = demoBorrowers.find((b) => b.id === application.borrowerId);
  const statusInfo = applicationStatusConfig[application.status];
  const consentInfo = consentStatusConfig[application.consentStatus];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-ink/50">
        <Link href="/app/applications" className="hover:text-ink transition-colors duration-ui">Applications</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        <span className="text-ink">{application.reference}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-ink">{application.reference}</h1>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClassName}`} />
              {statusInfo.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/60">
            {application.productType} &middot; {application.assessmentPurpose} &middot; Created {application.createdAt}
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - primary content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status-specific content */}
          {application.status === "ready" && application.assessment && (
            <AssessmentView assessment={application.assessment} transactions={application.transactions} />
          )}

          {application.status === "needs_review" && application.assessment && (
            <AssessmentView assessment={application.assessment} transactions={application.transactions} />
          )}

          {application.status === "reviewed" && application.assessment && (
            <AssessmentView assessment={application.assessment} transactions={application.transactions} />
          )}

          {application.status === "processing" && (
            <section className="bg-white border border-sand-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Processing pipeline</h2>
              <p className="text-sm text-ink/60 mb-6">
                The application is being processed. Each stage must complete before the next begins.
              </p>
              <div className="space-y-0">
                {[
                  { label: "Received", status: "complete" as const },
                  { label: "Security checks", status: "complete" as const },
                  { label: "Text extraction", status: "active" as const },
                  { label: "Transaction review", status: "pending" as const },
                  { label: "Assessment calculation", status: "pending" as const },
                  { label: "Ready", status: "pending" as const },
                ].map((stage, index, arr) => (
                  <div key={stage.label} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.status === "complete" ? "bg-teal-400 text-white" :
                        stage.status === "active" ? "bg-ink text-sand-50" :
                        "bg-sand-300 text-ink/40"
                      }`}>
                        {stage.status === "complete" ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                        ) : stage.status === "active" ? (
                          <div className="w-3 h-3 rounded-full bg-sand-50 animate-pulse" />
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      {index < arr.length - 1 && (
                        <div className={`w-0.5 h-8 ${stage.status === "complete" ? "bg-teal-400" : "bg-sand-300"}`} />
                      )}
                    </div>
                    <div className="pt-1 pb-6">
                      <p className={`text-sm font-medium ${stage.status === "pending" ? "text-ink/40" : "text-ink"}`}>
                        {stage.label}
                      </p>
                      {stage.status === "active" && (
                        <p className="text-xs text-teal-500 mt-0.5">In progress&hellip;</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(application.status === "draft" || application.status === "consented") && (
            <section className="bg-white border border-sand-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-ink mb-2">Application in progress</h2>
              <p className="text-sm text-ink/60 mb-4">
                This application has not yet been submitted for processing. Complete the remaining steps to proceed.
              </p>
              <Link
                href="/app/applications/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                Continue application
              </Link>
            </section>
          )}

          {application.status === "failed" && (
            <section className="bg-white border border-sand-300 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-alert mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold text-ink">Processing failed</h2>
                  <p className="text-sm text-ink/60 mt-1">
                    The statement extraction could not be completed. This may be due to a corrupted file or unsupported format.
                  </p>
                  <p className="text-sm text-ink/60 mt-2">
                    Please create a new application with a valid bank statement file.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Review section */}
          {(application.status === "ready" || application.status === "needs_review") && (
            <section className="bg-white border border-sand-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Review and decision</h2>
              <p className="text-sm text-ink/60 mb-4">
                This assessment is supplementary to formal bureau checks and human judgement. It does not constitute a lending decision.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="reviewNotes" className="block text-sm font-medium text-ink mb-1.5">
                    Review notes
                  </label>
                  <textarea
                    id="reviewNotes"
                    rows={4}
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add your observations, conditions, or rationale for the decision..."
                    className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui resize-y"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Decision</label>
                  <div className="flex flex-wrap gap-2">
                    {["Approve with conditions", "Decline", "Request more information", "Escalate"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setReviewDecision(option)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-ui ${
                          reviewDecision === option
                            ? "bg-ink text-sand-50"
                            : "bg-sand-100 text-ink/60 hover:bg-sand-200 hover:text-ink"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!reviewDecision}
                    className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit review
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right column - sidebar info */}
        <div className="space-y-6">
          {/* Borrower info */}
          <section className="bg-white border border-sand-300 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-ink mb-3">Borrower</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-ink/50">Display name</p>
                <p className="text-sm font-medium text-ink">
                  <Link href={`/app/borrowers/${application.borrowerId}`} className="text-teal-500 hover:text-teal-600">
                    {borrower?.displayName ?? "—"}
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Occupation</p>
                <p className="text-sm text-ink">{borrower?.occupation ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Bank</p>
                <p className="text-sm text-ink">{borrower?.bank ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Product type</p>
                <p className="text-sm text-ink">{application.productType}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Requested amount</p>
                <p className="text-sm text-ink">{application.requestedAmount}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Assessment purpose</p>
                <p className="text-sm text-ink">{application.assessmentPurpose}</p>
              </div>
            </div>
          </section>

          {/* Consent status */}
          <section className="bg-white border border-sand-300 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-ink mb-3">Consent</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink/50">Status</p>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${consentInfo.className}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${consentInfo.dotClassName}`} />
                  {consentInfo.label}
                </span>
              </div>
              <div>
                <p className="text-xs text-ink/50">Captured</p>
                <p className="text-sm text-ink">{application.consentCapturedAt}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Expires</p>
                <p className="text-sm text-ink">{application.consentExpiresAt}</p>
              </div>
            </div>
          </section>

          {/* Assignment */}
          <section className="bg-white border border-sand-300 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-ink mb-3">Assignment</h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 text-sm font-medium">
                {application.assignedTo.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{application.assignedTo}</p>
                <p className="text-xs text-ink/50">Assigned reviewer</p>
              </div>
            </div>
          </section>

          {/* Demo notice */}
          <div className="p-4 bg-sand-50 border border-sand-300 rounded-lg">
            <p className="text-xs text-ink/50">
              This application uses synthetic demo data. No real financial information is being processed. Assessment results are illustrative only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
