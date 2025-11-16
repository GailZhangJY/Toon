import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "@/i18n/getMessages";
import { locales, type Locale } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 按语言生成页面的 SEO 元信息
export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const messages = getMessages(locale) as any;

  const title: string = messages.seoTitle;
  const description: string = messages.seoDescription;
  const keywords: string[] | undefined = messages.seoKeywords;

  const isZh = locale === "zh";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      // canonical 使用当前语言的根路径
      canonical: isZh ? "/zh" : "/en",
      // 多语言版本互相声明，方便搜索引擎识别
      languages: {
        zh: "/zh",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  // 在 Next.js 16 中，params 是一个 Promise，需要在函数体内解包
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
