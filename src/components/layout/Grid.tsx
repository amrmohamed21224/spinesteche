import React from "react";
import { tokens } from "../../lib/tokens";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 2 | 3 | 4 | 12;
}

export const Grid: React.FC<GridProps> = ({ children, cols = 3, className = "", ...props }) => {
  const getColClasses = () => {
    switch (cols) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      case 12:
        return "grid-cols-1 md:grid-cols-12";
      case 3:
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getColClasses()} ${tokens.spacing.gutter} ${className}`} {...props}>
      {children}
    </div>
  );
};
