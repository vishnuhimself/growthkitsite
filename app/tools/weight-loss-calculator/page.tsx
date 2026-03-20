import { Metadata } from 'next'
import { WeightLossCalculator } from './calculator'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

export const metadata: Metadata = {
  title: 'Weight Loss Timeline Calculator — How Long to Reach Your Goal Weight',
  description:
    'Find out how long it will realistically take to reach your goal weight. Enter current weight, goal, height, and activity level to get your BMR, TDEE, daily calorie deficit, and projected goal date. Free.',
  keywords: [
    'weight loss timeline calculator',
    'how long to lose weight calculator',
    'weight loss goal date calculator',
    'how long to lose 20 pounds',
    'realistic weight loss calculator',
    'calorie deficit calculator for weight loss',
    'BMR TDEE calculator weight loss',
    'weight loss time estimator',
    'how many weeks to lose weight',
    'free weight loss calculator',
  ],
  alternates: { canonical: `${BASE_URL}/tools/weight-loss-calculator` },
  openGraph: {
    title: 'Weight Loss Timeline Calculator — How Long to Reach Your Goal Weight | GrowthKit',
    description: 'Get a realistic timeline for your weight loss goal. Enter stats and activity level to see BMR, TDEE, calorie deficit, and projected goal date. Free.',
    url: `${BASE_URL}/tools/weight-loss-calculator`,
    type: 'website',
    siteName: 'GrowthKit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Timeline Calculator | GrowthKit',
    description: 'How long to reach your goal weight? Get a realistic, science-based timeline. Free calculator.',
  },
}

export default function WeightLossCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Weight Loss Timeline Calculator',
    description: 'Calculates how long it will take to reach a goal weight using BMR (Mifflin-St Jeor), TDEE, and recommended calorie deficit. Provides a projected goal date.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BASE_URL}/tools/weight-loss-calculator`,
    publisher: { '@type': 'Organization', name: 'GrowthKit', url: BASE_URL },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Weight Loss Timeline Calculator', item: `${BASE_URL}/tools/weight-loss-calculator` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <WeightLossCalculator />
    </>
  )
}
