'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChartLine } from 'lucide-react'
import { calculateBMI, getBMICategory } from '@/app/lib/bmi-utils'
import Link from 'next/link'

interface HeightOption {
  feet: number
  inches: number
  display: string
  value: string
}

function generateHeightOptions(): HeightOption[] {
  const options: HeightOption[] = []
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      options.push({
        feet,
        inches,
        display: `${feet}'${inches}"`,
        value: `${feet}-${inches}`
      })
    }
  }
  return options
}

function getStaticBMIPageUrl(height: string, weight: number): string | null {
  // Check if height and weight are within our static page ranges
  const [feet, inches] = height.split('-').map(Number)
  if (feet < 4 || feet > 7) return null
  if (inches < 0 || inches > 11) return null
  if (weight < 80 || weight > 400) return null

  return `/bmi/${feet}-${inches}-${weight}-lbs`
}

interface ValidationLimits {
  metric: {
    height: { min: number; max: number }
    weight: { min: number; max: number }
  }
  imperial: {
    feet: { min: number; max: number }
    inches: { min: number; max: number }
    weight: { min: number; max: number }
  }
}

const LIMITS: ValidationLimits = {
  metric: {
    height: { min: 100, max: 250 }, // cm
    weight: { min: 30, max: 300 }   // kg
  },
  imperial: {
    feet: { min: 4, max: 7 },
    inches: { min: 0, max: 11 },
    weight: { min: 66, max: 660 }   // lbs
  }
}


