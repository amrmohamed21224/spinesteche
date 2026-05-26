import type { Locale } from "../i18n/types";
import type {
  CMSService,
  CMSPricingPlan,
  CMSFaq,
  CMSSector,
  CMSProduct,
  CMSCaseStudy,
  CMSJobPosition,
  CMSCoreValue,
  CMSDifferentiator,
  CMSMarketPresence,
  CMSStat,
} from "../types/cms";
import { mockServices } from "./services";
import { mockPricingPlans, mockFaqs } from "./pricing";
import { mockSectors } from "./sectors";
import { mockProducts } from "./products";
import { mockCaseStudies } from "./caseStudies";
import { mockCareers } from "./careers";
import {
  mockMission,
  mockVision,
  mockCoreValues,
  mockDifferentiators,
  mockMarkets,
  mockAboutStats,
} from "./about";
import {
  servicesEn,
  pricingPlansEn,
  faqsEn,
  aboutEn,
} from "./i18n-overrides/en";
import { sectorsEn, productsEn, caseStudiesEn, careersEn } from "./i18n-overrides/en-content";

function localizeServices(locale: Locale): CMSService[] {
  if (locale === "ar") return mockServices;
  return mockServices.map((s) => {
    const en = servicesEn[s.id];
    if (!en) return s;
    return { ...s, ...en };
  });
}

function localizePricing(locale: Locale): CMSPricingPlan[] {
  if (locale === "ar") return mockPricingPlans;
  return mockPricingPlans.map((p) => {
    const en = pricingPlansEn[p.id];
    return en ? { ...p, ...en } : p;
  });
}

function localizeFaqs(locale: Locale): CMSFaq[] {
  if (locale === "ar") return mockFaqs;
  return mockFaqs.map((f) => {
    const en = faqsEn[f.id];
    return en ? { ...f, ...en } : f;
  });
}

function localizeSectors(locale: Locale): CMSSector[] {
  if (locale === "ar") return mockSectors;
  return mockSectors.map((s) => {
    const en = sectorsEn[s.id];
    return en ? { ...s, ...en } : s;
  });
}

function localizeProducts(locale: Locale): CMSProduct[] {
  if (locale === "ar") return mockProducts;
  return mockProducts.map((p) => {
    const en = productsEn[p.id];
    return en ? { ...p, ...en } : p;
  });
}

function localizeCaseStudies(locale: Locale): CMSCaseStudy[] {
  if (locale === "ar") return mockCaseStudies;
  return mockCaseStudies.map((c) => {
    const en = caseStudiesEn[c.id];
    return en ? { ...c, ...en } : c;
  });
}

function localizeCareers(locale: Locale): CMSJobPosition[] {
  if (locale === "ar") return mockCareers;
  return mockCareers.map((j) => {
    const en = careersEn[j.id];
    return en ? { ...j, ...en } : j;
  });
}

export function getLocalizedAboutPage(locale: Locale) {
  if (locale === "ar") {
    return {
      mission: mockMission,
      vision: mockVision,
      coreValues: mockCoreValues,
      differentiators: mockDifferentiators,
      markets: mockMarkets,
      stats: mockAboutStats,
    };
  }

  return {
    mission: aboutEn.mission,
    vision: aboutEn.vision,
    coreValues: mockCoreValues.map((v) => ({
      ...v,
      ...(aboutEn.coreValues[v.id as keyof typeof aboutEn.coreValues] ?? {}),
    })) as CMSCoreValue[],
    differentiators: mockDifferentiators.map((d) => ({
      ...d,
      ...(aboutEn.differentiators[d.id as keyof typeof aboutEn.differentiators] ?? {}),
    })) as CMSDifferentiator[],
    markets: mockMarkets.map((m) => ({
      ...m,
      label: aboutEn.markets[m.id as keyof typeof aboutEn.markets] ?? m.label,
    })) as CMSMarketPresence[],
    stats: mockAboutStats.map((s) => ({
      ...s,
      label: aboutEn.stats[s.id as keyof typeof aboutEn.stats] ?? s.label,
    })) as CMSStat[],
  };
}

export {
  localizeServices,
  localizePricing,
  localizeFaqs,
  localizeSectors,
  localizeProducts,
  localizeCaseStudies,
  localizeCareers,
};
