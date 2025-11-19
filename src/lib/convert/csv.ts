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

// 检测所有列名的公共前缀
function findCommonPrefix(keys: string[]): string {
  if (keys.length === 0) return "";
  
  // 按点号分割所有键
  const parts = keys.map(k => k.split("."));
  
  // 找到最短的路径长度
  const minLength = Math.min(...parts.map(p => p.length));
  
  // 逐级检查公共前缀
  let commonPrefix: string[] = [];
  for (let i = 0; i < minLength - 1; i++) {
    const part = parts[0][i];
    if (parts.every(p => p[i] === part)) {
      commonPrefix.push(part);
    } else {
      break;
    }
  }
  
  return commonPrefix.join(".");
}

// 将 CSV 文本解析为对象数组
export function parseCsv(text: string): any {
  // 使用 header: true 让 papaparse 自动读取首行为字段名
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  }) as any;

  if (result.errors && result.errors.length > 0) {
    // 只抛出第一条错误信息，供上层捕获
    throw new Error(result.errors[0].message || "CSV 解析失败");
  }

  const rows = result.data as any[];
  if (rows.length === 0) return [];
  
  // 获取所有列名
  const keys = Object.keys(rows[0]);
  
  // 检测公共前缀
  const commonPrefix = findCommonPrefix(keys);
  
  if (commonPrefix) {
    // 有公共前缀，说明这是从嵌套结构导出的
    // 移除公共前缀，还原为数组结构
    const prefixLength = commonPrefix.length + 1; // +1 for the dot
    
    const cleanedRows = rows.map((row) => {
      const cleaned: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(row)) {
        // 移除公共前缀
        const cleanKey = key.substring(prefixLength);
        cleaned[cleanKey] = value;
      }
      return unflattenRow(cleaned);
    });
    
    // 构建嵌套结构
    const parts = commonPrefix.split(".");
    let result: any = cleanedRows;
    
    // 从最内层向外层包装
    for (let i = parts.length - 1; i >= 0; i--) {
      result = { [parts[i]]: result };
    }
    
    return result;
  }
  
  // 没有公共前缀，正常处理
  return rows.map((row) => unflattenRow(row as any));
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

// 提取嵌套数组中的对象，展开为多行，并保留路径信息
function extractArrayRows(data: any, parentKey = ""): { rows: any[], prefix: string } {
  // 如果是数组，检查是否包含对象
  if (Array.isArray(data)) {
    // 如果数组元素是对象，返回这些对象
    if (data.length > 0 && typeof data[0] === "object" && !Array.isArray(data[0])) {
      return { rows: data, prefix: parentKey };
    }
  }
  
  // 如果是对象，查找第一个数组属性
  if (data != null && typeof data === "object" && !Array.isArray(data)) {
    for (const [key, value] of Object.entries(data)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      
      if (Array.isArray(value) && value.length > 0) {
        // 找到数组，检查是否包含对象
        if (typeof value[0] === "object" && !Array.isArray(value[0])) {
          return { rows: value, prefix: fullKey };
        }
      } else if (typeof value === "object" && value !== null) {
        // 递归查找嵌套对象中的数组
        const nested = extractArrayRows(value, fullKey);
        if (nested.rows.length > 0 && nested.prefix) {
          return nested;
        }
      }
    }
  }
  
  // 如果没有找到数组，返回原数据作为单行
  return { rows: [data], prefix: "" };
}

// 将数据格式化为 CSV 文本（宽松模式）
// - 如果根是数组：要求数组元素为对象
// - 如果根是单个对象：自动查找嵌套数组并展开
// - 其他类型（如字符串、数字等）视为不合法
export function formatCsv(data: any): string {
  // 根为 null/undefined 直接返回空
  if (data == null) {
    return "";
  }

  let rows: any[];
  let pathPrefix = "";

  if (Array.isArray(data)) {
    rows = data;
  } else if (typeof data === "object") {
    // 尝试提取嵌套数组中的对象
    const result = extractArrayRows(data);
    rows = result.rows;
    pathPrefix = result.prefix;
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
    const flattened = flattenObject(row);
    
    // 如果有路径前缀，添加到每个键前面
    if (pathPrefix) {
      const prefixed: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(flattened)) {
        prefixed[`${pathPrefix}.${key}`] = value;
      }
      return prefixed;
    }
    
    return flattened;
  });

  return Papa.unparse(flattenedRows);
}
