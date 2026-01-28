# Leidimen

**Site web de l'association Leidimen** - Supporting villages in the Douentza region of Mali through education, health, and infrastructure projects.

[![Hugo](https://img.shields.io/badge/Hugo-0.152.1-FF4088?logo=hugo)](https://gohugo.io)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?logo=github)](https://hdicko.github.io/leidimen/)

> **Leidimen** is a French solidarity association dedicated to supporting education, healthcare, and infrastructure development in Mali. This repository contains the source code for the organization's multilingual static website.

## 🌍 Live Sites

- **Production**: [https://hdicko.github.io/leidimen/](https://hdicko.github.io/leidimen/)
- **Netlify CMS**: [https://hdicko.github.io/leidimen/admin/](https://hdicko.github.io/leidimen/admin/)

## ✨ Features

- 🌐 **Multilingual Content** - French language support with potential for expansion
- 🏘️ **Village-Focused Organization** - Custom taxonomy for 10+ villages in the Douentza region
- 📸 **Photo Galleries** - PhotoSwipe integration for beautiful image galleries
- 📝 **Multiple Content Creation Methods**:
  - Web-based CMS interface (cms-web/)
  - Netlify CMS with GitHub authentication
  - Hugo CLI with archetypes
- 🎨 **Modern UI** - Bootstrap 5.3.8 with custom SCSS and dark mode
- 🗺️ **Interactive Maps** - Village locations with project information
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Static Site Performance** - Fast loading and SEO optimized
- 🔄 **WordPress Migration** - Scripts for importing legacy content (2006-2017)

## 🛠️ Tech Stack

- **Static Site Generator**: [Hugo 0.152.1](https://gohugo.io) (Extended version)
- **CSS Framework**: [Bootstrap 5.3.8](https://getbootstrap.com)
- **Icons**: [Bootstrap Icons 1.13.1](https://icons.getbootstrap.com)
- **CSS Preprocessor**: [Dart Sass 1.93.2](https://sass-lang.com/dart-sass)
- **Gallery**: [PhotoSwipe](https://photoswipe.com)
- **CMS**: [Netlify CMS](https://www.netlifycms.org) + Custom Node.js interface
- **Deployment**: GitHub Pages + Netlify
- **Code Formatting**: Prettier with go-template plugin

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Git**
- **Hugo 0.152.1** (automatically installed via `hugo-installer`)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/hdicko/leidimen.git
cd leidimen

# Install dependencies (includes Hugo binary)
npm install
```

### Local Development

```bash
# Start development server with baseURL override
./dev-server.sh

# OR use npm script
npm run dev

# Access site at: http://localhost:1313
# Access CMS at: http://localhost:1313/leidimen/admin/
```

### Build for Production

```bash
# Build optimized site
npm run build

# Output: public/
```

## 📝 Content Creation

### Method 1: Web CMS Interface (Recommended for Developers)

The custom Node.js interface provides real-time validation and GitHub API integration:

```bash
cd cms-web
npm install
# Configure GITHUB_TOKEN in .env (see cms-web/QUICKSTART.md)
npm start
# Access at: http://localhost:3000
```

See [cms-web/README.md](cms-web/README.md) for detailed setup.

### Method 2: Netlify CMS (Recommended for Editors)

1. **Local**: Navigate to `http://localhost:1313/leidimen/admin/`
2. **Production**: Navigate to `https://hdicko.github.io/leidimen/admin/`
3. Authenticate with Netlify Identity
4. Create/edit content through the web interface

See [NETLIFY_CMS_GUIDE.md](NETLIFY_CMS_GUIDE.md) for complete instructions.

### Method 3: Hugo CLI (Recommended for Experienced Users)

```bash
# Create a new post (uses archetype template)
hugo new posts/2025/my-article.md

# Create a team member profile
hugo new equipe/firstname-lastname.md

# Edit the generated file with your preferred editor
```

## 📂 Project Structure

```
leidimen/
├── archetypes/          # Content templates
├── assets/              # SCSS, JS, raw assets
├── content/             # Markdown content files
│   ├── posts/          # Blog posts (organized by year)
│   ├── equipe/         # Team member profiles
│   ├── galleries/      # Photo galleries
│   ├── villages/       # Village information pages
│   └── documents/      # Legal documents
├── data/                # YAML/JSON data files
│   └── villages/       # Village coordinates and metadata
├── layouts/             # Hugo templates
│   ├── _default/       # Base templates
│   ├── partials/       # Reusable components
│   └── shortcodes/     # Custom shortcodes
├── static/              # Static assets (copied as-is)
│   ├── images/         # Images
│   └── admin/          # Netlify CMS config
├── cms-web/             # Custom CMS interface
├── public/              # Generated site (git-ignored)
├── hugo.toml            # Hugo configuration
├── netlify.toml         # Netlify deployment config
└── package.json         # npm dependencies
```

## 🗂️ Custom Taxonomies

The site uses four custom taxonomies for content organization:

- **Villages**: `dorool`, `diona`, `debere`, `diambana`, `darawal`, `tanal`, `manko`, `tacouti`, `n'dumpa`, `douentza`
- **Categories**: `Éducation`, `Santé`, `Infrastructure`
- **Moods**: `Heureux`, `Triste`, `Inspiré`, `Motivé`, `Reconnaissant`
- **Tags**: General keywords

**Important**: Always use lowercase for village names in frontmatter: `villages: ["dorool"]`

## 🎨 Custom Shortcodes

Available shortcodes for content enhancement:

### Gallery & Images
- `{{< gallery >}}` - Auto photo gallery from page resources
- `{{< gallery-pro >}}` - Professional gallery with options
- `{{< image >}}` - Responsive image with lazy loading
- `{{< load-photoswipe >}}` - Manual PhotoSwipe loading

### Layout
- `{{< divider >}}` - Horizontal separator
- `{{< details "Summary" >}}Content{{< /details >}}` - Collapsible sections
- `{{< typeit >}}Text{{< /typeit >}}` - Typing animation

## 🚢 Deployment

### GitHub Pages (Primary)

```bash
# Deploy to gh-pages branch
./deploy.sh
```

### Netlify (Automatic)

Automatic deployment on push to `main` branch via `netlify.toml`.

## 🔄 WordPress Migration

For importing legacy content from leidimen.com (2006-2017):

```bash
# 1. Migrate posts by date
python3 migrate-wordpress-posts.py

# 2. Update image links
python3 update-image-links.py

# 3. Download images
python3 download-all-wordpress-images.py

# 4. Test build
npm run build
```

See individual script headers for detailed usage.

## 🧪 Testing

```bash
# Run comprehensive compatibility tests
./test-hugo-compatibility.sh

# Check code formatting
npm run format:check

# Auto-format code
npm run format:write
```

## 📖 Documentation

- [Quick Reference](QUICK_REFERENCE.md) - Content creation guide for non-technical editors
- [Content Creation Guide](CONTENT_CREATION_GUIDE.md) - Complete content workflows
- [Code Documentation](CODE_DOCUMENTATION.md) - Detailed code architecture
- [Netlify CMS Guide](NETLIFY_CMS_GUIDE.md) - CMS usage instructions
- [Search Feature](SEARCH_FEATURE.md) - Search functionality documentation
- [SEO Optimization](SEO_LLM_OPTIMIZATION_SUMMARY.md) - SEO and AI optimization strategies
- [Hugo Migration](HUGO_0.152.1_MIGRATION.md) - Version migration notes
- [Web CMS Integration](cms-web/INTEGRATION.md) - Custom CMS details

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Content Creation**: Use one of the three methods documented above
2. **Code Changes**: 
   - Run `npm run format:write` before committing
   - Test with `./test-hugo-compatibility.sh`
   - Ensure Hugo 0.152.1 compatibility
3. **Taxonomy Values**: Always use lowercase in frontmatter
4. **Gallery Posts**: Create page bundles with `index.md` + images in the same folder

## 🐛 Common Issues

### Gallery Not Working
- Ensure images are page resources (in same folder as `index.md`)
- Check that file is named `index.md` not `my-post.md`
- Verify PhotoSwipe is loaded only once

### Build Errors
- **"can't find page resource"**: Image not in page bundle
- **"taxonomy not found"**: Check taxonomy name in `hugo.toml`
- **SCSS compile error**: Verify Dart Sass is installed
- **baseURL issues**: Check `/leidimen/` path in URLs

### Hugo Version Issues
- Run `npm install` to ensure Hugo 0.152.1 is installed locally
- Use npm scripts (`npm run dev`) instead of direct `hugo` commands

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Leidimen Association Team - See [équipe](https://hdicko.github.io/leidimen/equipe/) for full team profiles.

## 🔗 Links

- **Website**: [hdicko.github.io/leidimen](https://hdicko.github.io/leidimen/)
- **GitHub**: [github.com/hdicko/leidimen](https://github.com/hdicko/leidimen)
- **Netlify CMS**: [hdicko.github.io/leidimen/admin](https://hdicko.github.io/leidimen/admin/)

---

**Made with ❤️ for the communities of Douentza, Mali**
