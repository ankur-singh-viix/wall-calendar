import { useState, useCallback } from "react";

type Direction = "left" | "right" | null;

export function useMonthTransition() {
  const [direction, setDirection]   = useState<Direction>(null);
  const [animating, setAnimating]   = useState(false);

  const trigger = useCallback((dir: "left" | "right", cb: () => void) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      cb();
      setDirection(null);
      setAnimating(false);
    }, 220);
  }, [animating]);

  return { direction, animating, trigger };
}