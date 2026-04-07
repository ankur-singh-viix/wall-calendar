"use client";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "./icons";

const MONTH_DATA: Record<
  number,
  {
    url: string;
    alt: string;
    season: string;
    festivals: string[];
    foods: string[];
  }
> = {
  0: {
    url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80",
    alt: "January winter",
    season: "Winter ❄️",
    festivals: ["Makar Sankranti", "Pongal"],
    foods: ["Gajar Halwa", "Til Laddu"],
  },
  1: {
    url: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=900&q=80",
    alt: "February frost",
    season: "Late Winter 🌤️",
    festivals: ["Basant Panchami"],
    foods: ["Strawberry", "Khichdi"],
  },
  2: {
    url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80",
    alt: "March spring",
    season: "Spring 🌸",
    festivals: ["Holi"],
    foods: ["Gujiya", "Thandai"],
  },
  3: {
    url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80",
    alt: "April summer",
    season: "Early Summer ☀️",
    festivals: ["Ram Navami", "Baisakhi"],
    foods: ["Buttermilk", "Cucumber"],
  },
  4: {
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80",
    alt: "May heat",
    season: "Peak Summer 🔥",
    festivals: [],
    foods: ["Mango", "Watermelon", "Lassi"],
  },
  5: {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    alt: "June monsoon",
    season: "Monsoon 🌧️",
    festivals: ["Rath Yatra"],
    foods: ["Corn", "Pakora"],
  },
  6: {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    alt: "July rain",
    season: "Monsoon 🌧️",
    festivals: ["Guru Purnima"],
    foods: ["Bhutta", "Tea"],
  },
  7: {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
    alt: "August greenery",
    season: "Monsoon 🌿",
    festivals: ["Raksha Bandhan", "Janmashtami"],
    foods: ["Kheer", "Sweets"],
  },
  8: {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    alt: "September calm",
    season: "Post-Monsoon 🌤️",
    festivals: ["Ganesh Chaturthi"],
    foods: ["Modak"],
  },
  9: {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80",
    alt: "October autumn",
    season: "Autumn 🍂",
    festivals: ["Navratri", "Dussehra"],
    foods: ["Fasting foods"],
  },
  10: {
    url: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=900&q=80",
    alt: "November festive",
    season: "Pre-Winter 🎆",
    festivals: ["Diwali"],
    foods: ["Laddoos", "Chakli"],
  },
  11: {
    url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=80",
    alt: "December cold",
    season: "Winter ❄️",
    festivals: ["Christmas", "New Year"],
    foods: ["Cake", "Hot Chocolate"],
  },
};

interface HeroSectionProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function HeroSection({
  month,
  year,
  onPrev,
  onNext,
}: HeroSectionProps) {
  const date = new Date(year, month, 1);
  const { url, alt, season, festivals, foods } = MONTH_DATA[month];

  return (
    <div className="relative w-full h-56 md:h-72 overflow-hidden bg-gradient-to-b from-gray-400 to-gray-600">
      {/* Hero image */}
      <img
        key={month}
        src={url}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-500"
        onError={(e) => {
            e.currentTarget.src =
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80";
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

      {/* Left: Seasonal Info */}
      <div className="absolute bottom-5 left-6 text-white max-w-[60%]">
        <p className="text-xs uppercase tracking-wider text-white/70">
          {season}
        </p>

        {festivals.length > 0 && (
          <p className="text-sm mt-1">
            🎉 {festivals.slice(0, 2).join(", ")}
          </p>
        )}

        {foods.length > 0 && (
          <p className="text-xs text-white/70">
            🍲 {foods.slice(0, 2).join(", ")}
          </p>
        )}
      </div>

      {/* Right: Month + Year */}
      <div className="absolute bottom-5 right-6 text-right">
        <p className="text-white/80 text-sm font-light tracking-[0.2em] uppercase">
          {format(date, "yyyy")}
        </p>
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wide uppercase leading-none">
          {format(date, "MMMM")}
        </h2>
        <div className="mt-2 ml-auto w-16 h-1 bg-[var(--calendar-blue)] rounded-full" />
      </div>

      {/* Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all flex items-center justify-center text-white"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all flex items-center justify-center text-white"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}