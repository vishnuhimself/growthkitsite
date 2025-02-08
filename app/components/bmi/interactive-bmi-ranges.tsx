'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Scale, AlertCircle } from 'lucide-react'

interface BMICategory {
  name: string
  range: string
  description: string
  recommendations: string[]
  color: string
}

const BMI_CATEGORIES: BMICategory[] = [
  {
    name: 'Underweight',
    range: 'Below 18.5',
    description: 'Being underweight can indicate nutritional deficiencies and may affect overall health.',
    recommendations: [
      'Consult with healthcare providers',
      'Focus on nutrient-dense foods',
      'Consider strength training',
      'Track caloric intake',
      'Regular health monitoring'
    ],
    color: 'text-[#B39C30]'
  },
  {
    name: 'Normal Weight',
    range: '18.5 to 24.9',
    description: 'This range is associated with the lowest risk of weight-related health problems.',
    recommendations: [
      'Maintain balanced diet',
      'Regular physical activity',
      'Regular health check-ups',
      'Adequate sleep',
      'Stress management'
    ],
    color: 'text-[#2E7D32]'
  },
  {
    name: 'Overweight',
    range: '25.0 to 29.9',
    description: 'Being overweight may increase risk of certain health conditions.',
    recommendations: [
      'Moderate calorie reduction',
      'Increased physical activity',
      'Regular health monitoring',
      'Balanced nutrition plan',
      'Lifestyle modifications'
    ],
    color: 'text-[#B55B02]'
  },
  {
    name: 'Obese',
    range: '30.0 or higher',
    description: 'Obesity is associated with increased risks of various health conditions.',
    recommendations: [
      'Medical consultation',
      'Structured weight management',
      'Professional dietary advice',
      'Regular exercise program',
      'Mental health support'
    ],
    color: 'text-[#B91C1C]'
  }
]

export default function InteractiveBMIRanges() {
  return (
    <article className="container mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">BMI Categories and Ranges</h1>
      
      <p className="text-slate-600 mb-8">
        Body Mass Index (BMI) is divided into different categories that help assess potential health risks. 
        Understanding these ranges can help you make informed decisions about your health.
      </p>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-12">
        <Link 
          href="/bmi/calculator"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Scale className="w-4 h-4" />
          <span>Calculate Your BMI</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link 
          href="/bmi/chart"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
        >
          <span>View BMI Chart</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* BMI Categories */}
      <div className="grid gap-6 sm:grid-cols-2">
        {BMI_CATEGORIES.map((category) => (
          <div 
            key={category.name}
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <h2 className={`text-xl font-semibold ${category.color}`}>
                {category.name}
              </h2>
              <span className="text-sm font-medium px-2 py-1 rounded-md bg-slate-100">
                BMI {category.range}
              </span>
            </div>
            
            <p className="text-slate-600 mb-4">
              {category.description}
            </p>

            <h3 className="font-medium mb-2">Recommendations:</h3>
            <ul className="space-y-1">
              {category.recommendations.map((rec) => (
                <li key={rec} className="text-sm text-slate-600 flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-primary/60" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Important Note */}
      <div className="mt-12 p-4 rounded-lg bg-amber-50 border border-amber-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-900 mb-1">Important Note</h3>
            <p className="text-sm text-amber-800">
              BMI is a general screening tool and may not be accurate for athletes, elderly people, 
              pregnant women, or those with high muscle mass. Always consult healthcare professionals 
              for personalized health advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
} 