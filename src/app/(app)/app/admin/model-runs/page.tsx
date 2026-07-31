"use client";

import Link from "next/link";

interface ModelRun {
  id: string;
  applicationReference: string;
  modelVersion: string;
  status: "completed" | "failed" | "running";
  confidence: number;
  duration: string;
  timestamp: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-teal-50 text-teal-500" },
  failed: { label: "Failed", className: "bg-red-50 text-alert" },
  running: { label: "Running", className: "bg-amber-50 text-warning" },
};

const modelRuns: ModelRun[] = [
  { id: "mr_001", applicationReference: "LN-2024-00142", modelVersion: "v2.4.1", status: "completed", confidence: 0.88, duration: "2m 14s", timestamp: "2024-03-12 09:25" },
  { id: "mr_002", applicationReference: "LN-2024-00144", modelVersion: "v2.4.1", status: "completed", confidence: 0.76, duration: "3m 01s", timestamp: "2024-03-12 08:44" },
  { id: "mr_003", applicationReference: "LN-2024-00138", modelVersion: "v2.4.1", status: "completed", confidence: 0.72, duration: "2m 48s", timestamp: "2024-03-11 16:12" },
  { id: "mr_004", applicationReference: "LN-2024-00135", modelVersion: "v2.4.0", status: "failed", confidence: 0, duration: "0m 34s", timestamp: "2024-03-11 14:30" },
  { id: "mr_005", applicationReference: "LN-2024-00141", modelVersion: "v2.4.0", status: "completed", confidence: 0.81, duration: "1m 52s", timestamp: "2024-03-11 11:08" },
  { id: "mr_006", applicationReference: "LN-2024-00140", modelVersion: "v2.4.1", status: "running", confidence: 0, duration: "—", timestamp: "2024-03-12 10:05" },
];

export default function ModelRunsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <span>Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">Model runs</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          View extraction and assessment model runs. Access is restricted to system administrators and Hola reviewers.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Total runs</p>
          <p className="mt-1 text-3xl font-bold text-ink">6</p>
          <p className="mt-1 text-xs text-ink/50">Last 7 days</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Success rate</p>
          <p className="mt-1 text-3xl font-bold text-teal-500">67%</p>
          <p className="mt-1 text-xs text-ink/50">4 of 6 completed</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Avg. confidence</p>
          <p className="mt-1 text-3xl font-bold text-ink">79%</p>
          <p className="mt-1 text-xs text-ink/50">Across completed runs</p>
        </div>
        <div className="bg-white border border-sand-300 rounded-lg p-5">
          <p className="text-sm font-medium text-ink/60">Avg. duration</p>
          <p className="mt-1 text-3xl font-bold text-ink">2m 24s</p>
          <p className="mt-1 text-xs text-ink/50">Processing time</p>
        </div>
      </div>

      {/* Model runs list */}
      <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-300">
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Application</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Model version</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Confidence</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Duration</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300">
              {modelRuns.map((run) => {
                const config = statusConfig[run.status];
                return (
                  <tr key={run.id} className="hover:bg-sand-50 transition-colors duration-ui">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-teal-500">{run.applicationReference}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-ink/60">{run.modelVersion}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {run.status === "completed" ? (
                        <span className={`text-sm font-medium ${
                          run.confidence >= 0.75 ? "text-teal-500" : run.confidence >= 0.6 ? "text-warning" : "text-alert"
                        }`}>
                          {Math.round(run.confidence * 100)}%
                        </span>
                      ) : (
                        <span className="text-sm text-ink/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-ink/60">{run.duration}</td>
                    <td className="px-4 py-3 text-sm text-ink/60">{run.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-sand-300">
          {modelRuns.map((run) => {
            const config = statusConfig[run.status];
            return (
              <div key={run.id} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-teal-500">{run.applicationReference}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                    {config.label}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-ink/50">
                  <span>Model {run.modelVersion}</span>
                  <span>&middot;</span>
                  <span>{run.duration}</span>
                  {run.status === "completed" && (
                    <>
                      <span>&middot;</span>
                      <span className={run.confidence >= 0.75 ? "text-teal-500" : run.confidence >= 0.6 ? "text-warning" : "text-alert"}>
                        {Math.round(run.confidence * 100)}% confidence
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-ink/40 mt-1">{run.timestamp}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
