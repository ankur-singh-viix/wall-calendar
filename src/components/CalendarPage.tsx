"use client";

import { useState } from "react";
import CalendarShell from "./CalendarShell";

export default function CalendarPage() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  function handlePrev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }

  function handleNext() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  return (
    <CalendarShell
      month={month}
      year={year}
      onPrev={handlePrev}
      onNext={handleNext}
      notesSlot={
        <div className="flex flex-col gap-2">
          {/* Lined note paper effect */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-px bg-[#e8e4dc] w-full" />
          ))}
          <p className="text-xs text-[var(--calendar-muted)] italic mt-1">
            Notes coming in next step...
          </p>
        </div>
      }
    >
      {/* Calendar grid coming in next step */}
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <p className="text-[var(--calendar-muted)] text-sm tracking-widest uppercase">
          Grid coming next...
        </p>
      </div>
    </CalendarShell>
  );
}