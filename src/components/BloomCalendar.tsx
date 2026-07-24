"use client";

import { useState, useMemo } from "react";
import { getDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { generateMonthDays, getToday } from "@/lib/bloom";
import MonthNavigation from "./MonthNavigation";
import DayCell from "./DayCell";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BloomCalendar() {
  const today = getToday();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const monthDays = useMemo(
    () => generateMonthDays(year, month),
    [year, month]
  );

  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });

  const startDayOfWeek = getDay(start);
  const totalCells = startDayOfWeek + days.length;
  const rows = Math.ceil(totalCells / 7);

  // Build the grid with padding cells
  const grid: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    grid.push(null);
  }
  days.forEach((d) => grid.push(d.getDate()));

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div>
      <MonthNavigation
        year={year}
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5">
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] sm:text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {grid.map((dayNum, idx) => {
          if (dayNum === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
            dayNum
          ).padStart(2, "0")}`;
          const dayData = monthDays.get(dateStr);
          if (!dayData) return <div key={`missing-${idx}`} className="aspect-square" />;
          return (
            <DayCell
              key={dateStr}
              day={dayData}
              dayNumber={dayNum}
              isToday={dateStr === today}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1">🌱 Seed</span>
        <span className="flex items-center gap-1">🌿 Sprout</span>
        <span className="flex items-center gap-1">🌸 Bud</span>
        <span className="flex items-center gap-1">🌼 Bloom</span>
        <span className="flex items-center gap-1">🌺 Full Bloom</span>
      </div>
    </div>
  );
}
