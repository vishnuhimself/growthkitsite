import { Metadata } from 'next'
import { GrowthVelocityCalculator } from './calculator'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: 'Child Growth Velocity Calculator — Track Height Growth Rate',
  description:
    'Calculate how fast your child is growing in cm/year and compare to WHO age norms. Enter 2+ height measurements to detect growth spurts or slow growth. Free tool.',
  keywords: [
    'child growth velocity calculator',
    'height velocity calculator',
    'how fast is my child growing',
    'is my child growing fast enough',
    'growth rate calculator for kids',
    'annual height growth rate',
    'growth spurt calculator',
    'pediatric growth velocity',
    'height growth rate by age',
    'track child height growth',
  ],
  alternates: { canonical: `${BASE_URL}/tools/growth-velocity` },
  openGraph: {
    title: 'Child Growth Velocity Calculator — Track Height Growth Rate | GrowthKit',
    description: 'Calculate how fast your child is growing and compare to WHO age norms. Free, instant tool.',
    url: `${BASE_URL}/tools/growth-velocity`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Growth Velocity Calculator | GrowthKit',
    description: 'How fast is your child growing? Calculate cm/year and compare to normal ranges.',
  },
}

export default function GrowthVelocityPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Child Growth Velocity Calculator',
    description:
      'Calculates a child\'s height growth rate (cm/year) from two or more measurements and compares it to WHO age-appropriate norms to identify normal growth, growth spurts, or slow growth.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/tools/growth-velocity`,
    publisher: { '@type': 'Organization', name: 'GrowthKit', url: BASE_URL },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Growth Velocity Calculator', item: `${BASE_URL}/tools/growth-velocity` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <GrowthVelocityCalculator />
    </>
  )
}
