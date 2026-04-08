"use client";

import { useState } from "react";
import CalendarShell from "./CalendarShell";
import CalendarGrid from "./CalendarGrid";
import { useDateRange } from "@/hooks/useDateRange";

export default function CalendarPage() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const { range, hoverDate, setHoverDate, handleDayClick, clearRange } = useDateRange();

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
        <div className="flex flex-col gap-2 mt-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-px bg-[#e8e4dc] w-full" />
          ))}
          <p className="text-xs text-[var(--calendar-muted)] italic mt-1">
            Notes coming soon...
          </p>
        </div>
      }
    >
      <CalendarGrid
        month={month}
        year={year}
        range={range}
        hoverDate={hoverDate}
        onDayClick={handleDayClick}
        onDayHover={setHoverDate}
        clearRange={clearRange}
      />
    </CalendarShell>
  );
}