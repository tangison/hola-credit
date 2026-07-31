interface QueueItem {
  id: string;
  applicationReference: string;
  stage: string;
  queuedAt: string;
  waitTime: string;
}

interface RecentError {
  id: string;
  applicationReference: string;
  errorType: string;
  message: string;
  timestamp: string;
}

const queueItems: QueueItem[] = [
  { id: "qi_001", applicationReference: "LN-2024-00143", stage: "Text extraction", queuedAt: "2024-03-12 10:02", waitTime: "2m" },
  { id: "qi_002", applicationReference: "LN-2024-00144", stage: "Security checks", queuedAt: "2024-03-12 10:05", waitTime: "5m" },
];

const recentErrors: RecentError[] = [
  { id: "re_001", applicationReference: "LN-2024-00139", errorType: "Extraction failed", message: "Unable to parse PDF: corrupted file structure", timestamp: "2024-03-11 14:30" },
  { id: "re_002", applicationReference: "LN-2024-00135", errorType: "Timeout", message: "Processing exceeded 10-minute timeout limit", timestamp: "2024-03-10 09:15" },
];

export default function SystemHealthPage() {
  const queueHealthy = true;
  const lastChecked = "2024-03-12 10:07";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <span>Admin</span>
        </div>
        <h1 className="text-2xl font-bold text-ink">System health</h1>
        <p className="mt-1 text-sm text-ink/60">
          Monitor the processing queue, recent errors, and system metrics. Access is restricted to system administrators.
        </p>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Processing queue</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-2.5 h-2.5 rounded-full ${queueHealthy ? "bg-success" : "bg-alert"}`} />
            <p className="text-lg font-bold text-ink">{queueHealthy ? "Healthy" : "Degraded"}</p>
          </div>
          <p className="mt-1 text-xs text-ink/50">Last checked: {lastChecked}</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Items in queue</p>
          <p className="mt-1 text-3xl font-bold text-ink">{queueItems.length}</p>
          <p className="mt-1 text-xs text-ink/50">Currently processing</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Errors (24h)</p>
          <p className="mt-1 text-3xl font-bold text-ink">{recentErrors.length}</p>
          <p className="mt-1 text-xs text-ink/50">Processing failures</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Avg. processing time</p>
          <p className="mt-1 text-3xl font-bold text-ink">2m 24s</p>
          <p className="mt-1 text-xs text-ink/50">Last 7 days</p>
        </div>
      </div>

      {/* Processing queue */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Processing queue</h2>
        {queueItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-ink/50">No items currently in the processing queue.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Application</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Stage</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Queued</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Wait time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                {queueItems.map((item) => (
                  <tr key={item.id} className="hover:bg-sand-50 transition-colors duration-ui">
                    <td className="px-4 py-3 text-sm font-medium text-teal-500">{item.applicationReference}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        {item.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink/60">{item.queuedAt}</td>
                    <td className="px-4 py-3 text-sm text-ink/60">{item.waitTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent errors */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Recent errors</h2>
        {recentErrors.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-ink/50">No errors in the last 24 hours. All systems are operating normally.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentErrors.map((error) => (
              <div key={error.id} className="flex items-start gap-3 p-3 bg-red-50/50 border border-alert/10 rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-alert mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-ink">{error.errorType}</p>
                    <span className="text-xs text-ink/50 flex-shrink-0 ml-2">{error.timestamp}</span>
                  </div>
                  <p className="text-sm text-ink/60 mt-0.5">{error.message}</p>
                  <p className="text-xs text-teal-500 mt-1">{error.applicationReference}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System metrics */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">System metrics</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-ink/60">CPU utilisation</span>
              <span className="text-sm font-medium text-ink">23%</span>
            </div>
            <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: "23%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-ink/60">Memory utilisation</span>
              <span className="text-sm font-medium text-ink">41%</span>
            </div>
            <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-400 rounded-full" style={{ width: "41%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-ink/60">Storage utilisation</span>
              <span className="text-sm font-medium text-ink">12%</span>
            </div>
            <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-400 rounded-full" style={{ width: "12%" }} />
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-ink/50">
          Metrics are updated every 60 seconds. Data retention is 30 days for system health monitoring.
        </p>
      </div>
    </div>
  );
}
