import Link from "next/link";

interface BorrowerApplication {
  id: string;
  reference: string;
  status: string;
  date: string;
}

interface ConsentRecord {
  id: string;
  purpose: string;
  status: "active" | "expired" | "withdrawn";
  capturedDate: string;
  expiryDate: string;
}

// Demo borrower data
const borrower = {
  id: "bor_demo_001",
  displayName: "Maria K.",
  localReference: "BRW-00142",
  createdAt: "2024-01-15",
  applications: [] as BorrowerApplication[],
  consents: [] as ConsentRecord[],
};

const statusConfig: Record<string, { label: string; className: string; dotClassName: string }> = {
  draft: { label: "Draft", className: "bg-sand-100 text-ink/60", dotClassName: "bg-ink/40" },
  submitted: { label: "Submitted", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  processing: { label: "Processing", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
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

export default function BorrowerDetailPage() {
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
            <h1 className="text-2xl font-bold text-ink">{borrower.displayName}</h1>
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
            {borrower.applications.length === 0 ? (
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
                {borrower.applications.map((app) => {
                  const config = statusConfig[app.status] || statusConfig.draft;
                  return (
                    <Link key={app.id} href={`/app/applications/${app.id}`} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-sand-50 -mx-2 px-2 rounded transition-colors duration-ui">
                      <div>
                        <p className="text-sm font-medium text-teal-500">{app.reference}</p>
                        <p className="text-xs text-ink/50">{app.date}</p>
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
            {borrower.consents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-ink/50">No consent records for this borrower yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-sand-300">
                {borrower.consents.map((consent) => {
                  const config = consentStatusConfig[consent.status];
                  return (
                    <div key={consent.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-ink">{consent.purpose}</p>
                        <p className="text-xs text-ink/50">Captured {consent.capturedDate} &middot; Expires {consent.expiryDate}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right column - profile */}
        <div>
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
                <p className="text-xs text-ink/50">Record created</p>
                <p className="text-sm text-ink">{borrower.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Total applications</p>
                <p className="text-sm text-ink">{borrower.applications.length}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">Active consents</p>
                <p className="text-sm text-ink">{borrower.consents.filter((c) => c.status === "active").length}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
