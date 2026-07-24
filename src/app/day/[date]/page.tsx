import { notFound } from "next/navigation";
import DayDetail from "./DayDetail";
import { generateMonthDays } from "@/lib/bloom";

// Generate static params for current month as a fallback
export function generateStaticParams() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const days = generateMonthDays(year, month);
  return Array.from(days.keys()).map((date) => ({ date }));
}

interface PageProps {
  params: { date: string };
}

export default function DayPage({ params }: PageProps) {
  const { date } = params;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const monthData = generateMonthDays(year, month);
  const dayData = monthData.get(date);

  if (!dayData) {
    notFound();
  }

  return <DayDetail day={dayData} />;
}
