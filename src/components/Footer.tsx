"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { locales, localeNames } from "@/i18n/locales";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  // 转换路由列表
  const convertRoutes = [
    { name: "Toon to JSON", path: `/${locale}/toon-to-json` },
    { name: "Toon to CSV", path: `/${locale}/toon-to-csv` },
    { name: "JSON to Toon", path: `/${locale}/json-to-toon` },
    { name: "JSON to CSV", path: `/${locale}/json-to-csv` },
    { name: "CSV to Toon", path: `/${locale}/csv-to-toon` },
    { name: "CSV to JSON", path: `/${locale}/csv-to-json` },
  ];

  // 语言列表（使用动态配置）

  // 资源链接
  const resourceLinks = [
    { key: "blog", href: `/${locale}/blog`, label: t("navBlog") },
    { key: "contact", href: `/${locale}/contact`, label: t("navContact") },
    { key: "about", href: `/${locale}/about`, label: t("navAbout") },
  ];

  // 推荐链接徽章（可扩展）
  const recommendLinks = [
    {
      key: "twelve-tools",
      href: "https://twelve.tools",
      imgSrc: "https://twelve.tools/badge0-white.svg",
      alt: "Featured on Twelve Tools",
      width: 200,
      height: 54,
    },
    {
      key: "nextgen-tools",
      href: "https://nxgntools.com/tools/toon-fast",
      imgSrc:
        "https://nxgntools.com/api/embed/toon-fast?type=FEATURED_ON&hideUpvotes=true",
      alt: "NextGen Tools Badge",
      // 保持与原始 HTML 徽章相近的高度
      width: 200,
      height: 48,
    },
    {
      key: "frogdr",
      href: "https://frogdr.com/toon.fast?utm_source=toon.fast",
      imgSrc: "https://frogdr.com/toon.fast/badge-white.svg?badge=1",
      alt: "Monitor your Domain Rating with FrogDR",
      width: 250,
      height: 54,
    },
  ];

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* 版权信息 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Toon Fast Logo"
                width={32}
                height={32}
                className="h-8 w-8"
                style={{ width: '32px', height: '32px' }}
              />
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t("siteName")}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t("footerDescription")}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              © {currentYear} {t("siteName")}. {t("footerCopyright")}
            </p>
          </div>

          {/* 转换工具列表 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {t("footerConverters")}
            </h3>
            <ul className="space-y-2">
              {convertRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className="text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 语言列表 */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {t("footerLanguages")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
              {locales.map((loc) => (
                <li key={loc}>
                  <Link
                    href={`/${loc}`}
                    className="flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    <span>{localeNames[loc].flag}</span>
                    <span className="truncate">{localeNames[loc].nativeName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 文档链接 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {t("footerResources")}
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底部分隔线和额外信息 */}
        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
            {recommendLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={link.imgSrc}
                  alt={link.alt}
                  width={link.width}
                  height={link.height}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
            {t("footerPrivacyNote")}
          </p>
        </div>
      </div>
    </footer>
  );
}
