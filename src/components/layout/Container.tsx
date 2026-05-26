import React from "react";
import { tokens } from "../../lib/tokens";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean; // If true, removes responsive margins
}

export const Container: React.FC<ContainerProps> = ({
  children,
  clean = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${tokens.spacing.containerMax} mx-auto ${
        clean ? "" : "px-margin-mobile md:px-margin-tablet lg:px-margin-desktop"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
