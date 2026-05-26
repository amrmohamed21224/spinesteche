export const sectorsEn: Record<
  string,
  { title: string; description: string; tags?: string[] }
> = {
  "sec-1": {
    title: "Retail & E-commerce",
    description: "Advanced POS, e-commerce platforms, and AI-powered inventory management.",
  },
  "sec-2": {
    title: "Real Estate & Construction",
    description: "PropTech platforms and large-scale project tracking systems.",
  },
  "sec-3": {
    title: "Healthcare",
    description: "Hospital information systems (HIS) and EHR aligned with Saudi MOH standards.",
  },
  "sec-4": {
    title: "Education & Training",
    description: "Hybrid e-learning platforms and LMS for schools and enterprises.",
  },
  "sec-5": {
    title: "Tourism & Hospitality",
    description: "Booking systems, guest experience apps, and hotel management solutions.",
  },
  "sec-6": {
    title: "Logistics",
    description: "Supply chain optimization, real-time shipment tracking, and smart warehouses.",
  },
  "sec-7": {
    title: "Manufacturing",
    description: "Production automation, IIoT, and predictive maintenance.",
    tags: ["Industry 4.0", "Artificial Intelligence"],
  },
  "sec-8": {
    title: "Professional Services",
    description: "Technology for law firms, accounting, and management consulting.",
  },
  "sec-9": {
    title: "Startups",
    description: "Fast MVP delivery and scalable infrastructure for tech startups.",
  },
  "sec-10": {
    title: "Enterprises",
    description: "Full digital transformation, complex integrations, and enterprise cloud.",
  },
};

export const productsEn: Record<
  string,
  {
    title: string;
    description: string;
    badge?: string;
    features: string[];
    ctaPrimary: string;
    ctaSecondary?: string;
  }
