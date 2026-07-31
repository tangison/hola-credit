"use client";

import { useState, useCallback, useEffect } from "react";
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [processingComplete, setProcessingComplete] = useState(false);

  const allConsentAccepted = Object.values(consent).every(Boolean);
  const caseDetailsValid =
    caseDetails.lenderReference.trim() !== "" &&
    caseDetails.applicantDisplayName.trim() !== "" &&
    caseDetails.productType !== "" &&
    caseDetails.requestedAmount.trim() !== "" &&
    caseDetails.assessmentPurpose !== "";

  // Simulate upload progress
  useEffect(() => {
    if (currentStep === 3 && isUploading) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            setIsUploading(false);
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentStep, isUploading]);

  // Simulate processing stages
  useEffect(() => {
    if (currentStep === 4 && !processingComplete) {
      const stages = [
        { delay: 800, stage: 1 },
        { delay: 1600, stage: 2 },
        { delay: 2400, stage: 3 },
        { delay: 3200, stage: 4 },
        { delay: 4000, stage: 5 },
      ];
      const timers = stages.map(({ delay, stage }) =>
        setTimeout(() => setProcessingStage(stage), delay)
      );
      const completeTimer = setTimeout(() => setProcessingComplete(true), 4800);
      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(completeTimer);
      };
    }
  }, [currentStep, processingComplete]);

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
    if (newFiles.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map((f) => ({
      name: f.name,
      size: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`,
      type: f.type.split("/")[1].toUpperCase(),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    if (newFiles.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const processingStages = [
    { label: "Received", status: processingStage >= 1 ? "complete" as const : "pending" as const },
    { label: "Security checks", status: processingStage >= 2 ? "complete" as const : processingStage === 1 ? "active" as const : "pending" as const },
    { label: "Text extraction", status: processingStage >= 3 ? "complete" as const : processingStage === 2 ? "active" as const : "pending" as const },
    { label: "Transaction review", status: processingStage >= 4 ? "complete" as const : processingStage === 3 ? "active" as const : "pending" as const },
    { label: "Assessment calculation", status: processingStage >= 5 ? "complete" as const : processingStage === 4 ? "active" as const : "pending" as const },
    { label: "Ready", status: processingComplete ? "complete" as const : processingStage === 5 ? "active" as const : "pending" as const },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-ink/50 mb-2">
          <Link href="/app/applications" className="hover:text-ink transition-colors duration-ui">Applications</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          <span className="text-ink">New application</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">New credit assessment</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-500 border border-teal-200">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          Complete each step to submit a new cash-flow assessment application. All data is synthetic.
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
                    ? "bg-teal-400 text-white"
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
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!caseDetailsValid}
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
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
              {[
                { key: "purposeAccepted" as const, id: "consentPurpose", label: "Purpose of processing", desc: "The applicant's bank statement data will be processed solely for the purpose of conducting a cash-flow credit assessment for the product and purpose specified above." },
                { key: "dataCategoriesAccepted" as const, id: "consentData", label: "Data categories", desc: "The following data categories will be processed: transaction amounts, dates, descriptions, and direction (credit/debit). No account numbers or personal identifiers will be stored." },
                { key: "organisationAccepted" as const, id: "consentOrg", label: "Processing organisation", desc: "Data will be processed by Hola Credit on behalf of your organisation. Hola Credit acts as a data processor under your instructions." },
                { key: "retentionAccepted" as const, id: "consentRetention", label: "Retention period", desc: "Raw statement data will be retained for 90 days after assessment completion, after which it will be permanently deleted. Assessment results are retained for 3 years." },
                { key: "sharingScopeAccepted" as const, id: "consentSharing", label: "Sharing scope", desc: "Assessment results will be shared only with authorised members of your organisation. Hola Credit will not share results with third parties without your consent." },
                { key: "expiryAccepted" as const, id: "consentExpiry", label: "Consent expiry", desc: "This consent expires 90 days from capture. If the assessment is not completed within this period, the data will be deleted and a new consent will be required." },
              ].map((item) => (
                <div key={item.key} className="border border-sand-300 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <input
                      id={item.id}
                      type="checkbox"
                      checked={consent[item.key]}
                      onChange={(e) => setConsent((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
                    />
                    <div>
                      <label htmlFor={item.id} className="text-sm font-medium text-ink cursor-pointer">{item.label}</label>
                      <p className="mt-0.5 text-sm text-ink/60">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!allConsentAccepted}
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Statement upload */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Statement upload</h2>
              <p className="mt-1 text-sm text-ink/60">
                Upload the applicant&apos;s bank statement(s). Accepted formats: PDF, PNG, JPEG. Maximum file size: 20 MB.
              </p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-ui ${
                isDragging ? "border-teal-400 bg-teal-50/50" : "border-sand-300 hover:border-sand-400"
              }`}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-ink/30 mb-3">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              <p className="text-sm font-medium text-ink">Drag and drop files here</p>
              <p className="mt-1 text-xs text-ink/50">or click to browse</p>
              <input
                type="file"
                accept=".pdf,.png,.jpeg,.jpg"
                multiple
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ position: "relative", marginTop: "8px" }}
              />
            </div>

            {/* Upload progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink/60">Uploading...</span>
                  <span className="font-medium text-ink">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}

            {/* Uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-ink">Uploaded files</h3>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-sand-50 border border-sand-300 rounded-md">
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-ink">{file.name}</p>
                        <p className="text-xs text-ink/50">{file.size} &middot; {file.type}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-ink/40 hover:text-alert transition-colors duration-ui"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
              >
                Back
              </button>
              <button
                type="button"
                disabled={uploadedFiles.length === 0 || isUploading}
                onClick={() => { setCurrentStep(4); setProcessingStage(0); setProcessingComplete(false); }}
                className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit for processing
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Processing */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Processing</h2>
              <p className="mt-1 text-sm text-ink/60">
                Your application is being processed. Each stage must complete before the next begins. This is a simulated demo.
              </p>
            </div>
            <div className="space-y-0">
              {processingStages.map((stage, index) => (
                <div key={stage.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      stage.status === "complete" ? "bg-teal-400 text-white" :
                      stage.status === "active" ? "bg-ink text-sand-50" :
                      "bg-sand-300 text-ink/40"
                    }`}>
                      {stage.status === "complete" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      ) : stage.status === "active" ? (
                        <div className="w-3 h-3 rounded-full bg-sand-50 animate-pulse" />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    {index < processingStages.length - 1 && (
                      <div className={`w-0.5 h-8 ${stage.status === "complete" ? "bg-teal-400" : "bg-sand-300"}`} />
                    )}
                  </div>
                  <div className="pt-1 pb-6">
                    <p className={`text-sm font-medium ${stage.status === "pending" ? "text-ink/40" : "text-ink"}`}>
                      {stage.label}
                    </p>
                    {stage.status === "active" && (
                      <p className="text-xs text-teal-500 mt-0.5">In progress&hellip;</p>
                    )}
                    {stage.status === "complete" && (
                      <p className="text-xs text-teal-500 mt-0.5">Complete</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!processingComplete}
                onClick={() => setCurrentStep(5)}
                className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
              >
                View results
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Assessment results</h2>
              <p className="mt-1 text-sm text-ink/60">
                The cash-flow assessment is complete. Review the results below.
              </p>
            </div>

            {/* Demo assessment results */}
            <div className="p-4 bg-sand-50 border border-sand-300 rounded-md mb-4">
              <p className="text-xs text-ink/50 mb-2">This is simulated demo data. No real assessment was performed.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-sand-50 rounded-md">
                <p className="text-2xl font-bold text-ink">Good</p>
                <p className="mt-1 text-xs text-ink/50">Cash-flow tier</p>
              </div>
              <div className="text-center p-4 bg-sand-50 rounded-md">
                <p className="text-2xl font-bold text-ink">72</p>
                <p className="mt-1 text-xs text-ink/50">Assessment score</p>
              </div>
              <div className="text-center p-4 bg-sand-50 rounded-md">
                <p className="text-2xl font-bold text-ink">NAD 8,150</p>
                <p className="mt-1 text-xs text-ink/50">Income floor</p>
              </div>
              <div className="text-center p-4 bg-sand-50 rounded-md">
                <p className="text-2xl font-bold text-ink">82%</p>
                <p className="mt-1 text-xs text-ink/50">Consistency</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-teal-50/50 border border-teal-200 rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 mt-0.5 flex-shrink-0">
                  <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-ink">Consistent deposit pattern</p>
                  <p className="text-xs text-ink/60 mt-0.5">Regular monthly deposits identified with a standard deviation of 12%.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-50/50 border border-warning/20 rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning mt-0.5 flex-shrink-0">
                  <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-ink">Short statement history</p>
                  <p className="text-xs text-ink/60 mt-0.5">Only 3 months of statements were provided. A minimum of 6 months is recommended.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-sand-50 border border-sand-300 rounded-md">
              <p className="text-sm text-ink/60">
                This assessment is supplementary to formal bureau checks and human judgement. It does not constitute a lending decision. Predictive validity against repayment outcomes has not yet been established.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-sand-300">
              <Link
                href="/app/applications"
                className="px-4 py-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-ui"
              >
                Back to applications
              </Link>
              <Link
                href="/app/applications/app_demo_001"
                className="px-4 py-2 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                View full assessment
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
