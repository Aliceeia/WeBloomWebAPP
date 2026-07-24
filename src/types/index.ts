export type BloomState = "seed" | "sprout" | "bud" | "bloom" | "full-bloom";

export type BloomEmoji = "🌱" | "🌿" | "🌸" | "🌼" | "🌺";

export interface DayData {
  date: string; // YYYY-MM-DD
  bloomState: BloomState;
  emoji: BloomEmoji;
  reflection?: string;
  context?: DayContext;
  sharedMoments?: SharedMoment[];
  media?: DayMedia[];
}

export interface DayContext {
  location?: string;
  weather?: string;
  activity?: string;
  people?: string[];
  mood?: string;
}

export interface SharedMoment {
  id: string;
  withPerson: string;
  description: string;
  time: string;
  emoji: string;
}

export interface DayMedia {
  type: "photo" | "audio" | "note";
  url?: string;
  caption?: string;
}

export interface MonthData {
  year: number;
  month: number;
  days: Map<string, DayData>;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  emoji: string;
  pattern: string;
}

export interface Connection {
  id: string;
  name: string;
  sharedDays: number;
  recentMoment?: string;
  emoji: string;
}

export const BLOOM_EMOJI_MAP: Record<BloomState, BloomEmoji> = {
  seed: "🌱",
  sprout: "🌿",
  bud: "🌸",
  bloom: "🌼",
  "full-bloom": "🌺",
};

export const BLOOM_LABELS: Record<BloomState, string> = {
  seed: "Seed",
  sprout: "Sprout",
  bud: "Bud",
  bloom: "Bloom",
  "full-bloom": "Full Bloom",
};
