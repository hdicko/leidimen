# Project Architecture Blueprint — Leidimen Hugo Site

> **Generated:** 2026-03-06 · **Hugo Version:** 0.157.0 (extended) · **Site:** https://hdicko.github.io/leidimen/
>
> This document is the authoritative architectural reference for the Leidimen project. It describes the technology stack, template hierarchy, content model, build pipeline, and patterns used throughout the codebase. Update this document whenever significant architectural changes are made.

---

## Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Content Architecture](#4-content-architecture)
5. [Template Hierarchy & Layout System](#5-template-hierarchy--layout-system)
6. [Asset Pipeline](#6-asset-pipeline)
7. [Data Architecture](#7-data-architecture)
8. [Cross-Cutting Concerns](#8-cross-cutting-concerns)
9. [Deployment Architecture](#9-deployment-architecture)
10. [Key Implementation Patterns](#10-key-implementation-patterns)
11. [Extension & Evolution Guide](#11-extension--evolution-guide)
12. [Architectural Decision Records](#12-architectural-decision-records)
13. [Blueprint for New Development](#13-blueprint-for-new-development)

---

## 1. Architectural Overview

Leidimen is a **French-language static website** for a solidarity association supporting villages in the Douentza region of Mali. It is built with Hugo, a Go-based static site generator, following the **Jamstack architectural pattern**: content is pre-rendered at build time and served as static HTML with no server-side runtime.

### Guiding Principles

| Principle | Implementation |
|-----------|---------------|
| **Content-first** | Markdown + YAML frontmatter for all content; no database |
| **Zero runtime backend** | Pure static site; dynamic features handled client-side (JS) or at CDN edge |
| **Dual deployment** | GitHub Pages (primary) + Netlify (secondary), same build artifact |
| **Performance by default** | Image processing pipeline, CSS/HTML minification, WebP format, lazy loading |
| **SEO as architecture** | JSON-LD structured data, OpenGraph, Twitter Cards baked into templates |
| **CMS-optional** | Editors can use Netlify CMS browser interface or direct Markdown files |

### Architecture Style

```
┌─────────────────────────────────────────────────────┐
│                   JAMSTACK PATTERN                   │
│                                                     │
│  Content (Markdown) ──┐                             │
│  Data (YAML/JSON)  ───┤→  Hugo Build  →  /public/  │
│  Templates (Go/HTML)──┘    (SSG)        static HTML │
│  Assets (SCSS/JS)  ───┘                             │
│                         ↓ deploy                    │
│                  GitHub Pages / Netlify              │
└─────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Version | Role |
|-------|-----------|---------|------|
| **Static Site Generator** | Hugo (extended) | 0.157.0 | Template rendering, image processing, SCSS compilation |
| **CSS Framework** | Bootstrap | 5.3.8 | Responsive grid, components, dark mode |
| **CSS Preprocessor** | Dart Sass | 1.93.2 | SCSS → CSS compilation (required for Bootstrap 5 customization) |
| **Icon Libraries** | Bootstrap Icons | 1.13.1 | UI icons (primary) |
| **Icon Libraries** | FontAwesome | 4.7 | Legacy nav icons |
| **Animations** | AOS (Animate On Scroll) | 2.3.1 | Scroll-triggered entry animations |
| **Animations** | Animate.css | 4.1.1 | CSS animation library |
| **Gallery Lightbox** | Fancybox | 5.0 | Photo gallery lightbox (galleries/single.html) |
| **Gallery Lightbox** | PhotoSwipe | (CDN) | Photo gallery lightbox (gallery shortcode) |
| **JavaScript** | Vanilla JS ES6 | — | Dark mode, filtering, animations (no framework) |
| **Package Manager** | npm | — | Dependency management, build scripts |
| **CI/CD** | GitHub Actions | — | Automated build → GitHub Pages deploy |
| **Hosting (Primary)** | GitHub Pages | — | Static hosting, subdirectory: `/leidimen/` |
| **Hosting (Secondary)** | Netlify | — | Auto-deploy from `main` branch |
| **CMS** | Netlify CMS | — | Browser-based Git-backed content editor |
| **Code Formatting** | Prettier | 3.6.2 | HTML templates, SCSS, Markdown formatting |

---

## 3. Project Structure

```
leidimen/
├── .github/
│   ├── agents/                     # Custom AI agent definitions (10 agents)
│   ├── skills/                     # AI skill definitions (19 skills)
│   ├── workflows/
│   │   └── hugo.yaml               # GitHub Actions: build & deploy to GitHub Pages
│   └── copilot-instructions.md     # Copilot context & conventions
│
├── archetypes/                     # Hugo content templates
│   ├── default.md                  # Generic page template
│   ├── post.md                     # Blog post template
│   └── about.md                    # Team member template
│
├── assets/                         # Processed assets (Hugo asset pipeline)
│   ├── scss/
│   │   ├── index.scss              # ★ MAIN ENTRY POINT — imports all SCSS
│   │   ├── _variables.scss         # CSS custom properties (light/dark theme vars)
│   │   ├── _components.scss        # Reusable semantic utility classes
│   │   ├── _documents.scss         # Document listing styles
│   │   ├── _skill-refactor.scss    # Skills/expertise section
│   │   ├── pages/                  # Page-specific stylesheet overrides
│   │   └── partials/
│   │       └── _intro-improved.scss # Homepage hero section
│   └── js/
│       ├── darkmode.js             # Theme toggle (light ↔ dark, localStorage)
│       ├── intro.js                # Homepage intro animations
│       └── profile.js              # Team profile page interactions
│
├── content/                        # ★ ALL CONTENT (Markdown + YAML frontmatter)
│   ├── _index.md                   # Homepage
│   ├── about-for-ai.md             # AI context summary
│   ├── posts/                      # Blog articles (year-organized)
│   ├── villages/                   # Mali village pages (bundle format)
│   ├── equipe/                     # Team member profiles
│   ├── galleries/                  # Photo galleries (bundle format with images)
│   ├── documents/                  # Legal/formal documents
│   ├── partenaires/                # Partners page
│   ├── categories/                 # Category taxonomy index
│   └── moods/                      # Mood taxonomy index
│
├── data/                           # Site-wide structured data
│   ├── villages/mali_villages.yaml # Village coordinates, population, projects
│   ├── settings/general.yml        # Site name, mission, contact info
│   └── membres/adherents.json      # Member data
│
├── layouts/                        # ★ ALL TEMPLATES (Go HTML templates)
│   ├── _default/                   # Base templates (fallback hierarchy)
│   ├── index.html                  # Homepage layout
│   ├── posts/                      # Blog section templates
│   ├── villages/                   # Village section templates
│   ├── galleries/                  # Gallery section templates
│   ├── equipe/                     # Team section templates
│   ├── documents/                  # Document section templates
│   ├── categories/                 # Category taxonomy templates
│   ├── partenaires/                # Partners template
│   ├── 404.html                    # Error page
│   ├── partials/                   # Reusable template fragments
│   └── shortcodes/                 # Hugo shortcodes
│
├── static/                         # Static files (copied as-is to /public)
│   ├── admin/config.yml            # Netlify CMS configuration
│   ├── images/                     # Static images (team photos, uploads)
│   └── robots.txt                  # Search engine directives
│
├── hugo.toml                       # ★ MAIN CONFIGURATION
├── netlify.toml                    # Netlify build & environment config
├── package.json                    # npm dependencies + build scripts
├── deploy.sh                       # Manual deploy to GitHub Pages
├── dev-server.sh                   # Local development server
├── hugo_stats.json                 # Hugo build statistics (auto-generated)
└── public/                         # Build output (git-ignored, deployed separately)
```

---

## 4. Content Architecture

### 4.1 Taxonomy System

Hugo is configured with **4 custom taxonomies** in `hugo.toml`:

```toml
[taxonomies]
    tag      = "tags"        # General keywords
    category = "categories"  # Content classification
    mood     = "moods"       # Emotional tone
    village  = "villages"    # Geographic classification
```

**Village taxonomy values** (always lowercase in frontmatter):
`douentza` · `darawal` · `debere` · `diambana` · `diona` · `dorool` · `tacouti` · `manko` · `tanal` · `ndumpa`

**Category values**: `Éducation` · `Santé` · `Infrastructure` · `informations`

**Mood values**: `heureux` · `triste` · `inspire` · `motive` · `reconnaissant`

### 4.2 Content Types & Organization

```
content/posts/
├── 2006/              ← year-based directories (REQUIRED for new posts)
├── 2013/
├── 2017/
├── 2023/
├── 2024/
├── 2025/
└── 2026/
    ├── my-article.md                      ← standard post
    └── my-gallery/                        ← bundle post (with images)
        ├── index.md
        ├── photo1.jpg
        └── photo2.jpg
```

**⚠ Critical Rule:** New posts MUST be placed in year-based directories (`content/posts/YYYY/`). Legacy topic-named directories exist from WordPress migration but must not be used for new content.

### 4.3 Content Frontmatter Schema

**Blog Post (required fields):**
```yaml
---
title: "Article title"
date: 2025-10-22
type: "posts"                    # REQUIRED for proper routing
villages: ["dorool", "diona"]    # LOWERCASE always
categories: ["Éducation"]
tags: ["école", "projet"]
description: "SEO description 150-160 chars"
image: "/images/uploads/cover.jpg"
draft: false
---
```

**Team Member:**
```yaml
---
title: "Full Name"
type: "membre"
categories: ["association"]
weight: 8
card:
  image: "/images/team/photo.jpg"
  name: "Full Name"
  title: "Role Title"
  membre: ["fondateur", "bureau", "adherent"]
  description: "Short bio"
  devise: "Personal motto"
  social:
    - { icon: "envelope", link: "email@example.com" }
    - { icon: "linkedin", link: "https://linkedin.com/..." }
experience:
  - { year: "2020", title: "Position", company: "Organization" }
skills: ["Skill 1", "Skill 2"]
---
```

**Gallery Bundle (`index.md`):**
```yaml
---
title: "Gallery Title"
date: 2025-01-15
type: "galleries"
villages: ["dorool"]
description: "Gallery description"
---
{{< gallery >}}          ← auto-loads all sibling images
```

### 4.4 Output Formats

```toml
[outputs]
  home    = ["HTML", "RSS", "JSON"]   # search index via JSON
  page    = ["HTML", "JSON"]
  section = ["HTML", "RSS", "JSON"]
  taxonomy = ["HTML", "RSS", "JSON"]
  term    = ["HTML", "RSS", "JSON"]
```

The JSON output format serves as a **client-side search index** consumed by the `/search/` page.

---

## 5. Template Hierarchy & Layout System

### 5.1 Hugo Template Lookup Order

Hugo resolves templates in this priority order (simplified):

```
1. layouts/{type}/{layout}.html
2. layouts/{type}/single.html  (or list.html)
3. layouts/_default/single.html  (or list.html)
4. layouts/_default/baseof.html  (base always applies)
```

### 5.2 Base Template (`layouts/_default/baseof.html`)

All pages inherit from `baseof.html`. It defines the full HTML document structure:

```
baseof.html
├── <html lang="{{ .Site.Language.Lang }}" data-bs-theme="auto">
├── <head> → partial "head.html"
│     ├── partial "meta.html"        (SEO meta)
│     ├── partial "seo/opengraph.html"
│     ├── partial "seo/twitter.html"
│     ├── partial "seo/json-ld.html"
│     └── partial "libsass.html"     (Bootstrap CSS via Dart Sass)
├── <body>
│   ├── .skip-link                   (accessibility)
│   ├── partial "navbar.html"
│   ├── partial "association.html"   (association banner)
│   ├── {{ block "main" . }}         ← CHILD TEMPLATES DEFINE THIS
│   ├── {{ block "footer" . }}       ← optional override
│   │     └── partial "footer.html"
│   └── partial "scripts.html"       (Bootstrap JS, AOS, dark mode)
│         └── partial "site-scripts.html"
```

**Available blocks for child templates:**

| Block | Required | Purpose |
|-------|----------|---------|
| `"main"` | ✅ Yes | Primary page content |
| `"footer"` | ❌ No | Override footer for specific pages |
| `"page-styles"` | ❌ No | Inject page-specific `<style>` |

### 5.3 Section Templates

| Section | List Template | Single Template | Notable Features |
|---------|--------------|-----------------|-----------------|
| `posts` | `posts/list.html` | `posts/single.html` | Client-side filter/sort, AOS animations, read-time calc |
| `villages` | `villages/list.html` | `villages/single.html` | Map integration, data file lookup |
| `galleries` | `galleries/list.html` | `galleries/single.html` | Fancybox lightbox, JSON-LD ImageGallery |
| `equipe` | `equipe/list.html` | `equipe/single.html` | Schema.org Person, timeline, role badges |
| `documents` | `documents/list.html` | `documents/single.html` | Legal document layout |
| `_default` | `_default/list.html` | `_default/single.html` | Generic fallback |

### 5.4 Partials Directory

**Core infrastructure partials** (loaded by baseof.html):

| Partial | Called From | Purpose |
|---------|------------|---------|
| `head.html` | baseof | `<head>`: meta, CSS, fonts, Netlify Identity |
| `navbar.html` | baseof | Sticky nav, mobile hamburger, dark mode toggle |
| `footer.html` | baseof | Social links, nav links, legal links, back-to-top |
| `scripts.html` | baseof | Bootstrap JS, AOS init, dark mode JS |
| `association.html` | baseof | Thin association info banner |

**SEO partials** (`partials/seo/`):

| Partial | Schema Type |
|---------|------------|
| `json-ld.html` | Dispatcher — routes to specific schema |
| `article-schema.html` | `BlogPosting` / `Article` |
| `event-schema.html` | `Event` |
| `faq-schema.html` | `FAQPage` |
| `howto-schema.html` | `HowTo` |
| `opengraph.html` | Open Graph protocol |
| `twitter.html` | Twitter Card |
| `breadcrumb.html` | `BreadcrumbList` |
| `ai-meta.html` | AI crawler directives |
| `hreflang.html` | Language alternates |

**Content partials:**

| Partial | Purpose |
|---------|---------|
| `intro.html` | Homepage hero section |
| `post_preview.html` | Blog post card for listing pages |
| `post_meta.html` | Post metadata (date, author, tags) |
| `related-posts.html` | Related articles sidebar |
| `paginator.html` / `util/pagination.html` | Pagination controls |
| `photoswipe-resources.html` | PhotoSwipe CSS+JS loader (once per page via Scratch) |
| `photoswipe-structure.html` | PhotoSwipe lightbox HTML wrapper |
| `mali-villages-map-simple.html` | Interactive village map |
| `tags.html` | Tag cloud widget |
| `categories.html` | Category listing widget |

### 5.5 Shortcodes

| Shortcode | Usage | Notes |
|-----------|-------|-------|
| `gallery` | `{{< gallery >}}` | Auto-gallery from page resources; loads PhotoSwipe via Scratch |
| `gallery-pro` | `{{< gallery-pro >}}` | Gallery with advanced options |
| `image-gallery` | `{{< image-gallery >}}` | Alternative gallery implementation |
| `gallery-item` | Used within image-gallery | Individual item |
| `load-photoswipe` | `{{< load-photoswipe >}}` | Manual PhotoSwipe init (use BEFORE custom galleries) |
| `image` | `{{< image src="..." alt="..." >}}` | Responsive `<figure>` with optional caption |
| `myimage` | `{{< myimage >}}` | Custom image variant |
| `divider` | `{{< divider >}}` | Visual separator |
| `details` | `{{< details "Summary" >}}…{{< /details >}}` | Collapsible accordion |
| `typeit` | `{{< typeit >}}text{{< /typeit >}}` | Animated typing effect |

---

## 6. Asset Pipeline

### 6.1 SCSS Compilation

```
assets/scss/index.scss          ← ENTRY POINT
│
├── @import "_variables"        # CSS custom properties (100+ vars)
│   └── :root { --bs-primary: ..., color-scheme: light/dark }
│
├── @import "bootstrap/scss"    # Full Bootstrap 5 (node_modules)
│   └── Customized via _variables.scss overrides
│
├── @import "skill-refactor"    # Context7 design system components
├── @import "partials/intro-improved"  # Homepage hero
├── @import "documents"         # Document listing UI
└── @import "components"        # Semantic utility classes
```

The `libsass.html` partial compiles this via Hugo's asset pipeline:
```go
{{ $scss := resources.Get "scss/index.scss" }}
{{ $css  := $scss | toCSS (dict "transpiler" "dartsass") | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
```

**Subresource Integrity (SRI)** is applied to compiled CSS for security.

### 6.2 JavaScript Architecture

No JavaScript framework is used. Three focused ES6 modules:

```
assets/js/
├── darkmode.js      # Reads/writes localStorage("theme"), toggles data-bs-theme on <html>
├── intro.js         # Homepage hero animations and typing effects
└── profile.js       # Team profile: tab navigation, timeline interactions
```

External JS libraries (loaded via CDN in `head.html` / `scripts.html`):
- Bootstrap 5 Bundle (Popper.js included)
- AOS 2.3.1 (initialized with `AOS.init()` in scripts.html)
- Fancybox 5.0 (gallery lightbox)
- PhotoSwipe (gallery shortcode lightbox)
- Animate.css 4.1.1
- Netlify Identity Widget

### 6.3 Image Processing Pipeline

Hugo's built-in image processing is used for all page resources:

```go
// Standard pattern for gallery thumbnails
{{ $thumb := $img.Fill "400x300 webp q85" }}

// Profile photos
{{ $photo := $img.Resize "400x400 center webp q85 lanczos" }}

// Post cover images (full-width)
{{ $cover := $img.Fill "1200x630 smart webp q85 lanczos" }}
```

**Configuration in `hugo.toml`:**
```toml
[imaging]
  resampleFilter = "lanczos"    # High-quality downscaling
  quality = 85                  # File size vs. quality balance
  anchor = "Smart"              # Content-aware cropping (faces, subjects)
  bgColor = "#ffffff"           # White background for transparency
```

**⚠ Requirement:** Images used in galleries MUST be **page resources** (in the same directory as `index.md`), not in `static/`. Images in `static/` cannot be processed by Hugo's pipeline.

---

## 7. Data Architecture

### 7.1 Hugo Data Files

Data files in `data/` are accessible in any template via `.Site.Data`:

```go
// Access village data
{{ range .Site.Data.villages.mali_villages }}
  {{ .name }}: {{ .latitude }}, {{ .longitude }}
{{ end }}

// Access site settings
{{ .Site.Data.settings.general.mission }}
```

### 7.2 Village Data Schema (`data/villages/mali_villages.yaml`)

This is the **single source of truth** for all geographic and project data:

```yaml
- name: "Douentza"
  latitude: 15.0042
  longitude: -2.9553
  type: "chef-lieu"          # "village" or "chef-lieu"
  description: "Capital de cercle..."
  population: 25000
  projects:
    - "école"
    - "santé"
    - "eau"
    - "puits"
    - "agriculture"
```

**Pattern:** The `villages` taxonomy in content frontmatter (`villages: ["dorool"]`) provides the URL routing. The actual geographic data (coordinates, population, projects) is fetched from this YAML file in templates using the village name as a lookup key.

### 7.3 Site Settings (`data/settings/general.yml`)

```yaml
name: "Leidimen"
mission: "Association de solidarité..."
tagline: "Ensemble pour les villages de Douentza"
contact:
  email: "association@leidimen.com"
  address: "14 rue des Pommiers, 91070 Bondoufle"
social:
  facebook: "..."
  twitter: "..."
  linkedin: "..."
```

### 7.4 Hugo Parameters (`hugo.toml [params]`)

Site-wide parameters accessible via `.Site.Params.*`:

```toml
[params]
  image       = "images/leidimen-logo.jpg"    # Default OG image
  description = "Association de solidarité..."
  address     = "Association Leidimen, 14 rue des Pommiers..."
  avatarurl   = "/images/leidimen-logo.jpg"
  Ganalytics  = ""                             # Google Analytics (empty = disabled)
```

---

## 8. Cross-Cutting Concerns

### 8.1 SEO Architecture

SEO is implemented as a **modular partial system** in `layouts/partials/seo/`:

```go
// In head.html — dispatches to appropriate schema
{{ partial "seo/json-ld.html" . }}     // Routes based on .Type
{{ partial "seo/opengraph.html" . }}   // og:title, og:image, og:description
{{ partial "seo/twitter.html" . }}     // twitter:card, twitter:title
{{ partial "seo/breadcrumb.html" . }}  // BreadcrumbList schema
{{ partial "seo/ai-meta.html" . }}     // Robots directives for AI bots
```

JSON-LD schema types supported:
- `BlogPosting` / `Article` (posts)
- `Person` (team members)
- `ImageGallery` (galleries)
- `Event` (events)
- `FAQPage` (FAQ shortcode)
- `HowTo` (how-to shortcode)
- `Organization` (site-level)
- `BreadcrumbList` (all pages)

### 8.2 Dark Mode

**Implementation:** Bootstrap 5 `data-bs-theme` attribute on `<html>` element.

```js
// assets/js/darkmode.js pattern
const theme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-bs-theme", theme);

toggleButton.addEventListener("click", () => {
  const newTheme = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});
```

CSS variables in `_variables.scss` define both themes:
```scss
:root[data-bs-theme="light"] { --surface: #ffffff; --text: #212529; }
:root[data-bs-theme="dark"]  { --surface: #272d3f; --text: #e9ecef; }
```

### 8.3 Accessibility

| Concern | Implementation |
|---------|---------------|
| Skip navigation | `.skip-link` in baseof.html, `href="#main-content"` |
| Landmark roles | `role="main"` on `<main>`, `role="contentinfo"` on `<footer>` |
| Image alt text | Required in all image shortcodes; gallery images use filename as fallback |
| ARIA labels | `aria-label` on interactive elements (gallery items, buttons) |
| Keyboard navigation | Bootstrap handles focus management for dropdowns/modals |
| Color contrast | Bootstrap 5 WCAG AA compliant base; custom `_variables.scss` must maintain ratios |

### 8.4 CMS Authentication

Netlify Identity is loaded in `layouts/partials/head.html`:

```html
<!-- Netlify Identity Widget -->
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

Auto-redirect to CMS on login (in baseof.html):
```js
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
```

### 8.5 PhotoSwipe Deduplication (Scratch Pattern)

PhotoSwipe must be loaded exactly once per page. The Scratch pad prevents duplicate loading:

```go
// In gallery.html shortcode — safe to call multiple times on same page
{{- if not ($.Page.Scratch.Get "photoswipeloaded") -}}
  {{ $.Page.Scratch.Set "photoswipeloaded" 1 }}
  {{ partial "photoswipe-resources.html" . }}
  {{ partial "photoswipe-structure.html" . }}
{{- end -}}
```

**⚠ Rule:** Never call `photoswipe-resources.html` directly from templates. Always use this Scratch guard or call `{{< gallery >}}` which includes it automatically.

### 8.6 Performance

| Optimization | Implementation |
|-------------|---------------|
| Image lazy loading | `loading="lazy"` on all non-critical images |
| WebP format | Hugo image processing outputs WebP by default |
| CSS/HTML minification | `hugo --minify` in production builds |
| SRI hashes | `fingerprint` pipe on compiled CSS |
| Resource hints | `partials/performance-hints.html` (preconnect, prefetch) |
| Build caching | GitHub Actions Hugo cache via `runner.temp/hugo_cache` |
| JS minification | Disabled (preserves ES6+ syntax) — minification deferred to CDN/edge |

---

## 9. Deployment Architecture

### 9.1 Dual Deployment Topology

```
GitHub (main branch)
       │
       ├──────────────────────────────────┐
       │                                  │
       ▼                                  ▼
GitHub Actions                      Netlify Auto-Deploy
(hugo.yaml)                         (netlify.toml)
       │                                  │
       ▼                                  ▼
GitHub Pages                        Netlify CDN
hdicko.github.io/leidimen/          leidimen.netlify.app
(subdirectory path)                 (root path)
```

### 9.2 GitHub Actions Pipeline (`.github/workflows/hugo.yaml`)

```yaml
Trigger: push to main, workflow_dispatch

Environment:
  Go:       1.24.5
  Node.js:  22.18.0
  Hugo:     0.148.2
  Dart Sass: 1.90.0

Steps:
  1. Checkout (recursive submodules)
  2. Setup Go
  3. Setup Node.js (with npm cache)
  4. Download & install Dart Sass
  5. Setup Hugo
  6. npm ci (install node_modules)
  7. hugo --gc --minify (build with cache)
  8. Upload artifact to GitHub Pages
  9. Deploy via pages deploy action

Permissions: contents:read, pages:write, id-token:write
```

### 9.3 Netlify Build (`netlify.toml`)

```toml
[build.environment]
  DART_SASS_VERSION = "1.93.2"
  GO_VERSION        = "1.25.1"
  HUGO_VERSION      = "0.157.0"
  NODE_VERSION      = "22.18.0"
  TZ                = "Europe/Oslo"

[build]
  command   = "npm ci && hugo --gc --minify --baseURL $DEPLOY_PRIME_URL"
  publish   = "public"
```

### 9.4 Local Development

```bash
# Start dev server (overrides baseURL for local routing)
./dev-server.sh
# or: npm run dev

# Server available at: http://localhost:1313/
# Hot reload enabled, drafts visible
# Netlify CMS at: http://localhost:1313/admin/
```

### 9.5 Manual GitHub Pages Deploy

```bash
# deploy.sh — builds and force-pushes to gh-pages branch
hugo --gc --cleanDestinationDir --minify
cd public/
git init && git add .
git commit -m "Deploy"
git push --force origin HEAD:gh-pages
```

**⚠ baseURL:** The site uses `baseURL = 'https://hdicko.github.io/leidimen/'` (subdirectory). Always use `.RelPermalink` not `.Permalink` in templates for relative path compatibility.

---

## 10. Key Implementation Patterns

### 10.1 Image Processing Pattern

```go
{{- $img := .Resources.GetMatch "*.{jpg,jpeg,png,gif}" -}}
{{- if $img -}}
  {{- $thumb := $img.Fill "400x300 webp q85 lanczos" -}}
  <img src="{{ $thumb.RelPermalink }}"
       width="{{ $thumb.Width }}"
       height="{{ $thumb.Height }}"
       alt="{{ .Title }}"
       loading="lazy">
{{- end -}}
```

### 10.2 Data File Lookup Pattern

```go
{{- $villageName := .Params.village | lower -}}
{{- range .Site.Data.villages.mali_villages -}}
  {{- if eq (lower .name) $villageName -}}
    <p>Population: {{ .population }}</p>
    <p>Coords: {{ .latitude }}, {{ .longitude }}</p>
  {{- end -}}
{{- end -}}
```

### 10.3 Client-Side Post Filtering Pattern (posts/list.html)

Posts use `data-*` attributes to enable zero-server-side JS filtering:

```html
<!-- Template renders data attributes -->
<article
  data-title="{{ lower $post.Title }}"
  data-date="{{ $post.Date.Format "2006-01-02" }}"
  data-year="{{ $post.Date.Format "2006" }}"
  class="post-card">
```

```js
// darkmode.js / inline script filters by querying dataset
document.querySelectorAll('article[data-title]').forEach(card => {
  const matches = card.dataset.title.includes(query.toLowerCase());
  card.style.display = matches ? '' : 'none';
});
```

### 10.4 Structured Data Pattern

JSON-LD is injected inline in `<head>` for every page type:

```go
// partials/seo/article-schema.html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": {{ .Title | jsonify }},
  "datePublished": "{{ .Date.Format "2006-01-02" }}",
  "author": { "@type": "Organization", "name": "{{ .Site.Title }}" },
  "image": "{{ with .Params.image }}{{ . | absURL }}{{ end }}"
}
</script>
```

### 10.5 Team Member Role Badge Pattern

```go
{{- $membre := .Params.card.membre -}}
{{- $isFounder := in $membre "fondateur" -}}
{{- $isBureau  := in $membre "bureau" -}}

{{- if $isFounder -}}
  <span class="badge bg-warning"><i class="bi bi-award"></i> Fondateur</span>
{{- else if $isBureau -}}
  <span class="badge bg-primary"><i class="bi bi-shield"></i> Bureau</span>
{{- end -}}
```

### 10.6 Gallery Page Bundle Pattern

```
content/galleries/my-event/
├── index.md              ← gallery metadata + {{< gallery >}} shortcode
├── photo-001.jpg         ← page resource
├── photo-002.jpg         ← page resource
└── photo-003.jpg         ← page resource
```

```go
// gallery.html shortcode processes all image resources
{{ range .Page.Resources.ByType "image" }}
  {{ $thumb := .Fill "400x500 top webp q85 lanczos" }}
  <a href="{{ .RelPermalink }}" data-lightbox="gallery">
    <img src="{{ $thumb.RelPermalink }}" alt="{{ .Name }}" loading="lazy">
  </a>
{{ end }}
```

---

## 11. Extension & Evolution Guide

### 11.1 Adding a New Village

1. **Data file** — Add to `data/villages/mali_villages.yaml`:
   ```yaml
   - name: "NewVillage"
     latitude: 15.xxxx
     longitude: -2.xxxx
     type: "village"
     description: "Description en français"
     population: 1000
     projects: ["école", "santé"]
   ```

2. **Content page** — Create `content/villages/newvillage/_index.md`:
   ```yaml
   ---
   title: "NewVillage"
   type: "villages"
   ---
   ```

3. **Taxonomy** — Use lowercase in posts: `villages: ["newvillage"]`

4. **Netlify CMS** — Add to `static/admin/config.yml` village select options

5. **Hugo taxonomy config** — No change needed; Hugo auto-discovers taxonomy values

### 11.2 Adding a New Section Type

1. Create `content/mysection/_index.md` with appropriate `type`
2. Create `layouts/mysection/list.html` (listing) and `layouts/mysection/single.html` (detail)
3. Add section to `hugo.toml` menus if needed
4. Create archetype at `archetypes/mysection.md` for `hugo new` command

### 11.3 Adding a New Partial

1. Create file in `layouts/partials/my-partial.html`
2. Call it: `{{ partial "my-partial.html" . }}` or `{{ partial "my-partial.html" $context }}`
3. For performance-sensitive partials, use `partialCached`:
   ```go
   {{ partialCached "my-partial.html" . .Type }}
   ```

### 11.4 Adding a New Shortcode

1. Create `layouts/shortcodes/my-shortcode.html`
2. Access params: `{{ .Get "param-name" }}` (named) or `{{ .Get 0 }}` (positional)
3. Access inner content: `{{ .Inner }}`
4. Use in Markdown: `{{< my-shortcode param="value" >}}`

### 11.5 Adding CSS for a New Page

1. Create `assets/scss/pages/_my-page.scss`
2. Either:
   - **Global** — Add `@import "pages/my-page"` to `assets/scss/index.scss`
   - **Page-scoped** — Compile inline in template:
     ```go
     {{ $css := resources.Get "scss/pages/my-page.scss" | toCSS | minify | fingerprint }}
     <link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
     ```

### 11.6 Integrating a New External Service

Follow the adapter pattern — keep third-party dependencies isolated in partials:

1. Create `layouts/partials/integrations/my-service.html`
2. Load conditionally: `{{ if .Site.Params.myServiceToken }}{{ partial "integrations/my-service.html" . }}{{ end }}`
3. Add token to `hugo.toml [params]` and Netlify environment variables
4. Never hardcode API keys — use `hugo.toml` params or environment variables

---

## 12. Architectural Decision Records

### ADR-001: Hugo Over WordPress

**Context:** The site originally ran on WordPress (leidimen.com, 2006-2017).  
**Decision:** Migrated to Hugo static site generator.  
**Rationale:**
- Eliminates server maintenance and hosting costs
- No database = no SQL injection, no WordPress vulnerabilities
- Sub-second page loads without caching plugins
- Version-controlled content alongside code
- Free GitHub Pages hosting

**Consequences:** Migration scripts required (`migrate-wordpress-*.py`); some dynamic features (comments, forms) require third-party services.

---

### ADR-002: Dual Deployment (GitHub Pages + Netlify)

**Context:** Need reliable hosting with CMS capability.  
**Decision:** Primary on GitHub Pages (free, reliable), secondary on Netlify (CMS identity, preview deploys).  
**Rationale:**
- GitHub Pages: permanent free hosting, custom domain support
- Netlify: provides Identity service required for Netlify CMS authentication
- Same build artifact works for both

**Consequences:** `baseURL` must use subdirectory path for GitHub Pages (`/leidimen/`). Templates must use `.RelPermalink`.

---

### ADR-003: No JavaScript Framework

**Context:** Dynamic UI needs (dark mode, gallery filtering, animations).  
**Decision:** Vanilla ES6 JavaScript modules only; no React/Vue/Alpine.  
**Rationale:**
- Static site has minimal interactive surface area
- Framework overhead (100KB+) not justified
- Hugo templating covers 95% of UI needs at build time
- Data attributes (`data-title`, `data-year`) enable client-side filtering without JS state management

**Consequences:** Complex SPA-style features are not supported. For future interactive requirements (e.g., real-time donation tracking), a micro-frontend or embedded widget approach is recommended.

---

### ADR-004: Year-Based Post Organization

**Context:** WordPress migration resulted in topic-named post directories.  
**Decision:** New posts must use year-based directories (`content/posts/YYYY/`).  
**Rationale:**
- Predictable URL structure: `/posts/2025/my-post/`
- Easier annual archiving
- Consistent with Hugo community conventions
- Simplifies migration scripts

**Consequences:** Legacy directories (`Hammadoun/souvenir/`) remain for backward compatibility but no new content should be added to them.

---

### ADR-005: Page Resources for Gallery Images

**Context:** Gallery images could be placed in `static/` or as page resources.  
**Decision:** Gallery images are page resources (same folder as `index.md`).  
**Rationale:**
- Hugo's image processing pipeline only works on page resources
- WebP conversion, resizing, and fingerprinting require `.Resources`
- Colocation of content + images simplifies management

**Consequences:** Gallery pages must be page bundles with `index.md` (not `my-gallery.md`). Images in `static/` are not processable and should only be used for team photos and uploads.

---

### ADR-006: Custom Taxonomies for Villages

**Context:** Content needs geographic classification beyond standard tags.  
**Decision:** Custom `villages` taxonomy alongside standard tags/categories.  
**Rationale:**
- Enables `/villages/dorool/` pages aggregating all content for a village
- RSS and JSON feeds auto-generated per village
- Decouples routing (taxonomy) from detailed data (YAML data file)

**Consequences:** Village values must be lowercase in frontmatter. Village data (coordinates, population) is maintained separately in `data/villages/mali_villages.yaml`.

---

## 13. Blueprint for New Development

### 13.1 Adding a New Blog Post

```bash
# Option 1: Hugo CLI (creates from archetype)
hugo new posts/2026/my-article.md

# Option 2: cms-web interface
cd cms-web && npm start

# Option 3: Netlify CMS
# → http://localhost:1313/admin/ (requires local backend running)
```

Required frontmatter checklist:
- [ ] `title` — non-empty
- [ ] `date` — ISO format `YYYY-MM-DD`
- [ ] `type: "posts"` — required for routing
- [ ] `villages` — lowercase array values
- [ ] `description` — 150-160 characters for SEO
- [ ] `draft: false` — when ready to publish

### 13.2 Adding a Photo Gallery

```bash
mkdir -p content/galleries/my-event-2026
# Copy images into that directory
# Create index.md with:
```

```yaml
---
title: "Mon Événement 2026"
date: 2026-03-06
type: "galleries"
villages: ["douentza"]
description: "Photos de l'événement"
---
{{< gallery >}}
```

### 13.3 Adding a Team Member

```bash
hugo new equipe/firstname-lastname.md
# Then edit with full frontmatter (see §4.2)
# Place photo at: static/images/team/firstname.jpg
```

### 13.4 Development Workflow

```bash
# 1. Start dev server
./dev-server.sh               # http://localhost:1313

# 2. Make changes (hot reload active)

# 3. Validate formatting
npm run format:check

# 4. Build production
npm run build                 # Check for errors

# 5. Run E2E tests
python3 -m pytest tests/test_leidimen_playwright.py --browser=chromium -v

# 6. Deploy
./deploy.sh                   # GitHub Pages
# or push to main → auto-deploys via GitHub Actions + Netlify
```

### 13.5 Common Pitfalls to Avoid

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Uppercase village taxonomy | `villages: ["Dorool"]` | Always use lowercase: `["dorool"]` |
| `type` missing on posts | Post not found under `/posts/` | Add `type: "posts"` to frontmatter |
| Images in `static/` for galleries | Cannot be resized/converted to WebP | Put gallery images next to `index.md` |
| Calling PhotoSwipe partials directly | Loads twice, breaks lightbox | Use Scratch guard or `{{< gallery >}}` |
| Using `.Permalink` instead of `.RelPermalink` | Broken links in subdirectory hosting | Always use `.RelPermalink` in templates |
| Post in topic directory | Inconsistent URL structure | Always use `content/posts/YYYY/` |
| Gallery as `my-gallery.md` | Page resources not found | Must be `my-gallery/index.md` bundle |

### 13.6 Testing Checklist

Before any deployment:

- [ ] `npm run build` completes without errors or warnings
- [ ] `npm run format:check` passes
- [ ] `./dev-server.sh` — verify pages render correctly in browser
- [ ] Dark mode toggle works on `/`
- [ ] Gallery lightbox opens on `/galleries/` pages
- [ ] Village taxonomy links resolve correctly
- [ ] Mobile hamburger menu opens on narrow viewport
- [ ] `python3 -m pytest tests/test_leidimen_playwright.py --browser=chromium` — all 33 tests pass

---

## Appendix A: Hugo Template Functions Reference

Frequently used Hugo functions in this codebase:

| Function | Example | Purpose |
|----------|---------|---------|
| `range` | `{{ range .Pages }}` | Iterate over collection |
| `with` | `{{ with .Params.image }}` | Conditional + scope change |
| `partial` | `{{ partial "head.html" . }}` | Include partial template |
| `resources.Get` | `{{ resources.Get "scss/index.scss" }}` | Get asset resource |
| `toCSS` | `\| toCSS (dict "transpiler" "dartsass")` | Compile SCSS |
| `minify` | `\| minify` | Minify asset |
| `fingerprint` | `\| fingerprint` | Add content hash to URL |
| `.Fill` | `{{ $img.Fill "400x300 webp q85" }}` | Crop + resize image |
| `.Resize` | `{{ $img.Resize "800x webp" }}` | Resize (preserve ratio) |
| `countwords` | `{{ countwords .Content }}` | Word count |
| `dateFormat` | `{{ .Date \| dateFormat "02 Jan 2006" }}` | Format date |
| `absURL` | `{{ .Params.image \| absURL }}` | Make absolute URL |
| `.RelPermalink` | `{{ $img.RelPermalink }}` | Relative URL to resource |
| `jsonify` | `{{ .Title \| jsonify }}` | JSON-safe string |
| `lower` | `{{ .Name \| lower }}` | Lowercase string |
| `in` | `{{ if in .Params.membre "fondateur" }}` | Array membership check |
| `len` | `{{ len .Pages }}` | Collection length |
| `math.Ceil` | `{{ math.Ceil (div $words 200.0) }}` | Round up |
| `$.Page.Scratch.Set` | `{{ $.Page.Scratch.Set "key" 1 }}` | Per-page state storage |
| `$.Page.Scratch.Get` | `{{ $.Page.Scratch.Get "key" }}` | Read per-page state |
| `partialCached` | `{{ partialCached "nav.html" . .Type }}` | Cached partial (perf) |
| `$.Site.Data` | `{{ $.Site.Data.villages.mali_villages }}` | Access data files |

---

## Appendix B: File Naming Conventions

| Content Type | Convention | Example |
|-------------|-----------|---------|
| Blog posts | `kebab-case.md` | `maraichage-diona-2025.md` |
| Team members | `camelCase.md` | `hamadounDicko.md` |
| Gallery bundles | `kebab-case/index.md` | `soiree-2025/index.md` |
| Village pages | `lowercase/_index.md` | `dorool/_index.md` |
| Partials | `kebab-case.html` | `post-preview.html` |
| SCSS partials | `_kebab-case.scss` | `_variables.scss` |
| JS modules | `camelCase.js` | `darkmode.js` |

---

*Blueprint last updated: 2026-03-06. Review and update after significant template changes, new section types, or Hugo version upgrades.*
