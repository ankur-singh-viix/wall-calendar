"use client";

import { useState } from "react";
import { Festival, CATEGORY_COLORS } from "@/data/festivalData";
import { CustomDate } from "@/lib/customDatesStorage";

interface FestivalBadgeProps {
  festivals: (Festival | CustomDate)[];
}

export default function FestivalBadge({ festivals }: FestivalBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  if (festivals.length === 0) return null;

  const first = festivals[0];
  const colors = CATEGORY_COLORS[first.category];

  return (
    <div className="relative">
      <span
        className="text-[10px] cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {first.emoji}
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
          w-44 rounded-xl border shadow-xl p-2.5
          bg-white ${colors.border}
          pointer-events-none
        `}>
          {festivals.map((f) => (
            <div key={f.id} className="mb-1.5 last:mb-0">
              <p className={`text-[11px] font-bold ${colors.text} flex items-center gap-1`}>
                <span>{f.emoji}</span> {f.name}
              </p>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">
                {f.description}
              </p>
            </div>
          ))}
          {/* Arrow */}
          <div className={`
            absolute top-full left-1/2 -translate-x-1/2
            border-4 border-transparent border-t-white
          `} />
        </div>
      )}
    </div>
  );
}