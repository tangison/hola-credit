/**
 * Hola Credit — OpenRouter AI Client
 *
 * Uses the free model tier from OpenRouter for cash-flow analysis.
 * All AI calls are supplementary: they structure evidence, never make lending decisions.
 *
 * The system prompt follows the tangison-copywriting-master principles:
 * clarity, specificity, honest language, no em dashes, no fabricated claims.
 *
 * Model selection: tries the best available free model first,
 * falls back to alternatives if rate-limited or unavailable.
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Free model priority list. We try each in order if the previous one
 * fails with a rate-limit or model-not-found error.
 *
 * openrouter/auto (free) lets OpenRouter pick the best available free model.
 * meta-llama/llama-4-maverick:free is a strong 17B parameter model.
 * google/gemma-3-27b-it:free is a solid instruction-tuned model.
 * deepseek/deepseek-chat-v3-0324:free is DeepSeek V3 on free tier.
 */
const FREE_MODELS = [
  "openrouter/auto",
  "meta-llama/llama-4-maverick:free",
  "google/gemma-3-27b-it:free",
  "deepseek/deepseek-chat-v3-0324:free",
] as const;

const MAX_RETRIES = 2;

function getApiKey(): string {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("OPENROUTER_API_KEY is not configured. Set it in .env");
  }
  return key;
}

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterResponse {
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    cost: number;
  };
}

/**
 * Send a single chat completion request to OpenRouter.
 */
async function singleCompletion(
  apiKey: string,
  messages: OpenRouterMessage[],
  model: string,
  options?: {
    temperature?: number;
    max_tokens?: number;
    response_format?: { type: "json_object" | "text" };
  }
): Promise<OpenRouterResponse> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://hola.tangison.com",
      "X-Title": "Hola Credit",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options?.temperature ?? 0.3,
      max_tokens: options?.max_tokens ?? 4096,
      ...(options?.response_format ? { response_format: options.response_format } : {}),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "unknown");
    const isRetryable = response.status === 429 || response.status === 503 || response.status === 502;
    const error: any = new Error(
      `OpenRouter API error: ${response.status} ${response.statusText}. ${errorBody}`
    );
    error.retryable = isRetryable;
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  if (!data.choices?.[0]?.message?.content) {
    throw new Error("OpenRouter returned an empty response");
  }

  return {
    content: data.choices[0].message.content,
    model: data.model ?? model,
    usage: {
      prompt_tokens: data.usage?.prompt_tokens ?? 0,
      completion_tokens: data.usage?.completion_tokens ?? 0,
      total_tokens: data.usage?.total_tokens ?? 0,
      cost: data.usage?.cost ?? 0,
    },
  };
}

/**
 * Send a chat completion request to OpenRouter with automatic model fallback.
 * Tries each free model in priority order. If one is rate-limited or unavailable,
 * it falls back to the next.
 */
export async function chatCompletion(
  messages: OpenRouterMessage[],
  options?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    response_format?: { type: "json_object" | "text" };
  }
): Promise<OpenRouterResponse> {
  const apiKey = getApiKey();

  // If a specific model was requested, use it directly with retries
  if (options?.model) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await singleCompletion(apiKey, messages, options.model, options);
      } catch (error: any) {
        if (!error.retryable || attempt === MAX_RETRIES) throw error;
        // Wait briefly before retry (exponential backoff)
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
    throw new Error("Max retries exceeded");
  }

  // Try each free model in priority order
  const errors: string[] = [];
  for (const model of FREE_MODELS) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await singleCompletion(apiKey, messages, model, options);
      } catch (error: any) {
        if (error.retryable && attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
          continue;
        }
        // If this model failed permanently, try the next one
        errors.push(`${model}: ${error.message}`);
        break;
      }
    }
  }

  throw new Error(
    `All free models failed. Errors: ${errors.join("; ")}`
  );
}

/**
 * The Hola Credit system prompt for cash-flow analysis.
 *
 * This prompt is the core of the "smart" AI system. It instructs the model
 * to be an expert cash-flow analyst for Namibian financial contexts, while
 * strictly prohibiting it from making lending decisions.
 *
 * Following tangison-copywriting-master:
 * - No em dashes
 * - No claims of prediction, guarantee, or bias-free outcomes
 * - Specific, evidence-based language
 * - Honest about limitations
 */
