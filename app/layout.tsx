import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from '@/app/components/header'
import { Footer } from '@/app/components/footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrowthKit - Track BMI, Weight, and Height Effectively",
  description: "Track height, weight, and BMI with beautiful charts and insights. Multiple profiles, dark mode, and support for both metric & imperial measurements. The perfect companion for monitoring your family's growth journey.",
  icons: {
    icon: [
      {
        url: '/GrowthKit-FavIcon.png',
        href: '/GrowthKit-FavIcon.png',
      }
    ],
    apple: [
      {
        url: '/GrowthKit-FavIcon.png',
        href: '/GrowthKit-FavIcon.png',
      }
    ],
  },
  keywords: [
    "growth tracking",
    "height tracking",
    "weight tracking",
    "BMI calculator",
    "growth charts",
    "family health",
    "growth velocity",
    "health monitoring",
    "measurement tracking",
    "growth analytics"
  ],
  authors: [{ name: "GrowthKit Team" }],
  openGraph: {
    title: "GrowthKit - Smart Growth Tracking for Everyone",
    description: "Beautiful analytics and insights for tracking height, weight, and BMI. Perfect for the whole family.",
    type: "website",
    locale: "en_US",
    siteName: "GrowthKit",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthKit - Smart Growth Tracking for Everyone",
    description: "Beautiful analytics and insights for tracking height, weight, and BMI. Perfect for the whole family.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Remove preload links since Next.js handles image optimization */}
        {/* Next.js Image component will handle loading priorities */}
      </head>
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
