import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// 使用 next-intl 的插件包装 Next.js 配置
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
