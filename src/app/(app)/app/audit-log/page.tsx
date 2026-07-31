"use client";

import { useState } from "react";
import { demoAuditEntries } from "@/lib/demo-data";

const actionLabels: Record<string, string> = {
  auth_login: "Login",
  auth_logout: "Logout",
  application_created: "Application created",
  application_submitted: "Application submitted",
  application_reviewed: "Application reviewed",
  consent_captured: "Consent captured",
  consent_withdrawn: "Consent withdrawn",
  member_invited: "Member invited",
  member_role_changed: "Member role changed",
  settings_updated: "Settings updated",
};

type ActionType = "all" | "application" | "consent" | "member" | "settings" | "auth";

const actionTypeOptions: { value: ActionType; label: string }[] = [
  { value: "all", label: "All actions" },
  { value: "application", label: "Application events" },
  { value: "consent", label: "Consent events" },
  { value: "member", label: "Member events" },
  { value: "settings", label: "Settings events" },
  { value: "auth", label: "Authentication events" },
];

function getActionCategory(action: string): string {
  if (action.startsWith("application")) return "application";
  if (action.startsWith("consent")) return "consent";
  if (action.startsWith("member")) return "member";
  if (action.startsWith("settings")) return "settings";
  if (action.startsWith("auth")) return "auth";
  return "other";
}

export default function AuditLogPage() {
  const [actionFilter, setActionFilter] = useState<ActionType>("all");

  const filteredEvents = actionFilter === "all"
    ? demoAuditEntries
    : demoAuditEntries.filter((e) => getActionCategory(e.action) === actionFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">Audit log</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          A chronological record of all significant actions within your organisation. This log is immutable and cannot be edited. All data shown is synthetic.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {actionTypeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setActionFilter(option.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-ui ${
              actionFilter === option.value
                ? "bg-ink text-sand-50"
                : "bg-white border border-sand-300 text-ink/60 hover:text-ink hover:border-sand-400"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Audit events */}
      <div className="bg-white border border-sand-300 rounded-lg overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-300">
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Action</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Actor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Resource</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Details</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-sand-50 transition-colors duration-ui">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sand-100 text-ink">
                      {actionLabels[event.action.replace(".", "_")] || event.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink">{event.actor}</td>
                  <td className="px-4 py-3 text-sm text-ink/60">{event.resource}</td>
                  <td className="px-4 py-3 text-sm text-ink/60 max-w-xs truncate">{event.details}</td>
                  <td className="px-4 py-3 text-sm text-ink/60 whitespace-nowrap">{event.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-sand-300">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sand-100 text-ink">
                  {actionLabels[event.action.replace(".", "_")] || event.action}
                </span>
                <span className="text-xs text-ink/50">{event.timestamp}</span>
              </div>
              <p className="text-sm text-ink">{event.actor}</p>
              <p className="text-xs text-ink/50 mt-0.5">{event.resource} &middot; {event.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
