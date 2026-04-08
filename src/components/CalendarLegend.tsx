"use client";

import { CATEGORY_COLORS, FestivalCategory } from "@/data/festivalData";

const LEGEND_ITEMS: { category: FestivalCategory; label: string; emoji: string }[] = [
  { category: "hindu",         label: "Hindu",         emoji: "🪔" },
  { category: "muslim",        label: "Muslim",        emoji: "☪️" },
  { category: "national",      label: "National",      emoji: "🇮🇳" },
  { category: "international", label: "International", emoji: "🌍" },
  { category: "personal",      label: "Personal",      emoji: "🎂" },
];

export default function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1 pb-1">
      {LEGEND_ITEMS.map(({ category, label, emoji }) => {
        const c = CATEGORY_COLORS[category];
        return (
          <div key={category} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full flex-shrink-0`}
              style={{ backgroundColor: {
                hindu:         "#fb923c",
                muslim:        "#10b981",
                national:      "#22c55e",
                international: "#a78bfa",
                personal:      "#fb7185",
              }[category] }}
            />
            <span className="text-[11px] text-slate-400 font-medium">
              {emoji} {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}