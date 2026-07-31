/**
 * Hola Credit — AI Assessment API Route
 *
 * POST /api/assess
 *
 * Accepts transaction data from a bank statement extraction,
 * sends it to OpenRouter for structured cash-flow analysis,
 * and returns the assessment result.
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

    const userMessage = `Analyse the following bank statement transaction data for a cash-flow assessment.

${applicantInfo}
${periodInfo}
${productInfo}
${purposeInfo}

Transactions (${body.transactions.length} total):
DATE | DESCRIPTION | AMOUNT | DIRECTION | CATEGORY | CONFIDENCE | ID
${transactionSummary.join("\n")}

Provide a structured cash-flow assessment following the analysis framework. Remember: this is supplementary analysis only. Do not make a lending decision. Respond in valid JSON.`;

    // Call OpenRouter
    const result = await chatCompletion(
      [
        { role: "system", content: CASH_FLOW_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      {
        model: "openrouter/free",
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

    // Add metadata
    const fullAssessment = {
      ...assessment,
      scoreRunId: `sr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      scoringPolicyVersion: "1.0.0-demo",
      extractionModelVersion: result.model,
      extractionConfidence: assessment.extractionConfidence ?? 0.7,
      aiGenerated: true,
      aiModel: result.model,
      aiCost: result.usage.cost,
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

    if (message.includes("OpenRouter API error")) {
      return NextResponse.json(
        {
          error: "AI service temporarily unavailable",
          detail: "The AI assessment service could not process the request. Please try again.",
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
