import { env } from "../../../config/env";
import { cmsClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import {
  CMSService,
  CMSSector,
  CMSCaseStudy,
  CMSJobPosition,
  CMSTestimonial,
  CMSNavigationLink,
  CMSSiteSettings,
} from "../../../types/cms";

// Fallback Mock Datasets
import { mockServices } from "../../../data/services";
import { mockSectors } from "../../../data/sectors";
import { mockCaseStudies } from "../../../data/caseStudies";
import { mockCareers } from "../../../data/careers";
import { mockTestimonials } from "../../../data/testimonials";
import { mockNavigation, mockSiteSettings } from "../../../data/navigation";

/**
 * Helper to wrap and execute API calls with mock fallback triggers.
 */
async function executeCmsQuery<T>(
  endpoint: string,
  mockData: T,
  options?: Record<string, unknown>,
): Promise<T> {
  if (env.USE_MOCKS) {
    return mockData;
  }

  try {
    return await cmsClient.get<T>(endpoint, options);
  } catch (error) {
    console.error(`[CMS Fetch Fallback on ${endpoint}]:`, error);
    // Graceful fallback to static mock content instead of crashing the site
    return mockData;
  }
}

export async function fetchCmsServices(): Promise<CMSService[]> {
  return executeCmsQuery<CMSService[]>(ENDPOINTS.SERVICES, mockServices);
}

export async function fetchCmsSectors(): Promise<CMSSector[]> {
  return executeCmsQuery<CMSSector[]>(ENDPOINTS.SECTORS, mockSectors);
}

export async function fetchCmsCaseStudies(): Promise<CMSCaseStudy[]> {
  return executeCmsQuery<CMSCaseStudy[]>(ENDPOINTS.CASE_STUDIES, mockCaseStudies);
}

export async function fetchCmsCareers(): Promise<CMSJobPosition[]> {
  return executeCmsQuery<CMSJobPosition[]>(ENDPOINTS.CAREERS, mockCareers);
}

export async function fetchCmsTestimonials(): Promise<CMSTestimonial[]> {
  return executeCmsQuery<CMSTestimonial[]>(ENDPOINTS.TESTIMONIALS, mockTestimonials);
}

export async function fetchCmsNavigation(): Promise<CMSNavigationLink[]> {
  return executeCmsQuery<CMSNavigationLink[]>(ENDPOINTS.NAVIGATION, mockNavigation);
}

export async function fetchCmsSiteSettings(): Promise<CMSSiteSettings> {
  return executeCmsQuery<CMSSiteSettings>(ENDPOINTS.SETTINGS, mockSiteSettings);
}
