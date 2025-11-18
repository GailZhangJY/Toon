import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // 使用 font-display: swap 避免阻塞渲染
  preload: true, // 预加载字体
  adjustFontFallback: true, // 自动调整回退字体，减少布局偏移
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Toon Converter",
  description: "Toon / JSON / CSV converter",
  other: {
    "google-site-verification": "hhI2SHvPmrPxQTVf4AlE2xK7YzBJbVimlvE8UXchZRo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 内联关键 CSS，避免阻塞渲染 */}
        <style dangerouslySetInnerHTML={{__html: `
          :root{--background:#ffffff;--foreground:#171717}
          @media(prefers-color-scheme:dark){:root{--background:#0a0a0a;--foreground:#ededed}}
          body{background:var(--background);color:var(--foreground);margin:0;padding:0}
          *{box-sizing:border-box}
        `}} />
        
        {/* DNS 预连接，加速外部资源加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
