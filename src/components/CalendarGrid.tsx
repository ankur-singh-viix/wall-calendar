"use client";

import { useState, useEffect } from "react";
import { getCalendarDays, isSameMonth, isToday, isSameDay, isInRange, format } from "@/lib/calendarUtils";
import { DateRange } from "@/types/calendar";
import { getFestivalsForDate, CATEGORY_COLORS, Festival } from "@/data/festivalData";
import { getCustomDatesForDate, CustomDate } from "@/lib/customDatesStorage";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  month: number;
  year: number;
  range: DateRange;
  hoverDate: Date | null;
  onDayClick: (day: Date) => void;
  onDayHover: (day: Date | null) => void;
  clearRange: () => void;
  refreshKey?: number;
}

export default function CalendarGrid({
  month, year, range, hoverDate,
  onDayClick, onDayHover, clearRange, refreshKey,
}: CalendarGridProps) {
  const days = getCalendarDays(year, month);
  const currentMonthDate = new Date(year, month, 1);
  const previewEnd = range.start && !range.end ? hoverDate : null;
  const [tooltip, setTooltip] = useState<{ day: Date; festivals: (Festival | CustomDate)[] } | null>(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => { forceUpdate(n => n + 1); }, [refreshKey]);

  function getDayState(day: Date) {
    const isStart = range.start ? isSameDay(day, range.start) : false;
    const isEnd = range.end ? isSameDay(day, range.end) : false;
    const inRange = isInRange(day, range.start, range.end);
    const inPreview = range.start && !range.end && previewEnd
      ? isInRange(day, range.start, previewEnd) : false;
    return { isStart, isEnd, inRange, inPreview };
  }

  return (
    <div className="w-full select-none">

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((day, i) => (
          <div key={day} className={`
            text-center text-[11px] font-semibold py-2
            ${i === 0 ? "text-rose-400" : i === 6 ? "text-blue-500" : "text-[var(--calendar-muted)]"}
          `}>
            {day}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--calendar-border)] mb-2" />

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentMonthDate);
          const isTodayDate = isToday(day);
          const isSunday = day.getDay() === 0;
          const isSaturday = day.getDay() === 6;
          const { isStart, isEnd, inRange, inPreview } = getDayState(day);
          const isEdge = isStart || isEnd;

          const festivals = isCurrentMonth
            ? [...getFestivalsForDate(day), ...getCustomDatesForDate(day)]
            : [];
          const hasFestival = festivals.length > 0;
          const festColors = hasFestival ? CATEGORY_COLORS[festivals[0].category] : null;

          return (
            <div
              key={idx}
              onClick={() => isCurrentMonth && onDayClick(day)}
              onMouseEnter={() => {
                onDayHover(day);
                if (hasFestival) setTooltip({ day, festivals });
              }}
              onMouseLeave={() => {
                onDayHover(null);
                setTooltip(null);
              }}
              className={`
                relative flex flex-col items-center justify-center
                h-11 cursor-pointer transition-all duration-100
                ${!isCurrentMonth ? "opacity-25 cursor-default pointer-events-none" : ""}
                ${inRange && !isEdge ? "bg-blue-50" : ""}
                ${inPreview && !isStart ? "bg-blue-50/60" : ""}
                ${isStart ? "bg-blue-50 rounded-l-xl" : ""}
                ${isEnd ? "bg-blue-50 rounded-r-xl" : ""}
                ${isStart && isEnd ? "rounded-xl" : ""}
              `}
            >
              {/* Festival background pill */}
              {hasFestival && !isEdge && isCurrentMonth && (
                <div
                  className={`absolute inset-0.5 rounded-lg ${festColors?.bg}`}
                  style={{ opacity: 1 }}
                />
              )}

              {/* Date number */}
              <div className={`
                relative z-10 w-8 h-8 flex items-center justify-center
                rounded-xl text-sm font-medium transition-all duration-100
                ${isEdge
                  ? "bg-[var(--calendar-blue)] text-white shadow-lg shadow-blue-200/60 font-semibold"
                  : isTodayDate
                  ? "bg-[var(--calendar-blue)]/10 text-[var(--calendar-blue)] font-bold ring-2 ring-[var(--calendar-blue)]/30"
                  : isSunday && isCurrentMonth
                  ? "text-rose-500 font-medium"
                  : isSaturday && isCurrentMonth
                  ? "text-blue-500 font-medium"
                  : hasFestival
                  ? `${festColors?.text} font-semibold`
                  : "text-[var(--calendar-text)] hover:bg-slate-100"
                }
              `}>
                {format(day, "d")}
              </div>

              {/* Festival dot */}
              {hasFestival && isCurrentMonth && (
                <div className={`relative z-10 w-1 h-1 rounded-full mt-0.5 ${festColors?.dot}`} />
              )}

              {/* Tooltip */}
              {tooltip && isSameDay(tooltip.day, day) && hasFestival && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
                  style={{ minWidth: "160px" }}>
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3">
                    {tooltip.festivals.map((f) => {
                      const c = CATEGORY_COLORS[f.category];
                      return (
                        <div key={f.id} className="mb-2 last:mb-0">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1 ${c.bg} ${c.text}`}>
                            <span>{f.emoji}</span>
                            <span>{f.name}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed pl-1">
                            {f.description}
                          </p>
                        </div>
                      );
                    })}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                      border-l-4 border-r-4 border-t-4
                      border-l-transparent border-r-transparent border-t-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Range summary bar */}
      {range.start && (
        <div className="mt-4 pt-3 border-t border-[var(--calendar-border)]
          flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-2 h-2 rounded-full bg-[var(--calendar-blue)]" />
            <p className="text-xs text-slate-500">
              {range.end ? (
                <>
                  <span className="font-semibold text-[var(--calendar-blue)]">{format(range.start, "MMM d")}</span>
                  <span className="mx-1.5 text-slate-300">→</span>
                  <span className="font-semibold text-[var(--calendar-blue)]">{format(range.end, "MMM d")}</span>
                  <span className="ml-2 text-slate-400 text-[11px]">
                    {Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1} days selected
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-[var(--calendar-blue)]">{format(range.start, "MMM d, yyyy")}</span>
                  <span className="ml-2 text-slate-400 italic text-[11px]">Select end date</span>
                </>
              )}
            </p>
          </div>
          <button onClick={clearRange}
            className="text-[10px] font-semibold uppercase tracking-wider
              text-slate-400 hover:text-rose-400 transition-colors px-2 py-1
              rounded-lg hover:bg-rose-50">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}