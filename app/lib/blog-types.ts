export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  featured_image?: string
  content: string
  readingTime: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  featured_image?: string
  readingTime: string
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

export interface AuthorProfile {
  name: string
  bio: string
  avatar?: string
  role?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

