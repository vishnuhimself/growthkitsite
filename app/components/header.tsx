import Link from 'next/link'
import { Logo } from '@/app/components/ui/logo'

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="flex items-center space-x-3"
            prefetch={true}
          >
            <Logo />
            <span className="text-xl font-bold">GrowthKit</span>
          </Link>
        </div>
      </div>
    </header>
  )
} 