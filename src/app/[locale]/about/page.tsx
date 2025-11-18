"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t("aboutTitle")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {t("aboutSubtitle")}
          </p>
        </div>

        {/* 项目介绍 */}
        <div className="mb-12 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-6 flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Toon Fast Logo"
              width={64}
              height={64}
              className="h-16 w-16"
              style={{ width: '64px', height: '64px' }}
            />
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Toon Fast
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("aboutTagline")}
              </p>
            </div>
          </div>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {t("aboutDescription1")}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {t("aboutDescription2")}
          </p>
        </div>

        {/* 核心价值 */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t("aboutValuesTitle")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/50">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t("aboutValue1Title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("aboutValue1Desc")}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/50">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t("aboutValue2Title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("aboutValue2Desc")}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/50">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t("aboutValue3Title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("aboutValue3Desc")}
              </p>
            </div>
          </div>
        </div>

        {/* 技术栈 */}
        <div className="mb-12 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t("aboutTechTitle")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-100 dark:bg-blue-950/50">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Next.js 16</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("aboutTechNext")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-100 dark:bg-blue-950/50">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">React 19</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("aboutTechReact")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-100 dark:bg-blue-950/50">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">TypeScript</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("aboutTechTypescript")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-100 dark:bg-blue-950/50">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Tailwind CSS</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("aboutTechTailwind")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-100 dark:bg-blue-950/50">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">@toon-format/toon</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("aboutTechToon")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-100 dark:bg-blue-950/50">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">PapaParse</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("aboutTechPapa")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 开源信息 */}
        <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-sm dark:border-zinc-800 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-900">
              <svg className="h-6 w-6 text-zinc-900 dark:text-zinc-50" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {t("aboutOpenSourceTitle")}
              </h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                {t("aboutOpenSourceDesc")}
              </p>
              <a
                href="https://github.com/toon-format/toon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {t("aboutViewGithub")}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
