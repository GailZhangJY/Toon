import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// 使用 next-intl 的插件包装 Next.js 配置
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // 优化现代浏览器的构建输出
  compiler: {
    // 移除 console.log 在生产环境
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // 启用 gzip 压缩
  compress: true,
  
  // 优化资源加载，减少关键请求链
  images: {
    formats: ["image/avif", "image/webp"], // 使用现代图片格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // 图片缓存时间（秒）
  },
  
  // 优化生产构建
  productionBrowserSourceMaps: false, // 禁用生产环境 source maps
  
  // 优化 CSS
  experimental: {
    optimizeCss: true, // 优化 CSS 加载
  },
};

export default withNextIntl(nextConfig);
