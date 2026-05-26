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
  CMSCoreValue,
  CMSDifferentiator,
  CMSMarketPresence,
  CMSStat,
  CMSNavigationLink,
} from "../../types/cms";

// Import mock datasets for fallback/simulation mode
import { mockServices } from "../../data/services";
import { mockCaseStudies } from "../../data/caseStudies";
import { mockPricingPlans, mockFaqs } from "../../data/pricing";
import { mockCareers } from "../../data/careers";
import { mockTestimonials, mockTeamMembers } from "../../data/testimonials";
import { mockSectors } from "../../data/sectors";
import { mockProducts } from "../../data/products";
import { mockNavigation, mockSiteSettings } from "../../data/navigation";
import {
  mockCoreValues,
  mockDifferentiators,
  mockMarkets,
  mockAboutStats,
  mockMission,
  mockVision,
} from "../../data/about";

// Helper to determine if we should bypass network and use mocks directly
const USE_MOCKS = true; // Set to true to simulate loading state and client logic offline

/**
 * Services Fetchers
 */
export async function getServices(): Promise<CMSService[]> {
  if (USE_MOCKS) {
    // Simulate API fetch delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockServices;
  }
  return cmsClient.get<CMSService[]>(ENDPOINTS.SERVICES);
}

export async function getServiceBySlug(slug: string): Promise<CMSService | null> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockServices.find((s) => s.slug === slug) || null;
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
export async function getCaseStudies(): Promise<CMSCaseStudy[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockCaseStudies;
  }
  return cmsClient.get<CMSCaseStudy[]>(ENDPOINTS.CASE_STUDIES);
}

export async function getCaseStudyBySlug(slug: string): Promise<CMSCaseStudy | null> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCaseStudies.find((cs) => cs.slug === slug) || null;
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
export async function getPricingPlans(): Promise<CMSPricingPlan[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockPricingPlans;
  }
  return cmsClient.get<CMSPricingPlan[]>(ENDPOINTS.PRICING);
}

export async function getFaqs(): Promise<CMSFaq[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockFaqs;
  }
  return cmsClient.get<CMSFaq[]>(ENDPOINTS.FAQS);
}

/**
 * Careers / Job Position Fetchers
 */
export async function getCareers(): Promise<CMSJobPosition[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCareers;
  }
  return cmsClient.get<CMSJobPosition[]>(ENDPOINTS.CAREERS);
}

export async function getJobBySlug(slug: string): Promise<CMSJobPosition | null> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCareers.find((job) => job.slug === slug) || null;
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
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "تم استلام رسالتك بنجاح! وسنتواصل معك قريباً." };
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
export async function getSectors(): Promise<CMSSector[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockSectors;
  }
  return cmsClient.get<CMSSector[]>("/sectors");
}

/**
 * Products Fetchers
 */
export async function getProducts(): Promise<CMSProduct[]> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockProducts;
  }
  return cmsClient.get<CMSProduct[]>("/products");
}

/**
 * About Page Fetchers
 */
export async function getAboutPageData(): Promise<{
  mission: string;
  vision: string;
  coreValues: CMSCoreValue[];
  differentiators: CMSDifferentiator[];
  markets: CMSMarketPresence[];
  stats: CMSStat[];
}> {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      mission: mockMission,
      vision: mockVision,
      coreValues: mockCoreValues,
      differentiators: mockDifferentiators,
      markets: mockMarkets,
      stats: mockAboutStats,
    };
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
