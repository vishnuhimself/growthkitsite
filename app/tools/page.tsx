import { Metadata } from 'next'
import Link from 'next/link'
import { AppleLogo } from '@/app/components/ui/apple-logo'
import {
  BarChart2,
  Ruler,
  Scale,
  TrendingUp,
  Target,
  Baby,
  Dumbbell,
} from 'lucide-react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: 'Free Health & Growth Calculators for Parents and Families',
  description:
    'Free, accurate health calculators for parents and families. Calculate child growth percentiles, predict adult height, check BMI, track growth velocity, and more. All based on WHO and CDC standards.',
  keywords: [
    'free health calculators for parents',
    'child growth calculators',
    'BMI calculator',
    'height percentile calculator',
    'growth chart tools',
    'family health tools',
    'pediatric calculators',
    'free online health tools',
    'weight and height calculators',
    'child development calculators',
  ],
  alternates: { canonical: `${BASE_URL}/tools` },
  openGraph: {
    title: 'Free Health & Growth Calculators for Parents and Families | GrowthKit',
    description: '7 free, accurate health calculators powered by WHO and CDC data. For parents, families, and anyone tracking health goals.',
    url: `${BASE_URL}/tools`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Health & Growth Calculators | GrowthKit',
    description: '7 free calculators: growth percentiles, height prediction, BMI, velocity, and more.',
  },
}

const TOOLS = [
  {
    href: '/tools/child-growth-percentile',
    Icon: BarChart2,
    title: 'Child Growth Percentile Calculator',
    description: 'See where your child\'s height, weight, and BMI fall on the official WHO and CDC growth charts. Instant, private, free.',
    tags: ['Ages 0–20', 'WHO & CDC'],
  },
  {
    href: '/tools/child-height-predictor',
    Icon: Ruler,
    title: 'Child Height Predictor',
    description: "Estimate your child's adult height based on both parents' heights using the mid-parental height method.",
    tags: ['Genetics-based'],
  },
  {
    href: '/tools/bmi-calculator',
    Icon: Scale,
    title: 'BMI Calculator',
    description: 'Calculate BMI for children with age-specific CDC percentile, or for adults with standard weight categories.',
    tags: ['Kids & Adults', 'CDC'],
  },
  {
    href: '/tools/growth-velocity',
    Icon: TrendingUp,
    title: 'Child Growth Velocity Calculator',
    description: 'Enter two height measurements to calculate how fast your child is growing and compare to WHO age norms.',
    tags: ['WHO Norms'],
  },
  {
    href: '/tools/ideal-weight-child',
    Icon: Target,
    title: 'Healthy Weight for Children',
    description: 'Find the healthy weight range for your child by age, sex, and height using CDC BMI-for-age standards.',
    tags: ['Ages 2–20', 'CDC'],
  },
  {
    href: '/tools/premature-baby-corrected-age',
    Icon: Baby,
    title: 'Premature Baby Corrected Age',
    description: "Calculate your preemie's adjusted age for accurately tracking developmental milestones and growth.",
    tags: ['Preemie'],
  },
  {
    href: '/tools/weight-loss-calculator',
    Icon: Dumbbell,
    title: 'Weight Loss Timeline Calculator',
    description: 'Get a realistic timeline for your goal weight. Calculates BMR, TDEE, daily calorie deficit, and projected date.',
    tags: ['For Adults'],
  },
]

