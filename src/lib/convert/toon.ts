// Toon 相关转换工具函数
// 使用官方 Toon 库，将 Toon 文本和 JS 对象互转

// 根据官方包的导出，使用 encode / decode 来完成 JSON ↔ TOON 的转换
import { decode, encode } from "@toon-format/toon";

// 将 Toon 文本解析为 JS 数据结构（对象 / 数组等）
export function parseToon(text: string): any {
  // 调用官方 decode，将 Toon 文本还原为 JS 对象
  return decode(text);
}

// 将 JS 数据结构格式化为 Toon 文本
export function formatToon(data: any): string {
  // 调用官方 encode，将 JS 对象编码为 Toon 文本
  return encode(data);
}
