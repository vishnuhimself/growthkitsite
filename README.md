# GrowthKit

[GrowthKit](https://growthkitapp.com) is a privacy-focused app for tracking height, weight, and BMI with beautiful charts and insights.

## Features

- Multiple profiles for family tracking
- Beautiful analytics and charts
- Smart insights dashboard
- Dark mode support
- Global measurement system (Metric & Imperial)
- 100% private - all data stays on your device
- **SEO-optimized blog system** (new!)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide Icons
- MDX (for blog)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Blog System

This site includes a fully-featured, SEO-optimized blog system. For detailed documentation:

- **[BLOG_SETUP_GUIDE.md](./BLOG_SETUP_GUIDE.md)** - Complete setup and usage guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-launch checklist
- **[content/blog/README.md](./content/blog/README.md)** - Content creation guide
- **[content/blog/QUICK_REFERENCE.md](./content/blog/QUICK_REFERENCE.md)** - Quick syntax reference

### Quick Blog Commands

```bash
# Create a new blog post
touch content/blog/your-post-slug.mdx

# Test blog locally
npm run dev
# Visit: http://localhost:3000/blog

# Build with blog
npm run build
```

### Blog Features

- ✅ SEO-optimized (meta tags, OpenGraph, JSON-LD)
- ✅ Automatic sitemap generation
- ✅ Table of contents
- ✅ Related posts
- ✅ Author profiles
- ✅ Reading time
- ✅ Syntax highlighting
- ✅ Responsive design
- ✅ MDX support (Markdown + React components)

## Project Structure

```
/app
  /blog                    # Blog pages
  /components/blog         # Blog components
  /lib                     # Utilities & configs
  
/content/blog              # Blog posts (MDX)
  
/public                    # Static assets
  /blog                    # Blog images
```

## Contact

For support or inquiries, email [hey@heyvish.com](mailto:hey@heyvish.com)
