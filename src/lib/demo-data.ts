// =============================================================================
// Hola Credit — Central Synthetic Data File
// All data is DEMO ONLY. No real people, IDs, or financial information.
// =============================================================================

// ---- Types ----

export type ApplicationStatus =
  | "draft"
  | "consented"
  | "uploaded"
  | "processing"
  | "needs_review"
  | "ready"
  | "reviewed"
  | "archived"
  | "cancelled"
  | "failed";

export type ConsentStatus = "active" | "expired" | "withdrawn";
export type DataQuality = "sufficient" | "limited" | "needs_review";
export type Trend = "improving" | "stable" | "declining" | "uncertain";
export type FlagSeverity = "information" | "review" | "material";

export interface DemoBorrower {
  id: string;
  displayName: string;
  localReference: string;
  occupation: string;
  bank: string;
  createdAt: string;
}

export interface DemoAssessmentFlag {
  code: string;
  severity: FlagSeverity;
  description: string;
  evidenceTransactionIds: string[];
}

export interface DemoAssessment {
  scoreRunId: string;
  statementPeriod: { from: string; to: string };
  dataQuality: DataQuality;
  extractionConfidence: number;
  incomeFloorMinor: number;
  consistency: number;
  volatility: number;
  trend: Trend;
  score: number | null;
  tier: string | null;
  scoringPolicyVersion: string;
  extractionModelVersion: string;
  flags: DemoAssessmentFlag[];
  limitations: string[];
}

export interface DemoTransaction {
  id: string;
  postedDate: string;
  description: string;
  amountMinor: number;
  direction: "credit" | "debit";
  category: string;
  confidence: number;
}

export interface DemoApplication {
  id: string;
  reference: string;
  borrowerId: string;
  status: ApplicationStatus;
  productType: string;
  requestedAmount: string;
  assessmentPurpose: string;
  consentStatus: ConsentStatus;
  consentCapturedAt: string;
  consentExpiresAt: string;
  createdAt: string;
  assignedTo: string;
  assessment: DemoAssessment | null;
  transactions: DemoTransaction[];
}

export interface DemoConsentRecord {
  id: string;
  borrowerId: string;
  applicantName: string;
  purpose: string;
  status: ConsentStatus;
  capturedDate: string;
  expiryDate: string;
  applicationReference: string;
}

export interface DemoAuditEntry {
  id: string;
  action: string;
  actor: string;
  resource: string;
  timestamp: string;
  details: string;
}

export type TeamRole = "org_owner" | "risk_manager" | "loan_officer" | "compliance_auditor" | "hola_reviewer" | "system_admin";
export type MemberStatus = "active" | "invited" | "suspended";

export interface DemoTeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  mfaEnabled: boolean;
  joinedAt: string;
}

// ---- Borrowers ----

export const demoBorrowers: DemoBorrower[] = [
  {
    id: "bor_demo_001",
    displayName: "Maria K.",
    localReference: "BRW-00142",
    occupation: "Market vendor — Okuryangava",
    bank: "FNB Namibia",
    createdAt: "2024-01-15",
  },
  {
    id: "bor_demo_002",
    displayName: "Thomas M.",
    localReference: "BRW-00138",
    occupation: "Taxi operator — Windhoek",
    bank: "Bank Windhoek",
    createdAt: "2024-02-03",
  },
  {
    id: "bor_demo_003",
    displayName: "Anna P.",
    localReference: "BRW-00140",
    occupation: "Hair salon owner — Katutura",
    bank: "Standard Bank Namibia",
    createdAt: "2024-02-18",
  },
  {
    id: "bor_demo_004",
    displayName: "Johan V.",
    localReference: "BRW-00141",
    occupation: "Freelance mechanic — Walvis Bay",
    bank: "Nedbank Namibia",
    createdAt: "2024-03-01",
  },
  {
    id: "bor_demo_005",
    displayName: "Linea N.",
    localReference: "BRW-00143",
    occupation: "Crafts seller — Swakopmund",
    bank: "FNB Namibia",
    createdAt: "2024-03-05",
  },
  {
    id: "bor_demo_006",
    displayName: "David H.",
    localReference: "BRW-00144",
    occupation: "Small-scale farmer — Oshikoto",
    bank: "Bank Windhoek",
    createdAt: "2024-03-10",
  },
  {
    id: "bor_demo_007",
    displayName: "Selma A.",
    localReference: "BRW-00145",
    occupation: "Tailor — Oshakati",
    bank: "Standard Bank Namibia",
    createdAt: "2024-03-15",
  },
];

