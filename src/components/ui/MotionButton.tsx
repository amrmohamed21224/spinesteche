import * as React from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "../../lib/utils";

type MotionButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
);

const variants = {
  primary: "bg-secondary text-on-secondary hover:bg-secondary/90 shadow-md",
  secondary: "bg-primary-container text-on-primary hover:opacity-90 shadow-md",
  outline: "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/5",
  ghost: "text-secondary hover:bg-secondary/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl font-bold",
};

export function MotionButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: MotionButtonProps) {
  const classes = cn(
    "btn-motion inline-flex items-center justify-center gap-2 font-label-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link to={href} className={classes} {...(props as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
