'use client'

import { useState } from 'react'
import { ToolLayout } from '@/app/components/tools/tool-layout'
import { ResultCard, PercentileBar } from '@/app/components/tools/result-card'
import {
  calcGrowthPercentile,
  formatPercentile,
  formatHeight,
  formatWeight,
  lbsToKg,
  kgToLbs,
  inchesToCm,
  cmToInches,
  feetInchesToCm,
  cmToFeetInches,
} from '@/app/lib/calculator-utils'

type UnitSystem = 'metric' | 'imperial'
type Sex = 1 | 2

export function ChildGrowthPercentileCalculator() {
  const [units, setUnits] = useState<UnitSystem>('imperial')
  const [sex, setSex] = useState<Sex>(1)
  const [ageYears, setAgeYears] = useState('')
  const [ageMonths, setAgeMonths] = useState('0')
  const [heightFeet, setHeightFeet] = useState('')
  const [heightInches, setHeightInchesState] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcGrowthPercentile> | null>(null)
  const [error, setError] = useState('')

  function handleCalculate() {
    setError('')
    setResult(null)

    const years = parseFloat(ageYears) || 0
    const months = parseFloat(ageMonths) || 0
    const totalAge = years + months / 12

    if (totalAge <= 0 || totalAge > 20) {
      setError('Please enter an age between 0 and 20 years.')
      return
    }

    let hCm: number
    let wKg: number

    if (units === 'imperial') {
      const ft = parseFloat(heightFeet) || 0
      const inc = parseFloat(heightInches) || 0
      hCm = feetInchesToCm(ft, inc)
      wKg = lbsToKg(parseFloat(weightLbs) || 0)
    } else {
      hCm = parseFloat(heightCm) || 0
      wKg = parseFloat(weightKg) || 0
    }

    if (hCm < 30 || hCm > 250) {
      setError('Please enter a valid height.')
      return
    }
    if (wKg < 1 || wKg > 250) {
      setError('Please enter a valid weight.')
      return
    }

    const res = calcGrowthPercentile(totalAge, sex, hCm, wKg)
    if (!res) {
      setError('Could not calculate percentile. Please check your inputs.')
      return
    }
    setResult(res)
    setTimeout(() => {
      document.getElementById('percentile-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const isMetric = units === 'metric'

  return (
    <ToolLayout
      title="Child Growth Percentile Calculator"
      description="Find out where your child's height, weight, and BMI fall on the growth chart — using official WHO (ages 0–2) and CDC (ages 2–20) standards."
      breadcrumb="Child Growth Percentile Calculator"
      ctaHeading="Track percentiles over time in GrowthKit"
      ctaSubtext="Log measurements for every family member and watch growth trends unfold with beautiful, interactive charts."
      relatedTools={[
        { href: '/tools/child-height-predictor', label: 'Child Height Predictor' },
        { href: '/tools/bmi-calculator', label: 'BMI Calculator' },
        { href: '/tools/ideal-weight-child', label: 'Healthy Weight for Children' },
        { href: '/tools/growth-velocity', label: 'Growth Velocity Calculator' },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Unit toggle */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setUnits('imperial')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${units === 'imperial' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Imperial (lbs / ft)
          </button>
          <button
            onClick={() => setUnits('metric')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${units === 'metric' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Metric (kg / cm)
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sex */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Child&apos;s Sex</label>
              <div className="flex gap-2">
                {([1, 2] as Sex[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 py-2.5 rounded-md border text-sm font-semibold transition-colors ${sex === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {s === 1 ? 'Male' : 'Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age — Years</label>
              <input
                type="number" min="0" max="20" placeholder="e.g. 3"
                value={ageYears} onChange={(e) => setAgeYears(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <p className="mt-1 text-xs text-gray-400">Enter 0 for infants under 1 year</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age — Months</label>
              <select
                value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>{i} month{i !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Height */}
            {isMetric ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number" min="30" max="250" placeholder="e.g. 95"
                  value={heightCm} onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                />
                <p className="mt-1 text-xs text-gray-400">Barefoot, standing straight</p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number" min="0" max="8" placeholder="ft"
                      value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    />
                    <p className="mt-1 text-xs text-gray-400">feet</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number" min="0" max="11" placeholder="in"
                      value={heightInches} onChange={(e) => setHeightInchesState(e.target.value)}
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    />
                    <p className="mt-1 text-xs text-gray-400">inches</p>
                  </div>
                </div>
              </div>
            )}

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Weight ({isMetric ? 'kg' : 'lbs'})</label>
              <input
                type="number" min="0" placeholder={isMetric ? 'e.g. 14' : 'e.g. 32'}
                value={isMetric ? weightKg : weightLbs}
                onChange={(e) => isMetric ? setWeightKg(e.target.value) : setWeightLbs(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <p className="mt-1 text-xs text-gray-400">Without heavy clothing</p>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleCalculate}
            className="mt-6 w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors"
          >
            Calculate Percentiles
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div id="percentile-results" className="mt-10 space-y-5">
          <h2 className="text-2xl font-bold text-gray-900">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              label="Height Percentile"
              value={formatPercentile(result.heightPercentile.percentile)}
              badge={result.heightPercentile.category}
              badgeColor={result.heightPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'}
              interpretation={result.heightPercentile.interpretation}
              expandableContent={
                <p>Your child is taller than <strong>{result.heightPercentile.percentile.toFixed(0)}%</strong> of children the same age and sex. A single reading matters less than the trend over time.</p>
              }
            />
            <ResultCard
              label="Weight Percentile"
              value={formatPercentile(result.weightPercentile.percentile)}
              badge={result.weightPercentile.category}
              badgeColor={result.weightPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'}
              interpretation={result.weightPercentile.interpretation}
              expandableContent={
                <p>Your child weighs more than <strong>{result.weightPercentile.percentile.toFixed(0)}%</strong> of children the same age and sex. Consistent growth along any curve is the key sign of health.</p>
              }
            />
            <ResultCard
              label="BMI-for-Age Percentile"
              value={result.ageMonths >= 24 ? formatPercentile(result.bmiPercentile.percentile) : 'N/A (under 2)'}
              badge={result.ageMonths >= 24 ? result.bmiPercentile.category : undefined}
              badgeColor={result.bmiPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'}
              interpretation={result.ageMonths >= 24 ? result.bmiPercentile.interpretation : 'BMI-for-age is not used under 2. Weight-for-length is the standard.'}
              subValues={[{ label: 'BMI Value', value: result.bmiValue.toFixed(1) }]}
              expandableContent={
                <div className="space-y-1.5">
                  <p>For children, BMI is always interpreted against age and sex norms.</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Under 5th %ile = Underweight</li>
                    <li>5th–85th %ile = Healthy Weight</li>
                    <li>85th–95th %ile = Overweight</li>
                    <li>95th %ile+ = Obese</li>
                  </ul>
                </div>
              }
            />
          </div>

          {/* Percentile bars */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Growth Chart Position</h3>
            <PercentileBar percentile={result.heightPercentile.percentile} label="Height" color={result.heightPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'} />
            <PercentileBar percentile={result.weightPercentile.percentile} label="Weight" color={result.weightPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'} />
            {result.ageMonths >= 24 && (
              <PercentileBar percentile={result.bmiPercentile.percentile} label="BMI-for-Age" color={result.bmiPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'} />
            )}
            <p className="text-xs text-gray-400">Zones: blue = below 5th, green = 5th–85th (healthy), yellow = 85th–95th, red = above 95th.</p>
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Age', value: `${Math.floor(result.ageMonths / 12)} yr ${Math.round(result.ageMonths % 12)} mo` },
              { label: 'Height', value: formatHeight(result.heightCm, isMetric) },
              { label: 'Weight', value: formatWeight(result.weightKg, isMetric) },
              { label: 'Data source', value: result.ageMonths <= 24 ? 'WHO' : 'CDC 2000' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editorial SEO content */}
      <div className="mt-14 prose prose-gray max-w-none">
        <h2>How to Use the Child Growth Percentile Calculator</h2>
        <p>
          Enter your child&apos;s sex, age (years and months), height, and weight. Select metric (cm/kg) or imperial (ft-in/lbs) units. Click <em>Calculate Percentiles</em> to instantly see your child&apos;s height percentile, weight percentile, and BMI-for-age percentile with plain-English interpretations.
        </p>

        <h2>What Are Growth Percentiles?</h2>
        <p>
          A growth percentile tells you how your child&apos;s measurement compares to a reference group of children the same age and sex. If your child is at the <strong>60th percentile for height</strong>, they are taller than 60% of children their age.
        </p>
        <p>
          There is no single &quot;correct&quot; percentile. A child consistently at the 20th percentile is growing just as healthily as one at the 80th — what matters is a <strong>stable growth curve over time</strong>.
        </p>

        <h2>WHO vs. CDC — Which Standard Does This Calculator Use?</h2>
        <p>
          This calculator uses the <strong>WHO Child Growth Standards</strong> for children aged 0–2 years, and the <strong>CDC 2000 Growth Charts</strong> for children aged 2–20 years. This matches the AAP and CDC recommendation:
        </p>
        <ul>
          <li><strong>WHO (0–2 years):</strong> Based on optimally-fed, healthy children worldwide. Ideal growth reference for infants.</li>
          <li><strong>CDC (2–20 years):</strong> Based on U.S. survey data. Standard reference for school-age children and adolescents.</li>
        </ul>

        <h2>Understanding BMI-for-Age in Children</h2>
        <ul>
          <li>Below 5th percentile → Underweight</li>
          <li>5th to below 85th percentile → Healthy Weight</li>
          <li>85th to below 95th percentile → Overweight</li>
          <li>95th percentile and above → Obese</li>
        </ul>
        <p>BMI-for-age is not used for children under 2. For infants, weight-for-length is the standard.</p>

        <h2>When Should You Be Concerned?</h2>
        <ul>
          <li>Your child&apos;s percentile drops significantly between checkups</li>
          <li>Height and weight percentiles are very far apart</li>
          <li>Your child falls below the 3rd or above the 97th percentile</li>
          <li>A sudden, unexplained change in growth rate</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-3 not-prose mt-4">
          {[
            { q: 'Is the 50th percentile the healthiest?', a: 'No. Any percentile between roughly the 5th and 95th is considered healthy. A child at the 15th percentile who has consistently grown along that curve is just as healthy as one at the 70th.' },
            { q: 'What does it mean if my baby dropped from the 60th to the 40th percentile?', a: 'Small drops are common and often reflect temporary factors like illness or feeding changes. A consistent downward trend over several measurements is more significant.' },
            { q: 'My child is below the 5th percentile. Should I worry?', a: 'Not necessarily. Many healthy children fall below the 5th percentile, especially if parents are small. Your pediatrician will look at velocity, family history, and overall health.' },
            { q: 'At what age does BMI-for-age start?', a: 'BMI-for-age is tracked from age 2 years onward. For infants, pediatricians use weight-for-length.' },
            { q: 'Can I use this for a premature baby?', a: "Use the baby's corrected (adjusted) age rather than chronological age. Use our Premature Baby Corrected Age Calculator first." },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-semibold text-sm text-gray-800 mb-1.5">{q}</p>
              <p className="text-sm text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  )
}
