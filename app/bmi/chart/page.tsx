import { Metadata } from 'next'
import InteractiveBMIChart from '@/app/components/bmi/interactive-bmi-chart'

export const metadata: Metadata = {
  title: 'BMI Chart - Height and Weight Tables',
  description: 'Interactive BMI chart showing healthy weight ranges for every height. Find your ideal weight range using our detailed BMI tables for both imperial and metric measurements.',
  keywords: [
    'bmi chart',
    'height weight chart',
    'bmi table',
    'healthy weight range',
    'bmi categories',
    'weight for height',
    'ideal weight chart'
  ],
  openGraph: {
    title: 'BMI Chart - Height and Weight Tables',
    description: 'Find your ideal weight range using our detailed BMI tables for both imperial and metric measurements.',
    type: 'website',
    url: '/bmi/chart',
    images: [
      {
        url: '/images/bmi-chart-og.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI Chart and Weight Tables'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Chart - Height and Weight Tables',
    description: 'Interactive BMI chart showing healthy weight ranges for every height.',
    images: ['/images/bmi-chart-og.jpg']
  }
}

export default function Page() {
  return <InteractiveBMIChart />
} 