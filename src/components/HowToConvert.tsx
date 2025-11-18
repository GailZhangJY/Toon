"use client";

import { useTranslations } from "next-intl";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

interface HowToConvertProps {
  steps?: Step[];
}

export default function HowToConvert({ steps }: HowToConvertProps) {
  const t = useTranslations();

  // 默认步骤（如果没有传入自定义步骤）
  const defaultSteps: Step[] = [
    {
      number: 1,
      title: t("howToStep1Title"),
      description: t("howToStep1Desc"),
      icon: "📝",
    },
    {
      number: 2,
      title: t("howToStep2Title"),
      description: t("howToStep2Desc"),
      icon: "⚙️",
    },
    {
      number: 3,
      title: t("howToStep3Title"),
      description: t("howToStep3Desc"),
      icon: "🚀",
    },
    {
      number: 4,
      title: t("howToStep4Title"),
      description: t("howToStep4Desc"),
      icon: "💾",
    },
  ];

  const displaySteps = steps || defaultSteps;

  return (
    <section className="bg-white py-16 dark:bg-zinc-950" id="how-to-convert">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {t("howToConvertTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            {t("howToConvertSubtitle")}
          </p>
        </div>

        {/* 步骤列表 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {displaySteps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
            >
              {/* 步骤编号 */}
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white shadow-md">
                  {step.number}
                </span>
                <span className="text-3xl">{step.icon}</span>
              </div>

              {/* 步骤标题 */}
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {step.title}
              </h3>

              {/* 步骤描述 */}
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>

              {/* 装饰性连接线（除了最后一个） */}
              {step.number < displaySteps.length && (
                <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
