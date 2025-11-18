"use client";

import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface BlogPostProps {
  content: string;
  title: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogPost({ content, title }: BlogPostProps) {
  const [activeId, setActiveId] = useState<string>("");

  // 从 Markdown 内容生成目录
  const toc = useMemo(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const tocItems: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
        .replace(/^-+|-+$/g, "");

      tocItems.push({ id, text, level });
    }

    return tocItems;
  }, [content]);

  useEffect(() => {
    // 监听滚动，高亮当前标题
    const handleScroll = () => {
      const headings = toc.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
      {/* 文章内容 */}
      <article className="blog-content prose prose-zinc max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
            rehypeHighlight,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ]}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* 目录 */}
      {toc.length > 0 && (
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              目录
            </h3>
            <nav className="space-y-2">
              {toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left text-sm transition-colors ${
                    activeId === item.id
                      ? "font-medium text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                  style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
