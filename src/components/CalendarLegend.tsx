"use client";

import { CATEGORY_COLORS, FestivalCategory } from "@/data/festivalData";

const LEGEND_ITEMS: { category: FestivalCategory; label: string }[] = [
  { category: "hindu",         label: "Hindu"         },
  { category: "muslim",        label: "Muslim"        },
  { category: "national",      label: "National"      },
  { category: "international", label: "International" },
  { category: "personal",      label: "Personal"      },
];

export default function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1 pb-1">
      {LEGEND_ITEMS.map(({ category, label }) => {
        const c = CATEGORY_COLORS[category];
        return (
          <div key={category} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
            <span className="text-[11px] text-slate-400 font-medium">{label}</span>
          </div>
        );
      })}
    </div>
  );
}