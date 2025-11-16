import { Metadata } from 'next'
import { getAllPosts } from '@/app/lib/blog-utils'
import { BlogCard } from '@/app/components/blog/blog-card'

export const revalidate = 3600 // Revalidate every hour (3600 seconds)

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read articles about health tracking, BMI, growth monitoring, and family wellness from the GrowthKit team.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'}/blog`,
  },
  openGraph: {
    title: 'Blog | GrowthKit',
    description: 'Read articles about health tracking, BMI, growth monitoring, and family wellness from the GrowthKit team.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | GrowthKit',
    description: 'Read articles about health tracking, BMI, growth monitoring, and family wellness from the GrowthKit team.',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Insights, tips, and guides on health tracking, growth monitoring, and family wellness.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

