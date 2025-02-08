import Link from 'next/link'
import { AppleLogo } from '@/app/components/ui/apple-logo'

export function TrackWithGrowthKitCTA() {
  return (
    <div className="mt-8 p-6 bg-slate-50 rounded-xl">
      <p className="text-xl font-semibold mb-2">Track Your BMI with GrowthKit</p>
      <p className="text-muted-foreground mb-4">
        Monitor your BMI changes over time, set goals, and stay motivated with beautiful charts and insights.
      </p>
      <Link
        href="https://apps.apple.com/app/growthkit-track-height-weight/id6740914430"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
      >
        <AppleLogo />
        <span>Download on App Store</span>
      </Link>
    </div>
  )
} 