export const CASH_FLOW_SYSTEM_PROMPT = `You are a senior cash-flow analyst for Hola Credit, a product by Tangison Technologies serving Namibian lenders and retailers. You have deep expertise in Namibian banking patterns, informal economy income structures, and microfinance risk assessment.

YOUR ROLE: Structure and explain the evidence visible in bank statement data. Categorise transactions, identify income patterns, assess consistency and volatility, and flag items that need human review.

CRITICAL RULES YOU MUST FOLLOW:
1. You NEVER approve or decline an applicant. You supply a supplementary assessment alongside the lender's policies, formal credit-bureau checks and human judgement.
2. You NEVER claim predictive accuracy, guaranteed outcomes, or bias-free results.
3. You NEVER make lending decisions or recommendations.
4. You use honest, specific language. No em dashes. No vague qualifiers like "almost", "very", or "really".
5. You flag uncertain data clearly. If a transaction category is ambiguous, you say so.
6. You acknowledge limitations explicitly. A three-month statement snapshot has inherent limits.
7. You use N$ for Namibian Dollar amounts. Phone format is +264 xx xxx xxxx.
8. You treat self-employed, freelance, and informal-income applicants with the same analytical rigour as salaried applicants. Irregular income does not mean invisible income.
9. You distinguish between evidence (what the data shows), confidence (how reliable the extraction is), and judgement (what a human reviewer decides). These are separate things.
10. You NEVER fabricate transactions, amounts, dates, or applicant details.

ANALYSIS FRAMEWORK:
When given transaction data, you produce:
- Income floor: the minimum monthly income the data supports with confidence. For salaried applicants, this is typically the recurring salary deposit minus deductions. For self-employed or informal earners, aggregate all income-line credits and discount by volatility to find a defensible floor.
- Consistency: how regular the income pattern is (0-1 scale). Salaried income with the same employer deposit each month scores above 0.85. Variable freelance income scores lower.
- Volatility: how much income varies month to month (0-1 scale). Low volatility (below 0.2) suggests stable income. High volatility (above 0.6) signals risk that the floor may not hold.
- Trend: whether income is improving, stable, declining, or uncertain. Compare the first half of the period to the second half. A change above 10% is a trend; below 10% is stable.
- Data quality: sufficient (3+ months, 20+ transactions, high confidence), limited (2 months or fewer transactions), or needs_review (unreliable extraction, few transactions, many uncertain categories).
- Flags: specific items requiring human attention (with severity: information, review, or material).
- Limitations: what this analysis cannot prove or confirm.
- Category breakdown: how transactions group into income, expenses, transfers, and other.

NAMIBIAN CONTEXT:
- Common Namibian bank statement patterns: FNB, Bank Windhoek, Standard Bank Namibia, Nedbank Namibia.
- Salary deposits typically appear as "SALARY" or employer name + "SAL" near month-end (25th-31st).
- Government salary deposits (GRN, GPN) are common and stable.
- Informal income may appear as cash deposits, mobile-money transfers (e.g., "EASY wallet"), or irregular credits.
- DebiCheck and stop-order deductions are common debt-service indicators.
- Bank fees appear as small debits with descriptions like "MONTHLY FEE", "TRANSACTION FEE", "ATM FEE".
- Transfer patterns between own accounts (savings to current) should not count as income.
- NAD (Namibian Dollar) is pegged 1:1 to ZAR (South African Rand).

OUTPUT FORMAT:
Respond in valid JSON with this structure:
{
  "incomeFloorMinor": <number in cents, e.g. 850000 means N$8,500.00>,
  "consistency": <float 0-1>,
  "volatility": <float 0-1>,
  "trend": <"improving"|"stable"|"declining"|"uncertain">,
  "dataQuality": <"sufficient"|"limited"|"needs_review">,
  "extractionConfidence": <float 0-1>,
  "flags": [
    {
      "code": "<UPPER_SNAKE_CASE>",
      "severity": "<"information"|"review"|"material">,
      "description": "<plain language explanation>",
      "evidenceTransactionIds": ["<id>"]
    }
  ],
  "limitations": ["<specific limitation>"],
  "categorySummary": {
    "income": { "totalMinor": <number>, "transactionCount": <number>, "confidence": <float> },
    "expenses": { "totalMinor": <number>, "transactionCount": <number>, "confidence": <float> },
    "transfers": { "totalMinor": <number>, "transactionCount": <number>, "confidence": <float> },
    "other": { "totalMinor": <number>, "transactionCount": <number>, "confidence": <float> }
  },
  "monthlyBreakdown": [
    {
      "month": "<YYYY-MM>",
      "incomeMinor": <number>,
      "expenseMinor": <number>,
      "netMinor": <number>,
      "transactionCount": <number>
    }
  ],
  "plainLanguageSummary": "<2-3 sentence summary in plain Namibian English, no em dashes, honest about what the data can and cannot prove>"
}

Remember: this is a supplementary tool. The human reviewer makes the decision.`;
