import { Metadata } from 'next'
import { PreemieCorrectedAgeCalculator } from './calculator'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: 'Premature Baby Corrected Age Calculator — Free Preemie Adjusted Age',
  description:
    "Calculate your premature baby's corrected (adjusted) age in seconds. Enter birth date and gestational age to find your preemie's developmental age for tracking milestones. Free, instant tool.",
  keywords: [
    'premature baby corrected age calculator',
    'preemie adjusted age calculator',
    'corrected age calculator for preemies',
    'adjusted age calculator premature baby',
    'corrected age for preterm babies',
    'preemie developmental age',
    'corrected age vs chronological age',
    'premature baby milestone calculator',
    'how to calculate corrected age',
    'preemie age adjustment calculator',
  ],
  alternates: { canonical: `${BASE_URL}/tools/premature-baby-corrected-age` },
  openGraph: {
    title: 'Premature Baby Corrected Age Calculator — Free Preemie Adjusted Age | GrowthKit',
    description: "Calculate your premature baby's corrected age instantly. Essential for tracking preemie milestones and growth accurately.",
    url: `${BASE_URL}/tools/premature-baby-corrected-age`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premature Baby Corrected Age Calculator | GrowthKit',
    description: "Find your preemie's corrected age for accurate milestone and growth tracking. Free, instant.",
  },
}

export default function PreemieCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Premature Baby Corrected Age Calculator',
    description: "Calculates a premature baby's corrected (adjusted) age from birth date and gestational age. Used to track developmental milestones and growth for preterm infants.",
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/tools/premature-baby-corrected-age`,
    publisher: { '@type': 'Organization', name: 'GrowthKit', url: BASE_URL },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Premature Baby Corrected Age Calculator', item: `${BASE_URL}/tools/premature-baby-corrected-age` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PreemieCorrectedAgeCalculator />
    </>
  )
}
