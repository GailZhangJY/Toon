import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from "@/components/BlogPost";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const zhSlugs = getAllPostSlugs("zh").map((slug) => ({ locale: "zh", slug }));
  const enSlugs = getAllPostSlugs("en").map((slug) => ({ locale: "en", slug }));
  return [...zhSlugs, ...enSlugs];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const post = await getPostBySlug(slug, locale);

  if (!post || !post.content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 返回按钮 */}
        <Link
          href={`/${locale}/blog`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("backToBlog")}
        </Link>

        {/* 文章头部 */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.author && (
              <>
                <span>•</span>
                <span>{post.author}</span>
              </>
            )}
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容和目录 */}
        <BlogPost content={post.content} title={post.title} />
      </main>

      <Footer />
    </div>
  );
}
