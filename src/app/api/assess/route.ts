/**
 * Hola Credit, AI Assessment API Route
 *
 * POST /api/assess
 *
 * Accepts transaction data from a bank statement extraction,
 * sends it to OpenRouter for structured cash-flow analysis,
 * and returns the assessment result with deterministic validation.
 *
 * The AI provides categorisation and pattern recognition.
 * The deterministic scoring engine provides a validation layer
 * that catches obvious AI errors and ensures consistency.
 *
 * This is supplementary analysis only. It does not approve or decline applicants.
 */

import { NextResponse } from "next/server";
import { chatCompletion, CASH_FLOW_SYSTEM_PROMPT } from "@/lib/openrouter";

interface TransactionInput {
  id: string;
  postedDate: string;
  description: string;
  amount: number;
  direction: "credit" | "debit";
  category?: string;
  confidence?: number;
}

interface AssessRequest {
  transactions: TransactionInput[];
  applicantName?: string;
  statementPeriod?: { from: string; to: string };
  productType?: string;
  assessmentPurpose?: string;
}

/**
 * Run deterministic validation on the AI assessment result.
 * This catches obvious errors and ensures the assessment is internally consistent.
 */
function validateAIAssessment(aiResult: any, transactions: TransactionInput[]): {
  validated: any;
  corrections: string[];
} {
  const corrections: string[] = [];
  const result = { ...aiResult };

  // Validate income floor is positive and reasonable
  if (result.incomeFloorMinor !== undefined && result.incomeFloorMinor < 0) {
    corrections.push("Income floor was negative; corrected to 0");
    result.incomeFloorMinor = 0;
  }

  // Cap income floor at total credits (cannot exceed what data shows)
  const totalCredits = transactions
    .filter((t) => t.direction === "credit")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  if (result.incomeFloorMinor > totalCredits) {
    corrections.push(`Income floor exceeded total credits; capped to N$${(totalCredits / 100).toFixed(2)}`);
    result.incomeFloorMinor = totalCredits;
  }

  // Clamp consistency and volatility to [0, 1]
  if (result.consistency !== undefined) {
    result.consistency = Math.max(0, Math.min(1, result.consistency));
  }
  if (result.volatility !== undefined) {
    result.volatility = Math.max(0, Math.min(1, result.volatility));
  }
  if (result.extractionConfidence !== undefined) {
    result.extractionConfidence = Math.max(0, Math.min(1, result.extractionConfidence));
  }

  // Validate trend is one of the allowed values
  const validTrends = ["improving", "stable", "declining", "uncertain"];
  if (!validTrends.includes(result.trend)) {
    corrections.push(`Trend "${result.trend}" was not a valid value; set to "uncertain"`);
    result.trend = "uncertain";
  }

  // Validate dataQuality is one of the allowed values
  const validQualities = ["sufficient", "limited", "needs_review"];
  if (!validQualities.includes(result.dataQuality)) {
    corrections.push(`Data quality "${result.dataQuality}" was not a valid value; set to "limited"`);
    result.dataQuality = "limited";
  }

  // Validate category summary totals are positive
  if (result.categorySummary) {
    for (const [key, val] of Object.entries(result.categorySummary) as [string, any][]) {
      if (val.totalMinor < 0) {
        corrections.push(`Category ${key} total was negative; set to 0`);
        val.totalMinor = 0;
      }
      if (val.transactionCount < 0) {
        corrections.push(`Category ${key} transaction count was negative; set to 0`);
        val.transactionCount = 0;
      }
      if (val.confidence !== undefined) {
        val.confidence = Math.max(0, Math.min(1, val.confidence));
      }
    }
  }

  // Validate monthly breakdown
  if (result.monthlyBreakdown && Array.isArray(result.monthlyBreakdown)) {
    for (const month of result.monthlyBreakdown) {
      if (!month.month || !/^\d{4}-\d{2}$/.test(month.month)) {
        corrections.push(`Month "${month.month}" is not in YYYY-MM format`);
      }
    }
  }

  // Ensure flags array exists and each flag has required fields
  if (!Array.isArray(result.flags)) {
    corrections.push("Flags was not an array; set to empty array");
    result.flags = [];
  } else {
    const validSeverities = ["information", "review", "material"];
    result.flags = result.flags.map((flag: any) => ({
      code: flag.code || "unknown_flag",
      severity: validSeverities.includes(flag.severity) ? flag.severity : "information",
      description: flag.description || "No description provided",
      evidenceTransactionIds: Array.isArray(flag.evidenceTransactionIds) ? flag.evidenceTransactionIds : [],
    }));
  }

  // Ensure limitations array exists
  if (!Array.isArray(result.limitations)) {
    result.limitations = [
      "This assessment is supplementary to formal bureau checks and human judgement.",
    ];
  }

  return { validated: result, corrections };
}

