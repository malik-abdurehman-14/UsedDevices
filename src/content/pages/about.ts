import type { Locale } from "@/i18n/config";
import type { CardsBlock, CtaBlock, FeatureBlock, Hero, Meta, StepsBlock } from "../types";

/** Merged "About + Wholesale" page — one page that explains who we are and how buyers work with us. */
export type AboutPageContent = {
  meta: Meta;
  hero: Hero;
  story: { eyebrow: string; title: string; quote: string; paragraphs: string[] };
  why: FeatureBlock;
  process: StepsBlock;
  lots: CardsBlock;
  profile: {
    eyebrow: string;
    title: string;
    labels: Record<"name" | "founded" | "representative" | "address" | "business" | "license" | "contact" | "hours", string>;
    business: string;
  };
  cta: CtaBlock;
};

export const aboutPage: Record<Locale, AboutPageContent> = {
  en: {
    meta: {
      title: "About Us — Japan Supplier of Used Laptops & Phones",
      description:
        "A Japan-based company buying used laptops and smartphones locally and supplying graded stock to wholesale buyers in 40+ countries. Trial lots to full containers, full export documentation, FOB/CIF shipping.",
      keywords: [
        "used laptops supplier Japan",
        "used phones supplier Japan",
        "wholesale used electronics Japan",
        "Japan used electronics exporter",
        "bulk used laptops export",
        "container used laptops",
        "B2B used devices Japan",
        "about us",
      ],
    },
    hero: {
      eyebrow: "About us",
      title: "Your sourcing partner in Japan.",
      desc: "We buy used laptops and smartphones across Japan every day and supply them — inspected, graded and fully documented — to wholesalers, refurbishers and retailers in over 40 countries.",
      primary: "Open a wholesale inquiry",
      secondary: "Talk to us on WhatsApp",
    },
    story: {
      eyebrow: "Who we are",
      title: "A bridge between Japan’s devices and the world.",
      quote: "Every device has more life in it. Our job is to find it the right next owner.",
      paragraphs: [
        "Japan retires huge numbers of well-kept laptops and phones every year — corporate fleets replaced on schedule, smartphones upgraded on carrier cycles. Meanwhile, buyers across the Middle East, Africa, Asia, Europe and the Americas need reliable, honestly described used stock.",
        "We sit between the two: sellers in Japan get a fair price and secure data erasure, and buyers abroad get consistently graded devices with the paperwork they need. That two-sided trust is the foundation of our business.",
      ],
    },
    why: {
      eyebrow: "Why buyers work with us",
      title: "Built for repeat wholesale orders.",
      items: [
        { title: "Direct Japanese sourcing", desc: "We buy from businesses, lease companies and individuals across Japan — no middle layers." },
        { title: "Honest, consistent grading", desc: "The same A / B / C standard on every shipment, so you can resell without re-sorting." },
        { title: "Detailed stock lists", desc: "Model, specs, grade, battery health and IMEI or serial for every unit." },
        { title: "Secure data erasure", desc: "Every device is wiped and reset before it leaves Japan — no exceptions." },
        { title: "Flexible volume", desc: "Start with a trial lot, then scale to mixed pallets or full containers." },
        { title: "Responsive team", desc: "One dedicated contact on WhatsApp, in English, from inquiry to delivery." },
      ],
    },
    process: {
      eyebrow: "How ordering works",
      title: "From first message to delivery.",
      intro: "Most buyers receive a stock list within one business day of their first inquiry.",
      steps: [
        { title: "Send your requirements", desc: "Brands, models, grades, specs and target quantity — via WhatsApp or the inquiry form." },
        { title: "Receive stock list & quote", desc: "Current availability, per-unit details and a quotation for your volume." },
        { title: "Confirm & pay", desc: "Approve the lot, confirm shipping terms and pay by international bank transfer (T/T)." },
        { title: "Pack, ship & track", desc: "Export-packed and shipped by air or sea with full documentation and tracking." },
      ],
    },
    lots: {
      eyebrow: "Lots & shipping",
      title: "Start small. Scale with confidence.",
      desc: "Every lot is quoted individually on current stock and your required mix.",
      cards: [
        { badge: "01", name: "Trial lot", desc: "A smaller first order to check our grading and quality before committing to volume." },
        { badge: "02", name: "Mixed pallet", desc: "Laptops and smartphones across brands and grades in one consolidated shipment." },
        { badge: "03", name: "Full container", desc: "LCL or FCL shipments for established wholesalers and distributors." },
      ],
      checklistTitle: "Included with every shipment",
      checks: [
        "Commercial invoice & packing list",
        "Per-unit grade & spec list",
        "IMEI / serial number list",
        "Air freight or sea (LCL / FCL)",
        "FOB or CIF terms",
        "Secure export packing",
        "Shipment tracking",
        "Photos on request",
      ],
    },
    profile: {
      eyebrow: "Company profile",
      title: "Company information.",
      labels: {
        name: "Company name",
        founded: "Established",
        representative: "Representative",
        address: "Address",
        business: "Business",
        license: "Secondhand dealer licence",
        contact: "Contact",
        hours: "Business hours",
      },
      business: "Purchase of used laptops and smartphones in Japan\nWholesale export of used electronics",
    },
    cta: {
      eyebrow: "Work with us",
      title: "Let’s build a supply line from Japan.",
      desc: "Tell us about your business and what you sell — we’ll send the current stock list and a quotation.",
      primary: "Open a wholesale inquiry",
      secondary: "Chat on WhatsApp",
    },
  },

  ja: {
    meta: {
      title: "会社概要｜中古パソコン・スマホの買取と海外輸出・卸売",
      description:
        "中古ノートパソコン・スマートフォンを国内で買い取り、検品・グレード分け・データ消去を行ったうえで世界40カ国以上へ卸売・輸出しています。会社情報・古物商許可番号はこちら。",
      keywords: ["会社概要", "中古パソコン 買取 会社", "中古スマホ 輸出 会社", "中古パソコン 卸売", "中古パソコン 輸出", "古物商許可"],
    },
    hero: {
      eyebrow: "会社概要",
      title: "日本の端末を、世界の次の持ち主へ。",
      desc: "国内で中古ノートパソコン・スマートフォンを買い取り、検品・データ消去のうえ、世界中のバイヤー様へお届けしています。",
      primary: "お問い合わせ",
      secondary: "WhatsAppで相談",
    },
    story: {
      eyebrow: "私たちについて",
      title: "売る方にも、買う方にも、信頼を。",
      quote: "まだ使える端末に、次の活躍の場を。",
      paragraphs: [
        "日本では毎年、大切に使われてきたパソコンやスマートフォンが数多く手放されています。一方、中東・アフリカ・アジア・ヨーロッパ・南北アメリカでは、品質の確かな中古端末が求められています。",
        "私たちはその両者をつなぎます。国内の売り手様には海外需要を反映した適正価格と確実なデータ消去を、海外のバイヤー様には検品・グレード分けされた端末と必要な書類を。双方からの信頼が、私たちの事業の土台です。",
      ],
    },
    why: {
      eyebrow: "私たちの強み",
      title: "安心してお任せいただける理由。",
      items: [
        { title: "国内で直接仕入れ", desc: "法人・リース会社・個人のお客様から、中間業者を介さず直接お買い取りします。" },
        { title: "誠実で一貫した査定", desc: "端末の状態をありのままに評価し、毎回同じA/B/C基準で仕分けします。" },
        { title: "確実なデータ消去", desc: "お預かりした端末のデータは、例外なく確実に消去・初期化します。" },
        { title: "海外需要による適正価格", desc: "世界の販売先とつながっているため、国内相場に左右されにくい価格をご提示できます。" },
        { title: "1台から大口まで", desc: "個人様の1台から、法人様のまとまった台数・コンテナ単位の取引まで対応します。" },
        { title: "リユースの推進", desc: "端末を長く使い続けることで、電子廃棄物の削減に貢献します。" },
      ],
    },
    process: {
      eyebrow: "取引の流れ",
      title: "国内での買取から、海外へのお届けまで。",
      intro: "買い取った端末は、検品・データ消去・グレード分けを経て世界中のバイヤー様へ届けられます。",
      steps: [
        { title: "国内で買取", desc: "個人様・法人様から、パソコン・スマホを1台からお買い取りします。" },
        { title: "検品・データ消去", desc: "動作確認とデータの完全消去・初期化を行います。" },
        { title: "グレード分け", desc: "外観・バッテリーなどを確認し、A/B/Cに仕分けて在庫リスト化します。" },
        { title: "海外へ出荷", desc: "書類をそろえ、航空便・船便で世界40カ国以上のバイヤー様へお届けします。" },
      ],
    },
    lots: {
      eyebrow: "卸売・輸出",
      title: "少量から、コンテナ単位の大口取引まで。",
      desc: "海外・国内の事業者様向けに、在庫状況とご希望の構成に応じてロットごとにお見積りします。",
      cards: [
        { badge: "01", name: "トライアルロット", desc: "品質やグレードをご確認いただくための、少量の初回注文です。" },
        { badge: "02", name: "ミックスパレット", desc: "パソコン・スマホ、複数メーカー・グレードを組み合わせて出荷します。" },
        { badge: "03", name: "コンテナ単位", desc: "LCL・FCLによる大口出荷。継続取引のバイヤー様向けです。" },
      ],
      checklistTitle: "出荷時にご用意するもの",
      checks: [
        "インボイス・パッキングリスト",
        "1台ごとのグレード・スペック表",
        "IMEI・シリアル番号リスト",
        "航空便・船便（LCL / FCL）",
        "FOB・CIF条件",
        "輸出用の梱包",
        "追跡番号",
        "ご希望に応じて写真",
      ],
    },
    profile: {
      eyebrow: "会社情報",
      title: "会社概要",
      labels: {
        name: "会社名",
        founded: "設立",
        representative: "代表者",
        address: "所在地",
        business: "事業内容",
        license: "古物商許可",
        contact: "連絡先",
        hours: "営業時間",
      },
      business: "中古ノートパソコン・スマートフォンの買取\n中古電子機器の輸出・卸売",
    },
    cta: {
      eyebrow: "お問い合わせ",
      title: "お気軽にご相談ください。",
      desc: "買取のご相談も、卸売のお問い合わせも、担当者が丁寧に対応いたします。",
      primary: "お問い合わせ",
      secondary: "WhatsAppで相談",
    },
  },
};
