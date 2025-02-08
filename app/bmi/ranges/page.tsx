import { Metadata } from 'next'
import InteractiveBMIRanges from '@/app/components/bmi/interactive-bmi-ranges'

export const metadata: Metadata = {
  title: 'BMI Categories and Ranges - Understanding BMI Classifications',
  description: 'Learn about different BMI categories, what they mean for your health, and recommended weight ranges. Understand BMI classifications from underweight to obese with detailed explanations.',
  keywords: [
    'bmi ranges',
    'bmi categories',
    'bmi classification',
    'healthy bmi range',
    'bmi health risks',
    'what is normal bmi',
    'bmi interpretation'
  ],
  openGraph: {
    title: 'BMI Categories and Ranges - Understanding BMI Classifications',
    description: 'Learn about different BMI categories and what they mean for your health. Detailed explanations of BMI ranges from underweight to obese.',
    type: 'website',
    url: '/bmi/ranges',
    images: [
      {
        url: '/images/bmi-ranges-og.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI Categories and Ranges Guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Categories and Ranges Guide',
    description: 'Understanding BMI classifications and their health implications.',
    images: ['/images/bmi-ranges-og.jpg']
  }
}

export default function Page() {
  return <InteractiveBMIRanges />
} 