# 🗓️ Wall Calendar

> An interactive, production-ready wall calendar built with **Next.js 14 + Tailwind CSS** — inspired by a physical wall calendar design.

## 🌐 Live Demo

🔗 **[wall-calendar.vercel.app](https://wall-calendar.vercel.app)** ← replace with your actual URL

---

##  Preview

> *(Add a screenshot here after deploy — drag and drop into GitHub)*

---

##  Features

###  Calendar Core
- Physical wall calendar aesthetic with **spiral binding** and paper shadow depth
- **Hero image per month** with smooth Ken Burns zoom effect
- **Month slide animations** — left/right transitions on navigation
- Correct calendar grid for any month/year with **today highlighted**
- **Today button** — jump back to current month from anywhere

###  Date Selection
- **Single date selection** with visual highlight
- **Date range selection** — click start → click end
- **Hover preview** — see the range before confirming
- Clear button to reset selection
- Range summary bar showing duration

###  Festival System
| Category | Examples |
|---|---|
| 🪔 Hindu | Diwali, Holi, Navratri, Janmashtami, Ganesh Chaturthi |
| 🌙 Ekadashi | All 24 Ekadashi fasts for 2025 & 2026 |
| ☪️ Muslim | Eid ul-Fitr, Eid ul-Adha, Ramadan, Laylat al-Qadr, Mawlid |
| 🇮🇳 National | Republic Day, Independence Day, Gandhi Jayanti |
| 🌍 International | New Year, Valentine's Day, Earth Day, Christmas |
| 🎂 Personal | Custom birthdays & anniversaries (localStorage) |

- **Colored date backgrounds** per festival category
- **Hover tooltip** with festival name + description
- **Festival tags** auto-shown in Notes panel on selection

###  Notes
- Add notes to any **single date or date range**
- **Edit** and **delete** notes inline
- Persisted in **localStorage** — survives page refresh
- All other dates' notes visible at bottom of panel

###  Info Panel *(collapsible)*
- **Days remaining** with visual progress bar
- **Week numbers** for the month (W40, W41…)
- **Mini month previews** — prev & next month with range overlay
- **Upcoming festivals** — next 5 with countdown (Today / Tomorrow / 3d)
- **Selected range card** — duration, weeks, weekdays, weekends, festivals inside range

###  Custom Important Dates
- Modal to mark any date as important
- Choose category, emoji, name, description
- **Yearly repeat toggle**
- Shows on calendar like built-in festivals

###  Responsive Design
| Screen | Layout |
|---|---|
| Desktop ≥ 1024px | Notes panel left + grid right, side by side |
| Tablet ≥ 768px | Stacked, notes below |
| Mobile < 768px | Fully stacked, touch-friendly |

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14 | Framework (App Router) |
| Tailwind CSS | 3.4 | Styling |
| date-fns | 3.6 | Date utilities |
| TypeScript | 5 | Type safety |
| localStorage | — | Data persistence (no backend) |

---

##  Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/wall-calendar.git

# 2. Enter the project
cd wall-calendar

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

src/
├── app/
│   ├── globals.css           → Fonts, CSS variables, animations
│   ├── layout.tsx            → Root layout + SEO metadata
│   └── page.tsx              → Entry point
│
├── components/
│   ├── CalendarPage.tsx      → Main controller — state + layout
│   ├── CalendarShell.tsx     → Physical calendar (spiral, paper, hero)
│   ├── CalendarGrid.tsx      → Day grid with range + festival rendering
│   ├── CalendarLegend.tsx    → Category color legend strip
│   ├── HeroSection.tsx       → Hero image with Ken Burns + navigation
│   ├── NotesPanel.tsx        → Notes sidebar (add / edit / delete)
│   ├── InfoPanel.tsx         → Collapsible info panel (stats, mini months)
│   ├── AddCustomDateModal.tsx → Mark important date modal
│   ├── FestivalBadge.tsx     → Festival tooltip on hover
│   └── icons.tsx             → SVG chevron icons
│
├── data/
│   └── festivalData.ts       → All festivals (Hindu, Muslim, National, International)
│
├── hooks/
│   ├── useDateRange.ts       → Date range selection logic
│   └── useMonthTransition.ts → Slide animation hook
│
├── lib/
│   ├── calendarUtils.ts      → date-fns wrappers
│   ├── notesStorage.ts       → Notes localStorage helpers
│   └── customDatesStorage.ts → Custom dates localStorage helpers
│
└── types/
└── calendar.ts           → Shared TypeScript interfaces

---

##  Design Decisions

- **Plus Jakarta Sans** — clean, modern UI font with great readability
- **Playfair Display** — editorial serif for headings, gives wall calendar feel
- **CSS custom properties** — theming via `--calendar-*` variables
- **No backend** — fully client-side, works offline
- **date-fns** over moment.js — tree-shakeable, TypeScript-native, lightweight
- **Collapsible info panel** — keeps UI clean while offering rich data on demand

---

##  Git Commit History

| # | Commit | What was built |
|---|---|---|
| 1 | `feat: project scaffold` | Types, utils, localStorage helpers |
| 2 | `feat: calendar shell` | Spiral binding, hero image, layout panels |
| 3 | `feat: calendar grid` | Day grid, headers, today highlight |
| 4 | `feat: date range selection` | Start/end/hover preview, range summary |
| 5 | `feat: notes feature` | Add, edit, delete, localStorage persist |
| 6 | `feat: festival system` | Hindu, Muslim, National, International dates |
| 7 | `feat: full UI overhaul` | Cleaner design, better typography |
| 8 | `feat: legend + mark important` | Legend bar, custom date modal, Today button |
| 9 | `feat: animations` | Month slide, Ken Burns, modal spring |
| 10 | `feat: production deploy` | SEO metadata, Vercel config |
| 11 | `feat: info panel` | Stats, mini months, upcoming festivals, range card |
| 12 | `fix: festival backgrounds` | Diwali 2026, dot colors, opacity fix |

---

## 🚀 Deploy on Vercel

```bash
# Option A — CLI
npm install -g vercel
vercel login
vercel --prod

# Option B — Dashboard
# 1. Push to GitHub
# 2. Go to vercel.com → New Project → Import repo
# 3. Click Deploy (zero config needed)
```

---

##  Future Enhancements

- [ ] Dark mode / seasonal themes
- [ ] iCal / Google Calendar export
- [ ] Week view toggle
- [ ] Recurring event support
- [ ] Push notifications for important dates
- [ ] Drag to select date ranges

---

##  Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Live: [wall-calendar.vercel.app](https://wall-calendar.vercel.app)

---

<p align="center">Built by Ankur using Next.js + Tailwind CSS</p>