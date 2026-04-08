"use client";

import { useState } from "react";
import { CustomDate, saveCustomDate } from "@/lib/customDatesStorage";
import { FestivalCategory, CATEGORY_COLORS } from "@/data/festivalData";
import { format } from "date-fns";

interface AddCustomDateModalProps {
  selectedDate: Date | null;
  onClose: () => void;
  onSaved: () => void;
}

const CATEGORY_OPTIONS: { value: FestivalCategory; label: string; emoji: string }[] = [
  { value: "personal",      label: "Birthday / Anniversary", emoji: "🎂" },
  { value: "hindu",         label: "Hindu / Religious",      emoji: "🪔" },
  { value: "muslim",        label: "Islamic",                emoji: "☪️" },
  { value: "national",      label: "National",               emoji: "🇮🇳" },
  { value: "international", label: "International",          emoji: "🌍" },
];

export default function AddCustomDateModal({
  selectedDate, onClose, onSaved,
}: AddCustomDateModalProps) {
  const [name, setName]               = useState("");
  const [emoji, setEmoji]             = useState("🎂");
  const [description, setDescription] = useState("");
  const [category, setCategory]       = useState<FestivalCategory>("personal");
  const [repeat, setRepeat]           = useState(true);

  if (!selectedDate) return null;

  function handleSave() {
    if (!name.trim() || !selectedDate) return;
    const mm   = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd   = String(selectedDate.getDate()).padStart(2, "0");
    const yyyy = selectedDate.getFullYear();
    const dateKey = repeat ? `${mm}-${dd}` : `${yyyy}-${mm}-${dd}`;

    const entry: CustomDate = {
      id: Math.random().toString(36).slice(2, 10),
      name: name.trim(), emoji,
      description: description.trim(),
      category, dateKey, repeat,
    };
    saveCustomDate(entry);
    onSaved();
    onClose();
  }

  const colors = CATEGORY_COLORS[category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.35)", backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* Modal header */}
        <div className={`px-6 pt-6 pb-4 ${colors.bg} border-b ${colors.border}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Mark Important Date
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
            <button onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center
                text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-all text-sm">
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">

          {/* Category selector */}
          <div className="grid grid-cols-2 gap-2">
            {CATEGORY_OPTIONS.map(opt => {
              const c = CATEGORY_COLORS[opt.value];
              return (
                <button key={opt.value}
                  onClick={() => { setCategory(opt.value); setEmoji(opt.emoji); }}
                  className={`
                    text-xs rounded-2xl border px-3 py-2.5 text-left
                    transition-all font-medium
                    ${category === opt.value
                      ? `${c.bg} ${c.text} ${c.border} shadow-sm`
                      : "border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50"}
                  `}>
                  <span className="text-base block mb-0.5">{opt.emoji}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Name input */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider
              text-slate-400 mb-1.5 block">
              Name
            </label>
            <input type="text" value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Mom's Birthday"
              className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[var(--calendar-blue)]/20
                focus:border-[var(--calendar-blue)]/40 placeholder:text-slate-300"
            />
          </div>

          {/* Emoji input */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider
              text-slate-400 mb-1.5 block">
              Emoji
            </label>
            <input type="text" value={emoji}
              onChange={e => setEmoji(e.target.value)}
              className="w-full text-2xl border border-slate-200 rounded-2xl px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-[var(--calendar-blue)]/20
                focus:border-[var(--calendar-blue)]/40 text-center"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider
              text-slate-400 mb-1.5 block">
              Description <span className="normal-case font-normal">(optional)</span>
            </label>
            <textarea value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Short note..."
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[var(--calendar-blue)]/20
                focus:border-[var(--calendar-blue)]/40 resize-none placeholder:text-slate-300"
            />
          </div>

          {/* Repeat toggle */}
          <label className="flex items-center gap-3 cursor-pointer p-3
            bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative">
              <input type="checkbox" checked={repeat}
                onChange={e => setRepeat(e.target.checked)}
                className="sr-only" />
              <div className={`w-9 h-5 rounded-full transition-colors
                ${repeat ? "bg-[var(--calendar-blue)]" : "bg-slate-300"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full
                  shadow transition-transform duration-200
                  ${repeat ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Repeat every year</p>
              <p className="text-[10px] text-slate-400">Show this date annually</p>
            </div>
          </label>

          {/* Save button */}
          <button onClick={handleSave} disabled={!name.trim()}
            className={`
              w-full py-3 rounded-2xl text-sm font-bold tracking-wide
              transition-all ${colors.bg} ${colors.text} border ${colors.border}
              hover:opacity-90 active:scale-[0.98]
              disabled:opacity-30 disabled:cursor-not-allowed
              shadow-sm
            `}>
            Save Important Date {emoji}
          </button>
        </div>
      </div>
    </div>
  );
}