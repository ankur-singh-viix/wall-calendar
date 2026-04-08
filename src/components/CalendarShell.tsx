"use client";

import HeroSection from "./HeroSection";

interface CalendarShellProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
  notesSlot: React.ReactNode;
}

export default function CalendarShell({
  month, year, onPrev, onNext, children, notesSlot,
}: CalendarShellProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Spiral binding */}
      <div className="flex justify-center">
        <div
          className="w-[90%] h-6 flex items-center justify-around px-6 rounded-t-xl"
          style={{ background: "linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)", boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#94a3b8]"
                style={{ background: "radial-gradient(circle at 35% 35%, #f1f5f9, #94a3b8)" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main calendar card */}
      <div
        className="bg-white rounded-b-3xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Hero */}
        <HeroSection month={month} year={year} onPrev={onPrev} onNext={onNext} />

        {/* Body */}
        <div className="flex flex-col lg:flex-row">

          {/* Notes sidebar */}
          <div className="order-2 lg:order-1 lg:w-52 xl:w-60 flex-shrink-0
            border-t lg:border-t-0 lg:border-r border-[var(--calendar-border)]
            bg-[#fafbfc]">
            <div className="p-4 h-full">
              {notesSlot}
            </div>
          </div>

          {/* Calendar grid */}
          <div className="order-1 lg:order-2 flex-1 p-5 lg:p-7">
            {children}
          </div>

        </div>
      </div>

      {/* Stacked paper effect */}
      <div className="w-[88%] mx-auto h-2 rounded-b-2xl bg-white/60"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} />
      <div className="w-[82%] mx-auto h-2 rounded-b-2xl bg-white/40"
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.04)" }} />
    </div>
  );
}