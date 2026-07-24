"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface MonthNavigationProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function MonthNavigation({
  year,
  month,
  onPrev,
  onNext,
}: MonthNavigationProps) {
  const date = new Date(year, month - 1);
  const isCurrentMonth =
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear();

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPrev}
        className="p-2 rounded-lg text-[var(--color-text-soft)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-warm)] transition-all duration-200"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3">
        <h2 className="text-lg sm:text-xl font-serif text-[var(--color-text)]">
          {format(date, "MMMM yyyy")}
        </h2>
        {isCurrentMonth && (
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium text-[var(--color-accent)] bg-[var(--color-accent-soft)] rounded-full">
            Now
          </span>
        )}
      </div>

      <button
        onClick={onNext}
        className="p-2 rounded-lg text-[var(--color-text-soft)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-warm)] transition-all duration-200"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