> = {
  "prod-1": {
    title: "ERP System",
    description: "One platform connecting finance, procurement, manufacturing, and supply chain.",
    badge: "Ready & customizable",
    features: ["Advanced finance & accounting", "Supply chain & warehouse automation"],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
  "prod-2": {
    title: "CRM System",
    description: "Boost sales with a smart database and a complete view of every customer.",
    badge: "Ready & customizable",
    features: ["Sales pipeline tracking", "Business intelligence reports"],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
  "prod-3": {
    title: "HRM System",
    description: "Saudi labor law compliant payroll, attendance, leave, and talent development.",
    badge: "Ready & customizable",
    features: ["Payroll & self-service", 'Integration with "Mudad" & "Qiwa"'],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
  "prod-4": {
    title: "Warehouse Management",
    description: "Real-time inventory control, smart alerts, and live stock counts.",
    badge: "Ready & customizable",
    features: ["Barcode & RFID tracking", "Automated reorder levels"],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
  "prod-5": {
    title: "POS System",
    description: "Advanced cashier with ZATCA e-invoicing on tablets and desktops.",
    badge: "Ready & customizable",
    features: ["ZATCA compliant", "Offline mode"],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
  "prod-6": {
    title: "E-commerce Platform",
    description: "Branded online store with local payments, shipping, and stunning UX.",
    badge: "Ready & customizable",
    features: ["Mobile app (iOS & Android)", "Warehouse integrations"],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
  "prod-7": {
    title: "Booking & Appointments",
    description: "Ideal for salons, gyms, and legal consultancies — schedules and prepayments.",
    badge: "Ready & customizable",
    features: ["Automated customer notifications", "Staff management dashboard"],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
  "prod-8": {
    title: "Vertical Management Systems",
    description: "HIS, LMS, and smart restaurant systems built for each sector's best practices.",
    badge: "Sector solutions",
    features: ["Integrated medical / academic records", "Advanced operational analytics"],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Customize for your business",
  },
};

export const caseStudiesEn: Record<
  string,
  {
    title: string;
    client: string;
    sector: string;
    challenge: string;
    solution: string;
    result: string;
    stats?: { label: string; value: string }[];
  }
> = {
  cs1: {
    title: "Integrated ERP for a major supply chain",
    client: "National Supply Group",
    sector: "Retail",
    challenge: "Fragmented data and 15% inventory loss due to lack of real-time branch sync.",
    solution: "Central inventory engine with API integration for all POS and automated logistics.",
    result: "99.8% inventory accuracy and 22% lower operating costs in year one.",
    stats: [
      { label: "Inventory accuracy", value: "99.8%" },
      { label: "Cost reduction", value: "22%" },
    ],
  },
  cs2: {
    title: "CRM for a real estate developer",
    client: "Dar Al Emaar Real Estate",
    sector: "Real estate",
    challenge: "Difficulty tracking leads from interest to contract signing.",
    solution: "Smart sales platform with automated alerts, analytics, and WhatsApp API.",
    result: "40% higher conversion in year one and smoother sales operations.",
    stats: [
      { label: "Conversion lift", value: "40%" },
      { label: "Sales team satisfaction", value: "95%" },
    ],
  },
  cs3: {
    title: "Luxury fashion platform for the region",
    client: "Identity & Beauty Brand",
    sector: "E-commerce",
    challenge: "Slow peak performance and UX not aligned with Gulf shoppers.",
    solution: "Scalable cloud architecture, full Arabic UX, and one-click checkout.",
    result: "300% faster browsing and 55% sales growth.",
    stats: [
      { label: "Speed improvement", value: "300%" },
      { label: "Sales growth", value: "55%" },
    ],
  },
  cs4: {
    title: "AI agent for customer service",
    client: "Smart Telecom Service",
    sector: "Artificial Intelligence",
    challenge: "Contact center overload and slow handling of routine inquiries.",
    solution: "Custom LLM trained for Saudi and Gulf dialects to resolve requests instantly.",
    result: "70% of inquiries resolved without humans; response time under 3 seconds.",
    stats: [
      { label: "Auto-resolved", value: "70%" },
      { label: "Response time", value: "< 3 sec" },
    ],
  },
};

export const careersEn: Record<
  string,
  {
    title: string;
    department: string;
    location: string;
    experience: string;
    description: string;
    requirements: string[];
    benefits: string[];
  }
> = {
  j1: {
    title: "Senior Web Developer",
    department: "Software Development",
    location: "Riyadh (or remote from GCC)",
    experience: "5+ years",
    description:
      "Build advanced interactive interfaces with React and Next.js — focused on performance, security, and accessibility.",
    requirements: [
      "Deep experience in React, Next.js, and TypeScript.",
      "Strong understanding of performance optimization and Core Web Vitals.",
      "Solid Tailwind CSS and responsive design skills.",
      "Passion for clean, maintainable code.",
    ],
    benefits: [
      "Competitive salary and annual bonuses.",
      "Comprehensive medical insurance for you and family.",
      "Flexible, innovation-friendly work environment.",
    ],
  },
  j2: {
    title: "AI Engineer",
    department: "Artificial Intelligence",
    location: "Riyadh (hybrid)",
    experience: "3+ years",
    description:
      "Develop and deploy ML models and AI agents for public and private sector data solutions.",
    requirements: [
      "Hands-on experience building and fine-tuning LLMs.",
      "Proficiency in Python with PyTorch or TensorFlow.",
      "Experience integrating AI API gateways.",
    ],
    benefits: [
      "Work on large national-impact projects.",
      "Learning budget and certified training.",
      "Flexible hours with hybrid option.",
    ],
  },
  j3: {
    title: "UI/UX Designer",
    department: "Digital Design",
    location: "Riyadh (hybrid)",
    experience: "3+ years",
    description:
      "Research user behavior and design culturally aware interfaces with global usability standards.",
    requirements: [
      "Strong portfolio demonstrating digital design problem solving.",
      "Expert Figma, interactive design, and prototyping skills.",
      "Deep understanding of Arabic RTL layout.",
    ],
    benefits: [
      "Creative environment encouraging experimentation.",
      "Modern tools and continuous professional development.",
    ],
  },
  j4: {
    title: "Mobile Developer",
    department: "Mobile Development",
    location: "Riyadh (or remote)",
    experience: "4+ years",
    description:
      "Build native or hybrid apps with excellent performance on App Store and Google Play.",
    requirements: [
      "Practical experience with Flutter or React Native.",
      "Strong API and state management skills.",
      "Published apps on official stores.",
    ],
    benefits: ["Strong salary packages and project commissions.", "Private medical insurance."],
  },
  j5: {
    title: "ERP Specialist",
    department: "Enterprise Systems",
    location: "Riyadh",
    experience: "3+ years",
    description:
      "Analyze business processes and customize ERP integrations with full ZATCA compliance.",
    requirements: [
      "Experience implementing ERP such as Odoo, SAP, or custom systems.",
      "Strong finance, accounting, and inventory knowledge.",
      "Excellent client communication and problem solving.",
    ],
    benefits: [
      "Career development paths and funded training.",
      "Housing, transport allowances, and delivery incentives.",
    ],
  },
};
