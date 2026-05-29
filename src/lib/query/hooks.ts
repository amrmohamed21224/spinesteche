import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import {
  getServices,
  getSectors,
  getProducts,
  getCaseStudies,
  getCareers,
  getTestimonials,
  submitContactForm,
  submitCareerApplication,
  submitQuoteRequest,
} from "../api/fetchers";

/**
 * Hook to retrieve services.
 */
export function useServices() {
  return useQuery({
    queryKey: queryKeys.services.list(),
    queryFn: () => getServices(),
  });
}

/**
 * Hook to retrieve sectors.
 */
export function useSectors() {
  return useQuery({
    queryKey: queryKeys.sectors.list(),
    queryFn: () => getSectors(),
  });
}

/**
 * Hook to retrieve products.
 */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: () => getProducts(),
  });
}

/**
 * Hook to retrieve case studies.
 */
export function useCaseStudies() {
  return useQuery({
    queryKey: queryKeys.caseStudies.list(),
    queryFn: () => getCaseStudies(),
  });
}

/**
 * Hook to retrieve careers.
 */
export function useCareers() {
  return useQuery({
    queryKey: queryKeys.careers.list(),
    queryFn: () => getCareers(),
  });
}

/**
 * Hook to retrieve testimonials.
 */
export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials.list(),
    queryFn: () => getTestimonials(),
  });
}

/**
 * Mutation hook for Contact Form submission.
 */
export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      message: string;
      source?: string;
      locale?: import("../../i18n/types").Locale;
    }) => submitContactForm(data, data.locale ?? "ar"),
  });
}

/**
 * Mutation hook for Career Application submission.
 */
export function useSubmitCareer() {
  return useMutation({
    mutationFn: (data: FormData) => submitCareerApplication(data),
  });
}

/**
 * Mutation hook for Quote Request submission.
 */
export function useSubmitQuote() {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone: string;
      company: string;
      projectType: string;
      budget: string;
      details: string;
    }) => submitQuoteRequest(data),
  });
}
