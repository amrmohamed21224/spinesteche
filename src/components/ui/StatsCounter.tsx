import { useEffect, useRef, useState } from "react";

interface Stat {
  id: string;
  value: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
  className?: string;
}

// Parse "50+", "99%", "24/7", "100+" into numeric + suffix
function parseStat(value: string): { num: number; suffix: string; static?: boolean } {
  // special case: no number to animate (e.g. "24/7")
  if (!/\d+/.test(value)) return { num: 0, suffix: value, static: true };

  const match = value.match(/^(\d+)(.*)/);
  if (!match) return { num: 0, suffix: value, static: true };

  return {
    num: parseInt(match[1], 10),
    suffix: match[2], // "+", "%", etc.
  };
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

function AnimatedStat({ stat, active }: { stat: Stat; active: boolean }) {
  const parsed = parseStat(stat.value);
  const count = useCountUp(parsed.num, 1800, active && !parsed.static);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-secondary font-display-lg text-display-lg mb-2 tabular-nums">
        {parsed.static ? stat.value : `${count}${parsed.suffix}`}
      </div>
      <div className="font-label-md text-label-md text-on-primary-container">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsCounter({ stats, className = "" }: StatsCounterProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 gap-gutter text-center ${className}`}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.id}
          className="bg-surface/10 p-8 rounded border border-surface/20"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "none" : "translateY(12px)",
            transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
          }}
        >
          <AnimatedStat stat={stat} active={active} />
        </div>
      ))}
    </div>
  );
}