/**
 * Build a deterministic cross-check using basic arithmetic on the transaction data.
 * This provides a sanity check against AI hallucination.
 */
function deterministicCrossCheck(transactions: TransactionInput[]) {
  const credits = transactions.filter((t) => t.direction === "credit");
  const debits = transactions.filter((t) => t.direction === "debit");

  const totalCreditMinor = credits.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalDebitMinor = debits.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Group by month
  const byMonth: Record<string, { credits: number; debits: number }> = {};
  for (const t of transactions) {
    const month = t.postedDate.slice(0, 7);
    if (!byMonth[month]) byMonth[month] = { credits: 0, debits: 0 };
    if (t.direction === "credit") byMonth[month].credits += Math.abs(t.amount);
    else byMonth[month].debits += Math.abs(t.amount);
  }

  const monthlyCreditValues = Object.values(byMonth).map((m) => m.credits);
  const monthCount = Object.keys(byMonth).length;

  // Simple income floor: minimum monthly credit total
  const incomeFloorMinor = monthlyCreditValues.length > 0
    ? Math.min(...monthlyCreditValues)
    : 0;

  // Simple consistency: coefficient of variation inverted
  const mean = monthlyCreditValues.length > 0
    ? monthlyCreditValues.reduce((a, b) => a + b, 0) / monthlyCreditValues.length
    : 0;
  const variance = monthlyCreditValues.length > 0
    ? monthlyCreditValues.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / monthlyCreditValues.length
    : 0;
  const stdDev = Math.sqrt(variance);
  const cv = mean > 0 ? stdDev / mean : 1;
  const consistency = Math.max(0, Math.min(1, 1 - cv));

  return {
    totalCreditMinor,
    totalDebitMinor,
    monthCount,
    incomeFloorMinor,
    consistency,
    transactionCount: transactions.length,
  };
}

