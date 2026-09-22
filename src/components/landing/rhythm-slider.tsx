"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/reveal";

/* Illustrative monthly net income in N$ for one freelancer's year (not real data) */
const INCOME = [7200, 8100, 6900, 9400, 7800, 8600, 7300, 9900, 8200, 7600, 8800, 9100];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function percentile25(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const pos = 0.25 * (sorted.length - 1);
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (pos - lo) * (sorted[hi] - sorted[lo]);
}

function runningStats(upTo: number) {
  const months = INCOME.slice(0, upTo + 1);
  const floor = percentile25(months);
  const sorted = [...months].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  const inBand = months.filter((v) => v >= median * 0.8 && v <= median * 1.2).length;
  const consistency = Math.round((inBand / months.length) * 100);
  const swing = Math.round(((Math.max(...months) - Math.min(...months)) / median) * 100);
  return { floor, median, consistency, swing };
}

export function RhythmSlider() {
  const [month, setMonth] = useState(8); // September, a fully-formed picture
  const stats = useMemo(() => runningStats(month), [month]);
  const fill = (month / (INCOME.length - 1)) * 100;

  const w = 720, h = 150, pad = 10;
  const allMin = Math.min(...INCOME) - 500;
  const allMax = Math.max(...INCOME) + 500;
  const scaleX = (i: number) => pad + 14 + (i * (w - pad * 2 - 28)) / (INCOME.length - 1);
  const scaleY = (v: number) => h - 26 - ((v - allMin) / (allMax - allMin)) * (h - 52);
  const floorY = scaleY(stats.floor);

  const cards = [
    { label: `Income in ${MONTH_NAMES[month].slice(0, 3)}`, value: `N$ ${INCOME[month].toLocaleString("en-NA")}`, note: `Month ${month + 1} of the statement` },
    { label: "Income floor so far", value: `N$ ${(Math.round(stats.floor / 100) * 100).toLocaleString("en-NA")}`, note: "Rarely falls below this" },
    { label: "Consistency so far", value: `${stats.consistency}%`, note: "Months inside a steady band" },
    { label: "Swing so far", value: `${stats.swing}%`, note: "Quietest to busiest month" },
  ];

  return (
    <section id="rhythm" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="Rhythm explorer"
          title="Feel the rhythm of real income."
          lead="Salary underwriting asks one question: does the payslip exist? Cash-flow underwriting asks a better one: what does the money actually do? Drag through an illustrative year and watch the signals take shape."
        />

        <Reveal delay={120} className="mt-14">
          <div className="rounded-2xl border border-sand-50/10 bg-ink-100 p-6 sm:p-9">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">Illustrative example</p>
                <p className="mt-2.5 font-serif text-2xl font-semibold tracking-tight text-sand-50">
                  Nangula, freelance designer, Windhoek
                </p>
                <p className="mt-1 text-sm text-sand-50/50">
                  12 months of net business income, as read from her bank statement
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sand-50/40">Months read</p>
                <p className="mt-1 text-lg font-bold text-sand-50 tabular-nums">
                  {month + 1} <span className="font-normal text-sand-50/50">of 12</span>
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-sand-50/10 bg-sand-50 p-4 sm:p-5">
              <svg
                viewBox={`0 0 ${w} ${h}`}
                className="h-auto w-full touch-none"
                role="img"
                aria-label={`Line chart of Nangula's illustrative monthly income, currently focused on ${MONTH_NAMES[month]} at N$ ${INCOME[month].toLocaleString("en-NA")}`}
              >
                <rect x={pad} y={floorY} width={w - pad * 2} height={h - 22 - floorY} fill="#16B8A6" opacity="0.07" rx="10" />
                <line x1={pad} y1={floorY} x2={w - pad} y2={floorY} stroke="#0E8A7D" strokeWidth="2" strokeDasharray="7 6" />
                <text x={pad + 6} y={floorY - 7} fontSize="11.5" fontWeight="700" fill="#075C54">
                  Income floor: N$ {(Math.round(stats.floor / 100) * 100).toLocaleString("en-NA")}
                </text>

                <polygon
                  points={`${scaleX(0)},${h - 22} ${INCOME.slice(0, month + 1).map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(" ")} ${scaleX(month)},${h - 22}`}
                  fill="#16B8A6"
                  opacity="0.12"
                />
                <polyline
                  points={INCOME.slice(0, month + 1).map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(" ")}
                  fill="none"
                  stroke="#16B8A6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <polyline
                  points={INCOME.slice(month).map((v, i) => `${scaleX(month + i)},${scaleY(v)}`).join(" ")}
                  fill="none"
                  stroke="#111512"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  opacity="0.22"
                />

                {INCOME.map((v, i) => {
                  const isPast = i <= month;
                  const isNow = i === month;
                  return (
                    <circle
                      key={i}
                      cx={scaleX(i)}
                      cy={scaleY(v)}
                      r={isNow ? 7 : isPast ? 5 : 3.5}
                      fill={isNow ? "#111512" : isPast ? "#16B8A6" : "#B5AFA0"}
                      stroke={isNow ? "#16B8A6" : "#F9F7F2"}
                      strokeWidth={isNow ? 3 : 2}
                    />
                  );
                })}
              </svg>

              <div className="mt-5">
                <label htmlFor="rhythm-month" className="sr-only">
                  Select a month of Nangula&apos;s statement
                </label>
                <input
                  id="rhythm-month"
                  type="range"
                  min={0}
                  max={11}
                  step={1}
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="hola-range"
                  style={{ ["--fill" as string]: `${fill}%` }}
                  aria-valuetext={`${MONTH_NAMES[month]}, month ${month + 1}`}
                />
                <div className="mt-2.5 flex justify-between px-0.5 text-[10.5px] font-bold tracking-wider text-ink/40 uppercase">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                    <span key={m} className={i === month ? "text-teal-600" : undefined}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {cards.map((card) => (
                <div key={card.label} className="rounded-xl border border-sand-50/10 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-teal-300">{card.label}</p>
                  <p className="mt-2.5 text-xl font-bold tracking-tight text-sand-50 tabular-nums">{card.value}</p>
                  <p className="mt-1 text-xs text-sand-50/45">{card.note}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-sand-50/40">
              Illustrative example for demonstration only, not real customer data and not a lending recommendation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
