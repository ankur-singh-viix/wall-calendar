export type FestivalCategory = "hindu" | "national" | "international" | "personal" | "muslim";

export interface Festival {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: FestivalCategory;
}

export interface FestivalDate {
  dateKey: string;
  festival: Festival;
}

export const CATEGORY_COLORS: Record<FestivalCategory, {
  bg: string; text: string; dot: string; border: string; light: string;
}> = {
  hindu:         { bg: "bg-orange-50",  text: "text-orange-600", dot: "bg-orange-400", border: "border-orange-200", light: "#fff7ed" },
  muslim:        { bg: "bg-emerald-50", text: "text-emerald-700",dot: "bg-emerald-500",border: "border-emerald-200",light: "#ecfdf5" },
  national:      { bg: "bg-green-50",   text: "text-green-700",  dot: "bg-green-500",  border: "border-green-200",  light: "#f0fdf4" },
  international: { bg: "bg-violet-50",  text: "text-violet-700", dot: "bg-violet-400", border: "border-violet-200", light: "#f5f3ff" },
  personal:      { bg: "bg-rose-50",    text: "text-rose-600",   dot: "bg-rose-400",   border: "border-rose-200",   light: "#fff1f2" },
};

export const FESTIVAL_DATES: FestivalDate[] = [
  // ── INTERNATIONAL ────────────────────────────────────────────────
  { dateKey: "01-01", festival: { id: "new-year",      name: "New Year's Day",       emoji: "🎆", description: "Start of the Gregorian calendar year.",              category: "international" }},
  { dateKey: "02-14", festival: { id: "valentine",     name: "Valentine's Day",      emoji: "💝", description: "Day of love and affection.",                         category: "international" }},
  { dateKey: "03-08", festival: { id: "womens-day",    name: "Women's Day",          emoji: "👩", description: "Celebrating women's achievements worldwide.",         category: "international" }},
  { dateKey: "04-22", festival: { id: "earth-day",     name: "Earth Day",            emoji: "🌍", description: "Annual event to raise awareness for environment.",    category: "international" }},
  { dateKey: "12-25", festival: { id: "christmas",     name: "Christmas",            emoji: "🎄", description: "Celebration of the birth of Jesus Christ.",          category: "international" }},
  { dateKey: "12-31", festival: { id: "new-year-eve",  name: "New Year's Eve",       emoji: "🎇", description: "Last day of the year.",                              category: "international" }},

  // ── NATIONAL ─────────────────────────────────────────────────────
  { dateKey: "01-26", festival: { id: "republic-day",  name: "Republic Day",         emoji: "🇮🇳", description: "India's Constitution came into effect in 1950.",    category: "national" }},
  { dateKey: "08-15", festival: { id: "independence",  name: "Independence Day",     emoji: "🏳️", description: "India's independence from British rule in 1947.",    category: "national" }},
  { dateKey: "10-02", festival: { id: "gandhi",        name: "Gandhi Jayanti",       emoji: "🕊️", description: "Birthday of Mahatma Gandhi.",                        category: "national" }},
  { dateKey: "11-14", festival: { id: "childrens-day", name: "Children's Day",       emoji: "🧒", description: "Birthday of Jawaharlal Nehru.",                      category: "national" }},
  { dateKey: "05-01", festival: { id: "labour-day",    name: "Labour Day",           emoji: "⚒️", description: "International Workers' Day.",                        category: "national" }},

  // ── HINDU FESTIVALS 2025 ─────────────────────────────────────────
  { dateKey: "2025-01-14", festival: { id: "makar-2025",       name: "Makar Sankranti",    emoji: "🪁", description: "Harvest festival — sun's entry into Capricorn.",   category: "hindu" }},
  { dateKey: "2025-01-29", festival: { id: "vasant-2025",      name: "Vasant Panchami",    emoji: "🌼", description: "Goddess Saraswati — knowledge and arts.",           category: "hindu" }},
  { dateKey: "2025-02-26", festival: { id: "maha-shiv-2025",   name: "Maha Shivaratri",    emoji: "🔱", description: "The great night of Lord Shiva.",                    category: "hindu" }},
  { dateKey: "2025-03-13", festival: { id: "holika-2025",      name: "Holika Dahan",       emoji: "🔥", description: "Bonfire — victory of good over evil.",              category: "hindu" }},
  { dateKey: "2025-03-14", festival: { id: "holi-2025",        name: "Holi",               emoji: "🎨", description: "Festival of colors celebrating spring and love.",   category: "hindu" }},
  { dateKey: "2025-03-30", festival: { id: "ugadi-2025",       name: "Ugadi / Gudi Padwa", emoji: "🌅", description: "Telugu & Marathi New Year.",                        category: "hindu" }},
  { dateKey: "2025-04-06", festival: { id: "ram-navami-2025",  name: "Ram Navami",         emoji: "🏹", description: "Birthday of Lord Rama.",                            category: "hindu" }},
  { dateKey: "2025-04-10", festival: { id: "hanuman-2025",     name: "Hanuman Jayanti",    emoji: "🐒", description: "Birthday of Lord Hanuman.",                         category: "hindu" }},
  { dateKey: "2025-08-16", festival: { id: "janmashtami-2025", name: "Janmashtami",        emoji: "🦚", description: "Birthday of Lord Krishna.",                         category: "hindu" }},
  { dateKey: "2025-08-27", festival: { id: "ganesh-2025",      name: "Ganesh Chaturthi",   emoji: "🐘", description: "Birthday of Lord Ganesha — 10 day festival.",       category: "hindu" }},
  { dateKey: "2025-10-02", festival: { id: "navratri-2025",    name: "Navratri Begins",    emoji: "🪔", description: "9 nights of Goddess Durga worship.",                category: "hindu" }},
  { dateKey: "2025-10-10", festival: { id: "dussehra-2025",    name: "Dussehra",           emoji: "🏹", description: "Victory of Rama over Ravana.",                      category: "hindu" }},
  { dateKey: "2025-10-20", festival: { id: "diwali-2025",      name: "Diwali",             emoji: "🪔", description: "Festival of Lights — Lakshmi puja & fireworks.",    category: "hindu" }},
  { dateKey: "2025-10-21", festival: { id: "govardhan-2025",   name: "Govardhan Puja",     emoji: "🌿", description: "Krishna lifted Govardhan hill.",                    category: "hindu" }},
  { dateKey: "2025-10-22", festival: { id: "bhai-dooj-2025",   name: "Bhai Dooj",          emoji: "👫", description: "Bond between brothers and sisters.",                category: "hindu" }},
  { dateKey: "2025-11-05", festival: { id: "chhath-2025",      name: "Chhath Puja",        emoji: "☀️", description: "Worship of Sun God near rivers.",                   category: "hindu" }},
  { dateKey: "2026-01-14", festival: { id: "makar-2026",       name: "Makar Sankranti",    emoji: "🪁", description: "Harvest festival — sun's entry into Capricorn.",   category: "hindu" }},
  { dateKey: "2026-02-15", festival: { id: "maha-shiv-2026",   name: "Maha Shivaratri",    emoji: "🔱", description: "The great night of Lord Shiva.",                    category: "hindu" }},
  { dateKey: "2026-03-03", festival: { id: "holi-2026",        name: "Holi",               emoji: "🎨", description: "Festival of colors.",                               category: "hindu" }},
  { dateKey: "2026-10-19", festival: { id: "diwali-2026",      name: "Diwali",             emoji: "🪔", description: "Festival of Lights.",                               category: "hindu" }},

  // ── EKADASHI 2025 ────────────────────────────────────────────────
  { dateKey: "2025-01-10", festival: { id: "ek-jan1-2025",  name: "Putrada Ekadashi",      emoji: "🌙", description: "Fast for blessings from Lord Vishnu.",              category: "hindu" }},
  { dateKey: "2025-01-25", festival: { id: "ek-jan2-2025",  name: "Shattila Ekadashi",     emoji: "🌙", description: "Donate sesame seeds for merit.",                    category: "hindu" }},
  { dateKey: "2025-02-09", festival: { id: "ek-feb1-2025",  name: "Jaya Ekadashi",         emoji: "🌙", description: "Removes sins of past lives.",                       category: "hindu" }},
  { dateKey: "2025-02-24", festival: { id: "ek-feb2-2025",  name: "Vijaya Ekadashi",       emoji: "🌙", description: "Grants victory in all endeavors.",                  category: "hindu" }},
  { dateKey: "2025-03-11", festival: { id: "ek-mar1-2025",  name: "Amalaki Ekadashi",      emoji: "🌙", description: "Worship of Amla tree sacred to Vishnu.",            category: "hindu" }},
  { dateKey: "2025-03-25", festival: { id: "ek-mar2-2025",  name: "Papamochani Ekadashi",  emoji: "🌙", description: "Removes all sins.",                                 category: "hindu" }},
  { dateKey: "2025-04-09", festival: { id: "ek-apr1-2025",  name: "Kamada Ekadashi",       emoji: "🌙", description: "Fulfills desires and grants moksha.",               category: "hindu" }},
  { dateKey: "2025-04-24", festival: { id: "ek-apr2-2025",  name: "Varuthini Ekadashi",    emoji: "🌙", description: "Grants long life and removes grief.",               category: "hindu" }},
  { dateKey: "2025-05-08", festival: { id: "ek-may1-2025",  name: "Mohini Ekadashi",       emoji: "🌙", description: "Removes all sorrows and sins.",                     category: "hindu" }},
  { dateKey: "2025-05-23", festival: { id: "ek-may2-2025",  name: "Apara Ekadashi",        emoji: "🌙", description: "Removes infamy and gives glory.",                   category: "hindu" }},
  { dateKey: "2025-06-07", festival: { id: "ek-jun1-2025",  name: "Nirjala Ekadashi",      emoji: "🌙", description: "Strictest fast — no water for full day.",           category: "hindu" }},
  { dateKey: "2025-06-22", festival: { id: "ek-jun2-2025",  name: "Yogini Ekadashi",       emoji: "🌙", description: "Cures diseases and removes sins.",                  category: "hindu" }},
  { dateKey: "2025-07-06", festival: { id: "ek-jul1-2025",  name: "Devshayani Ekadashi",   emoji: "🌙", description: "Lord Vishnu sleeps — Chaturmas begins.",            category: "hindu" }},
  { dateKey: "2025-07-21", festival: { id: "ek-jul2-2025",  name: "Kamika Ekadashi",       emoji: "🌙", description: "Worship with Tulsi leaves.",                        category: "hindu" }},
  { dateKey: "2025-08-05", festival: { id: "ek-aug1-2025",  name: "Shravana Putrada Ekadashi", emoji: "🌙", description: "Blesses devotees with children.",              category: "hindu" }},
  { dateKey: "2025-08-20", festival: { id: "ek-aug2-2025",  name: "Aja Ekadashi",          emoji: "🌙", description: "Removes sins of even past lives.",                  category: "hindu" }},
  { dateKey: "2025-09-03", festival: { id: "ek-sep1-2025",  name: "Parsva Ekadashi",       emoji: "🌙", description: "Lord Vishnu turns sides in cosmic sleep.",          category: "hindu" }},
  { dateKey: "2025-09-18", festival: { id: "ek-sep2-2025",  name: "Indira Ekadashi",       emoji: "🌙", description: "Rescues ancestors from hell.",                      category: "hindu" }},
  { dateKey: "2025-10-03", festival: { id: "ek-oct1-2025",  name: "Papankusha Ekadashi",   emoji: "🌙", description: "Destroys sins like an ankush.",                     category: "hindu" }},
  { dateKey: "2025-10-18", festival: { id: "ek-oct2-2025",  name: "Rama Ekadashi",         emoji: "🌙", description: "Observed before Diwali.",                           category: "hindu" }},
  { dateKey: "2025-11-01", festival: { id: "ek-nov1-2025",  name: "Devutthana Ekadashi",   emoji: "🌙", description: "Lord Vishnu wakes — Chaturmas ends.",               category: "hindu" }},
  { dateKey: "2025-11-17", festival: { id: "ek-nov2-2025",  name: "Utpanna Ekadashi",      emoji: "🌙", description: "Origin of all Ekadashis.",                          category: "hindu" }},
  { dateKey: "2025-12-01", festival: { id: "ek-dec1-2025",  name: "Mokshada Ekadashi",     emoji: "🌙", description: "Gita Jayanti — Krishna gave Gita discourse.",        category: "hindu" }},
  { dateKey: "2025-12-16", festival: { id: "ek-dec2-2025",  name: "Saphala Ekadashi",      emoji: "🌙", description: "Makes all efforts fruitful.",                       category: "hindu" }},

  // ── EKADASHI 2026 ────────────────────────────────────────────────
  { dateKey: "2026-01-10", festival: { id: "ek-jan1-2026",  name: "Putrada Ekadashi",      emoji: "🌙", description: "Fast for blessings from Lord Vishnu.",              category: "hindu" }},
  { dateKey: "2026-01-25", festival: { id: "ek-jan2-2026",  name: "Shattila Ekadashi",     emoji: "🌙", description: "Donate sesame seeds for merit.",                    category: "hindu" }},
  { dateKey: "2026-02-08", festival: { id: "ek-feb1-2026",  name: "Jaya Ekadashi",         emoji: "🌙", description: "Removes sins of past lives.",                       category: "hindu" }},
  { dateKey: "2026-02-23", festival: { id: "ek-feb2-2026",  name: "Vijaya Ekadashi",       emoji: "🌙", description: "Grants victory in all endeavors.",                  category: "hindu" }},
  { dateKey: "2026-03-10", festival: { id: "ek-mar1-2026",  name: "Amalaki Ekadashi",      emoji: "🌙", description: "Worship of Amla tree.",                             category: "hindu" }},
  { dateKey: "2026-03-25", festival: { id: "ek-mar2-2026",  name: "Papamochani Ekadashi",  emoji: "🌙", description: "Removes all sins.",                                 category: "hindu" }},
  { dateKey: "2026-04-08", festival: { id: "ek-apr1-2026",  name: "Kamada Ekadashi",       emoji: "🌙", description: "Fulfills desires.",                                 category: "hindu" }},
  { dateKey: "2026-04-23", festival: { id: "ek-apr2-2026",  name: "Varuthini Ekadashi",    emoji: "🌙", description: "Grants long life.",                                 category: "hindu" }},
  { dateKey: "2026-05-08", festival: { id: "ek-may1-2026",  name: "Mohini Ekadashi",       emoji: "🌙", description: "Removes sorrows.",                                  category: "hindu" }},
  { dateKey: "2026-05-22", festival: { id: "ek-may2-2026",  name: "Apara Ekadashi",        emoji: "🌙", description: "Removes infamy.",                                   category: "hindu" }},
  { dateKey: "2026-06-06", festival: { id: "ek-jun1-2026",  name: "Nirjala Ekadashi",      emoji: "🌙", description: "Strictest fast — no water.",                        category: "hindu" }},
  { dateKey: "2026-06-21", festival: { id: "ek-jun2-2026",  name: "Yogini Ekadashi",       emoji: "🌙", description: "Cures diseases.",                                   category: "hindu" }},

  // ── MUSLIM FESTIVALS 2025 ────────────────────────────────────────
  { dateKey: "2025-01-03", festival: { id: "mawlid-2025",      name: "Mawlid al-Nabi",      emoji: "☪️", description: "Birthday of Prophet Muhammad (PBUH).",             category: "muslim" }},
  { dateKey: "2025-03-01", festival: { id: "ramadan-2025",     name: "Ramadan Begins",      emoji: "🌙", description: "Holy month of fasting, prayer and reflection.",     category: "muslim" }},
  { dateKey: "2025-03-27", festival: { id: "laylat-2025",      name: "Laylat al-Qadr",      emoji: "⭐", description: "Night of Power — most blessed night of Ramadan.",   category: "muslim" }},
  { dateKey: "2025-03-30", festival: { id: "eid-ul-fitr-2025", name: "Eid ul-Fitr",         emoji: "🌙", description: "Festival of Breaking Fast — end of Ramadan.",        category: "muslim" }},
  { dateKey: "2025-04-01", festival: { id: "eid-fitr2-2025",   name: "Eid ul-Fitr Holiday", emoji: "🎉", description: "Continued Eid celebrations with family.",            category: "muslim" }},
  { dateKey: "2025-06-06", festival: { id: "eid-adha-2025",    name: "Eid ul-Adha",         emoji: "🐑", description: "Festival of Sacrifice — commemorates Ibrahim's devotion.", category: "muslim" }},
  { dateKey: "2025-06-26", festival: { id: "muharram-2025",    name: "Islamic New Year",    emoji: "🌙", description: "Start of Islamic Hijri New Year 1447.",              category: "muslim" }},
  { dateKey: "2025-07-05", festival: { id: "ashura-2025",      name: "Ashura",              emoji: "☪️", description: "10th of Muharram — day of fasting and remembrance.", category: "muslim" }},

  // ── MUSLIM FESTIVALS 2026 ────────────────────────────────────────
  { dateKey: "2026-02-18", festival: { id: "ramadan-2026",     name: "Ramadan Begins",      emoji: "🌙", description: "Holy month of fasting, prayer and reflection.",     category: "muslim" }},
  { dateKey: "2026-03-16", festival: { id: "laylat-2026",      name: "Laylat al-Qadr",      emoji: "⭐", description: "Night of Power — most blessed night of Ramadan.",   category: "muslim" }},
  { dateKey: "2026-03-20", festival: { id: "eid-fitr-2026",    name: "Eid ul-Fitr",         emoji: "🌙", description: "Festival of Breaking Fast — end of Ramadan.",        category: "muslim" }},
  { dateKey: "2026-05-27", festival: { id: "eid-adha-2026",    name: "Eid ul-Adha",         emoji: "🐑", description: "Festival of Sacrifice.",                             category: "muslim" }},
  { dateKey: "2026-06-16", festival: { id: "muharram-2026",    name: "Islamic New Year",    emoji: "🌙", description: "Start of Islamic Hijri New Year 1448.",              category: "muslim" }},
];

export function getFestivalsForDate(date: Date): Festival[] {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const fullKey = `${yyyy}-${mm}-${dd}`;
  const shortKey = `${mm}-${dd}`;
  return FESTIVAL_DATES
    .filter(fd => fd.dateKey === fullKey || fd.dateKey === shortKey)
    .map(fd => fd.festival);
}