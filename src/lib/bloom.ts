import {
  type BloomState,
  type BloomEmoji,
  type DayData,
  type DayContext,
  type SharedMoment,
  BLOOM_EMOJI_MAP,
} from "@/types";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

const REFLECTIONS: Record<string, string[]> = {
  seed: [
    "Today, you found calm in unexpected silence.",
    "A quiet day can be the most fertile ground.",
    "You chose rest over noise — that takes wisdom.",
    "Stillness is not emptiness. It is preparation.",
  ],
  sprout: [
    "You spent more time listening than speaking.",
    "Small steps today. Strong roots tomorrow.",
    "You noticed something new about someone familiar.",
    "Growth doesn't always show — but today, it did.",
  ],
  bud: [
    "Something beautiful is taking shape within you.",
    "You turned intention into action today.",
    "The moment you almost missed became the one you'll remember.",
    "You are in the middle of becoming.",
  ],
  bloom: [
    "Today, you were fully yourself.",
    "You gave someone the gift of your presence.",
    "This is what alignment feels like.",
    "The world looks different when you're in bloom.",
  ],
  "full-bloom": [
    "Everything came together today. Remember this feeling.",
    "You didn't just show up. You shone.",
    "Today was a gift, and you were worthy of every moment.",
    "This is what meaningful time feels like. Hold it close.",
  ],
};

const LOCATIONS = [
  "Home",
  "Office",
  "Cafe near the park",
  "Library",
  "Riverside",
  "Your balcony",
  "Coworking space",
];

const ACTIVITIES = [
  "Reading",
 "Deep work session",
 "Walking",
 "Conversation with a friend",
 "Cooking",
 "Meditation",
 "Writing",
 "Sketching",
 "Listening to music",
 "Star gazing",
];

const PEOPLE = [
  "Alex",
  "Sam",
  "Jordan",
  "Casey",
  "Riley",
  "Morgan",
  "Avery",
  "Quinn",
];

const WEATHERS = [
  "Golden afternoon light",
  "Soft rain on the window",
  "Clear blue sky",
  "Warm breeze through the curtains",
  "Evening glow",
  "Misty morning",
  "Sunset painting the room amber",
];

const MOODS = [
  "Contemplative",
  "Peaceful",
  "Focused",
  "Joyful",
  "Tender",
  "Grateful",
  "Quietly inspired",
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  const index = Math.floor(seededRandom(seed) * arr.length);
  return arr[index];
}

function daySeed(dateStr: string): number {
  const parsed = parseISO(dateStr);
  return parsed.getTime();
}

export function generateDayReflection(
  dateStr: string,
  state: BloomState
): string {
  const seeds = REFLECTIONS[state];
  const seed = daySeed(dateStr);
  return pick(seeds, seed);
}

export function generateDayContext(dateStr: string): DayContext {
  const seed = daySeed(dateStr);
  return {
    location: pick(LOCATIONS, seed),
    weather: pick(WEATHERS, seed + 1),
    activity: pick(ACTIVITIES, seed + 2),
    people: [pick(PEOPLE, seed + 3), pick(PEOPLE, seed + 4)].filter(
      (v, i, a) => a.indexOf(v) === i
    ),
    mood: pick(MOODS, seed + 5),
  };
}

export function generateSharedMoments(
  dateStr: string,
  state: BloomState
): SharedMoment[] {
  if (state === "seed" || state === "sprout") return [];
  const seed = daySeed(dateStr);
  const count = state === "full-bloom" ? 2 : 1;

  return Array.from({ length: count }, (_, i) => ({
    id: `shared-${dateStr}-${i}`,
    withPerson: pick(PEOPLE, seed + i * 3),
    description: pick(
      [
        "Shared a quiet coffee",
        "Walked home together",
        "Had a conversation that mattered",
        "Cooked a meal together",
        "Sat in comfortable silence",
        "Laughed until it hurt",
        "Watched the sunset side by side",
      ],
      seed + i * 7
    ),
    time: pick(["morning", "afternoon", "evening"], seed + i * 11),
    emoji: pick(["☕", "🌅", "🍳", "🚶", "💬", "🌙"], seed + i * 5),
  }));
}

export function getBloomState(dayOfMonth: number): BloomState {
  const states: BloomState[] = [
    "seed",
    "sprout",
    "bud",
    "bloom",
    "full-bloom",
  ];
  // Use day of month to deterministically vary bloom state
  const index = Math.floor(((dayOfMonth * 7 + dayOfMonth * dayOfMonth) % 5));
  return states[index];
}

export function generateMonthDays(
  year: number,
  month: number
): Map<string, DayData> {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });
  const map = new Map<string, DayData>();

  days.forEach((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dayNum = day.getDate();
    const state = getBloomState(dayNum);
    const reflection = generateDayReflection(dateStr, state);
    const context = generateDayContext(dateStr);
    const sharedMoments = generateSharedMoments(dateStr, state);

    map.set(dateStr, {
      date: dateStr,
      bloomState: state,
      emoji: BLOOM_EMOJI_MAP[state],
      reflection,
      context,
      sharedMoments,
      media: [],
    });
  });

  return map;
}

export function getToday(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function getMonthDay(dateStr: string): number {
  return parseInt(format(parseISO(dateStr), "d"), 10);
}

export function formatDayDisplay(dateStr: string): string {
  const d = parseISO(dateStr);
  return format(d, "EEEE, MMMM d, yyyy");
}

export { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay };
