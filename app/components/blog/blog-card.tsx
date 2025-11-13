import Link from 'next/link'
import Image from 'next/image'
import { BlogPostMetadata } from '@/app/lib/blog-types'
import { Calendar, Clock } from 'lucide-react'

interface BlogCardProps {
  post: BlogPostMetadata
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.featured_image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground line-clamp-3">
            {post.description}
          </p>
        </div>
      </Link>
    </article>
  )
}

