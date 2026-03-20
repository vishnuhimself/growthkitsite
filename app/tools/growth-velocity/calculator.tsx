'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { ToolLayout } from '@/app/components/tools/tool-layout'
import { ResultCard } from '@/app/components/tools/result-card'
import { calcGrowthVelocity, feetInchesToCm, inchesToCm } from '@/app/lib/calculator-utils'

type UnitSystem = 'metric' | 'imperial'
type Sex = 1 | 2

interface MeasurementRow {
  id: number
  date: string
  heightFt: string
  heightIn: string
  heightCm: string
  ageYears: string
}

let nextId = 3

export function GrowthVelocityCalculator() {
  const [units, setUnits] = useState<UnitSystem>('imperial')
  const [sex, setSex] = useState<Sex>(1)
  const [rows, setRows] = useState<MeasurementRow[]>([
    { id: 1, date: '', heightFt: '', heightIn: '', heightCm: '', ageYears: '' },
    { id: 2, date: '', heightFt: '', heightIn: '', heightCm: '', ageYears: '' },
  ])
  const [result, setResult] = useState<ReturnType<typeof calcGrowthVelocity> | null>(null)
  const [error, setError] = useState('')

  const isMetric = units === 'metric'

  function updateRow(id: number, field: keyof MeasurementRow, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  function addRow() {
    setRows((prev) => [...prev, { id: nextId++, date: '', heightFt: '', heightIn: '', heightCm: '', ageYears: '' }])
  }

  function removeRow(id: number) {
    if (rows.length <= 2) return
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function getHeightCm(row: MeasurementRow): number {
    return isMetric
      ? parseFloat(row.heightCm) || 0
      : feetInchesToCm(parseFloat(row.heightFt) || 0, parseFloat(row.heightIn) || 0)
  }

  function handleCalculate() {
    setError('')
    setResult(null)

    const validRows = rows.filter((r) => {
      const h = getHeightCm(r)
      return r.date && h > 30 && h < 250
    })

    if (validRows.length < 2) {
      setError('Please enter at least 2 measurements with a date and height.')
      return
    }

    // Sort by date
    const sorted = [...validRows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const first = sorted[0]
    const last = sorted[sorted.length - 1]

    const m1 = {
      date: first.date,
      heightCm: getHeightCm(first),
      ageYears: parseFloat(first.ageYears) || undefined,
    }
    const m2 = {
      date: last.date,
      heightCm: getHeightCm(last),
      ageYears: parseFloat(last.ageYears) || undefined,
    }

    const daysDiff = (new Date(last.date).getTime() - new Date(first.date).getTime()) / (1000 * 60 * 60 * 24)
    if (daysDiff < 30) {
      setError('Please enter measurements at least 1 month apart for an accurate growth rate.')
      return
    }

    const res = calcGrowthVelocity(m1, m2, sex)
    setResult(res)
    setTimeout(() => document.getElementById('velocity-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const colorMap = { normal: 'green', low: 'yellow', high: 'blue' } as const

  return (
    <ToolLayout
      title="Child Growth Velocity Calculator — Track Height Growth Rate"
      description="Enter two or more height measurements with dates to calculate your child's growth rate in cm/year and compare it to WHO age-appropriate norms. Instantly see if growth is normal, fast, or slow."
      breadcrumb="Growth Velocity Calculator"
      ctaHeading="This is GrowthKit's signature feature"
      ctaSubtext="GrowthKit automatically calculates growth velocity for every profile, plots it on a chart, and alerts you to significant changes. Track the whole family."
      relatedTools={[
        { href: '/tools/child-growth-percentile', label: 'Growth Percentile Calculator' },
        { href: '/tools/child-height-predictor', label: 'Child Height Predictor' },
        { href: '/tools/ideal-weight-child', label: 'Healthy Weight for Children' },
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
          {/* Sex */}
          <div>
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

          {/* Measurement rows */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">Height Measurements</label>
              <span className="text-xs text-gray-400">Add at least 2 measurements</span>
            </div>

            <div className="space-y-3">
              {rows.map((row, idx) => (
                <div key={row.id} className="relative rounded-md border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500">Measurement {idx + 1}</span>
                    {rows.length > 2 && (
                      <button onClick={() => removeRow(row.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                      <input type="date" value={row.date} onChange={(e) => updateRow(row.id, 'date', e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                      />
                    </div>
                    {isMetric ? (
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Height (cm)</label>
                        <input type="number" min="30" max="250" placeholder="e.g. 110"
                          value={row.heightCm} onChange={(e) => updateRow(row.id, 'heightCm', e.target.value)}
                          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                        />
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Feet</label>
                          <input type="number" min="1" max="8" placeholder="ft"
                            value={row.heightFt} onChange={(e) => updateRow(row.id, 'heightFt', e.target.value)}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Inches</label>
                          <input type="number" min="0" max="11" placeholder="in"
                            value={row.heightIn} onChange={(e) => updateRow(row.id, 'heightIn', e.target.value)}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Age at Measurement</label>
                      <input type="number" min="0" max="20" placeholder="yrs"
                        value={row.ageYears} onChange={(e) => updateRow(row.id, 'ageYears', e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addRow} className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors font-semibold">
              <Plus className="w-4 h-4" />
              Add another measurement
            </button>
          </div>

          {error && <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

          <button onClick={handleCalculate} className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            Calculate Growth Velocity
          </button>
        </div>
      </div>

      {result && (
        <div id="velocity-results" className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Growth Velocity Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              label="Growth Rate"
              value={`${result.cmPerYear.toFixed(1)} cm/year`}
              badge={result.statusLabel}
              badgeColor={colorMap[result.status]}
              interpretation={result.interpretation}
            />
            <ResultCard
              label="Normal Range for Age"
              value={`${result.normalMin}–${result.normalMax} cm/year`}
              badge={result.ageGroupLabel}
              badgeColor="gray"
              interpretation="Based on WHO growth velocity standards for this age group."
            />
            <ResultCard
              label="Status"
              value={result.statusLabel}
              badgeColor={colorMap[result.status]}
              interpretation={
                result.status === 'normal'
                  ? "Your child's growth rate is within the expected range. Keep tracking over time!"
                  : result.status === 'low'
                  ? "Growth is below the typical range. A single low reading can be normal — track over 6+ months and discuss with your pediatrician if it persists."
                  : "Growth is above the typical range. This often indicates a normal growth spurt. Rarely it can be associated with hormonal factors."
              }
              expandableContent={
                <p>Growth velocity is most meaningful when measured over 6–12 months. Short intervals (under 3 months) can be inaccurate due to daily measurement variation.</p>
              }
            />
          </div>

          {/* Velocity bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Growth Rate vs. Normal Range</h3>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400 w-16">0 cm/yr</span>
                <div className="flex-1 relative h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 bg-green-200 rounded-full" style={{
                    left: `${Math.min(95, (result.normalMin / Math.max(result.cmPerYear * 1.5, result.normalMax + 5)) * 100)}%`,
                    width: `${Math.min(95 - (result.normalMin / Math.max(result.cmPerYear * 1.5, result.normalMax + 5)) * 100, ((result.normalMax - result.normalMin) / Math.max(result.cmPerYear * 1.5, result.normalMax + 5)) * 100)}%`,
                  }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
                    style={{
                      left: `${Math.min(95, (result.cmPerYear / Math.max(result.cmPerYear * 1.5, result.normalMax + 5)) * 100)}%`,
                      marginLeft: '-8px',
                      backgroundColor: result.status === 'normal' ? '#22c55e' : result.status === 'low' ? '#eab308' : '#3b82f6',
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-16 text-right">{Math.max(result.cmPerYear * 1.5, result.normalMax + 5).toFixed(0)} cm/yr</span>
              </div>
              <div className="flex justify-center gap-4 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-200 inline-block" /> Normal range ({result.normalMin}–{result.normalMax} cm/yr)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-current inline-block" style={{ color: result.status === 'normal' ? '#22c55e' : result.status === 'low' ? '#eab308' : '#3b82f6' }} /> Your child ({result.cmPerYear.toFixed(1)} cm/yr)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 prose prose-gray max-w-none">
        <h2>What Is Growth Velocity?</h2>
        <p>
          Growth velocity is how fast a child grows over time, typically expressed as centimeters per year (cm/year). Unlike a single percentile measurement, velocity tells you about the <em>rate</em> of growth — which is often more diagnostically important than absolute size.
        </p>
        <p>
          A child consistently at the 20th percentile who is growing at 6 cm/year is perfectly healthy. The same child who suddenly drops from 6 cm/year to 2 cm/year may have an underlying issue worth investigating.
        </p>

        <h2>Normal Growth Velocity by Age</h2>
        <ul>
          <li><strong>0–1 year:</strong> 18–30 cm/year (very rapid, most growth happens here)</li>
          <li><strong>1–2 years:</strong> 10–14 cm/year (decelerating but still fast)</li>
          <li><strong>2–5 years:</strong> 6–10 cm/year (steady preschool growth)</li>
          <li><strong>5–10 years:</strong> 4.5–7.5 cm/year (slow, steady school-age growth)</li>
          <li><strong>Puberty (girls, ~10–13):</strong> 5–12 cm/year (growth spurt)</li>
          <li><strong>Puberty (boys, ~12–15):</strong> 5–12 cm/year (growth spurt, typically later than girls)</li>
        </ul>

        <h2>When Should Growth Velocity Concern You?</h2>
        <p>Contact your pediatrician if:</p>
        <ul>
          <li>Growth velocity is consistently below 4 cm/year after age 2</li>
          <li>Your child has had no measurable growth for 6+ months</li>
          <li>Growth has suddenly slowed or stopped unexpectedly</li>
          <li>Height velocity is extremely high outside of a known puberty growth spurt</li>
        </ul>

        <h2>How to Measure Height Accurately</h2>
        <p>
          For accurate velocity calculations, measurements must be taken consistently:
        </p>
        <ol>
          <li>Use a stadiometer or measure against a flat wall with a book on top of the head</li>
          <li>Measure barefoot, standing as straight as possible</li>
          <li>Measure at the same time of day (height fluctuates ~1 cm through the day)</li>
          <li>Take 2–3 readings and use the average</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4 not-prose mt-4">
          {[
            { q: "How long between measurements for an accurate velocity?", a: "At least 3 months, ideally 6–12 months. Shorter intervals amplify measurement error. If two measurements 2 months apart differ by only 0.5 cm, that's within measurement uncertainty — don't read too much into short-interval data." },
            { q: "My child grew 15 cm in one year at age 12 — is that a growth spurt?", a: "Likely yes. Puberty growth spurts typically produce 8–12 cm/year for girls and up to 10–14 cm/year for boys. A single year of 15 cm growth during puberty is at the high end of normal but not alarming on its own." },
            { q: "Growth velocity was low last year but is now back to normal. What does that mean?", a: "Temporary dips are common after illness, nutritional changes, or stress. If velocity has recovered and the child is on a normal growth curve, this is usually benign. Sustained low velocity (2+ years below normal) warrants evaluation." },
            { q: "Why does velocity matter more than percentile?", a: "A child can be perfectly healthy at any percentile. What pediatricians watch for is a change in velocity — crossing down through two or more major percentile lines, or growth that has clearly stalled." },
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
