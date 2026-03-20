'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type StatusColor = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'gray'

const colorMap: Record<StatusColor, { border: string; label: string; value: string; badge: string; dot: string }> = {
  green: {
    border: 'border-green-500',
    label: 'text-gray-500',
    value: 'text-gray-900',
    badge: 'bg-green-50 text-green-700 border border-green-200',
    dot: '#22c55e',
  },
  yellow: {
    border: 'border-yellow-400',
    label: 'text-gray-500',
    value: 'text-gray-900',
    badge: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    dot: '#eab308',
  },
  orange: {
    border: 'border-orange-400',
    label: 'text-gray-500',
    value: 'text-gray-900',
    badge: 'bg-orange-50 text-orange-700 border border-orange-200',
    dot: '#f97316',
  },
  red: {
    border: 'border-red-500',
    label: 'text-gray-500',
    value: 'text-gray-900',
    badge: 'bg-red-50 text-red-700 border border-red-200',
    dot: '#ef4444',
  },
  blue: {
    border: 'border-blue-500',
    label: 'text-gray-500',
    value: 'text-gray-900',
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    dot: '#3b82f6',
  },
  gray: {
    border: 'border-gray-300',
    label: 'text-gray-500',
    value: 'text-gray-900',
    badge: 'bg-gray-50 text-gray-600 border border-gray-200',
    dot: '#9ca3af',
  },
}

interface ResultCardProps {
  label: string
  value: string
  badge?: string
  badgeColor?: StatusColor
  interpretation?: string
  subValues?: { label: string; value: string }[]
  expandableContent?: React.ReactNode
  expandableLabel?: string
}

export function ResultCard({
  label,
  value,
  badge,
  badgeColor = 'green',
  interpretation,
  subValues,
  expandableContent,
  expandableLabel = 'What does this mean?',
}: ResultCardProps) {
  const [expanded, setExpanded] = useState(false)
  const colors = colorMap[badgeColor]

  return (
    <div className={`rounded-lg border border-gray-200 border-t-2 ${colors.border} bg-white p-5 space-y-3`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className={`text-xs font-medium ${colors.label} mb-1.5`}>{label}</p>
          <p className={`text-3xl font-bold ${colors.value} leading-none tracking-tight`}>{value}</p>
        </div>
        {badge && (
          <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${colors.badge} flex-shrink-0`}>
            {badge}
          </span>
        )}
      </div>

      {interpretation && (
        <p className="text-sm text-gray-500 leading-relaxed">{interpretation}</p>
      )}

      {subValues && subValues.length > 0 && (
        <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-3">
          {subValues.map((sv) => (
            <div key={sv.label}>
              <p className="text-xs text-gray-400 mb-0.5">{sv.label}</p>
              <p className="text-sm font-semibold text-gray-700">{sv.value}</p>
            </div>
          ))}
        </div>
      )}

      {expandableContent && (
        <div className="pt-1 border-t border-gray-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors mt-2"
            aria-expanded={expanded}
          >
            {expandableLabel}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {expanded && (
            <div className="mt-3 text-sm text-gray-600 leading-relaxed">
              {expandableContent}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface PercentileBarProps {
  percentile: number
  label?: string
  color?: StatusColor
}

export function PercentileBar({ percentile, label, color = 'green' }: PercentileBarProps) {
  const clampedPct = Math.max(0.5, Math.min(99.5, percentile))
  const colors = colorMap[color]

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <span className={`text-xs font-semibold rounded px-2 py-0.5 ${colors.badge}`}>
            {clampedPct.toFixed(0)}th %ile
          </span>
        </div>
      )}
      <div className="relative h-3 w-full rounded-full bg-gray-100 overflow-visible">
        {/* Zone markers — subtle */}
        <div className="absolute inset-0 rounded-full overflow-hidden flex">
          <div className="bg-blue-100" style={{ width: '5%' }} />
          <div className="bg-green-100" style={{ width: '80%' }} />
          <div className="bg-yellow-100" style={{ width: '10%' }} />
          <div className="bg-red-100" style={{ width: '5%' }} />
        </div>
        {/* Marker dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md -ml-2.5 z-10"
          style={{ left: `${clampedPct}%`, backgroundColor: colors.dot }}
          aria-label={`${clampedPct.toFixed(0)}th percentile`}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 px-0.5">
        <span>5th</span>
        <span>50th</span>
        <span>85th</span>
        <span>95th</span>
      </div>
    </div>
  )
}
