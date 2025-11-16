import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug, getRelatedPosts, generateTableOfContents } from '@/app/lib/blog-utils'
import { mdxComponents } from '@/app/components/blog/mdx-components'
import { BlogPostHeader } from '@/app/components/blog/blog-post-header'
import { TableOfContents } from '@/app/components/blog/table-of-contents'
import { AuthorProfile } from '@/app/components/blog/author-profile'
import { RelatedPosts } from '@/app/components/blog/related-posts'
import { ReadingProgress } from '@/app/components/blog/reading-progress'
import { authorProfile } from '@/app/lib/author-config'
import Image from 'next/image'

export const revalidate = 3600 // Revalidate every hour (3600 seconds)

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'
  const canonicalUrl = `${baseUrl}/blog/${params.slug}`

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: canonicalUrl,
      images: post.featured_image ? [
        {
          url: `${baseUrl}${post.featured_image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.featured_image ? [`${baseUrl}${post.featured_image}`] : undefined,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  // Check if post is scheduled for future
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const postDate = new Date(post.date)
  postDate.setHours(0, 0, 0, 0)
  
  if (postDate > today) {
    notFound() // Return 404 for future posts
  }

  const relatedPosts = getRelatedPosts(post, 3)
  const tableOfContents = generateTableOfContents(post.content)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthkitapp.com'

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.featured_image ? `${baseUrl}${post.featured_image}` : undefined,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: authorProfile.social?.website,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GrowthKit',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/GrowthKitLogo.webp`,
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <article className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">
        {post.featured_image && (
          <div className="relative w-full aspect-[21/9] mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <div className="min-w-0">
            <BlogPostHeader
              title={post.title}
              description={post.description}
              date={post.date}
              author={post.author}
              readingTime={post.readingTime}
              tags={post.tags}
            />

            <div className="prose prose-lg max-w-none">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: 'wrap',
                          properties: {
                            className: ['anchor'],
                          },
                        },
                      ],
                      [
                        rehypePrettyCode,
                        {
                          theme: 'github-dark',
                          keepBackground: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <AuthorProfile author={authorProfile} />
            </div>

            <RelatedPosts posts={relatedPosts} />
          </div>

          <aside className="lg:block">
            <TableOfContents items={tableOfContents} />
          </aside>
        </div>
      </article>
    </>
  )
}

