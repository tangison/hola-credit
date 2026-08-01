"use client";

import { useState } from "react";
import { demoTeamMembers, roleDescriptions, type TeamRole, type MemberStatus } from "@/lib/demo-data";

const statusConfig: Record<MemberStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-teal-50 text-teal-500" },
  invited: { label: "Invited", className: "bg-amber-50 text-warning" },
  suspended: { label: "Suspended", className: "bg-red-50 text-alert" },
};

export default function TeamPage() {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamRole>("loan_officer");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ink">Team</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
              Demo
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/60">
            Manage team members and their roles within your organisation. Role changes are recorded in the audit log.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui whitespace-nowrap"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Invite member
        </button>
      </div>

      {/* Invite form */}
      {showInviteForm && (
        <div className="bg-white border border-sand-300 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">Invite a team member</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="inviteEmail" className="block text-sm font-medium text-ink mb-1.5">
                Email address
              </label>
              <input
                id="inviteEmail"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@organisation.na"
                className="w-full px-3 py-2 border border-sand-300 rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
              />
            </div>
            <div>
              <label htmlFor="inviteRole" className="block text-sm font-medium text-ink mb-1.5">
                Role
              </label>
              <select
                id="inviteRole"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as TeamRole)}
                className="w-full px-3 py-2 border border-sand-300 rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white"
              >
                {Object.entries(roleDescriptions).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <div className="mt-2 space-y-1 text-xs text-ink/50">
                {Object.entries(roleDescriptions).map(([key, { label, description }]) => (
                  <p key={key}><strong className="text-ink/70">{label}:</strong> {description}</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!inviteEmail.trim()}
                className="px-4 py-2 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team list */}
      <div className="bg-white border border-sand-300 rounded-2xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-300">
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">MFA</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/60 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300">
              {demoTeamMembers.map((member) => {
                const statusInfo = statusConfig[member.status];
                const roleLabel = roleDescriptions[member.role]?.label ?? member.role;
                return (
                  <tr key={member.id} className="hover:bg-sand-50 transition-colors duration-ui">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 text-xs font-medium">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink">{member.name}</p>
                          <p className="text-xs text-ink/50">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink">{roleLabel}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${member.mfaEnabled ? "text-teal-500" : "text-ink/40"}`}>
                        {member.mfaEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink/60">{member.joinedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-sand-300">
          {demoTeamMembers.map((member) => {
            const statusInfo = statusConfig[member.status];
            const roleLabel = roleDescriptions[member.role]?.label ?? member.role;
            return (
              <div key={member.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 text-sm font-medium">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-ink truncate">{member.name}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-ink/50 truncate">{member.email}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-ink/50">
                  <span>{roleLabel}</span>
                  <span>MFA: {member.mfaEnabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role descriptions */}
      <div className="bg-white border border-sand-300 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Role descriptions</h2>
        <div className="space-y-4">
          {Object.entries(roleDescriptions).map(([key, { label, description }]) => (
            <div key={key} className="flex items-start gap-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sand-100 text-ink whitespace-nowrap mt-0.5">
                {label}
              </span>
              <p className="text-sm text-ink/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