// ---- Transactions helper ----

function makeTransactions(borrowerId: string, pattern: "stable" | "irregular" | "declining"): DemoTransaction[] {
  const baseTransactions: DemoTransaction[] = [];
  const months = ["2024-01", "2024-02", "2024-03"];
  let txId = 0;

  const incomes: Record<string, number[]> = {
    stable: [820000, 815000, 830000],
    irregular: [620000, 980000, 710000],
    declining: [950000, 780000, 610000],
  };

  const expenses: Record<string, number[]> = {
    stable: [450000, 460000, 455000],
    irregular: [400000, 720000, 510000],
    declining: [500000, 550000, 600000],
  };

  months.forEach((month, mi) => {
    const income = incomes[pattern][mi];
    const expense = expenses[pattern][mi];

    // Income entries
    baseTransactions.push({
      id: `${borrowerId}_tx_${++txId}`,
      postedDate: `${month}-05`,
      description: "EFT credit — client payment",
      amountMinor: Math.round(income * 0.6),
      direction: "credit",
      category: "earned_income",
      confidence: 0.92,
    });
    baseTransactions.push({
      id: `${borrowerId}_tx_${++txId}`,
      postedDate: `${month}-15`,
      description: "Cash deposit — trading income",
      amountMinor: Math.round(income * 0.4),
      direction: "credit",
      category: "cash_deposit",
      confidence: 0.85,
    });

    // Expense entries
    baseTransactions.push({
      id: `${borrowerId}_tx_${++txId}`,
      postedDate: `${month}-01`,
      description: "Debit order — rent",
      amountMinor: Math.round(expense * 0.35),
      direction: "debit",
      category: "essential_expense",
      confidence: 0.95,
    });
    baseTransactions.push({
      id: `${borrowerId}_tx_${++txId}`,
      postedDate: `${month}-10`,
      description: "EFT — supplier payment",
      amountMinor: Math.round(expense * 0.3),
      direction: "debit",
      category: "transfer_out",
      confidence: 0.88,
    });
    baseTransactions.push({
      id: `${borrowerId}_tx_${++txId}`,
      postedDate: `${month}-20`,
      description: "Cash withdrawal",
      amountMinor: Math.round(expense * 0.2),
      direction: "debit",
      category: "cash_withdrawal",
      confidence: 0.91,
    });
    baseTransactions.push({
      id: `${borrowerId}_tx_${++txId}`,
      postedDate: `${month}-25`,
      description: "Bank fee — monthly service",
      amountMinor: 15000,
      direction: "debit",
      category: "fee",
      confidence: 0.99,
    });

    // Add uncertain transaction for irregular
    if (pattern === "irregular" && mi === 1) {
      baseTransactions.push({
        id: `${borrowerId}_tx_${++txId}`,
        postedDate: `${month}-22`,
        description: "Transfer — unknown source",
        amountMinor: 350000,
        direction: "credit",
        category: "uncertain",
        confidence: 0.45,
      });
    }
  });

  return baseTransactions;
}

// ---- Assessments ----

