/**
 * Centralized, type-safe Query Key factories for SpinesTech.
 * Prevents magic string keys and ensures consistent caching.
 */

export const queryKeys = {
  all: ["spinestech"] as const,
  services: {
    all: () => [...queryKeys.all, "services"] as const,
    list: () => [...queryKeys.services.all(), "list"] as const,
    detail: (slug: string) => [...queryKeys.services.all(), "detail", slug] as const,
  },
  sectors: {
    all: () => [...queryKeys.all, "sectors"] as const,
    list: () => [...queryKeys.sectors.all(), "list"] as const,
  },
  products: {
    all: () => [...queryKeys.all, "products"] as const,
    list: () => [...queryKeys.products.all(), "list"] as const,
  },
  caseStudies: {
    all: () => [...queryKeys.all, "caseStudies"] as const,
    list: () => [...queryKeys.caseStudies.all(), "list"] as const,
    detail: (slug: string) => [...queryKeys.caseStudies.all(), "detail", slug] as const,
  },
  pricing: {
    all: () => [...queryKeys.all, "pricing"] as const,
    list: () => [...queryKeys.pricing.all(), "list"] as const,
  },
  careers: {
    all: () => [...queryKeys.all, "careers"] as const,
    list: () => [...queryKeys.careers.all(), "list"] as const,
    detail: (slug: string) => [...queryKeys.careers.all(), "detail", slug] as const,
  },
  testimonials: {
    all: () => [...queryKeys.all, "testimonials"] as const,
    list: () => [...queryKeys.testimonials.all(), "list"] as const,
  },
  navigation: {
    all: () => [...queryKeys.all, "navigation"] as const,
    menu: () => [...queryKeys.navigation.all(), "menu"] as const,
  },
  about: {
    all: () => [...queryKeys.all, "about"] as const,
    data: () => [...queryKeys.about.all(), "data"] as const,
  },
  settings: {
    all: () => [...queryKeys.all, "settings"] as const,
    site: () => [...queryKeys.settings.all(), "site"] as const,
  },
};
