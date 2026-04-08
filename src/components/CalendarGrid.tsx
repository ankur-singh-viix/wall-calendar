"use client";

import { getCalendarDays, isSameMonth, isToday, isSameDay, isInRange, format } from "@/lib/calendarUtils";
import { DateRange } from "@/types/calendar";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  month: number;
  year: number;
  range: DateRange;
  hoverDate: Date | null;
  onDayClick: (day: Date) => void;
  onDayHover: (day: Date | null) => void;
  clearRange: () => void;
}

export default function CalendarGrid({
  month,
  year,
  range,
  hoverDate,
  onDayClick,
  onDayHover,
  clearRange,
}: CalendarGridProps) {
  const days = getCalendarDays(year, month);
  const currentMonthDate = new Date(year, month, 1);
  const previewEnd = range.start && !range.end ? hoverDate : null;

  function getDayState(day: Date) {
    const isStart = range.start ? isSameDay(day, range.start) : false;
    const isEnd = range.end ? isSameDay(day, range.end) : false;
    const inRange = isInRange(day, range.start, range.end);
    const inPreview =
      range.start && !range.end && previewEnd
        ? isInRange(day, range.start, previewEnd)
        : false;
    return { isStart, isEnd, inRange, inPreview };
  }

  return (
    <div className="w-full select-none">

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_HEADERS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-[10px] font-semibold uppercase tracking-widest py-1
              ${i === 0 ? "text-rose-400" : i === 6 ? "text-[var(--calendar-blue)]" : "text-[var(--calendar-muted)]"}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentMonthDate);
          const isTodayDate = isToday(day);
          const isSunday = day.getDay() === 0;
          const isSaturday = day.getDay() === 6;
          const { isStart, isEnd, inRange, inPreview } = getDayState(day);
          const isEdge = isStart || isEnd;

          return (
            <div
              key={idx}
              onClick={() => isCurrentMonth && onDayClick(day)}
              onMouseEnter={() => onDayHover(day)}
              onMouseLeave={() => onDayHover(null)}
              className={`
                relative flex items-center justify-center
                h-9 w-full cursor-pointer transition-all duration-100
                ${!isCurrentMonth ? "opacity-20 cursor-default" : ""}
                ${inRange && !isEdge ? "bg-[var(--calendar-light)] rounded-none" : ""}
                ${inPreview && !isStart ? "bg-blue-50 rounded-none" : ""}
                ${isStart ? "rounded-l-full" : ""}
                ${isEnd ? "rounded-r-full" : ""}
                ${isStart && isEnd ? "rounded-full" : ""}
                ${!inRange && !inPreview && !isEdge && isCurrentMonth ? "rounded-full hover:bg-[var(--calendar-light)]" : ""}
              `}
            >
              <span
                className={`
                  relative z-10 w-8 h-8 flex items-center justify-center
                  text-sm leading-none rounded-full transition-all duration-100 font-medium
                  ${isEdge ? "bg-[var(--calendar-blue)] text-white shadow-md shadow-blue-200 font-bold"
                    : isTodayDate ? "ring-2 ring-[var(--calendar-blue)] text-[var(--calendar-blue)] font-bold"
                    : isSunday && isCurrentMonth ? "text-rose-400"
                    : isSaturday && isCurrentMonth ? "text-[var(--calendar-blue)]"
                    : "text-[var(--calendar-text)]"
                  }
                `}
              >
                {format(day, "d")}
              </span>
            </div>
          );
        })}
      </div>

      {/* Range summary */}
      {range.start && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-[var(--calendar-muted)]">
            {range.end ? (
              <>
                <span className="font-semibold text-[var(--calendar-blue)]">{format(range.start, "MMM d")}</span>
                {" → "}
                <span className="font-semibold text-[var(--calendar-blue)]">{format(range.end, "MMM d")}</span>
                <span className="ml-2 text-[var(--calendar-muted)]">
                  ({Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1} days)
                </span>
              </>
            ) : (
              <>
                Start: <span className="font-semibold text-[var(--calendar-blue)]">{format(range.start, "MMM d")}</span>
                <span className="ml-2 italic">— pick end date</span>
              </>
            )}
          </p>
          <button
            onClick={clearRange}
            className="text-[10px] uppercase tracking-wider text-[var(--calendar-muted)] hover:text-rose-400 transition-colors"
          >
            ✕ Clear
          </button>
        </div>
      )}
    </div>
  );
}