function makeAssessment(
  pattern: "stable" | "irregular" | "declining",
  overrides?: Partial<DemoAssessment>
): DemoAssessment {
  const configs: Record<string, Omit<DemoAssessment, "flags" | "limitations" | "transactions">> = {
    stable: {
      scoreRunId: "sr_demo_stable",
      statementPeriod: { from: "2024-01-01", to: "2024-03-31" },
      dataQuality: "sufficient",
      extractionConfidence: 0.88,
      incomeFloorMinor: 815000,
      consistency: 0.82,
      volatility: 0.12,
      trend: "stable",
      score: 72,
      tier: "good",
      scoringPolicyVersion: "1.0.0",
      extractionModelVersion: "1.0.0",
    },
    irregular: {
      scoreRunId: "sr_demo_irregular",
      statementPeriod: { from: "2024-01-01", to: "2024-03-31" },
      dataQuality: "limited",
      extractionConfidence: 0.72,
      incomeFloorMinor: 620000,
      consistency: 0.48,
      volatility: 0.54,
      trend: "uncertain",
      score: 44,
      tier: "moderate",
      scoringPolicyVersion: "1.0.0",
      extractionModelVersion: "1.0.0",
    },
    declining: {
      scoreRunId: "sr_demo_declining",
      statementPeriod: { from: "2024-01-01", to: "2024-03-31" },
      dataQuality: "limited",
      extractionConfidence: 0.76,
      incomeFloorMinor: 610000,
      consistency: 0.35,
      volatility: 0.62,
      trend: "declining",
      score: 31,
      tier: "limited",
      scoringPolicyVersion: "1.0.0",
      extractionModelVersion: "1.0.0",
    },
  };

  const base = configs[pattern];

  const flagsMap: Record<string, DemoAssessmentFlag[]> = {
    stable: [
      {
        code: "consistent_deposit_pattern",
        severity: "information",
        description: "Regular monthly deposits identified with a standard deviation of 12%.",
        evidenceTransactionIds: [],
      },
    ],
    irregular: [
      {
        code: "high_income_concentration",
        severity: "review",
        description: "A single client payment source accounts for more than 60% of total income.",
        evidenceTransactionIds: [],
      },
      {
        code: "uncertain_transactions",
        severity: "review",
        description: "1 transaction could not be reliably categorised and requires manual review.",
        evidenceTransactionIds: [],
      },
    ],
    declining: [
      {
        code: "declining_income_trend",
        severity: "material",
        description: "Monthly income has declined by 36% over the statement period.",
        evidenceTransactionIds: [],
      },
      {
        code: "negative_balance_signal",
        severity: "review",
        description: "One debit order was returned unpaid in the statement period.",
        evidenceTransactionIds: [],
      },
    ],
  };

  const limitationsMap: Record<string, string[]> = {
    stable: [
      "Assessment is based on cash-flow patterns only and does not incorporate credit bureau data.",
      "Predictive validity against repayment outcomes has not yet been established for this scoring policy version.",
      "This assessment is supplementary to formal bureau checks and human judgement. It does not constitute a lending decision.",
    ],
    irregular: [
      "Data quality is limited. Assessment should be reviewed alongside other evidence.",
      "1 transaction could not be reliably categorised and requires manual review.",
      "Income volatility is high; the income floor may not reflect sustained earning capacity.",
      "Predictive validity against repayment outcomes has not yet been established for this scoring policy version.",
      "This assessment is supplementary to formal bureau checks and human judgement. It does not constitute a lending decision.",
    ],
    declining: [
      "Data quality is limited. Assessment should be reviewed alongside other evidence.",
      "Income trend is declining over the statement period.",
      "A debit order was returned unpaid, which may indicate cash-flow pressure.",
      "Predictive validity against repayment outcomes has not yet been established for this scoring policy version.",
      "This assessment is supplementary to formal bureau checks and human judgement. It does not constitute a lending decision.",
    ],
  };

  return {
    ...base,
    flags: flagsMap[pattern],
    limitations: limitationsMap[pattern],
    ...overrides,
  };
}

// ---- Applications ----

