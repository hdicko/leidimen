---
agent: Plan
name: createSimilarApp
description: Create a Hugo-based multilingual site similar to Leidimen for non-profit organizations
version: 1.0.0
---

# Plan: Create Hugo-Based Non-Profit Organization Website

## Project Overview

Build a multilingual static website similar to Leidimen for non-profit organizations, featuring content management, photo galleries, team profiles, and geographic data integration.

## Phase 1: Project Setup & Foundation

### 1.1 Initialize Hugo Project

- [ ] Install Hugo 0.152.1+ using hugo-installer package
- [ ] Create new Hugo site: `hugo new site project-name`
- [ ] Initialize git repository
- [ ] Set up package.json with Hugo version pinning
- [ ] Configure netlify.toml for deployment

### 1.2 Configure Hugo Settings

- [ ] Define custom taxonomies in hugo.toml:
  - Tags (general keywords)
  - Categories (content classification)
  - Locations/Villages (geographic classification)
  - Moods/Themes (emotional tone)
- [ ] Configure baseURL and language settings
- [ ] Set up image processing parameters (WebP, quality, resizing)
- [ ] Configure markup options (Goldmark, syntax highlighting)

### 1.3 Development Environment

- [ ] Create dev-server.sh script with baseURL override
- [ ] Set up npm scripts (dev, build, format)
- [ ] Configure Prettier with go-template plugin
- [ ] Create .gitignore for Hugo artifacts

## Phase 2: Core Architecture

### 2.1 Layout System

- [ ] Create baseof.html master template with:
  - Navigation bar
  - Footer
  - Meta tags and SEO
  - Identity integration hooks
- [ ] Set up partial templates:
  - head.html (meta, stylesheets)
  - navbar.html (responsive navigation)
  - footer.html (contact, social links)
  - pagination.html

### 2.2 Content Types

- [ ] Posts section with year-based organization
- [ ] Team/About pages with profile cards
- [ ] Gallery pages with PhotoSwipe integration
- [ ] Location/Village pages with maps
- [ ] Documents section (legal, reports)

### 2.3 Archetypes

- [ ] Create post.md archetype with required frontmatter
- [ ] Create about.md archetype for team profiles
- [ ] Create gallery archetype for photo collections
- [ ] Create default.md fallback template

## Phase 3: Frontend & Assets

### 3.1 CSS Framework

- [ ] Install Bootstrap 5.3.8+ via CDN or npm
- [ ] Install Bootstrap Icons
- [ ] Set up Dart Sass for SCSS processing
- [ ] Create main SCSS structure:
  - Variables (\_variables.scss)
  - Components (\_components.scss)
  - Pages (\_pages.scss)
  - Utilities (\_utilities.scss)

### 3.2 JavaScript Components

- [ ] Theme switcher (dark/light mode)
- [ ] Interactive maps (Leaflet or similar)
- [ ] PhotoSwipe gallery initialization
- [ ] Form handling and validation
- [ ] Lazy loading images

### 3.3 Gallery System

- [ ] Install PhotoSwipe library
- [ ] Create gallery shortcode with Page.Scratch pattern
- [ ] Create photoswipe-resources.html partial
- [ ] Create photoswipe-structure.html partial
- [ ] Implement image processing in galleries

## Phase 4: Data Management

### 4.1 Data Files Structure

- [ ] Create data/locations/ directory with YAML files:
  - Geographic coordinates
  - Population data
  - Project information
- [ ] Create data/settings/ for site-wide configuration
- [ ] Create data/members/ for team data (optional)
- [ ] Set up data integration in templates

### 4.2 Content Management

- [ ] Set up Netlify CMS:
  - Configure static/admin/config.yml
  - Define collections for all content types
  - Set up media folder (static/images/uploads/)
  - Configure authentication (Netlify Identity)
- [ ] Alternative: Create custom CMS interface:
  - Node.js app with GitHub API
  - Form-based content creation
  - Real-time Markdown preview

## Phase 5: Custom Features

### 5.1 Shortcodes

