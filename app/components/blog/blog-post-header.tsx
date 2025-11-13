import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { authorProfile } from '@/app/lib/author-config'

interface BlogPostHeaderProps {
  title: string
  description: string
  date: string
  author: string
  readingTime: string
  tags: string[]
}

export function BlogPostHeader({
  title,
  description,
  date,
  author,
  readingTime,
  tags
}: BlogPostHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
        {title}
      </h1>
      <div className="flex items-center gap-3 mb-6">
        {authorProfile.avatar && (
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={authorProfile.avatar}
              alt={authorProfile.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <div className="font-medium text-foreground">{authorProfile.name}</div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xl text-muted-foreground/80 mb-6 italic border-l-4 border-primary/30 pl-4 py-2">
        {description}
      </p>
    </header>
  )
}

