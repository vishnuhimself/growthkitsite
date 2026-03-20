import { MetadataRoute } from 'next'
import { getAllPosts } from '@/app/lib/blog-utils'

export const revalidate = 3600 // Revalidate sitemap every hour

/**
 * All tool slugs. Adding a new tool only requires appending its slug here —
 * the sitemap, and metadata are automatically included.
 */
export const TOOL_SLUGS = [
  'child-growth-percentile',
  'child-height-predictor',
  'bmi-calculator',
  'growth-velocity',
  'ideal-weight-child',
  'premature-baby-corrected-age',
  'weight-loss-calculator',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

  // Blog posts
  const blogPosts = getAllPosts()
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Tool pages — auto-generated from TOOL_SLUGS
  const toolEntries = TOOL_SLUGS.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Main + hub pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  return [...mainPages, ...toolEntries, ...blogEntries]
}