export const demoApplications: DemoApplication[] = [
  {
    id: "app_demo_001",
    reference: "LN-2024-00142",
    borrowerId: "bor_demo_001",
    status: "ready",
    productType: "Personal loan",
    requestedAmount: "NAD 15,000",
    assessmentPurpose: "New credit application",
    consentStatus: "active",
    consentCapturedAt: "2024-03-12",
    consentExpiresAt: "2024-06-10",
    createdAt: "2024-03-12",
    assignedTo: "Loan Officer",
    assessment: makeAssessment("stable"),
    transactions: makeTransactions("bor_demo_001", "stable"),
  },
  {
    id: "app_demo_002",
    reference: "LN-2024-00138",
    borrowerId: "bor_demo_002",
    status: "needs_review",
    productType: "Microfinance loan",
    requestedAmount: "NAD 8,000",
    assessmentPurpose: "New credit application",
    consentStatus: "active",
    consentCapturedAt: "2024-03-11",
    consentExpiresAt: "2024-06-09",
    createdAt: "2024-03-11",
    assignedTo: "Risk Manager",
    assessment: makeAssessment("irregular"),
    transactions: makeTransactions("bor_demo_002", "irregular"),
  },
  {
    id: "app_demo_003",
    reference: "LN-2024-00140",
    borrowerId: "bor_demo_003",
    status: "processing",
    productType: "Retail credit",
    requestedAmount: "NAD 5,500",
    assessmentPurpose: "New credit application",
    consentStatus: "active",
    consentCapturedAt: "2024-03-12",
    consentExpiresAt: "2024-06-10",
    createdAt: "2024-03-12",
    assignedTo: "Loan Officer",
    assessment: null,
    transactions: [],
  },
  {
    id: "app_demo_004",
    reference: "LN-2024-00141",
    borrowerId: "bor_demo_004",
    status: "reviewed",
    productType: "Vehicle finance",
    requestedAmount: "NAD 45,000",
    assessmentPurpose: "New credit application",
    consentStatus: "active",
    consentCapturedAt: "2024-03-10",
    consentExpiresAt: "2024-06-08",
    createdAt: "2024-03-10",
    assignedTo: "Risk Manager",
    assessment: makeAssessment("stable", { score: 81, tier: "strong" }),
    transactions: makeTransactions("bor_demo_004", "stable"),
  },
  {
    id: "app_demo_005",
    reference: "LN-2024-00143",
    borrowerId: "bor_demo_005",
    status: "draft",
    productType: "Personal loan",
    requestedAmount: "NAD 12,000",
    assessmentPurpose: "Credit limit increase",
    consentStatus: "active",
    consentCapturedAt: "2024-03-15",
    consentExpiresAt: "2024-06-13",
    createdAt: "2024-03-15",
    assignedTo: "Loan Officer",
    assessment: null,
    transactions: [],
  },
  {
    id: "app_demo_006",
    reference: "LN-2024-00144",
    borrowerId: "bor_demo_006",
    status: "ready",
    productType: "Business loan",
    requestedAmount: "NAD 25,000",
    assessmentPurpose: "New credit application",
    consentStatus: "active",
    consentCapturedAt: "2024-03-10",
    consentExpiresAt: "2024-06-08",
    createdAt: "2024-03-10",
    assignedTo: "Risk Manager",
    assessment: makeAssessment("declining"),
    transactions: makeTransactions("bor_demo_006", "declining"),
  },
  {
    id: "app_demo_007",
    reference: "LN-2024-00145",
    borrowerId: "bor_demo_007",
    status: "consented",
    productType: "Microfinance loan",
    requestedAmount: "NAD 6,000",
    assessmentPurpose: "Account review",
    consentStatus: "active",
    consentCapturedAt: "2024-03-16",
    consentExpiresAt: "2024-06-14",
    createdAt: "2024-03-16",
    assignedTo: "Loan Officer",
    assessment: null,
    transactions: [],
  },
  {
    id: "app_demo_008",
    reference: "LN-2024-00135",
    borrowerId: "bor_demo_002",
    status: "failed",
    productType: "Personal loan",
    requestedAmount: "NAD 10,000",
    assessmentPurpose: "New credit application",
    consentStatus: "expired",
    consentCapturedAt: "2024-02-01",
    consentExpiresAt: "2024-05-01",
    createdAt: "2024-02-01",
    assignedTo: "Loan Officer",
    assessment: null,
    transactions: [],
  },
];

