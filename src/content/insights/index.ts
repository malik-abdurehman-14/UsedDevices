import type { Locale } from "@/i18n/config";
import type { Post } from "./types";
import { postsEn } from "./posts-en";
import { postsJa } from "./posts-ja";

const byDateDesc = (a: Post, b: Post) => b.date.localeCompare(a.date);

export const posts: Record<Locale, Post[]> = {
  en: [...postsEn].sort(byDateDesc),
  ja: [...postsJa].sort(byDateDesc),
};

export const getPost = (lang: Locale, slug: string) => posts[lang].find((p) => p.slug === slug);

export const insightsCopy: Record<
  Locale,
  { nav: string; eyebrow: string; title: string; desc: string; read: string; minutes: (n: number) => string; back: string; more: string; metaTitle: string; metaDesc: string; ctaTitle: string; ctaDesc: string }
> = {
  en: {
    nav: "Insights",
    eyebrow: "Insights",
    title: "Guides for wholesale buyers.",
    desc: "Practical advice on sourcing used laptops and smartphones from Japan — grading, importing, and what to check before you order.",
    read: "Read article",
    minutes: (n) => `${n} min read`,
    back: "All articles",
    more: "More articles",
    metaTitle: "Insights — Guides to Buying Used Laptops & Phones from Japan",
    metaDesc: "Wholesale buyer guides: why source used laptops from Japan, grading explained, and importing used iPhones and Android phones in bulk.",
    ctaTitle: "Ready to see this week’s stock?",
    ctaDesc: "Send your target models and quantities — we’ll reply with a current stock list and quotation.",
  },
  ja: {
    nav: "コラム",
    eyebrow: "お役立ちコラム",
    title: "売る前に知っておきたいこと。",
    desc: "パソコン・スマホを売る前の準備や、法人様の処分方法など、買取に役立つ情報をお届けします。",
    read: "記事を読む",
    minutes: (n) => `約${n}分で読めます`,
    back: "コラム一覧",
    more: "その他の記事",
    metaTitle: "お役立ちコラム｜パソコン・スマホ買取の準備と処分方法",
    metaDesc: "パソコン・iPhoneを売る前の準備、データ消去の方法、法人パソコンの処分方法など、買取に役立つ情報を解説します。",
    ctaTitle: "査定は無料です。お気軽にどうぞ。",
    ctaDesc: "機種・台数・状態をお知らせいただくだけで、スピーディーに査定いたします。",
  },
};
