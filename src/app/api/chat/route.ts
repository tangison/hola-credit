/**
 * Hola Credit — AI Chat API Route
 *
 * POST /api/chat
 *
 * A conversational AI endpoint that lets loan officers ask questions
 * about a specific application's assessment. Uses the same system prompt
 * constraints as the assessment endpoint.
 *
 * Uses automatic free model fallback for reliability.
 */

import { NextResponse } from "next/server";
import { chatCompletion, CASH_FLOW_SYSTEM_PROMPT } from "@/lib/openrouter";

interface ChatRequest {
  message: string;
  context?: {
    applicationReference?: string;
    assessmentSummary?: string;
    borrowerName?: string;
    productType?: string;
  };
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        {
          error: "AI service unavailable",
          detail: "The OpenRouter API key is not configured.",
          fallback: true,
        },
        { status: 503 }
      );
    }

    const body: ChatRequest = await request.json();

    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Build context-aware system prompt
    const contextPrompt = body.context
      ? `\n\nCurrent context: You are discussing application ${body.context.applicationReference ?? "unknown"} for ${body.context.borrowerName ?? "an applicant"}. The product type is ${body.context.productType ?? "not specified"}. Assessment summary: ${body.context.assessmentSummary ?? "not available"}.`
      : "";

    const systemPrompt = CASH_FLOW_SYSTEM_PROMPT + contextPrompt + "\n\nYou are now in a conversational mode. Answer the user's question about the cash-flow assessment clearly and honestly. Use plain language. No em dashes. If you are uncertain, say so. Do not make lending decisions. Refer to specific transactions or patterns when possible rather than giving generic advice.";

    const result = await chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: body.message },
      ],
      {
        temperature: 0.4,
        max_tokens: 2048,
      }
    );

    return NextResponse.json(
      {
        success: true,
        response: result.content,
        model: result.model,
        usage: result.usage,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("OPENROUTER_API_KEY")) {
      return NextResponse.json(
        { error: "AI service unavailable", fallback: true },
        { status: 503 }
      );
    }

    if (message.includes("All free models failed") || message.includes("OpenRouter API error")) {
      return NextResponse.json(
        {
          error: "AI service temporarily unavailable",
          detail: "All free model tiers may be rate-limited. Please try again in a moment.",
          fallback: true,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Chat request failed", detail: "Please try again." },
      { status: 500 }
    );
  }
}
