"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { generateMonthDays, getMonthDay } from "@/lib/bloom";
import type { BloomState, DayData } from "@/types";
import { BLOOM_EMOJI_MAP, BLOOM_LABELS } from "@/types";

const MONTHS_BACK = 6;
const BLOOM_STATES: BloomState[] = ["seed", "sprout", "bud", "bloom", "full-bloom"];

export default function GardenPage() {
  const now = new Date();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  // Generate data for the past MONTHS_BACK months
  const months = Array.from({ length: MONTHS_BACK }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  });

  const allMonthData = months.map((m) => ({
    ...m,
    data: generateMonthDays(m.year, m.month),
  }));

  const handleDayClick = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <div>
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--color-text)] mb-3 leading-tight">
          Bloom Garden
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-soft)] max-w-lg mx-auto leading-relaxed">
          Your digital garden. The longer you grow, the more beautiful it becomes.
        </p>
      </div>

      {/* Monthly garden grids */}
      <div className="space-y-12 sm:space-y-16">
        {allMonthData.map(({ year, month, data }) => {
          const monthLabel = format(new Date(year, month - 1), "MMMM yyyy");
          const days = Array.from(data.values());

          return (
            <section key={`${year}-${month}`}>
              <h2 className="text-lg font-serif text-[var(--color-text)] mb-4">
                {monthLabel}
              </h2>

              {/* Compact flower grid */}
              <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-2 sm:gap-3">
                {days.map((day, idx) => (
                  <motion.button
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02, duration: 0.3 }}
                    onClick={() => handleDayClick(day.date)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 aspect-square
                      ${expandedDay === day.date ? "bg-[var(--color-accent-soft)] ring-2 ring-[var(--color-accent)]" : "bg-white/60 hover:bg-[var(--color-bg-warm)] border border-[var(--color-border)]"}`}
                  >
                    <span className="text-lg sm:text-xl">{day.emoji}</span>
                    <span className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
                      {getMonthDay(day.date)}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Expanded day detail */}
              {days
                .filter((d) => d.date === expandedDay)
                .map((day) => (
                  <motion.div
                    key={`expanded-${day.date}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-5 bg-white/70 rounded-2xl border border-[var(--color-border)] overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                          {format(new Date(day.date), "EEEE, MMMM d, yyyy")}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xl">{day.emoji}</span>
                          <span className="text-sm font-medium text-[var(--color-text)]">
                            {BLOOM_LABELS[day.bloomState]}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/day/${day.date}`}
                        className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent)]/80 transition-colors"
                      >
                        View full day &rarr;
                      </Link>
                    </div>

                    {day.reflection && (
                      <p className="text-sm italic text-[var(--color-text-soft)] leading-relaxed">
                        &ldquo;{day.reflection}&rdquo;
                      </p>
                    )}
                  </motion.div>
                ))}
            </section>
          );
        })}
      </div>

      {/* Empty state */}
      {allMonthData.every((m) => m.data.size === 0) && (
        <div className="text-center py-20">
          <span className="text-4xl block mb-4">🌱</span>
          <p className="text-[var(--color-text-soft)]">
            Your garden is just beginning. Every day is a seed waiting to bloom.
          </p>
        </div>
      )}
    </div>
  );
}
