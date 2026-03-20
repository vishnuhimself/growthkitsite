'use client'

import Link from 'next/link'
import { AppleLogo } from '@/app/components/ui/apple-logo'

interface ToolCTAProps {
  heading?: string
  subtext?: string
}

export function ToolCTA({
  heading = 'Track this over time with GrowthKit',
  subtext = 'Save your measurements, view beautiful charts, and monitor progress for your whole family — all in one private app.',
}: ToolCTAProps) {
  return (
    <div className="mt-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-8 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2.5 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/GrowthKitLogo.webp" alt="GrowthKit" className="w-9 h-9 rounded-xl" />
            <span className="text-sm font-semibold opacity-90">GrowthKit App</span>
          </div>
          <h3 className="text-xl font-bold mb-2 leading-snug">{heading}</h3>
          <p className="text-white/80 text-sm leading-relaxed max-w-sm">{subtext}</p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-1.5">
          <Link
            href="https://apps.apple.com/app/growthkit-track-height-weight/id6740914430"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
          >
            <AppleLogo />
            Download Free on App Store
          </Link>
          <p className="text-xs text-white/60">Free with optional in-app purchase</p>
        </div>
      </div>
    </div>
  )
}
