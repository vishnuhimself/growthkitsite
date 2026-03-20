import { Metadata } from 'next'
import { ChildHeightPredictorCalculator } from './calculator'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: "Child Height Predictor Calculator — How Tall Will My Child Be?",
  description:
    "Predict your child's adult height based on parents' heights using the mid-parental height method. Free, instant, accurate to ±2–3 inches. No sign-up required.",
  keywords: [
    'child height predictor',
    'how tall will my child be',
    'adult height prediction calculator',
    'child height calculator from parents',
    'mid parental height calculator',
    'predict my childs height',
    'height prediction from parents height',
    'how tall will my daughter be',
    'how tall will my son be',
    'future height calculator',
  ],
  alternates: { canonical: `${BASE_URL}/tools/child-height-predictor` },
  openGraph: {
    title: "Child Height Predictor Calculator — How Tall Will My Child Be? | GrowthKit",
    description:
      "Predict your child's adult height from parents' heights using the mid-parental method. Free and instant.",
    url: `${BASE_URL}/tools/child-height-predictor`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Child Height Predictor Calculator | GrowthKit",
    description: "Predict your child's adult height from parents' heights. Free, instant calculator.",
  },
}

export default function ChildHeightPredictorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: "Child Height Predictor Calculator",
    description:
      "Predicts a child's adult height using the mid-parental height method and parent heights. Results are given as a predicted range accurate to ±2–3 inches.",
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/tools/child-height-predictor`,
    publisher: { '@type': 'Organization', name: 'GrowthKit', url: BASE_URL },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: "Child Height Predictor Calculator", item: `${BASE_URL}/tools/child-height-predictor` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ChildHeightPredictorCalculator />
    </>
  )
}
