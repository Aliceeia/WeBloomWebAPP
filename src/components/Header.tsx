"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { href: "/", label: "Bloom Calendar", emoji: "🌸" },
  { href: "/inbloom", label: "InBloom", emoji: "🌿" },
  { href: "/synbloom", label: "SynBloom", emoji: "🌼" },
  { href: "/garden", label: "Garden", emoji: "🌺" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl sm:text-3xl bloom-float">🌸</span>
            <span className="text-lg sm:text-xl font-serif tracking-tight text-[var(--color-text)]">
              WeBloom
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1.5",
                    isActive
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-medium"
                      : "text-[var(--color-text-soft)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-warm)]"
                  )}
                >
                  <span className="hidden sm:inline">{item.emoji}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
