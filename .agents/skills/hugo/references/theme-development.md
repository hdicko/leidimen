# Hugo Theme Development

Docs: https://gohugo.io/hugo-modules/theme-components/

## Creating a Theme

```bash
hugo new theme my-theme
```

### Theme Directory Structure

```
themes/my-theme/
├── archetypes/
│   └── default.md
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
├── content/
├── data/
├── i18n/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html      # Base template (all pages inherit)
│   │   ├── home.html         # Homepage template
│   │   ├── list.html         # Section/list pages
│   │   └── single.html       # Individual content pages
│   ├── _partials/
│   │   ├── head.html
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── sidebar.html
│   ├── _shortcodes/
│   └── 404.html
├── static/
│   ├── images/
│   └── fonts/
├── hugo.toml
├── theme.toml               # Theme metadata
├── LICENSE
└── README.md
```

### theme.toml

```toml
name = 'My Theme'
license = 'MIT'
licenselink = 'https://github.com/user/hugo-theme-mytheme/blob/main/LICENSE'
description = 'A clean Hugo theme'
homepage = 'https://github.com/user/hugo-theme-mytheme'
tags = ['blog', 'responsive', 'minimal']
features = ['syntax-highlighting', 'dark-mode']
min_version = '0.128.0'

[author]
  name = 'Your Name'
  homepage = 'https://example.com'
```

## Template Lookup Order

Hugo finds templates using specificity rules. Most specific wins. Project layouts override theme layouts.

Docs: https://gohugo.io/templates/lookup-order/

For a **single page** in section `posts` with type `posts` and layout unset:
1. `layouts/posts/single.html`
2. `layouts/_default/single.html`

For a **list page** (section `posts`):
1. `layouts/posts/list.html`
2. `layouts/_default/list.html`

For the **homepage**:
1. `layouts/_default/home.html`
2. `layouts/_default/list.html`

For **baseof** (base template):
1. `layouts/posts/baseof.html`
2. `layouts/_default/baseof.html`

**Key rule**: Project `layouts/` always takes precedence over `themes/<name>/layouts/`.

## Base Template (baseof.html)

The root template all pages inherit from:

```go-html-template
<!DOCTYPE html>
<html lang="{{ site.Language.LanguageCode }}" dir="{{ or site.Language.LanguageDirection `ltr` }}">
<head>
  {{ partial "head.html" . }}
</head>
<body class="{{ block "body-class" . }}{{ end }}">
  {{ partial "header.html" . }}
  <main>
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
  {{ block "scripts" . }}{{ end }}
</body>
</html>
```

## Single Page Template

```go-html-template
{{ define "main" }}
<article>
  <header>
    <h1>{{ .Title }}</h1>
    <time datetime="{{ .Date.Format "2006-01-02" }}">
      {{ .Date.Format "January 2, 2006" }}
    </time>
    {{ with .Params.tags }}
      <div class="tags">
        {{ range . }}
          <a href="{{ "tags/" | absURL }}{{ . | urlize }}">{{ . }}</a>
        {{ end }}
      </div>
    {{ end }}
  </header>

  {{ if .Params.toc }}
    <nav class="toc">
      {{ .TableOfContents }}
    </nav>
  {{ end }}

  <div class="content">
    {{ .Content }}
  </div>

  {{ with .PrevInSection }}
    <a href="{{ .RelPermalink }}">← {{ .Title }}</a>
  {{ end }}
  {{ with .NextInSection }}
    <a href="{{ .RelPermalink }}">{{ .Title }} →</a>
  {{ end }}
</article>
{{ end }}
```

## List Template

```go-html-template
{{ define "main" }}
<h1>{{ .Title }}</h1>
{{ .Content }}

{{ $paginator := .Paginate .Pages }}
{{ range $paginator.Pages }}
  <article>
    <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
    <time>{{ .Date.Format "Jan 2, 2006" }}</time>
    <p>{{ .Summary }}</p>
    {{ if .Truncated }}
      <a href="{{ .RelPermalink }}">Read more...</a>
    {{ end }}
  </article>
{{ end }}

{{ template "_internal/pagination.html" . }}
{{ end }}
```

