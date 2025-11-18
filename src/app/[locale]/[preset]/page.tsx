import type { Metadata } from "next";
import HomePage from "../page";
import { generateAlternates } from "@/lib/metadata";
import { getMessages } from "@/i18n/getMessages";
import type { Locale } from "@/i18n/locales";

interface PresetPageProps {
  params: Promise<{ locale: string; preset: string }>;
}

// 转换工具页面的 preset 映射
const presetTitles: Record<string, string> = {
  "toon-to-json": "pageTitleToonToJson",
  "toon-to-csv": "pageTitleToonToCsv",
  "json-to-toon": "pageTitleJsonToToon",
  "json-to-csv": "pageTitleJsonToCsv",
  "csv-to-toon": "pageTitleCsvToToon",
  "csv-to-json": "pageTitleCsvToJson",
};

// 生成转换工具页面的 SEO 元信息
export async function generateMetadata({
  params,
}: PresetPageProps): Promise<Metadata> {
  const { locale, preset } = await params;
  const messages = getMessages(locale as Locale) as any;
  
  const titleKey = presetTitles[preset];
  const title = titleKey ? messages[titleKey] : messages.seoTitle;
  const description = messages.seoDescription;

  return {
    title,
    description,
    alternates: generateAlternates(locale, preset),
  };
}

export default function PresetPage() {
  return <HomePage />;
}
