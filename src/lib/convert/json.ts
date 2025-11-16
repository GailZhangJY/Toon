// JSON 相关转换工具函数

// 将 JSON 文本解析为 JS 数据结构
export function parseJson(text: string): any {
  // 调用 JSON.parse，如果语法错误会抛出异常
  return JSON.parse(text);
}

// 将 JS 数据结构格式化为 JSON 文本
export function formatJson(data: any): string {
  // 使用 2 个空格缩进，便于人类阅读
  return JSON.stringify(data, null, 2);
}
