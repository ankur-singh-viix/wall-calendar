"use client";

import { useState } from "react";
import {
  format, getDaysInMonth, getDay, startOfMonth,
  addMonths, subMonths, getWeek, eachDayOfInterval,
  startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay,
} from "date-fns";
import { DateRange } from "@/types/calendar";
import { getFestivalsForDate, CATEGORY_COLORS } from "@/data/festivalData";
import { getCustomDatesForDate } from "@/lib/customDatesStorage";

interface InfoPanelProps {
  month: number;
  year: number;
  range: DateRange;
}

// ── helpers ──────────────────────────────────────────────────────────
function getDaysRemaining(month: number, year: number): number {
  const today = new Date();
  if (today.getMonth() !== month || today.getFullYear() !== year) {
    return getDaysInMonth(new Date(year, month));
  }
  return getDaysInMonth(new Date(year, month)) - today.getDate();
}

function getWeekNumbers(month: number, year: number): number[] {
  const weeks: number[] = [];
  const first = startOfMonth(new Date(year, month));
  const total = getDaysInMonth(new Date(year, month));
  for (let d = 1; d <= total; d += 7) {
    const day = new Date(year, month, d);
    const wn = getWeek(day, { weekStartsOn: 0 });
    if (!weeks.includes(wn)) weeks.push(wn);
  }
  // ensure we have 6 slots for consistent grid
  while (weeks.length < 6) weeks.push(weeks[weeks.length - 1] + 1);
  return weeks.slice(0, 6);
}

function getUpcomingFestivals(month: number, year: number, count = 5) {
  const today = new Date();
  const results: { date: Date; name: string; emoji: string; category: string }[] = [];
  // scan next 90 days
  for (let i = 0; i <= 90 && results.length < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const all = [...getFestivalsForDate(d), ...getCustomDatesForDate(d)];
    all.forEach(f => {
      if (results.length < count)
        results.push({ date: d, name: f.name, emoji: f.emoji, category: f.category });
    });
  }
  return results;
}

function getFestivalsInRange(start: Date, end: Date) {
  const days = eachDayOfInterval({ start, end });
  const results: { date: Date; name: string; emoji: string; category: string }[] = [];
  days.forEach(d => {
    const all = [...getFestivalsForDate(d), ...getCustomDatesForDate(d)];
    all.forEach(f => results.push({ date: d, name: f.name, emoji: f.emoji, category: f.category }));
  });
  return results;
}

