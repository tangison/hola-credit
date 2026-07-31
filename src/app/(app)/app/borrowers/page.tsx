import Link from "next/link";

interface Borrower {
  id: string;
  displayName: string;
  localReference: string;
  caseCount: number;
}

const borrowers: Borrower[] = [];

export default function BorrowersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink">Borrowers</h1>
        <p className="mt-1 text-sm text-ink/60">
          View and manage borrower records within your organisation. Borrowers are created when you submit a new application.
        </p>
      </div>

      {/* Borrowers list */}
      {borrowers.length === 0 ? (
        <div className="bg-white border border-sand-300 rounded-lg">
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">No borrowers yet</p>
            <p className="mt-1 text-sm text-ink/50 max-w-sm">
              Borrowers are automatically added when you create a new application. Each borrower record is scoped to your organisation.
            </p>
            <Link
              href="/app/applications/new"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-500 rounded-md text-sm font-medium hover:bg-teal-100 transition-colors duration-ui"
            >
              Create first application
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Display name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Local reference</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Cases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                {borrowers.map((borrower) => (
                  <tr key={borrower.id} className="hover:bg-sand-50 transition-colors duration-ui">
                    <td className="px-4 py-3">
                      <Link href={`/app/borrowers/${borrower.id}`} className="text-sm font-medium text-teal-500 hover:text-teal-600">
                        {borrower.displayName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink/60">{borrower.localReference}</td>
                    <td className="px-4 py-3 text-sm text-ink/60">{borrower.caseCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-sand-300">
            {borrowers.map((borrower) => (
              <Link key={borrower.id} href={`/app/borrowers/${borrower.id}`} className="block p-4 hover:bg-sand-50 transition-colors duration-ui">
                <p className="text-sm font-medium text-teal-500">{borrower.displayName}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-ink/50">
                  <span>{borrower.localReference}</span>
                  <span>&middot;</span>
                  <span>{borrower.caseCount} case{borrower.caseCount !== 1 ? "s" : ""}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
