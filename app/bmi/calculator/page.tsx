import { Metadata } from 'next'
import InteractiveBMICalculator from '@/app/components/bmi/interactive-bmi-calculator'

export const metadata: Metadata = {
  title: 'BMI Calculator - Check Your Body Mass Index',
  description: 'Calculate your Body Mass Index (BMI) using our free calculator. Supports both metric (kg/cm) and imperial (lbs/ft) units with instant results and health recommendations.',
  keywords: [
    'bmi calculator',
    'body mass index',
    'calculate bmi',
    'weight calculator',
    'health calculator',
    'metric bmi',
    'imperial bmi'
  ],
  openGraph: {
    title: 'BMI Calculator - Check Your Body Mass Index',
    description: 'Free BMI calculator with instant results and health recommendations. Supports both metric and imperial units.',
    type: 'website',
    url: '/bmi/calculator',
    images: [
      {
        url: '/images/bmi-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI Calculator Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator - Check Your Body Mass Index',
    description: 'Calculate your BMI instantly with our free calculator.',
    images: ['/images/bmi-calculator-og.jpg']
  }
}

export default function Page() {
  return <InteractiveBMICalculator />
} 