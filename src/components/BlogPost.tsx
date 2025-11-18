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

  // 动态加载代码高亮样式，避免阻塞首页渲染
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css";
    link.media = "print";
    link.onload = function() {
      (this as HTMLLinkElement).media = "all";
    };
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
    // 使用 IntersectionObserver 监听标题可见性，避免强制重排
    const headingElements = toc.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    
    if (headingElements.length === 0) return;

    const observerOptions = {
      rootMargin: "-100px 0px -66%",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
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
