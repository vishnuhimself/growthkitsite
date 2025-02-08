import Link from 'next/link'
import { Logo } from '@/app/components/ui/logo'
import { AppleLogo } from '@/app/components/ui/apple-logo'

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-3"
            prefetch={true}
          >
            <Logo />
            <span className="text-xl font-bold">GrowthKit</span>
          </Link>

          <Link
            href="https://apps.apple.com/app/growthkit-track-height-weight/id6740914430"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
          >
            <AppleLogo />
            <span className="hidden sm:inline">Download on App Store</span>
            <span className="inline sm:hidden">Download</span>
          </Link>
        </div>
      </div>
    </header>
  )
} 