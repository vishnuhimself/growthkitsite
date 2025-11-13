import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost, BlogPostMetadata, TableOfContentsItem } from './blog-types'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPostMetadata[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        featured_image: data.featured_image,
        readingTime: readingTime(content).text,
      } as BlogPostMetadata
    })

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      featured_image: data.featured_image,
      content,
      readingTime: readingTime(content).text,
    } as BlogPost
  } catch (error) {
    return null
  }
}

export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPostMetadata[] {
  const allPosts = getAllPosts()
  
  // Filter out current post
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug)
  
  // Score posts based on shared tags
  const scoredPosts = otherPosts.map((p) => {
    const sharedTags = p.tags.filter((tag) => post.tags.includes(tag))
    return {
      post: p,
      score: sharedTags.length,
    }
  })
  
  // Sort by score and then by date
  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score
    }
    return a.post.date < b.post.date ? 1 : -1
  })
  
  return scoredPosts.slice(0, limit).map((item) => item.post)
}

export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TableOfContentsItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    headings.push({
      id,
      title,
      level,
    })
  }

  return headings
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tagSet = new Set<string>()
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag))
  })
  
  return Array.from(tagSet).sort()
}

export function getPostsByTag(tag: string): BlogPostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.tags.includes(tag))
}

