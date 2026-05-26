/**
 * Centralized, fully typed event dictionary for SpinesTech Analytics.
 */

export type AnalyticsCategory = "Engagement" | "Lead Generation" | "Navigation" | "System";

export interface BaseEventParams {
  category: AnalyticsCategory;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export interface PageViewParams {
  page_title: string;
  page_path: string;
  page_referrer?: string;
}

export interface CtaClickParams extends BaseEventParams {
  cta_text: string;
  cta_position: string; // e.g. "hero", "navbar", "footer", "pricing"
  cta_url?: string;
}

export interface FormSubmissionParams extends BaseEventParams {
  form_id: "contact" | "career" | "quote";
  form_name: string;
  submission_status: "success" | "error";
  error_message?: string;
}

export interface ScrollDepthParams extends BaseEventParams {
  depth_percentage: 25 | 50 | 75 | 100;
}

export interface OutboundLinkParams extends BaseEventParams {
  destination_url: string;
}

export type AnalyticsEvent =
  | { name: "page_view"; params: PageViewParams }
  | { name: "cta_click"; params: CtaClickParams }
  | { name: "form_submission"; params: FormSubmissionParams }
  | { name: "scroll_depth"; params: ScrollDepthParams }
  | { name: "outbound_link"; params: OutboundLinkParams };
