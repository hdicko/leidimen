# Code Documentation - Leidimen Hugo Site

## Overview

This document provides detailed information about the codebase structure, key files, and how to work with the code.

## Project Structure

```
leidimen/
├── archetypes/          # Content templates for Hugo
├── assets/              # Raw assets (SCSS, JS, images)
│   ├── scss/           # Sass stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Source images
├── content/             # All site content (Markdown)
│   ├── about/          # Team member profiles
│   ├── posts/          # Blog posts and news
│   ├── galleries/      # Photo galleries
│   ├── villages/       # Village information
│   └── documents/      # Legal documents
├── data/                # Data files (YAML, JSON)
│   ├── membres/        # Member data
│   └── villages/       # Village data
├── layouts/             # Hugo templates
│   ├── _default/       # Default templates
│   ├── partials/       # Reusable template components
│   ├── shortcodes/     # Custom shortcodes
│   ├── about/          # Team member templates
│   ├── posts/          # Blog post templates
│   └── galleries/      # Gallery templates
├── static/              # Static files (copied as-is)
│   ├── css/            # Compiled CSS
│   ├── js/             # JavaScript libraries
│   ├── images/         # Images
│   └── admin/          # Netlify CMS admin
└── public/              # Generated site (ignored in git)
```

## Key Files and Their Purpose

### Layouts

#### Base Templates

- **`layouts/_default/baseof.html`**
  - Master template wrapping all pages
  - Defines the HTML structure (head, body, footer)
  - Loads global partials (navbar, footer, scripts)
- **`layouts/_default/single.html`**
  - Template for individual pages
  - Used when no specific layout is defined
- **`layouts/_default/list.html`**
  - Template for listing pages (empty, uses specific layouts)

#### Specialized Templates

- **`layouts/about/single.html`**
  - Team member profile pages
  - Displays card info, experience timeline, skills
  - Features: AOS animations, responsive grid, related members
- **`layouts/posts/list.html.html`**
  - Blog post listing page
  - Pagination, filtering, featured posts
- **`layouts/galleries/single.html`**
  - Photo gallery pages
  - PhotoSwipe integration for lightbox

### Partials

Reusable components included in multiple templates:

- **`layouts/partials/head.html`**
  - HTML `<head>` section
  - Meta tags, CSS links, SEO
- **`layouts/partials/navbar.html`**
  - Site navigation menu
  - Mobile responsive
- **`layouts/partials/footer.html`**
  - Site footer
  - Contact info, social links
- **`layouts/partials/scripts.html`**
  - JavaScript loading
  - Bootstrap, jQuery, custom scripts
- **`layouts/partials/photoswipe-resources.html`** ⭐ NEW
  - PhotoSwipe library loading (CSS/JS)
  - Centralized resource management
- **`layouts/partials/photoswipe-structure.html`** ⭐ NEW
  - PhotoSwipe HTML structure
  - Lightbox UI elements

### Shortcodes

Custom Hugo shortcodes for content enhancement:

#### Gallery & Images

- **`gallery.html`** ⭐ REFACTORED
  - Auto-loads PhotoSwipe
  - Processes page resources
  - Creates responsive thumbnails
  - Usage: `{{< gallery >}}`
- **`load-photoswipe.html`** ⭐ REFACTORED
  - Manual PhotoSwipe loading
  - Use when NOT using {{< gallery >}}
  - Usage: `{{< load-photoswipe >}}`
- **`figure.html`**
  - Enhanced figure/image display
  - hugo-easy-gallery compatible
- **`myimage.html`**
  - Simple responsive image
  - Bootstrap styling

#### Text Effects

- **`typeit.html`** ⭐ DOCUMENTED
  - Typing animation effect
  - Uses TypeIt library v8.7.1
  - Parameters: speed, lifeLike, loop, etc.
  - Usage: `{{< typeit >}}Your text{{< /typeit >}}`

#### Content Enhancement

- **`alert.html`**
  - Styled alert boxes
  - Custom colors and icons
- **`divider.html`**
  - Decorative section dividers

#### Media

- **`video.html`**
  - Responsive video embedding
  - YouTube, Vimeo support
- **`carousel.html`**
  - Bootstrap carousel for featured content

## Code Conventions

### Hugo Template Comments

```html
<!-- HTML comments visible in source -->

{{/* Hugo template comments (not in output) */}} {{- /* Remove whitespace
before/after */ -}}
```

### Naming Conventions

- **Files**: lowercase with hyphens (`about-section.html`)
- **Partials**: descriptive names (`photoswipe-resources.html`)
- **Shortcodes**: lowercase, no spaces (`typeit.html`)
- **CSS Classes**: Bootstrap + custom (`img-fluid`, `custom-class`)
- **IDs**: kebab-case (`typeit-unique-id`)

### Template Variables

```go
{{/* Page context */}}
{{ .Title }}              // Page title
{{ .Content }}            // Page content
{{ .Params.variable }}    // Front matter variable

{{/* Site context */}}
{{ .Site.Title }}         // Site title
{{ .Site.Params.var }}    // Config parameter

{{/* Resources */}}
{{ .Page.Resources.ByType "image" }}  // Get images
```

## Image Processing

### Gallery Images

```go
{{- $resized := .Fill "400x500 top webp q85 lanczos" -}}
```

Parameters:

- **Size**: 400x500 pixels
- **Anchor**: top (for portraits)
- **Format**: WebP (modern, efficient)
- **Quality**: 85 (high quality)
- **Algorithm**: Lanczos (best quality resampling)

### Best Practices

- Use WebP for web images (better compression)
- Quality 85 is optimal (good quality, reasonable size)
- Lanczos provides best resampling quality
- Top anchor works well for portraits

