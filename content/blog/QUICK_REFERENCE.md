# Blog Quick Reference

## New Post Template

```yaml
---
title: "Your Post Title (50-60 chars)"
description: "Compelling description for SEO (150-155 chars)"
date: "YYYY-MM-DD"
author: "Vish"
tags: ["tag1", "tag2", "tag3"]
featured_image: "/blog/image.webp"
---

Your introduction paragraph...

## Main Section

Content here...

### Subsection

More content...

## Conclusion

Wrap up with key takeaways.
```

## Common Tags

```yaml
tags: [
  "health",
  "bmi",
  "growth-tracking",
  "family-wellness",
  "nutrition",
  "fitness",
  "parenting",
  "child-development",
  "health-tech",
  "apps"
]
```

## Markdown Syntax

### Headings
```markdown
## H2 Heading (appears in TOC)
### H3 Heading (appears in TOC)
#### H4 Heading
```

### Text Formatting
```markdown
**bold text**
*italic text*
[link text](https://example.com)
```

### Lists
```markdown
- Bullet point
- Another point

1. Numbered item
2. Another item
```

### Images
```markdown
![Alt text](/blog/image.webp)
```

### Code
```markdown
Inline: `code here`

Block:
\```javascript
const code = "here";
\```
```

### Blockquotes
```markdown
> This is a quote
> Multiple lines work
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

## File Locations

- **Blog posts**: `/content/blog/*.mdx`
- **Blog images**: `/public/blog/*.webp`
- **Author config**: `/app/lib/author-config.ts`

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start
```

## URLs

- Listing: `yourdomain.com/blog`
- Post: `yourdomain.com/blog/filename-without-mdx`

## AI Content Prompt

```
Write a 1500-word blog post about [TOPIC] for GrowthKit, a family health 
tracking app. Target audience: parents and health-conscious individuals.

Include:
- Practical, actionable tips
- Real-world examples
- Clear H2 and H3 headings
- Bullet points for key information
- Natural keyword usage

Tone: Friendly, informative, professional
Format: Markdown
```

## SEO Checklist

- [ ] Title: 50-60 characters, includes keyword
- [ ] Description: 150-155 characters, compelling
- [ ] 3-5 relevant tags
- [ ] Featured image (WebP, <500KB)
- [ ] 1000+ words content
- [ ] Clear H2/H3 structure
- [ ] 2-3 internal links (to other blog posts)
- [ ] 1-2 external authoritative links
- [ ] Images have descriptive alt text
- [ ] Date is correct (YYYY-MM-DD)

## Post Deployment

1. Build locally: `npm run build`
2. Test locally: `npm start`
3. Commit changes
4. Push to deploy
5. Verify on live site
6. Share on social media
7. Submit to Google Search Console (if new)

