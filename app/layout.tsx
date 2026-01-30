import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://eindev.ir"),
  title: {
    default: "CodingSphere",
    template: "%s | CodingSphere",
  },
  description:
    "A digital workshop where code meets curiosity. Experiments, prototypes, and open-source artifacts by Ehsan Ghaffar.",
  keywords: [
    "Software Engineering",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "Machine Learning",
    "Systems Programming",
    "Code Experiments",
  ],
  authors: [{ name: "Ehsan Ghaffar", url: "https://github.com/ehsanghaffar" }],
  creator: "Ehsan Ghaffar",
  publisher: "Ehsan Ghaffar",
  generator: "v0.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "CodingSphere — Ehsan Ghaffar's Digital Laboratory",
    description:
      "A digital workshop where code meets curiosity. Experiments, prototypes, and open-source artifacts by Ehsan Ghaffar.",
    siteName: "CodingSphere",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodingSphere — Ehsan Ghaffar's Digital Laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodingSphere — Ehsan Ghaffar's Digital Laboratory",
    description: "A digital workshop where code meets curiosity. Experiments, prototypes, and open-source artifacts.",
    creator: "@ehsanghaffar",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // icons 配置已移除，Next.js 会自动使用 app/icon.png
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} storageKey="theme-mode">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
