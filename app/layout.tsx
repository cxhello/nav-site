import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Navigation - 精选人工智能工具导航站",
  description: "AI Navigation 为您提供精选人工智能工具导航，包括ChatGPT、Claude、Midjourney等AI聊天、绘画、编程工具，帮助您快速发现和使用最佳AI资源。",
  keywords: "AI Navigation, AI导航, 人工智能导航, AI工具集合, ChatGPT, Claude, Midjourney, AI绘画, AI编程",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID,
    'google-site-verification': process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  openGraph: {
    title: "AI Navigation - 精选人工智能工具导航站",
    description: "发现和使用最佳AI工具和资源的一站式导航平台，包括AI聊天、绘画、编程等多种实用工具。",
    url: "https://ai-navigation.top",
    siteName: "AI Navigation",
    images: [
      {
        url: "https://ai-navigation.top/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Navigation - 精选人工智能工具导航站"
      }
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Navigation - 精选人工智能工具导航站",
    description: "发现和使用最佳AI工具和资源的一站式导航平台，包括AI聊天、绘画、编程等多种实用工具。",
    images: ["https://ai-navigation.top/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
        
        {/* 结构化数据 - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Navigation",
              "url": "https://ai-navigation.top",
              "description": "精选人工智能工具导航站，帮助用户发现和使用最佳AI资源",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ai-navigation.top?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* 面包屑导航结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "首页",
                  "item": "https://ai-navigation.top"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "AI工具",
                  "item": "https://ai-navigation.top/#ai"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "设计工具",
                  "item": "https://ai-navigation.top/#design"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "云服务",
                  "item": "https://ai-navigation.top/#cloud"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "网站工具",
                  "item": "https://ai-navigation.top/#website"
                },
                {
                  "@type": "ListItem",
                  "position": 6,
                  "name": "关于",
                  "item": "https://ai-navigation.top/#about"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