// ---- Consents ----

export const demoConsents: DemoConsentRecord[] = [
  {
    id: "con_demo_001",
    borrowerId: "bor_demo_001",
    applicantName: "Maria K.",
    purpose: "Cash-flow credit assessment — Personal loan",
    status: "active",
    capturedDate: "2024-03-12",
    expiryDate: "2024-06-10",
    applicationReference: "LN-2024-00142",
  },
  {
    id: "con_demo_002",
    borrowerId: "bor_demo_002",
    applicantName: "Thomas M.",
    purpose: "Cash-flow credit assessment — Microfinance loan",
    status: "active",
    capturedDate: "2024-03-11",
    expiryDate: "2024-06-09",
    applicationReference: "LN-2024-00138",
  },
  {
    id: "con_demo_003",
    borrowerId: "bor_demo_003",
    applicantName: "Anna P.",
    purpose: "Cash-flow credit assessment — Retail credit",
    status: "active",
    capturedDate: "2024-03-12",
    expiryDate: "2024-06-10",
    applicationReference: "LN-2024-00140",
  },
  {
    id: "con_demo_004",
    borrowerId: "bor_demo_004",
    applicantName: "Johan V.",
    purpose: "Cash-flow credit assessment — Vehicle finance",
    status: "active",
    capturedDate: "2024-03-10",
    expiryDate: "2024-06-08",
    applicationReference: "LN-2024-00141",
  },
  {
    id: "con_demo_005",
    borrowerId: "bor_demo_005",
    applicantName: "Linea N.",
    purpose: "Cash-flow credit assessment — Personal loan",
    status: "active",
    capturedDate: "2024-03-15",
    expiryDate: "2024-06-13",
    applicationReference: "LN-2024-00143",
  },
  {
    id: "con_demo_006",
    borrowerId: "bor_demo_006",
    applicantName: "David H.",
    purpose: "Cash-flow credit assessment — Business loan",
    status: "active",
    capturedDate: "2024-03-10",
    expiryDate: "2024-06-08",
    applicationReference: "LN-2024-00144",
  },
  {
    id: "con_demo_007",
    borrowerId: "bor_demo_007",
    applicantName: "Selma A.",
    purpose: "Cash-flow credit assessment — Microfinance loan",
    status: "active",
    capturedDate: "2024-03-16",
    expiryDate: "2024-06-14",
    applicationReference: "LN-2024-00145",
  },
  {
    id: "con_demo_008",
    borrowerId: "bor_demo_002",
    applicantName: "Thomas M.",
    purpose: "Cash-flow credit assessment — Personal loan",
    status: "expired",
    capturedDate: "2024-02-01",
    expiryDate: "2024-05-01",
    applicationReference: "LN-2024-00135",
  },
  {
    id: "con_demo_009",
    borrowerId: "bor_demo_001",
    applicantName: "Maria K.",
    purpose: "Cash-flow credit assessment — Retail credit",
    status: "withdrawn",
    capturedDate: "2023-12-10",
    expiryDate: "2024-03-10",
    applicationReference: "LN-2024-00120",
  },
];

// ---- Audit Log ----

