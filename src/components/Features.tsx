"use client";

import { useTranslations } from "next-intl";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  features?: Feature[];
}

export default function Features({ features }: FeaturesProps) {
  const t = useTranslations();

  // 默认特性列表
  const defaultFeatures: Feature[] = [
    {
      title: t("feature1Title"),
      description: t("feature1Desc"),
      icon: "🚀",
    },
    {
      title: t("feature2Title"),
      description: t("feature2Desc"),
      icon: "🔒",
    },
    {
      title: t("feature3Title"),
      description: t("feature3Desc"),
      icon: "🎯",
    },
    {
      title: t("feature4Title"),
      description: t("feature4Desc"),
      icon: "⚡",
    },
    {
      title: t("feature5Title"),
      description: t("feature5Desc"),
      icon: "🌍",
    },
    {
      title: t("feature6Title"),
      description: t("feature6Desc"),
      icon: "💯",
    },
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-900" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {t("featuresTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            {t("featuresSubtitle")}
          </p>
        </div>

        {/* 特性网格 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayFeatures.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-700"
            >
              {/* 图标 */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-2xl shadow-md">
                {feature.icon}
              </div>

              {/* 标题 */}
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {feature.title}
              </h3>

              {/* 描述 */}
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
