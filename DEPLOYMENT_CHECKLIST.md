# Blog Deployment Checklist

## Pre-Deployment

### Author Profile Setup
- [ ] Update name in `/app/lib/author-config.ts`
- [ ] Update bio
- [ ] Add avatar image to `/public/`
- [ ] Update avatar path in config
- [ ] Add social media links (optional)

### Content Preparation
- [ ] Review example blog posts
- [ ] Decide if you want to keep, edit, or delete example posts
- [ ] Create `/public/blog/` directory for images
- [ ] Prepare at least 1-2 posts for launch

### Configuration Check
- [ ] Verify `NEXT_PUBLIC_BASE_URL` in environment (if needed)
- [ ] Check that author name matches in all posts
- [ ] Ensure all dates are in YYYY-MM-DD format

## Testing Locally

### Build Test
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No linting errors

### Functional Test
```bash
npm run dev
```

Visit and verify:
- [ ] Homepage loads: `http://localhost:3000`
- [ ] Blog listing loads: `http://localhost:3000/blog`
- [ ] Individual posts load: `http://localhost:3000/blog/[slug]`
- [ ] Navigation links work (header & footer)
- [ ] Table of contents works (click items)
- [ ] Related posts appear at bottom
- [ ] Author profile displays correctly
- [ ] Images load (if you added any)
- [ ] Mobile responsive (test with browser dev tools)

### SEO Test
- [ ] Open dev tools > Elements tab
- [ ] Check `<head>` for meta tags
- [ ] Verify title tag is correct
- [ ] Check for OpenGraph tags (og:title, og:description, og:image)
- [ ] Check for Twitter card tags
- [ ] Look for JSON-LD script tags
- [ ] Visit `http://localhost:3000/sitemap.xml`
- [ ] Verify blog posts are in sitemap

## Deployment

### Commit Changes
```bash
git add .
git commit -m "Add SEO-optimized blog system"
git push origin main
```

### Deploy
- [ ] Push to your hosting platform (Vercel, Netlify, etc.)
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors

### Post-Deployment Verification
- [ ] Visit live site: `https://growthkitapp.com`
- [ ] Visit blog listing: `https://growthkitapp.com/blog`
- [ ] Test a blog post: `https://growthkitapp.com/blog/[slug]`
- [ ] Check sitemap: `https://growthkitapp.com/sitemap.xml`
- [ ] Verify blog posts appear in sitemap

## SEO Setup (After Deployment)

### Google Search Console
- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Add property (if not already added)
- [ ] Submit sitemap: `https://growthkitapp.com/sitemap.xml`
- [ ] Request indexing for blog listing page
- [ ] Request indexing for first blog posts

### Schema Validation
- [ ] Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test a blog post URL
- [ ] Verify Article schema is detected
- [ ] Check for any errors or warnings

### Social Media
- [ ] Test OpenGraph with [OpenGraph Debugger](https://www.opengraph.xyz/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Share first post on social media to verify preview

### Performance Check
- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Check both mobile and desktop scores
- [ ] Verify Core Web Vitals are good
- [ ] Test blog post page as well

## Optional Enhancements

### Analytics
- [ ] Set up Google Analytics (if not already)
- [ ] Add tracking events for blog posts
- [ ] Monitor page views and engagement

### Comments (Optional)
Consider adding a comment system:
- [ ] Disqus
- [ ] Giscus (GitHub Discussions)
- [ ] utterances (GitHub Issues)

### Newsletter (Optional)
- [ ] Add newsletter signup form
- [ ] Integrate with email service (ConvertKit, Mailchimp, etc.)
- [ ] Add to blog listing page
- [ ] Add to individual post pages

### RSS Feed (Optional)
- [ ] Create `/app/feed.xml/route.ts` for RSS feed
- [ ] Add RSS link to footer

### Search (Future)
- [ ] Consider adding blog search functionality
- [ ] Options: Algolia, local search, or simple filtering

## Content Strategy

### First 30 Days
- [ ] Create content calendar (8-12 posts)
- [ ] Set up AI prompts for content generation
- [ ] Plan topics aligned with app features
- [ ] Schedule 2 posts per week

### Topics to Cover
- [ ] BMI basics and importance
- [ ] Growth tracking for children
- [ ] Health metrics explained
- [ ] Nutrition tips
- [ ] Fitness for families
- [ ] App features and how-tos
- [ ] User stories (when available)
- [ ] Health trends and research

### Internal Linking Strategy
- [ ] Link from homepage to blog
- [ ] Link from BMI pages to relevant blog posts
- [ ] Cross-link between related blog posts
- [ ] Link from blog posts back to app features

## Maintenance

### Weekly
- [ ] Check Google Search Console for errors
- [ ] Monitor analytics
- [ ] Respond to comments (if you add comments)
- [ ] Publish new content

### Monthly
- [ ] Review top-performing posts
- [ ] Update outdated information
- [ ] Check for broken links
- [ ] Add internal links to new posts from old posts

### Quarterly
- [ ] Analyze traffic and engagement
- [ ] Adjust content strategy based on data
- [ ] Update author bio if needed
- [ ] Review and improve underperforming posts

## Troubleshooting

### Blog not showing in production?
1. Check build logs for errors
2. Verify `/content/blog/` directory exists
3. Ensure posts have correct frontmatter
4. Rebuild and redeploy

### Sitemap not updating?
1. Clear build cache
2. Run `npm run build` locally
3. Verify sitemap.xml contains blog posts
4. Redeploy

### Images not loading?
1. Verify images are in `/public/blog/`
2. Check paths start with `/blog/` not `/public/blog/`
3. Ensure images were committed to git
4. Check deployment includes public directory

### SEO not working?
1. Give it time (can take days/weeks for Google)
2. Verify sitemap submitted to Search Console
3. Check robots.txt isn't blocking
4. Request indexing for specific pages

## Success Metrics

Track these over time:
- [ ] Blog page views (Google Analytics)
- [ ] Average time on page
- [ ] Bounce rate
- [ ] Google Search impressions (Search Console)
- [ ] Click-through rate from search
- [ ] App downloads from blog referrals
- [ ] Social shares

## Resources

- **Google Search Console**: https://search.google.com/search-console
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Rich Results Test**: https://search.google.com/test/rich-results
- **OpenGraph Debugger**: https://www.opengraph.xyz/
- **Schema Validator**: https://validator.schema.org/

## Need Help?

Refer to:
- `BLOG_SETUP_GUIDE.md` - Complete setup documentation
- `content/blog/README.md` - Content creation guide
- `content/blog/QUICK_REFERENCE.md` - Quick syntax reference

---

## Quick Command Reference

```bash
# Local development
npm run dev

# Build
npm run build

# Production
npm start

# Deploy
git add .
git commit -m "Update blog"
git push
```

Good luck with your blog! 🚀

