import React from "react";
import { Container } from "./Container";
import { tokens } from "../../lib/tokens";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  bg?:
    | "default"
    | "surface"
    | "primary-container"
    | "surface-container"
    | "surface-container-low"
    | "surface-container-high"
    | "none";
  noContainer?: boolean;
  pattern?: boolean; // geometric / islamic pattern overlays
}

export const Section: React.FC<SectionProps> = ({
  children,
  bg = "none",
  noContainer = false,
  pattern = false,
  className = "",
  ...props
}) => {
  // Map bg option to CSS classes
  const bgClasses = {
    default: "bg-background",
    surface: "bg-surface",
    "primary-container": "bg-primary-container text-on-primary",
    "surface-container": "bg-surface-container",
    "surface-container-low": "bg-surface-container-low",
    "surface-container-high": "bg-surface-container-high",
    none: "",
  };

  const selectedBg = bgClasses[bg] || "";

  return (
    <section
      className={`relative ${tokens.spacing.sectionPadding} ${selectedBg} ${
        pattern ? "geometric-pattern overflow-hidden" : ""
      } ${className}`}
      {...props}
    >
      {noContainer ? children : <Container>{children}</Container>}
    </section>
  );
};
