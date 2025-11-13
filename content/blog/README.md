# GrowthKit Blog

This directory contains all blog posts for the GrowthKit website. Posts are written in MDX format (Markdown with JSX support).

## Creating a New Blog Post

### 1. Create a New MDX File

Create a new file in this directory with a descriptive slug as the filename:

```
content/blog/your-post-slug.mdx
```

The filename (without `.mdx`) will become the URL: `https://growthkitapp.com/blog/your-post-slug`

### 2. Add Frontmatter

Every blog post must start with YAML frontmatter containing metadata:

```yaml
---
title: "Your Post Title"
description: "A compelling SEO-friendly description (155 characters or less recommended)"
date: "2024-11-13"
author: "Vish"
tags: ["health", "bmi", "growth-tracking"]
featured_image: "/blog/your-image.webp"
---
```

#### Frontmatter Fields:

- **title** (required): The main title of your post
- **description** (required): SEO meta description and post preview
- **date** (required): Publication date in YYYY-MM-DD format
- **author** (required): Author name (configured in `app/lib/author-config.ts`)
- **tags** (required): Array of relevant tags for categorization and related posts
- **featured_image** (optional): Path to featured image (place images in `/public/blog/`)

### 3. Write Your Content

After the frontmatter, write your post content using Markdown:

```markdown
## Heading 2

Your content here with **bold text** and *italic text*.

### Heading 3

- Bullet points
- Are supported
- Too

1. Numbered lists
2. Work as well

[Links work like this](https://example.com)

![Images work too](/blog/image.webp)
```

## Content Guidelines

### Headings

- Use `##` (H2) for main sections
- Use `###` (H3) for subsections
- H2 and H3 automatically appear in the Table of Contents
- Avoid using `#` (H1) - the post title is H1

### Images

1. Save images to `/public/blog/` directory
2. Use WebP format for best performance
3. Reference them in your post: `![Alt text](/blog/your-image.webp)`
4. Always include descriptive alt text for accessibility

### Links

- Internal links: `[Text](/blog/another-post)`
- External links: `[Text](https://example.com)` (automatically open in new tab)

### Code Blocks

Use triple backticks with language specification:

\```javascript
function example() {
  console.log("Code highlighting works!");
}
\```

### Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
```

## AI-Generated Content Workflow

Since you're using AI to generate content, here's the recommended workflow:

### 1. Generate Content

Use ChatGPT/Claude with a prompt like:

```
Write a blog post about [TOPIC] for my health tracking app GrowthKit.
Target audience: Parents and health-conscious individuals.
Tone: Informative but friendly.
Include: Practical tips, examples, and actionable advice.
Format: Markdown with H2 and H3 headings.
Length: 1500-2000 words.
```

### 2. Prepare Frontmatter

Ask AI to suggest:
- SEO-optimized title
- Meta description
- Relevant tags

### 3. Review and Edit

- Check for accuracy
- Add personal touches
- Ensure it matches your brand voice
- Verify all links work
- Check that images are properly referenced

### 4. Add to Site

1. Create the `.mdx` file with your content
2. Add any images to `/public/blog/`
3. Commit and push
4. Deploy (blog posts are generated at build time)

## SEO Best Practices

### Title
- Keep under 60 characters
- Include target keyword
- Make it compelling

### Description
- 150-155 characters optimal
- Include target keyword
- Add call to action

### Tags
- Use 3-5 relevant tags
- Include mix of broad and specific terms
- Use consistent tag names across posts

### Content
- Use descriptive headings
- Include internal links to other blog posts
- Add external links to authoritative sources
- Optimize images (WebP format, descriptive alt text)
- Aim for 1000+ words for better SEO

## Technical Details

### Automatic Features

The blog system automatically provides:

- ✅ SEO-optimized meta tags
- ✅ OpenGraph and Twitter card metadata
- ✅ JSON-LD structured data (Article schema)
- ✅ Automatic sitemap generation
- ✅ Reading time calculation
- ✅ Table of contents (from H2 and H3 headings)
- ✅ Related posts suggestions (based on tags)
- ✅ Author profile section
- ✅ Responsive design
- ✅ Syntax highlighting for code blocks

### URLs

Blog post URLs follow this pattern:
```
https://growthkitapp.com/blog/your-post-slug/
```

The trailing slash is handled automatically by Next.js.

### Static Generation

All blog posts are statically generated at build time for optimal performance and SEO. To see your changes:

```bash
npm run build
npm start
```

Or in development:

```bash
npm run dev
```

## File Structure

```
content/blog/
├── README.md (this file)
├── your-first-post.mdx
└── your-second-post.mdx

/public/blog/
├── post-image-1.webp
└── post-image-2.webp

app/
├── blog/
│   ├── page.tsx (blog listing)
│   └── [slug]/page.tsx (individual posts)
├── components/blog/
│   ├── blog-card.tsx
│   ├── blog-post-header.tsx
│   ├── table-of-contents.tsx
│   ├── author-profile.tsx
│   ├── related-posts.tsx
│   └── mdx-components.tsx
└── lib/
    ├── blog-types.ts
    ├── blog-utils.ts
    └── author-config.ts
```

## Troubleshooting

### Post not showing up?

1. Check frontmatter syntax (must be valid YAML)
2. Ensure filename ends with `.mdx`
3. Rebuild: `npm run build`
4. Check date isn't in the future

### Images not loading?

1. Verify image is in `/public/blog/` directory
2. Check path starts with `/blog/` not `/public/blog/`
3. Ensure image filename matches exactly (case-sensitive)

### Build errors?

1. Run `npm run build` to see specific errors
2. Check for unclosed tags in MDX
3. Verify all frontmatter fields are present
4. Look for TypeScript errors in console

## Example Post Template

Save this as a starting point:

```markdown
---
title: "Your Post Title Here"
description: "A brief, compelling description of your post that will appear in search results and social shares."
date: "2024-11-13"
author: "Vish"
tags: ["health", "wellness", "tracking"]
featured_image: "/blog/your-image.webp"
---

Brief introduction paragraph that hooks the reader and explains what they'll learn.

## Main Section Heading

Your content here. Break it into digestible sections.

### Subsection

More detailed content in subsections.

## Another Main Section

Continue building your narrative.

## Conclusion

Wrap up with key takeaways and a call to action.
```

## Need Help?

- Review existing posts in this directory for examples
- Check the [Next.js MDX documentation](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- Refer to the component files in `app/components/blog/` to see available styling

Happy blogging! 🚀

