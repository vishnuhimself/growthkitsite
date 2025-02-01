import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-7xl px-6 py-8 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Built with care for everyone. © GrowthKit.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Privacy
            </Link>
            <Link href="/support" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 