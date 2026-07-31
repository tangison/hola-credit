/* Convex client configuration */
export const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";

// Scoring engine version
export const SCORING_POLICY_VERSION = "1.0.0";
export const EXTRACTION_MODEL_VERSION = "1.0.0";

// Supported file types
export const SUPPORTED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg"] as const;
export const SUPPORTED_EXTENSIONS = ["pdf", "png", "jpeg", "jpg"] as const;
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

// Namibian banks
export const SUPPORTED_BANKS = [
  "FNB Namibia",
  "Bank Windhoek",
  "Standard Bank Namibia",
  "Nedbank Namibia",
] as const;

// Transaction categories
export const TRANSACTION_CATEGORIES = [
  "earned_income",
  "transfer_in",
  "cash_deposit",
  "loan_proceeds",
  "essential_expense",
  "debt_payment",
  "fee",
  "cash_withdrawal",
  "transfer_out",
  "other",
  "uncertain",
] as const;

// Roles
export const ROLES = [
  "org_owner",
  "risk_manager",
  "loan_officer",
  "compliance_auditor",
  "hola_reviewer",
  "system_admin",
] as const;

// Application statuses
export const APPLICATION_STATUSES = [
  "draft",
  "consented",
  "uploaded",
  "processing",
  "needs_review",
  "ready",
  "reviewed",
  "archived",
  "cancelled",
  "failed",
  "consent_withdrawn",
] as const;

// Product contact
export const PRODUCT_EMAIL = "hola@tangison.com";
export const PRODUCT_DOMAIN = "https://hola.tangison.com";
export const TANGISON_URL = "https://tangison.com";
