"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Types ─── */

interface MathCaptcha {
  question: string;
  answer: number;
}

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "duplicate"
  | "server_error"
  | "offline";

interface FormData {
  organisationName: string;
  businessType: string;
  contactName: string;
  workEmail: string;
  role: string;
  estimatedAssessments: string;
  intendedUse: string;
  consentToContact: boolean;
}

interface FieldErrors {
  organisationName?: string;
  businessType?: string;
  contactName?: string;
  workEmail?: string;
  consentToContact?: string;
}

const BUSINESS_TYPES = [
  "Microlender",
  "Retailer offering credit",
  "Bank or financial institution",
  "Other authorised credit provider",
] as const;

const ESTIMATED_ASSESSMENTS = [
  "1–50",
  "51–200",
  "201–500",
  "500+",
] as const;

const STORAGE_KEY = "hola_waitlist_draft";
const WAITLIST_KEY = "hola_waitlist";

/* ─── Captcha Generator ─── */

function generateCaptcha(): MathCaptcha {
  const ops = ["+", "−", "×"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;

  switch (op) {
    case "×":
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      answer = a * b;
      break;
    case "−":
      a = Math.floor(Math.random() * 50) + 20;
      b = Math.floor(Math.random() * a);
      answer = a - b;
      break;
    default: // +
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 10;
      answer = a + b;
  }

  return {
    question: `What is ${a} ${op} ${b}?`,
    answer,
  };
}

/* ─── Validation ─── */

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(data: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.organisationName.trim()) {
    errors.organisationName = "Organisation name is required";
  }

  if (!data.businessType) {
    errors.businessType = "Please select a business type";
  }

  if (!data.contactName.trim()) {
    errors.contactName = "Contact name is required";
  }

  if (!data.workEmail.trim()) {
    errors.workEmail = "Work email is required";
  } else if (!validateEmail(data.workEmail)) {
    errors.workEmail = "Please enter a valid email address";
  }

  if (!data.consentToContact) {
    errors.consentToContact = "You must consent to be contacted to join the waitlist";
  }

  return errors;
}

/* ─── Storage Helpers ─── */

function saveDraft(data: FormData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage may be full or unavailable
  }
}

function loadDraft(): FormData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

function saveFailedSubmission(data: FormData) {
  try {
    const entries = JSON.parse(localStorage.getItem(WAITLIST_KEY) || "[]");
    entries.push({
      ...data,
      failedAt: new Date().toISOString(),
      status: "pending_retry",
    });
    localStorage.setItem(WAITLIST_KEY, JSON.stringify(entries));
  } catch {
    // Storage may be full or unavailable
  }
}

function isDuplicateEmail(email: string): boolean {
  try {
    const entries = JSON.parse(localStorage.getItem(WAITLIST_KEY) || "[]");
    return entries.some(
      (entry: { workEmail?: string; email?: string }) =>
        entry.workEmail === email || entry.email === email
    );
  } catch {
    return false;
  }
}

/* ─── Component ─── */

