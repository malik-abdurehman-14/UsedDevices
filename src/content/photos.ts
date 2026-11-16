import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";

import macProM3 from "@/assets/devices/mac-pro-m3.webp";
import macAir from "@/assets/devices/mac-air.webp";
import dellXps from "@/assets/devices/dell-xps.webp";
import tpX1jp from "@/assets/devices/tp-x1jp.webp";
import hp840g8 from "@/assets/devices/hp-840g8.webp";
import panaCfb10 from "@/assets/devices/pana-cfb10.webp";
import fujiU759 from "@/assets/devices/fuji-u759.webp";
import necXc750 from "@/assets/devices/nec-xc750.webp";
import dynaR8 from "@/assets/devices/dyna-r8.webp";
import msLaptop from "@/assets/devices/ms-laptop.webp";
import asusS14 from "@/assets/devices/asus-s14.webp";
import vaioZ from "@/assets/devices/vaio-z.webp";
import iphoneSeries from "@/assets/devices/iphone-series.webp";
import iphone15 from "@/assets/devices/iphone15.webp";
import samS23u from "@/assets/devices/sam-s23u.webp";
import samS24 from "@/assets/devices/sam-s24.webp";
import samFold5 from "@/assets/devices/sam-fold5.webp";
import pixel8pro from "@/assets/devices/pixel8pro.webp";
import xperia1v from "@/assets/devices/xperia1v.webp";
import aquosS4p from "@/assets/devices/aquos-s4p.webp";
import fujiArrows from "@/assets/devices/fuji-arrows.webp";
import xiaomi13 from "@/assets/devices/xiaomi13.webp";
import oppoX3 from "@/assets/devices/oppo-x3.webp";
import motoRazr40 from "@/assets/devices/moto-razr40.webp";
import huaweiP30p from "@/assets/devices/huawei-p30p.webp";
import asusZf12 from "@/assets/devices/asus-zf12.webp";

/**
 * Device photography. All images are from Wikimedia Commons under free licences
 * (CC0 / public domain / CC BY / CC BY-SA). Attribution is shown on /credits — keep `credit` accurate.
 * Replace with the client's own stock photos when available (and remove the credit entry).
 */
export type Photo = {
  img: StaticImageData;
  alt: Record<Locale, string>;
  /** Light/transparent background — render on a light surface. */
  light?: boolean;
  credit: { author: string; license: string; licenseUrl: string; source: string };
};

