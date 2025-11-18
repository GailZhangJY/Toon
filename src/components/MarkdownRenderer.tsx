"use client";

import { useEffect, useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>("");
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // 简单的 Markdown 解析器（基础功能）
    const parseMarkdown = (md: string): { html: string; headings: Heading[] } => {
      const headings: Heading[] = [];
      let result = md;

      // 标题
      result = result.replace(/^### (.*$)/gim, (match, p1) => {
        const id = p1.toLowerCase().replace(/\s+/g, "-");
        headings.push({ id, text: p1, level: 3 });
        return `<h3 id="${id}" class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 mt-6">${p1}</h3>`;
      });
      result = result.replace(/^## (.*$)/gim, (match, p1) => {
        const id = p1.toLowerCase().replace(/\s+/g, "-");
        headings.push({ id, text: p1, level: 2 });
        return `<h2 id="${id}" class="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 mt-8">${p1}</h2>`;
      });
      result = result.replace(/^# (.*$)/gim, (match, p1) => {
        const id = p1.toLowerCase().replace(/\s+/g, "-");
        headings.push({ id, text: p1, level: 1 });
        return `<h1 id="${id}" class="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 mt-8">${p1}</h1>`;
      });

      // 粗体
      result = result.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-zinc-900 dark:text-zinc-50">$1</strong>');
      
      // 斜体
      result = result.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
      
      // 代码块
      result = result.replace(/```(.*?)\n([\s\S]*?)```/gim, '<pre class="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-zinc-800 dark:text-zinc-200">$2</code></pre>');
      
      // 行内代码
      result = result.replace(/`([^`]+)`/gim, '<code class="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200">$1</code>');
      
      // 链接
      result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // 无序列表
      result = result.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc text-zinc-700 dark:text-zinc-300">$1</li>');
      result = result.replace(/(<li[\s\S]*<\/li>)/gim, '<ul class="my-4 space-y-2">$1</ul>');
      
      // 段落
      result = result.replace(/^(?!<[h|u|p|l])(.*$)/gim, '<p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">$1</p>');

      return { html: result, headings };
    };

    const { html: parsedHtml, headings: parsedHeadings } = parseMarkdown(content);
    setHtml(parsedHtml);
    setHeadings(parsedHeadings);
  }, [content]);

  return (
    <div className="flex gap-8">
      {/* 主要内容区域 */}
      <div
        className="prose prose-zinc dark:prose-invert max-w-none flex-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* 右侧目录 */}
      {headings.length > 0 && (
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-24">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              目录
            </h3>
            <nav className="space-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="block text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
