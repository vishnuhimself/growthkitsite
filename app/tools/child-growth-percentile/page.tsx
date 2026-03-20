import { Metadata } from 'next'
import { ChildGrowthPercentileCalculator } from './calculator'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: 'Child Growth Percentile Calculator — Free WHO & CDC Tool',
  description:
    'Calculate your child\'s height, weight, and BMI percentile instantly using official WHO (0–2 yr) and CDC (2–20 yr) growth standards. Free, private, no sign-up.',
  keywords: [
    'child growth percentile calculator',
    'baby weight percentile calculator',
    'child height percentile calculator',
    'WHO growth chart calculator',
    'CDC growth chart percentile',
    'toddler growth percentile',
    'infant weight percentile',
    'BMI for age percentile',
    'baby growth chart by age',
    'child growth tracker',
  ],
  alternates: { canonical: `${BASE_URL}/tools/child-growth-percentile` },
  openGraph: {
    title: 'Child Growth Percentile Calculator — Free WHO & CDC Tool | GrowthKit',
    description:
      'Calculate your child\'s height, weight, and BMI percentile using WHO and CDC growth standards. Free, instant, private.',
    url: `${BASE_URL}/tools/child-growth-percentile`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Growth Percentile Calculator — Free WHO & CDC Tool | GrowthKit',
    description:
      'Calculate your child\'s height, weight, and BMI percentile using WHO and CDC growth standards.',
  },
}

export default function ChildGrowthPercentilePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Child Growth Percentile Calculator',
    description:
      "Free calculator that computes a child's height, weight, and BMI percentiles using official WHO (0–2 years) and CDC (2–20 years) growth chart data.",
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/tools/child-growth-percentile`,
    publisher: { '@type': 'Organization', name: 'GrowthKit', url: BASE_URL },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Child Growth Percentile Calculator',
        item: `${BASE_URL}/tools/child-growth-percentile`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ChildGrowthPercentileCalculator />
    </>
  )
}
