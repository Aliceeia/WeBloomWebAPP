"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format, parseISO, addDays, subDays } from "date-fns";
import type { DayData } from "@/types";
import { BLOOM_LABELS } from "@/types";

interface DayDetailProps {
  day: DayData;
}

export default function DayDetail({ day }: DayDetailProps) {
  const router = useRouter();
  const dateObj = parseISO(day.date);
  const prevDate = format(subDays(dateObj, 1), "yyyy-MM-dd");
  const nextDate = format(addDays(dateObj, 1), "yyyy-MM-dd");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push(`/day/${prevDate}`)}
          className="flex items-center gap-1 text-sm text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => router.push("/")}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-soft)] transition-colors"
        >
          Back to Calendar
        </button>

        <button
          onClick={() => router.push(`/day/${nextDate}`)}
          className="flex items-center gap-1 text-sm text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition-colors"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Date header */}
      <div className="text-center mb-10">
        <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
          {format(dateObj, "EEEE")}
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--color-text)] mb-2">
          {format(dateObj, "MMMM d, yyyy")}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{day.emoji}</span>
          <span className="text-sm font-medium text-[var(--color-text-soft)]">
            {BLOOM_LABELS[day.bloomState]}
          </span>
        </div>
      </div>

      {/* Reflection */}
      {day.reflection && (
        <section className="mb-10">
          <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>🌸</span> BloomNote &mdash; Reflection
          </h2>
          <div className="p-6 bg-white/60 rounded-2xl border border-[var(--color-border)]">
            <p className="text-lg italic text-[var(--color-text)] leading-relaxed font-serif">
              &ldquo;{day.reflection}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* Context */}
      {day.context && (
        <section className="mb-10">
          <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>🌿</span> Context
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {day.context.weather && (
              <div className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Weather</p>
                <p className="text-sm text-[var(--color-text)]">{day.context.weather}</p>
              </div>
            )}
            {day.context.location && (
              <div className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Location</p>
                <p className="text-sm text-[var(--color-text)]">{day.context.location}</p>
              </div>
            )}
            {day.context.activity && (
              <div className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Activity</p>
                <p className="text-sm text-[var(--color-text)]">{day.context.activity}</p>
              </div>
            )}
            {day.context.mood && (
              <div className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Mood</p>
                <p className="text-sm text-[var(--color-text)]">{day.context.mood}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Shared Moments */}
      {day.sharedMoments && day.sharedMoments.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>🌼</span> Shared Moments
          </h2>
          <div className="space-y-3">
            {day.sharedMoments.map((moment) => (
              <div
                key={moment.id}
                className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)] flex items-start gap-4"
              >
                <span className="text-xl mt-0.5">{moment.emoji}</span>
                <div>
                  <p className="text-sm text-[var(--color-text)] font-medium">
                    {moment.description}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    with {moment.withPerson} &middot; {moment.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Media placeholder */}
      {day.media && day.media.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>📸</span> Captured Moments
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {day.media.map((item, idx) => (
              <div
                key={idx}
                className="aspect-square bg-[var(--color-bg-warm)] rounded-xl border border-[var(--color-border)] flex items-center justify-center"
              >
                <span className="text-2xl">{item.type === "photo" ? "📷" : "🎵"}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