export default function InteractiveBMICalculator() {
  const [useMetric, setUseMetric] = useState(false)
  const [heightFeet, setHeightFeet] = useState('')
  const [heightInches, setHeightInches] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBMI] = useState<number | null>(null)
  const [staticPageUrl, setStaticPageUrl] = useState<string | null>(null)

  const handleCalculate = () => {
    if (useMetric && (!heightCm || !weight)) return
    if (!useMetric && (!heightFeet || !heightInches || !weight)) return

    let calculatedBMI: number
    let staticUrl: string | null = null

    if (useMetric) {
      const heightInInches = Math.round(parseInt(heightCm) / 2.54)
      const weightInLbs = Math.round(parseInt(weight) * 2.20462)
      calculatedBMI = calculateBMI(heightInInches, weightInLbs)
    } else {
      const heightInInches = (parseInt(heightFeet) * 12) + parseInt(heightInches)
      const weightInLbs = parseInt(weight)
      calculatedBMI = calculateBMI(heightInInches, weightInLbs)
      
      // Check for matching static page
      staticUrl = getStaticBMIPageUrl(`${heightFeet}-${heightInches}`, weightInLbs)
    }

    setBMI(calculatedBMI)
    setStaticPageUrl(staticUrl)
  }

  // Input validation handlers
  const handleHeightCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Only allow digits, no extra characters
    if (!/^\d*$/.test(value)) return
    
    if (value === '') {
      setHeightCm('')
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    if (numValue >= 0 && numValue <= LIMITS.metric.height.max) {
      setHeightCm(value)
    }
  }

  const handleHeightFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Only allow digits, no extra characters
    if (!/^\d*$/.test(value)) return
    
    if (value === '') {
      setHeightFeet('')
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    if (numValue >= 0 && numValue <= LIMITS.imperial.feet.max) {
      setHeightFeet(value)
    }
  }

  const handleHeightInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Only allow digits, no extra characters
    if (!/^\d*$/.test(value)) return
    
    if (value === '') {
      setHeightInches('')
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    if (numValue >= 0 && numValue <= LIMITS.imperial.inches.max) {
      setHeightInches(value)
    }
  }

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const limits = useMetric ? LIMITS.metric.weight : LIMITS.imperial.weight
    
    // Allow digits and at most one decimal point for metric weight
    const pattern = useMetric ? /^\d*\.?\d*$/ : /^\d*$/
    if (!pattern.test(value)) return
    
    if (value === '') {
      setWeight('')
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    if (numValue >= 0 && numValue <= limits.max) {
      setWeight(value)
    }
  }

  return (
    <article className="container mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">BMI Calculator</h1>
      
      <p className="text-slate-600 mb-8">
        Calculate your Body Mass Index (BMI) using your height and weight. BMI is a useful measure 
        of whether you&apos;re a healthy weight for your height.
      </p>

      {/* Unit Toggle */}
      <div className="flex flex-col gap-2 mb-8">
        <label className="text-sm font-medium text-slate-600">Select Units:</label>
        <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-white shadow-sm w-fit">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUseMetric(false)}
            className={`
              flex-1 px-6
              ${!useMetric ? 
                'bg-primary text-primary-foreground hover:bg-primary/90' : 
                'hover:bg-slate-100 text-slate-600'
              }
            `}
            aria-pressed={!useMetric}
          >
            US/UK
            <span className="ml-1 text-xs opacity-70">
              (ft/lbs)
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUseMetric(true)}
            className={`
              flex-1 px-6
              ${useMetric ? 
                'bg-primary text-primary-foreground hover:bg-primary/90' : 
                'hover:bg-slate-100 text-slate-600'
              }
            `}
            aria-pressed={useMetric}
          >
            International
            <span className="ml-1 text-xs opacity-70">
              (cm/kg)
            </span>
          </Button>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2 mb-6">
          {/* Height Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              Height {useMetric ? '(cm)' : '(ft/in)'}
            </label>
            {useMetric ? (
              <input
                type="number"
                value={heightCm}
                onChange={handleHeightCmChange}
                placeholder="e.g. 175"
                min={LIMITS.metric.height.min}
                max={LIMITS.metric.height.max}
                step="1"
                className="w-full px-4 py-2 rounded-lg border border-slate-200"
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={handleHeightFeetChange}
                    placeholder="Feet"
                    min={LIMITS.imperial.feet.min}
                    max={LIMITS.imperial.feet.max}
                    step="1"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200"
                  />
                  <span className="text-xs text-slate-500">Feet ({LIMITS.imperial.feet.min}-{LIMITS.imperial.feet.max})</span>
                </div>
                <div className="space-y-1">
                  <input
                    type="number"
                    value={heightInches}
                    onChange={handleHeightInchesChange}
                    placeholder="Inches"
                    min={LIMITS.imperial.inches.min}
                    max={LIMITS.imperial.inches.max}
                    step="1"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200"
                  />
                  <span className="text-xs text-slate-500">Inches (0-11)</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              Weight {useMetric ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={handleWeightChange}
              placeholder={useMetric ? "e.g. 70" : "e.g. 150"}
              min={useMetric ? LIMITS.metric.weight.min : LIMITS.imperial.weight.min}
              max={useMetric ? LIMITS.metric.weight.max : LIMITS.imperial.weight.max}
              step={useMetric ? "0.1" : "1"}
              className="w-full px-4 py-2 rounded-lg border border-slate-200"
            />
          </div>
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full sm:w-auto"
          size="lg"
        >
          Calculate BMI
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>

        {/* Updated Results Section */}
        {bmi !== null && (
          <div className="mt-6 space-y-4">
            {/* Basic BMI Result */}
            <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-semibold">Your BMI is {bmi.toFixed(1)}</h3>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                This places you in the {getBMICategory(bmi)} category.
              </p>
            </div>

            {/* Static Page Callout */}
            {staticPageUrl && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <ChartLine className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">Detailed Analysis Available</h3>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      We have a detailed BMI analysis page for your height and weight, including personalized recommendations and health insights.
                    </p>
                    <Link 
                      href={staticPageUrl}
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <span>View Detailed Analysis</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Information */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">About BMI Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-lg bg-slate-50">
            <h3 className="font-medium mb-2">Underweight</h3>
            <p className="text-sm text-slate-600">BMI below 18.5</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50">
            <h3 className="font-medium mb-2">Normal Weight</h3>
            <p className="text-sm text-slate-600">BMI 18.5 to 24.9</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50">
            <h3 className="font-medium mb-2">Overweight</h3>
            <p className="text-sm text-slate-600">BMI 25 to 29.9</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50">
            <h3 className="font-medium mb-2">Obese</h3>
            <p className="text-sm text-slate-600">BMI 30 or greater</p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <p className="mt-8 text-sm text-slate-500">
        * BMI is a general guide and may not be accurate for athletes, elderly people, or during pregnancy. 
        Consult healthcare professionals for personalized advice.
      </p>
    </article>
  )
} 