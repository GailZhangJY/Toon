// CSV 相关转换工具函数
// 使用 papaparse 将 CSV 与 JS 对象数组互转

import Papa from "papaparse";

// 简单类型转换：尝试将字符串转换为 boolean / number
function coerceValue(value: unknown): unknown {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  // 纯数字（整数或小数）尝试转为 number
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    const num = Number(trimmed);
    if (!Number.isNaN(num)) return num;
  }

  return value;
}

// 反展平：将形如 { "a.b": 1, "a.c": 2 } 还原为 { a: { b: 1, c: 2 } }
function unflattenRow(row: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [flatKey, rawValue] of Object.entries(row)) {
    const value = coerceValue(rawValue);

    if (!flatKey.includes(".")) {
      result[flatKey] = value;
      continue;
    }

    const parts = flatKey.split(".");
    let current: Record<string, unknown> = result;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      if (isLast) {
        current[part] = value;
      } else {
        if (
          current[part] == null ||
          typeof current[part] !== "object" ||
          Array.isArray(current[part])
        ) {
          current[part] = {};
        }
        current = current[part] as Record<string, unknown>;
      }
    });
  }

  return result;
}

// 将 CSV 文本解析为对象数组
export function parseCsv(text: string): any[] {
  // 使用 header: true 让 papaparse 自动读取首行为字段名
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  }) as any;

  if (result.errors && result.errors.length > 0) {
    // 只抛出第一条错误信息，供上层捕获
    throw new Error(result.errors[0].message || "CSV 解析失败");
  }

  // 对每一行做反展平和类型转换
  return (result.data as any[]).map((row) => unflattenRow(row as any));
}

// 工具函数：将嵌套对象展平成一层键，使用点号连接
// 例如：{ employee: { name: "John" } } => { "employee.name": "John" }
function flattenObject(input: any, parentKey = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (input == null || typeof input !== "object") {
    return result;
  }

  for (const [key, value] of Object.entries(input)) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (value != null && typeof value === "object" && !Array.isArray(value)) {
      // 嵌套对象：递归展开
      Object.assign(result, flattenObject(value, fullKey));
    } else {
      // 基本类型或数组：直接作为值
      result[fullKey] = value as unknown;
    }
  }

  return result;
}

// 将数据格式化为 CSV 文本（宽松模式）
// - 如果根是数组：要求数组元素为对象
// - 如果根是单个对象：自动视为仅包含一行的数组
// - 其他类型（如字符串、数字等）视为不合法
export function formatCsv(data: any): string {
  // 根为 null/undefined 直接返回空
  if (data == null) {
    return "";
  }

  let rows: any[];

  if (Array.isArray(data)) {
    rows = data;
  } else if (typeof data === "object") {
    // 单个对象：自动包一层数组，视为一行记录
    rows = [data];
  } else {
    throw new Error(
      "导出为 CSV 时，根数据必须是对象或对象数组，例如 { ... } 或 [{...}, {...}]",
    );
  }

  // 如果数组为空，返回空字符串
  if (rows.length === 0) {
    return "";
  }

  // 确保每一项都是对象，并在导出前展平嵌套对象
  const flattenedRows = rows.map((row) => {
    if (row === null || typeof row !== "object") {
      throw new Error("导出为 CSV 时，数组元素必须是对象");
    }

    // 将嵌套对象展开为扁平键
    return flattenObject(row);
  });

  return Papa.unparse(flattenedRows);
}
