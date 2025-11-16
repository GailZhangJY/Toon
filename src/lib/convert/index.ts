// Toon / JSON / CSV 统一转换入口
// 所有转换先解析为 JS 数据结构，再格式化为目标文本

import { parseToon, formatToon } from "./toon";
import { parseJson, formatJson } from "./json";
import { parseCsv, formatCsv } from "./csv";

export type Format = "toon" | "json" | "csv";

export type ConvertErrorStage = "parse" | "validate" | "format";

// 转换错误类型，包含阶段和原始错误信息
export interface ConvertError extends Error {
  stage: ConvertErrorStage;
  detail?: unknown;
}

// 简单检测：猜测文本更像哪种格式，用于给出更友好的错误提示
function guessFormatFromText(text: string): Format | null {
  const trimmed = text.trim();

  if (!trimmed) return null;

  // 粗略判断 JSON：以 { 或 [ 开头
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return "json";
  }

  // 粗略判断 CSV：首行包含逗号，且包含换行
  const firstLineEnd = trimmed.indexOf("\n");
  const firstLine =
    firstLineEnd === -1 ? trimmed : trimmed.slice(0, firstLineEnd).trim();
  if (firstLine.includes(",")) {
    return "csv";
  }

  // 其他情况暂时认为更像 Toon
  return "toon";
}

// 工具函数：创建带 stage 的错误对象
function createConvertError(
  stage: ConvertErrorStage,
  message: string,
  detail?: unknown,
): ConvertError {
  const error = new Error(message) as ConvertError;
  error.stage = stage;
  error.detail = detail;
  return error;
}

// 统一的文本转换函数
export async function convertText(
  input: string,
  from: Format,
  to: Format,
): Promise<string> {
  let data: any;

  try {
    // 第一步：按照输入格式解析为 JS 数据结构
    switch (from) {
      case "toon":
        data = parseToon(input);
        break;
      case "json":
        data = parseJson(input);
        break;
      case "csv":
        data = parseCsv(input);
        break;
      default:
        throw createConvertError("parse", `不支持的输入格式: ${from}`);
    }

    // 规则：单行 CSV → 单对象
    // 如果输入是 CSV，且解析结果是仅包含一条记录的数组，则自动拆成单对象
    if (from === "csv" && Array.isArray(data) && data.length === 1) {
      data = data[0];
    }
  } catch (err) {
    // 将所有解析阶段错误包装为 ConvertError
    if ((err as any)?.stage) {
      throw err;
    }

    // 尝试根据文本内容猜测实际格式，给出更友好的提示
    const guessed = guessFormatFromText(input);
    let hint = "解析输入内容失败，请检查格式是否正确";
    if (guessed && guessed !== from) {
      const fromLabel =
        from === "toon" ? "Toon" : from === "json" ? "JSON" : "CSV";
      const guessedLabel =
        guessed === "toon" ? "Toon" : guessed === "json" ? "JSON" : "CSV";
      hint = `解析输入内容失败，当前选择的输入格式为 ${fromLabel}，但内容看起来更像 ${guessedLabel}，请确认输入格式选择是否正确。`;
    }

    throw createConvertError("parse", hint, err);
  }

  try {
    // 第二步：将 JS 数据结构格式化为目标格式文本
    switch (to) {
      case "toon":
        return formatToon(data);
      case "json":
        return formatJson(data);
      case "csv": {
        // 宽松模式：允许根为对象或对象数组，具体检查逻辑在 formatCsv 中完成
        return formatCsv(data);
      }
      default:
        throw createConvertError("format", `不支持的输出格式: ${to}`);
    }
  } catch (err) {
    if ((err as any)?.stage) {
      // 已经是带 stage 的错误，直接抛出
      throw err;
    }
    throw createConvertError(
      "format",
      "格式化输出内容失败，请检查数据结构是否符合要求",
      err,
    );
  }
}
