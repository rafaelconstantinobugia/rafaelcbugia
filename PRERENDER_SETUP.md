# Prerendering Setup for Social Media OG Tags

## The Challenge
React SPAs (like this Lovable project) inject meta tags via JavaScript. Social media crawlers (Facebook, LinkedIn, Twitter/X) **don't execute JavaScript** - they only read the initial HTML response.

## Current Status
✅ SEO component properly configured with all OG tags
✅ Book OG image at correct path
✅ Sitemap includes /livro route
✅ Robots.txt allows crawling

⚠️ **Meta tags are only visible after JavaScript execution**

## Solutions

### Option 1: Prerender.io (Recommended - Easiest)
1. Sign up at [Prerender.io](https://prerender.io)
2. Add middleware to your hosting (Netlify/Vercel/etc.)
3. Crawlers will see fully rendered HTML with meta tags

### Option 2: Netlify Prerendering
If hosted on Netlify:
1. Add to `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[plugins]]
  package = "@netlify/plugin-prerendering"
```

### Option 3: Cloudflare Workers
If using Cloudflare:
- Enable automatic prerendering in Cloudflare dashboard
- Configure for social media crawler user agents

### Option 4: Static Site Generation
Install and configure prerendering at build time:
```bash
npm install vite-plugin-ssr
```

## Testing Your OG Tags

### 1. Facebook Debugger
Visit: https://developers.facebook.com/tools/debug/
- Enter: `https://rafaelcbugia.com/livro`
- Click "Scrape Again" to refresh cache
- Verify image, title, and description appear

### 2. LinkedIn Post Inspector
Visit: https://www.linkedin.com/post-inspector/
- Enter URL and inspect preview

### 3. Twitter Card Validator
Visit: https://cards-dev.twitter.com/validator
- Verify card preview

### 4. View Page Source
- Right-click page → "View Page Source" (not Inspect)
- Search for `og:image` and `og:title`
- **If you only see the tags via "Inspect Element", crawlers can't see them**

## Expected OG Tags for /livro

The page should include these tags in the initial HTML:

```html
<meta property="og:title" content="IA para a Minha Avó — Rafael C. Bugia">
<meta property="og:description" content="Guia prático e humano sobre como usar IA no dia-a-dia. Pré-reserve o novo livro de Rafael C. Bugia.">
<meta property="og:image" content="https://rafaelcbugia.com/media/livro-ia-para-a-minha-avo-cover-og.png">
<meta property="og:url" content="https://rafaelcbugia.com/livro">
<meta property="og:type" content="book">
<meta property="og:locale" content="pt_PT">
```

## OG Image Requirements
✅ File: `/public/media/livro-ia-para-a-minha-avo-cover-og.png`
✅ Recommended size: 1200×630px
✅ Format: PNG or JPEG
✅ Max file size: 8MB (aim for <1MB)

## Current Implementation
The SEO component in `src/components/SEO.tsx` correctly sets all meta tags dynamically. The page `src/pages/Livro.tsx` uses the SEO component with proper configuration including:
- ✅ Correct title and description
- ✅ Book OG type
- ✅ Proper OG image URL
- ✅ Canonical URL
- ✅ Keywords for SEO
