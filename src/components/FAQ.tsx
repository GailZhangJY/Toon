"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 默认 FAQ 列表
  const defaultFAQs: FAQItem[] = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer"),
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer"),
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer"),
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer"),
    },
    {
      question: t("faq5Question"),
      answer: t("faq5Answer"),
    },
  ];

  const displayFAQs = faqs || defaultFAQs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 dark:bg-zinc-950" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {t("faqTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            {t("faqSubtitle")}
          </p>
        </div>

        {/* FAQ 列表 */}
        <div className="space-y-4">
          {displayFAQs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 transition-all dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* 问题按钮 */}
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="pr-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-zinc-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* 答案内容 - 使用 grid 过渡避免布局偏移 */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div 
                    id={`faq-answer-${index}`}
                    className="border-t border-zinc-200 px-6 py-4 dark:border-zinc-800"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
