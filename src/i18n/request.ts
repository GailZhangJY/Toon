import {getRequestConfig} from "next-intl/server";
import {locales, defaultLocale, type Locale} from "./locales";
import {getMessages} from "./getMessages";

// next-intl 的请求级配置，用于在服务端确定当前语言和文案
export default getRequestConfig(async ({requestLocale}) => {
  let locale = (await requestLocale) as Locale | undefined;

  // 如果请求中没有 locale 或不在支持列表内，则回退到默认语言
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: getMessages(locale),
  };
});