## Home Template

```go-html-template
{{ define "main" }}
{{ .Content }}

<h2>Recent Posts</h2>
{{ range first 5 (where site.RegularPages "Section" "posts") }}
  <article>
    <h3><a href="{{ .RelPermalink }}">{{ .Title }}</a></h3>
    <time>{{ .Date.Format "Jan 2, 2006" }}</time>
    <p>{{ .Summary }}</p>
  </article>
{{ end }}
{{ end }}
```

## Partials

Docs: https://gohugo.io/templates/partial/

### head.html

```go-html-template
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ if .IsHome }}{{ site.Title }}{{ else }}{{ .Title }} | {{ site.Title }}{{ end }}</title>
<meta name="description" content="{{ with .Description }}{{ . }}{{ else }}{{ site.Params.description }}{{ end }}">

{{/* Open Graph */}}
{{ template "_internal/opengraph.html" . }}
{{ template "_internal/twitter_cards.html" . }}
{{ template "_internal/schema.html" . }}

{{/* CSS */}}
{{ with resources.Get "css/main.css" }}
  {{ $css := . | minify | fingerprint }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
{{ end }}

{{/* Favicon */}}
<link rel="icon" href="{{ "favicon.ico" | absURL }}">

{{/* RSS */}}
{{ range .AlternativeOutputFormats }}
  {{ printf `<link rel="%s" type="%s" href="%s" title="%s">` .Rel .MediaType.Type .Permalink (printf "%s - %s" $.Title site.Title) | safeHTML }}
{{ end }}
```

### Cached Partials

For expensive operations, use `partialCached`:

```go-html-template
{{/* Cache by no variant — same for all pages */}}
{{ partialCached "header.html" . }}

{{/* Cache per section */}}
{{ partialCached "sidebar.html" . .Section }}

{{/* Cache per page */}}
{{ partialCached "related.html" . .RelPermalink }}
```

### Returning Values from Partials

```go-html-template
{{/* partials/get-reading-time.html */}}
{{ $wordCount := .WordCount }}
{{ $readingTime := math.Max 1 (math.Round (div (float $wordCount) 200.0)) }}
{{ return $readingTime }}
```

Usage: `{{ $time := partial "get-reading-time.html" . }}`

## Taxonomy Templates

For tags, categories, etc.

### Taxonomy list (all terms): `layouts/_default/taxonomy.html`

```go-html-template
{{ define "main" }}
<h1>{{ .Title }}</h1>
{{ range .Pages }}
  <div>
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
    ({{ .Pages | len }} {{ i18n "posts" }})
  </div>
{{ end }}
{{ end }}
```

### Term page (posts with a specific tag): `layouts/_default/term.html`

```go-html-template
{{ define "main" }}
<h1>{{ .Title }}</h1>
{{ range .Pages }}
  <article>
    <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
    <time>{{ .Date.Format "Jan 2, 2006" }}</time>
  </article>
{{ end }}
{{ end }}
```

## 404 Template

```go-html-template
{{ define "main" }}
<h1>Page Not Found</h1>
<p>The page you're looking for doesn't exist.</p>
<a href="{{ "/" | absURL }}">Go home</a>
{{ end }}
```

## Overriding Theme Templates

To customize a theme template without forking, copy the file from `themes/<name>/layouts/` to `layouts/` at the same relative path. Project templates always take precedence.

```bash
# Override the theme's single.html
cp themes/my-theme/layouts/_default/single.html layouts/_default/single.html
# Edit layouts/_default/single.html
```

Themes can also provide empty "hook" partials that users override:

```go-html-template
{{/* In theme: layouts/_partials/custom-head.html (empty) */}}
{{/* User creates layouts/_partials/custom-head.html with their additions */}}
```
