import { z } from "zod";

// ============ Pilot Request Form ============

export const pilotRequestSchema = z.object({
  organisationName: z.string().min(2, "Organisation name is required"),
  businessType: z.enum([
    "microlender",
    "retail_credit",
    "credit_provider",
    "other",
  ]),
  workEmail: z.string().email("Valid work email is required"),
  role: z.string().min(2, "Your role is required"),
  expectedMonthlyAssessments: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "200+",
  ]),
  intendedUse: z.string().min(10, "Please describe your intended use"),
});

export type PilotRequest = z.infer<typeof pilotRequestSchema>;

// ============ New Application ============

export const newApplicationSchema = z.object({
  lenderReference: z.string().optional(),
  borrowerDisplayName: z.string().min(2, "Applicant display name is required"),
  productType: z.enum([
    "cash_loan",
    "retail_credit",
    "account_opening",
    "other",
  ]),
  requestedAmountMinor: z.number().optional(),
  assessmentPurpose: z.string().min(10, "Assessment purpose is required"),
});

export type NewApplication = z.infer<typeof newApplicationSchema>;

// ============ Consent Capture ============

export const consentCaptureSchema = z.object({
  purpose: z.string(),
  scope: z.string(),
  dataCategories: z.array(z.string()),
  retentionPeriod: z.string(),
  sharingScope: z.string(),
  expiresAt: z.string().optional(),
  borrowerAcknowledged: z.literal(true),
});

export type ConsentCapture = z.infer<typeof consentCaptureSchema>;

// ============ Statement Upload ============

export const statementUploadSchema = z.object({
  fileName: z.string(),
  fileType: z.enum(["pdf", "png", "jpeg"]),
  fileSize: z.number().max(20 * 1024 * 1024, "File must be under 20MB"),
});

export type StatementUpload = z.infer<typeof statementUploadSchema>;

// ============ Review ============

export const reviewSchema = z.object({
  notes: z.string().optional(),
  decision: z.enum(["approved", "declined", "deferred", "referred"]).optional(),
  decisionNotes: z.string().optional(),
});

export type Review = z.infer<typeof reviewSchema>;

// ============ Organisation ============

export const organisationSchema = z.object({
  name: z.string().min(2, "Organisation name is required"),
  businessType: z.string().min(2, "Business type is required"),
});

export type Organisation = z.infer<typeof organisationSchema>;

export const complianceProfileSchema = z.object({
  registeredName: z.string().min(2, "Registered name is required"),
  regulatoryBody: z.string().optional(),
  licenseNumber: z.string().optional(),
  dataProcessingOfficer: z.string().optional(),
  acceptTerms: z.literal(true),
  acceptDataProcessing: z.literal(true),
});

export type ComplianceProfile = z.infer<typeof complianceProfileSchema>;

// ============ Team Invitation ============

export const teamInvitationSchema = z.object({
  email: z.string().email("Valid email is required"),
  role: z.enum([
    "risk_manager",
    "loan_officer",
    "compliance_auditor",
  ]),
});

export type TeamInvitation = z.infer<typeof teamInvitationSchema>;
