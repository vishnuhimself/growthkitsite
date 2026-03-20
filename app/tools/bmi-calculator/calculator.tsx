'use client'

import { useState } from 'react'
import { ToolLayout } from '@/app/components/tools/tool-layout'
import { ResultCard, PercentileBar } from '@/app/components/tools/result-card'
import {
  calcAdultBMI,
  calcGrowthPercentile,
  formatPercentile,
  formatHeight,
  formatWeight,
  lbsToKg,
  feetInchesToCm,
  kgToLbs,
  cmToInches,
} from '@/app/lib/calculator-utils'

type Mode = 'child' | 'adult'
type UnitSystem = 'metric' | 'imperial'
type Sex = 1 | 2

export function BMICalculator() {
  const [mode, setMode] = useState<Mode>('child')
  const [units, setUnits] = useState<UnitSystem>('imperial')
  const [sex, setSex] = useState<Sex>(1)
  const [ageYears, setAgeYears] = useState('')
  const [ageMonths, setAgeMonths] = useState('0')

  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [heightCmStr, setHeightCmStr] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [weightKgStr, setWeightKgStr] = useState('')

  const [childResult, setChildResult] = useState<ReturnType<typeof calcGrowthPercentile> | null>(null)
  const [adultResult, setAdultResult] = useState<ReturnType<typeof calcAdultBMI> | null>(null)
  const [error, setError] = useState('')

  const isMetric = units === 'metric'

  function handleCalculate() {
    setError('')
    setChildResult(null)
    setAdultResult(null)

    const hCm = isMetric ? parseFloat(heightCmStr) || 0 : feetInchesToCm(parseFloat(heightFt) || 0, parseFloat(heightIn) || 0)
    const wKg = isMetric ? parseFloat(weightKgStr) || 0 : lbsToKg(parseFloat(weightLbs) || 0)

    if (hCm < 30 || hCm > 250) { setError('Please enter a valid height.'); return }
    if (wKg < 1 || wKg > 400) { setError('Please enter a valid weight.'); return }

    if (mode === 'adult') {
      setAdultResult(calcAdultBMI(hCm, wKg))
    } else {
      const years = parseFloat(ageYears) || 0
      const months = parseFloat(ageMonths) || 0
      const totalAge = years + months / 12
      if (totalAge <= 0 || totalAge > 20) { setError('Please enter a valid age (0–20 years).'); return }
      const res = calcGrowthPercentile(totalAge, sex, hCm, wKg)
      if (!res) { setError('Could not calculate. Please check your inputs.'); return }
      setChildResult(res)
    }
    setTimeout(() => document.getElementById('bmi-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  return (
    <ToolLayout
      title="BMI Calculator for Kids & Adults — Free BMI-for-Age Percentile"
      description="Calculate Body Mass Index for children (with CDC age-specific percentile and weight category) or adults (with standard BMI ranges and healthy weight). Toggle between metric and imperial units."
      breadcrumb="BMI Calculator"
      ctaHeading="Monitor BMI trends over time in GrowthKit"
      ctaSubtext="GrowthKit auto-calculates BMI every time you log a measurement and displays your trend with beautiful velocity charts."
      relatedTools={[
        { href: '/tools/child-growth-percentile', label: 'Child Growth Percentile Calculator' },
        { href: '/tools/ideal-weight-child', label: 'Healthy Weight for Children' },
        { href: '/tools/weight-loss-calculator', label: 'Weight Loss Timeline Calculator' },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Mode + Units toggles */}
        <div className="flex border-b border-gray-200">
          <button onClick={() => setMode('child')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${mode === 'child' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            Child / Teen (2–20 yrs)
          </button>
          <button onClick={() => setMode('adult')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${mode === 'adult' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            Adult (20+ yrs)
          </button>
        </div>
        <div className="flex border-b border-gray-200">
          <button onClick={() => setUnits('imperial')} className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${units === 'imperial' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:bg-gray-50'}`}>
            Imperial (lbs / ft)
          </button>
          <button onClick={() => setUnits('metric')} className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${units === 'metric' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:bg-gray-50'}`}>
            Metric (kg / cm)
          </button>
        </div>

        <div className="p-6 md:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sex — child mode only */}
            {mode === 'child' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sex</label>
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
            )}

            {/* Age — child mode only */}
            {mode === 'child' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age — Years</label>
                  <input type="number" min="2" max="20" placeholder="e.g. 8"
                    value={ageYears} onChange={(e) => setAgeYears(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age — Months</label>
                  <select value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i} month{i !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Height */}
            {isMetric ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input type="number" min="50" max="250" placeholder="e.g. 170"
                  value={heightCmStr} onChange={(e) => setHeightCmStr(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                />
                <p className="mt-1.5 text-xs text-gray-400">Barefoot, standing straight</p>
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

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Weight ({isMetric ? 'kg' : 'lbs'})</label>
              <input type="number" min="0" placeholder={isMetric ? 'e.g. 65' : 'e.g. 145'}
                value={isMetric ? weightKgStr : weightLbs}
                onChange={(e) => isMetric ? setWeightKgStr(e.target.value) : setWeightLbs(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <p className="mt-1.5 text-xs text-gray-400">Without heavy clothing or shoes</p>
            </div>
          </div>

          {error && <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

          <button onClick={handleCalculate} className="mt-6 w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            Calculate BMI
          </button>
        </div>
      </div>

      {/* Child results */}
      {childResult && (
        <div id="bmi-results" className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">BMI Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard
              label="BMI Value"
              value={childResult.bmiValue.toFixed(1)}
              badge={childResult.bmiPercentile.category}
              badgeColor={childResult.bmiPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'}
              interpretation="BMI alone doesn't diagnose health — it's one data point among many."
            />
            <ResultCard
              label="BMI-for-Age Percentile"
              value={childResult.ageMonths >= 24 ? formatPercentile(childResult.bmiPercentile.percentile) : 'N/A (under 2)'}
              badge={childResult.ageMonths >= 24 ? childResult.bmiPercentile.category : undefined}
              badgeColor={childResult.bmiPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'}
              interpretation={childResult.bmiPercentile.interpretation}
              expandableContent={
                <ul className="list-disc pl-4 space-y-1">
                  <li>Under 5th %ile = Underweight</li>
                  <li>5th–85th %ile = Healthy Weight</li>
                  <li>85th–95th %ile = Overweight</li>
                  <li>95th %ile and above = Obese</li>
                </ul>
              }
            />
          </div>
          {childResult.ageMonths >= 24 && (
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">BMI Percentile Position</h3>
              <PercentileBar percentile={childResult.bmiPercentile.percentile} color={childResult.bmiPercentile.categoryColor as 'green' | 'yellow' | 'red' | 'blue'} />
            </div>
          )}
        </div>
      )}

      {/* Adult results */}
      {adultResult && (
        <div id="bmi-results" className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">BMI Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard
              label="Your BMI"
              value={adultResult.bmi.toFixed(1)}
              badge={adultResult.category}
              badgeColor={adultResult.categoryColor as 'green' | 'yellow' | 'orange' | 'red' | 'blue'}
              interpretation={adultResult.interpretation}
              expandableContent={
                <ul className="list-disc pl-4 space-y-1">
                  <li>Under 18.5 = Underweight</li>
                  <li>18.5–24.9 = Normal weight</li>
                  <li>25.0–29.9 = Overweight</li>
                  <li>30.0–34.9 = Obese (Class I)</li>
                  <li>35.0–39.9 = Obese (Class II)</li>
                  <li>40.0+ = Obese (Class III)</li>
                </ul>
              }
            />
            <ResultCard
              label="Healthy Weight Range"
              value={`${formatWeight(adultResult.healthyWeightRangeKg.min, isMetric)} – ${formatWeight(adultResult.healthyWeightRangeKg.max, isMetric)}`}
              badge="BMI 18.5–24.9"
              badgeColor="green"
              interpretation="The weight range corresponding to a healthy BMI at your height."
            />
          </div>
          {/* BMI scale visual */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">BMI Scale</h3>
            <div className="relative h-4 w-full rounded-full overflow-hidden flex">
              <div className="bg-blue-200" style={{ width: '18.5%' }} />
              <div className="bg-green-200" style={{ width: '12.4%' }} />
              <div className="bg-yellow-200" style={{ width: '10%' }} />
              <div className="bg-orange-200" style={{ width: '10%' }} />
              <div className="flex-1 bg-red-200" />
            </div>
            {/* Marker */}
            <div className="relative mt-1 h-2">
              {(() => {
                const bmiClamped = Math.max(14, Math.min(40, adultResult.bmi))
                const pct = ((bmiClamped - 14) / (40 - 14)) * 100
                return (
                  <div className="absolute top-0 w-0.5 h-4 bg-gray-800 -mt-3" style={{ left: `${pct}%` }}>
                    <div className="absolute -top-5 -translate-x-1/2 text-[10px] font-bold text-gray-800">{adultResult.bmi.toFixed(1)}</div>
                  </div>
                )
              })()}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-4 px-1">
              <span>14</span>
              <span>18.5 (UW)</span>
              <span>25 (OW)</span>
              <span>30 (Ob)</span>
              <span>40+</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 prose prose-gray max-w-none">
        <h2>How to Calculate BMI</h2>
        <p>BMI (Body Mass Index) = Weight (kg) ÷ Height (m)². In imperial: BMI = (Weight in lbs × 703) ÷ Height (in)².</p>
        <p>For example, a person 5&apos;6&quot; (167.6 cm) weighing 150 lbs (68 kg): BMI = 68 ÷ (1.676)² = <strong>24.2</strong> — Normal weight.</p>

        <h2>Why Is Child BMI Different from Adult BMI?</h2>
        <p>
          A BMI of 22 means something very different for a 6-year-old vs. a 30-year-old. Children&apos;s bodies change dramatically as they grow, so their BMI must be compared to peers of the same age and sex — this is called <strong>BMI-for-age percentile</strong>. Adult BMI uses fixed ranges regardless of age (for adults 20+).
        </p>

        <h2>Limitations of BMI</h2>
        <p>BMI is a screening tool, not a diagnostic one. It doesn&apos;t measure body fat directly and can misclassify:</p>
        <ul>
          <li>Muscular individuals as overweight</li>
          <li>Older adults with low muscle mass as normal weight despite excess fat</li>
          <li>People of different ethnicities (BMI cutoffs may differ)</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4 not-prose mt-4">
          {[
            { q: 'What is a healthy BMI for a child?', a: "For children, healthy weight is defined as a BMI-for-age between the 5th and 85th percentile for their age and sex — not a fixed BMI number. This is why age and sex are required for the child mode." },
            { q: 'My child has a high BMI but looks slim. Is that possible?', a: 'Yes. BMI is calculated from height and weight only — it does not distinguish between muscle and fat. A stocky, muscular child might score higher than a slimmer but less muscular one. Your pediatrician can provide context.' },
            { q: 'Does BMI apply to infants under 2?', a: 'No. For children under 2, pediatricians use weight-for-length rather than BMI. This calculator uses weight percentile as a proxy for infants.' },
            { q: 'Is a BMI of 25 always overweight?', a: 'For adults, BMI 25–29.9 is classified as overweight by WHO/CDC. However, some research suggests the overweight threshold should be adjusted for older adults and certain ethnic groups. Always discuss with your doctor.' },
            { q: 'How often should I track BMI?', a: "For children, BMI is typically checked at every annual well-child visit. For adults, once or twice a year is sufficient unless you're actively working toward a weight goal." },
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
