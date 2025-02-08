'use client'

import { useMemo } from 'react'
import { bmiDistributionData, getBMIPercentile, getDistributionDescription } from '@/app/lib/bmi-distribution-data'

interface BMIDistributionProps {
  bmi: number
}

export function BMIDistribution({ bmi }: BMIDistributionProps) {
  const percentile = useMemo(() => getBMIPercentile(bmi), [bmi])
  const description = useMemo(() => getDistributionDescription(percentile), [percentile])

  return (
    <section className="mt-12 p-6 bg-slate-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Population Distribution</h2>
      
      <div className="space-y-8">
        {/* Bell Curve Visualization */}
        <div className="relative h-32">
          {/* Bell Curve Shape */}
          <svg 
            viewBox="0 0 100 50" 
            className="w-full h-full absolute inset-0 overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Background Sections */}
            <path 
              d="M0,50 C20,50 25,0 50,0 C75,0 80,50 100,50 L100,50 L0,50 Z" 
              className="fill-slate-100 stroke-none"
            />
            
            {/* Bell Curve Line */}
            <path
              d="M0,50 C20,50 25,0 50,0 C75,0 80,50 100,50"
              className="fill-none stroke-slate-400 stroke-[0.5]"
            />

            {/* Distribution Markers */}
            <line x1="25" y1="0" x2="25" y2="50" className="stroke-slate-200" strokeDasharray="2,2"/>
            <line x1="50" y1="0" x2="50" y2="50" className="stroke-slate-200" strokeDasharray="2,2"/>
            <line x1="75" y1="0" x2="75" y2="50" className="stroke-slate-200" strokeDasharray="2,2"/>

            {/* Your Position Marker */}
            <line 
              x1={percentile} 
              y1="0" 
              x2={percentile} 
              y2="50" 
              className="stroke-primary stroke-2"
            />
          </svg>

          {/* Distribution Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-slate-500 pt-2">
            <div className="text-center">
              <div className="font-medium">Underweight</div>
              <div>&lt;18.5</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Normal</div>
              <div>18.5-24.9</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Overweight</div>
              <div>25-29.9</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Obese</div>
              <div>30+</div>
            </div>
          </div>
        </div>

        {/* Stats Box */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-500">Your BMI</div>
              <div className="text-2xl font-semibold">{bmi.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Population Percentile</div>
              <div className="text-2xl font-semibold">{percentile.toFixed(1)}%</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            Your BMI is <span className="font-medium">{description}</span>
          </div>
        </div>
      </div>
    </section>
  )
} 