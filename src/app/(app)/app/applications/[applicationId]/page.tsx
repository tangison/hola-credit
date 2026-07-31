"use client";

import Link from "next/link";
import { useState } from "react";

type ApplicationStatus = "draft" | "submitted" | "processing" | "needs_review" | "ready" | "completed" | "withdrawn";

interface ApplicationData {
  id: string;
  reference: string;
  borrower: string;
  status: ApplicationStatus;
  productType: string;
  requestedAmount: string;
  assessmentPurpose: string;
  consentStatus: "active" | "expired" | "withdrawn";
  createdAt: string;
  assignedTo: string;
}

// Demo data — in production this would be fetched from the API
const demoApplication: ApplicationData = {
  id: "app_demo_001",
  reference: "LN-2024-00142",
  borrower: "Maria K.",
  status: "ready",
  productType: "Personal loan",
  requestedAmount: "NAD 15,000",
  assessmentPurpose: "New credit application",
  consentStatus: "active",
  createdAt: "2024-03-12",
  assignedTo: "Loan Officer",
};

const statusConfig: Record<ApplicationStatus, { label: string; className: string; dotClassName: string }> = {
  draft: { label: "Draft", className: "bg-sand-100 text-ink/60", dotClassName: "bg-ink/40" },
  submitted: { label: "Submitted", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  processing: { label: "Processing", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400 animate-pulse" },
  needs_review: { label: "Needs review", className: "bg-amber-50 text-warning", dotClassName: "bg-warning" },
  ready: { label: "Ready", className: "bg-emerald-50 text-success", dotClassName: "bg-success" },
  completed: { label: "Completed", className: "bg-sand-100 text-ink/60", dotClassName: "bg-ink/40" },
  withdrawn: { label: "Withdrawn", className: "bg-sand-100 text-ink/40", dotClassName: "bg-ink/30" },
};

const consentStatusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-50 text-success" },
  expired: { label: "Expired", className: "bg-sand-100 text-ink/50" },
  withdrawn: { label: "Withdrawn", className: "bg-red-50 text-alert" },
};

interface PipelineStage {
  label: string;
  status: "pending" | "active" | "complete";
}

interface LowConfidenceItem {
  field: string;
  extractedValue: string;
  confidence: number;
  suggestion: string;
}

export default function ApplicationDetailPage() {
  const application = demoApplication;
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewDecision, setReviewDecision] = useState<string>("");

  const statusInfo = statusConfig[application.status];
  const consentInfo = consentStatusConfig[application.consentStatus];

  // Processing pipeline stages (for processing status)
  const processingStages: PipelineStage[] = [
    { label: "Received", status: "complete" },
    { label: "Security checks", status: "complete" },
    { label: "Text extraction", status: "active" },
    { label: "Transaction review", status: "pending" },
    { label: "Assessment calculation", status: "pending" },
    { label: "Ready", status: "pending" },
  ];

  // Low-confidence items (for needs_review status)
  const lowConfidenceItems: LowConfidenceItem[] = [
    { field: "Employer name", extractedValue: "Sunshine Traders", confidence: 0.62, suggestion: "Verify employer name against supporting documents" },
    { field: "Monthly salary deposit", extractedValue: "NAD 8,200", confidence: 0.58, suggestion: "Confirm salary deposit pattern with borrower" },
    { field: "Loan repayment", extractedValue: "NAD 1,450/month", confidence: 0.71, suggestion: "Cross-reference with existing loan records" },
  ];

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
        <div className="flex items-center gap-2">
          {application.status === "ready" && (
            <Link
              href="/app/applications/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
            >
              Download report
            </Link>
          )}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - primary content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status-specific content */}
          {application.status === "ready" && (
            <div className="space-y-6">
              {/* Assessment summary */}
              <section className="bg-white border border-sand-300 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-ink mb-4">Assessment summary</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-sand-50 rounded-md">
                    <p className="text-3xl font-bold text-ink">B+</p>
                    <p className="mt-1 text-xs text-ink/50">Cash-flow tier</p>
                  </div>
                  <div className="text-center p-4 bg-sand-50 rounded-md">
                    <p className="text-3xl font-bold text-ink">72</p>
                    <p className="mt-1 text-xs text-ink/50">Assessment score</p>
                  </div>
                  <div className="text-center p-4 bg-sand-50 rounded-md">
                    <p className="text-3xl font-bold text-ink">NAD 8,200</p>
                    <p className="mt-1 text-xs text-ink/50">Income floor</p>
                  </div>
                  <div className="text-center p-4 bg-sand-50 rounded-md">
                    <p className="text-3xl font-bold text-ink">3</p>
                    <p className="mt-1 text-xs text-ink/50">Months evidence</p>
                  </div>
                </div>
              </section>

              {/* Evidence and flags */}
              <section className="bg-white border border-sand-300 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-ink mb-4">Evidence and flags</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 border border-success/20 rounded-md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success mt-0.5 flex-shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-ink">Consistent deposit pattern</p>
                      <p className="text-xs text-ink/60 mt-0.5">Regular monthly deposits identified with a standard deviation of 12%.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-warning/20 rounded-md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning mt-0.5 flex-shrink-0">
                      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-ink">Irregular deposit pattern detected</p>
                      <p className="text-xs text-ink/60 mt-0.5">Three deposits in January exceed the average monthly income by more than 40%.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-warning/20 rounded-md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning mt-0.5 flex-shrink-0">
                      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-ink">Short statement history</p>
                      <p className="text-xs text-ink/60 mt-0.5">Only 3 months of statements were provided. A minimum of 6 months is recommended.</p>
                    </div>
                  </div>
                </div>

                {/* Limitations */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-ink mb-3">Limitations</h3>
                  <ul className="space-y-2 text-sm text-ink/60">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-ink/30 mt-2 flex-shrink-0" />
                      Assessment is based on cash-flow patterns only and does not incorporate credit bureau data.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-ink/30 mt-2 flex-shrink-0" />
                      Income volatility is moderate; the income floor may not reflect sustained earning capacity.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-ink/30 mt-2 flex-shrink-0" />
                      No employer verification was performed as part of this assessment.
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          )}

          {application.status === "processing" && (
            <section className="bg-white border border-sand-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Processing pipeline</h2>
              <p className="text-sm text-ink/60 mb-6">
                The application is being processed. Each stage must complete before the next begins.
              </p>
              <div className="space-y-0">
                {processingStages.map((stage, index) => (
                  <div key={stage.label} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.status === "complete" ? "bg-success text-white" :
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
                      {index < processingStages.length - 1 && (
                        <div className={`w-0.5 h-8 ${stage.status === "complete" ? "bg-success" : "bg-sand-300"}`} />
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

          {application.status === "needs_review" && (
            <section className="bg-white border border-sand-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-ink mb-2">Low-confidence items</h2>
              <p className="text-sm text-ink/60 mb-6">
                The following extracted data points have low confidence scores. Review and correct as needed.
              </p>
              <div className="space-y-3">
                {lowConfidenceItems.map((item) => (
                  <div key={item.field} className="border border-sand-300 rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-ink">{item.field}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.confidence < 0.65 ? "bg-red-50 text-alert" : "bg-amber-50 text-warning"
                      }`}>
                        {Math.round(item.confidence * 100)}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-ink/60">Extracted: <span className="text-ink font-medium">{item.extractedValue}</span></p>
                    <p className="text-xs text-ink/50 mt-1">{item.suggestion}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Review section */}
          <section className="bg-white border border-sand-300 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-ink mb-4">Review and decision</h2>
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
                  {["Approve", "Approve with conditions", "Decline", "Request more information"].map((option) => (
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
        </div>

        {/* Right column - sidebar info */}
        <div className="space-y-6">
          {/* Borrower info */}
          <section className="bg-white border border-sand-300 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-ink mb-3">Borrower</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-ink/50">Display name</p>
                <p className="text-sm font-medium text-ink">{application.borrower}</p>
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
                  {consentInfo.label}
                </span>
              </div>
              <div>
                <p className="text-xs text-ink/50">Captured</p>
                <p className="text-sm text-ink">{application.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Expires</p>
                <p className="text-sm text-ink">2024-06-10</p>
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
        </div>
      </div>
    </div>
  );
}
