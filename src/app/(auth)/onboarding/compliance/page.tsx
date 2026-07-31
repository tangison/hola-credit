"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLogo } from "@/components/shared/auth-logo";

export default function OnboardingCompliancePage() {
  const router = useRouter();
  const [registeredName, setRegisteredName] = useState("");
  const [regulatoryBody, setRegulatoryBody] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [dpoEmail, setDpoEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dpaAccepted, setDpaAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = registeredName.trim() !== "" && regulatoryBody.trim() !== "" && licenseNumber.trim() !== "" && dpoEmail.trim() !== "" && termsAccepted && dpaAccepted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/onboarding/team");
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <AuthLogo />
        </div>
        <h1 className="text-2xl font-bold text-ink">Compliance profile</h1>
        <p className="mt-2 text-sm text-ink/60">
          Provide your regulatory details so we can verify your organisation and enable the assessment portal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-sand-300 rounded-lg p-6 space-y-5">
        <div>
          <label htmlFor="registeredName" className="block text-sm font-medium text-ink mb-1.5">
            Registered name <span className="text-red-500">*</span>
          </label>
          <input
            id="registeredName"
            type="text"
            value={registeredName}
            onChange={(e) => setRegisteredName(e.target.value)}
            placeholder="e.g. Sunshine Microfinance (Pty) Ltd"
            className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
          />
          <p className="mt-1 text-xs text-ink/50">The legal name as registered with your regulatory authority.</p>
        </div>

        <div>
          <label htmlFor="regulatoryBody" className="block text-sm font-medium text-ink mb-1.5">
            Regulatory body <span className="text-red-500">*</span>
          </label>
          <input
            id="regulatoryBody"
            type="text"
            value={regulatoryBody}
            onChange={(e) => setRegulatoryBody(e.target.value)}
            placeholder="e.g. Bank of Namibia"
            className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
          />
        </div>

        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-ink mb-1.5">
            License number <span className="text-red-500">*</span>
          </label>
          <input
            id="licenseNumber"
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="e.g. MFI-2024-0042"
            className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
          />
        </div>

        <div>
          <label htmlFor="dpoEmail" className="block text-sm font-medium text-ink mb-1.5">
            Data processing officer email <span className="text-red-500">*</span>
          </label>
          <input
            id="dpoEmail"
            type="email"
            value={dpoEmail}
            onChange={(e) => setDpoEmail(e.target.value)}
            placeholder="e.g. compliance@yourorg.na"
            className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
          />
          <p className="mt-1 text-xs text-ink/50">The person responsible for data protection within your organisation.</p>
        </div>

        {/* Acknowledgements */}
        <div className="pt-2 space-y-3 border-t border-sand-300">
          <div className="flex items-start gap-3">
            <input
              id="termsAccepted"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
            />
            <label htmlFor="termsAccepted" className="text-sm text-ink cursor-pointer">
              I acknowledge the <a href="/terms" className="text-teal-500 hover:text-teal-600 underline underline-offset-2">Terms of Service</a> and confirm that the information provided is accurate and complete.
            </label>
          </div>
          <div className="flex items-start gap-3">
            <input
              id="dpaAccepted"
              type="checkbox"
              checked={dpaAccepted}
              onChange={(e) => setDpaAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
            />
            <label htmlFor="dpaAccepted" className="text-sm text-ink cursor-pointer">
              I acknowledge the <a href="/privacy" className="text-teal-500 hover:text-teal-600 underline underline-offset-2">Data Processing Agreement</a> and consent to Hola Credit processing data on behalf of my organisation under the specified terms.
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving compliance profile..." : "Continue to team setup"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-xs text-ink/50">
        Your compliance profile will be reviewed before full access is granted.
      </p>
    </div>
  );
}
