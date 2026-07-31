"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

interface MathCaptcha {
  question: string;
  answer: number;
}

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

export function WaitingListForm({ compact = false }: { compact?: boolean }) {
  const [captcha, setCaptcha] = useState<MathCaptcha>(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [email, setEmail] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleWaitlistSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setSubmitting(true);
      // MVP: Store in localStorage since no backend yet
      const entries = JSON.parse(localStorage.getItem("hola_waitlist") || "[]");
      entries.push({
        email,
        organisationName,
        joinedAt: new Date().toISOString(),
      });
      localStorage.setItem("hola_waitlist", JSON.stringify(entries));
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 600);
    },
    [email, organisationName]
  );

  if (submitted) {
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
          We&apos;ll reach out to <span className="font-medium text-ink">{email}</span> when it&apos;s your turn to access the pilot. No spam, no selling your data.
        </p>
        <Link
          href="/app"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-teal-50 text-teal-500 rounded-md text-sm font-medium hover:bg-teal-100 transition-colors duration-ui"
        >
          Try the demo while you wait
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {/* Step 1: Math captcha */}
      {!captchaPassed && (
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
                className="flex-1 px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
                autoFocus
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui"
              >
                Check
              </button>
            </div>
            {captchaError && (
              <p className="mt-2 text-sm text-red-500">{captchaError}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setCaptcha(generateCaptcha());
              setCaptchaInput("");
              setCaptchaError("");
            }}
            className="text-sm text-teal-500 hover:text-teal-600 transition-colors duration-ui"
          >
            New question
          </button>
        </form>
      )}

      {/* Step 2: Email + org name */}
      {captchaPassed && (
        <form onSubmit={handleWaitlistSubmit} className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-teal-500 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Human verified!
          </div>
          <div>
            <label htmlFor="waitlist-email" className="block text-sm font-medium text-ink mb-1.5">
              Work email <span className="text-alert">*</span>
            </label>
            <input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organisation.com"
              className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="waitlist-org" className="block text-sm font-medium text-ink mb-1.5">
              Organisation name
            </label>
            <input
              id="waitlist-org"
              type="text"
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
              placeholder="e.g. Sunshine Microfinance"
              className="w-full px-3 py-2.5 border border-sand-300 rounded-md text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !email}
            className="w-full px-4 py-2.5 bg-ink text-sand-50 rounded-md text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Joining..." : "Join the waitlist"}
          </button>
          <p className="text-xs text-ink/50 text-center">
            We&apos;ll only use your email to notify you about pilot access. No spam, no sharing.
          </p>
        </form>
      )}
    </div>
  );
}
