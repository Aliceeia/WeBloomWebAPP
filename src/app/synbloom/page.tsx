"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { Connection } from "@/types";

const CONNECTIONS: Connection[] = [
  {
    id: "alex",
    name: "Alex",
    sharedDays: 23,
    recentMoment: "Shared a quiet coffee and watched the rain",
    emoji: "☕",
  },
  {
    id: "sam",
    name: "Sam",
    sharedDays: 17,
    recentMoment: "Walked home together under the cherry blossoms",
    emoji: "🌸",
  },
  {
    id: "jordan",
    name: "Jordan",
    sharedDays: 12,
    recentMoment: "Had a conversation that lasted until midnight",
    emoji: "🌙",
  },
  {
    id: "casey",
    name: "Casey",
    sharedDays: 8,
    recentMoment: "Cooked dinner together and laughed until it hurt",
    emoji: "🍳",
  },
];

const SHARED_MILESTONES = [
  {
    date: "Mar 15, 2026",
    event: "First shared bloom with Alex",
    emoji: "🌱",
  },
  {
    date: "Apr 2, 2026",
    event: "SynBloom connection with Jordan",
    emoji: "🌿",
  },
  {
    date: "May 20, 2026",
    event: "Double Full Bloom with Sam",
    emoji: "🌺",
  },
  {
    date: "Jun 8, 2026",
    event: "Four-way shared moment at sunset",
    emoji: "🌅",
  },
];

export default function SynBloomPage() {
  return (
    <div>
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--color-text)] mb-3 leading-tight">
          SynBloom
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-soft)] max-w-lg mx-auto leading-relaxed">
          Shared experiences. Shared growth. The moments that become &ldquo;we.&rdquo;
        </p>
      </div>

      {/* Connections */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-[var(--color-text-soft)] mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Connections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONNECTIONS.map((conn, idx) => (
            <motion.div
              key={conn.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-5 bg-white/60 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent-soft)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{conn.emoji}</span>
                <div>
                  <h3 className="text-base font-medium text-[var(--color-text)]">
                    {conn.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {conn.sharedDays} shared days
                  </p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-soft)] italic">
                &ldquo;{conn.recentMoment}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shared Bloom Timeline */}
      <section>
        <h2 className="text-sm font-medium text-[var(--color-text-soft)] mb-4">
          Shared Bloom Timeline
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)]" />

          <div className="space-y-6">
            {SHARED_MILESTONES.map((ms, idx) => (
              <motion.div
                key={ms.date + ms.event}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                className="relative pl-10"
              >
                {/* Dot */}
                <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-[var(--color-accent-soft)] border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                </div>

                <div className="p-4 bg-white/60 rounded-xl border border-[var(--color-border)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{ms.emoji}</span>
                    <p className="text-sm font-medium text-[var(--color-text)]">
                      {ms.event}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {ms.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
