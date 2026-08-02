"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLogo } from "@/components/shared/auth-logo";

const businessTypes = [
  "Microfinance institution",
  "Registered lender",
  "Retail credit provider",
  "Cooperative",
  "Bank",
  "Other financial institution",
];

export default function OnboardingOrganisationPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = orgName.trim() !== "" && businessType !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    // MVP: Save to localStorage, skip real org creation
    const orgData = { orgName, businessType, createdAt: new Date().toISOString() };
    localStorage.setItem("hola_org", JSON.stringify(orgData));
    setTimeout(() => {
      router.push("/app");
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <AuthLogo />
        </div>
        <h1 className="text-2xl font-bold text-ink">Set up your organisation</h1>
        <p className="mt-2 text-sm text-ink/60">
          Tell us about your organisation. This is saved locally for the demo, no account needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-sand-300 rounded-lg p-6 space-y-5">
        <div>
          <label htmlFor="orgName" className="block text-sm font-medium text-ink mb-1.5">
            Organisation name <span className="text-red-500">*</span>
          </label>
          <input
            id="orgName"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="e.g. Sunshine Microfinance"
            className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
            autoFocus
          />
          <p className="mt-1 text-xs text-ink/50">This is the name that will appear in your portal and on assessment reports.</p>
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-ink mb-1.5">
            Business type <span className="text-red-500">*</span>
          </label>
          <select
            id="businessType"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white"
          >
            <option value="">Select a business type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-ink/50">This helps us apply the right compliance profile for your organisation.</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Setting up..." : "Go to the demo"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-xs text-ink/50">
        No account is created. This info is stored locally in your browser for the demo.
      </p>
    </div>
  );
}
