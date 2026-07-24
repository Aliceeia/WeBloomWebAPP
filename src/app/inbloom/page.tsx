"use client";

import { Sparkles } from "lucide-react";
import type { Insight } from "@/types";
import { motion } from "framer-motion";

const INSIGHTS: Insight[] = [
  {
    id: "focus",
    title: "Peak Focus",
    description: "Your deepest focus happens in the morning light, between 7-9 AM, when the world is still quiet.",
    emoji: "🎯",
    pattern: "Morning hours show 73% higher concentration",
  },
  {
    id: "calm",
    title: "Calm Environment",
    description: "You feel most at peace near water and in spaces with natural light.",
    emoji: "🌊",
    pattern: "70% of your calmest moments include natural elements",
  },
  {
    id: "people",
    title: "Your People",
    description: "Conversations with Alex and Sam consistently bring out your most reflective self.",
    emoji: "💬",
    pattern: "Most meaningful interactions happen one-on-one",
  },
  {
    id: "activities",
    title: "Meaningful Activities",
    description: "Walking, cooking, and deep conversations are your most reliable sources of meaningful time.",
    emoji: "🚶",
    pattern: "These 3 activities account for 68% of your Full Bloom days",
  },
  {
    id: "rhythm",
    title: "Natural Rhythm",
    description: "Your energy follows the sun. Mornings for creation, afternoons for connection.",
    emoji: "🌅",
    pattern: "Creative work peaks before noon, social energy after 3 PM",
  },
  {
    id: "growth",
    title: "Growth Pattern",
    description: "You bloom brightest after days of quiet. Silence is your soil.",
    emoji: "🌱",
    pattern: "Full Bloom days are 2.4x more likely after a Seed day",
  },
];

export default function InBloomPage() {
  return (
    <div>
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--color-text)] mb-3 leading-tight">
          InBloom
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-soft)] max-w-lg mx-auto leading-relaxed">
          What helps you bloom? Discover the patterns that make your meaningful moments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {INSIGHTS.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="p-5 sm:p-6 bg-white/60 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent-soft)] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl">{insight.emoji}</span>
              <Sparkles className="w-4 h-4 text-[var(--color-accent)] opacity-60" />
            </div>
            <h3 className="text-base font-serif text-[var(--color-text)] mb-2">
              {insight.title}
            </h3>
            <p className="text-sm text-[var(--color-text-soft)] leading-relaxed mb-3">
              {insight.description}
            </p>
            <div className="pt-3 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-accent)] font-medium">
                {insight.pattern}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
