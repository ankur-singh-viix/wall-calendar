import { useState } from "react";
import { DateRange } from "@/types/calendar";

export function useDateRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  function handleDayClick(day: Date) {
    // If no start, or both already selected → set new start
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
      return;
    }
    // If start exists but no end → set end (swap if needed)
    if (range.start && !range.end) {
      if (day < range.start) {
        setRange({ start: day, end: range.start });
      } else {
        setRange({ start: range.start, end: day });
      }
    }
  }

  function clearRange() {
    setRange({ start: null, end: null });
    setHoverDate(null);
  }

  return { range, hoverDate, setHoverDate, handleDayClick, clearRange };
}