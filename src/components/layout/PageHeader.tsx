import React from "react";
import { tokens } from "../../lib/tokens";

interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  badge?: string;
  centered?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  centered = false,
  className = "",
  ...props
}) => {
  return (
    <header
      className={`mb-20 max-w-3xl ${centered ? "mx-auto text-center" : "text-right"} ${className}`}
      {...props}
    >
      {badge && (
        <span className="inline-block bg-secondary/10 text-secondary font-label-md text-label-md px-3 py-1 rounded-full mb-6">
          {badge}
        </span>
      )}

      <h1
        className={`${tokens.typography.sizes.displayLg} text-primary mb-6 font-bold leading-tight`}
      >
        {title}
      </h1>

      {description && (
        <p className={`${tokens.typography.sizes.bodyLg} text-on-surface-variant leading-relaxed`}>
          {description}
        </p>
      )}
    </header>
  );
};
