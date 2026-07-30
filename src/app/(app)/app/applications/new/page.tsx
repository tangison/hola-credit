"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4 | 5;

const stepLabels: Record<Step, string> = {
  1: "Case details",
  2: "Consent",
  3: "Statement upload",
  4: "Processing",
  5: "Review",
};

interface CaseDetails {
  lenderReference: string;
  applicantDisplayName: string;
  productType: string;
  requestedAmount: string;
  assessmentPurpose: string;
}

interface ConsentDetails {
  purposeAccepted: boolean;
  dataCategoriesAccepted: boolean;
  organisationAccepted: boolean;
  retentionAccepted: boolean;
  sharingScopeAccepted: boolean;
  expiryAccepted: boolean;
}

const productTypes = [
  "Personal loan",
  "Microfinance loan",
  "Retail credit",
  "Vehicle finance",
  "Business loan",
  "Housing loan",
];

const assessmentPurposes = [
  "New credit application",
  "Credit limit increase",
  "Account review",
  "Debt restructuring",
  "Regulatory compliance",
];

interface PipelineStage {
  label: string;
  status: "pending" | "active" | "complete";
}

export default function NewApplicationPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [caseDetails, setCaseDetails] = useState<CaseDetails>({
    lenderReference: "",
    applicantDisplayName: "",
    productType: "",
    requestedAmount: "",
    assessmentPurpose: "",
  });
  const [consent, setConsent] = useState<ConsentDetails>({
    purposeAccepted: false,
    dataCategoriesAccepted: false,
    organisationAccepted: false,
    retentionAccepted: false,
    sharingScopeAccepted: false,
    expiryAccepted: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const allConsentAccepted = Object.values(consent).every(Boolean);
  const caseDetailsValid =
    caseDetails.lenderReference.trim() !== "" &&
    caseDetails.applicantDisplayName.trim() !== "" &&
    caseDetails.productType !== "" &&
    caseDetails.requestedAmount.trim() !== "" &&
    caseDetails.assessmentPurpose !== "";

  const pipelineStages: PipelineStage[] = [
    { label: "Received", status: "complete" },
    { label: "Security checks", status: "complete" },
    { label: "Text extraction", status: "active" },
    { label: "Transaction review", status: "pending" },
    { label: "Assessment calculation", status: "pending" },
    { label: "Ready", status: "pending" },
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const validTypes = ["application/pdf", "image/png", "image/jpeg"];
    const validFiles = files.filter((f) => validTypes.includes(f.type));
    const newFiles = validFiles.map((f) => ({
      name: f.name,
      size: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`,
      type: f.type.split("/")[1].toUpperCase(),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map((f) => ({
      name: f.name,
      size: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`,
      type: f.type.split("/")[1].toUpperCase(),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <Link href="/app/applications" className="hover:text-ink transition-colors duration-ui">Applications</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          <span className="text-ink">New application</span>
        </div>
        <h1 className="text-2xl font-bold text-ink">New credit assessment</h1>
        <p className="mt-1 text-sm text-ink/60">
          Complete each step to submit a new cash-flow assessment application.
        </p>
      </div>

      {/* Step progress indicator */}
      <nav aria-label="Application progress" className="relative">
        <div className="flex items-center justify-between">
          {([1, 2, 3, 4, 5] as Step[]).map((step) => (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-ui ${
                  step < currentStep
                    ? "bg-success text-white"
                    : step === currentStep
                    ? "bg-ink text-sand-50"
                    : "bg-sand-300 text-ink/40"
                }`}
              >
                {step < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span className={`mt-1.5 text-xs font-medium hidden sm:block ${
                step <= currentStep ? "text-ink" : "text-ink/40"
              }`}>
                {stepLabels[step]}
              </span>
            </div>
          ))}
        </div>
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-sand-300 -z-0" aria-hidden="true">
          <div
            className="h-full bg-ink transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />
        </div>
      </nav>

      {/* Step content */}
      <div className="bg-white border border-sand-300 rounded-lg p-6 sm:p-8">
        {/* Step 1: Case details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Case details</h2>
              <p className="mt-1 text-sm text-ink/60">Provide the basic details for this credit assessment.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="lenderReference" className="block text-sm font-medium text-ink mb-1.5">
                  Lender reference <span className="text-alert">*</span>
                </label>
                <input
                  id="lenderReference"
                  type="text"
                  value={caseDetails.lenderReference}
                  onChange={(e) => setCaseDetails((prev) => ({ ...prev, lenderReference: e.target.value }))}
                  placeholder="e.g. LN-2024-00142"
                  className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
                />
              </div>

              <div>
                <label htmlFor="applicantName" className="block text-sm font-medium text-ink mb-1.5">
                  Applicant display name <span className="text-alert">*</span>
                </label>
                <input
                  id="applicantName"
                  type="text"
                  value={caseDetails.applicantDisplayName}
                  onChange={(e) => setCaseDetails((prev) => ({ ...prev, applicantDisplayName: e.target.value }))}
                  placeholder="e.g. Maria K."
                  className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
                />
                <p className="mt-1 text-xs text-ink/50">A display name is used instead of the full legal name to protect borrower privacy.</p>
              </div>

              <div>
                <label htmlFor="productType" className="block text-sm font-medium text-ink mb-1.5">
                  Product type <span className="text-alert">*</span>
                </label>
                <select
                  id="productType"
                  value={caseDetails.productType}
                  onChange={(e) => setCaseDetails((prev) => ({ ...prev, productType: e.target.value }))}
                  className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white"
                >
                  <option value="">Select a product type</option>
                  {productTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="requestedAmount" className="block text-sm font-medium text-ink mb-1.5">
                  Requested amount (NAD) <span className="text-alert">*</span>
                </label>
                <input
                  id="requestedAmount"
                  type="text"
                  value={caseDetails.requestedAmount}
                  onChange={(e) => setCaseDetails((prev) => ({ ...prev, requestedAmount: e.target.value }))}
                  placeholder="e.g. 15000"
                  className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
                />
              </div>

              <div>
                <label htmlFor="assessmentPurpose" className="block text-sm font-medium text-ink mb-1.5">
                  Assessment purpose <span className="text-alert">*</span>
                </label>
                <select
                  id="assessmentPurpose"
                  value={caseDetails.assessmentPurpose}
                  onChange={(e) => setCaseDetails((prev) => ({ ...prev, assessmentPurpose: e.target.value }))}
                  className="w-full px-3 py-2 border border-sand-300 rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white"
                >
                  <option value="">Select an assessment purpose</option>
                  {assessmentPurposes.map((purpose) => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Consent */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Data processing consent</h2>
              <p className="mt-1 text-sm text-ink/60">
                The applicant must consent to the following before their data can be processed. Review each item and confirm.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-sand-300 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="consentPurpose"
                    type="checkbox"
                    checked={consent.purposeAccepted}
                    onChange={(e) => setConsent((prev) => ({ ...prev, purposeAccepted: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
                  />
                  <div>
                    <label htmlFor="consentPurpose" className="text-sm font-medium text-ink cursor-pointer">Purpose of processing</label>
                    <p className="mt-0.5 text-sm text-ink/60">
                      The applicant&apos;s bank statement data will be processed solely for the purpose of conducting a cash-flow credit assessment for the product and purpose specified above.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-sand-300 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="consentDataCategories"
                    type="checkbox"
                    checked={consent.dataCategoriesAccepted}
                    onChange={(e) => setConsent((prev) => ({ ...prev, dataCategoriesAccepted: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
                  />
                  <div>
                    <label htmlFor="consentDataCategories" className="text-sm font-medium text-ink cursor-pointer">Data categories</label>
                    <p className="mt-0.5 text-sm text-ink/60">
                      The following data categories will be processed: transaction descriptions, amounts, dates, running balances, and account metadata. No personally identifiable information beyond what is necessary will be extracted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-sand-300 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="consentOrganisation"
                    type="checkbox"
                    checked={consent.organisationAccepted}
                    onChange={(e) => setConsent((prev) => ({ ...prev, organisationAccepted: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
                  />
                  <div>
                    <label htmlFor="consentOrganisation" className="text-sm font-medium text-ink cursor-pointer">Processing organisation</label>
                    <p className="mt-0.5 text-sm text-ink/60">
                      Data will be processed by Hola Credit on behalf of Demo Lender. Hola Credit acts as a data processor under the terms of the data processing agreement between both parties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-sand-300 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="consentRetention"
                    type="checkbox"
                    checked={consent.retentionAccepted}
                    onChange={(e) => setConsent((prev) => ({ ...prev, retentionAccepted: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
                  />
                  <div>
                    <label htmlFor="consentRetention" className="text-sm font-medium text-ink cursor-pointer">Retention period</label>
                    <p className="mt-0.5 text-sm text-ink/60">
                      Processed data will be retained for 12 months from the date of assessment, after which it will be permanently deleted unless a longer retention period is required by law.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-sand-300 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="consentSharing"
                    type="checkbox"
                    checked={consent.sharingScopeAccepted}
                    onChange={(e) => setConsent((prev) => ({ ...prev, sharingScopeAccepted: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
                  />
                  <div>
                    <label htmlFor="consentSharing" className="text-sm font-medium text-ink cursor-pointer">Sharing scope</label>
                    <p className="mt-0.5 text-sm text-ink/60">
                      Assessment results may be shared with the originating lender and any regulatory bodies that require access. Data will not be shared with third parties for marketing or unrelated purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-sand-300 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="consentExpiry"
                    type="checkbox"
                    checked={consent.expiryAccepted}
                    onChange={(e) => setConsent((prev) => ({ ...prev, expiryAccepted: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
                  />
                  <div>
                    <label htmlFor="consentExpiry" className="text-sm font-medium text-ink cursor-pointer">Consent expiry</label>
                    <p className="mt-0.5 text-sm text-ink/60">
                      This consent is valid for 90 days from the date it is given. If the assessment is not completed within this period, consent must be re-obtained from the applicant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Statement upload */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Upload bank statements</h2>
              <p className="mt-1 text-sm text-ink/60">
                Upload the applicant&apos;s bank statements for analysis. Accepted formats: PDF, PNG, and JPEG.
              </p>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-ui ${
                isDragging
                  ? "border-teal-400 bg-teal-50"
                  : "border-sand-300 bg-sand-50 hover:border-sand-400"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink/50">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-ink">
                  Drag and drop files here, or{" "}
                  <label htmlFor="file-upload" className="text-teal-500 hover:text-teal-600 cursor-pointer transition-colors duration-ui">
                    browse
                  </label>
                </p>
                <p className="mt-1 text-xs text-ink/50">PDF, PNG, or JPEG up to 10 MB each</p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.png,.jpeg,.jpg"
                multiple
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload bank statement files"
              />
            </div>

            {/* Uploaded files list */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-ink">Uploaded files</h3>
                <ul className="divide-y divide-sand-300 border border-sand-300 rounded-md">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between px-4 py-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded bg-sand-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-ink/50">{file.type}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-ink truncate">{file.name}</p>
                          <p className="text-xs text-ink/50">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 text-ink/40 hover:text-alert transition-colors duration-ui"
                        aria-label={`Remove ${file.name}`}
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
          </div>
        )}

        {/* Step 4: Processing */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Processing your application</h2>
              <p className="mt-1 text-sm text-ink/60">
                Your bank statements are being analysed. This usually takes 2 to 5 minutes depending on the document complexity.
              </p>
            </div>

            <div className="space-y-0">
              {pipelineStages.map((stage, index) => (
                <div key={stage.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.status === "complete"
                          ? "bg-success text-white"
                          : stage.status === "active"
                          ? "bg-ink text-sand-50"
                          : "bg-sand-300 text-ink/40"
                      }`}
                    >
                      {stage.status === "complete" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : stage.status === "active" ? (
                        <div className="w-3 h-3 rounded-full bg-sand-50 animate-pulse" />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    {index < pipelineStages.length - 1 && (
                      <div className={`w-0.5 h-8 ${
                        stage.status === "complete" ? "bg-success" : "bg-sand-300"
                      }`} />
                    )}
                  </div>
                  <div className="pt-1 pb-6">
                    <p className={`text-sm font-medium ${
                      stage.status === "pending" ? "text-ink/40" : "text-ink"
                    }`}>
                      {stage.label}
                    </p>
                    {stage.status === "active" && (
                      <p className="text-xs text-teal-500 mt-0.5">In progress&hellip;</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Assessment review</h2>
              <p className="mt-1 text-sm text-ink/60">
                Review the assessment results before finalising. Verify the key indicators and evidence below.
              </p>
            </div>

            {/* Assessment summary */}
            <div className="border border-sand-300 rounded-md divide-y divide-sand-300">
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Income floor</span>
                <span className="text-sm text-ink">NAD 8,200 / month</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Consistency score</span>
                <span className="text-sm font-medium text-success">High</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Income volatility</span>
                <span className="text-sm font-medium text-warning">Moderate</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Flags</span>
                <span className="text-sm text-alert">2 items need attention</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Evidence strength</span>
                <span className="text-sm font-medium text-ink/60">3 months of statements</span>
              </div>
            </div>

            {/* Flags detail */}
            <div>
              <h3 className="text-sm font-semibold text-ink mb-3">Flagged items</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-warning/20 rounded-md">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning mt-0.5 flex-shrink-0">
                    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-ink">Irregular deposit pattern detected</p>
                    <p className="text-xs text-ink/60 mt-0.5">Three deposits in January exceed the average monthly income by more than 40%. This may indicate irregular income or non-recurring deposits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-warning/20 rounded-md">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning mt-0.5 flex-shrink-0">
                    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-ink">Short statement history</p>
                    <p className="text-xs text-ink/60 mt-0.5">Only 3 months of statements were provided. A minimum of 6 months is recommended for a more reliable assessment of income patterns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/app/applications"
            className="px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
          >
            Cancel
          </Link>
          {currentStep < 5 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev + 1) as Step)}
              disabled={
                (currentStep === 1 && !caseDetailsValid) ||
                (currentStep === 2 && !allConsentAccepted)
              }
              className="inline-flex items-center gap-1 px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
          {currentStep === 5 && (
            <button
              type="button"
              className="inline-flex items-center gap-1 px-4 py-2 bg-success text-white rounded-md text-sm font-medium hover:bg-success/90 transition-colors duration-ui"
            >
              Submit assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
