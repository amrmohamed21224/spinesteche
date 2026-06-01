import React from "react";
import { Container } from "./Container";
import { useTranslation } from "../../i18n";

interface StateFeedbackProps {
  type: "loading" | "error" | "empty";
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const StateFeedback: React.FC<StateFeedbackProps> = ({ type, title, message, onRetry }) => {
  const { t } = useTranslation();

  const getDefaults = () => {
    switch (type) {
      case "loading":
        return {
          title: title || t("feedback.loadingTitle"),
          message: message || t("feedback.loadingMessage"),
        };
      case "error":
        return {
          title: title || t("feedback.errorTitle"),
          message: message || t("feedback.errorMessage"),
        };
      case "empty":
      default:
        return {
          title: title || t("feedback.emptyTitle"),
          message: message || t("feedback.emptyMessage"),
        };
    }
  };

  const { title: displayTitle, message: displayMessage } = getDefaults();

  return (
    <Container className="py-20 flex flex-col items-center justify-center text-center">
      <div
        role="status"
        aria-live="polite"
        className="max-w-md p-8 bg-white border border-outline-variant/30 rounded-2xl shadow-sm text-start flex flex-col items-center text-center"
      >
        {type === "loading" && (
          <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mb-6"></div>
        )}

        {type === "error" && (
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              error
            </span>
          </div>
        )}

        {type === "empty" && (
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl" aria-hidden="true">
              folder_open
            </span>
          </div>
        )}

        <h3 className="text-headline-sm font-bold text-primary mb-3">{displayTitle}</h3>
        <p className="text-body-md text-on-surface-variant mb-6">{displayMessage}</p>

        {type === "error" && onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-secondary text-on-secondary rounded-lg font-bold hover:bg-secondary/90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
          >
            {t("common.retry")}
          </button>
        )}
      </div>
    </Container>
  );
};
