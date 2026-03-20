import Link from 'next/link'
import { ToolCTA } from './tool-cta'

interface RelatedTool {
  href: string
  label: string
}

interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  relatedTools?: RelatedTool[]
  ctaHeading?: string
  ctaSubtext?: string
  breadcrumb?: string
}

export function ToolLayout({
  title,
  description,
  children,
  relatedTools,
  ctaHeading,
  ctaSubtext,
  breadcrumb,
}: ToolLayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-4xl px-6 pt-28 pb-20">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-gray-700 transition-colors">Tools</Link>
          {breadcrumb && (
            <>
              <span>/</span>
              <span className="text-gray-600 truncate max-w-[200px]">{breadcrumb}</span>
            </>
          )}
        </nav>

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">{title}</h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">{description}</p>
        </div>

        {/* Tool content */}
        {children}

        {/* App CTA */}
        <ToolCTA heading={ctaHeading} subtext={ctaSubtext} />

        {/* Related tools */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="mt-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Also useful</p>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  {t.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Medical disclaimer */}
        <p className="mt-12 text-xs text-gray-400 border-t border-gray-100 pt-6 leading-relaxed">
          <strong className="text-gray-500">Medical Disclaimer:</strong> This tool is for informational and educational purposes only. Results are based on WHO and CDC reference data and should not replace professional medical advice. Always consult a qualified healthcare provider — such as your pediatrician or family doctor — regarding your child&apos;s growth or your own health.
        </p>
      </div>
    </div>
  )
}
