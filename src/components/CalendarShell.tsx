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
  month,
  year,
  onPrev,
  onNext,
  children,
  notesSlot,
}: CalendarShellProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">

      <div className="relative flex justify-center z-10">
        <div
          className="w-[92%] h-5 flex items-center justify-around px-4 rounded-t-sm"
          style={{ background: "linear-gradient(180deg, #d4d4d4 0%, #a8a8a8 100%)" }}
        >
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 border-[#888]"
              style={{ background: "radial-gradient(circle at 35% 35%, #e8e8e8, #888)" }}
            />
          ))}
        </div>
      </div>

      <div
        className="bg-white rounded-b-2xl overflow-hidden"
        style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)" }}
      >
        <HeroSection month={month} year={year} onPrev={onPrev} onNext={onNext} />

       
        <div className="flex flex-col md:flex-row min-h-[320px]">

          
          <div className="order-2 md:order-1 md:w-44 lg:w-52 border-t md:border-t-0 md:border-r border-gray-100 bg-[#fdfcfa] p-4 flex flex-col">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--calendar-muted)] mb-3">
              Notes
            </p>
            {notesSlot}
          </div>

         
          <div className="order-1 md:order-2 flex-1 p-4 md:p-6">
            {children}
          </div>

        </div>
      </div>

      {/* Bottom shadow layer for depth */}
      <div
        className="w-[94%] mx-auto h-3 rounded-b-xl"
        style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.10)" }}
      />
    </div>
  );
}