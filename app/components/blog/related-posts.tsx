import Link from 'next/link'
import Image from 'next/image'
import { BlogPostMetadata } from '@/app/lib/blog-types'
import { ArrowRight } from 'lucide-react'

interface RelatedPostsProps {
  posts: BlogPostMetadata[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-border pt-8">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md"
          >
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
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

