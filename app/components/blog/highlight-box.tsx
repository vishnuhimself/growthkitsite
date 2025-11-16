import { ReactNode } from 'react'
import { Lightbulb, Info, AlertTriangle, Sparkles } from 'lucide-react'

interface HighlightBoxProps {
  children: ReactNode
  variant?: 'default' | 'info' | 'tip' | 'warning'
}

export function HighlightBox({ children, variant = 'default' }: HighlightBoxProps) {
  const config = {
    default: {
      container: 'bg-primary/5 border-primary/20',
      icon: Sparkles,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50'
    },
    tip: {
      container: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
      icon: Lightbulb,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/50'
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-900/50'
    }
  }

  const { container, icon: Icon, iconColor, iconBg } = config[variant]

  return (
    <div className={`my-6 rounded-lg border-2 ${container} shadow-sm`}>
      <div className="flex gap-4 p-6">
        <div className={`flex-shrink-0 ${iconBg} rounded-full p-2 h-10 w-10 flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="flex-1 prose-lg max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  )
}