export const demoAuditEntries: DemoAuditEntry[] = [
  {
    id: "ae_001",
    action: "auth.login",
    actor: "Admin User",
    resource: "Session",
    timestamp: "2024-03-16 08:30",
    details: "Logged in from 196.216.xx.xx (Windhoek)",
  },
  {
    id: "ae_002",
    action: "application.created",
    actor: "Loan Officer",
    resource: "LN-2024-00145",
    timestamp: "2024-03-16 09:02",
    details: "Created application for Selma A. — Microfinance loan",
  },
  {
    id: "ae_003",
    action: "consent.captured",
    actor: "Loan Officer",
    resource: "Consent #C-00145",
    timestamp: "2024-03-16 09:03",
    details: "Captured consent for cash-flow assessment",
  },
  {
    id: "ae_004",
    action: "application.created",
    actor: "Loan Officer",
    resource: "LN-2024-00143",
    timestamp: "2024-03-15 11:20",
    details: "Created application for Linea N. — Personal loan",
  },
  {
    id: "ae_005",
    action: "consent.captured",
    actor: "Loan Officer",
    resource: "Consent #C-00143",
    timestamp: "2024-03-15 11:22",
    details: "Captured consent for cash-flow assessment",
  },
  {
    id: "ae_006",
    action: "application.submitted",
    actor: "Loan Officer",
    resource: "LN-2024-00142",
    timestamp: "2024-03-12 09:25",
    details: "Submitted application with 3 bank statements",
  },
  {
    id: "ae_007",
    action: "application.created",
    actor: "Loan Officer",
    resource: "LN-2024-00142",
    timestamp: "2024-03-12 09:22",
    details: "Created application for Maria K. — Personal loan",
  },
  {
    id: "ae_008",
    action: "consent.captured",
    actor: "Loan Officer",
    resource: "Consent #C-00142",
    timestamp: "2024-03-12 09:23",
    details: "Captured consent for cash-flow assessment",
  },
  {
    id: "ae_009",
    action: "application.reviewed",
    actor: "Risk Manager",
    resource: "LN-2024-00141",
    timestamp: "2024-03-12 10:45",
    details: "Reviewed and marked as complete — Johan V. Vehicle finance",
  },
  {
    id: "ae_010",
    action: "application.submitted",
    actor: "Loan Officer",
    resource: "LN-2024-00138",
    timestamp: "2024-03-11 14:30",
    details: "Submitted application with 3 bank statements — Thomas M.",
  },
  {
    id: "ae_011",
    action: "member.invited",
    actor: "Admin User",
    resource: "Member invitation",
    timestamp: "2024-03-11 14:30",
    details: "Invited reviewer@demo.na as Hola Reviewer",
  },
  {
    id: "ae_012",
    action: "settings.updated",
    actor: "Admin User",
    resource: "Organisation settings",
    timestamp: "2024-03-10 11:45",
    details: "Updated compliance profile with new license number",
  },
  {
    id: "ae_013",
    action: "member.role_changed",
    actor: "Admin User",
    resource: "Team member",
    timestamp: "2024-03-10 11:50",
    details: "Changed reviewer@demo.na from Viewer to Hola Reviewer",
  },
  {
    id: "ae_014",
    action: "consent.withdrawn",
    actor: "Loan Officer",
    resource: "Consent #C-00120",
    timestamp: "2024-03-08 10:15",
    details: "Consent withdrawn by borrower — Maria K. — Retail credit",
  },
  {
    id: "ae_015",
    action: "auth.logout",
    actor: "Loan Officer",
    resource: "Session",
    timestamp: "2024-03-09 17:30",
    details: "Logged out",
  },
  {
    id: "ae_016",
    action: "auth.login",
    actor: "Loan Officer",
    resource: "Session",
    timestamp: "2024-03-12 09:14",
    details: "Logged in from 196.216.xx.xx (Windhoek)",
  },
];

// ---- Team ----

export const demoTeamMembers: DemoTeamMember[] = [
  {
    id: "tm_001",
    name: "Admin User",
    email: "admin@demo.na",
    role: "org_owner",
    status: "active",
    mfaEnabled: true,
    joinedAt: "2024-01-05",
  },
  {
    id: "tm_002",
    name: "Loan Officer",
    email: "officer@demo.na",
    role: "loan_officer",
    status: "active",
    mfaEnabled: true,
    joinedAt: "2024-01-10",
  },
  {
    id: "tm_003",
    name: "Risk Manager",
    email: "risk@demo.na",
    role: "risk_manager",
    status: "active",
    mfaEnabled: true,
    joinedAt: "2024-01-12",
  },
  {
    id: "tm_004",
    name: "Hola Reviewer",
    email: "reviewer@demo.na",
    role: "hola_reviewer",
    status: "invited",
    mfaEnabled: false,
    joinedAt: "2024-03-11",
  },
  {
    id: "tm_005",
    name: "Compliance Auditor",
    email: "compliance@demo.na",
    role: "compliance_auditor",
    status: "active",
    mfaEnabled: true,
    joinedAt: "2024-02-01",
  },
];

