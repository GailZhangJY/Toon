# Toon Fast

> 🚀 专业的数据格式转换工具站 - 支持 JSON、CSV、TOON 等多种格式互转

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ 特性

### 🔄 数据格式转换
- **JSON ↔ TOON** - 高效的数据格式转换
- **CSV ↔ JSON** - 表格数据与 JSON 互转
- **TOON ↔ CSV** - TOON 格式与 CSV 互转
- **实时预览** - 即时查看转换结果
- **字符统计** - 显示转换前后的字符数和变化百分比

### 📝 专业博客系统
- **Markdown 渲染** - 使用 `react-markdown` 专业渲染
- **代码高亮** - 支持 100+ 编程语言语法高亮
- **目录导航** - 自动生成文章目录，滚动高亮
- **阅读时间** - 自动计算文章阅读时间
- **多语言支持** - 中英文博客内容

### 🌍 国际化
- **中英文切换** - 完整的国际化支持
- **动态路由** - 基于语言的动态路由
- **SEO 优化** - 多语言 SEO 元信息

### 📧 联系表单
- **邮件发送** - 支持多种 SMTP 服务商
- **表单验证** - 前端和后端双重验证
- **错误处理** - 详细的错误提示
- **支持邮箱** - Gmail、163、QQ、企业邮箱等

### 🎨 现代化设计
- **响应式布局** - 完美适配桌面和移动设备
- **深色模式** - 自动适配系统主题
- **流畅动画** - 优雅的交互动效
- **专业配色** - 精心设计的配色方案

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 或 pnpm

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/toon.git
cd toon

# 安装依赖
npm install
```

### 配置环境变量

复制环境变量模板：

```bash
cp env.template .env.local
```

编辑 `.env.local` 配置邮件服务：

```env
# SMTP 配置
SMTP_HOST=smtp.163.com
SMTP_PORT=465
SMTP_SECURE=true
EMAIL_USER=your@163.com
EMAIL_PASS=your_authorization_code
EMAIL_TO=your@163.com
```

详细配置请参考：
- [邮件配置指南](EMAIL_SETUP.md)
- [Gmail 配置](GMAIL_SETUP.md)
- [域名邮箱配置](DOMAIN_EMAIL_QUICK_START.md)

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
toon/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # 多语言路由
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── blog/          # 博客页面
│   │   │   ├── contact/       # 联系页面
│   │   │   └── about/         # 关于页面
│   │   ├── api/               # API 路由
│   │   │   └── contact/       # 邮件发送 API
│   │   └── globals.css        # 全局样式
│   ├── components/            # React 组件
│   │   ├── Header.tsx         # 导航栏
│   │   ├── Footer.tsx         # 页脚
│   │   ├── BlogPost.tsx       # 博客文章组件
│   │   └── ...
│   ├── lib/                   # 工具函数
│   │   ├── blog.ts           # 博客相关函数
│   │   └── converters/       # 格式转换器
│   └── i18n/                  # 国际化配置
│       └── messages/          # 翻译文件
├── content/                   # 内容目录
│   └── blog/                  # 博客文章
│       ├── zh/               # 中文文章
│       └── en/               # 英文文章
├── public/                    # 静态资源
└── docs/                      # 文档
```

## 🔧 核心功能

### 数据格式转换

支持以下转换：

| 转换类型 | 路由 | 说明 |
|---------|------|------|
| JSON → TOON | `/zh/json-to-toon` | JSON 转 TOON 格式 |
| TOON → JSON | `/zh/toon-to-json` | TOON 转 JSON 格式 |
| CSV → JSON | `/zh/csv-to-json` | CSV 转 JSON 格式 |
| JSON → CSV | `/zh/json-to-csv` | JSON 转 CSV 格式 |
| TOON → CSV | `/zh/toon-to-csv` | TOON 转 CSV 格式 |
| CSV → TOON | `/zh/csv-to-toon` | CSV 转 TOON 格式 |

### 博客系统

#### 创建博客文章

在 `content/blog/{locale}/` 目录下创建 Markdown 文件：

```markdown
---
title: 文章标题
description: 文章简介
date: 2025-11-19
author: 作者名
tags: [标签1, 标签2]
cover: /images/cover.jpg
---

# 文章内容

这里是文章正文...
```

#### Markdown 功能

- ✅ GitHub Flavored Markdown
- ✅ 代码语法高亮
- ✅ 表格支持
- ✅ 任务列表
- ✅ 自动链接
- ✅ 标题锚点
- ✅ 图片优化

### 邮件发送

支持的邮箱服务商：

- **Gmail** - 需要应用专用密码
- **163 邮箱** - 需要授权码
- **QQ 邮箱** - 需要授权码
- **腾讯企业邮箱** - 推荐用于生产环境
- **阿里云企业邮箱**
- **SendGrid** - 专业邮件服务

## 🛠️ 技术栈

### 前端框架
- **Next.js 16** - React 框架，支持 App Router
- **React 19** - 最新的 React 版本
- **TypeScript** - 类型安全

### 样式
- **Tailwind CSS 4** - 原子化 CSS 框架
- **@tailwindcss/typography** - 排版插件

### Markdown
- **react-markdown** - Markdown 渲染
- **remark-gfm** - GitHub Flavored Markdown
- **rehype-highlight** - 代码语法高亮
- **highlight.js** - 代码高亮样式

### 国际化
- **next-intl** - Next.js 国际化方案

### 邮件
- **nodemailer** - Node.js 邮件发送库

### 数据处理
- **@toon-format/toon** - TOON 格式处理
- **papaparse** - CSV 解析
- **gray-matter** - Front Matter 解析

## 📚 文档

详细文档请查看：

### 功能文档
- [博客系统使用指南](BLOG_SYSTEM.md)
- [数据转换功能](CONVERTERS.md)
- [国际化配置](I18N.md)

### 配置文档
- [邮件配置指南](EMAIL_SETUP.md)
- [Gmail 配置](GMAIL_SETUP.md)
- [域名邮箱配置](DOMAIN_EMAIL_QUICK_START.md)
- [代理问题解决](PROXY_ISSUE.md)

### 优化文档
- [博客样式优化](BLOG_STYLE_OPTIMIZATION.md)
- [Markdown 渲染优化](REACT_MARKDOWN.md)
- [性能优化](OPTIMIZATION.md)

### 故障排除
- [邮件发送故障排除](EMAIL_TROUBLESHOOTING.md)
- [常见问题](FAQ.md)

## 🎨 自定义

### 修改配色

编辑 `src/app/globals.css`：

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### 修改翻译

编辑 `src/i18n/messages/{locale}.json`：

```json
{
  "nav": {
    "convert": "转换",
    "blog": "博客",
    "contact": "联系",
    "about": "关于"
  }
}
```

### 添加转换器

在 `src/lib/converters/` 目录下创建新的转换器：

```typescript
export function customConverter(input: string): string {
  // 转换逻辑
  return output;
}
```

## 🚀 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/toon)

1. 点击上方按钮
2. 导入项目
3. 配置环境变量
4. 部署

### 其他平台

- **Netlify** - 支持 Next.js
- **Railway** - 支持 Node.js
- **自托管** - 使用 Docker

详细部署指南请参考 [DEPLOYMENT.md](DEPLOYMENT.md)

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown 渲染
- [highlight.js](https://highlightjs.org/) - 代码高亮
- [nodemailer](https://nodemailer.com/) - 邮件发送

## 📞 联系方式

- **网站**: [https://toon.fast](https://toon.fast)
- **邮箱**: contact@toon.fast
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

**Built with ❤️ using Next.js and TypeScript**
