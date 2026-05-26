import React, { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { StateFeedback } from "../layout/StateFeedback";

interface AsyncBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

export const AsyncBoundary: React.FC<AsyncBoundaryProps> = ({
  children,
  fallback = <StateFeedback type="loading" />,
  errorFallback,
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
export default AsyncBoundary;
