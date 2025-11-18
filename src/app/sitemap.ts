import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/locales";

const BASE_URL = "https://toon.fast";

// 数据转换页面
const converterPages = [
  "toon-to-json",
  "toon-to-csv",
  "json-to-toon",
  "json-to-csv",
  "csv-to-toon",
  "csv-to-json",
] as const;

// 静态页面
const staticPages = [
  { path: "blog", priority: 0.9 },
  { path: "about", priority: 0.8 },
  { path: "contact", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [];

  // 1. 首页（每个语言）
  for (const locale of locales) {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    });
  }

  // 2. 数据转换页面
  for (const locale of locales) {
    for (const converter of converterPages) {
      routes.push({
        url: `${BASE_URL}/${locale}/${converter}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  // 3. 静态页面（博客、关于、联系）
  for (const locale of locales) {
    for (const page of staticPages) {
      routes.push({
        url: `${BASE_URL}/${locale}/${page.path}`,
        lastModified: now,
        changeFrequency: page.path === "blog" ? "daily" : "monthly",
        priority: page.priority,
      });
    }
  }

  // 4. 博客文章页面
  for (const locale of locales) {
    try {
      const posts = getAllPosts(locale);
      for (const post of posts) {
        routes.push({
          url: `${BASE_URL}/${locale}/blog/${post.slug}`,
          lastModified: post.date || now,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    } catch (error) {
      console.error(`Error loading blog posts for locale ${locale}:`, error);
    }
  }

  return routes;
}
