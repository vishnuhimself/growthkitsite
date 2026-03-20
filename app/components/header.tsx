'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/app/components/ui/logo'
import { AppleLogo } from '@/app/components/ui/apple-logo'

const NAV_LINKS = [
  { href: '/tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center space-x-3"
              prefetch={true}
              onClick={() => setOpen(false)}
            >
              <Logo />
              <span className="text-xl font-bold">GrowthKit</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Download button (always visible) + hamburger (mobile only) */}
          <div className="flex items-center gap-3">
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

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-input text-muted-foreground hover:bg-accent transition-colors"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto max-w-7xl px-6 py-3 flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border last:border-0"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
