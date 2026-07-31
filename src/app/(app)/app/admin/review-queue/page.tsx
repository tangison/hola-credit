"use client";

import Link from "next/link";
import { demoApplications, demoBorrowers, formatNADShort } from "@/lib/demo-data";

interface ReviewItem {
  id: string;
  applicationReference: string;
  borrower: string;
  field: string;
  extractedValue: string;
  confidence: number;
  submittedAt: string;
}

// Generate review items from applications that need review
const reviewItems: ReviewItem[] = [
  { id: "ri_001", applicationReference: "LN-2024-00138", borrower: "Thomas M.", field: "Employer name", extractedValue: "Sunshine Traders", confidence: 0.58, submittedAt: "2024-03-11" },
  { id: "ri_002", applicationReference: "LN-2024-00138", borrower: "Thomas M.", field: "Monthly salary deposit", extractedValue: "NAD 6,800", confidence: 0.62, submittedAt: "2024-03-11" },
  { id: "ri_003", applicationReference: "LN-2024-00140", borrower: "Anna P.", field: "Loan repayment", extractedValue: "NAD 1,200/month", confidence: 0.55, submittedAt: "2024-03-12" },
  { id: "ri_004", applicationReference: "LN-2024-00144", borrower: "David H.", field: "Account number", extractedValue: "•••• 4521", confidence: 0.48, submittedAt: "2024-03-12" },
  { id: "ri_005", applicationReference: "LN-2024-00144", borrower: "David H.", field: "Cash deposit source", extractedValue: "Unknown source", confidence: 0.45, submittedAt: "2024-03-12" },
];

export default function ReviewQueuePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <span>Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">Review queue</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          Applications with low-confidence extractions that require human review. Access is restricted to Hola reviewers and system administrators.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Pending review</p>
          <p className="mt-1 text-3xl font-bold text-ink">{reviewItems.length}</p>
          <p className="mt-1 text-xs text-ink/50">Low-confidence extractions</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Applications affected</p>
          <p className="mt-1 text-3xl font-bold text-ink">3</p>
          <p className="mt-1 text-xs text-ink/50">Distinct applications</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Avg. confidence</p>
          <p className="mt-1 text-3xl font-bold text-warning">54%</p>
          <p className="mt-1 text-xs text-ink/50">Across all flagged items</p>
        </div>
      </div>

      {/* Review items */}
      <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-300">
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Application</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Borrower</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Field</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Extracted value</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Confidence</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300">
              {reviewItems.map((item) => (
                <tr key={item.id} className="hover:bg-sand-50 transition-colors duration-ui">
                  <td className="px-4 py-3">
                    <Link href={`/app/applications/app_demo_002`} className="text-sm font-medium text-teal-500 hover:text-teal-600">
                      {item.applicationReference}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink">{item.borrower}</td>
                  <td className="px-4 py-3 text-sm text-ink/60">{item.field}</td>
                  <td className="px-4 py-3 text-sm font-mono text-ink">{item.extractedValue}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${
                      item.confidence < 0.6 ? "text-alert" : "text-warning"
                    }`}>
                      {Math.round(item.confidence * 100)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink/60">{item.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-sand-300">
          {reviewItems.map((item) => (
            <Link key={item.id} href={`/app/applications/app_demo_002`} className="block p-4 hover:bg-sand-50 transition-colors duration-ui">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-teal-500">{item.applicationReference}</p>
                <span className={`text-xs font-medium ${item.confidence < 0.6 ? "text-alert" : "text-warning"}`}>
                  {Math.round(item.confidence * 100)}% confidence
                </span>
              </div>
              <p className="text-sm text-ink">{item.borrower}</p>
              <p className="text-xs text-ink/50 mt-1">{item.field}: {item.extractedValue}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
