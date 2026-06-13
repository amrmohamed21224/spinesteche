import { useScrollReveal } from "../../hooks/useScrollReveal";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right";
}

/**
 * Wrapper component that reveals its children on scroll.
 * Uses IntersectionObserver for performance.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.12,
  direction = "up",
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal(threshold);

  const transforms = {
    up: "translateY(24px)",
    down: "translateY(-24px)",
    left: direction === "left" ? "translateX(24px)" : "translateX(-24px)",
    right: direction === "right" ? "translateX(-24px)" : "translateX(24px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