export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    // Check if OpenRouter is configured
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        {
          error: "AI service unavailable",
          detail: "The OpenRouter API key is not configured. This demo cannot process live assessments without it.",
          fallback: true,
        },
        { status: 503 }
      );
    }

    const body: AssessRequest = await request.json();

    // Validate input
    if (!body.transactions || !Array.isArray(body.transactions) || body.transactions.length === 0) {
      return NextResponse.json(
        { error: "No transaction data provided. Upload a bank statement first." },
        { status: 400 }
      );
    }

    // Run deterministic cross-check in parallel with AI call
    const crossCheck = deterministicCrossCheck(body.transactions);

    // Build the user message with transaction data
    const transactionSummary = body.transactions.map((tx) => {
      const amount = tx.direction === "credit" ? tx.amount : -tx.amount;
      const category = tx.category ?? "uncategorised";
      const confidence = tx.confidence ?? 0.5;
      return `${tx.postedDate} | ${tx.description} | N$${(amount / 100).toFixed(2)} | ${tx.direction} | ${category} | confidence: ${confidence} | id: ${tx.id}`;
    });

    const periodInfo = body.statementPeriod
      ? `Statement period: ${body.statementPeriod.from} to ${body.statementPeriod.to}`
      : "Statement period: not specified";

    const applicantInfo = body.applicantName
      ? `Applicant: ${body.applicantName}`
      : "Applicant: not specified";

    const productInfo = body.productType
      ? `Product type: ${body.productType}`
      : "";

    const purposeInfo = body.assessmentPurpose
      ? `Assessment purpose: ${body.assessmentPurpose}`
      : "";

    const crossCheckInfo = `DETERMINISTIC CROSS-CHECK (for your reference, do not contradict these arithmetically-verified facts):
- Total credits across all months: N$${(crossCheck.totalCreditMinor / 100).toFixed(2)}
- Total debits across all months: N$${(crossCheck.totalDebitMinor / 100).toFixed(2)}
- Number of months in statement: ${crossCheck.monthCount}
- Minimum monthly credit total (deterministic income floor): N$${(crossCheck.incomeFloorMinor / 100).toFixed(2)}
- Income consistency coefficient (deterministic): ${crossCheck.consistency.toFixed(3)}
- Total transaction count: ${crossCheck.transactionCount}`;

    const userMessage = `Analyse the following bank statement transaction data for a cash-flow assessment.

${applicantInfo}
${periodInfo}
${productInfo}
${purposeInfo}

${crossCheckInfo}

Transactions (${body.transactions.length} total):
DATE | DESCRIPTION | AMOUNT | DIRECTION | CATEGORY | CONFIDENCE | ID
${transactionSummary.join("\n")}

Provide a structured cash-flow assessment following the analysis framework. Ensure your income floor does not exceed the deterministic minimum monthly credit total. Ensure your consistency and volatility estimates are consistent with the deterministic cross-check. Remember: this is supplementary analysis only. Do not make a lending decision. Respond in valid JSON.`;

    // Call OpenRouter with automatic model fallback
    const result = await chatCompletion(
      [
        { role: "system", content: CASH_FLOW_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      {
        temperature: 0.2,
        max_tokens: 4096,
        response_format: { type: "json_object" },
      }
    );

    // Parse the AI response
    let assessment;
    try {
      // Extract JSON from the response (handle potential markdown wrapping)
      let jsonStr = result.content.trim();
      if (jsonStr.startsWith("```json")) {
        jsonStr = jsonStr.slice(7);
      }
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith("```")) {
        jsonStr = jsonStr.slice(0, -3);
      }
      assessment = JSON.parse(jsonStr.trim());
    } catch {
      // If the AI response is not valid JSON, return it as a text summary
      return NextResponse.json(
        {
          error: "AI returned an unparseable response. Please try again.",
          rawContent: result.content,
          model: result.model,
          processingTimeMs: Date.now() - startTime,
        },
        { status: 422 }
      );
    }

    // Validate required fields
    const requiredFields = ["incomeFloorMinor", "consistency", "volatility", "trend", "dataQuality"];
    const missingFields = requiredFields.filter((f) => assessment[f] === undefined);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `AI assessment is incomplete. Missing fields: ${missingFields.join(", ")}`,
          partialAssessment: assessment,
          model: result.model,
          processingTimeMs: Date.now() - startTime,
        },
        { status: 422 }
      );
    }

    // Run deterministic validation on the AI result
    const { validated, corrections } = validateAIAssessment(assessment, body.transactions);

    // Add metadata
    const fullAssessment = {
      ...validated,
      scoreRunId: `sr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      scoringPolicyVersion: "1.0.0-demo",
      extractionModelVersion: result.model,
      extractionConfidence: validated.extractionConfidence ?? 0.7,
      aiGenerated: true,
      aiModel: result.model,
      aiCost: result.usage.cost,
      deterministicCrossCheck: crossCheck,
      validationCorrections: corrections.length > 0 ? corrections : undefined,
      processingTimeMs: Date.now() - startTime,
      disclaimer: "This assessment is supplementary to formal bureau checks and human judgement. It does not constitute a lending decision. AI-generated analysis may contain errors. Verify all findings independently.",
    };

    return NextResponse.json(
      {
        success: true,
        assessment: fullAssessment,
        model: result.model,
        usage: result.usage,
        processingTimeMs: Date.now() - startTime,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    // Distinguish between configuration errors and runtime errors
    if (message.includes("OPENROUTER_API_KEY")) {
      return NextResponse.json(
        {
          error: "AI service unavailable",
          detail: "The OpenRouter API key is not configured. Set OPENROUTER_API_KEY in your environment.",
          fallback: true,
        },
        { status: 503 }
      );
    }

    if (message.includes("OpenRouter API error") || message.includes("All free models failed")) {
      return NextResponse.json(
        {
          error: "AI service temporarily unavailable",
          detail: "The AI assessment service could not process the request. All free model tiers may be rate-limited. Please try again in a moment.",
          fallback: true,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error: "Assessment processing failed",
        detail: "An unexpected error occurred during the assessment. Please try again.",
      },
      { status: 500 }
    );
  }
}
