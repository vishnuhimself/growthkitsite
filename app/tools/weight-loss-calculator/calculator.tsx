'use client'

import { useState } from 'react'
import { ToolLayout } from '@/app/components/tools/tool-layout'
import { ResultCard } from '@/app/components/tools/result-card'
import {
  calcWeightLoss,
  formatWeight,
  lbsToKg,
  feetInchesToCm,
  kgToLbs,
} from '@/app/lib/calculator-utils'

type UnitSystem = 'metric' | 'imperial'
type Sex = 1 | 2

const ACTIVITY_OPTIONS = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise, desk job' },
  { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1–3 days/week' },
  { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3–5 days/week' },
  { value: 'active', label: 'Very Active', desc: 'Hard exercise 6–7 days/week' },
  { value: 'very_active', label: 'Extra Active', desc: 'Very hard exercise or physical job' },
]

export function WeightLossCalculator() {
  const [units, setUnits] = useState<UnitSystem>('imperial')
  const [sex, setSex] = useState<Sex>(1)
  const [age, setAge] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [heightCmStr, setHeightCmStr] = useState('')
  const [currentWeightLbs, setCurrentWeightLbs] = useState('')
  const [goalWeightLbs, setGoalWeightLbs] = useState('')
  const [currentWeightKg, setCurrentWeightKg] = useState('')
  const [goalWeightKg, setGoalWeightKg] = useState('')
  const [activity, setActivity] = useState('moderate')
  const [result, setResult] = useState<ReturnType<typeof calcWeightLoss> | null>(null)
  const [error, setError] = useState('')

  const isMetric = units === 'metric'

  function handleCalculate() {
    setError('')
    setResult(null)

    const hCm = isMetric ? parseFloat(heightCmStr) || 0 : feetInchesToCm(parseFloat(heightFt) || 0, parseFloat(heightIn) || 0)
    const curW = isMetric ? parseFloat(currentWeightKg) || 0 : lbsToKg(parseFloat(currentWeightLbs) || 0)
    const goalW = isMetric ? parseFloat(goalWeightKg) || 0 : lbsToKg(parseFloat(goalWeightLbs) || 0)
    const ageVal = parseFloat(age) || 0

    if (hCm < 100 || hCm > 250) { setError('Please enter a valid height.'); return }
    if (curW < 30 || curW > 400) { setError('Please enter a valid current weight.'); return }
    if (goalW < 30 || goalW > 400) { setError('Please enter a valid goal weight.'); return }
    if (ageVal < 15 || ageVal > 100) { setError('Please enter a valid age (15–100).'); return }

    const res = calcWeightLoss(curW, goalW, hCm, ageVal, sex, activity)
    setResult(res)
    setTimeout(() => document.getElementById('wl-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  function formatDate(d: Date): string {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  return (
    <ToolLayout
      title="Weight Loss Timeline Calculator — How Long to Reach Your Goal Weight"
      description="Get a realistic, science-based estimate of how long it will take to reach your target weight. Based on the Mifflin-St Jeor BMR formula and WHO safe weight loss guidelines of 0.5–1 kg (1–2 lbs) per week."
      breadcrumb="Weight Loss Timeline Calculator"
      ctaHeading="Track your weight loss journey in GrowthKit"
      ctaSubtext="Log your weekly weigh-ins in GrowthKit and watch your progress trend toward your goal with beautiful charts."
      relatedTools={[
        { href: '/tools/bmi-calculator', label: 'BMI Calculator' },
        { href: '/tools/child-growth-percentile', label: 'Child Growth Percentile Calculator' },
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
            {/* Sex */}
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

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age (years)</label>
              <input type="number" min="15" max="100" placeholder="e.g. 32"
                value={age} onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Height */}
            {isMetric ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input type="number" min="100" max="250" placeholder="e.g. 170"
                  value={heightCmStr} onChange={(e) => setHeightCmStr(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input type="number" min="3" max="8" placeholder="ft"
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

            {/* Current weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Weight ({isMetric ? 'kg' : 'lbs'})</label>
              <input type="number" min="0" placeholder={isMetric ? 'e.g. 85' : 'e.g. 185'}
                value={isMetric ? currentWeightKg : currentWeightLbs}
                onChange={(e) => isMetric ? setCurrentWeightKg(e.target.value) : setCurrentWeightLbs(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Goal weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Weight ({isMetric ? 'kg' : 'lbs'})</label>
              <input type="number" min="0" placeholder={isMetric ? 'e.g. 70' : 'e.g. 155'}
                value={isMetric ? goalWeightKg : goalWeightLbs}
                onChange={(e) => isMetric ? setGoalWeightKg(e.target.value) : setGoalWeightLbs(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Activity level */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Activity Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {ACTIVITY_OPTIONS.map((opt) => (
                  <button key={opt.value} onClick={() => setActivity(opt.value)}
                    className={`rounded-md border p-3 text-left transition-colors ${activity === opt.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <p className={`text-sm font-semibold ${activity === opt.value ? 'text-gray-900' : 'text-gray-700'}`}>{opt.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

          <button onClick={handleCalculate} className="mt-6 w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            Calculate Weight Loss Timeline
          </button>
        </div>
      </div>

      {result && (
        <div id="wl-results" className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Weight Loss Plan</h2>

          {/* Recommendation banner */}
          <div className={`rounded-xl border p-4 ${result.isGoalSafe ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
            <p className={`text-sm font-medium ${result.isGoalSafe ? 'text-blue-800' : 'text-amber-800'}`}>{result.recommendation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              label="Estimated Time to Goal"
              value={result.isGoalSafe ? `${Math.round(result.weeksToGoal)} weeks` : 'N/A'}
              badge={result.isGoalSafe ? `By ${formatDate(result.targetDate)}` : 'Goal above current'}
              badgeColor={result.isGoalSafe ? 'green' : 'gray'}
              interpretation={result.isGoalSafe ? `At a safe pace of ${result.weeklyLossKg.toFixed(2)} kg/week.` : 'Your goal weight is higher than your current weight.'}
            />
            <ResultCard
              label="Daily Calorie Deficit"
              value={`${Math.round(result.dailyDeficit)} cal`}
              badge="Recommended"
              badgeColor="blue"
              interpretation={`Eat ~${Math.round(result.tdee - result.dailyDeficit)} calories/day to lose weight safely.`}
              subValues={[
                { label: 'Your TDEE', value: `${Math.round(result.tdee)} cal/day` },
                { label: 'Your BMR', value: `${Math.round(result.bmr)} cal/day` },
              ]}
              expandableContent={
                <div className="space-y-1">
                  <p><strong>BMR</strong> (Basal Metabolic Rate) = calories your body burns at rest.</p>
                  <p><strong>TDEE</strong> (Total Daily Energy Expenditure) = BMR × activity multiplier. This is your maintenance calories.</p>
                  <p>To lose weight, eat fewer than your TDEE. The deficit determines the pace of loss.</p>
                </div>
              }
            />
            <ResultCard
              label="Current BMI → Goal BMI"
              value={`${result.bmiCurrent.bmi.toFixed(1)} → ${result.bmiGoal.bmi.toFixed(1)}`}
              badge={result.bmiGoal.category}
              badgeColor={result.bmiGoal.categoryColor as 'green' | 'yellow' | 'red' | 'blue'}
              interpretation={`You'll go from ${result.bmiCurrent.category} to ${result.bmiGoal.category} when you reach your goal.`}
            />
          </div>

          {/* Progress bar: current → goal BMI */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">BMI Journey</h3>
            <div className="relative h-4 w-full rounded-full overflow-hidden flex">
              <div className="bg-blue-200" style={{ width: '18.5%' }} />
              <div className="bg-green-200" style={{ width: '12.4%' }} />
              <div className="bg-yellow-200" style={{ width: '10%' }} />
              <div className="flex-1 bg-red-200" />
            </div>
            <div className="relative mt-1">
              {[
                { bmi: result.bmiCurrent.bmi, label: `Now (${result.bmiCurrent.bmi.toFixed(1)})`, color: '#6b7280' },
                { bmi: result.bmiGoal.bmi, label: `Goal (${result.bmiGoal.bmi.toFixed(1)})`, color: '#22c55e' },
              ].map(({ bmi, label, color }) => {
                const clamped = Math.max(14, Math.min(40, bmi))
                const pct = ((clamped - 14) / (40 - 14)) * 100
                return (
                  <div key={label} className="absolute -top-2" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
                    <div className="w-1 h-6 mx-auto" style={{ backgroundColor: color }} />
                    <p className="text-[10px] font-medium whitespace-nowrap mt-1" style={{ color }}>{label}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-8 px-1">
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
        <h2>How Does This Weight Loss Calculator Work?</h2>
        <p>
          This calculator uses the <strong>Mifflin-St Jeor equation</strong> — the gold standard for estimating Basal Metabolic Rate (BMR) — to calculate how many calories your body burns at rest. Your TDEE (Total Daily Energy Expenditure) is then calculated by multiplying BMR by your activity level.
        </p>
        <p>
          To lose weight, you need to eat fewer calories than your TDEE. Since 1 kg of body fat ≈ 7,700 kcal, a 500 cal/day deficit leads to ~0.45 kg (1 lb) loss per week — a safe, sustainable pace.
        </p>

        <h2>What Is a Safe Rate of Weight Loss?</h2>
        <p>
          Health authorities including the WHO, CDC, and NHS recommend losing no more than <strong>0.5–1 kg (1–2 lbs) per week</strong>. Faster rates often lead to:
        </p>
        <ul>
          <li>Muscle loss (not just fat)</li>
          <li>Nutritional deficiencies</li>
          <li>Metabolic adaptation (your body burns fewer calories to compensate)</li>
          <li>Higher risk of weight regain</li>
        </ul>
        <p>This calculator stays within safe bounds — the maximum recommended deficit is 1,000 cal/day.</p>

        <h2>BMR vs. TDEE — What&apos;s the Difference?</h2>
        <ul>
          <li><strong>BMR</strong> = calories burned just to stay alive (at complete rest). Breathing, organ function, temperature regulation.</li>
          <li><strong>TDEE</strong> = BMR × activity multiplier. This is your true daily calorie burn including exercise and daily movement.</li>
          <li>You should never eat below your BMR for extended periods — doing so is metabolically harmful.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4 not-prose mt-4">
          {[
            { q: 'How accurate is this timeline?', a: 'This is a mathematical estimate based on your inputs. Real-world results vary based on metabolic adaptation, stress, sleep, hormones, and adherence. Treat it as a guideline, not a guarantee. Most people lose more weight in the first few weeks (water weight) and slower thereafter.' },
            { q: 'My TDEE is 2,000 — how many calories should I eat?', a: 'For 0.5 kg/week loss: 2,000 − 500 = 1,500 cal/day. For 1 kg/week: 2,000 − 1,000 = 1,000 cal/day (usually the minimum safe range). Never eat below your BMR without medical supervision.' },
            { q: "The calculator says it'll take over a year. Is that realistic?", a: "For larger goals (15+ kg), a year or more is very realistic and healthy. Slow, consistent loss is more sustainable and leads to better long-term outcomes. \"Crash\" diets with large deficits lead to rebound weight gain in most cases." },
            { q: 'Do I need to count calories exactly?', a: 'Not necessarily. Many people achieve their deficit by making better food choices rather than precise counting. The deficit calculation gives you a target to aim for — how you achieve it is flexible.' },
            { q: 'Why does sex affect the calculation?', a: 'The Mifflin-St Jeor equation uses different constants for males and females because, on average, men have more muscle mass and higher BMR at the same height and weight.' },
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
