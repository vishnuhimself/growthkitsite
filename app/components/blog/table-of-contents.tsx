'use client'

import { useEffect, useState } from 'react'
import { TableOfContentsItem } from '@/app/lib/blog-types'
import { List, X } from 'lucide-react'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  const handleItemClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    setIsOpen(false)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <>
      {/* Desktop TOC - Hidden on mobile */}
      <nav className="sticky top-24 hidden lg:block">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
            Table of Contents
          </h3>
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
              >
                <a
                  href={`#${item.id}`}
                  className={`block py-1 transition-colors hover:text-primary ${
                    activeId === item.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleItemClick(item.id)
                  }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile TOC - Floating button and modal */}
      <div className="lg:hidden">
        {/* Floating TOC Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Table of Contents"
        >
          <List className="h-6 w-6" />
        </button>

        {/* Modal Overlay */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed inset-x-4 top-24 bottom-24 z-50 overflow-auto rounded-lg border border-border bg-card shadow-lg">
              <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card p-4">
                <h3 className="font-semibold text-base">Table of Contents</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="space-y-1 p-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                  >
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`block w-full text-left py-2 px-2 rounded transition-colors hover:bg-muted ${
                        activeId === item.id
                          ? 'text-primary font-medium bg-primary/10'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  )
}

