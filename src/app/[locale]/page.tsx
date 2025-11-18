"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import ConvertPageLayout from "@/components/ConvertPageLayout";
import type { Format } from "@/lib/convert";

// 首页：Toon / JSON / CSV 转换工具（多语言）
export default function HomePage() {
  const pathname = usePathname();
  const t = useTranslations();

  // 输入/输出格式
  const [inputFormat, setInputFormat] = useState<Format>("toon");
  const [outputFormat, setOutputFormat] = useState<Format>("json");
  const [pageTitle, setPageTitle] = useState<string>("");

  // 根据路由预设默认的输入/输出格式，例如 /zh/toon-to-json
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];

    const presets: Record<string, { input: Format; output: Format; titleKey: string }> = {
      "toon-to-json": { input: "toon", output: "json", titleKey: "pageTitleToonToJson" },
      "toon-to-csv": { input: "toon", output: "csv", titleKey: "pageTitleToonToCsv" },
      "json-to-toon": { input: "json", output: "toon", titleKey: "pageTitleJsonToToon" },
      "json-to-csv": { input: "json", output: "csv", titleKey: "pageTitleJsonToCsv" },
      "csv-to-toon": { input: "csv", output: "toon", titleKey: "pageTitleCsvToToon" },
      "csv-to-json": { input: "csv", output: "json", titleKey: "pageTitleCsvToJson" },
    };

    const preset = presets[last ?? ""];
    if (preset) {
      setInputFormat(preset.input);
      setOutputFormat(preset.output);
      setPageTitle(t(preset.titleKey));
    } else {
      // 默认首页标题
      setPageTitle(t("title"));
    }
  }, [pathname, t]);

  return (
    <ConvertPageLayout
      inputFormat={inputFormat}
      outputFormat={outputFormat}
      pageTitle={pageTitle}
      pageDescription={t("subtitle")}
    />
  );
}