// ── Mini Month ────────────────────────────────────────────────────────
function MiniMonth({ date, range }: { date: Date; range: DateRange }) {
  const month = date.getMonth();
  const year  = date.getFullYear();
  const first = startOfMonth(date);
  const startPad = getDay(first);
  const total = getDaysInMonth(date);
  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex-1 min-w-[130px]">
      <p className="text-[11px] font-bold text-slate-500 mb-2 text-center tracking-wide">
        {format(date, "MMMM yyyy")}
      </p>
      <div className="grid grid-cols-7 gap-0.5">
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} className="text-center text-[9px] text-slate-300 font-semibold py-0.5">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const d = new Date(year, month, day);
          const isT = isToday(d);
          const isStart = range.start ? isSameDay(d, range.start) : false;
          const isEnd   = range.end   ? isSameDay(d, range.end)   : false;
          const inRange = range.start && range.end
            ? d >= range.start && d <= range.end : false;
          const hasFest = getFestivalsForDate(d).length > 0 || getCustomDatesForDate(d).length > 0;

          return (
            <div key={i} className={`
              relative text-center text-[10px] w-full aspect-square
              flex items-center justify-center rounded-md font-medium
              ${isStart || isEnd ? "bg-[var(--calendar-blue)] text-white" : ""}
              ${inRange && !isStart && !isEnd ? "bg-blue-50 text-blue-600" : ""}
              ${isT && !isStart && !isEnd ? "ring-1 ring-[var(--calendar-blue)] text-[var(--calendar-blue)]" : ""}
              ${!isStart && !isEnd && !inRange && !isT ? "text-slate-400" : ""}
            `}>
              {day}
              {hasFest && !isStart && !isEnd && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2
                  w-0.5 h-0.5 rounded-full bg-orange-400" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────
export default function InfoPanel({ month, year, range }: InfoPanelProps) {
  const [open, setOpen] = useState(false);

  const currentDate    = new Date(year, month);
  const prevMonthDate  = subMonths(currentDate, 1);
  const nextMonthDate  = addMonths(currentDate, 1);
  const daysRemaining  = getDaysRemaining(month, year);
  const daysInMonth    = getDaysInMonth(currentDate);
  const weekNumbers    = getWeekNumbers(month, year);
  const upcomingFests  = getUpcomingFestivals(month, year);
  const today          = new Date();
  const isThisMonth    = today.getMonth() === month && today.getFullYear() === year;

  const rangeCount = range.start && range.end
    ? Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1
    : null;
  const festivalsInRange = range.start && range.end
    ? getFestivalsInRange(range.start, range.end)
    : [];

  return (
    <div className="w-full">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between
          px-5 py-3 bg-white rounded-2xl border border-[var(--calendar-border)]
          hover:bg-slate-50 transition-all group"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-[var(--calendar-blue-light)]
            flex items-center justify-center text-sm">
            📊
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-600">Calendar Info</p>
            <p className="text-[10px] text-slate-400">
              Week numbers · Mini months · Festivals · Range details
            </p>
          </div>
        </div>
        <div className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out
        ${open ? "max-h-[1200px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
        <div className="bg-white rounded-2xl border border-[var(--calendar-border)] overflow-hidden"
          style={{ boxShadow: "var(--shadow-sm)" }}>

          {/* ── Row 1: Stats strip ───────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0
            divide-[var(--calendar-border)] border-b border-[var(--calendar-border)]">

            {/* Days remaining */}
            <div className="px-5 py-4 flex flex-col gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Days Left
              </p>
              <p className="text-3xl font-bold text-[var(--calendar-blue)] leading-none">
                {daysRemaining}
              </p>
              <p className="text-[11px] text-slate-400">
                {isThisMonth ? "remaining this month" : `days in ${format(currentDate, "MMM")}`}
              </p>
              {/* Progress bar */}
              <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--calendar-blue)] rounded-full transition-all"
                  style={{
                    width: isThisMonth
                      ? `${((today.getDate()) / daysInMonth) * 100}%`
                      : "0%"
                  }}
                />
              </div>
            </div>

            {/* Total days */}
            <div className="px-5 py-4 flex flex-col gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Total Days
              </p>
              <p className="text-3xl font-bold text-slate-600 leading-none">
                {daysInMonth}
              </p>
              <p className="text-[11px] text-slate-400">in {format(currentDate, "MMMM")}</p>
            </div>

            {/* Week numbers */}
            <div className="px-5 py-4 flex flex-col gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Weeks
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {weekNumbers.map((wn, i) => (
                  <span key={i}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-lg
                      bg-slate-100 text-slate-500">
                    W{wn}
                  </span>
                ))}
              </div>
            </div>

            {/* Festivals this month */}
            <div className="px-5 py-4 flex flex-col gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Festivals
              </p>
              <p className="text-3xl font-bold text-orange-500 leading-none">
                {(() => {
                let count = 0;
                for (let d = 1; d <= daysInMonth; d++) {
                    const day = new Date(year, month, d);
                    count += getFestivalsForDate(day).length + getCustomDatesForDate(day).length;
                }
                return count;
                })()}
              </p>
              <p className="text-[11px] text-slate-400">this month</p>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Left column ───────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Mini month previews */}
                <div>
                <p className="text-[11px] font-bold uppercase tracking-widest
                    text-slate-400 mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-200 inline-block" />
                    Month Preview
                    <span className="flex-1 h-px bg-slate-100 inline-block" />
                </p>
                <div className="flex gap-4">
                    <MiniMonth date={prevMonthDate} range={range} />
                    <div className="w-px bg-[var(--calendar-border)]" />
                    <MiniMonth date={nextMonthDate} range={range} />
                </div>
                {/* Current month festival dots legend */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 mb-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 mr-1.5 align-middle" />
                    Orange dot = festival on that date
                    </p>
                </div>
                </div>

              {/* Week numbers table */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest
                  text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-slate-200 inline-block" />
                  Week Numbers
                  <span className="flex-1 h-px bg-slate-100 inline-block" />
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {weekNumbers.map((wn, i) => {
                    // Find start of that week in current month
                    const weekStart = new Date(year, month, 1 + i * 7);
                    const weekEnd   = new Date(year, month, Math.min(7 + i * 7, daysInMonth));
                    return (
                      <div key={i}
                        className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2
                          border border-slate-100">
                        <span className="text-[10px] font-bold text-[var(--calendar-blue)]">
                          W{wn}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {format(weekStart, "d")}–{format(weekEnd, "d")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right column ──────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Upcoming festivals */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest
                  text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-slate-200 inline-block" />
                  Upcoming Festivals
                  <span className="flex-1 h-px bg-slate-100 inline-block" />
                </p>
                <div className="flex flex-col gap-2">
                  {upcomingFests.length === 0 ? (
                    <p className="text-xs text-slate-300 italic">No upcoming festivals found.</p>
                  ) : upcomingFests.map((f, i) => {
                    const c = CATEGORY_COLORS[f.category as keyof typeof CATEGORY_COLORS];
                    const diffDays = Math.round(
                      (f.date.getTime() - today.getTime()) / 86400000
                    );
                    return (
                      <div key={i}
                        className={`flex items-center gap-3 p-2.5 rounded-xl
                          border ${c.border} ${c.bg}`}>
                        <div className="w-8 h-8 rounded-xl bg-white/70 flex items-center
                          justify-center text-base flex-shrink-0 shadow-sm">
                          {f.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${c.text} truncate`}>
                            {f.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {format(f.date, "EEE, MMM d")}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className={`text-[10px] font-bold px-2 py-0.5
                            rounded-lg bg-white/70 ${c.text}`}>
                            {diffDays === 0 ? "Today"
                              : diffDays === 1 ? "Tomorrow"
                              : `${diffDays}d`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Range summary card */}
              {range.start && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest
                    text-slate-400 mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-200 inline-block" />
                    Selected Range
                    <span className="flex-1 h-px bg-slate-100 inline-block" />
                  </p>
                  <div className="bg-[var(--calendar-blue-light)] rounded-2xl p-4
                    border border-blue-100">

                    {/* Date range display */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex flex-col items-center bg-white rounded-xl
                        px-3 py-2 shadow-sm min-w-[70px]">
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                          From
                        </p>
                        <p className="text-sm font-bold text-[var(--calendar-blue)]">
                          {format(range.start, "MMM d")}
                        </p>
                        <p className="text-[9px] text-slate-400">
                          {format(range.start, "yyyy")}
                        </p>
                      </div>

                      <div className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-1 w-full">
                          <div className="flex-1 h-0.5 bg-[var(--calendar-blue)]/20 rounded" />
                          <span className="text-[var(--calendar-blue)] text-sm">→</span>
                          <div className="flex-1 h-0.5 bg-[var(--calendar-blue)]/20 rounded" />
                        </div>
                        {rangeCount && (
                          <span className="text-[11px] font-bold text-[var(--calendar-blue)]">
                            {rangeCount} {rangeCount === 1 ? "day" : "days"}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-center bg-white rounded-xl
                        px-3 py-2 shadow-sm min-w-[70px]">
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                          {range.end ? "To" : "—"}
                        </p>
                        <p className="text-sm font-bold text-[var(--calendar-blue)]">
                          {range.end ? format(range.end, "MMM d") : "?"}
                        </p>
                        <p className="text-[9px] text-slate-400">
                          {range.end ? format(range.end, "yyyy") : "pick end"}
                        </p>
                      </div>
                    </div>

                    {/* Weeks + weekends in range */}
                    {rangeCount && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { label: "Weeks",    value: (rangeCount / 7).toFixed(1) },
                          { label: "Weekends", value: Math.floor(rangeCount / 7) * 2 },
                          { label: "Weekdays", value: rangeCount - Math.floor(rangeCount / 7) * 2 },
                        ].map(stat => (
                          <div key={stat.label}
                            className="bg-white/70 rounded-xl px-2 py-2 text-center">
                            <p className="text-xs font-bold text-[var(--calendar-blue)]">
                              {stat.value}
                            </p>
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Festivals in range */}
                    {festivalsInRange.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-slate-500 mb-2">
                          🎉 {festivalsInRange.length} festival{festivalsInRange.length > 1 ? "s" : ""} in this range
                        </p>
                        <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
                          {festivalsInRange.map((f, i) => {
                            const c = CATEGORY_COLORS[f.category as keyof typeof CATEGORY_COLORS];
                            return (
                              <div key={i}
                                className="flex items-center gap-2 bg-white/60 rounded-lg px-2 py-1.5">
                                <span className="text-sm">{f.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-[11px] font-semibold ${c.text} truncate`}>
                                    {f.name}
                                  </p>
                                  <p className="text-[9px] text-slate-400">
                                    {format(f.date, "MMM d, yyyy")}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {range.end && festivalsInRange.length === 0 && (
                      <p className="text-[11px] text-slate-400 italic text-center">
                        No festivals in this range
                      </p>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}