"use client";

import { useState } from "react";

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const sessions: Session[] = [
  { id: "s_001", device: "Chrome on macOS", location: "Windhoek, Namibia", lastActive: "2024-03-16 08:30", current: true },
  { id: "s_002", device: "Safari on iPhone", location: "Windhoek, Namibia", lastActive: "2024-03-15 16:30", current: false },
];

export default function SecuritySettingsPage() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [showMfaSetup, setShowMfaSetup] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">Security</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          Manage your account security settings, multi-factor authentication, and active sessions.
        </p>
      </div>

      {/* MFA */}
      <div className="bg-white border border-sand-300 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink">Multi-factor authentication</h2>
            <p className="mt-1 text-sm text-ink/60">
              {mfaEnabled
                ? "MFA is enabled for your account. You will be asked for a verification code when signing in."
                : "Enable MFA to add an extra layer of security to your account."}
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            mfaEnabled ? "bg-teal-50 text-teal-500" : "bg-sand-100 text-ink/50"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${mfaEnabled ? "bg-teal-400" : "bg-ink/30"}`} />
            {mfaEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        {mfaEnabled && (
          <div className="mt-4 pt-4 border-t border-sand-300">
            <p className="text-sm text-ink/60 mb-3">
              Your authenticator app is configured. Disabling MFA will reduce your account security.
            </p>
            <button
              type="button"
              onClick={() => setMfaEnabled(false)}
              className="px-4 py-2 border border-sand-300 text-sm font-medium text-ink/60 hover:text-alert hover:border-alert transition-colors duration-ui rounded-full"
            >
              Disable MFA
            </button>
          </div>
        )}

        {!mfaEnabled && (
          <div className="mt-4 pt-4 border-t border-sand-300">
            <button
              type="button"
              onClick={() => setShowMfaSetup(true)}
              className="px-4 py-2 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
            >
              Enable MFA
            </button>
          </div>
        )}

        {showMfaSetup && !mfaEnabled && (
          <div className="mt-4 p-4 bg-sand-50 border border-sand-300 rounded-xl">
            <h3 className="text-sm font-semibold text-ink mb-2">Set up authenticator</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-ink/60">
              <li>Install an authenticator app on your phone (Google Authenticator, Authy, or similar).</li>
              <li>Scan the QR code that will appear after you confirm.</li>
              <li>Enter the 6-digit verification code from the app to complete setup.</li>
            </ol>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setMfaEnabled(true);
                  setShowMfaSetup(false);
                }}
                className="px-4 py-2 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                Continue setup
              </button>
              <button
                type="button"
                onClick={() => setShowMfaSetup(false)}
                className="px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Session management */}
      <div className="bg-white border border-sand-300 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Active sessions</h2>
        <p className="text-sm text-ink/60 mb-4">
          These are the devices currently signed in to your account. Revoke any session you do not recognise.
        </p>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border border-sand-300 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink/50">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-ink">{session.device}</p>
                    {session.current && (
                      <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-500">Current</span>
                    )}
                  </div>
                  <p className="text-xs text-ink/50">{session.location} &middot; Last active {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button
                  type="button"
                  className="px-3 py-1 text-xs font-medium text-ink/50 hover:text-alert transition-colors duration-ui"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Password policy */}
      <div className="bg-white border border-sand-300 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Password policy</h2>
        <p className="text-sm text-ink/60 mb-4">
          Your organisation&apos;s password policy is enforced by your identity provider. The following requirements are active:
        </p>
        <ul className="space-y-2">
          {[
            "Minimum 12 characters",
            "At least one uppercase letter",
            "At least one number",
            "At least one special character",
            "Password must be changed every 90 days",
            "Cannot reuse the last 5 passwords",
          ].map((rule) => (
            <li key={rule} className="flex items-center gap-2 text-sm text-ink/70">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 flex-shrink-0">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {rule}
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-sand-300">
          <button
            type="button"
            className="px-4 py-2 border border-sand-300 text-sm font-medium text-ink hover:bg-sand-50 transition-colors duration-ui rounded-full"
          >
            Change password
          </button>
        </div>
      </div>

      {/* Demo notice */}
      <div className="p-4 bg-sand-50 border border-sand-300 rounded-2xl">
        <p className="text-xs text-ink/50">
          This is a demo environment. Security settings changes are not persisted. All data shown is synthetic.
        </p>
      </div>
    </div>
  );
}
