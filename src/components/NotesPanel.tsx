"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange, CalendarNote } from "@/types/calendar";
import { getNotes, saveNote, deleteNote } from "@/lib/notesStorage";
import { formatDateKey } from "@/lib/calendarUtils";
import { getFestivalsForDate, CATEGORY_COLORS } from "@/data/festivalData";
import { getCustomDatesForDate } from "@/lib/customDatesStorage";

interface NotesPanelProps {
  range: DateRange;
}

function generateId() { return Math.random().toString(36).slice(2, 10); }

function getRangeLabel(range: DateRange): string {
  if (!range.start) return "";
  if (!range.end || formatDateKey(range.start) === formatDateKey(range.end))
    return format(range.start, "MMM d, yyyy");
  return `${format(range.start, "MMM d")} – ${format(range.end, "MMM d")}`;
}

function getRangeDateKey(range: DateRange): string {
  if (!range.start) return "";
  if (!range.end) return formatDateKey(range.start);
  return `${formatDateKey(range.start)}_${formatDateKey(range.end)}`;
}

export default function NotesPanel({ range }: NotesPanelProps) {
  const [notes, setNotes] = useState<CalendarNote[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => { setNotes(getNotes()); }, []);
  useEffect(() => {
    setNotes(getNotes());
    setText("");
  }, [range.start?.toDateString(), range.end?.toDateString()]);

  const dateKey = getRangeDateKey(range);
  const rangeLabel = getRangeLabel(range);
  const currentNotes = notes.filter(n => n.dateKey === dateKey);
  const otherNotes = notes.filter(n => n.dateKey !== dateKey);

  // Festivals for selected date
  const festivals = range.start
    ? [...getFestivalsForDate(range.start), ...getCustomDatesForDate(range.start)]
    : [];

  function handleAdd() {
    if (!text.trim() || !dateKey) return;
    const note: CalendarNote = {
      id: generateId(), dateKey,
      text: text.trim(), createdAt: new Date().toISOString(),
    };
    saveNote(note);
    setNotes(getNotes());
    setText("");
  }

  function handleDelete(id: string) {
    deleteNote(id);
    setNotes(getNotes());
  }

  function handleEditSave(id: string) {
    const note = notes.find(n => n.id === id);
    if (!note || !editText.trim()) return;
    saveNote({ ...note, text: editText.trim() });
    setNotes(getNotes());
    setEditingId(null);
  }

  return (
    <div className="flex flex-col gap-3 h-full min-h-[300px]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Notes
        </p>
        {currentNotes.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-[var(--calendar-blue)] text-white
            text-[10px] font-bold flex items-center justify-center">
            {currentNotes.length}
          </span>
        )}
      </div>

      {/* Selected date label */}
      {rangeLabel && (
        <div className="bg-[var(--calendar-blue-light)] rounded-xl px-3 py-2">
          <p className="text-[11px] font-semibold text-[var(--calendar-blue)] leading-tight">
            {rangeLabel}
          </p>
        </div>
      )}

      {/* Festival tags for selected date */}
      {festivals.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {festivals.map(f => {
            const c = CATEGORY_COLORS[f.category];
            return (
              <div key={f.id}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${c.bg} ${c.border}`}>
                <span className="text-sm">{f.emoji}</span>
                <div>
                  <p className={`text-[11px] font-semibold ${c.text}`}>{f.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Input */}
      {dateKey ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAdd(); } }}
            placeholder="Write a note..."
            rows={3}
            className="w-full text-xs rounded-xl border border-[var(--calendar-border)]
              bg-white p-2.5 resize-none focus:outline-none
              focus:ring-2 focus:ring-[var(--calendar-blue)]/20
              focus:border-[var(--calendar-blue)]/40
              placeholder:text-slate-300 text-slate-700 leading-relaxed"
          />
          <button
            onClick={handleAdd}
            disabled={!text.trim()}
            className="w-full text-[11px] uppercase tracking-widest font-bold
              bg-[var(--calendar-blue)] text-white rounded-xl py-2
              hover:bg-blue-700 transition-colors
              disabled:opacity-30 disabled:cursor-not-allowed
              shadow-sm shadow-blue-200"
          >
            Add Note
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 gap-2 py-6">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl">
            📅
          </div>
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Select a date to add notes or view festivals
          </p>
        </div>
      )}

      {/* Current date notes */}
      {currentNotes.length > 0 && (
        <div className="flex flex-col gap-2">
          {currentNotes.map(note => (
            <div key={note.id}
              className="bg-white border border-[var(--calendar-border)] rounded-xl p-2.5 group relative">
              {editingId === note.id ? (
                <div className="flex flex-col gap-1.5">
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    rows={2} autoFocus
                    className="text-xs w-full border border-slate-200 rounded-lg p-1.5
                      focus:outline-none focus:ring-1 focus:ring-blue-300 resize-none"
                  />
                  <div className="flex gap-1.5">
                    <button onClick={() => handleEditSave(note.id)}
                      className="text-[10px] font-bold uppercase tracking-wider
                        text-white bg-[var(--calendar-blue)] rounded-lg px-2.5 py-1">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)}
                      className="text-[10px] font-medium text-slate-400 px-2">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-600 leading-relaxed pr-10">{note.text}</p>
                  <p className="text-[9px] text-slate-300 mt-1.5">
                    {format(new Date(note.createdAt), "h:mm a")}
                  </p>
                  <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                    <button
                      onClick={() => { setEditingId(note.id); setEditText(note.text); }}
                      className="w-6 h-6 rounded-lg flex items-center justify-center
                        text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all text-xs">
                      ✎
                    </button>
                    <button onClick={() => handleDelete(note.id)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center
                        text-slate-300 hover:text-rose-400 hover:bg-rose-50 transition-all text-xs">
                      ✕
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Other notes */}
      {otherNotes.length > 0 && (
        <div className="mt-auto pt-3 border-t border-[var(--calendar-border)]">
          <p className="text-[9px] uppercase tracking-widest text-slate-300 mb-2 font-semibold">
            Other Notes ({otherNotes.length})
          </p>
          <div className="flex flex-col gap-1.5 max-h-24 overflow-y-auto">
            {otherNotes.map(note => (
              <div key={note.id}
                className="flex items-start justify-between gap-1 group py-0.5">
                <div className="min-w-0">
                  <p className="text-[10px] text-[var(--calendar-blue)] font-medium truncate">
                    {note.dateKey.includes("_")
                      ? note.dateKey.replace("_", " → ").replace(/(\d{4}-\d{2}-\d{2})/g, d =>
                          format(new Date(d + "T00:00:00"), "MMM d"))
                      : format(new Date(note.dateKey + "T00:00:00"), "MMM d, yyyy")}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{note.text}</p>
                </div>
                <button onClick={() => handleDelete(note.id)}
                  className="hidden group-hover:block text-[9px] text-slate-300
                    hover:text-rose-400 flex-shrink-0">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}