/**
 * SpinesTech API Layer - Barrel Export
 *
 * Single entry point for the entire CMS data layer.
 * Import everything from `@/lib/api` instead of individual files.
 */

// Client
export { cmsClient } from "./client";

// Endpoints
export { ENDPOINTS } from "./endpoints";

// Fetchers
export {
  // Services
  getServices,
  getServiceBySlug,
  // Case Studies
  getCaseStudies,
  getCaseStudyBySlug,
  // Pricing & FAQ
  getPricingPlans,
  getFaqs,
  // Careers
  getCareers,
  getJobBySlug,
  // Testimonials & Team
  getTestimonials,
  getTeamMembers,
  // Sectors
  getSectors,
  // Products
  getProducts,
  // About
  getAboutPageData,
  // Navigation & Settings
  getNavigation,
  getSiteSettings,
  // Form Submissions
  submitContactForm,
  submitCareerApplication,
  submitQuoteRequest,
} from "./fetchers";