const cc = {
  by2: "https://creativecommons.org/licenses/by/2.0/",
  by3: "https://creativecommons.org/licenses/by/3.0/",
  by4: "https://creativecommons.org/licenses/by/4.0/",
  bysa2: "https://creativecommons.org/licenses/by-sa/2.0/",
  bysa3: "https://creativecommons.org/licenses/by-sa/3.0/",
  bysa4: "https://creativecommons.org/licenses/by-sa/4.0/",
  cc0: "https://creativecommons.org/publicdomain/zero/1.0/",
};
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const photos = {
  "mac-pro-m3": {
    img: macProM3,
    alt: { en: "Apple MacBook Pro 14-inch in Space Grey", ja: "Apple MacBook Pro 14インチ スペースグレイ" },
    credit: { author: "Kyu3a", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("M3_Macbook_Pro_14_inch_Space_Grey_model_(cropped).jpg") },
  },
  "mac-air": {
    img: macAir,
    light: true,
    alt: { en: "Apple MacBook Air M1 in Silver", ja: "Apple MacBook Air M1 シルバー" },
    credit: { author: "L", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("Macbook_Air_M1_Silver_PNG.png") },
  },
  "dell-xps": {
    img: dellXps,
    light: true,
    alt: { en: "Dell XPS 13 and XPS 15 laptops", ja: "Dell XPS 13・XPS 15 ノートパソコン" },
    credit: { author: "Tinh tế Photo", license: "CC0", licenseUrl: cc.cc0, source: commons("DELL_XPS_13_and_15_(37080596413).jpg") },
  },
  "tp-x1jp": {
    img: tpX1jp,
    alt: { en: "Lenovo ThinkPad X1 Carbon with Japanese keyboard", ja: "日本語キーボードの Lenovo ThinkPad X1 Carbon" },
    credit: { author: "TAKA@P.P.R.S", license: "CC BY-SA 2.0", licenseUrl: cc.bysa2, source: commons("ThinkPad_X1_Carbon_Japanese_Keyboard.jpg") },
  },
  "hp-840g8": {
    img: hp840g8,
    light: true,
    alt: { en: "HP EliteBook 840 G8 business laptop", ja: "HP EliteBook 840 G8 ビジネスノートPC" },
    credit: { author: "Infinatious", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("HP_EliteBook_840_G8.png") },
  },
  "pana-cfb10": {
    img: panaCfb10,
    alt: { en: "Panasonic Let’s note business laptop", ja: "Panasonic Let’s note ノートパソコン" },
    credit: { author: "Kansai explorer", license: "CC BY 3.0", licenseUrl: cc.by3, source: commons("Panasonic_CF-B10BWJYS_20120121.jpg") },
  },
  "fuji-u759": {
    img: fujiU759,
    alt: { en: "Fujitsu LIFEBOOK U759 business laptop", ja: "富士通 LIFEBOOK U759" },
    credit: { author: "Rakoon", license: "CC0", licenseUrl: cc.cc0, source: commons("20190606_140544_Fujitsu_LIFEBOOK_U759.jpg") },
  },
  "nec-xc750": {
    img: necXc750,
    alt: { en: "NEC LAVIE NEXTREME Carbon laptop", ja: "NEC LAVIE NEXTREME Carbon" },
    credit: { author: "Hiromi ikusabe", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("LAVIE_NEXTREME_Carbon_XC750.jpg") },
  },
  "dyna-r8": {
    img: dynaR8,
    alt: { en: "Dynabook R8 laptop", ja: "dynabook R8 ノートパソコン" },
    credit: { author: "Hiromi ikusabe", license: "CC0", licenseUrl: cc.cc0, source: commons("Dynabook_R8.jpg") },
  },
  "ms-laptop": {
    img: msLaptop,
    alt: { en: "Microsoft Surface Laptop in Burgundy", ja: "Microsoft Surface Laptop バーガンディ" },
    credit: { author: "WikIan", license: "CC BY 4.0", licenseUrl: cc.by4, source: commons("SurfaceLaptopBurgundy.png") },
  },
  "asus-s14": {
    img: asusS14,
    alt: { en: "ASUS Zenbook S 14 laptop", ja: "ASUS Zenbook S 14" },
    credit: { author: "Tech Savvy User", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("Zenbook_S_14_UX5406SA_Product_photo_3W_Scandinavian_White_08.jpg") },
  },
  "vaio-z": {
    img: vaioZ,
    alt: { en: "VAIO Z laptop, closed", ja: "VAIO Z ノートパソコン" },
    credit: { author: "TTTNIS", license: "CC0", licenseUrl: cc.cc0, source: commons("SONY_VAIO_VPCZ119FJ-S_02.jpg") },
  },
  "iphone-series": {
    img: iphoneSeries,
    alt: { en: "iPhone 15 and iPhone 15 Pro handsets, front and back", ja: "iPhone 15 シリーズ（表・裏）" },
    credit: { author: "Ka Kit Pang", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("IPhone_Series.jpg") },
  },
  iphone15: {
    img: iphone15,
    alt: { en: "Apple iPhone 15, front and back", ja: "Apple iPhone 15（表・裏）" },
    credit: { author: "Ka Kit Pang", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("IPhone_15.jpeg") },
  },
  "sam-s23u": {
    img: samS23u,
    alt: { en: "Samsung Galaxy S23 Ultra with S Pen", ja: "Samsung Galaxy S23 Ultra と Sペン" },
    credit: {
      author: "PantheraLeo1359531",
      license: "CC BY 4.0",
      licenseUrl: cc.by4,
      source: commons("Samsung_Galaxy_S23_Ultra,_512_GB,_Lavender_mit_S-Pen_20230416_HOF00335_RAW-Export_cens.png"),
    },
  },
  "sam-s24": {
    img: samS24,
    alt: { en: "Samsung Galaxy S24 series smartphones", ja: "Samsung Galaxy S24 シリーズ" },
    credit: { author: "可恩Ke En", license: "CC BY 3.0", licenseUrl: cc.by3, source: commons("Samsung_Galaxy_s24_series.jpg") },
  },
  "sam-fold5": {
    img: samFold5,
    alt: { en: "Samsung Galaxy Z Fold5 foldable smartphone", ja: "Samsung Galaxy Z Fold5" },
    credit: { author: "Vasonesiku", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("Samsung_Galaxy_Fold_5.jpg") },
  },
  pixel8pro: {
    img: pixel8pro,
    alt: { en: "Google Pixel 8 Pro on display in Shibuya, Tokyo", ja: "渋谷で展示された Google Pixel 8 Pro" },
    credit: { author: "Syced", license: "CC0", licenseUrl: cc.cc0, source: commons("Google_Pixel_8_Pro,_shown_in_Shibuya_Stream_2.jpg") },
  },
  xperia1v: {
    img: xperia1v,
    alt: { en: "Sony Xperia 1 V smartphones", ja: "Sony Xperia 1 V" },
    credit: { author: "Nash Izumrud", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("Sony_Xperia_1_Mk._V_with_a_White_Case.jpg") },
  },
  "aquos-s4p": {
    img: aquosS4p,
    alt: { en: "Sharp AQUOS sense4 plus smartphone", ja: "SHARP AQUOS sense4 plus" },
    credit: { author: "DR17 Sagittarius Runaway", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("SHARP_AQUOS_sense4_plus_SH-M16_DSC_0001.jpg") },
  },
  "fuji-arrows": {
    img: fujiArrows,
    alt: { en: "Fujitsu arrows smartphones", ja: "富士通 arrows スマートフォン" },
    credit: { author: "Mr.W", license: "CC BY 4.0", licenseUrl: cc.by4, source: commons("Arrows_F-01F_F-04K_F-52A.jpg") },
  },
  xiaomi13: {
    img: xiaomi13,
    alt: { en: "Xiaomi smartphone on a display stand", ja: "Xiaomi スマートフォン" },
    credit: { author: "Maksdroider", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("Xiaomi_13_front.jpg") },
  },
  "oppo-x3": {
    img: oppoX3,
    alt: { en: "OPPO Find X3 series smartphones", ja: "OPPO Find X3 シリーズ" },
    credit: { author: "30000lightyears", license: "CC BY-SA 4.0", licenseUrl: cc.bysa4, source: commons("OPPO_Find_X3_series_back.jpg") },
  },
  "moto-razr40": {
    img: motoRazr40,
    alt: { en: "Motorola razr 40 smartphone", ja: "Motorola razr 40" },
    credit: { author: "X-SHLIED", license: "CC BY 4.0", licenseUrl: cc.by4, source: commons("Motorola_Razr_40.jpg") },
  },
  "huawei-p30p": {
    img: huaweiP30p,
    light: true,
    alt: { en: "Huawei P30 Pro, front and back", ja: "Huawei P30 Pro（表・裏）" },
    credit: { author: "Wilfredor", license: "CC0", licenseUrl: cc.cc0, source: commons("Huawei_P30_Pro.jpg") },
  },
  "asus-zf12": {
    img: asusZf12,
    alt: { en: "ASUS Zenfone 12 Ultra smartphones", ja: "ASUS Zenfone 12 Ultra" },
    credit: { author: "Yccnt", license: "CC0", licenseUrl: cc.cc0, source: commons("Zenfone_12_Ultra.png") },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
export const getPhoto = (key: PhotoKey): Photo => photos[key];

/** Category-level imagery. */
export const categoryPhotos = {
  laptops: ["mac-pro-m3", "tp-x1jp"],
  smartphones: ["iphone-series", "sam-s23u"],
} as const satisfies Record<string, readonly PhotoKey[]>;
