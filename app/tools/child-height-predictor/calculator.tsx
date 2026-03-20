'use client'

import { useState } from 'react'
import { ToolLayout } from '@/app/components/tools/tool-layout'
import { ResultCard } from '@/app/components/tools/result-card'
import {
  predictHeightMidParental,
  predictHeightWithChild,
  formatHeight,
  lbsToKg,
  inchesToCm,
  feetInchesToCm,
  cmToFeetInches,
} from '@/app/lib/calculator-utils'

type UnitSystem = 'metric' | 'imperial'
type Sex = 1 | 2

function parseHeight(feet: string, inches: string): number {
  return feetInchesToCm(parseFloat(feet) || 0, parseFloat(inches) || 0)
}

export function ChildHeightPredictorCalculator() {
  const [units, setUnits] = useState<UnitSystem>('imperial')
  const [childSex, setChildSex] = useState<Sex>(1)
  const [childAgeFeet, setChildAgeFeet] = useState('')
  const [childAgeYears, setChildAgeYears] = useState('')

  const [fatherHFt, setFatherHFt] = useState('')
  const [fatherHIn, setFatherHIn] = useState('')
  const [fatherHCm, setFatherHCm] = useState('')

  const [motherHFt, setMotherHFt] = useState('')
  const [motherHIn, setMotherHIn] = useState('')
  const [motherHCm, setMotherHCm] = useState('')

  const [childHFt, setChildHFt] = useState('')
  const [childHIn, setChildHIn] = useState('')
  const [childHCm, setChildHCm] = useState('')

  const [result, setResult] = useState<ReturnType<typeof predictHeightMidParental> | null>(null)
  const [error, setError] = useState('')

  const isMetric = units === 'metric'

  function getHeightCm(ft: string, inc: string, cm: string): number {
    return isMetric ? parseFloat(cm) || 0 : feetInchesToCm(parseFloat(ft) || 0, parseFloat(inc) || 0)
  }

  function handleCalculate() {
    setError('')
    setResult(null)

    const fatherH = getHeightCm(fatherHFt, fatherHIn, fatherHCm)
    const motherH = getHeightCm(motherHFt, motherHIn, motherHCm)

    if (fatherH < 100 || fatherH > 230) {
      setError("Please enter a valid father's height.")
      return
    }
    if (motherH < 100 || motherH > 210) {
      setError("Please enter a valid mother's height.")
      return
    }

    const childH = getHeightCm(childHFt, childHIn, childHCm)
    const childAge = parseFloat(childAgeYears) || 0

    let res: ReturnType<typeof predictHeightMidParental>
    if (childH > 30 && childAge > 0) {
      res = predictHeightWithChild(motherH, fatherH, childH, childAge, childSex)
    } else {
      res = predictHeightMidParental(motherH, fatherH, childSex)
    }

    setResult(res)
    setTimeout(() => {
      document.getElementById('height-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  function HeightInput({
    label,
    ftVal, setFt,
    inVal, setIn,
    cmVal, setCm,
    hint,
  }: {
    label: string
    ftVal: string; setFt: (v: string) => void
    inVal: string; setIn: (v: string) => void
    cmVal: string; setCm: (v: string) => void
    hint?: string
  }) {
    if (isMetric) {
      return (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{label} (cm)</label>
          <input
            type="number" min="100" max="230" placeholder="e.g. 175"
            value={cmVal} onChange={(e) => setCm(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
          />
          {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
        </div>
      )
    }
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="number" min="3" max="8" placeholder="ft"
              value={ftVal} onChange={(e) => setFt(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <p className="mt-1 text-xs text-gray-400">feet</p>
          </div>
          <div className="flex-1">
            <input
              type="number" min="0" max="11" placeholder="in"
              value={inVal} onChange={(e) => setIn(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <p className="mt-1 text-xs text-gray-400">inches</p>
          </div>
        </div>
        {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
      </div>
    )
  }

  const midPtLabel = result ? formatHeight(result.midParentalCm, isMetric) : ''
  const predictedLabel = result ? formatHeight(result.predictedCm, isMetric) : ''
  const rangeLowLabel = result ? formatHeight(result.rangeLowCm, isMetric) : ''
  const rangeHighLabel = result ? formatHeight(result.rangeHighCm, isMetric) : ''

  return (
    <ToolLayout
      title="Child Height Predictor Calculator — How Tall Will My Child Be?"
      description="Estimate your child's adult height based on both parents' heights. Uses the clinically-validated mid-parental height method. Results are given as a predicted range, typically accurate to ±2–3 inches (5–8 cm)."
      breadcrumb="Child Height Predictor"
      ctaHeading="Track your child's height journey in GrowthKit"
      ctaSubtext="Log measurements over time and see if your child is tracking toward their predicted height. Beautiful charts for the whole family."
      relatedTools={[
        { href: '/tools/child-growth-percentile', label: 'Growth Percentile Calculator' },
        { href: '/tools/growth-velocity', label: 'Growth Velocity Calculator' },
        { href: '/tools/bmi-calculator', label: 'BMI Calculator' },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button onClick={() => setUnits('imperial')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${units === 'imperial' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            Imperial (ft / in)
          </button>
          <button onClick={() => setUnits('metric')} className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${units === 'metric' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            Metric (cm)
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Child sex */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Child&apos;s Sex</label>
            <div className="flex gap-3">
              {([1, 2] as Sex[]).map((s) => (
                <button key={s} onClick={() => setChildSex(s)}
                  className={`flex-1 py-2.5 rounded-md border text-sm font-semibold transition-colors ${childSex === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {s === 1 ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HeightInput label="Father's Height" ftVal={fatherHFt} setFt={setFatherHFt} inVal={fatherHIn} setIn={setFatherHIn} cmVal={fatherHCm} setCm={setFatherHCm} hint="Biological father's height" />
            <HeightInput label="Mother's Height" ftVal={motherHFt} setFt={setMotherHFt} inVal={motherHIn} setIn={setMotherHIn} cmVal={motherHCm} setCm={setMotherHCm} hint="Biological mother's height" />
          </div>

          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm font-semibold text-gray-600 mb-4">Optional: Child&apos;s Current Measurements <span className="text-gray-400 font-normal">(improves accuracy)</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Child&apos;s Current Age (years)</label>
                <input
                  type="number" min="0" max="18" placeholder="e.g. 7"
                  value={childAgeYears} onChange={(e) => setChildAgeYears(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <HeightInput label="Child's Current Height" ftVal={childHFt} setFt={setChildHFt} inVal={childHIn} setIn={setChildHIn} cmVal={childHCm} setCm={setChildHCm} hint="Leave blank to use parent heights only" />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <button onClick={handleCalculate} className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            Predict Adult Height
          </button>
        </div>
      </div>

      {result && (
        <div id="height-results" className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Predicted Adult Height</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              label="Most Likely Adult Height"
              value={predictedLabel}
              badge="Prediction"
              badgeColor="blue"
              interpretation={`Based on ${result.method}. This is the midpoint of the predicted range.`}
            />
            <ResultCard
              label="Predicted Range"
              value={`${rangeLowLabel} – ${rangeHighLabel}`}
              badge="±2–3 inches"
              badgeColor="gray"
              interpretation="The range in which ~95% of children with similar genetics fall."
              expandableContent={
                <p>Height prediction is never exact. Genetics accounts for ~80% of final height. Nutrition, sleep, physical activity, and overall health make up the remaining ~20%.</p>
              }
            />
            <ResultCard
              label="Mid-Parental Height"
              value={midPtLabel}
              badge="Genetic Baseline"
              badgeColor="green"
              interpretation={`The genetic &quot;target&quot; height based on parents' average. Your child's predicted height adjusts from this baseline.`}
            />
          </div>

          {/* Visual height bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Predicted Height Range</h3>
            <div className="relative h-8 w-full rounded-full bg-gray-100 overflow-hidden">
              {/* Range band */}
              {(() => {
                const scaleMin = result.rangeLowCm - 15
                const scaleMax = result.rangeHighCm + 15
                const rangeW = ((result.rangeHighCm - result.rangeLowCm) / (scaleMax - scaleMin)) * 100
                const rangeStart = ((result.rangeLowCm - scaleMin) / (scaleMax - scaleMin)) * 100
                const midPos = ((result.predictedCm - scaleMin) / (scaleMax - scaleMin)) * 100
                return (
                  <>
                    <div className="absolute top-0 bottom-0 bg-blue-200 rounded-full" style={{ left: `${rangeStart}%`, width: `${rangeW}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow" style={{ left: `${midPos}%`, marginLeft: '-8px' }} />
                  </>
                )
              })()}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{rangeLowLabel} (low)</span>
              <span className="font-semibold text-blue-700">{predictedLabel} (predicted)</span>
              <span>{rangeHighLabel} (high)</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 prose prose-gray max-w-none">
        <h2>How Does the Child Height Predictor Work?</h2>
        <p>
          This calculator uses the <strong>mid-parental height method</strong>, the most widely-used clinical approach for predicting a child&apos;s adult height. The formula is:
        </p>
        <ul>
          <li><strong>For boys:</strong> (Father&apos;s height + Mother&apos;s height + 13 cm) ÷ 2</li>
          <li><strong>For girls:</strong> (Father&apos;s height + Mother&apos;s height − 13 cm) ÷ 2</li>
        </ul>
        <p>
          When you provide your child&apos;s current height and age, the calculator blends the mid-parental prediction with a growth-trajectory projection for improved accuracy.
        </p>

        <h2>How Accurate Is Height Prediction?</h2>
        <p>
          Height predictions using the mid-parental method are generally accurate to within <strong>±2 inches (5 cm)</strong> for most children. The prediction becomes more accurate as children get older and approach their adult height. Predictions for young children (under age 5) carry more uncertainty.
        </p>
        <p>
          Several factors can cause actual adult height to deviate from the prediction:
        </p>
        <ul>
          <li>Chronic illness or nutritional deficiencies during growth years</li>
          <li>Growth hormone disorders</li>
          <li>Early or delayed puberty</li>
          <li>Genetic variation beyond what parents&apos; heights capture</li>
        </ul>

        <h2>What Is Mid-Parental Height?</h2>
        <p>
          The mid-parental height is the genetic target height calculated by averaging both biological parents&apos; heights and applying a gender adjustment. It reflects the hereditary component of height — roughly 60–80% of a person&apos;s final height is determined by genetics.
        </p>
        <p>
          Children typically fall within one standard deviation (~8.5 cm or ~3.3 inches) of their mid-parental target height. Those who fall outside this range may warrant evaluation for underlying growth factors.
        </p>

        <h2>When Do Children Stop Growing?</h2>
        <p>
          Growth typically stops when the growth plates in the bones close after puberty:
        </p>
        <ul>
          <li><strong>Girls:</strong> Usually stop growing around age 14–16, about 2 years after their first menstrual period</li>
          <li><strong>Boys:</strong> Usually stop growing around age 16–18, after puberty is complete</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4 not-prose mt-4">
          {[
            {
              q: "How accurate is the height prediction for a 2-year-old?",
              a: "For very young children, predictions are less accurate because a lot of growth — including puberty — is yet to come. The ±2–3 inch range gets larger for younger children. Monitoring growth velocity over time gives better insight.",
            },
            {
              q: "Does nutrition affect how tall my child will be?",
              a: "Yes — while genetics sets the ceiling, nutrition determines whether your child reaches their genetic potential. Adequate protein, calcium, vitamin D, and overall calories are essential for optimal growth.",
            },
            {
              q: "My child is well below the predicted height range. What should I do?",
              a: "A single measurement doesn't tell the whole story. If your child's growth velocity is normal and they're tracking consistently on their growth curve, they may just be growing slower initially. If you notice a consistent gap or sudden slowdown, consult your pediatrician.",
            },
            {
              q: "Can this predict height for adopted children?",
              a: "The mid-parental method uses biological parents' heights. For adopted children without biological parent information, this calculator won't give accurate results — in that case, monitoring growth percentiles over time is more useful.",
            },
            {
              q: "Does the formula change for very tall or very short parents?",
              a: "The mid-parental formula is most accurate when both parents fall within a typical height range. For parents at the extremes (very tall or very short), regression to the population mean means children often end up closer to average than the formula predicts.",
            },
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
