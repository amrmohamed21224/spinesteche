import { CMSNavigationLink, CMSSiteSettings } from "../types/cms";

export const mockNavigation: CMSNavigationLink[] = [
  { id: "nav-1", label: "الرئيسية", href: "/", order: 1 },
  { id: "nav-2", label: "من نحن", href: "/about", order: 2 },
  { id: "nav-3", label: "خدماتنا", href: "/services", order: 3 },
  { id: "nav-4", label: "المنتجات", href: "/products", order: 4 },
  { id: "nav-5", label: "القطاعات", href: "/sectors", order: 5 },
  { id: "nav-6", label: "أعمالنا", href: "/case-studies", order: 6 },
  { id: "nav-7", label: "الأسعار", href: "/pricing", order: 7 },
  { id: "nav-8", label: "الوظائف", href: "/careers", order: 8 },
];

export const mockSiteSettings: CMSSiteSettings = {
  siteName: "SpinesTech",
  siteUrl: "https://spinestech.sa",
  tagline: "حلول برمجية مخصصة للشركات الطموحة",
  logo: "/logo.svg",
  contactEmail: "info@spinestech.sa",
  contactPhone: "+966 11 XXX XXXX",
  socials: {
    twitter: "https://twitter.com/spinestech",
    linkedin: "https://linkedin.com/company/spinestech",
  },
  officeAddress: "الرياض، حي النخيل، طريق الملك فهد",
};
