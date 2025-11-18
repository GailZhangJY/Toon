import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// 博客文章目录
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// 博客文章元数据接口
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  cover?: string;
  readingTime: string;
  content?: string;
}

// 获取所有博客文章列表
export function getAllPosts(locale: string = "zh"): BlogPost[] {
  const localeDir = path.join(BLOG_DIR, locale);

  // 如果目录不存在，返回空数组
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(localeDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        author: data.author,
        tags: data.tags || [],
        cover: data.cover,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // 按日期降序排列

  return posts;
}

// 获取单篇博客文章
export async function getPostBySlug(
  slug: string,
  locale: string = "zh"
): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(BLOG_DIR, locale, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // 直接返回原始 Markdown 内容，由 react-markdown 在客户端渲染
    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author,
      tags: data.tags || [],
      cover: data.cover,
      readingTime: readingTime(content).text,
      content: content, // 返回原始 Markdown
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// 获取所有文章的 slug（用于生成静态路径）
export function getAllPostSlugs(locale: string = "zh"): string[] {
  const localeDir = path.join(BLOG_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// 生成文章目录（TOC）
export function generateTOC(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
      .replace(/^-+|-+$/g, "");

    toc.push({ id, text, level });
  }

  return toc;
}
