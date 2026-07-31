import { z } from "zod";

// ============ Zod Schemas ============

export const TransactionSchema = z.object({
  sourcePage: z.number(),
  sourceRow: z.string().optional(),
  postedDate: z.string(),
  valueDate: z.string().optional(),
  description: z.string(),
  amountMinor: z.number(),
  direction: z.enum(["credit", "debit"]),
  currency: z.literal("NAD"),
  category: z.enum([
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
  ]),
  confidence: z.number().min(0).max(1),
  evidenceHash: z.string(),
});

export const AssessmentSchema = z.object({
  scoreRunId: z.string(),
  statementPeriod: z.object({ from: z.string(), to: z.string() }),
  dataQuality: z.enum(["sufficient", "limited", "needs_review"]),
  extractionConfidence: z.number(),
  incomeFloorMinor: z.number().nullable(),
  consistency: z.number().nullable(),
  volatility: z.number().nullable(),
  trend: z.enum(["improving", "stable", "declining", "uncertain"]),
  flags: z.array(z.object({
    code: z.string(),
    severity: z.enum(["information", "review", "material"]),
    evidenceTransactionIds: z.array(z.string()),
  })),
  score: z.number().nullable(),
  tier: z.string().nullable(),
  scoringPolicyVersion: z.string(),
  extractionModelVersion: z.string(),
  limitations: z.array(z.string()),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;

// ============ Scoring Policy ============

export const ScoringPolicyV1 = {
  version: "1.0.0",
  weights: {
    incomeFloor: 0.25,
    consistency: 0.20,
    volatility: 0.10,
    trend: 0.10,
    concentration: 0.10,
    redFlags: 0.15,
    dataSufficiency: 0.10,
  },
  thresholds: {
    minTransactions: 10,
    minStatementMonths: 2,
    minConfidence: 0.6,
    highConcentration: 0.7,
    negativeBalanceFlag: true,
  },
};

// ============ Deterministic Scoring Engine ============

export function calculateAssessment(
  transactions: Transaction[],
  statementPeriod: { from: string; to: string },
  policy: typeof ScoringPolicyV1,
  extractionConfidence: number,
  extractionModelVersion: string,
): Assessment {
  const incomeCategories = new Set(["earned_income", "transfer_in", "cash_deposit"]);
  const expenseCategories = new Set(["essential_expense", "debt_payment", "fee", "cash_withdrawal", "transfer_out"]);

  // 1. Income floor: defensible minimum monthly income
  const incomeTransactions = transactions.filter(
    (t) => incomeCategories.has(t.category) && t.direction === "credit"
  );
  const monthlyIncome = groupByMonth(incomeTransactions);
  const incomeFloorMinor = monthlyIncome.length > 0
    ? Math.min(...monthlyIncome.map((m) => m.total))
    : null;

  // 2. Consistency: month-to-month income variation
  const consistency = monthlyIncome.length >= 2
    ? calculateConsistency(monthlyIncome.map((m) => m.total))
    : null;

  // 3. Volatility: coefficient of variation
  const volatility = monthlyIncome.length >= 2
    ? calculateVolatility(monthlyIncome.map((m) => m.total))
    : null;

  // 4. Trend: income direction over the period
  const trend = determineTrend(monthlyIncome.map((m) => m.total));

  // 5. Concentration: dependency on single source
  const concentration = calculateConcentration(incomeTransactions);
  const flags: Assessment["flags"] = [];

  if (concentration > policy.thresholds.highConcentration) {
    flags.push({
      code: "high_income_concentration",
      severity: "review",
      evidenceTransactionIds: findTopSourceTransactions(incomeTransactions),
    });
  }

  // 6. Red flags
  const negativeBalance = transactions.some(
    (t) => t.description.toLowerCase().includes("unpaid") ||
           t.description.toLowerCase().includes("bounced") ||
           t.description.toLowerCase().includes("dishonour")
  );
  if (negativeBalance) {
    flags.push({
      code: "negative_balance_signal",
      severity: "material",
      evidenceTransactionIds: transactions
        .filter((t) => t.description.toLowerCase().includes("unpaid") ||
                       t.description.toLowerCase().includes("bounced") ||
                       t.description.toLowerCase().includes("dishonour"))
        .map((t) => t.evidenceHash),
    });
  }

  // Uncertain transactions
  const uncertainCount = transactions.filter((t) => t.category === "uncertain").length;
  if (uncertainCount > 0) {
    flags.push({
      code: "uncertain_transactions",
      severity: uncertainCount > 5 ? "review" : "information",
      evidenceTransactionIds: transactions
        .filter((t) => t.category === "uncertain")
        .map((t) => t.evidenceHash),
    });
  }

  // 7. Data sufficiency
  const dataQuality = determineDataQuality(
    transactions.length,
    monthlyIncome.length,
    extractionConfidence,
    policy.thresholds,
  );

  // 8. Calculate score (deterministic)
  const score = calculateScore(
    incomeFloorMinor,
    consistency,
    volatility,
    trend,
    concentration,
    flags,
    dataQuality,
    policy,
  );

  // 9. Determine tier
  const tier = determineTier(score);

  // 10. Build limitations
  const limitations = buildLimitations(
    dataQuality,
    extractionConfidence,
    monthlyIncome.length,
    uncertainCount,
    statementPeriod,
  );

  // 11. Build explanation
  const explanation = buildExplanation(
    incomeFloorMinor,
    consistency,
    volatility,
    trend,
    flags,
    dataQuality,
    statementPeriod,
  );

  return {
    scoreRunId: `sr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    statementPeriod,
    dataQuality,
    extractionConfidence,
    incomeFloorMinor,
    consistency,
    volatility,
    trend,
    flags,
    score,
    tier,
    scoringPolicyVersion: policy.version,
    extractionModelVersion,
    limitations,
  };
}

// ============ Helper Functions ============

function groupByMonth(transactions: Transaction[]) {
  const months: Record<string, { total: number; transactions: Transaction[] }> = {};

  for (const t of transactions) {
    const month = t.postedDate.slice(0, 7); // YYYY-MM
    if (!months[month]) {
      months[month] = { total: 0, transactions: [] };
    }
    months[month].total += t.amountMinor;
    months[month].transactions.push(t);
  }

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, data]) => data);
}

function calculateConsistency(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return 0;
  const deviations = values.map((v) => Math.abs(v - mean) / mean);
  return Math.max(0, 1 - deviations.reduce((a, b) => a + b, 0) / deviations.length);
}

function calculateVolatility(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return 1;
  const variance = values.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  return Math.min(1, stdDev / mean);
}

function determineTrend(values: number[]): "improving" | "stable" | "declining" | "uncertain" {
  if (values.length < 2) return "uncertain";
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const diff = (avgSecond - avgFirst) / (avgFirst || 1);
  if (diff > 0.1) return "improving";
  if (diff < -0.1) return "declining";
  return "stable";
}

function calculateConcentration(incomeTransactions: Transaction[]): number {
  if (incomeTransactions.length === 0) return 0;
  const byDescription: Record<string, number> = {};
  let total = 0;
  for (const t of incomeTransactions) {
    const key = t.description.slice(0, 30).toLowerCase();
    byDescription[key] = (byDescription[key] || 0) + t.amountMinor;
    total += t.amountMinor;
  }
  if (total === 0) return 0;
  const maxSource = Math.max(...Object.values(byDescription));
  return maxSource / total;
}

function findTopSourceTransactions(incomeTransactions: Transaction[]): string[] {
  const byDescription: Record<string, Transaction[]> = {};
  for (const t of incomeTransactions) {
    const key = t.description.slice(0, 30).toLowerCase();
    if (!byDescription[key]) byDescription[key] = [];
    byDescription[key].push(t);
  }
  let maxKey = "";
  let maxTotal = 0;
  for (const [key, txns] of Object.entries(byDescription)) {
    const total = txns.reduce((a, t) => a + t.amountMinor, 0);
    if (total > maxTotal) {
      maxTotal = total;
      maxKey = key;
    }
  }
  return byDescription[maxKey]?.map((t) => t.evidenceHash) || [];
}

function determineDataQuality(
  transactionCount: number,
  monthCount: number,
  confidence: number,
  thresholds: typeof ScoringPolicyV1.thresholds,
): "sufficient" | "limited" | "needs_review" {
  if (transactionCount < thresholds.minTransactions) return "needs_review";
  if (monthCount < thresholds.minStatementMonths) return "limited";
  if (confidence < thresholds.minConfidence) return "needs_review";
  if (transactionCount >= thresholds.minTransactions * 2 && monthCount >= 3 && confidence >= 0.8) return "sufficient";
  return "limited";
}

function calculateScore(
  incomeFloorMinor: number | null,
  consistency: number | null,
  volatility: number | null,
  trend: "improving" | "stable" | "declining" | "uncertain",
  concentration: number,
  flags: Assessment["flags"],
  dataQuality: "sufficient" | "limited" | "needs_review",
  policy: typeof ScoringPolicyV1,
): number | null {
  if (dataQuality === "needs_review") return null;

  const w = policy.weights;
  let score = 0;

  // Income floor component (0-100)
  const incomeScore = incomeFloorMinor ? Math.min(100, (incomeFloorMinor / 500000) * 100) : 0;
  score += incomeScore * w.incomeFloor;

  // Consistency component (0-100)
  const consistencyScore = (consistency ?? 0) * 100;
  score += consistencyScore * w.consistency;

  // Volatility component (0-100, inverted)
  const volatilityScore = (1 - (volatility ?? 1)) * 100;
  score += volatilityScore * w.volatility;

  // Trend component
  const trendScores = { improving: 100, stable: 70, declining: 30, uncertain: 40 };
  score += trendScores[trend] * w.trend;

  // Concentration component (0-100, inverted)
  const concentrationScore = (1 - concentration) * 100;
  score += concentrationScore * w.concentration;

  // Red flags penalty
  const materialFlags = flags.filter((f) => f.severity === "material").length;
  const reviewFlags = flags.filter((f) => f.severity === "review").length;
  const flagPenalty = (materialFlags * 20 + reviewFlags * 10) * w.redFlags;
  score -= flagPenalty;

  // Data sufficiency boost
  if (dataQuality === "sufficient") score += 10 * w.dataSufficiency;
  else if (dataQuality === "limited") score += 5 * w.dataSufficiency;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function determineTier(score: number | null): string | null {
  if (score === null) return null;
  if (score >= 80) return "strong";
  if (score >= 60) return "good";
  if (score >= 40) return "moderate";
  if (score >= 20) return "limited";
  return "insufficient";
}

function buildLimitations(
  dataQuality: string,
  confidence: number,
  monthCount: number,
  uncertainCount: number,
  statementPeriod: { from: string; to: string },
): string[] {
  const limitations: string[] = [];

  if (dataQuality !== "sufficient") {
    limitations.push("Data quality is limited. Assessment should be reviewed alongside other evidence.");
  }
  if (confidence < 0.7) {
    limitations.push("Extraction confidence is below the recommended threshold. Manual verification of key transactions is advised.");
  }
  if (monthCount < 3) {
    limitations.push("Statement period covers fewer than three months. Income patterns may not be representative.");
  }
  if (uncertainCount > 0) {
    limitations.push(`${uncertainCount} transaction(s) could not be reliably categorised and require manual review.`);
  }
  limitations.push("This assessment is supplementary to formal bureau checks and human judgement. It does not constitute a lending decision.");
  limitations.push("Predictive validity against repayment outcomes has not yet been established for this scoring policy version.");

  return limitations;
}

function buildExplanation(
  incomeFloorMinor: number | null,
  consistency: number | null,
  volatility: number | null,
  trend: string,
  flags: Assessment["flags"],
  dataQuality: string,
  statementPeriod: { from: string; to: string },
): string {
  const parts: string[] = [];

  const periodMonths = Math.max(1, Math.round(
    (new Date(statementPeriod.to).getTime() - new Date(statementPeriod.from).getTime()) / (30.44 * 24 * 60 * 60 * 1000)
  ));

  parts.push(`This assessment covers a ${periodMonths}-month statement period from ${statementPeriod.from} to ${statementPeriod.to}.`);

  if (incomeFloorMinor !== null) {
    const incomeNAD = (incomeFloorMinor / 100).toFixed(2);
    parts.push(`The defensible income floor is NAD ${incomeNAD} per month.`);
  } else {
    parts.push("A defensible income floor could not be determined from the available data.");
  }

  if (consistency !== null) {
    const level = consistency > 0.7 ? "high" : consistency > 0.4 ? "moderate" : "low";
    parts.push(`Income consistency is ${level}.`);
  }

  if (volatility !== null) {
    const level = volatility < 0.3 ? "low" : volatility < 0.6 ? "moderate" : "high";
    parts.push(`Cash-flow volatility is ${level}.`);
  }

  parts.push(`The income trend over the statement period is ${trend}.`);

  if (flags.length > 0) {
    const material = flags.filter((f) => f.severity === "material").length;
    const review = flags.filter((f) => f.severity === "review").length;
    if (material > 0) parts.push(`${material} material flag(s) require attention.`);
    if (review > 0) parts.push(`${review} flag(s) are flagged for review.`);
  }

  if (dataQuality === "needs_review") {
    parts.push("Data quality is insufficient for a standard assessment. Manual review is required.");
  }

  parts.push("This assessment complements but does not replace formal bureau checks and human lending decisions.");

  return parts.join(" ");
}
