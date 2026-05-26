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
