"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLogo } from "@/components/shared/auth-logo";

type TeamRole = "admin" | "loan_officer" | "reviewer" | "viewer";

interface InviteEntry {
  email: string;
  role: TeamRole;
}

const roleLabels: Record<TeamRole, string> = {
  admin: "Admin",
  loan_officer: "Loan officer",
  reviewer: "Reviewer",
  viewer: "Viewer",
};

export default function OnboardingTeamPage() {
  const router = useRouter();
  const [invites, setInvites] = useState<InviteEntry[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("loan_officer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addInvite = () => {
    if (!email.trim()) return;
    setInvites((prev) => [...prev, { email: email.trim(), role }]);
    setEmail("");
    setRole("loan_officer");
  };

  const removeInvite = (index: number) => {
    setInvites((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/app");
    }, 800);
  };

  const handleSkip = () => {
    router.push("/app");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <AuthLogo />
        </div>
        <h1 className="text-2xl font-bold text-ink">Invite your team</h1>
        <p className="mt-2 text-sm text-ink/60">
          Add team members to your organisation. You can always invite more people later from the team settings.
        </p>
      </div>

      <div className="bg-white border border-sand-300 rounded-lg p-6 space-y-5">
        {/* Add invite form */}
        <div className="space-y-3">
          <div>
            <label htmlFor="inviteEmail" className="block text-sm font-medium text-ink mb-1.5">
              Email address
            </label>
            <input
              id="inviteEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@organisation.na"
              className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
            />
          </div>
          <div>
            <label htmlFor="inviteRole" className="block text-sm font-medium text-ink mb-1.5">
              Role
            </label>
            <select
              id="inviteRole"
              value={role}
              onChange={(e) => setRole(e.target.value as TeamRole)}
              className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white"
            >
              <option value="loan_officer">Loan officer</option>
              <option value="reviewer">Reviewer</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <button
            type="button"
            onClick={addInvite}
            disabled={!email.trim()}
            className="w-full px-4 py-2 border border-sand-300 text-sm font-medium text-ink hover:bg-sand-50 transition-colors duration-ui rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to invitation list
          </button>
        </div>

        {/* Pending invites */}
        {invites.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-ink">{invites.length} invitation{invites.length !== 1 ? "s" : ""} to send</h3>
            <ul className="divide-y divide-sand-300 border border-sand-300 rounded-md">
              {invites.map((invite, index) => (
                <li key={index} className="flex items-center justify-between px-4 py-2.5">
                  <div>
                    <p className="text-sm text-ink">{invite.email}</p>
                    <p className="text-xs text-ink/50">{roleLabels[invite.role]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeInvite(index)}
                    className="p-1 text-ink/40 hover:text-red-500 transition-colors duration-ui"
                    aria-label={`Remove ${invite.email}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Role descriptions */}
        <div className="pt-2 border-t border-sand-300">
          <h3 className="text-sm font-semibold text-ink mb-2">Role descriptions</h3>
          <div className="space-y-1.5 text-xs text-ink/50">
            <p><strong className="text-ink/70">Admin:</strong> Full access to all features, team management, and settings.</p>
            <p><strong className="text-ink/70">Loan officer:</strong> Create and manage applications, view assessments.</p>
            <p><strong className="text-ink/70">Reviewer:</strong> Review applications, approve or decline assessments.</p>
            <p><strong className="text-ink/70">Viewer:</strong> Read-only access to applications and reports.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={handleContinue}
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40"
          >
            {isSubmitting ? "Setting up..." : invites.length > 0 ? `Send ${invites.length} invitation${invites.length !== 1 ? "s" : ""} and continue` : "Continue to dashboard"}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="w-full px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
