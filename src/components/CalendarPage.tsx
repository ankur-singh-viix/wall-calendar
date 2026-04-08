"use client";

import { useState, useEffect } from "react";
import CalendarShell from "./CalendarShell";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import AddCustomDateModal from "./AddCustomDateModal";
import CalendarLegend from "./CalendarLegend";
import InfoPanel from "./InfoPanel";
import { useDateRange } from "@/hooks/useDateRange";
import { useMonthTransition } from "@/hooks/useMonthTransition";
import { format } from "date-fns";

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false);
  const [today,   setToday]   = useState<Date>(new Date(2000, 0, 1)); // safe placeholder
  const [month,   setMonth]   = useState(0);
  const [year,    setYear]    = useState(2000);

  // Only run on client — fixes hydration mismatch
  useEffect(() => {
    const now = new Date();
    setToday(now);
    setMonth(now.getMonth());
    setYear(now.getFullYear());
    setMounted(true);
  }, []);

  const { range, hoverDate, setHoverDate, handleDayClick, clearRange } = useDateRange();
  const [showModal,  setShowModal]  = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { direction, animating, trigger } = useMonthTransition();

  function handlePrev() {
    trigger("right", () => {
      if (month === 0) { setMonth(11); setYear(y => y - 1); }
      else setMonth(m => m - 1);
    });
  }

  function handleNext() {
    trigger("left", () => {
      if (month === 11) { setMonth(0); setYear(y => y + 1); }
      else setMonth(m => m + 1);
    });
  }

  function goToday() {
    const dir =
      year < today.getFullYear() ||
      (year === today.getFullYear() && month < today.getMonth())
        ? "left" : "right";
    trigger(dir, () => {
      setMonth(today.getMonth());
      setYear(today.getFullYear());
    });
  }

  const isCurrentMonth =
    month === today.getMonth() && year === today.getFullYear();

  const gridAnim = animating
    ? direction === "left"  ? "slide-out-left"
    : direction === "right" ? "slide-out-right" : ""
    : direction === "left"  ? "slide-in-right"
    : direction === "right" ? "slide-in-left"   : "";

  // Show nothing until client mounts — prevents hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--calendar-blue)]
            border-t-transparent animate-spin" />
          <p className="text-xs text-slate-400 tracking-widest uppercase">
            Loading Calendar...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-3 animate-fade-up">

        {/* Top bar */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h1 className="text-xl font-bold text-slate-700 leading-none">
              {format(new Date(year, month), "MMMM yyyy")}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {format(today, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isCurrentMonth && (
              <button onClick={goToday}
                className="text-xs font-semibold text-[var(--calendar-blue)]
                  border border-[var(--calendar-blue)]/30 rounded-xl px-3 py-1.5
                  hover:bg-[var(--calendar-blue-light)] transition-all active:scale-95">
                Today
              </button>
            )}
            {range.start && (
              <button onClick={() => setShowModal(true)}
                className="text-xs font-semibold text-white
                  bg-[var(--calendar-blue)] rounded-xl px-3 py-1.5
                  hover:bg-blue-700 transition-all active:scale-95
                  shadow-sm shadow-blue-200 flex items-center gap-1.5">
                <span>＋</span>
                <span className="hidden sm:inline">Mark Important</span>
                <span className="sm:hidden">Mark</span>
              </button>
            )}
          </div>
        </div>

        {/* Calendar shell */}
        <CalendarShell
          month={month} year={year}
          onPrev={handlePrev} onNext={handleNext}
          notesSlot={<NotesPanel range={range} />}
          gridAnimClass={gridAnim}
        >
          <div className="flex flex-col gap-3">
            <CalendarGrid
              month={month} year={year}
              range={range} hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              clearRange={clearRange}
              refreshKey={refreshKey}
            />
            <div className="pt-3 border-t border-[var(--calendar-border)]">
              <CalendarLegend />
            </div>
          </div>
        </CalendarShell>

        {/* Info Panel */}
        <InfoPanel month={month} year={year} range={range} />

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 pt-1 pb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <p className="text-[11px] text-slate-400 tracking-wider">
            Wall Calendar · Data saved locally
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="animate-modal-in">
          <AddCustomDateModal
            selectedDate={range.start}
            onClose={() => setShowModal(false)}
            onSaved={() => setRefreshKey(k => k + 1)}
          />
        </div>
      )}
    </>
  );
}