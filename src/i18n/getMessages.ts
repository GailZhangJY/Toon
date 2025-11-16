import type { Locale } from "./locales";
import zh from "./messages/zh.json";
import en from "./messages/en.json";

// 根据 locale 获取对应语言的文案
export function getMessages(locale: Locale) {
  switch (locale) {
    case "en":
      return en;
    case "zh":
    default:
      return zh;
  }
}
