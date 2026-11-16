import type { Locale } from "@/i18n/config";
import type { CardsBlock, CtaBlock, FaqBlock, FeatureBlock, Hero, Meta, SplitBlock, StepsBlock } from "../types";

export type SellPageContent = {
  meta: Meta;
  hero: Hero;
  whatWeBuy: { eyebrow: string; title: string; laptops: { title: string; desc: string; cta: string }; phones: { title: string; desc: string; cta: string } };
  features: FeatureBlock;
  corporate: SplitBlock;
  process: StepsBlock;
  pricing: CardsBlock;
  faq: FaqBlock;
  cta: CtaBlock;
};

export const sellPage: Record<Locale, SellPageContent> = {
  ja: {
    meta: {
      title: "中古パソコン・スマホ買取｜査定無料・1台から法人まとめ売りまで",
      description:
        "中古ノートパソコン・スマートフォンの買取サービス。MacBook・ThinkPad・Let’s note・iPhone・Galaxy・Pixelなど主要メーカーに対応。査定無料・データ消去対応。法人様のリースアップ品・入れ替え品の大量買取も歓迎です。",
      keywords: [
        "パソコン 買取",
        "スマホ 買取",
        "中古パソコン 買取",
        "iPhone 買取",
        "法人 パソコン 買取",
        "パソコン 一括買取",
        "リースアップ 買取",
        "パソコン 処分 買取",
        "スマホ まとめ売り",
        "パソコン 買取 データ消去",
      ],
    },
    hero: {
      eyebrow: "買取について",
      title: "使わなくなった端末を、価値ある次の一歩へ。",
      desc: "ノートパソコン・スマートフォンを、1台から法人様の大量まとめ売りまでお買い取りします。世界40カ国以上の販路があるからこそ、国内相場に左右されにくい価格をご提示できます。",
      primary: "無料査定を依頼",
      secondary: "WhatsAppで相談",
    },
    whatWeBuy: {
      eyebrow: "買取対象",
      title: "パソコンとスマホ、どちらもお任せください。",
      laptops: { title: "ノートパソコン", desc: "MacBook・ThinkPad・Let’s note・Dell・HP・富士通・NECなど。", cta: "パソコン買取を見る" },
      phones: { title: "スマートフォン", desc: "iPhone・Galaxy・Pixel・Xperia・AQUOS・Xiaomi・OPPOなど。", cta: "スマホ買取を見る" },
    },
    features: {
      eyebrow: "選ばれる理由",
      title: "高く、早く、安心して売れる理由。",
      items: [
        { title: "海外販路による高価買取", desc: "世界40カ国以上へ直接販売しているため、中間マージンを抑えた価格をご提示できます。" },
        { title: "査定無料・キャンセル無料", desc: "査定額にご納得いただけない場合は、お気軽にお断りください。" },
        { title: "確実なデータ消去", desc: "お預かりした端末のデータは、すべて確実に消去いたします。" },
        { title: "状態を問わずご相談可", desc: "古い年式、キズ、付属品なし、動作不良の端末もまずはご相談ください。" },
        { title: "スピード対応", desc: "WhatsAppで写真を送るだけ。スピーディーに査定額をお伝えします。" },
        { title: "古物商許可取得済み", desc: "古物営業法に基づき、適正な手続きでお買い取りいたします。" },
      ],
    },
    corporate: {
      eyebrow: "法人様のまとめ売り",
      title: "オフィスのパソコン・社用スマホを一括買取。",
      desc: "オフィス移転、PCの入れ替え、リース満了時など、まとまった台数のお買い取りを得意としています。台数や型番のリストをお送りいただければ、スピーディーにお見積りいたします。",
      points: [
        "数十台〜数百台規模の一括買取に対応",
        "リースアップ品・入れ替え品も歓迎",
        "データ消去を確実に実施",
        "台数・型番リストからお見積り",
        "お引き渡し方法はご相談のうえ決定",
        "請求書・契約書など必要書類に対応",
      ],
    },
    process: {
      eyebrow: "買取の流れ",
      title: "かんたん4ステップ。",
      intro: "お問い合わせからお支払いまで、担当者が丁寧にご案内します。",
      steps: [
        { title: "お問い合わせ", desc: "WhatsAppまたはフォームから、機種・台数・状態をお知らせください。" },
        { title: "無料査定", desc: "写真や型番をもとに、査定額をご提示します。" },
        { title: "お引き渡し", desc: "ご成約後、お引き渡し方法をご相談のうえ端末をお預かりします。" },
        { title: "お支払い", desc: "検品完了後、銀行振込にて速やかにお支払いします。" },
      ],
    },
    pricing: {
      eyebrow: "査定ポイント",
      title: "査定額を決める3つのポイント。",
      desc: "機種・状態・付属品を総合的に確認し、市場相場にもとづいた査定額をご提示します。",
      cards: [
        { badge: "01", name: "機種・年式・スペック", desc: "メーカー、モデル、発売年、CPU・メモリ・容量などを確認します。" },
        { badge: "02", name: "外観・動作の状態", desc: "画面や本体のキズ、バッテリーの状態、各機能の動作を確認します。" },
        { badge: "03", name: "付属品・台数", desc: "充電器や箱の有無、まとめ売りの台数で査定額がアップすることがあります。" },
      ],
      checklistTitle: "お売りいただく前のチェックリスト",
      checks: [
        "大切なデータのバックアップ",
        "Apple ID / iCloud のサインアウト",
        "Google・Microsoftアカウントの削除",
        "「探す」機能をオフ",
        "SIMカード・SDカードの取り外し",
        "充電器・付属品のご用意",
        "可能であれば初期化",
        "本人確認書類のご用意",
      ],
    },
    faq: {
      eyebrow: "よくある質問",
      title: "買取に関するよくある質問",
      desc: "その他のご質問は、WhatsAppからお気軽にお問い合わせください。",
      items: [
        { q: "1台だけでも買い取ってもらえますか？", a: "はい、1台からお買い取りいたします。法人様の大量まとめ売りも歓迎です。" },
        { q: "本人確認は必要ですか？", a: "古物営業法により、お買い取りの際に本人確認書類（運転免許証など）の確認が必要です。" },
        { q: "サイトに買取価格が載っていないのはなぜですか？", a: "買取価格は機種・状態・台数や日々の市場相場によって変わるため、個別に査定してご提示しています。" },
        { q: "壊れている端末でも売れますか？", a: "状態によっては部品取りとしてお買い取りできる場合があります。まずはご相談ください。" },
        { q: "支払い方法を教えてください。", a: "原則として銀行振込でお支払いいたします。詳細はご成約時にご案内いたします。" },
      ],
    },
    cta: {
      eyebrow: "無料査定",
      title: "まずはお気軽に、無料査定を。",
      desc: "機種・台数・状態をお知らせいただくだけでOK。査定額にご納得いただけない場合もお気軽にお断りください。",
      primary: "無料査定を依頼",
      secondary: "WhatsAppで相談",
    },
  },

  en: {
    meta: {
      title: "Sell Your Used Laptop or Phone in Japan — Free Quote",
      description:
        "Living in Japan or leaving Japan? Sell your used laptop, MacBook, iPhone or Android phone for a fair price. Free quote in English, secure data erasure, and bulk buying for businesses.",
      keywords: [
        "sell laptop Japan",
        "sell iPhone Japan",
        "sell MacBook Tokyo",
        "sell used phone Japan",
        "leaving Japan sell electronics",
        "sell old laptop Japan English",
        "company laptop disposal Japan",
      ],
    },
    hero: {
      eyebrow: "Sell to us · in Japan",
      title: "Sell your laptop or phone in Japan — in English.",
      desc: "Upgrading, moving office or leaving Japan? We buy used laptops and smartphones from individuals and businesses across Japan, with a free quote and secure data erasure.",
      primary: "Get a free quote",
      secondary: "Ask on WhatsApp",
    },
    whatWeBuy: {
      eyebrow: "What we buy",
      title: "Laptops and smartphones, single units or in bulk.",
      laptops: { title: "Laptops", desc: "MacBook, ThinkPad, Let’s note, Dell, HP, Surface and more.", cta: "See laptop models" },
      phones: { title: "Smartphones", desc: "iPhone, Galaxy, Pixel, Xperia, AQUOS, Xiaomi, OPPO and more.", cta: "See phone models" },
    },
    features: {
      eyebrow: "Why sell to us",
      title: "Fair prices, handled in English.",
      items: [
        { title: "Export-backed pricing", desc: "We sell directly to buyers in 40+ countries, so we can often offer more than local shops." },
        { title: "Free, no-obligation quote", desc: "Not happy with the offer? Simply decline — no fees, no pressure." },
        { title: "Secure data erasure", desc: "All data is permanently erased from every device we buy." },
        { title: "Any condition considered", desc: "Older models, scratches, missing chargers and faulty units are all worth asking about." },
        { title: "Fast replies on WhatsApp", desc: "Send model and photos — we reply with a quote quickly." },
        { title: "Licensed dealer", desc: "We hold a Japanese secondhand dealer licence (古物商許可) and follow proper procedures." },
      ],
    },
    corporate: {
      eyebrow: "For businesses",
      title: "Office laptops and company phones, bought in bulk.",
      desc: "Relocating, refreshing hardware or ending a lease? Send us a list of models and quantities and we’ll prepare a quote for the whole batch.",
      points: [
        "Batches from tens to hundreds of units",
        "Lease returns and retired fleets welcome",
        "Secure data erasure on every device",
        "Quotes prepared from your asset list",
        "Collection or hand-over arranged with you",
        "Invoices and paperwork provided",
      ],
    },
    process: {
      eyebrow: "How selling works",
      title: "Four simple steps.",
      intro: "We guide you in English from first message to payment.",
      steps: [
        { title: "Contact us", desc: "Send the model, quantity and condition via WhatsApp or our form." },
        { title: "Free quote", desc: "We give you an offer based on your details and photos." },
        { title: "Hand over", desc: "Once you accept, we agree on the most convenient hand-over method." },
        { title: "Get paid", desc: "After a quick inspection we pay by bank transfer." },
      ],
    },
    pricing: {
      eyebrow: "What affects the price",
      title: "Three things we look at.",
      desc: "Our offer reflects the device, its condition and today’s international market.",
      cards: [
        { badge: "01", name: "Model & specs", desc: "Brand, model, year, processor, memory and storage." },
        { badge: "02", name: "Condition", desc: "Screen and body wear, battery health and whether everything works." },
        { badge: "03", name: "Accessories & quantity", desc: "Chargers, boxes and larger quantities can increase the offer." },
      ],
      checklistTitle: "Before you sell",
      checks: [
        "Back up your data",
        "Sign out of Apple ID / iCloud",
        "Remove Google / Microsoft accounts",
        "Turn off Find My",
        "Remove SIM and SD cards",
        "Find your charger",
        "Factory reset if possible",
        "Bring photo ID (required by law)",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Selling in Japan — common questions.",
      desc: "Anything else? Message us on WhatsApp.",
      items: [
        { q: "Do I need ID to sell?", a: "Yes. Japanese law requires secondhand dealers to verify the seller’s identity, so please have a residence card, passport or driver’s licence ready." },
        { q: "I’m leaving Japan soon — can you move quickly?", a: "Tell us your departure date when you contact us and we’ll do our best to complete the purchase in time." },
        { q: "Will you buy a single device?", a: "Yes, we buy single devices as well as large business batches." },
        { q: "How do I get paid?", a: "Payment is normally made by bank transfer to a Japanese bank account after inspection." },
      ],
    },
    cta: {
      eyebrow: "Free quote",
      title: "Find out what your device is worth.",
      desc: "Send the model and condition — it takes less than a minute.",
      primary: "Get a free quote",
      secondary: "Chat on WhatsApp",
    },
  },
};
