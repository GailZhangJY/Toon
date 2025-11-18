import { locales } from "@/i18n/locales";

const BASE_URL = "https://toon.fast";

/**
 * 生成所有语言的 hreflang alternates 配置
 * @param locale 当前语言代码
 * @param path 页面路径，例如 "blog", "about", "contact"
 * @returns alternates 配置对象
 */
export function generateAlternates(locale: string, path: string = "") {
  const languages: Record<string, string> = {};
  
  // 为每种语言生成绝对 URL
  locales.forEach((loc) => {
    const url = path ? `${BASE_URL}/${loc}/${path}` : `${BASE_URL}/${loc}`;
    languages[loc] = url;
  });

  // canonical 使用当前语言的绝对 URL
  const canonical = path ? `${BASE_URL}/${locale}/${path}` : `${BASE_URL}/${locale}`;

  return {
    canonical,
    languages,
  };
}

/**
 * 生成完整的 URL
 * @param locale 语言代码
 * @param path 页面路径
 * @returns 完整的 URL
 */
export function generateUrl(locale: string, path: string = "") {
  return path ? `${BASE_URL}/${locale}/${path}` : `${BASE_URL}/${locale}`;
}
