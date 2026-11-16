export type NavItem = { label: string; href: string };

export type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export type PathCard = {
  label: string;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  action: "inquiry" | "link";
  href?: string;
};

export type InquiryIntent = "buy" | "sell";

export type Dictionary = {
  meta: { title: string; description: string; keywords: string[] };
  nav: {
    items: NavItem[];
    brandsLabel: string;
    brandsViewAll: string;
    cta: string;
    whatsapp: string;
    menu: string;
    close: string;
  };
  common: {
    home: string;
    learnMore: string;
    viewDetails: string;
    series: string;
    brandsHeading: string;
    otherBrands: string;
    contactMethods: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[];
    accentLine: number;
    subtitle: string;
    primary: string;
    secondary: string;
    badges: string[];
    scroll: string;
    floating: { title: string; detail: string }[];
  };
  stats: Stat[];
  brands: { eyebrow: string; title: string; laptops: string; phones: string };
  devices: {
    eyebrow: string;
    title: string;
    intro: string;
    laptops: { title: string; desc: string; tags: string[]; cta: string };
    phones: { title: string; desc: string; tags: string[]; cta: string };
  };
  paths: { eyebrow: string; title: string; cards: [PathCard, PathCard] };
  process: { eyebrow: string; title: string; intro: string; steps: { title: string; desc: string }[] };
  why: { eyebrow: string; title: string; items: { title: string; desc: string }[] };
  quality: {
    eyebrow: string;
    title: string;
    desc: string;
    cards: { badge: string; name: string; desc: string }[];
    checklistTitle: string;
    checks: string[];
  };
  world: {
    eyebrow: string;
    title: string;
    desc: string;
    origin: string;
    regions: { name: string; countries: string }[];
  };
  faq: { eyebrow: string; title: string; desc: string; items: { q: string; a: string }[] };
  cta: { eyebrow: string; title: string; desc: string; primary: string; secondary: string };
  footer: {
    links: NavItem[];
    tagline: string;
    explore: string;
    contact: string;
    language: string;
    hours: string;
    license: string;
    rights: string;
    seoLine: string;
  };
  inquiry: {
    title: string;
    subtitle: string;
    intentLabel: string;
    intents: Record<InquiryIntent, string>;
    defaultIntent: InquiryIntent;
    fields: {
      name: string;
      company: string;
      country: string;
      email: string;
      phone: string;
      category: string;
      categories: string[];
      quantity: string;
      message: string;
      messagePlaceholder: string;
    };
    sendWhatsapp: string;
    sendEmail: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    errorSend: string;
    sendAnother: string;
    note: string;
    close: string;
    required: string;
  };
  whatsappMessage: Record<InquiryIntent, string>;
  floatingWhatsapp: string;
};
