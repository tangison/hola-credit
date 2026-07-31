import Link from "next/link";

interface ReviewItem {
  id: string;
  applicationReference: string;
  borrower: string;
  field: string;
  extractedValue: string;
  confidence: number;
  submittedAt: string;
}

const reviewItems: ReviewItem[] = [
  { id: "ri_001", applicationReference: "LN-2024-00138", borrower: "Thomas M.", field: "Employer name", extractedValue: "Sunshine Traders", confidence: 0.58, submittedAt: "2024-03-11" },
  { id: "ri_002", applicationReference: "LN-2024-00138", borrower: "Thomas M.", field: "Monthly salary deposit", extractedValue: "NAD 6,800", confidence: 0.62, submittedAt: "2024-03-11" },
  { id: "ri_003", applicationReference: "LN-2024-00140", borrower: "Anna P.", field: "Loan repayment", extractedValue: "NAD 1,200/month", confidence: 0.55, submittedAt: "2024-03-12" },
  { id: "ri_004", applicationReference: "LN-2024-00141", borrower: "Johan V.", field: "Account number", extractedValue: "•••• 4521", confidence: 0.48, submittedAt: "2024-03-12" },
];

export default function ReviewQueuePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <span>Admin</span>
        </div>
        <h1 className="text-2xl font-bold text-ink">Review queue</h1>
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
          <p className="mt-1 text-3xl font-bold text-warning">56%</p>
          <p className="mt-1 text-xs text-ink/50">Across all flagged items</p>
        </div>
      </div>

      {/* Review items */}
      {reviewItems.length === 0 ? (
        <div className="bg-white border border-sand-300 rounded-lg">
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">No items to review</p>
            <p className="mt-1 text-sm text-ink/50 max-w-sm">
              All extractions have passed the confidence threshold. Check back later.
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
                      <Link href={`/app/applications/${item.id}`} className="text-sm font-medium text-teal-500 hover:text-teal-600">
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
              <Link key={item.id} href={`/app/applications/${item.id}`} className="block p-4 hover:bg-sand-50 transition-colors duration-ui">
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
      )}
    </div>
  );
}
