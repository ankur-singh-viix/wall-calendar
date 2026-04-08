import { FestivalCategory } from "@/data/festivalData";

export interface CustomDate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: FestivalCategory;
  dateKey: string; // "MM-DD" for yearly OR "YYYY-MM-DD" for one-time
  repeat: boolean;
}

const STORAGE_KEY = "wall-calendar-custom-dates";

export function getCustomDates(): CustomDate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveCustomDate(entry: CustomDate): void {
  const all = getCustomDates();
  const idx = all.findIndex(d => d.id === entry.id);
  if (idx >= 0) all[idx] = entry;
  else all.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteCustomDate(id: string): void {
  const all = getCustomDates().filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getCustomDatesForDate(date: Date): CustomDate[] {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const fullKey = `${yyyy}-${mm}-${dd}`;
  const shortKey = `${mm}-${dd}`;

  return getCustomDates().filter(d =>
    d.dateKey === fullKey || (d.repeat && d.dateKey === shortKey)
  );
}