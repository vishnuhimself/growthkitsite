'use client'

import { useMemo } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { getWeightChangeRanges } from '@/app/lib/weight-impact'
import { calculateBMI } from '@/app/lib/bmi-utils'

interface WeightChangeImpactProps {
  height: string
  currentWeight: number
  currentBMI: number
}

export function WeightChangeImpact({ height, currentWeight, currentBMI }: WeightChangeImpactProps) {
  const [feet, inches] = height.split('-').map(Number)
  const heightInInches = (feet * 12) + inches

  const changes = useMemo(() => 
    getWeightChangeRanges(currentWeight, currentBMI),
    [currentWeight, currentBMI]
  )

  return (
    <section className="mt-12 p-6 bg-slate-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Weight Change Impact</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {changes.map(({ change, timeframe, isHealthy }) => {
          const newWeight = currentWeight + change
          const newBMI = calculateBMI(heightInInches, newWeight)
          const isGain = change > 0

          return (
            <div 
              key={change}
              className={cn(
                "p-4 rounded-lg",
                isHealthy ? "bg-white" : "bg-white/50",
                "relative"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {isGain ? (
                  <ArrowUp className="w-4 h-4 text-red-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-green-500" />
                )}
                <span className="font-medium">
                  {isGain ? '+' : ''}{change} lbs
                </span>
              </div>

              <div className="space-y-1 text-sm text-slate-600">
                <p>New weight: {newWeight} lbs</p>
                <p>New BMI: {newBMI.toFixed(1)}</p>
                <p className="text-xs">Timeframe: {timeframe}</p>
              </div>

              {!isHealthy && (
                <div className="absolute top-2 right-2">
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                    Consult doctor
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-sm text-slate-500 mt-4">
        * Based on CDC guidelines for safe weight change (1-2 lbs per week)
      </p>
    </section>
  )
} 