// ---- Role descriptions ----

export const roleDescriptions: Record<TeamRole, { label: string; description: string }> = {
  org_owner: {
    label: "Organisation owner",
    description: "Full access to all features, team management, and settings. Can manage billing and compliance profile.",
  },
  risk_manager: {
    label: "Risk manager",
    description: "Review and approve or decline assessments. Access to all applications and audit logs. Can manage review workflows.",
  },
  loan_officer: {
    label: "Loan officer",
    description: "Create and manage applications, upload statements, capture consent, and view assessments.",
  },
  compliance_auditor: {
    label: "Compliance auditor",
    description: "Read-only access to applications, consents, and audit logs. Can export compliance reports.",
  },
  hola_reviewer: {
    label: "Hola Credit reviewer",
    description: "Internal Hola Credit role for reviewing low-confidence extractions and model quality. Restricted to admin areas.",
  },
  system_admin: {
    label: "System admin",
    description: "Full platform access including system health, model runs, and configuration. Hola Credit internal role.",
  },
};

// ---- Organisation ----

export const demoOrganisation = {
  name: "Demo Lender",
  registeredName: "Demo Microfinance (Pty) Ltd",
  businessType: "Microfinance institution",
  regulatoryBody: "Bank of Namibia",
  licenseNumber: "MFI-2024-0042",
  dataProcessingOfficer: "admin@demo.na",
  status: "approved" as const,
};

// ---- Status config helpers ----

export const applicationStatusConfig: Record<ApplicationStatus, { label: string; className: string; dotClassName: string }> = {
  draft: { label: "Draft", className: "bg-sand-100 text-ink/60", dotClassName: "bg-ink/40" },
  consented: { label: "Consented", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  uploaded: { label: "Uploaded", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  processing: { label: "Processing", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400 animate-pulse" },
  needs_review: { label: "Needs review", className: "bg-amber-50 text-warning", dotClassName: "bg-warning" },
  ready: { label: "Ready", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  reviewed: { label: "Reviewed", className: "bg-sand-100 text-ink/60", dotClassName: "bg-ink/40" },
  archived: { label: "Archived", className: "bg-sand-100 text-ink/40", dotClassName: "bg-ink/30" },
  cancelled: { label: "Cancelled", className: "bg-sand-100 text-ink/40", dotClassName: "bg-ink/30" },
  failed: { label: "Failed", className: "bg-red-50 text-alert", dotClassName: "bg-alert" },
};

export const consentStatusConfig: Record<ConsentStatus, { label: string; className: string; dotClassName: string }> = {
  active: { label: "Active", className: "bg-teal-50 text-teal-500", dotClassName: "bg-teal-400" },
  expired: { label: "Expired", className: "bg-sand-100 text-ink/50", dotClassName: "bg-ink/30" },
  withdrawn: { label: "Withdrawn", className: "bg-red-50 text-alert", dotClassName: "bg-alert" },
};

// ---- Helper functions ----

export function getBorrowerById(id: string): DemoBorrower | undefined {
  return demoBorrowers.find((b) => b.id === id);
}

export function getApplicationsForBorrower(borrowerId: string): DemoApplication[] {
  return demoApplications.filter((a) => a.borrowerId === borrowerId);
}

export function getConsentsForBorrower(borrowerId: string): DemoConsentRecord[] {
  return demoConsents.filter((c) => c.borrowerId === borrowerId);
}

export function getApplicationById(id: string): DemoApplication | undefined {
  return demoApplications.find((a) => a.id === id);
}

export function formatNAD(minor: number): string {
  return `NAD ${(minor / 100).toLocaleString("en-NA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatNADShort(minor: number): string {
  const nad = minor / 100;
  if (nad >= 1000) return `NAD ${nad.toLocaleString("en-NA", { maximumFractionDigits: 0 })}`;
  return `NAD ${nad.toFixed(2)}`;
}
