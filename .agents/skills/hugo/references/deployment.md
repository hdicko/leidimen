# Hugo Deployment

Docs: https://gohugo.io/hosting-and-deployment/

## Netlify

Docs: https://docs.netlify.com/build/frameworks/framework-setup-guides/hugo/

### netlify.toml

```toml
[build]
  command = "hugo --minify --gc"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.147.0"
  HUGO_ENV = "production"

[context.deploy-preview]
  command = "hugo --minify --gc --buildFuture -b $DEPLOY_PRIME_URL"

[context.branch-deploy]
  command = "hugo --minify --gc -b $DEPLOY_PRIME_URL"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

## Vercel

### vercel.json

```json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.147.0"
    }
  },
  "framework": "hugo"
}
```

Or use a custom build script. Vercel auto-detects Hugo projects.

## Cloudflare Pages

Build settings in the Cloudflare dashboard:
- Build command: `hugo --minify`
- Build output directory: `public`
- Environment variable: `HUGO_VERSION` = `0.147.0`

## GitHub Pages with Actions

Docs: https://gohugo.io/hosting-and-deployment/hosting-on-github/

### .github/workflows/hugo.yml

```yaml
name: Deploy Hugo site

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: "0.147.0"
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb
          sudo dpkg -i ${{ runner.temp }}/hugo.deb

      - name: Install Dart Sass
        run: sudo snap install dart-sass

      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## General Build Optimization

```bash
# Production build with all optimizations
hugo --minify --gc --environment production

# Flags:
# --minify        Minify HTML, CSS, JS, SVG, XML
# --gc            Clean unused cache files after build
# --environment   Set build environment (affects config)
# --baseURL       Override baseURL from config
# --buildDrafts   Include draft content
# --buildFuture   Include future-dated content
# --buildExpired  Include expired content
```

## Custom Deployment Script

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Building Hugo site..."
hugo --minify --gc --environment production

echo "Deploying to server..."
rsync -avz --delete public/ user@server:/var/www/html/

echo "Done!"
```
