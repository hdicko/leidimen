# Hugo Content Management

Docs: https://gohugo.io/content-management/

## Front Matter

```yaml
---
title: "My Post"
date: 2024-03-15T10:00:00-05:00
lastmod: 2024-03-16
draft: false
description: "A brief description for SEO"
summary: "Custom summary text"
slug: "custom-url-slug"
url: "/custom/full/path/"
aliases: ["/old-url/", "/another-old-url/"]

# Taxonomies
tags: ["hugo", "static-site"]
categories: ["tutorials"]
series: ["hugo-guide"]
authors: ["your-name"]

# Display
weight: 10                 # Sort order (lower = first)
layout: "custom-layout"    # Override template
type: "posts"              # Override content type

# Images
images: ["cover.jpg"]      # For Open Graph
featured_image: "hero.jpg"

# Table of contents
toc: true

# Publishing
publishDate: 2024-04-01    # Future publish date
expiryDate: 2025-01-01     # Content expiration

# Build
_build:
  list: always             # always, never, local
  render: always           # always, never, link
cascade:                   # Apply params to all descendants
  showReadingTime: true
---
```

## Page Bundles

### Leaf Bundle (no children)

```
content/posts/my-post/
├── index.md           # Page content
├── cover.jpg          # Page resource
├── data.csv           # Page resource
└── gallery/
    ├── photo1.jpg
    └── photo2.jpg
```

Access resources in templates:

```go-html-template
{{ with .Resources.Get "cover.jpg" }}
  {{ $img := .Resize "800x webp" }}
  <img src="{{ $img.RelPermalink }}" alt="Cover">
{{ end }}

{{ range .Resources.Match "gallery/*" }}
  {{ $thumb := .Resize "200x200 webp" }}
  <img src="{{ $thumb.RelPermalink }}">
{{ end }}
```

### Branch Bundle (has children)

```
content/posts/
├── _index.md          # Section page (note the underscore)
├── first-post.md
├── second-post/
│   ├── index.md
│   └── image.jpg
└── third-post.md
```

`_index.md` defines the section page. `index.md` (no underscore) defines a leaf page.

## Sections

Top-level directories under `content/` are sections. Nested sections require `_index.md`:

```
content/
├── blog/              # Section
│   ├── _index.md
│   ├── post-1.md
│   └── tutorials/     # Nested section (has _index.md)
│       ├── _index.md
│       └── tutorial-1.md
├── docs/              # Section
│   ├── _index.md
│   └── getting-started.md
└── _index.md          # Homepage
```

Query sections in templates:

```go-html-template
{{/* All regular pages in section */}}
{{ range where site.RegularPages "Section" "blog" }}

{{/* All pages in current section */}}
{{ range .Pages }}

{{/* All regular pages recursively */}}
{{ range .RegularPagesRecursive }}
```

## Taxonomies

Defined in `hugo.toml`:

```toml
[taxonomies]
  tag = 'tags'
  category = 'categories'
  series = 'series'
```

Assign in front matter:

```yaml
tags: ["go", "hugo"]
categories: ["tutorials"]
series: ["learn-hugo"]
```

Access in templates:

```go-html-template
{{/* List all tags */}}
{{ range site.Taxonomies.tags }}
  <a href="{{ .Page.RelPermalink }}">{{ .Page.Title }} ({{ .Count }})</a>
{{ end }}

{{/* Tags for current page */}}
{{ with .GetTerms "tags" }}
  {{ range . }}
    <a href="{{ .RelPermalink }}">{{ .LinkTitle }}</a>
  {{ end }}
{{ end }}
```

## Menus

### Menu via front matter

```yaml
---
title: "About"
menus:
  main:
    weight: 30
    name: "About Us"    # Optional, defaults to title
    parent: "company"   # For nested menus
---
```

### Menu in config

See [configuration.md](configuration.md) for `hugo.toml` menu config.

## Archetypes

Content templates for `hugo new content`. Place in `archetypes/`:

```
archetypes/
├── default.md          # Fallback
├── posts.md            # For `hugo new content posts/my-post.md`
└── docs/
    └── index.md        # For `hugo new content docs/my-doc/index.md`
```

Example archetype:

```yaml
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
tags: []
categories: []
description: ""
---

Write your content here.
```

## Multilingual Content

Docs: https://gohugo.io/content-management/multilingual/

### By filename

```
content/posts/
├── my-post.en.md      # English
├── my-post.fr.md      # French
└── my-post.es.md      # Spanish
```

### By directory

```
content/
├── en/
│   └── posts/
│       └── my-post.md
├── fr/
│   └── posts/
│       └── my-post.md
```

### Language switcher

```go-html-template
{{ if site.IsMultiLingual }}
  {{ range .Translations }}
    <a href="{{ .RelPermalink }}">{{ .Language.LanguageName }}</a>
  {{ end }}
{{ end }}
```

## Content Summaries

Hugo auto-generates summaries. Control them:

```markdown
---
summary: "Explicit summary in front matter"
---

Or use the summary divider in content:

This appears in the summary.

<!--more-->

This only appears on the full page.
```

```go-html-template
{{ .Summary }}                 {{/* Auto or manual summary */}}
{{ .Truncated }}               {{/* true if content was truncated */}}
{{ .WordCount }}               {{/* Total word count */}}
{{ .ReadingTime }}             {{/* Estimated reading time in minutes */}}
```
