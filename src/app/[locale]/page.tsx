"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import type { ConvertError, Format } from "@/lib/convert";
import { convertText } from "@/lib/convert";

// 首页：Toon / JSON / CSV 转换工具（多语言）
export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // 输入/输出格式
  const [inputFormat, setInputFormat] = useState<Format>("toon");
  const [outputFormat, setOutputFormat] = useState<Format>("json");

  // 文本内容
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  // 当前选中的文件名，仅用于展示
  const [fileName, setFileName] = useState<string>("");

  // 转换状态与错误信息
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<ConvertError | null>(null);

  // 根据路由预设默认的输入/输出格式，例如 /zh/toon-to-json
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];

    const presets: Record<string, { input: Format; output: Format }> = {
      "toon-to-json": { input: "toon", output: "json" },
      "toon-to-csv": { input: "toon", output: "csv" },
      "json-to-toon": { input: "json", output: "toon" },
      "json-to-csv": { input: "json", output: "csv" },
      "csv-to-toon": { input: "csv", output: "toon" },
      "csv-to-json": { input: "csv", output: "json" },
    };

    const preset = presets[last ?? ""];
    if (preset) {
      setInputFormat(preset.input);
      setOutputFormat(preset.output);
    }
  }, [pathname]);

  // 处理输入文本变化
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(event.target.value);
      if (error) {
        setError(null);
      }
    },
    [error],
  );

  // 处理输入格式变化
  const handleInputFormatChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setInputFormat(event.target.value as Format);
      if (error) {
        setError(null);
      }
    },
    [error],
  );

  // 处理输出格式变化
  const handleOutputFormatChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setOutputFormat(event.target.value as Format);
      if (error) {
        setError(null);
      }
    },
    [error],
  );

  // 交换输入/输出格式，并可选把当前输出作为新的输入
  const handleSwapFormat = useCallback(() => {
    setInputFormat(outputFormat);
    setOutputFormat(inputFormat);
    if (outputText) {
      setInputText(outputText);
    }
    if (error) {
      setError(null);
    }
  }, [error, inputFormat, outputFormat, outputText]);

  // 点击“转换”按钮
  const handleConvert = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsConverting(true);
    setError(null);

    try {
      const result = await convertText(inputText, inputFormat, outputFormat);
      setOutputText(result);
    } catch (err) {
      const e = err as ConvertError;
      if (e && e.message) {
        setError(e);
      } else {
        setError({
          name: "ConvertError",
          message: "转换过程出现未知错误",
          stage: "format",
        } as ConvertError);
      }
    } finally {
      setIsConverting(false);
    }
  }, [inputFormat, inputText, outputFormat]);

  // 当输入/输出格式变化且已有输入内容时自动触发一次转换
  useEffect(() => {
    if (!inputText.trim()) return;
    if (isConverting) return;
    void handleConvert();
  }, [inputFormat, outputFormat, inputText, isConverting, handleConvert]);

  // 复制输出内容到剪贴板
  const handleCopyOutput = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
    } catch {
      // 忽略复制失败
    }
  }, [outputText]);

  // 下载输出内容为文件
  const handleDownloadOutput = useCallback(() => {
    if (!outputText) return;

    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    let ext = outputFormat;
    if (ext === "toon") {
      ext = "toon";
    }

    a.href = url;
    a.download = `data.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [outputFormat, outputText]);

  // 文件选择回调：读取文件内容作为输入
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result ?? "");
        setInputText(text);
        setFileName(file.name);
        if (error) {
          setError(null);
        }
      };
      reader.readAsText(file, "utf-8");
    },
    [error],
  );

  // 语言切换：根据当前 locale 跳转到另一语言的同一路径
  const handleToggleLocale = useCallback(() => {
    const nextLocale = locale === "zh" ? "en" : "zh";
    // pathname 形如 /zh/xxx，需要替换首段
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${nextLocale}`);
      return;
    }
    segments[0] = nextLocale;
    router.push(`/${segments.join("/")}`);
  }, [locale, pathname, router]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8">
        {/* 顶部标题区域 + 语言切换 */}
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("title")}
            </h1>
            <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleLocale}
            className="mt-2 inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:mt-0"
          >
            {locale === "zh" ? t("langEnglish") : t("langChinese")}
          </button>
        </header>

        {/* 主要功能区域标题（H2） */}
        <h2 className="text-lg font-semibold tracking-tight">
          {t("sectionConverterTitle")}
        </h2>

        {/* 格式选择与交换 */}
        <section className="flex flex-wrap items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {t("inputFormat")}
            </span>
            <select
              className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              value={inputFormat}
              onChange={handleInputFormatChange}
            >
              <option value="toon">Toon</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSwapFormat}
            className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            {t("swap")}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {t("outputFormat")}
            </span>
            <select
              className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              value={outputFormat}
              onChange={handleOutputFormatChange}
            >
              <option value="toon">Toon</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </section>

        {/* 主体左右布局：左输入 / 中操作 / 右输出 */}
        <section className="flex flex-1 flex-col gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 md:flex-row">
          {/* 左侧输入区域 */}
          <div className="flex min-h-[260px] flex-1 flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("inputLabel")}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {t("currentFormat")}: {inputFormat.toUpperCase()}
              </span>
            </div>

            <textarea
              className="min-h-[220px] flex-1 resize-none rounded-md border border-zinc-300 bg-zinc-50 p-2 text-sm font-mono text-zinc-900 shadow-inner outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder={t("placeholderInput")}
              value={inputText}
              onChange={handleInputChange}
            />

            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span>{t("importFromFile")}</span>
                <label className="inline-flex cursor-pointer items-center">
                  <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">
                    {t("chooseFileButton")}
                  </span>
                  <input
                    type="file"
                    accept=".toon,.json,.csv,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span
                  className="max-w-[180px] truncate"
                  title={fileName || t("noFileSelected")}
                >
                  {fileName || t("noFileSelected")}
                </span>
              </div>
              <span>
                {t("chars")}: {inputText.length}
              </span>
            </div>
          </div>

          {/* 中间操作区 */}
          <div className="flex w-full flex-none flex-col items-center justify-center gap-3 py-2 md:w-40">
            <button
              type="button"
              onClick={handleConvert}
              disabled={isConverting || !inputText.trim()}
              className="w-full rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {isConverting ? t("converting") : t("convert")}
            </button>

            {error && (
              <div className="mt-2 w-full rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/60 dark:text-red-200">
                <div className="font-medium">
                  {t("convertFailed")}（{t("convertStage")}: {error.stage}）
                </div>
                <div className="mt-1 whitespace-pre-wrap leading-snug">{error.message}</div>
              </div>
            )}
          </div>

          {/* 右侧输出区域 */}
          <div className="flex min-h-[260px] flex-1 flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("outputLabel")}</span>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {outputFormat.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={handleCopyOutput}
                  disabled={!outputText}
                  className="rounded-full border border-zinc-300 px-2 py-1 text-xs text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  {t("copy")}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadOutput}
                  disabled={!outputText}
                  className="rounded-full border border-zinc-300 px-2 py-1 text-xs text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  {t("download")}
                </button>
              </div>
            </div>

            <textarea
              className="min-h-[220px] flex-1 resize-none rounded-md border border-zinc-300 bg-zinc-50 p-2 text-sm font-mono text-zinc-900 shadow-inner outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder={t("placeholderOutput")}
              value={outputText}
              readOnly
            />
          </div>
        </section>

        {/* 底部说明区域 */}
        <footer className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          <p>{t("convertErrorHint")}</p>
        </footer>
      </main>
    </div>
  );
}
