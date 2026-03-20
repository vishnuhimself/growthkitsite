'use client'

import { useState } from 'react'
import { ToolLayout } from '@/app/components/tools/tool-layout'
import { ResultCard } from '@/app/components/tools/result-card'
import {
  calcIdealWeightChild,
  formatWeight,
  lbsToKg,
  feetInchesToCm,
  kgToLbs,
} from '@/app/lib/calculator-utils'

type UnitSystem = 'metric' | 'imperial'
type Sex = 1 | 2

export function IdealWeightChildCalculator() {
  const [units, setUnits] = useState<UnitSystem>('imperial')
  const [sex, setSex] = useState<Sex>(1)
  const [ageYears, setAgeYears] = useState('')
  const [ageMonthsStr, setAgeMonthsStr] = useState('0')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [heightCmStr, setHeightCmStr] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [weightKgStr, setWeightKgStr] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcIdealWeightChild> | null>(null)
  const [error, setError] = useState('')

  const isMetric = units === 'metric'

  function handleCalculate() {
    setError('')
    setResult(null)

    const years = parseFloat(ageYears) || 0
    const months = parseFloat(ageMonthsStr) || 0
    const totalAge = years + months / 12

    if (totalAge < 2 || totalAge > 20) { setError('This calculator is for children ages 2–20.'); return }

    const hCm = isMetric ? parseFloat(heightCmStr) || 0 : feetInchesToCm(parseFloat(heightFt) || 0, parseFloat(heightIn) || 0)
    if (hCm < 50 || hCm > 250) { setError('Please enter a valid height.'); return }

    const wKg = isMetric
      ? (weightKgStr ? parseFloat(weightKgStr) : undefined)
      : (weightLbs ? lbsToKg(parseFloat(weightLbs)) : undefined)

    const res = calcIdealWeightChild(totalAge, sex, hCm, wKg)
    if (!res) { setError('Could not calculate. Please check your inputs.'); return }
    setResult(res)
    setTimeout(() => document.getElementById('ideal-weight-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  return (
    <ToolLayout
      title="Healthy Weight for Children Calculator — By Age & Height"
      description="Find the healthy weight range for your child based on their age, sex, and height — using the CDC's BMI-for-age standards (5th to 85th percentile). Optionally enter your child's current weight to see where they fall."
      breadcrumb="Healthy Weight for Children"
      ctaHeading="Log your child's weight and track trends in GrowthKit"
      ctaSubtext="GrowthKit shows you whether each measurement is in the healthy range and plots the full history so you can see the trend at a glance."
      relatedTools={[
        { href: '/tools/child-growth-percentile', label: 'Growth Percentile Calculator' },
        { href: '/tools/bmi-calculator', label: 'BMI Calculator' },
        { href: '/tools/growth-velocity', label: 'Growth Velocity Calculator' },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button onClick={() => setUnits('imperial')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${units === 'imperial' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            Imperial (lbs / ft)
          </button>
          <button onClick={() => setUnits('metric')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${units === 'metric' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            Metric (kg / cm)
          </button>
        </div>

        <div className="p-6 md:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Child&apos;s Sex</label>
              <div className="flex gap-3">
                {([1, 2] as Sex[]).map((s) => (
                  <button key={s} onClick={() => setSex(s)}
                    className={`flex-1 py-2.5 rounded-md border text-sm font-semibold transition-colors ${sex === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {s === 1 ? '♂ Male' : '♀ Female'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age — Years</label>
              <input type="number" min="2" max="20" placeholder="e.g. 7"
                value={ageYears} onChange={(e) => setAgeYears(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <p className="mt-1.5 text-xs text-gray-400">Ages 2–20 only</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age — Months</label>
              <select value={ageMonthsStr} onChange={(e) => setAgeMonthsStr(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>{i} month{i !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {isMetric ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input type="number" min="50" max="250" placeholder="e.g. 122"
                  value={heightCmStr} onChange={(e) => setHeightCmStr(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input type="number" min="1" max="8" placeholder="ft"
                      value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    />
                    <p className="mt-1 text-xs text-gray-400">feet</p>
                  </div>
                  <div className="flex-1">
                    <input type="number" min="0" max="11" placeholder="in"
                      value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    />
                    <p className="mt-1 text-xs text-gray-400">inches</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Weight ({isMetric ? 'kg' : 'lbs'}) <span className="text-gray-400 font-normal">— optional</span></label>
              <input type="number" min="0" placeholder={isMetric ? 'e.g. 25' : 'e.g. 55'}
                value={isMetric ? weightKgStr : weightLbs}
                onChange={(e) => isMetric ? setWeightKgStr(e.target.value) : setWeightLbs(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <p className="mt-1.5 text-xs text-gray-400">Enter to check current status</p>
            </div>
          </div>

          {error && <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

          <button onClick={handleCalculate} className="mt-6 w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            Find Healthy Weight Range
          </button>
        </div>
      </div>

      {result && (
        <div id="ideal-weight-results" className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Healthy Weight Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard
              label="Healthy Weight Range"
              value={`${formatWeight(result.minKg, isMetric)} – ${formatWeight(result.maxKg, isMetric)}`}
              badge="5th–85th percentile"
              badgeColor="green"
              interpretation="Any weight in this range is considered healthy for your child's height, age, and sex per CDC standards."
              expandableContent={
                <p>The healthy range is defined as having a BMI-for-age between the 5th and 85th percentile. A child at the 5th percentile boundary weighs {formatWeight(result.minKg, isMetric)}, and at the 85th percentile boundary weighs {formatWeight(result.maxKg, isMetric)}.</p>
              }
            />
            {result.currentStatus && result.bmi && (
              <ResultCard
                label="Current Weight Status"
                value={result.currentStatus.category}
                badge={result.currentStatus.category}
                badgeColor={result.currentStatus.color as 'green' | 'yellow' | 'red' | 'blue'}
                interpretation={result.currentStatus.interpretation}
                subValues={[{ label: 'Current BMI', value: result.bmi.toFixed(1) }]}
              />
            )}
          </div>
          {/* Weight range bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Weight Range Visualization</h3>
            <div className="relative h-6 rounded-full overflow-hidden bg-gray-100">
              <div className="absolute inset-y-0 bg-green-200" style={{ left: '10%', width: '60%' }} />
              <div className="absolute inset-y-0 bg-yellow-200" style={{ left: '70%', width: '15%' }} />
              <div className="absolute inset-y-0 bg-red-200" style={{ left: '85%', right: '0' }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
              <span>Underweight</span>
              <span className="text-green-700 font-medium">{formatWeight(result.minKg, isMetric)} – {formatWeight(result.maxKg, isMetric)} (healthy)</span>
              <span>Overweight / Obese</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 prose prose-gray max-w-none">
        <h2>How Is the Healthy Weight Range Calculated?</h2>
        <p>
          This calculator uses the CDC&apos;s <strong>BMI-for-age percentile</strong> system. The healthy weight range is the weight that corresponds to a BMI between the 5th and 85th percentile for your child&apos;s specific age, sex, and height.
        </p>
        <p>
          Because children&apos;s bodies change dramatically as they grow, there is no single &quot;ideal weight&quot; number — it&apos;s always relative to height, age, and sex. A 7-year-old girl at 4&apos;0&quot; has a completely different healthy range than a 14-year-old boy at 5&apos;6&quot;.
        </p>

        <h2>What Does &quot;Healthy Weight&quot; Mean?</h2>
        <p>
          For children, <strong>healthy weight</strong> is defined by the CDC as a BMI-for-age between the 5th and 85th percentile. This is the same standard used by pediatricians at well-child visits.
        </p>
        <ul>
          <li>Below 5th percentile → Underweight</li>
          <li>5th to 85th percentile → Healthy Weight</li>
          <li>85th to 95th percentile → Overweight</li>
          <li>95th percentile and above → Obese</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4 not-prose mt-4">
          {[
            { q: "What's the healthy weight for a 5-year-old?", a: "It depends entirely on height and sex. A 5-year-old boy at 3'7\" (110 cm) has a healthy weight range of roughly 37–53 lbs (17–24 kg). Use this calculator with your child's specific measurements for an accurate range." },
            { q: "My child is outside the healthy range. What should I do?", a: "A single reading outside the range isn't cause for alarm. Discuss with your pediatrician, who will look at the growth trend over time, family history, and overall health before drawing conclusions." },
            { q: "This tool says my child is overweight but they look healthy. Why?", a: "BMI-based tools can misclassify muscular children as overweight. A child who is physically active and stocky may have a higher weight that looks high on the chart but is healthy for their body composition. Your pediatrician can put this in context." },
            { q: "My child is at the 85th percentile exactly. Is that a concern?", a: "The 85th percentile is the threshold between healthy and overweight categories. A child at exactly this boundary isn't in immediate concern but is worth monitoring to ensure the trend doesn't continue upward." },
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
