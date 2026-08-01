"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface AiChatPanelProps {
  applicationReference: string;
  assessmentSummary?: string;
  borrowerName?: string;
  productType?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AiChatPanel({
  applicationReference,
  assessmentSummary,
  borrowerName,
  productType,
}: AiChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          context: {
            applicationReference,
            assessmentSummary,
            borrowerName,
            productType,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fallback) {
          setIsAvailable(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg_${Date.now()}_err`,
              role: "assistant",
              content: "The AI service is not available. Please configure the OPENROUTER_API_KEY to enable AI-powered chat.",
              timestamp: new Date(),
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `msg_${Date.now()}_err`,
              role: "assistant",
              content: data.error || "Something went wrong. Please try again.",
              timestamp: new Date(),
            },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_${Date.now()}_ai`,
            role: "assistant",
            content: data.response,
            timestamp: new Date(),
          },
        ]);
      }
    } catch {
      setIsAvailable(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now()}_err`,
          role: "assistant",
          content: "Could not reach the AI service. Please check your connection and try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, applicationReference, assessmentSummary, borrowerName, productType]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sand-300">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
          <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4zM9 17l-2 4h10l-2-4M7 13h10" />
        </svg>
        <span className="text-sm font-medium text-ink">Ask about this assessment</span>
        {!isAvailable && (
          <span className="text-xs text-ink/40 ml-auto">AI unavailable</span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[400px]">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-ink/40">Ask a question about this cash-flow assessment.</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {[
                "What does the income floor mean?",
                "How reliable is this assessment?",
                "What should I verify with the applicant?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1.5 text-xs font-medium text-ink/60 bg-sand-50 border border-sand-300 rounded-full hover:bg-sand-100 transition-colors duration-ui"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-ink text-sand-50"
                  : "bg-sand-50 border border-sand-300 text-ink"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 bg-sand-50 border border-sand-300 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-sand-300 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isAvailable ? "Ask about this assessment..." : "AI service unavailable"}
            disabled={!isAvailable || isLoading}
            rows={1}
            className="flex-1 px-3 py-2 border border-sand-300 rounded-xl text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors duration-ui resize-none disabled:opacity-40"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading || !isAvailable}
            className="px-3 py-2 bg-ink text-sand-50 rounded-full text-sm font-medium hover:bg-ink-50 transition-colors duration-ui disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 text-xs text-ink/40">
          AI responses are supplementary. They do not constitute lending decisions.
        </p>
      </div>
    </div>
  );
}
