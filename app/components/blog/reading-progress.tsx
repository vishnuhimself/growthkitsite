'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / docHeight) * 100
      setProgress(scrollProgress)
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress() // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-[73px] left-0 right-0 z-40 h-1 bg-muted">
      <div
        className="h-full bg-primary"
        style={{ 
          width: `${progress}%`,
          transition: 'width 0.05s linear'
        }}
      />
    </div>
  )
}

