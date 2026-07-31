"use client";

import { useState } from "react";

type ActionType = "all" | "application.created" | "application.submitted" | "application.reviewed" | "consent.captured" | "consent.withdrawn" | "member.invited" | "member.role_changed" | "settings.updated" | "auth.login" | "auth.logout";

interface AuditEvent {
  id: string;
  action: ActionType;
  actor: string;
  resource: string;
  timestamp: string;
  details: string;
}

const actionLabels: Record<string, string> = {
  application_created: "Application created",
  application_submitted: "Application submitted",
  application_reviewed: "Application reviewed",
  consent_captured: "Consent captured",
  consent_withdrawn: "Consent withdrawn",
  member_invited: "Member invited",
  member_role_changed: "Member role changed",
  settings_updated: "Settings updated",
  auth_login: "Login",
  auth_logout: "Logout",
};

const actionTypeOptions: { value: ActionType; label: string }[] = [
  { value: "all", label: "All actions" },
  { value: "application.created", label: "Application events" },
  { value: "consent.captured", label: "Consent events" },
  { value: "member.invited", label: "Member events" },
  { value: "settings.updated", label: "Settings events" },
  { value: "auth.login", label: "Authentication events" },
];

const auditEvents: AuditEvent[] = [
  { id: "ae_001", action: "auth.login", actor: "Loan Officer", resource: "Session", timestamp: "2024-03-12 09:14", details: "Logged in from 196.216.xx.xx" },
  { id: "ae_002", action: "application.created", actor: "Loan Officer", resource: "LN-2024-00142", timestamp: "2024-03-12 09:22", details: "Created application for Maria K." },
  { id: "ae_003", action: "consent.captured", actor: "Loan Officer", resource: "Consent #C-00142", timestamp: "2024-03-12 09:23", details: "Captured consent for cash-flow assessment" },
  { id: "ae_004", action: "application.submitted", actor: "Loan Officer", resource: "LN-2024-00142", timestamp: "2024-03-12 09:25", details: "Submitted application with 3 bank statements" },
  { id: "ae_005", action: "member.invited", actor: "Admin User", resource: "Member invitation", timestamp: "2024-03-11 14:30", details: "Invited reviewer@demo.na as Reviewer" },
  { id: "ae_006", action: "settings.updated", actor: "Admin User", resource: "Organisation settings", timestamp: "2024-03-10 11:45", details: "Updated compliance profile with new license number" },
  { id: "ae_007", action: "member.role_changed", actor: "Admin User", resource: "Team member", timestamp: "2024-03-10 11:50", details: "Changed reviewer@demo.na from Viewer to Reviewer" },
  { id: "ae_008", action: "auth.logout", actor: "Loan Officer", resource: "Session", timestamp: "2024-03-09 17:30", details: "Logged out" },
];

export default function AuditLogPage() {
  const [actionFilter, setActionFilter] = useState<ActionType>("all");

  const filteredEvents = actionFilter === "all"
    ? auditEvents
    : auditEvents.filter((e) => e.action.startsWith(actionFilter.split(".")[0]));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink">Audit log</h1>
        <p className="mt-1 text-sm text-ink/60">
          A chronological record of all significant actions within your organisation. This log is immutable and cannot be edited.
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
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-sand-300 rounded-lg">
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                <path d="M7 3h10v18H7zM10 8h4m-4 4h4m-4 4h3" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">No audit events found</p>
            <p className="mt-1 text-sm text-ink/50 max-w-sm">
              Events will appear here as your team uses the platform.
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
      )}
    </div>
  );
}
