"use client";

import { useState } from "react";
import { demoOrganisation } from "@/lib/demo-data";

type OrgStatus = "pending" | "approved" | "suspended";

const statusConfig: Record<OrgStatus, { label: string; className: string; dotClassName: string }> = {
  pending: { label: "Pending approval", className: "bg-amber-50 text-warning", dotClassName: "bg-warning" },
  approved: { label: "Approved", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  suspended: { label: "Suspended", className: "bg-red-50 text-alert", dotClassName: "bg-alert" },
};

const businessTypes = [
  "Microfinance institution",
  "Registered lender",
  "Retail credit provider",
  "Cooperative",
  "Bank",
  "Other financial institution",
];

export default function OrganisationSettingsPage() {
  const [orgName, setOrgName] = useState(demoOrganisation.name);
  const [businessType, setBusinessType] = useState(demoOrganisation.businessType);
  const [orgStatus] = useState<OrgStatus>("approved");
  const [isSaving, setIsSaving] = useState(false);

  const statusInfo = statusConfig[orgStatus];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">Organisation</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          Manage your organisation&apos;s identity and compliance profile. Changes here affect all team members.
        </p>
      </div>

      {/* Status */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-ink">Organisation status</h2>
            <p className="text-xs text-ink/50 mt-0.5">Your organisation must be approved before you can process applications.</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.className}`}>
            <span className={`w-2 h-2 rounded-full ${statusInfo.dotClassName}`} />
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Organisation details */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Organisation details</h2>
        <div className="space-y-4 max-w-lg">
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-ink mb-1.5">
              Organisation name
            </label>
            <input
              id="orgName"
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-ink mb-1.5">
              Business type
            </label>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white"
            >
              {businessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Compliance profile */}
      <div className="bg-white border border-sand-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Compliance profile</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-sand-300">
            <span className="text-sm text-ink/60">Registered name</span>
            <span className="text-sm font-medium text-ink">{demoOrganisation.registeredName}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-sand-300">
            <span className="text-sm text-ink/60">Regulatory body</span>
            <span className="text-sm font-medium text-ink">{demoOrganisation.regulatoryBody}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-sand-300">
            <span className="text-sm text-ink/60">License number</span>
            <span className="text-sm font-medium text-ink">{demoOrganisation.licenseNumber}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-ink/60">Data processing officer</span>
            <span className="text-sm font-medium text-ink">{demoOrganisation.dataProcessingOfficer}</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-ink/50">
          To update your compliance profile, contact Hola Credit support. Changes to regulatory information are audited.
        </p>
      </div>

      {/* Demo notice */}
      <div className="p-4 bg-sand-50 border border-sand-300 rounded-lg">
        <p className="text-xs text-ink/50">
          This is a demo environment. Organisation settings changes are not persisted. All data shown is synthetic.
        </p>
      </div>
    </div>
  );
}