## PhotoSwipe Integration

### Architecture (Refactored 2025-10-20)

The PhotoSwipe integration has been modularized into reusable components:

```
Shortcode (gallery.html or load-photoswipe.html)
    ↓
Checks Page.Scratch for "photoswipeloaded"
    ↓
If not loaded:
    ├─→ partial "photoswipe-resources.html"  (Loads CSS/JS)
    └─→ partial "photoswipe-structure.html"  (Adds HTML)
```

### Duplicate Prevention

Uses Hugo's `Page.Scratch` to ensure PhotoSwipe loads only once:

```go
{{- if not ($.Page.Scratch.Get "photoswipeloaded") -}}
{{ $.Page.Scratch.Set "photoswipeloaded" 1 }}
// Load PhotoSwipe
{{- end -}}
```

### When to Use What

- **Use `{{< gallery >}}`**: For image galleries from page resources (recommended)
- **Use `{{< load-photoswipe >}}`**: For custom HTML galleries (manual setup)
- **Don't use both**: Gallery auto-loads PhotoSwipe

## Front Matter Standards

### Team Member Profiles (`content/about/*.md`)

```yaml
---
title: "Full Name"
date: "YYYY-MM-DDTHH:MM:SS+01:00"
draft: false
description: "Short bio"
slug: "url-slug"
weight: 10  # Sorting order

card:
  image: "images/photo.jpg"
  fonction: "Role/Position"
  membre: "Membership Type"
  presentation: "Brief intro"
  ville: "City"
  pays: "Country"
  email: "email@example.com"
  tel: "+33 X XX XX XX XX"
  devise: "Personal motto"
  specialites:
    - "Skill 1"
    - "Skill 2"

experience:
  - date: "YYYY" or "YYYY-YYYY"
    title: "Position Title"
    description: "Role description"
    category: "Associatif|Professionnel|Éducation|etc."
    icon: "bi-icon-name"  # Bootstrap Icons
    achievements:
      - "Achievement 1"
      - "Achievement 2"
    skills:
      - "Skill 1"
      - "Skill 2"

categories:
  - "category1"
  - "category2"

tags:
  - "tag1"
  - "tag2"
---
```

### Blog Posts (`content/posts/**/*.md`)

```yaml
---
title: "Post Title"
date: YYYY-MM-DDTHH:MM:SS+01:00
draft: false
description: "Post description"
author: "Author Name"
slug: "url-slug"
featured_image: "images/image.jpg"
weight: 10

categories:
  - "category1"

tags:
  - "tag1"
  - "tag2"

villages:
  - "village1"
---
```

## Debugging Tips

### Hugo Server

```bash
# Run development server
./dev-server.sh

# Or manually:
hugo server -D --bind 127.0.0.1 --port 1313
```

### Common Issues

1. **PhotoSwipe loads twice**
   - Check if both `{{< gallery >}}` and `{{< load-photoswipe >}}` are used
   - Solution: Remove manual `{{< load-photoswipe >}}` calls

2. **Images not showing**
   - Verify images are in page resources (same folder as index.md)
   - Check image paths in front matter
   - Ensure correct file extensions

3. **Template errors**
   - Check Hugo template syntax
   - Verify variable names match front matter
   - Look for unclosed {{ }} blocks

4. **CSS/JS not loading**
   - Check paths in partials/head.html and partials/scripts.html
   - Verify files exist in static/ or assets/
   - Clear browser cache

### Viewing Generated HTML

```bash
# Build site to public/
hugo

# Check generated HTML
cat public/path/to/page/index.html
```

## Performance Optimization

### Image Optimization

- Use WebP format (supported by all modern browsers)
- Set quality to 85 (good balance)
- Use responsive sizes (Hugo's image processing)
- Lazy load images (`loading="lazy"`)

### JavaScript

- Load libraries from CDN (cached across sites)
- Use defer/async attributes
- Minimize custom JavaScript

### CSS

- Use Sass for organization
- Minimize and compile for production
- Leverage Bootstrap's utility classes

## Contributing

### Before Making Changes

1. **Create a branch**

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Test locally**

   ```bash
   ./dev-server.sh
   ```

3. **Check for errors**
   - Look for template errors in terminal
   - Test in multiple browsers
   - Verify responsive design

### Code Style

- Add comments for complex logic
- Use Hugo's template comments `{{/* */}}`
- Keep templates readable (proper indentation)
- Document shortcode parameters

### Committing

```bash
git add -A
git commit -m "Type: Brief description

Detailed explanation if needed"
git push origin feature/your-feature
```

Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Resources

### Documentation

- [Hugo Docs](https://gohugo.io/documentation/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/)
- [PhotoSwipe](https://photoswipe.com/documentation/)
- [TypeIt](https://www.typeitjs.com/)

### Tools

- [Hugo Easy Gallery](https://github.com/liwenyip/hugo-easy-gallery/)
- [Netlify CMS](https://www.netlifycms.org/docs/)

## Changelog

### 2025-10-20: Major Refactoring

- Created modular PhotoSwipe partials
- Refactored gallery.html and load-photoswipe.html
- Removed 7 unused files
- Reduced codebase by 1,836 lines
- Added comprehensive code documentation
- Standardized team member profiles (8 files)

### 2025-10: Content Standardization

- Standardized all about/\*.md profiles
- Standardized posts, documents, galleries
- Fixed TypeIt shortcode
- Added grid layout for team members

## Support

For questions or issues:

1. Check this documentation
2. Review existing code for examples
3. Consult Hugo documentation
4. Contact the development team
