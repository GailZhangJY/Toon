// 支持的语言列表与类型定义
export const locales = [
  "en",  // 🇺🇸 English
  "zh",  // 🇨🇳 中文
  "es",  // 🇪🇸 Español
  "fr",  // 🇫🇷 Français
  "de",  // 🇩🇪 Deutsch
  "ja",  // 🇯🇵 日本語
  "ko",  // 🇰🇷 한국어
  "pt",  // 🇵🇹 Português
  "ru",  // 🇷🇺 Русский
  "ar",  // 🇸🇦 العربية
  "hi",  // 🇮🇳 हिन्दी
  "it",  // 🇮🇹 Italiano
  "nl",  // 🇳🇱 Nederlands
  "pl",  // 🇵🇱 Polski
  "tr",  // 🇹🇷 Türkçe
  "vi",  // 🇻🇳 Tiếng Việt
  "id",  // 🇮🇩 Bahasa Indonesia
  "sv",  // 🇸🇪 Svenska
  "he",  // 🇮🇱 עברית
  "ur",  // 🇵🇰 اردو
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// 语言显示名称和国旗
export const localeNames: Record<Locale, { name: string; flag: string; nativeName: string }> = {
  en: { name: "English", flag: "🇺🇸", nativeName: "English" },
  zh: { name: "Chinese", flag: "🇨🇳", nativeName: "中文" },
  es: { name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  fr: { name: "French", flag: "🇫🇷", nativeName: "Français" },
  de: { name: "German", flag: "🇩🇪", nativeName: "Deutsch" },
  ja: { name: "Japanese", flag: "🇯🇵", nativeName: "日本語" },
  ko: { name: "Korean", flag: "🇰🇷", nativeName: "한국어" },
  pt: { name: "Portuguese", flag: "🇵🇹", nativeName: "Português" },
  ru: { name: "Russian", flag: "🇷🇺", nativeName: "Русский" },
  ar: { name: "Arabic", flag: "🇸🇦", nativeName: "العربية" },
  hi: { name: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" },
  it: { name: "Italian", flag: "🇮🇹", nativeName: "Italiano" },
  nl: { name: "Dutch", flag: "🇳🇱", nativeName: "Nederlands" },
  pl: { name: "Polish", flag: "🇵🇱", nativeName: "Polski" },
  tr: { name: "Turkish", flag: "🇹🇷", nativeName: "Türkçe" },
  vi: { name: "Vietnamese", flag: "🇻🇳", nativeName: "Tiếng Việt" },
  id: { name: "Indonesian", flag: "🇮🇩", nativeName: "Bahasa Indonesia" },
  sv: { name: "Swedish", flag: "🇸🇪", nativeName: "Svenska" },
  he: { name: "Hebrew", flag: "🇮🇱", nativeName: "עברית" },
  ur: { name: "Urdu", flag: "🇵🇰", nativeName: "اردو" },
};
