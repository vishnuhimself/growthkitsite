import { Metadata } from 'next'
import { IdealWeightChildCalculator } from './calculator'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: 'Healthy Weight for Children Calculator — By Age & Height',
  description:
    "Find the healthy weight range for your child by age, height, and sex using CDC BMI-for-age percentiles. Enter your child's current weight to see if it's in the healthy range. Free tool.",
  keywords: [
    'healthy weight for children calculator',
    'ideal weight for kids',
    'what should my child weigh',
    'healthy weight for 7 year old',
    'child weight range by height and age',
    'healthy weight for 10 year old boy',
    'ideal weight for children by age',
    'what is a healthy weight for my child',
    'child weight calculator by age height',
    'normal weight for child by age',
  ],
  alternates: { canonical: `${BASE_URL}/tools/ideal-weight-child` },
  openGraph: {
    title: 'Healthy Weight for Children Calculator — By Age & Height | GrowthKit',
    description: "Find the healthy weight range for your child using CDC BMI percentiles. Free, instant, no sign-up.",
    url: `${BASE_URL}/tools/ideal-weight-child`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthy Weight for Children Calculator | GrowthKit',
    description: "What should your child weigh? Find their healthy weight range by age, height, and sex.",
  },
}

export default function IdealWeightChildPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Healthy Weight for Children Calculator',
    description: "Calculates the healthy weight range for children ages 2–20 based on CDC BMI-for-age percentile standards (5th–85th percentile for healthy weight).",
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/tools/ideal-weight-child`,
    publisher: { '@type': 'Organization', name: 'GrowthKit', url: BASE_URL },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Healthy Weight for Children', item: `${BASE_URL}/tools/ideal-weight-child` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <IdealWeightChildCalculator />
    </>
  )
}