- [ ] {{< gallery >}} - Auto photo gallery
- [ ] {{< image >}} - Responsive image with lazy loading
- [ ] {{< divider >}} - Visual separators
- [ ] {{< details >}} - Collapsible content
- [ ] {{< typeit >}} - Animated text
- [ ] Custom shortcodes specific to organization needs

### 5.2 Taxonomies & Lists

- [ ] Create taxonomy list templates
- [ ] Create taxonomy term templates
- [ ] Implement filtering and sorting
- [ ] Add pagination for long lists

### 5.3 Maps Integration

- [ ] Choose mapping library (Leaflet, Mapbox, Google Maps)
- [ ] Create map partial templates
- [ ] Integrate location data from data files
- [ ] Add markers, popups, and interactions

## Phase 6: Content Creation

### 6.1 Migration Tools (if applicable)

- [ ] Create WordPress migration scripts:
  - migrate-wordpress-posts.py
  - migrate-wordpress-galleries.py
  - migrate-wordpress-categories.py
  - download-all-wordpress-images.py
  - update-image-links.py

### 6.2 Initial Content

- [ ] Write about/mission page
- [ ] Create team member profiles
- [ ] Add location pages with descriptions
- [ ] Populate initial blog posts
- [ ] Create photo galleries
- [ ] Add legal documents (GDPR, privacy policy)

### 6.3 Media Assets

- [ ] Prepare team photos (optimize for web)
- [ ] Organize gallery images by event/topic
- [ ] Create social media preview images
- [ ] Add organization logos and icons

## Phase 7: SEO & Optimization

### 7.1 SEO Implementation

- [ ] Configure Open Graph meta tags
- [ ] Set up Twitter Card metadata
- [ ] Create XML sitemap
- [ ] Generate RSS/JSON feeds
- [ ] Implement structured data (JSON-LD)
- [ ] Create robots.txt and ai.txt

### 7.2 Performance Optimization

- [ ] Enable Hugo minification
- [ ] Implement image lazy loading
- [ ] Use WebP format with fallbacks
- [ ] Configure CDN for static assets
- [ ] Enable gzip/brotli compression

### 7.3 Accessibility

- [ ] Add ARIA labels to interactive elements
- [ ] Ensure keyboard navigation works
- [ ] Test with screen readers
- [ ] Validate color contrast ratios
- [ ] Add alt text to all images

## Phase 8: Testing & Quality

### 8.1 Testing Scripts

- [ ] Create test-hugo-compatibility.sh:
  - Hugo version verification
  - Development build test
  - Production build test
  - File generation validation
  - Minification check
  - Taxonomy verification
  - Image processing test
  - Shortcode rendering test

### 8.2 Manual Testing

- [ ] Test all forms and interactions
- [ ] Verify responsive design on devices
- [ ] Test gallery functionality
- [ ] Validate links (internal and external)
- [ ] Check multilingual content switching
- [ ] Test CMS interface

### 8.3 Code Quality

- [ ] Run Prettier formatting
- [ ] Validate HTML (W3C validator)
- [ ] Check CSS with linter
- [ ] Test JavaScript with console
- [ ] Review git history and commits

## Phase 9: Deployment

### 9.1 Deployment Setup

- [ ] Configure GitHub Pages:
  - Create gh-pages branch
  - Set up GitHub Actions workflow
  - Create deploy.sh script
- [ ] Configure Netlify:
  - Connect repository
  - Set build command and publish directory
  - Configure environment variables
  - Set up custom domain
- [ ] Choose primary deployment method

### 9.2 Domain & DNS

- [ ] Register domain name
- [ ] Configure DNS records
- [ ] Set up SSL certificate
- [ ] Test domain resolution

### 9.3 Monitoring & Analytics

- [ ] Set up analytics (privacy-friendly options)
- [ ] Configure error tracking
- [ ] Set up uptime monitoring
- [ ] Create deployment notifications

## Phase 10: Documentation

### 10.1 User Documentation

- [ ] QUICK_REFERENCE.md for editors
- [ ] CONTENT_CREATION_GUIDE.md
- [ ] NETLIFY_CMS_GUIDE.md
- [ ] CMS web interface documentation

