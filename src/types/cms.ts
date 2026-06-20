/**
 * SpinesTech Headless CMS Type Definitions
 *
 * Provides strong typing for all CMS content models (WordPress, Strapi, etc.)
 */

export interface CMSNavigationLink {
  id: string;
  label: string;
  href: string;
  order: number;
}

export interface CMSSiteSettings {
  siteName: string;
  siteUrl: string;
  tagline: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  officeAddress: string;
}

export interface CMSService {
  id: string;
  title: string;
  description: string;
  icon: string; // Material symbol icon name, e.g. "code", "psychology"
  slug: string;
  details?: string[];
  features?: string[];
}

export interface CMSCaseStudy {
  id: string;
  title: string;
  client: string;
  sector: string; // e.g. "الرعاية الصحية", "القطاع الحكومي"
  image: string;
  slug: string;
  challenge: string;
  solution: string;
  result: string;
  stats?: { label: string; value: string }[];
  /** Behance-style extras (optional — falls back gracefully if absent) */
  gallery?: string[]; // additional full-width showcase images
  tags?: string[]; // e.g. ["UI/UX", "ERP", "Mobile"]
  year?: string;
  duration?: string; // e.g. "12 أسبوع"
  teamSize?: string; // e.g. "5 متخصصين"
  tools?: string[]; // e.g. ["React", "Node.js", "PostgreSQL"]
  featured?: boolean; // larger card in masonry grid
}

export interface CMSPricingPlan {
  id: string;
  name: string;
  tier: string; // Startup, Growth, Enterprise
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
}

export interface CMSJobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  slug: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface CMSTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface CMSTeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface CMSFaq {
  id: string;
  question: string;
  answer: string;
}

export interface CMSSector {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  image?: string;
  tags?: string[];
  /** Grid layout hint: "featured" = col-span-8, "tall" = h-96 col-span-6, "default" = col-span-4 */
  layout?: "featured" | "tall" | "accent" | "default";
}

export interface CMSProduct {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  badge?: string;
  features: string[];
  ctaPrimary: string;
  ctaSecondary?: string;
  // Detail page fields
  tagline?: string;
  longDescription?: string;
  highlights?: { icon: string; title: string; body: string }[];
  modules?: { title: string; description: string; icon: string }[];
  useCases?: string[];
  techSpecs?: string[];
  targetSectors?: string[];
  integrations?: string[];
}

export interface CMSCoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CMSDifferentiator {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface CMSMarketPresence {
  id: string;
  code: string; // e.g. "KSA", "GCC"
  label: string;
}

export interface CMSStat {
  id: string;
  value: string;
  label: string;
}

export interface CMSAboutPageData {
  mission: string;
  vision: string;
  coreValues: CMSCoreValue[];
  differentiators: CMSDifferentiator[];
  markets: CMSMarketPresence[];
  stats: CMSStat[];
}
