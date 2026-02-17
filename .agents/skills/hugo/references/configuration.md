# Hugo Configuration

Docs: https://gohugo.io/configuration/introduction/

## Configuration File

Hugo supports `hugo.toml`, `hugo.yaml`, or `hugo.json`. TOML is preferred.

### Minimal Configuration

```toml
baseURL = 'https://example.com/'
languageCode = 'en-us'
title = 'My Site'
theme = 'my-theme'
```

### Comprehensive Configuration

```toml
baseURL = 'https://example.com/'
title = 'My Site'
languageCode = 'en-us'
defaultContentLanguage = 'en'
theme = 'my-theme'

# Build settings
buildDrafts = false
buildFuture = false
buildExpired = false

# URL settings
canonifyURLs = false
relativeURLs = false
uglyURLs = false          # false = /post/title/ ; true = /post/title.html

# Content
summaryLength = 70
paginate = 10
enableRobotsTXT = true
enableEmoji = true

# Taxonomies
[taxonomies]
  tag = 'tags'
  category = 'categories'
  series = 'series'
  author = 'authors'

# Permalinks
[permalinks]
  [permalinks.page]
    posts = '/posts/:year/:month/:slug/'
  [permalinks.section]
    posts = '/posts/'

# Params (available in templates via .Site.Params)
[params]
  description = 'A Hugo site'
  author = 'Your Name'
  mainSections = ['posts']
  dateFormat = 'January 2, 2006'
  showReadingTime = true
  showShareButtons = true

# Markup configuration
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = false       # Set true to allow raw HTML in markdown
  [markup.highlight]
    style = 'monokai'
    lineNos = true
    guessSyntax = true
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 4

# Output formats
[outputs]
  home = ['HTML', 'RSS', 'JSON']
  section = ['HTML', 'RSS']
  page = ['HTML']

# Minification
[minify]
  disableHTML = false
  disableCSS = false
  disableJS = false
  disableSVG = false

# Privacy (GDPR)
[privacy]
  [privacy.youtube]
    privacyEnhanced = true
  [privacy.instagram]
    simple = true
```

## Menus

```toml
# In hugo.toml or config/_default/menus.toml
[[menus.main]]
  name = 'Home'
  pageRef = '/'
  weight = 10

[[menus.main]]
  name = 'Posts'
  pageRef = '/posts'
  weight = 20

[[menus.main]]
  name = 'About'
  pageRef = '/about'
  weight = 30

# Nested menu
[[menus.main]]
  name = 'Docs'
  identifier = 'docs'
  weight = 40

[[menus.main]]
  name = 'Getting Started'
  parent = 'docs'
  pageRef = '/docs/getting-started'
  weight = 1

# Footer menu
[[menus.footer]]
  name = 'Privacy'
  pageRef = '/privacy'
  weight = 10
```

Menu in templates:

```go-html-template
<nav>
  <ul>
    {{ range site.Menus.main }}
      <li>
        <a href="{{ .URL }}"{{ if $.IsMenuCurrent "main" . }} class="active"{{ end }}>
          {{ .Name }}
        </a>
        {{ if .HasChildren }}
          <ul>
            {{ range .Children }}
              <li><a href="{{ .URL }}">{{ .Name }}</a></li>
            {{ end }}
          </ul>
        {{ end }}
      </li>
    {{ end }}
  </ul>
</nav>
```

## Config Directory Structure

For complex sites, split configuration into a `config/` directory:

```
config/
├── _default/
│   ├── hugo.toml        # Base configuration
│   ├── menus.toml       # Menu definitions
│   ├── params.toml      # Site parameters
│   └── languages.toml   # Language settings
├── production/
│   └── hugo.toml        # Production overrides
└── staging/
    └── hugo.toml        # Staging overrides
```

Use environment with: `hugo --environment production`

## Multilingual Configuration

```toml
defaultContentLanguage = 'en'
defaultContentLanguageInSubdir = false

[languages]
  [languages.en]
    languageCode = 'en'
    languageName = 'English'
    weight = 1
    title = 'My Site'
  [languages.fr]
    languageCode = 'fr'
    languageName = 'Français'
    weight = 2
    title = 'Mon Site'
    [languages.fr.params]
      description = 'Un site Hugo'
```

Translation files go in `i18n/en.toml`, `i18n/fr.toml`, etc.:

```toml
# i18n/en.toml
[readMore]
other = "Read more"

[publishedOn]
other = "Published on {{ .Date }}"
```

Use in templates: `{{ i18n "readMore" }}`
