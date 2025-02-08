'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Scale } from 'lucide-react'


interface BMITableRow {
  feet: number
  inches: number
  heightInFeet: string
  underweight: string
  normal: string
  overweight: string
  obese: string
}

function generateBMITable(useMetric: boolean): BMITableRow[] {
  const rows: BMITableRow[] = []
  
  for (let feet = 4; feet <= 6; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      if ((feet === 4 && inches < 0) || (feet === 6 && inches > 11)) continue
      
      const heightInInches = (feet * 12) + inches
      const heightInMeters = heightInInches * 0.0254
      
      const getWeight = (bmi: number) => {
        const weightInKg = bmi * heightInMeters * heightInMeters
        return useMetric 
          ? `${Math.round(weightInKg)}`
          : `${Math.round(weightInKg * 2.20462)}`
      }
      
      rows.push({
        feet,
        inches,
        heightInFeet: useMetric 
          ? `${Math.round(heightInMeters * 100)} cm`
          : `${feet}'${inches}"`,
        underweight: `Under ${getWeight(18.5)}`,
        normal: `${getWeight(18.5)} - ${getWeight(24.9)}`,
        overweight: `${getWeight(25)} - ${getWeight(29.9)}`,
        obese: `Over ${getWeight(30)}`
      })
    }
  }
  
  return rows
}


export default function BMIChartPage() {
  const [useMetric, setUseMetric] = useState(false)
  const tableData = generateBMITable(useMetric)

  return (
    <article className="container mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">BMI Chart and Weight Ranges</h1>
      
      <p className="text-slate-600 mb-8">
        Find your healthy weight range based on your height. This BMI chart shows ideal weight ranges 
        and BMI categories for adults aged 20 and older.
      </p>

      {/* Unit Toggle and Calculator Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-600">Select Units:</label>
          <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-white shadow-sm">
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

        <Link 
          href="/bmi/calculator"
          className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
        >
          <Scale className="w-4 h-4" />
          <span>Calculate Your BMI</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-sm text-slate-600 mb-8">
        Currently showing weights in {useMetric ? 'kilograms' : 'pounds'} and heights in {useMetric ? 'centimeters' : 'feet/inches'}.
      </p>

      {/* BMI Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left font-medium text-slate-600">Height</th>
              <th className="p-4 text-left font-medium text-[#B39C30]">Underweight</th>
              <th className="p-4 text-left font-medium text-[#2E7D32]">Normal Weight</th>
              <th className="p-4 text-left font-medium text-[#B55B02]">Overweight</th>
              <th className="p-4 text-left font-medium text-[#B91C1C]">Obese</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tableData.map((row) => (
              <tr key={row.heightInFeet} className="hover:bg-slate-50">
                <td className="p-4 font-medium">{row.heightInFeet}</td>
                <td className="p-4 text-slate-600">
                  {row.underweight} {useMetric ? 'kg' : 'lbs'}
                </td>
                <td className="p-4 text-slate-600">
                  {row.normal} {useMetric ? 'kg' : 'lbs'}
                </td>
                <td className="p-4 text-slate-600">
                  {row.overweight} {useMetric ? 'kg' : 'lbs'}
                </td>
                <td className="p-4 text-slate-600">
                  {row.obese} {useMetric ? 'kg' : 'lbs'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage Instructions */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">How to Use This Chart</h2>
        <ol className="space-y-2 text-slate-600">
          <li>1. Find your height in the left column</li>
          <li>2. Read across to see weight ranges for each BMI category</li>
          <li>3. Locate your weight to determine your BMI category</li>
        </ol>
      </section>

      {/* Disclaimer */}
      <p className="mt-8 text-sm text-slate-500">
        * BMI is a general guide and may not be accurate for athletes, elderly people, or during pregnancy. 
        Consult healthcare professionals for personalized advice.
      </p>
    </article>
  )
} 