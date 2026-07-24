import BloomCalendar from "@/components/BloomCalendar";
import TodaysBloom from "@/components/TodaysBloom";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--color-text)] mb-3 leading-tight">
          Bloom Calendar
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-soft)] max-w-lg mx-auto leading-relaxed">
          A living calendar where every meaningful day blossoms into your personal digital garden.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main calendar */}
        <div className="lg:col-span-2">
          <BloomCalendar />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <TodaysBloom />
        </aside>
      </div>

      {/* Tagline */}
      <div className="mt-16 sm:mt-20 text-center">
        <p className="text-xs text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
          &ldquo;In a world designed to optimize our time, we are slowly forgetting what makes time meaningful.&rdquo;
        </p>
      </div>
    </div>
  );
}
