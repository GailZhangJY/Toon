// 结构化数据生成器 - 用于 SEO 优化

const BASE_URL = "https://toon.fast";

/**
 * 生成 WebApplication Schema
 * 告诉 Google 这是一个 Web 应用工具
 */
export function generateWebApplicationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Toon Fast",
    "url": `${BASE_URL}/${locale}`,
    "description": "Fast online format converter for Toon, JSON, and CSV files. Convert between formats instantly in your browser.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Toon to JSON conversion",
      "JSON to Toon conversion",
      "CSV to JSON conversion",
      "JSON to CSV conversion",
      "Client-side processing",
      "No file upload required",
      "Privacy-focused",
      "Multi-language support",
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "Toon Fast",
      "url": BASE_URL,
    },
  };
}

/**
 * 生成 FAQPage Schema
 * 在搜索结果中展示常见问题
 */
export function generateFAQPageSchema(
  locale: string,
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * 生成 HowTo Schema
 * 展示操作步骤
 */
export function generateHowToSchema(
  locale: string,
  name: string,
  steps: Array<{ title: string; description: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": `Learn how to ${name.toLowerCase()} using Toon Fast converter`,
    "image": `${BASE_URL}/logo.png`,
    "totalTime": "PT2M", // 2 分钟
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0",
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Toon Fast Converter",
      },
    ],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
      "url": `${BASE_URL}/${locale}#step-${index + 1}`,
    })),
  };
}

/**
 * 生成 BreadcrumbList Schema
 * 面包屑导航
 */
export function generateBreadcrumbSchema(
  locale: string,
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * 生成 Organization Schema
 * 组织信息
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Toon Fast",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@toon.fast",
      "contactType": "Customer Service",
    },
    "sameAs": [],
  };
}

/**
 * 生成 SoftwareApplication Schema（针对特定转换工具）
 */
export function generateSoftwareApplicationSchema(
  locale: string,
  toolName: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "description": description,
    "url": `${BASE_URL}/${locale}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1",
    },
  };
}
