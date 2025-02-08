import { MetadataRoute } from 'next'
import { getAllPossibleCombinations } from '@/app/lib/height-weight-config'

// Keep track of dynamically generated pages
let dynamicPages = new Set<string>()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'
  
  // Get all static combinations
  const staticCombinations = getAllPossibleCombinations()
  
  // Create sitemap entries for static pages
  const staticEntries = staticCombinations.map(({ height, weight }) => ({
    url: `${baseUrl}/bmi/${height}-${weight}-lbs`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  // Add dynamic pages that were generated on-demand
  const dynamicEntries = Array.from(dynamicPages).map(slug => ({
    url: `${baseUrl}/bmi/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  // Add other important pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/bmi`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    }
  ]

  return [...mainPages, ...staticEntries, ...dynamicEntries]
}

// Function to add dynamically generated pages to sitemap
export function addDynamicPage(slug: string) {
  dynamicPages.add(slug)
} 