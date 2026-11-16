export type Meta = { title: string; description: string; keywords: string[] };
export type Hero = { eyebrow: string; title: string; desc: string; primary: string; secondary: string };
export type Feature = { title: string; desc: string };
export type FeatureBlock = { eyebrow: string; title: string; desc?: string; items: Feature[] };
export type StepsBlock = { eyebrow: string; title: string; intro: string; steps: Feature[] };
export type FaqBlock = { eyebrow: string; title: string; desc: string; items: { q: string; a: string }[] };
export type CtaBlock = { eyebrow: string; title: string; desc: string; primary: string; secondary: string };
export type CardsBlock = {
  eyebrow: string;
  title: string;
  desc: string;
  cards: { badge: string; name: string; desc: string }[];
  checklistTitle: string;
  checks: string[];
};
export type SplitBlock = { eyebrow: string; title: string; desc: string; points: string[] };
export type HeadingBlock = { eyebrow: string; title: string; desc?: string };

export type CategoryPageContent = {
  meta: Meta;
  hero: Hero;
  features: FeatureBlock;
  series: HeadingBlock & { items: { name: string; detail?: string }[] };
  brands: HeadingBlock;
  inspection: CardsBlock;
  faq: FaqBlock;
  cta: CtaBlock;
};
