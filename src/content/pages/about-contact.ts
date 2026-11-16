import type { Locale } from "@/i18n/config";
import type { FaqBlock, Meta } from "../types";

export type ContactPageContent = {
  meta: Meta;
  hero: { eyebrow: string; title: string; desc: string };
  methods: { whatsapp: string; whatsappDesc: string; email: string; emailDesc: string; phone: string; phoneDesc: string; office: string };
  formTitle: string;
  formDesc: string;
  faq: FaqBlock;
};

export const contactPage: Record<Locale, ContactPageContent> = {
  en: {
    meta: {
      title: "Contact Us — Wholesale Inquiries & Stock Lists",
      description: "Contact our team in Japan for wholesale used laptops and smartphones. Request a stock list via WhatsApp, email or our inquiry form — we usually reply within a few hours.",
      keywords: ["contact used laptop supplier Japan", "request stock list used phones", "wholesale inquiry Japan electronics"],
    },
    hero: {
      eyebrow: "Contact",
      title: "Let’s talk stock.",
      desc: "WhatsApp is the fastest way to reach us. You can also send the form below and we’ll reply by email or WhatsApp.",
    },
    methods: {
      whatsapp: "WhatsApp",
      whatsappDesc: "Fastest reply — chat with our sales team",
      email: "Email",
      emailDesc: "For detailed requirements and documents",
      phone: "Phone",
      phoneDesc: "During Japanese business hours",
      office: "Office",
    },
    formTitle: "Send an inquiry",
    formDesc: "Share a few details and we’ll reply with our latest stock list and quotation.",
    faq: {
      eyebrow: "Before you write",
      title: "Quick answers.",
      desc: "Questions we hear most often from new contacts.",
      items: [
        { q: "How quickly will you reply?", a: "We usually reply within a few hours during Japanese business hours, and by the next business day at the latest." },
        { q: "What should I include in my inquiry?", a: "Brands, models, grades, quantities and your destination country help us send an accurate stock list straight away." },
        { q: "I’m in Japan and want to sell — can I use this form?", a: "Yes. Choose “Sell devices” in the form, or visit our Japanese page for sellers." },
      ],
    },
  },
  ja: {
    meta: {
      title: "お問い合わせ｜無料査定・買取のご相談",
      description: "中古パソコン・スマホの無料査定・買取のご相談はこちら。WhatsApp・メール・フォームからお気軽にお問い合わせください。",
      keywords: ["パソコン 買取 問い合わせ", "スマホ 買取 査定", "無料査定"],
    },
    hero: {
      eyebrow: "お問い合わせ",
      title: "無料査定・ご相談はこちら。",
      desc: "WhatsAppがいちばん早くご連絡できます。下記フォームからも受け付けています。",
    },
    methods: {
      whatsapp: "WhatsApp",
      whatsappDesc: "写真を送ってスピード査定",
      email: "メール",
      emailDesc: "台数リストや資料の送付に",
      phone: "お電話",
      phoneDesc: "営業時間内に承ります",
      office: "所在地",
    },
    formTitle: "査定・お問い合わせフォーム",
    formDesc: "わかる範囲でご入力ください。担当者よりご連絡いたします。",
    faq: {
      eyebrow: "よくある質問",
      title: "お問い合わせの前に",
      desc: "よくいただくご質問です。",
      items: [
        { q: "返信までどのくらいかかりますか？", a: "営業時間内であれば数時間以内、遅くとも翌営業日までにご連絡いたします。" },
        { q: "何を伝えればいいですか？", a: "メーカー・機種名・台数・状態をお知らせいただくと、スムーズに査定できます。写真があるとより正確です。" },
        { q: "法人でまとめて売りたいのですが？", a: "フォームの会社名欄にご記入のうえ、台数や型番のリストをお送りください。" },
      ],
    },
  },
};
