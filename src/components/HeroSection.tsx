"use client";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "./icons";

const MONTH_IMAGES: Record<number, { url: string; alt: string }> = {
  0:  { url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1000&q=80", alt: "Winter"    },
  1:  { url: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1000&q=80", alt: "February"  },
  2:  { url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80", alt: "March"    },
  3:  { url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1000&q=80", alt: "April"     },
  4:  { url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80", alt: "May"       },
  5:  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80", alt: "June"      },
  6:  { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80", alt: "July"      },
  7:  { url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1000&q=80", alt: "August"    },
  8:  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80", alt: "September" },
  9:  { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000&q=80", alt: "October"   },
  10: { url: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1000&q=80", alt: "November"  },
  11: { url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1000&q=80", alt: "December"  },
};

interface HeroSectionProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  animClass?: string;
}

export default function HeroSection({
  month, year, onPrev, onNext, animClass = "",
}: HeroSectionProps) {
  const date = new Date(year, month, 1);
  const { url, alt } = MONTH_IMAGES[month];

  return (
    <div className={`relative w-full h-52 md:h-64 overflow-hidden ${animClass}`}>

      {/* Ken Burns image */}
      <img
        src={url} alt={alt}
        className="hero-image w-full h-full object-cover"
        key={`${year}-${month}`}
      />

      {/* Gradient */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 100%)" }}
      />

      {/* Top dots */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
          ))}
        </div>
        <p className="text-white/50 text-[10px] tracking-[0.25em] uppercase font-medium">
          Wall Calendar
        </p>
        <div className="w-12" />
      </div>

      {/* Month + nav */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-5
        flex items-end justify-between">
        <div>
          <p className="text-white/55 text-xs tracking-[0.2em] uppercase mb-1">
            {format(date, "yyyy")}
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {format(date, "MMMM")}
          </h2>
          {/* Accent line */}
          <div className="mt-2 w-10 h-0.5 bg-white/40 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onPrev} aria-label="Previous month"
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md
              hover:bg-white/30 active:scale-95 transition-all
              flex items-center justify-center text-white border border-white/20">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={onNext} aria-label="Next month"
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md
              hover:bg-white/30 active:scale-95 transition-all
              flex items-center justify-center text-white border border-white/20">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}