export function WaitingListForm({ compact = false }: { compact?: boolean }) {
  const [captcha, setCaptcha] = useState<MathCaptcha>(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>(() => {
    const draft = loadDraft();
    return draft ?? {
      organisationName: "",
      businessType: "",
      contactName: "",
      workEmail: "",
      role: "",
      estimatedAssessments: "",
      intendedUse: "",
      consentToContact: false,
    };
  });

  // Save draft on form data change
  useEffect(() => {
    if (captchaPassed && submissionStatus === "idle") {
      saveDraft(formData);
    }
  }, [formData, captchaPassed, submissionStatus]);

  const handleFieldChange = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error on change
      if (fieldErrors[field as keyof FieldErrors]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [fieldErrors]
  );

  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  /* ─── Captcha Step ─── */

  const handleCaptchaCheck = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const parsed = parseInt(captchaInput, 10);
      if (parsed === captcha.answer) {
        setCaptchaPassed(true);
        setCaptchaError("");
      } else {
        setCaptchaError("Not quite — try again or refresh for a new question.");
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
      }
    },
    [captchaInput, captcha.answer]
  );

  /* ─── Form Submission ─── */

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate
      const errors = validateForm(formData);
      setFieldErrors(errors);

      // Mark all as touched
      setTouched({
        organisationName: true,
        businessType: true,
        contactName: true,
        workEmail: true,
        consentToContact: true,
      });

      if (Object.keys(errors).length > 0) {
        return;
      }

      // Check for duplicate email
      if (isDuplicateEmail(formData.workEmail)) {
        setSubmissionStatus("duplicate");
        return;
      }

      // Check offline
      if (!navigator.onLine) {
        saveFailedSubmission(formData);
        setSubmissionStatus("offline");
        return;
      }

      setSubmissionStatus("submitting");

      try {
        // Attempt to submit to API
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Successfully submitted
          try {
            const entries = JSON.parse(localStorage.getItem(WAITLIST_KEY) || "[]");
            entries.push({
              ...formData,
              joinedAt: new Date().toISOString(),
              status: "submitted",
            });
            localStorage.setItem(WAITLIST_KEY, JSON.stringify(entries));
          } catch {
            // Ignore storage errors
          }
          clearDraft();
          setSubmissionStatus("success");
        } else if (response.status === 409) {
          setSubmissionStatus("duplicate");
        } else {
          // Server error — save locally for retry
          saveFailedSubmission(formData);
          setSubmissionStatus("server_error");
        }
      } catch {
        // Network error — save locally for retry
        saveFailedSubmission(formData);
        setSubmissionStatus("server_error");
      }
    },
    [formData]
  );

  /* ─── Success State ─── */

  if (submissionStatus === "success") {
    return (
      <div className={compact ? "text-center py-4" : "text-center py-8"}>
        <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal-500"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-ink">You&apos;re on the list!</h3>
        <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
          We&apos;ll reach out to <span className="font-medium text-ink">{formData.workEmail}</span> when it&apos;s your turn to access the pilot. No spam, no selling your data.
        </p>
        <Link
          href="/app"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-teal-50 text-teal-500 rounded-full text-sm font-medium hover:bg-teal-100 transition-colors duration-ui"
        >
          Try the demo while you wait
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  /* ─── Duplicate Email State ─── */

  if (submissionStatus === "duplicate") {
    return (
      <div className={compact ? "text-center py-4" : "text-center py-8"}>
        <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-warning"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-ink">Already on the list</h3>
        <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
          This email is already on the waitlist. We&apos;ll reach out when it&apos;s your turn.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
          >
            Try the demo
          </Link>
          <button
            type="button"
            onClick={() => setSubmissionStatus("idle")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-sand-300 text-ink rounded-full text-sm font-medium hover:bg-sand-100 transition-colors duration-ui"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  /* ─── Server Error State ─── */

  if (submissionStatus === "server_error") {
    return (
      <div className={compact ? "text-center py-4" : "text-center py-8"}>
        <div className="w-14 h-14 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink/40"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-ink">Unable to submit right now</h3>
        <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
          Your information has been saved locally for retry. Please try again in a few moments.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={() => {
              setSubmissionStatus("idle");
              handleSubmit(new Event("submit") as unknown as React.FormEvent);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
          >
            Try again
          </button>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-sand-300 text-ink rounded-full text-sm font-medium hover:bg-sand-100 transition-colors duration-ui"
          >
            Try the demo
          </Link>
        </div>
      </div>
    );
  }

  /* ─── Offline State ─── */

  if (submissionStatus === "offline") {
    return (
      <div className={compact ? "text-center py-4" : "text-center py-8"}>
        <div className="w-14 h-14 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink/40"
          >
            <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-ink">You appear to be offline</h3>
        <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
          Your information has been saved locally. Please try again when you&apos;re connected to the internet.
        </p>
        <button
          type="button"
          onClick={() => setSubmissionStatus("idle")}
          className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
        >
          Try again
        </button>
      </div>
    );
  }

  /* ─── Step 1: Math Captcha ─── */

  if (!captchaPassed) {
    return (
      <div className={compact ? "space-y-4" : "space-y-6"}>
        <form onSubmit={handleCaptchaCheck} className="space-y-4">
          <div>
            <label htmlFor="captcha-answer" className="block text-sm font-medium text-ink mb-1.5">
              Prove you&apos;re human
            </label>
            <p className="text-sm text-ink/60 mb-3">{captcha.question}</p>
            <div className="flex gap-2">
              <input
                id="captcha-answer"
                type="number"
                inputMode="numeric"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Your answer"
                className="flex-1 px-3 py-2.5 border border-sand-300 rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
                autoFocus
                required
                aria-describedby={captchaError ? "captcha-error" : undefined}
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              >
                Check
              </button>
            </div>
            {captchaError && (
              <p id="captcha-error" className="mt-2 text-sm text-alert" role="alert">
                {captchaError}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setCaptcha(generateCaptcha());
              setCaptchaInput("");
              setCaptchaError("");
            }}
            className="text-sm text-teal-500 hover:text-teal-600 transition-colors duration-ui focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
          >
            New question
          </button>
        </form>
      </div>
    );
  }

  /* ─── Step 2: Full Form ─── */

  const isSubmitting = submissionStatus === "submitting";

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Human verified badge */}
        <div className="flex items-center gap-2 text-sm text-teal-500 mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Human verified!
        </div>

        {/* Organisation name */}
        <div>
          <label htmlFor="waitlist-org-name" className="block text-sm font-medium text-ink mb-1.5">
            Organisation name <span className="text-alert">*</span>
          </label>
          <input
            id="waitlist-org-name"
            type="text"
            value={formData.organisationName}
            onChange={(e) => handleFieldChange("organisationName", e.target.value)}
            onBlur={() => handleBlur("organisationName")}
            placeholder="e.g. Sunshine Microfinance"
            className={`w-full px-3 py-2.5 border rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui ${
              touched.organisationName && fieldErrors.organisationName
                ? "border-alert"
                : "border-sand-300"
            }`}
            required
            aria-invalid={touched.organisationName && !!fieldErrors.organisationName}
            aria-describedby={
              touched.organisationName && fieldErrors.organisationName
                ? "org-name-error"
                : undefined
            }
          />
          {touched.organisationName && fieldErrors.organisationName && (
            <p id="org-name-error" className="mt-1.5 text-sm text-alert" role="alert">
              {fieldErrors.organisationName}
            </p>
          )}
        </div>

        {/* Business type */}
        <div>
          <label htmlFor="waitlist-business-type" className="block text-sm font-medium text-ink mb-1.5">
            Business type <span className="text-alert">*</span>
          </label>
          <select
            id="waitlist-business-type"
            value={formData.businessType}
            onChange={(e) => handleFieldChange("businessType", e.target.value)}
            onBlur={() => handleBlur("businessType")}
            className={`w-full px-3 py-2.5 border rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white ${
              touched.businessType && fieldErrors.businessType
                ? "border-alert"
                : "border-sand-300"
            }`}
            required
            aria-invalid={touched.businessType && !!fieldErrors.businessType}
            aria-describedby={
              touched.businessType && fieldErrors.businessType
                ? "business-type-error"
                : undefined
            }
          >
            <option value="">Select a business type</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {touched.businessType && fieldErrors.businessType && (
            <p id="business-type-error" className="mt-1.5 text-sm text-alert" role="alert">
              {fieldErrors.businessType}
            </p>
          )}
        </div>

        {/* Contact name */}
        <div>
          <label htmlFor="waitlist-contact-name" className="block text-sm font-medium text-ink mb-1.5">
            Contact name <span className="text-alert">*</span>
          </label>
          <input
            id="waitlist-contact-name"
            type="text"
            value={formData.contactName}
            onChange={(e) => handleFieldChange("contactName", e.target.value)}
            onBlur={() => handleBlur("contactName")}
            placeholder="Your full name"
            className={`w-full px-3 py-2.5 border rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui ${
              touched.contactName && fieldErrors.contactName
                ? "border-alert"
                : "border-sand-300"
            }`}
            required
            aria-invalid={touched.contactName && !!fieldErrors.contactName}
            aria-describedby={
              touched.contactName && fieldErrors.contactName
                ? "contact-name-error"
                : undefined
            }
          />
          {touched.contactName && fieldErrors.contactName && (
            <p id="contact-name-error" className="mt-1.5 text-sm text-alert" role="alert">
              {fieldErrors.contactName}
            </p>
          )}
        </div>

        {/* Work email */}
        <div>
          <label htmlFor="waitlist-email" className="block text-sm font-medium text-ink mb-1.5">
            Work email <span className="text-alert">*</span>
          </label>
          <input
            id="waitlist-email"
            type="email"
            value={formData.workEmail}
            onChange={(e) => handleFieldChange("workEmail", e.target.value)}
            onBlur={() => handleBlur("workEmail")}
            placeholder="you@organisation.com"
            className={`w-full px-3 py-2.5 border rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui ${
              touched.workEmail && fieldErrors.workEmail
                ? "border-alert"
                : "border-sand-300"
            }`}
            required
            autoFocus
            aria-invalid={touched.workEmail && !!fieldErrors.workEmail}
            aria-describedby={
              touched.workEmail && fieldErrors.workEmail
                ? "email-error"
                : undefined
            }
          />
          {touched.workEmail && fieldErrors.workEmail && (
            <p id="email-error" className="mt-1.5 text-sm text-alert" role="alert">
              {fieldErrors.workEmail}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="waitlist-role" className="block text-sm font-medium text-ink mb-1.5">
            Role
          </label>
          <input
            id="waitlist-role"
            type="text"
            value={formData.role}
            onChange={(e) => handleFieldChange("role", e.target.value)}
            placeholder="e.g. Credit Manager, COO"
            className="w-full px-3 py-2.5 border border-sand-300 rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
          />
        </div>

        {/* Estimated monthly assessments */}
        <div>
          <label htmlFor="waitlist-assessments" className="block text-sm font-medium text-ink mb-1.5">
            Estimated monthly assessments
          </label>
          <select
            id="waitlist-assessments"
            value={formData.estimatedAssessments}
            onChange={(e) => handleFieldChange("estimatedAssessments", e.target.value)}
            className="w-full px-3 py-2.5 border border-sand-300 rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui appearance-none bg-white"
          >
            <option value="">Select a range</option>
            {ESTIMATED_ASSESSMENTS.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        {/* Intended use */}
        <div>
          <label htmlFor="waitlist-intended-use" className="block text-sm font-medium text-ink mb-1.5">
            How do you plan to use Hola Credit?
          </label>
          <textarea
            id="waitlist-intended-use"
            value={formData.intendedUse}
            onChange={(e) => handleFieldChange("intendedUse", e.target.value)}
            placeholder="Tell us about your use case..."
            rows={3}
            className="w-full px-3 py-2.5 border border-sand-300 rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui resize-none"
          />
        </div>

        {/* Consent checkbox */}
        <div>
          <div className="flex items-start gap-3">
            <input
              id="waitlist-consent"
              type="checkbox"
              checked={formData.consentToContact}
              onChange={(e) => handleFieldChange("consentToContact", e.target.checked)}
              onBlur={() => handleBlur("consentToContact")}
              className="mt-1 h-4 w-4 rounded border-sand-300 text-teal-400 focus:ring-teal-400"
              required
              aria-invalid={touched.consentToContact && !!fieldErrors.consentToContact}
              aria-describedby={
                touched.consentToContact && fieldErrors.consentToContact
                  ? "consent-error"
                  : undefined
              }
            />
            <label htmlFor="waitlist-consent" className="text-sm text-ink/70">
              I consent to being contacted about Hola Credit pilot access and agree to the{" "}
              <Link href="/privacy" className="text-teal-500 hover:text-teal-600 underline underline-offset-2" target="_blank">
                Privacy Policy
              </Link>{" "}
              <span className="text-alert">*</span>
            </label>
          </div>
          {touched.consentToContact && fieldErrors.consentToContact && (
            <p id="consent-error" className="mt-1.5 text-sm text-alert ml-7" role="alert">
              {fieldErrors.consentToContact}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          {isSubmitting ? "Submitting\u2026" : "Join the waitlist"}
        </button>

        <p className="text-xs text-ink/50 text-center">
          We&apos;ll only use your email to notify you about pilot access. No spam, no sharing.
        </p>
      </form>
    </div>
  );
}
