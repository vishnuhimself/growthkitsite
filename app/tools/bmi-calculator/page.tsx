import { Metadata } from 'next'
import { BMICalculator } from './calculator'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: 'BMI Calculator for Kids & Adults — Free BMI-for-Age Percentile',
  description:
    'Calculate BMI for kids (with CDC age-specific percentile) or adults. Free, instant, no sign-up. Includes healthy weight range and plain-English interpretation.',
  keywords: [
    'BMI calculator',
    'BMI calculator for kids',
    'child BMI percentile calculator',
    'BMI for age calculator',
    'kids BMI calculator CDC',
    'adult BMI calculator',
    'healthy BMI calculator',
    'BMI-for-age percentile',
    'child BMI by age',
    'free BMI calculator',
  ],
  alternates: { canonical: `${BASE_URL}/tools/bmi-calculator` },
  openGraph: {
    title: 'BMI Calculator for Kids & Adults — Free BMI-for-Age Percentile | GrowthKit',
    description: 'Calculate BMI for children (with percentile) or adults. Free, instant, no sign-up.',
    url: `${BASE_URL}/tools/bmi-calculator`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator for Kids & Adults | GrowthKit',
    description: 'Calculate BMI for children with CDC age percentile or adults with standard ranges.',
  },
}

export default function BMICalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BMI Calculator for Kids & Adults',
    description:
      'Free BMI calculator with child mode (CDC BMI-for-age percentile) and adult mode (standard BMI categories). Includes healthy weight range.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/tools/bmi-calculator`,
    publisher: { '@type': 'Organization', name: 'GrowthKit', url: BASE_URL },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: 'BMI Calculator', item: `${BASE_URL}/tools/bmi-calculator` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BMICalculator />
    </>
  )
}
