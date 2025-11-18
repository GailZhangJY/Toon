"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { ConvertError, Format } from "@/lib/convert";
import { convertText } from "@/lib/convert";

interface ConverterProps {
  defaultInputFormat?: Format;
  defaultOutputFormat?: Format;
}

export default function Converter({
  defaultInputFormat = "toon",
  defaultOutputFormat = "json",
}: ConverterProps) {
  const t = useTranslations();

  // 输入/输出格式
  const [inputFormat, setInputFormat] = useState<Format>(defaultInputFormat);
  const [outputFormat, setOutputFormat] = useState<Format>(defaultOutputFormat);

  // 文本内容
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  // 转换状态与错误信息
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<ConvertError | null>(null);

  // 当默认格式变化时更新
  useEffect(() => {
    setInputFormat(defaultInputFormat);
    setOutputFormat(defaultOutputFormat);
  }, [defaultInputFormat, defaultOutputFormat]);

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

  // 交换输入/输出格式
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

  // 点击"转换"按钮
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

  // 自动转换
  useEffect(() => {
    if (!inputText.trim()) return;
    if (isConverting) return;
    void handleConvert();
  }, [inputFormat, outputFormat, inputText, isConverting, handleConvert]);

  // 复制输出内容
  const handleCopyOutput = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
    } catch {
      // 忽略复制失败
    }
  }, [outputText]);

  // 下载输出内容
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

  // 文件选择
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

  return (
    <div className="space-y-6">
      {/* 格式选择与交换 */}
      <section className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <label htmlFor="input-format-selector" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {t("inputFormat")}
          </label>
          <div className="relative">
            <select
              id="input-format-selector"
              className="appearance-none rounded-lg border border-zinc-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-blue-400 hover:shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-500"
              value={inputFormat}
              onChange={handleInputFormatChange}
            >
              <option value="toon">Toon</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSwapFormat}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {t("swap")} ⇄
        </button>

        <div className="flex items-center gap-2">
          <label htmlFor="output-format-selector" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {t("outputFormat")}
          </label>
          <div className="relative">
            <select
              id="output-format-selector"
              className="appearance-none rounded-lg border border-zinc-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-blue-400 hover:shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-500"
              value={outputFormat}
              onChange={handleOutputFormatChange}
            >
              <option value="toon">Toon</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 主体转换区域 */}
      <section className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:flex-row">
        {/* 左侧输入区域 */}
        <div className="flex min-h-[600px] flex-1 flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {t("inputLabel")}
            </span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {inputFormat.toUpperCase()}
            </span>
          </div>

          <textarea
            className="min-h-[550px] flex-1 resize-none rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm font-mono text-zinc-900 shadow-inner outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            placeholder={t("placeholderInput")}
            value={inputText}
            onChange={handleInputChange}
          />

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span>{t("importFromFile")}</span>
              <label className="inline-flex cursor-pointer items-center">
                <span className="rounded-lg border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  {t("chooseFileButton")}
                </span>
                <input
                  type="file"
                  accept=".toon,.json,.csv,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="max-w-[180px] truncate" title={fileName || t("noFileSelected")}>
                {fileName || t("noFileSelected")}
              </span>
            </div>
            <span>
              {t("chars")}: {inputText.length}
            </span>
          </div>
        </div>

        {/* 中间操作区 */}
        <div className="flex w-full flex-none flex-col items-center justify-center gap-3 py-2 md:w-32">
          <button
            type="button"
            onClick={handleConvert}
            disabled={isConverting || !inputText.trim()}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg disabled:cursor-not-allowed disabled:from-zinc-400 disabled:to-zinc-400"
          >
            {isConverting ? t("converting") : t("convert")}
          </button>

          {error && (
            <div className="w-full rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/60 dark:text-red-200">
              <div className="font-semibold">
                {t("convertFailed")}（{error.stage}）
              </div>
              <div className="mt-1 whitespace-pre-wrap leading-snug">{error.message}</div>
            </div>
          )}
        </div>

        {/* 右侧输出区域 */}
        <div className="flex min-h-[600px] flex-1 flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {t("outputLabel")}
            </span>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {outputFormat.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={handleCopyOutput}
                disabled={!outputText}
                className="rounded-lg border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {t("copy")}
              </button>
              <button
                type="button"
                onClick={handleDownloadOutput}
                disabled={!outputText}
                className="rounded-lg border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {t("download")}
              </button>
            </div>
          </div>

          <textarea
            className="min-h-[550px] flex-1 resize-none rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm font-mono text-zinc-900 shadow-inner outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            placeholder={t("placeholderOutput")}
            value={outputText}
            readOnly
          />

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">
              {t("chars")}: {outputText.length}
            </span>
            {inputText.length > 0 && outputText.length > 0 && (
              <div className="flex items-center gap-2">
                {(() => {
                  const diff = outputText.length - inputText.length;
                  const percentage = inputText.length > 0 ? ((diff / inputText.length) * 100).toFixed(1) : '0';
                  const isReduced = diff < 0;
                  const colorClass = isReduced 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400';
                  const sign = diff > 0 ? '+' : '';
                  
                  return (
                    <span className={`font-medium ${colorClass}`}>
                      {sign}{diff} ({sign}{percentage}%)
                    </span>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 底部提示 */}
      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        <p>{t("convertErrorHint")}</p>
      </div>
    </div>
  );
}
