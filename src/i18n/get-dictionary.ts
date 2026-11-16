import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  ja: () => import("./dictionaries/ja").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
