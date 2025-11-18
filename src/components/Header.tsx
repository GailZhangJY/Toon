"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { locales, localeNames } from "@/i18n/locales";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 语言切换
  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${newLocale}`);
      return;
    }
    segments[0] = newLocale;
    router.push(`/${segments.join("/")}`);
  };

  // 导航链接
  const navLinks = [
    { key: "convert", href: `/${locale}`, label: t("navConvert") },
    { key: "blog", href: `/${locale}/blog`, label: t("navBlog") },
    { key: "contact", href: `/${locale}/contact`, label: t("navContact") },
    { key: "about", href: `/${locale}/about`, label: t("navAbout") },
  ];

  // 判断当前路由是否激活
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      // 首页或任何转换路由（x-to-x）都选中 Convert
      const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
      const isConvertRoute = /^\/[a-z]{2}\/[a-z]+-to-[a-z]+$/.test(pathname);
      return isHomePage || isConvertRoute;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo 和站点名称 */}
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image
              src="/logo.png"
              alt="Toon Fast Logo"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {t("siteName")}
            </span>
          </Link>
        </div>

        {/* 桌面端导航链接 */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                } hover:bg-zinc-100 dark:hover:bg-zinc-800`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* 右侧：多语言切换 + 移动端菜单按钮 */}
        <div className="flex items-center gap-3">
          {/* 语言切换下拉菜单 */}
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="appearance-none rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-8 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-blue-400 hover:shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-500"
              style={{ minWidth: "140px" }}
            >
              {locales.map((loc) => (
                <option key={loc} value={loc}>
                  {localeNames[loc].flag} {localeNames[loc].nativeName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg className="h-4 w-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
