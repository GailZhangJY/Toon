"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

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

  // 语言列表
  const languages = [
    { code: "zh", name: "中文" },
    { code: "en", name: "English" },
  ];

  // 资源链接
  const resourceLinks = [
    { key: "blog", href: `/${locale}/blog`, label: t("navBlog") },
    { key: "contact", href: `/${locale}/contact`, label: t("navContact") },
    { key: "about", href: `/${locale}/about`, label: t("navAbout") },
  ];

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 版权信息 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm shadow-md">
                T
              </div>
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
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {t("footerLanguages")}
            </h3>
            <ul className="space-y-2">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <Link
                    href={`/${lang.code}`}
                    className="text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {lang.name}
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
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
            {t("footerPrivacyNote")}
          </p>
        </div>
      </div>
    </footer>
  );
}
