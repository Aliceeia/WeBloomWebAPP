"use client";

import { useMemo } from "react";
import { getToday, generateDayReflection, generateDayContext, generateSharedMoments, getBloomState, formatDayDisplay } from "@/lib/bloom";
import { BLOOM_LABELS, BLOOM_EMOJI_MAP } from "@/types";

export default function TodaysBloom() {
  const today = getToday();
  const dayNum = new Date().getDate();
  const state = getBloomState(dayNum);
  const emoji = BLOOM_EMOJI_MAP[state];

  const reflection = useMemo(() => generateDayReflection(today, state), [today, state]);
  const context = useMemo(() => generateDayContext(today), [today]);
  const sharedMoments = useMemo(() => generateSharedMoments(today, state), [today, state]);

  return (
    <div>
      <h3 className="text-sm font-medium text-[var(--color-text-soft)] mb-4">
        Today&apos;s Bloom
      </h3>

      {/* Bloom State */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-white/60 rounded-xl border border-[var(--color-border)]">
        <span className="text-3xl bloom-float">{emoji}</span>
        <div>
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
            {formatDayDisplay(today)}
          </p>
          <p className="text-sm font-medium text-[var(--color-text)]">
            {BLOOM_LABELS[state]}
          </p>
        </div>
      </div>

      {/* Reflection */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>🌸</span> BloomNote
        </h4>
        <div className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)]">
          <p className="text-sm italic text-[var(--color-text)] leading-relaxed">
            &ldquo;{reflection}&rdquo;
          </p>
        </div>
      </div>

      {/* Context */}
      {context && (
        <div className="mb-6">
          <h4 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🌿</span> Context
          </h4>
          <div className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)] space-y-2">
            {context.weather && (
              <p className="text-sm text-[var(--color-text-soft)]">
                {context.weather}
              </p>
            )}
            {context.location && (
              <p className="text-sm text-[var(--color-text-soft)]">
                At {context.location}
              </p>
            )}
            {context.activity && (
              <p className="text-sm text-[var(--color-text-soft)]">
                {context.activity}
              </p>
            )}
            {context.mood && (
              <p className="text-sm text-[var(--color-text-soft)]">
                Feeling {context.mood.toLowerCase()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Shared Moments */}
      {sharedMoments.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🌼</span> Shared Moments
          </h4>
          <div className="space-y-2">
            {sharedMoments.map((moment) => (
              <div
                key={moment.id}
                className="p-3 bg-white/60 rounded-xl border border-[var(--color-border)] flex items-center gap-3"
              >
                <span className="text-lg">{moment.emoji}</span>
                <div>
                  <p className="text-sm text-[var(--color-text)]">
                    {moment.description}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    with {moment.withPerson} &middot; {moment.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
