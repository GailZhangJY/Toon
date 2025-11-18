import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { generateAlternates } from "@/lib/metadata";
import { getMessages } from "@/i18n/getMessages";
import type { Locale } from "@/i18n/locales";

interface BlogListPageProps {
  params: Promise<{ locale: string }>;
}

// 生成博客列表页面的 SEO 元信息
export async function generateMetadata({
  params,
}: BlogListPageProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale as Locale) as any;

  return {
    title: messages.blogTitle || "Blog",
    description: messages.blogSubtitle || "Insights, tutorials, and updates about data format conversion",
    alternates: generateAlternates(locale, "blog"),
  };
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  const posts = getAllPosts(locale);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t("blogTitle") || "Blog"}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {t("blogSubtitle") || "Insights, tutorials, and updates about data format conversion"}
          </p>
        </div>

        {/* 博客文章列表 */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="block"
              >
                <article className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-700">
                  {/* 文章标题 */}
                  <h2 className="mb-2 text-2xl font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                    {post.title}
                  </h2>

                  {/* 文章元信息 */}
                  <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                    {post.author && (
                      <>
                        <span>•</span>
                        <span>{post.author}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* 文章简介 */}
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>

                  {/* 阅读更多提示 */}
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                    <span>{t("readMore")}</span>
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-zinc-500 dark:text-zinc-400">
              {locale === "zh" ? "暂无文章" : "No posts yet"}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
