"use client";

import Link from "next/link";
import { clsx } from "clsx";
import type { DayData, BloomState } from "@/types";

const STATE_COLORS: Record<BloomState, string> = {
  seed: "text-garden-300",
  sprout: "text-garden-400",
  bud: "text-petal-300",
  bloom: "text-dawn-400",
  "full-bloom": "text-petal-500",
};

const STATE_BG: Record<BloomState, string> = {
  seed: "bg-garden-50",
  sprout: "bg-garden-100",
  bud: "bg-petal-50",
  bloom: "bg-dawn-50",
  "full-bloom": "bg-petal-100",
};

const STATE_HOVER: Record<BloomState, string> = {
  seed: "hover:bg-garden-100",
  sprout: "hover:bg-garden-200",
  bud: "hover:bg-petal-100",
  bloom: "hover:bg-dawn-100",
  "full-bloom": "hover:bg-petal-200",
};

interface DayCellProps {
  day: DayData;
  dayNumber: number;
  isToday: boolean;
}

export default function DayCell({ day, dayNumber, isToday }: DayCellProps) {
  return (
    <Link
      href={`/day/${day.date}`}
      className={clsx(
        "relative flex flex-col items-center justify-center aspect-square rounded-xl transition-all duration-300 group",
        STATE_BG[day.bloomState],
        STATE_HOVER[day.bloomState],
        isToday && "ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-bg)]"
      )}
    >
      <span
        className={clsx(
          "text-xl sm:text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110",
          "bloom-appear"
        )}
        style={{ animationDelay: `${dayNumber * 20}ms` }}
      >
        {day.emoji}
      </span>
      <span
        className={clsx(
          "text-[10px] sm:text-xs mt-0.5 font-medium transition-colors duration-200",
          STATE_COLORS[day.bloomState]
        )}
      >
        {dayNumber}
      </span>
    </Link>
  );
}