export default function ToolsPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
    ],
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Health Calculators by GrowthKit',
    description: 'A collection of free, accurate health calculators for parents and families.',
    itemListElement: TOOLS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: `${BASE_URL}${t.href}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <div className="bg-white min-h-screen">
        <div className="container mx-auto max-w-5xl px-6 pt-28 pb-20">

          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-600">Tools</span>
          </nav>

          {/* Header */}
          <div className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5 leading-tight">
              Free Health & Growth<br />Calculators
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
              Accurate, free calculators for parents and families — powered by official WHO and CDC data. No sign-up. No data collection. Everything runs in your browser.
            </p>
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white p-7 hover:bg-gray-50 transition-colors flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <tool.Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-gray-300 group-hover:text-gray-500 transition-colors text-lg">→</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {tool.title}
                  </h2>
                  <p className="text-base text-gray-500 leading-relaxed">{tool.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Trust signals */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-gray-100">
            {[
              { label: 'Evidence-Based', desc: 'WHO & CDC standards' },
              { label: '100% Private', desc: 'No data leaves your browser' },
              { label: 'Instant Results', desc: 'No sign-up required' },
              { label: 'Always Free', desc: 'No hidden costs' },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p className="text-sm font-bold text-gray-800">{label}</p>
                <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>

          {/* App CTA */}
          <div className="mt-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/GrowthKitLogo.webp" alt="GrowthKit" className="w-9 h-9 rounded-xl" />
                  <span className="font-semibold text-sm opacity-90">GrowthKit App</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Want to track this over time?</h2>
                <p className="text-white/80 max-w-md text-sm leading-relaxed">
                  These calculators give you a snapshot. GrowthKit gives you the full picture — log measurements for your whole family and watch growth trends unfold over months and years.
                </p>
                <ul className="mt-4 space-y-1 text-sm text-white/90">
                  <li>✓ Multiple profiles — kids, adults, whole family</li>
                  <li>✓ Height, weight & BMI charts with growth velocity</li>
                  <li>✓ PDF reports for pediatrician visits</li>
                  <li>✓ 100% private — data stays on your device</li>
                </ul>
              </div>
              <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-2">
                <Link
                  href="https://apps.apple.com/app/growthkit-track-height-weight/id6740914430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors text-sm"
                >
                  <AppleLogo />
                  Download Free on App Store
                </Link>
                <p className="text-xs text-white/60">Free with optional in-app purchase</p>
              </div>
            </div>
          </div>

          {/* Editorial SEO content */}
          <div className="mt-16 prose prose-gray max-w-none">
            <h2>Free Growth & Health Calculators for Parents</h2>
            <p>
              These tools are designed for parents who want quick, accurate answers about their children&apos;s growth — and for adults tracking their own health goals. Every calculator is built on official WHO and CDC data and uses the same statistical methods employed by pediatricians and healthcare providers.
            </p>

            <h2>Why Use These Calculators?</h2>
            <p>
              When your child comes home from the pediatrician with a growth percentile number, what does it actually mean? When your doctor says your child&apos;s growth velocity has slowed, how do you track it at home? These tools bridge the gap between clinical data and everyday understanding.
            </p>
            <ul>
              <li>All calculations happen in your browser — no data is ever sent to a server</li>
              <li>No account, email, or sign-up required</li>
              <li>Results include plain-English interpretations, not just numbers</li>
              <li>Every tool has a FAQ section written to answer the questions parents actually ask</li>
            </ul>

            <h2>About the Data Sources</h2>
            <ul>
              <li>
                <strong>WHO Child Growth Standards (0–2 years):</strong> Developed from data on healthy, well-nourished children across 6 countries. Recommended by the AAP for infants.
              </li>
              <li>
                <strong>CDC Growth Charts (2–20 years):</strong> Based on U.S. survey data. The standard reference for school-age children and teens in the U.S.
              </li>
              <li>
                <strong>Mifflin-St Jeor Equation:</strong> Used for adult BMR calculations. Considered the most accurate formula for most adults.
              </li>
            </ul>
          </div>

          {/* Medical disclaimer */}
          <p className="mt-10 text-xs text-gray-400 border-t border-gray-100 pt-6 leading-relaxed">
            <strong className="text-gray-500">Medical Disclaimer:</strong> All tools on this page are for informational and educational purposes only. They are not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider or pediatrician with questions about your child&apos;s health or growth.
          </p>
        </div>
      </div>
    </>
  )
}
