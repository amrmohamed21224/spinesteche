/**
 * JSON-LD Structured Data Schema Generators for SpinesTech
 */

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    telephone: string;
    contactType: string;
    email: string;
    areaServed: string;
    availableLanguage: string[];
  };
}

export function getOrganizationSchema(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SpinesTech",
    alternateName: "سباينز تيك",
    url: "https://spinestech.sa",
    logo: "https://spinestech.sa/logo.svg",
    sameAs: ["https://twitter.com/spinestech", "https://linkedin.com/company/spinestech"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966 11 XXX XXXX",
      contactType: "sales",
      email: "info@spinestech.sa",
      areaServed: ["SA", "AE", "QA", "OM", "BH", "KW"],
      availableLanguage: ["Arabic", "English"],
    },
  };

  return JSON.stringify(schema);
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `https://spinestech.sa${item.item}`,
    })),
  };

  return JSON.stringify(schema);
}

export function getCaseStudySchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished?: string;
  clientName: string;
  sector: string;
  url: string;
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished || "2026-01-01T08:00:00Z",
    author: {
      "@type": "Organization",
      name: "SpinesTech",
    },
    publisher: {
      "@type": "Organization",
      name: "SpinesTech",
      logo: {
        "@type": "ImageObject",
        url: "https://spinestech.sa/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    about: {
      "@type": "Thing",
      name: article.sector,
    },
  };

  return JSON.stringify(schema);
}
