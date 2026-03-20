'use client'

import { useState } from 'react'
import { ToolLayout } from '@/app/components/tools/tool-layout'
import { ResultCard } from '@/app/components/tools/result-card'
import { calcCorrectedAge } from '@/app/lib/calculator-utils'

export function PreemieCorrectedAgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [gestationalWeeks, setGestationalWeeks] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcCorrectedAge> | null>(null)
  const [error, setError] = useState('')

  function handleCalculate() {
    setError('')
    setResult(null)

    if (!birthDate) { setError('Please enter the baby\'s birth date.'); return }
    const gw = parseInt(gestationalWeeks)
    if (!gw || gw < 22 || gw > 39) { setError('Please enter a gestational age between 22 and 39 weeks.'); return }

    const birth = new Date(birthDate)
    const today = new Date()
    if (birth > today) { setError('Birth date cannot be in the future.'); return }

    const res = calcCorrectedAge(birth, gw)
    setResult(res)
    setTimeout(() => document.getElementById('preemie-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  function formatDate(d: Date): string {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <ToolLayout
      title="Premature Baby Corrected Age Calculator — Preemie Adjusted Age"
      description="Enter your premature baby's birth date and gestational age at birth to instantly calculate their corrected (adjusted) age — the age to use when tracking developmental milestones and growth percentiles."
      breadcrumb="Premature Baby Corrected Age Calculator"
      ctaHeading="Track your preemie's growth with corrected age in GrowthKit"
      ctaSubtext="GrowthKit lets you log measurements using corrected age, keeping your preemie's growth chart accurate and meaningful."
      relatedTools={[
        { href: '/tools/child-growth-percentile', label: 'Child Growth Percentile Calculator' },
        { href: '/tools/ideal-weight-child', label: 'Healthy Weight for Children' },
        { href: '/tools/bmi-calculator', label: 'BMI Calculator' },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Baby&apos;s Date of Birth</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <p className="mt-1.5 text-xs text-gray-400">Actual date of birth, not due date</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gestational Age at Birth (weeks)</label>
            <input type="number" min="22" max="39" placeholder="e.g. 32"
              value={gestationalWeeks} onChange={(e) => setGestationalWeeks(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <p className="mt-1.5 text-xs text-gray-400">Full term = 40 weeks. Under 37 weeks = premature.</p>
          </div>
        </div>

        {/* Gestational age reference table */}
        <div className="mt-4 rounded-md bg-blue-50 border border-blue-100 p-4">
          <p className="text-xs font-semibold text-blue-800 mb-2">Prematurity Reference</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-700">
            <div><span className="font-medium">Moderate:</span> 32–33 wks</div>
            <div><span className="font-medium">Late:</span> 34–36 wks</div>
            <div><span className="font-medium">Near-term:</span> 37–38 wks</div>
            <div><span className="font-medium">Full-term:</span> 39–40+ wks</div>
          </div>
        </div>

        {error && <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

        <button onClick={handleCalculate} className="mt-6 w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
          Calculate Corrected Age
        </button>
      </div>

      {result && (
        <div id="preemie-results" className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Corrected Age Results</h2>

          {/* Main ages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard
              label="Corrected (Adjusted) Age"
              value={result.correctedAgeLabel}
              badge="Use for milestones & growth"
              badgeColor="blue"
              interpretation="This is the age to use when checking developmental milestones and growth percentiles."
              expandableContent={
                <p>Corrected age = Chronological age minus the number of weeks born early. For a baby born 8 weeks early who is now 16 weeks old, corrected age is 8 weeks.</p>
              }
            />
            <ResultCard
              label="Chronological Age"
              value={result.chronologicalAgeLabel}
              badge="Use for vaccinations"
              badgeColor="gray"
              interpretation="Age since birth. Use this for vaccination schedules — vaccines follow chronological age."
            />
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Born Early', value: `${result.weeksEarly} weeks` },
              { label: 'Gestational Age', value: `${40 - result.weeksEarly} weeks` },
              { label: 'Use Corrected Until', value: formatDate(result.useCorrectedUntilDate) },
              { label: 'Still Use Corrected Age?', value: result.stillUseCorrected ? 'Yes' : 'No — use chronological' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-md border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-sm font-semibold text-gray-700">{value}</p>
              </div>
            ))}
          </div>

          {!result.stillUseCorrected && (
            <div className="rounded-xl bg-green-50 border border-green-200 p-4">
              <p className="text-sm font-semibold text-green-800">Your baby no longer needs age correction!</p>
              <p className="text-sm text-green-700 mt-1">After 2 years corrected age, most premature babies have caught up developmentally and chronological age is used for all tracking.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-12 prose prose-gray max-w-none">
        <h2>What Is Corrected Age for Premature Babies?</h2>
        <p>
          Corrected age (also called <strong>adjusted age</strong>) is the age a premature baby would be if they had been born on their due date. It accounts for the fact that a baby born 8 weeks early needs 8 extra weeks of development time compared to a full-term baby.
        </p>
        <p>
          <strong>Formula:</strong> Corrected Age = Chronological Age − Weeks Born Early
        </p>
        <p>
          For example: A baby born at 32 weeks gestation (8 weeks early) who is now 20 weeks old has a corrected age of 12 weeks (3 months).
        </p>

        <h2>When to Use Corrected Age vs. Chronological Age</h2>
        <ul>
          <li><strong>Use corrected age for:</strong> Developmental milestones (sitting, crawling, talking), growth chart percentiles, and feeding assessment</li>
          <li><strong>Use chronological age for:</strong> Vaccination schedules (follow chronological age per CDC guidelines)</li>
          <li><strong>Use corrected age until:</strong> 2 years corrected age — after that, most preemies have caught up</li>
        </ul>

        <h2>Developmental Milestones With Corrected Age</h2>
        <p>Using corrected age when tracking milestones prevents unnecessary worry. A baby born 3 months early smiling at 5 months chronological age (2 months corrected) is right on time — not 3 months delayed.</p>
        <p>Key milestones by corrected age:</p>
        <ul>
          <li><strong>2 months:</strong> Social smile, tracking objects</li>
          <li><strong>4 months:</strong> Laughing, holding head steady</li>
          <li><strong>6 months:</strong> Sitting with support, babbling</li>
          <li><strong>9 months:</strong> Pulling to stand, waving</li>
          <li><strong>12 months:</strong> Cruising, first words</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4 not-prose mt-4">
          {[
            { q: "My baby was born at 36 weeks. Do I need to use corrected age?", a: "Yes, but only for 4 weeks of adjustment (36 weeks = 4 weeks early). At this level of prematurity, the difference is small and most babies catch up quickly. Your pediatrician may or may not recommend using corrected age at this gestational age." },
            { q: "When do I stop using corrected age?", a: "Most pediatricians and developmental specialists recommend using corrected age for developmental milestones until the baby's 2nd corrected birthday. For very premature babies (under 28 weeks), some specialists extend this to age 3." },
            { q: "My preemie isn't meeting milestones even with corrected age. What should I do?", a: "Missing milestones even when using corrected age warrants a conversation with your pediatrician. They may refer you to early intervention services, which can provide support before school age." },
            { q: "Do I use corrected age for vaccines?", a: "No. Vaccines follow chronological age (actual date of birth), not corrected age. This is because the immune system matures based on time since birth, not gestational age at birth." },
            { q: "My baby was born a few days early — do I need to correct?", a: "A few days (less than 2 weeks) of prematurity doesn't usually require age correction. The calculator is most useful for babies born before 37 weeks gestation." },
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
