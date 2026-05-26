/** English text overrides for mock CMS data (keyed by entity id). */

export const servicesEn: Record<
  string,
  { title: string; description: string; details?: string[]; features?: string[] }
> = {
  s1: {
    title: "Custom Software Development",
    description:
      "Unique platforms tailored to your workflows — high efficiency and future scalability aligned with Vision 2030.",
    details: [
      "Cloud web applications at global scale.",
      "Hybrid and native iOS & Android apps.",
      "Flexible, scalable infrastructure.",
    ],
    features: ["Cloud web apps", "iOS & Android apps"],
  },
  s2: {
    title: "AI Agents",
    description:
      "Automate complex processes with generative AI to boost productivity and cut operational costs.",
    details: ["LLM integration.", "Robotic process automation (RPA).", "Real-time intelligent analytics."],
    features: ["Smart chatbots (LLMs)", "Process automation (RPA)"],
  },
  s3: {
    title: "Integrated ERP Systems",
    description: "Manage enterprise resources through one unified control panel across departments.",
    details: ["Inventory & supply chain.", "ZATCA-compliant e-invoicing.", "Finance, reporting & payroll."],
    features: ["Supply chain management", "E-invoicing"],
  },
  s4: {
    title: "CRM Systems",
    description: "Build lasting customer relationships with advanced journey tracking and analytics.",
    details: ["Lead lifecycle tracking.", "Sales team collaboration.", "Automated alerts & reports."],
    features: ["Lead tracking", "Sales performance analytics"],
  },
  s5: {
    title: "Web & Mobile Apps",
    description: "High-performance hybrid and native apps with seamless cross-device experiences.",
    details: ["Responsive design.", "iOS & Android compatibility.", "Powerful admin dashboards."],
    features: ["Fully responsive design", "Mobile-first performance"],
  },
  s6: {
    title: "E-commerce Solutions",
    description: "Advanced storefronts with local payment gateways and logistics integrations.",
    details: ["Mada, Visa, Mastercard, Apple Pay.", "Shipping integrations.", "Sales & behavior analytics."],
    features: ["Local & global payments", "Logistics integrations"],
  },
  s7: {
    title: "Cybersecurity",
    description: "Protect digital assets with advanced defense strategies and periodic audits.",
    details: ["End-to-end protection.", "NCA compliance.", "Penetration testing & vulnerability scans."],
    features: ["NCA compliance", "Penetration testing"],
  },
  s8: {
    title: "UI/UX Design",
    description: "Engaging interfaces and smooth user journeys that boost digital product adoption.",
    details: ["User research & journey mapping.", "Brand-aligned interactive UI.", "Usability testing & prototypes."],
    features: ["Research-driven UX", "High-fidelity prototypes"],
  },
  s9: {
    title: "Support & Maintenance",
    description: "Continuous technical support and updates to keep your systems running at peak performance.",
    details: ["Security patches.", "Phone, email & WhatsApp support.", "Infrastructure maintenance."],
    features: ["24/7 support", "Regular platform updates"],
  },
};

export const pricingPlansEn: Record<
  string,
  { name: string; tier: string; description: string; features: string[]; ctaText: string }
> = {
  p1: {
    name: "Startups",
    tier: "Launch plan",
    description: "Essentials to digitize core operations and establish your digital presence.",
    features: ["Basic digital brand", "High-conversion landing pages", "Secure cloud hosting", "Email support"],
    ctaText: "Get started",
  },
  p2: {
    name: "Mid-size enterprises",
    tier: "Growth plan",
    description: "Integrated system covering all departments with advanced process automation.",
    features: [
      "Fully custom ERP",
      "AI automation",
      "Full system integration",
      "Business intelligence dashboards",
      "Administrative automation",
      "KSA regulatory compliance",
      "24/7 direct support",
    ],
    ctaText: "Request a custom quote",
  },
  p3: {
    name: "Large enterprises",
    tier: "Scale plan",
    description: "Sovereign infrastructure with dedicated AI and enterprise-grade security.",
    features: [
      "Private local hosting",
      "Custom AI agents",
      "Predictive AI models",
      "Hybrid cloud architecture",
      "Defense-grade cybersecurity",
      "Dedicated technical account manager",
    ],
    ctaText: "Talk to experts",
  },
};

export const faqsEn: Record<string, { question: string; answer: string }> = {
  faq1: {
    question: "Do your ERP systems support Saudi e-invoicing?",
    answer:
      "Yes. Our financial and ERP solutions are fully aligned with ZATCA Phase 1 and Phase 2 (integration & connectivity) requirements.",
  },
  faq2: {
    question: "How long does custom system development take?",
    answer:
      "It depends on scope and complexity. Medium projects typically take 3–6 months from kickoff to production launch.",
  },
  faq3: {
    question: "Do you provide post-launch maintenance?",
    answer:
      "Absolutely. We offer monthly support and maintenance packages to keep systems stable and up to date.",
  },
  faq4: {
    question: "How is custom system pricing calculated?",
    answer:
      "We analyze business requirements, user count, technical complexity, and integration needs to provide fair, competitive pricing.",
  },
  faq5: {
    question: "Are there hidden fees in the $100 plan?",
    answer: "No hidden fees. The price covers listed features; optional add-ons are disclosed upfront.",
  },
};

export const aboutEn = {
  mission:
    "Empowering public and private organizations in the Middle East with innovative, secure, scalable technology that accelerates digital transformation and local tech sovereignty.",
  vision:
    "To be the first choice and digital backbone for transformation in the region — recognized globally for engineering excellence born in Saudi Arabia.",
  coreValues: {
    v1: { title: "Innovation", description: "We challenge the status quo with smart, forward-looking solutions." },
    v2: { title: "Security", description: "Protecting your data and digital sovereignty is non-negotiable." },
    v3: { title: "Reliability", description: "The partner you trust for the most sensitive technical challenges." },
    v4: { title: "Scalability", description: "Solutions that grow from startups to large enterprises." },
  },
  differentiators: {
    d1: {
      title: "Local expertise, global vision",
      description: "Deep KSA regulatory and cultural understanding with world-class engineering practices.",
    },
    d2: {
      title: "Full tech sovereignty",
      description: "Ownership and localization aligned with national cybersecurity requirements.",
    },
    d3: {
      title: "Elite team",
      description: "Engineers and advisors who led large-scale digital transformation across the region.",
    },
  },
  markets: {
    m1: "Kingdom of Saudi Arabia",
    m2: "GCC countries",
    m3: "Arab world",
    m4: "Canada (tech hub)",
  },
  stats: {
    as1: "Successful government projects",
    as2: "Client satisfaction",
    as3: "Expert technical support",
    as4: "Technology experts",
  },
};
