import { cmsClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import { env } from "../../config/env";
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
  CMSAboutPageData,
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

const MOCK_DELAY_MS = 400;

function isMockMode(): boolean {
  return env.USE_MOCKS;
}

function withLang(path: string, locale: Locale = "ar"): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=${locale}`;
}

async function mockDelay(ms = MOCK_DELAY_MS) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getServices(locale: Locale = "ar"): Promise<CMSService[]> {
  if (isMockMode()) {
    await mockDelay(500);
    return localizeServices(locale);
  }
  return cmsClient.get<CMSService[]>(withLang(ENDPOINTS.SERVICES, locale));
}

export async function getServiceBySlug(
  slug: string,
  locale: Locale = "ar",
): Promise<CMSService | null> {
  if (isMockMode()) {
    await mockDelay(300);
    return localizeServices(locale).find((s) => s.slug === slug) || null;
  }
  try {
    return await cmsClient.get<CMSService>(withLang(`${ENDPOINTS.SERVICES}/${slug}`, locale));
  } catch {
    return null;
  }
}

export async function getCaseStudies(locale: Locale = "ar"): Promise<CMSCaseStudy[]> {
  if (isMockMode()) {
    await mockDelay(600);
    return localizeCaseStudies(locale);
  }
  return cmsClient.get<CMSCaseStudy[]>(withLang(ENDPOINTS.CASE_STUDIES, locale));
}

export async function getCaseStudyBySlug(
  slug: string,
  locale: Locale = "ar",
): Promise<CMSCaseStudy | null> {
  if (isMockMode()) {
    await mockDelay(300);
    return localizeCaseStudies(locale).find((cs) => cs.slug === slug) || null;
  }
  try {
    return await cmsClient.get<CMSCaseStudy>(withLang(`${ENDPOINTS.CASE_STUDIES}/${slug}`, locale));
  } catch {
    return null;
  }
}

export async function getPricingPlans(locale: Locale = "ar"): Promise<CMSPricingPlan[]> {
  if (isMockMode()) {
    await mockDelay(400);
    return localizePricing(locale);
  }
  return cmsClient.get<CMSPricingPlan[]>(withLang(ENDPOINTS.PRICING, locale));
}

export async function getFaqs(locale: Locale = "ar"): Promise<CMSFaq[]> {
  if (isMockMode()) {
    await mockDelay(300);
    return localizeFaqs(locale);
  }
  return cmsClient.get<CMSFaq[]>(withLang(ENDPOINTS.FAQS, locale));
}

export async function getCareers(locale: Locale = "ar"): Promise<CMSJobPosition[]> {
  if (isMockMode()) {
    await mockDelay(500);
    return localizeCareers(locale);
  }
  return cmsClient.get<CMSJobPosition[]>(withLang(ENDPOINTS.CAREERS, locale));
}

export async function getJobBySlug(
  slug: string,
  locale: Locale = "ar",
): Promise<CMSJobPosition | null> {
  if (isMockMode()) {
    await mockDelay(300);
    return localizeCareers(locale).find((job) => job.slug === slug) || null;
  }
  try {
    return await cmsClient.get<CMSJobPosition>(withLang(`${ENDPOINTS.CAREERS}/${slug}`, locale));
  } catch {
    return null;
  }
}

export async function getTestimonials(locale: Locale = "ar"): Promise<CMSTestimonial[]> {
  if (isMockMode()) {
    await mockDelay(400);
    return mockTestimonials;
  }
  return cmsClient.get<CMSTestimonial[]>(withLang(ENDPOINTS.TESTIMONIALS, locale));
}

export async function getTeamMembers(locale: Locale = "ar"): Promise<CMSTeamMember[]> {
  if (isMockMode()) {
    await mockDelay(400);
    return mockTeamMembers;
  }
  return cmsClient.get<CMSTeamMember[]>(withLang(ENDPOINTS.TEAM_MEMBERS, locale));
}

export async function submitContactForm(
  data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    source?: string;
  },
  locale: Locale = "ar",
): Promise<{ success: boolean; message: string }> {
  if (isMockMode()) {
    await mockDelay(1000);
    return {
      success: true,
      message:
        locale === "en"
          ? "Your message was received! We will contact you soon."
          : "تم استلام رسالتك بنجاح! وسنتواصل معك قريباً.",
    };
  }
  return cmsClient.post<{ success: boolean; message: string }>(ENDPOINTS.CONTACT_SUBMISSION, {
    ...data,
    locale,
  });
}

export async function submitCareerApplication(
  data: FormData,
  locale: Locale = "ar",
): Promise<{ success: boolean; message: string }> {
  if (isMockMode()) {
    await mockDelay(1200);
    return {
      success: true,
      message:
        locale === "en"
          ? "Your application was submitted successfully. Thank you for your interest!"
          : "تم إرسال طلب التقديم بنجاح! شكراً لاهتمامك.",
    };
  }
  if (!data.has("locale")) {
    data.append("locale", locale);
  }
  return cmsClient.post<{ success: boolean; message: string }>(ENDPOINTS.CAREER_SUBMISSION, data);
}

export async function submitQuoteRequest(
  data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    budget: string;
    details: string;
  },
  locale: Locale = "ar",
): Promise<{ success: boolean; message: string }> {
  if (isMockMode()) {
    await mockDelay(1000);
    return {
      success: true,
      message:
        locale === "en"
          ? "Your quote request was received successfully."
          : "تم إرسال طلب عرض السعر بنجاح! سيقوم مستشارنا التقني بالرد عليك.",
    };
  }
  return cmsClient.post<{ success: boolean; message: string }>(ENDPOINTS.QUOTE_SUBMISSION, {
    ...data,
    locale,
  });
}

export async function getSectors(locale: Locale = "ar"): Promise<CMSSector[]> {
  if (isMockMode()) {
    await mockDelay(400);
    return localizeSectors(locale);
  }
  return cmsClient.get<CMSSector[]>(withLang(ENDPOINTS.SECTORS, locale));
}

export async function getProducts(locale: Locale = "ar"): Promise<CMSProduct[]> {
  if (isMockMode()) {
    await mockDelay(400);
    return localizeProducts(locale);
  }
  return cmsClient.get<CMSProduct[]>(withLang(ENDPOINTS.PRODUCTS, locale));
}

export async function getProductBySlug(
  slug: string,
  locale: Locale = "ar",
): Promise<CMSProduct | null> {
  if (isMockMode()) {
    await mockDelay(300);
    return localizeProducts(locale).find((p) => p.slug === slug) || null;
  }
  try {
    return await cmsClient.get<CMSProduct>(withLang(`${ENDPOINTS.PRODUCTS}/${slug}`, locale));
  } catch {
    return null;
  }
}

export async function getAboutPageData(locale: Locale = "ar"): Promise<CMSAboutPageData> {
  if (isMockMode()) {
    await mockDelay(400);
    return getLocalizedAboutPage(locale);
  }
  return cmsClient.get<CMSAboutPageData>(withLang(ENDPOINTS.ABOUT, locale));
}

export async function getNavigation(): Promise<CMSNavigationLink[]> {
  if (isMockMode()) {
    await mockDelay(200);
    return mockNavigation;
  }
  return cmsClient.get<CMSNavigationLink[]>(ENDPOINTS.NAVIGATION);
}

export async function getSiteSettings(): Promise<CMSSiteSettings> {
  if (isMockMode()) {
    await mockDelay(200);
    return mockSiteSettings;
  }
  return cmsClient.get<CMSSiteSettings>(ENDPOINTS.SETTINGS);
}

export async function checkApiHealth(): Promise<{ status: string }> {
  return cmsClient.get<{ status: string }>("/health");
}
