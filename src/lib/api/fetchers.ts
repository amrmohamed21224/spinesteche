import { cmsClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import {
  CMSService,
  CMSCaseStudy,
  CMSPricingPlan,
  CMSJobPosition,
  CMSTestimonial,
  CMSTeamMember,
  CMSFaq,
  CMSSiteSettings,
  CMSSector,
  CMSProduct,
  CMSNavigationLink,
} from "../../types/cms";
import type { Locale } from "../../i18n/types";
import {
  localizeServices,
  localizePricing,
  localizeFaqs,
  localizeSectors,
  localizeProducts,
  localizeCaseStudies,
  localizeCareers,
  getLocalizedAboutPage,
} from "../../data/localized";
import { mockTestimonials, mockTeamMembers } from "../../data/testimonials";
import { mockNavigation, mockSiteSettings } from "../../data/navigation";

// Helper to determine if we should bypass network and use mocks directly
const USE_MOCKS = true; // Set to true to simulate loading state and client logic offline

const MOCK_DELAY_MS = 400;

async function mockDelay(ms = MOCK_DELAY_MS) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Services Fetchers
 */
export async function getServices(locale: Locale = "ar"): Promise<CMSService[]> {
  if (USE_MOCKS) {
    await mockDelay(500);
    return localizeServices(locale);
  }
  return cmsClient.get<CMSService[]>(ENDPOINTS.SERVICES);
}

export async function getServiceBySlug(
  slug: string,
  locale: Locale = "ar",
): Promise<CMSService | null> {
  if (USE_MOCKS) {
    await mockDelay(300);
    return localizeServices(locale).find((s) => s.slug === slug) || null;
  }
  try {
    return await cmsClient.get<CMSService>(`${ENDPOINTS.SERVICES}/${slug}`);
  } catch {
    return null;
  }
}

/**
 * Case Studies Fetchers
 */
export async function getCaseStudies(locale: Locale = "ar"): Promise<CMSCaseStudy[]> {
  if (USE_MOCKS) {
    await mockDelay(600);
    return localizeCaseStudies(locale);
  }
  return cmsClient.get<CMSCaseStudy[]>(ENDPOINTS.CASE_STUDIES);
}

export async function getCaseStudyBySlug(
  slug: string,
  locale: Locale = "ar",
): Promise<CMSCaseStudy | null> {
  if (USE_MOCKS) {
    await mockDelay(300);
    return localizeCaseStudies(locale).find((cs) => cs.slug === slug) || null;
  }
  try {
    return await cmsClient.get<CMSCaseStudy>(`${ENDPOINTS.CASE_STUDIES}/${slug}`);
  } catch {
    return null;
  }
}

/**
 * Pricing & FAQ Fetchers
 */
export async function getPricingPlans(locale: Locale = "ar"): Promise<CMSPricingPlan[]> {
  if (USE_MOCKS) {
    await mockDelay(400);
    return localizePricing(locale);
  }
  return cmsClient.get<CMSPricingPlan[]>(ENDPOINTS.PRICING);
}

export async function getFaqs(locale: Locale = "ar"): Promise<CMSFaq[]> {
  if (USE_MOCKS) {
    await mockDelay(300);
    return localizeFaqs(locale);
  }
  return cmsClient.get<CMSFaq[]>(ENDPOINTS.FAQS);
}

/**
 * Careers / Job Position Fetchers
 */
export async function getCareers(locale: Locale = "ar"): Promise<CMSJobPosition[]> {
  if (USE_MOCKS) {
    await mockDelay(500);
    return localizeCareers(locale);
  }
  return cmsClient.get<CMSJobPosition[]>(ENDPOINTS.CAREERS);
}

export async function getJobBySlug(
  slug: string,
  locale: Locale = "ar",
): Promise<CMSJobPosition | null> {
  if (USE_MOCKS) {
    await mockDelay(300);
    return localizeCareers(locale).find((job) => job.slug === slug) || null;
  }
  try {
    return await cmsClient.get<CMSJobPosition>(`${ENDPOINTS.CAREERS}/${slug}`);
  } catch {
    return null;
  }
}

/**
 * Testimonials & Team Fetchers
 */
export async function getTestimonials(): Promise<CMSTestimonial[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockTestimonials;
  }
  return cmsClient.get<CMSTestimonial[]>(ENDPOINTS.TESTIMONIALS);
}

export async function getTeamMembers(): Promise<CMSTeamMember[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockTeamMembers;
  }
  return cmsClient.get<CMSTeamMember[]>(ENDPOINTS.TEAM_MEMBERS);
}

/**
 * Form Submission Fetchers (API preparation)
 */
export async function submitContactForm(
  data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  },
  locale: Locale = "ar",
): Promise<{ success: boolean; message: string }> {
  if (USE_MOCKS) {
    await mockDelay(1000);
    return {
      success: true,
      message:
        locale === "en"
          ? "Your message was received! We will contact you soon."
          : "تم استلام رسالتك بنجاح! وسنتواصل معك قريباً.",
    };
  }
  return cmsClient.post<{ success: boolean; message: string }>(ENDPOINTS.CONTACT_SUBMISSION, data);
}

export async function submitCareerApplication(
  data: FormData,
): Promise<{ success: boolean; message: string }> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return { success: true, message: "تم إرسال طلب التقديم بنجاح! شكراً لاهتمامك." };
  }
  // Note: FormData POST should let the browser set the boundary headers automatically
  return cmsClient.post<{ success: boolean; message: string }>(ENDPOINTS.CAREER_SUBMISSION, data);
}

export async function submitQuoteRequest(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  details: string;
}): Promise<{ success: boolean; message: string }> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "تم إرسال طلب عرض السعر بنجاح! سيقوم مستشارنا التقني بالرد عليك.",
    };
  }
  return cmsClient.post<{ success: boolean; message: string }>(ENDPOINTS.QUOTE_SUBMISSION, data);
}

/**
 * Sectors Fetchers
 */
export async function getSectors(locale: Locale = "ar"): Promise<CMSSector[]> {
  if (USE_MOCKS) {
    await mockDelay(400);
    return localizeSectors(locale);
  }
  return cmsClient.get<CMSSector[]>("/sectors");
}

/**
 * Products Fetchers
 */
export async function getProducts(locale: Locale = "ar"): Promise<CMSProduct[]> {
  if (USE_MOCKS) {
    await mockDelay(400);
    return localizeProducts(locale);
  }
  return cmsClient.get<CMSProduct[]>("/products");
}

/**
 * About Page Fetchers
 */
export async function getAboutPageData(locale: Locale = "ar") {
  if (USE_MOCKS) {
    await mockDelay(400);
    return getLocalizedAboutPage(locale);
  }
  return cmsClient.get("/about");
}

/**
 * Navigation & Site Settings Fetchers
 */
export async function getNavigation(): Promise<CMSNavigationLink[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockNavigation;
  }
  return cmsClient.get<CMSNavigationLink[]>("/navigation");
}

export async function getSiteSettings(): Promise<CMSSiteSettings> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockSiteSettings;
  }
  return cmsClient.get<CMSSiteSettings>(ENDPOINTS.SETTINGS);
}
