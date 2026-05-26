import type { ElementType } from "react";
import { useReveal } from "../../hooks/useReveal";
import { cn } from "../../lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleReveal" | "stagger";
  as?: ElementType;
};

/**
 * Optional explicit reveal wrapper. PageLayout also auto-animates [data-reveal] sections.
 */
export function Reveal({
  children,
  className,
  variant = "fadeInUp",
  as: Tag = "div",
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ variant });

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
