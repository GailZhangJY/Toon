import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "./Footer";
import Converter from "./Converter";
import type { Format } from "@/lib/convert";

// 骨架屏组件，避免布局偏移
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4 py-12">
    <div className="mx-auto h-8 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="mx-auto h-4 w-96 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      ))}
    </div>
  </div>
);

// 延迟加载非关键组件，减少初始 JavaScript 包大小
const HowToConvert = dynamic(() => import("./HowToConvert"), {
  loading: () => <SkeletonLoader />,
  ssr: false, // 禁用服务端渲染，避免水合不匹配
});

const Features = dynamic(() => import("./Features"), {
  loading: () => <SkeletonLoader />,
  ssr: false,
});

const FAQ = dynamic(() => import("./FAQ"), {
  loading: () => <SkeletonLoader />,
  ssr: false,
});

interface ConvertPageLayoutProps {
  inputFormat: Format;
  outputFormat: Format;
  pageTitle?: string;
  pageDescription?: string;
  howToSteps?: Array<{
    number: number;
    title: string;
    description: string;
    icon: string;
  }>;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ConvertPageLayout({
  inputFormat,
  outputFormat,
  pageTitle,
  pageDescription,
  howToSteps,
  features,
  faqs,
}: ConvertPageLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* 顶部导航栏 */}
      <Header />

      {/* 主要内容区域 */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        {pageTitle && (
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {pageTitle}
            </h1>
            {pageDescription && (
              <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
                {pageDescription}
              </p>
            )}
          </div>
        )}

        {/* 转换器区域 */}
        <Converter defaultInputFormat={inputFormat} defaultOutputFormat={outputFormat} />
      </main>

      {/* How to Convert 步骤区域 */}
      <HowToConvert steps={howToSteps} />

      {/* Features 特性区域 */}
      <Features features={features} />

      {/* FAQ 常见问题区域 */}
      <FAQ faqs={faqs} />

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
