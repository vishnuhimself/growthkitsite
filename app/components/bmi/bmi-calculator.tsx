'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface BMICalculatorProps {
  initialHeight: string
  initialWeight: string
  currentBMI: number
}

export function BMICalculator({ initialHeight, initialWeight, currentBMI }: BMICalculatorProps) {
  const router = useRouter()
  const [feet, inches] = initialHeight.split('-').map(Number)
  const weightLbs = parseInt(initialWeight.split('-')[0])

  const [heightFeet, setHeightFeet] = useState(feet.toString())
  const [heightInches, setHeightInches] = useState(inches.toString())
  const [weight, setWeight] = useState(weightLbs.toString())

  const handleCalculate = () => {
    router.push(`/bmi/${heightFeet}-${heightInches}-${weight}-lbs`)
  }

  return (
    <div className="bg-slate-50 rounded-xl p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">Height</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <select 
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2"
                suppressHydrationWarning
              >
                {Array.from({ length: 3 }, (_, i) => i + 4).map(num => (
                  <option key={num} value={num} suppressHydrationWarning>{num} ft</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select 
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2"
                suppressHydrationWarning
              >
                {Array.from({ length: 12 }, (_, i) => i).map(num => (
                  <option key={num} value={num} suppressHydrationWarning>{num} in</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">Weight (lbs)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2"
            min="50"
            max="500"
            suppressHydrationWarning
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleCalculate}
            className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            suppressHydrationWarning
          >
            Calculate BMI
          </button>
        </div>
      </div>

      {/* <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Current BMI: <span className="font-semibold text-foreground">{currentBMI}</span>
        </p>
      </div> */}
    </div>
  )
} 