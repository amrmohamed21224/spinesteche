import { useCallback } from "react";
import { logEvent } from "../lib/analytics/ga";
import {
  CtaClickParams,
  FormSubmissionParams,
  OutboundLinkParams,
  ScrollDepthParams,
} from "../lib/analytics/events";

export function useAnalytics() {
  const trackPageView = useCallback((title: string, path: string) => {
    logEvent({
      name: "page_view",
      params: {
        page_title: title,
        page_path: path,
        page_referrer: typeof document !== "undefined" ? document.referrer : undefined,
      },
    });
  }, []);

  const trackCtaClick = useCallback((params: Omit<CtaClickParams, "category">) => {
    logEvent({
      name: "cta_click",
      params: {
        category: "Engagement",
        ...params,
      } as CtaClickParams,
    });
  }, []);

  const trackFormSubmission = useCallback((params: Omit<FormSubmissionParams, "category">) => {
    logEvent({
      name: "form_submission",
      params: {
        category: "Lead Generation",
        ...params,
      } as FormSubmissionParams,
    });
  }, []);

  const trackScrollDepth = useCallback((params: Omit<ScrollDepthParams, "category">) => {
    logEvent({
      name: "scroll_depth",
      params: {
        category: "Engagement",
        ...params,
      } as ScrollDepthParams,
    });
  }, []);

  const trackOutboundLink = useCallback((params: Omit<OutboundLinkParams, "category">) => {
    logEvent({
      name: "outbound_link",
      params: {
        category: "Navigation",
        ...params,
      } as OutboundLinkParams,
    });
  }, []);

  return {
    trackPageView,
    trackCtaClick,
    trackFormSubmission,
    trackScrollDepth,
    trackOutboundLink,
  };
}
export default useAnalytics;
