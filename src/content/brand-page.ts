import type { Locale } from "@/i18n/config";
import type { Brand } from "./brands";
import type { CtaBlock, FaqBlock, FeatureBlock, Hero, Meta } from "./types";

export type BrandPageContent = {
  meta: Meta;
  hero: Hero;
  seriesHeading: { eyebrow: string; title: string; desc: string };
  groupLabels: { laptops: string; smartphones: string };
  features: FeatureBlock;
  faq: FaqBlock;
  cta: CtaBlock;
  others: { eyebrow: string; title: string };
};

export function brandPageContent(b: Brand, lang: Locale): BrandPageContent {
  const hasLaptops = b.categories.includes("laptops");
  const hasPhones = b.categories.includes("smartphones");

  if (lang === "ja") {
    const noun = hasLaptops && hasPhones ? "パソコン・スマホ" : hasLaptops ? "ノートパソコン" : "スマホ";
    const kw = [
      `${b.name} 買取`,
      ...(hasLaptops ? [`${b.name} ノートパソコン 買取`, `${b.name} パソコン 高価買取`] : []),
      ...(hasPhones ? [`${b.name} スマホ 買取`, `${b.name} 中古 買取`] : []),
      ...[...(b.laptopSeries ?? []), ...(b.phoneSeries ?? [])].slice(0, 4).map((s) => `${s} 買取`),
    ];
    return {
      meta: {
        title: `${b.name} ${noun}買取｜高価買取・まとめ売り歓迎`,
        description: `${b.nameJa}の${noun}を高価買取。${b.blurb.ja}査定無料・データ消去対応、法人様の大量買取も歓迎です。`,
        keywords: kw,
      },
      hero: {
        eyebrow: `${b.nameJa} 買取`,
        title: `${b.name}の${noun}、高価買取。`,
        desc: `${b.blurb.ja}査定は無料、1台からお気軽にご相談ください。`,
        primary: "無料査定を依頼",
        secondary: "WhatsAppで相談",
      },
      seriesHeading: {
        eyebrow: "主な買取対象",
        title: `${b.name}の買取対象シリーズ`,
        desc: "掲載のないモデルもお気軽にお問い合わせください。",
      },
      groupLabels: { laptops: "ノートパソコン", smartphones: "スマートフォン" },
      features: {
        eyebrow: `${b.name}買取の特長`,
        title: `${b.name}を売るなら、海外販路のある私たちへ。`,
        items: [
          { title: "海外需要を反映した価格", desc: `${b.name}の端末は海外でも需要があり、国内相場に左右されにくい価格をご提示します。` },
          { title: "古いモデルもご相談を", desc: "年式が古い端末や、付属品のない端末もお買い取りできる場合があります。" },
          { title: "確実なデータ消去", desc: "お買い取りした端末は、すべてのデータを確実に消去いたします。" },
          { title: "法人様のまとめ売り", desc: `社内で使われていた${b.name}の端末を、まとめてお買い取りします。` },
          { title: "スピード査定", desc: "型番と台数、写真を送るだけでスピーディーに査定します。" },
          { title: "1台からOK", desc: "ご家庭で眠っている1台からでもお気軽にどうぞ。" },
        ],
      },
      faq: {
        eyebrow: "よくある質問",
        title: `${b.name}買取のよくある質問`,
        desc: "その他のご質問はWhatsAppからお気軽にどうぞ。",
        items: [
          { q: `${b.name}の古いモデルでも買い取ってもらえますか？`, a: "年式が古いモデルでも、海外需要によりお買い取りできる場合があります。型番をお知らせください。" },
          { q: "動作しない端末でも売れますか？", a: "状態によっては部品取りとしてお買い取りできる場合があります。まずはご相談ください。" },
          { q: "査定額はどのように決まりますか？", a: "モデル・スペック・状態・付属品の有無・台数、そして市場相場をもとに総合的に査定いたします。" },
        ],
      },
      cta: {
        eyebrow: "無料査定",
        title: `${b.name}の査定、お気軽にどうぞ。`,
        desc: "型番・台数・状態をお知らせいただくだけでOKです。",
        primary: "無料査定を依頼",
        secondary: "WhatsAppで相談",
      },
      others: { eyebrow: "メーカー一覧", title: "その他のメーカー" },
    };
  }

  const noun = hasLaptops && hasPhones ? "Laptops & Phones" : hasLaptops ? "Laptops" : "Smartphones";
  const nounLower = hasLaptops && hasPhones ? "laptops and phones" : hasLaptops ? "laptops" : "smartphones";
  const kw = [
    `used ${b.name} wholesale`,
    `bulk used ${b.name}`,
    ...(hasLaptops ? [`used ${b.name} laptops wholesale`, `${b.name} laptops bulk Japan`] : []),
    ...(hasPhones ? [`used ${b.name} phones wholesale`, `${b.name} phones bulk Japan`] : []),
    ...[...(b.laptopSeries ?? []), ...(b.phoneSeries ?? [])].slice(0, 4).map((s) => `used ${s} wholesale`),
  ];
  return {
    meta: {
      title: `Used ${b.name} ${noun} Wholesale from Japan`,
      description: `Buy used ${b.name} ${nounLower} in bulk from Japan. ${b.blurb.en} Tested, graded A/B/C and exported worldwide.`,
      keywords: kw,
    },
    hero: {
      eyebrow: `${b.name} · Wholesale`,
      title: `Used ${b.name} ${nounLower}, in bulk from Japan.`,
      desc: `${b.blurb.en} Every unit is tested, graded and export-ready.`,
      primary: `Request ${b.name} stock`,
      secondary: "Ask on WhatsApp",
    },
    seriesHeading: {
      eyebrow: "Series we supply",
      title: `${b.name} models in regular supply.`,
      desc: "Availability changes weekly — send your target models for a current stock list.",
    },
    groupLabels: { laptops: "Laptops", smartphones: "Smartphones" },
    features: {
      eyebrow: `Why source ${b.name} from us`,
      title: `${b.name} stock you can sell with confidence.`,
      items: [
        { title: "Sourced in Japan", desc: `Every ${b.name} unit is purchased locally from Japanese businesses and individuals.` },
        { title: "Graded A / B / C", desc: "Consistent hand-grading so each lot matches its description." },
        {
          title: "Specs listed per unit",
          desc: hasLaptops
            ? "CPU, RAM, storage, battery health and keyboard layout on every stock list."
            : "Model, storage, colour, battery health and SIM status on every stock list.",
        },
        { title: "Lock & IMEI checks", desc: "Activation-locked or restricted units are separated and clearly labelled." },
        { title: "Mixed lots welcome", desc: `Combine ${b.name} with other brands and categories in a single shipment.` },
        { title: "Worldwide shipping", desc: "Air or sea freight with full export documentation to your port." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: `Buying ${b.name} in bulk.`,
      desc: "More questions? Message us on WhatsApp for a fast answer.",
      items: [
        { q: `Do you always have ${b.name} stock?`, a: `Availability changes weekly. Send your requirements and we’ll share current ${b.name} stock with a quotation.` },
        { q: `Can I order a single ${b.name} model in volume?`, a: "Yes — single-model lots are possible subject to availability. Mixed lots are also welcome." },
        { q: `How are ${b.name} devices graded?`, a: "Every unit is functionally tested and graded A (excellent), B (good) or C (fair) by hand. Faults are noted clearly." },
      ],
    },
    cta: {
      eyebrow: `${b.name} stock`,
      title: `Get the latest ${b.name} stock list.`,
      desc: "Tell us models, grades and quantities — we’ll reply with availability and a quotation.",
      primary: `Request ${b.name} stock`,
      secondary: "Chat on WhatsApp",
    },
    others: { eyebrow: "More brands", title: "Explore other brands" },
  };
}
