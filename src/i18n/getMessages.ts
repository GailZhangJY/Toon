import type { Locale } from "./locales";

// 动态导入语言文件，支持所有 20 种语言
export function getMessages(locale: Locale) {
  try {
    // 动态导入对应语言的 JSON 文件
    return require(`./messages/${locale}.json`);
  } catch (error) {
    // 如果语言文件不存在，回退到英语
    console.warn(`Language file for "${locale}" not found, falling back to English`);
    return require(`./messages/en.json`);
  }
}
