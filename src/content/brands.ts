import type { Locale } from "@/i18n/config";
import type { PhotoKey } from "./photos";

export type Category = "laptops" | "smartphones";

export type Brand = {
  slug: string;
  name: string;
  /** Japanese reading/label used in JA copy */
  nameJa: string;
  categories: Category[];
  laptopSeries?: string[];
  phoneSeries?: string[];
  blurb: Record<Locale, string>;
  /** Device photos, most representative first. */
  photos: PhotoKey[];
};

export const brands: Brand[] = [
  {
    slug: "apple",
    name: "Apple",
    nameJa: "Apple（アップル）",
    categories: ["laptops", "smartphones"],
    laptopSeries: ["MacBook Air M1", "MacBook Air M2 / M3", "MacBook Pro 13\"", "MacBook Pro 14\" / 16\"", "Intel MacBook Pro"],
    phoneSeries: ["iPhone 11 series", "iPhone 12 series", "iPhone 13 series", "iPhone 14 series", "iPhone 15 series", "iPhone SE"],
    blurb: {
      en: "MacBooks and iPhones are among the most in-demand used devices worldwide. Japanese units are known for clean cosmetics and high battery health.",
      ja: "MacBook・iPhoneは世界中で需要が高く、古いモデルや付属品のない端末でも積極的にお買い取りしています。",
    },
    photos: ["mac-air", "iphone15"],
  },
  {
    slug: "dell",
    name: "Dell",
    nameJa: "Dell（デル）",
    categories: ["laptops"],
    laptopSeries: ["Latitude 5000 series", "Latitude 7000 series", "XPS 13 / 15", "Vostro", "Inspiron", "Precision"],
    blurb: {
      en: "Business-grade Latitude and Precision notebooks from Japanese corporate lease returns — durable, consistent and easy to refurbish.",
      ja: "Latitude・XPS・Precisionなど、法人で使われたビジネスモデルを中心に大量のお買い取りに対応します。",
    },
    photos: ["dell-xps"],
  },
  {
    slug: "lenovo",
    name: "Lenovo",
    nameJa: "Lenovo（レノボ）",
    categories: ["laptops"],
    laptopSeries: ["ThinkPad T series", "ThinkPad X series", "ThinkPad X1 Carbon", "ThinkPad L / E series", "IdeaPad", "Yoga"],
    blurb: {
      en: "ThinkPads are a wholesale favourite. Japan’s corporate fleets supply steady volumes of T, X and X1 Carbon models.",
      ja: "ThinkPadは海外でも人気が高く、T・X・X1 Carbonシリーズなどを高価買取いたします。",
    },
    photos: ["tp-x1jp"],
  },
  {
    slug: "hp",
    name: "HP",
    nameJa: "HP（エイチピー）",
    categories: ["laptops"],
    laptopSeries: ["EliteBook 800 series", "EliteBook x360", "ProBook 400 series", "ZBook", "Pavilion", "Spectre"],
    blurb: {
      en: "EliteBook and ProBook business notebooks in single-model and mixed lots, sourced from Japanese offices and lease returns.",
      ja: "EliteBook・ProBookなど、オフィスで使われたHPのノートパソコンをまとめてお買い取りします。",
    },
    photos: ["hp-840g8"],
  },
  {
    slug: "panasonic",
    name: "Panasonic",
    nameJa: "Panasonic（パナソニック）",
    categories: ["laptops"],
    laptopSeries: ["Let’s note CF-SV", "Let’s note CF-QV", "Let’s note CF-FV", "Let’s note CF-LV", "Let’s note CF-SZ", "TOUGHBOOK"],
    blurb: {
      en: "Let’s note is Japan’s iconic business laptop — lightweight, rugged and rarely available outside Japan.",
      ja: "日本のビジネスパーソンに愛用されるLet’s note。古い型番からまとめ売りまで、幅広くお買い取りします。",
    },
    photos: ["pana-cfb10"],
  },
  {
    slug: "fujitsu",
    name: "Fujitsu",
    nameJa: "富士通",
    categories: ["laptops", "smartphones"],
    laptopSeries: ["LIFEBOOK U series", "LIFEBOOK A series", "LIFEBOOK E series", "FMV"],
    phoneSeries: ["arrows We", "arrows N", "arrows Be"],
    blurb: {
      en: "Japanese-made LIFEBOOK notebooks from enterprise fleets, plus arrows smartphones from the domestic market.",
      ja: "法人向けLIFEBOOKや家庭用FMV、arrowsスマートフォンまで幅広く対応いたします。",
    },
    photos: ["fuji-u759", "fuji-arrows"],
  },
  {
    slug: "nec",
    name: "NEC",
    nameJa: "NEC",
    categories: ["laptops"],
    laptopSeries: ["VersaPro", "LAVIE", "LAVIE Pro Mobile"],
    blurb: {
      en: "VersaPro business notebooks are a staple of Japanese offices and schools, available in large uniform lots.",
      ja: "VersaProやLAVIEなど、企業・学校で使われたNECのパソコンを大量にお買い取りします。",
    },
    photos: ["nec-xc750"],
  },
  {
    slug: "dynabook",
    name: "Dynabook",
    nameJa: "dynabook（旧東芝）",
    categories: ["laptops"],
    laptopSeries: ["dynabook G series", "dynabook R series", "dynabook B series", "dynabook S series"],
    blurb: {
      en: "Formerly Toshiba — reliable dynabook business laptops with Japanese keyboards and consistent specs.",
      ja: "旧東芝のdynabookシリーズも買取対象です。ビジネスモデルのまとめ売りも歓迎です。",
    },
    photos: ["dyna-r8"],
  },
  {
    slug: "microsoft",
    name: "Microsoft Surface",
    nameJa: "Microsoft Surface",
    categories: ["laptops"],
    laptopSeries: ["Surface Pro", "Surface Laptop", "Surface Laptop Go", "Surface Go", "Surface Book"],
    blurb: {
      en: "Premium Surface Pro and Surface Laptop devices — popular with retailers looking for high-margin Windows stock.",
      ja: "Surface Pro・Surface Laptopなど、キーボードやペンの有無を問わずご相談ください。",
    },
    photos: ["ms-laptop"],
  },
  {
    slug: "asus",
    name: "ASUS",
    nameJa: "ASUS（エイスース）",
    categories: ["laptops", "smartphones"],
    laptopSeries: ["ZenBook", "VivoBook", "ExpertBook", "ROG / TUF Gaming"],
    phoneSeries: ["Zenfone 9 / 10", "Zenfone 11 / 12 Ultra", "ROG Phone series"],
    blurb: {
      en: "Consumer and business ASUS notebooks, including ZenBook ultrabooks and gaming models, plus Zenfone and ROG Phone handsets.",
      ja: "ZenBook・VivoBookからゲーミングモデル、Zenfone・ROG Phoneまで、ASUS製品をお買い取りします。",
    },
    photos: ["asus-s14", "asus-zf12"],
  },
  {
    slug: "vaio",
    name: "VAIO",
    nameJa: "VAIO（バイオ）",
    categories: ["laptops"],
    laptopSeries: ["VAIO SX12 / SX14", "VAIO Pro PG / PK", "VAIO S series"],
    blurb: {
      en: "Japan-designed VAIO business notebooks — lightweight premium machines with strong demand among discerning buyers.",
      ja: "安曇野生まれのVAIO。ビジネスモデルを中心に、型番を問わずご相談ください。",
    },
    photos: ["vaio-z"],
  },
  {
    slug: "samsung",
    name: "Samsung",
    nameJa: "Samsung（サムスン）",
    categories: ["smartphones"],
    phoneSeries: ["Galaxy S21 – S24", "Galaxy S Ultra", "Galaxy Note 20", "Galaxy A series", "Galaxy Z Fold / Flip"],
    blurb: {
      en: "Galaxy S, Note, A and foldable models — Japanese carrier and SIM-free units with IMEI checks.",
      ja: "Galaxy S・A・Zシリーズなど、キャリア版・SIMフリー版ともにお買い取りします。",
    },
    photos: ["sam-s23u", "sam-fold5"],
  },
  {
    slug: "google",
    name: "Google Pixel",
    nameJa: "Google Pixel",
    categories: ["smartphones"],
    phoneSeries: ["Pixel 6 / 6 Pro", "Pixel 7 / 7 Pro", "Pixel 8 / 8 Pro", "Pixel 6a / 7a / 8a"],
    blurb: {
      en: "Pixel phones are widely sold in Japan, making it one of the best sources of clean, unlocked used Pixels.",
      ja: "Pixel 6以降のモデルを中心に、aシリーズやProモデルも高価買取いたします。",
    },
    photos: ["pixel8pro"],
  },
  {
    slug: "sony",
    name: "Sony Xperia",
    nameJa: "Sony Xperia（ソニー）",
    categories: ["smartphones"],
    phoneSeries: ["Xperia 1 series", "Xperia 5 series", "Xperia 10 series", "Xperia Ace"],
    blurb: {
      en: "Xperia handsets from Japan’s home market — a niche that is hard to source anywhere else in volume.",
      ja: "Xperia 1・5・10シリーズなど、国内モデルのXperiaをお買い取りします。",
    },
    photos: ["xperia1v"],
  },
  {
    slug: "sharp",
    name: "Sharp AQUOS",
    nameJa: "SHARP AQUOS（シャープ）",
    categories: ["smartphones"],
    phoneSeries: ["AQUOS sense series", "AQUOS R series", "AQUOS wish", "AQUOS zero"],
    blurb: {
      en: "One of Japan’s best-selling Android lines. AQUOS sense models are available in large, uniform quantities.",
      ja: "国内で人気のAQUOS sense・Rシリーズなど、まとめ売りも大歓迎です。",
    },
    photos: ["aquos-s4p"],
  },
  {
    slug: "xiaomi",
    name: "Xiaomi",
    nameJa: "Xiaomi（シャオミ）",
    categories: ["smartphones"],
    phoneSeries: ["Xiaomi 13T / 14T", "Xiaomi 12T Pro", "Redmi Note 11 – 13", "Redmi 12 5G", "POCO F series"],
    blurb: {
      en: "Xiaomi and Redmi handsets sold through Japanese carriers and SIM-free channels — strong value models with high resale demand.",
      ja: "Xiaomi・Redmi・POCOのスマートフォンを、キャリア版・SIMフリー版ともにお買い取りします。",
    },
    photos: ["xiaomi13"],
  },
  {
    slug: "oppo",
    name: "OPPO",
    nameJa: "OPPO（オッポ）",
    categories: ["smartphones"],
    phoneSeries: ["Reno7 A / Reno9 A", "Reno10 Pro 5G", "Reno11 A", "Find X3 / X5 Pro", "OPPO A series"],
    blurb: {
      en: "OPPO’s Reno A series is one of Japan’s best-selling mid-range lines, available in steady, uniform volumes.",
      ja: "国内で人気のReno Aシリーズをはじめ、Find X・Aシリーズなど OPPO のスマホをお買い取りします。",
    },
    photos: ["oppo-x3"],
  },
  {
    slug: "motorola",
    name: "Motorola",
    nameJa: "Motorola（モトローラ）",
    categories: ["smartphones"],
    phoneSeries: ["moto g series", "moto e series", "motorola edge series", "razr 40 / 50"],
    blurb: {
      en: "SIM-free moto g, edge and razr handsets from the Japanese market — clean, unlocked Android stock.",
      ja: "moto g・edge・razrなど、SIMフリーのモトローラ製スマホをお買い取りします。",
    },
    photos: ["moto-razr40"],
  },
  {
    slug: "huawei",
    name: "Huawei",
    nameJa: "Huawei（ファーウェイ）",
    categories: ["smartphones"],
    phoneSeries: ["P30 / P30 Pro", "P30 lite", "P20 series", "Mate series", "nova series"],
    blurb: {
      en: "Huawei P and nova series phones from Japan — older Google-services models that remain popular in many export markets.",
      ja: "P30・P20・novaシリーズなど、ファーウェイのスマホも型番を問わずご相談ください。",
    },
    photos: ["huawei-p30p"],
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
export const brandsIn = (cat: Category) => brands.filter((b) => b.categories.includes(cat));

/** The photo that best represents a brand within a category (e.g. iPhone rather than MacBook on the phones page). */
export function brandPhotoKey(b: Brand, category?: Category): PhotoKey {
  if (category === "smartphones" && b.categories[0] === "laptops" && b.photos[1]) return b.photos[1];
  return b.photos[0];
}
