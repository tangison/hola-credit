"use client";

import { useState } from "react";

export default function ApiSettingsPage() {
  const [showKey, setShowKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookEvents, setWebhookEvents] = useState<string[]>(["application.ready"]);

  const apiKey = "hca_live_k8x2m9p4q7r1s3t5u7v9w0x1y2z3";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">API</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          Manage API keys, webhook endpoints, and monitor usage for programmatic access to the Hola Credit platform.
        </p>
      </div>

      {/* API key management */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-ink">API keys</h2>
            <p className="text-sm text-ink/60 mt-0.5">Use API keys to integrate Hola Credit with your existing systems.</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-warning">
            Coming soon
          </span>
        </div>

        <div className="p-4 bg-sand-50 border border-sand-300 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink">Live key</p>
              <p className="text-sm text-ink/60 font-mono mt-1">
                {showKey ? apiKey : "hca_live_••••••••••••••••••••••••"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="px-3 py-1.5 text-xs font-medium text-ink/60 hover:text-ink transition-colors duration-ui border border-sand-300 rounded-md"
              >
                {showKey ? "Hide" : "Reveal"}
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-medium text-ink/60 hover:text-ink transition-colors duration-ui border border-sand-300 rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink/50">
            Keep your API keys secure. Never share them in publicly accessible areas such as client-side code or public repositories.
          </p>
        </div>
      </div>

      {/* Webhook endpoints */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Webhook endpoints</h2>
        <p className="text-sm text-ink/60 mb-4">
          Configure webhook endpoints to receive real-time notifications when events occur in your organisation.
        </p>

        <div className="p-4 bg-sand-50 border border-sand-300 rounded-md mb-4">
          <h3 className="text-sm font-semibold text-ink mb-3">Add endpoint</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="webhookUrl" className="block text-sm font-medium text-ink mb-1.5">
                Endpoint URL
              </label>
              <input
                id="webhookUrl"
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-system.na/webhooks/hola-credit"
                className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui bg-white"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-ink mb-1.5">Events</p>
              <div className="flex flex-wrap gap-2">
                {["application.ready", "application.needs_review", "consent.expired", "consent.withdrawn"].map((event) => (
                  <button
                    key={event}
                    type="button"
                    onClick={() => {
                      setWebhookEvents((prev) =>
                        prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
                      );
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-ui ${
                      webhookEvents.includes(event)
                        ? "bg-ink text-sand-50"
                        : "bg-white border border-sand-300 text-ink/60 hover:text-ink"
                    }`}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!webhookUrl.trim() || webhookEvents.length === 0}
                className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add endpoint
              </button>
            </div>
          </div>
        </div>

        <div className="text-center py-6">
          <p className="text-sm text-ink/50">No webhook endpoints configured yet. Add one above to get started.</p>
        </div>
      </div>

      {/* Usage stats */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Usage statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-sand-50 rounded-md">
            <p className="text-sm text-ink/60">API requests (this month)</p>
            <p className="text-2xl font-bold text-ink mt-1">47</p>
          </div>
          <div className="p-4 bg-sand-50 rounded-md">
            <p className="text-sm text-ink/60">Webhook deliveries</p>
            <p className="text-2xl font-bold text-ink mt-1">12</p>
          </div>
          <div className="p-4 bg-sand-50 rounded-md">
            <p className="text-sm text-ink/60">Failed deliveries</p>
            <p className="text-2xl font-bold text-ink mt-1">0</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink/50">
          Usage resets at the beginning of each calendar month. Rate limits apply based on your plan.
        </p>
      </div>

      {/* Demo notice */}
      <div className="p-4 bg-sand-50 border border-sand-300 rounded-lg">
        <p className="text-xs text-ink/50">
          This is a demo environment. API keys and webhooks are not functional. All data shown is synthetic.
        </p>
      </div>
    </div>
  );
}