### 10.2 Developer Documentation

- [ ] CODE_DOCUMENTATION.md with architecture
- [ ] README.md with setup instructions
- [ ] DEPLOYMENT.md with deployment steps
- [ ] Comment complex code sections

### 10.3 Project-Specific Files

- [ ] Create .github/copilot-instructions.md
- [ ] Document custom taxonomies
- [ ] Explain data file structure
- [ ] List common troubleshooting issues

## Phase 11: Launch & Maintenance

### 11.1 Pre-Launch Checklist

- [ ] All content reviewed and approved
- [ ] All links tested and working
- [ ] Forms tested and submissions work
- [ ] Analytics configured and tracking
- [ ] Backup strategy in place
- [ ] Team trained on CMS usage

### 11.2 Launch

- [ ] Deploy to production
- [ ] Verify all functionality works
- [ ] Monitor for errors in first 24-48 hours
- [ ] Announce to stakeholders

### 11.3 Ongoing Maintenance

- [ ] Regular content updates
- [ ] Hugo version updates (test first)
- [ ] Dependency updates (Bootstrap, PhotoSwipe, etc.)
- [ ] Security monitoring
- [ ] Backup verification
- [ ] Performance monitoring

## Key Technologies Stack

### Core

- Hugo 0.152.1+ (Static Site Generator)
- Git (Version Control)
- npm (Package Management)

### Frontend

- Bootstrap 5.3.8+ (CSS Framework)
- Bootstrap Icons (Icon Library)
- Dart Sass 1.93.2+ (CSS Preprocessing)
- PhotoSwipe (Image Gallery)

### Content Management

- Netlify CMS (Git-backed CMS)
- OR custom Node.js CMS with GitHub API

### Deployment

- GitHub Pages (Free hosting)
- Netlify (Alternative with CI/CD)
- Netlify Identity (Authentication)

### Development Tools

- Prettier + go-template plugin (Code formatting)
- Python scripts (Migration tools)
- Bash scripts (Deployment automation)

## Critical Conventions

1. **Taxonomy values**: Always lowercase in frontmatter
2. **Content structure**: Year-based organization for posts
3. **Image processing**: WebP format, 85 quality, Lanczos algorithm
4. **Gallery pattern**: Use Page.Scratch to prevent duplicate PhotoSwipe loading
5. **Hugo version**: Pin specific version for consistency across environments
6. **Data centralization**: Single source of truth in data files, not frontmatter
7. **Responsive images**: Use Hugo's image processing, not static files
8. **Code formatting**: Always format before committing

## Success Criteria

- [ ] Site loads in under 3 seconds
- [ ] Mobile-friendly (responsive design)
- [ ] Accessible (WCAG 2.1 Level AA)
- [ ] SEO optimized (good scores on Lighthouse)
- [ ] Content is easy to update via CMS
- [ ] Documentation is complete and clear
- [ ] Code is well-organized and maintainable
- [ ] Automated deployment works reliably

## Estimated Timeline

- Phase 1-2: 1-2 weeks (Setup & Architecture)
- Phase 3-4: 2-3 weeks (Frontend & Data)
- Phase 5: 1-2 weeks (Custom Features)
- Phase 6: 2-4 weeks (Content Creation)
- Phase 7-8: 1-2 weeks (Optimization & Testing)
- Phase 9-10: 1 week (Deployment & Documentation)
- Phase 11: Ongoing (Launch & Maintenance)

**Total: 8-14 weeks** (depending on content volume and complexity)

## Resources & References

- Hugo Documentation: https://gohugo.io/documentation/
- Bootstrap Documentation: https://getbootstrap.com/docs/
- PhotoSwipe Documentation: https://photoswipe.com/documentation/
- Netlify CMS Documentation: https://www.netlifycms.org/docs/
- Leidimen Source Code: Reference implementation

---

**Note**: This plan is adaptable. Adjust phases, features, and timeline based on specific organization needs, budget, and resources available.
