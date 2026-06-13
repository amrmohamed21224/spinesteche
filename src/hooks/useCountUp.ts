import { useState, useEffect } from "react";

/**
 * Animated counter hook. Counts from 0 to target over duration (ms).
 * Only starts counting when `started` becomes true.
 */
export function useCountUp(target: number, duration = 1500, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}
