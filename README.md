# Leidimen — Site Web de l'Association

[![Hugo](https://img.shields.io/badge/Hugo-0.152.1-FF4088?logo=hugo)](https://gohugo.io)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?logo=github)](https://hdicko.github.io/leidimen/)

## What is this?

**Leidimen** is a French solidarity association that supports villages in the Douentza region of Mali — through education, healthcare, and infrastructure projects.

This repository is the source code for the association's website. It is a **static site** built with [Hugo](https://gohugo.io), styled with Bootstrap 5, and managed through Netlify CMS. Content is written in French and organised around the villages Leidimen works with.

**Live site →** [hdicko.github.io/leidimen](https://hdicko.github.io/leidimen/)

---

## Quick Start

You need **Node.js 18+** and **Git**. Hugo itself is installed automatically by npm — you do not need to install it separately.

```bash
# 1. Clone the repo
git clone https://github.com/hdicko/leidimen.git
cd leidimen

# 2. Install dependencies (this also downloads the Hugo binary)
npm install

# 3. Start the local development server
npm run dev
```

The site is now running at **http://localhost:1313**.  
The CMS admin panel is at **http://localhost:1313/leidimen/admin/**.

> **Tip:** `./dev-server.sh` does the same thing as `npm run dev` if you prefer a script.

---

## Adding Content

The most common task for contributors is writing a new article (post). Here are your three options — pick the one that fits you best.

### Option A — Netlify CMS (best for editors, no coding needed)

1. Start the dev server (`npm run dev`)
2. Go to http://localhost:1313/leidimen/admin/
3. Log in with Netlify Identity
4. Use the web interface to create or edit content

→ See [NETLIFY_CMS_GUIDE.md](NETLIFY_CMS_GUIDE.md) for a full walkthrough.

### Option B — Hugo CLI (best for developers)

```bash
# Create a new post — opens a pre-filled Markdown file
hugo new posts/2025/my-article.md

# Other content types
hugo new equipe/firstname-lastname.md   # team member profile
```

Edit the generated file in your editor, then check the result in your browser.

### Option C — cms-web app (developer tool with GitHub integration)

```bash
cd cms-web
npm install
# Add your GitHub token to cms-web/.env first (see cms-web/QUICKSTART.md)
npm start
# Opens at http://localhost:3000
```

→ See [cms-web/README.md](cms-web/README.md) for setup details.

### Frontmatter tips

Every piece of content has a YAML header (frontmatter). A few things to keep in mind:

- **Village names must be lowercase** in frontmatter, e.g. `villages: ["dorool"]`
- Available villages: `dorool`, `diona`, `debere`, `diambana`, `darawal`, `tanal`, `manko`, `tacouti`, `n'dumpa`, `douentza`
- Available categories: `Éducation`, `Santé`, `Infrastructure`
- For **photo galleries**: images must live in the same folder as the `index.md` file (they are Hugo page resources)

→ See [CONTENT_CREATION_GUIDE.md](CONTENT_CREATION_GUIDE.md) for a complete content workflow guide.  
→ See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for a quick cheat sheet.

---

## Deploying

### GitHub Pages (primary deployment)

```bash
./deploy.sh
```

This builds the site and pushes the output to the `gh-pages` branch.

### Netlify (automatic)

Any push to the `main` branch triggers an automatic deploy on Netlify. No manual steps needed.

---

## Project Structure

```
leidimen/
├── content/             # All site content (Markdown files)
│   ├── posts/           #   Blog posts, organised by year
│   ├── equipe/          #   Team member profiles
│   ├── villages/        #   Village information pages
│   └── galleries/       #   Photo galleries
├── assets/              # SCSS and JavaScript source files
├── layouts/             # Hugo HTML templates and shortcodes
├── static/              # Files copied as-is (images, CMS config)
├── data/                # Village coordinates and metadata (YAML)
├── archetypes/          # Content templates used by `hugo new`
├── cms-web/             # Optional Node.js CMS interface
├── hugo.toml            # Main Hugo configuration
├── netlify.toml         # Netlify deployment configuration
└── package.json         # npm dependencies and scripts
```

**Key npm scripts:**

| Command                | What it does                       |
| ---------------------- | ---------------------------------- |
| `npm install`          | Install dependencies + Hugo binary |
| `npm run dev`          | Start local dev server             |
| `npm run build`        | Build production site to `public/` |
| `npm run format:write` | Auto-format code with Prettier     |

---

## Troubleshooting

**Hugo not found / wrong version**
Run `npm install` — it fetches the correct Hugo binary (0.152.1). Always use `npm run dev` rather than calling `hugo` directly.

**Gallery images not showing**
Gallery images must be _page resources_: they need to sit in the same folder as `index.md`. A standalone file like `my-post.md` cannot have a gallery.

**Build error: "can't find page resource"**
Same as above — move the image into the page bundle folder.

**URLs look wrong (missing `/leidimen/`)**
The site lives in a subdirectory. The `baseURL` in `hugo.toml` already includes `/leidimen/`. The dev server handles this automatically via `npm run dev`.

---

## Further Reading

| Document                                               | What's in it                         |
| ------------------------------------------------------ | ------------------------------------ |
| [CONTENT_CREATION_GUIDE.md](CONTENT_CREATION_GUIDE.md) | Full content workflows for all types |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md)               | Short cheat sheet for editors        |
| [NETLIFY_CMS_GUIDE.md](NETLIFY_CMS_GUIDE.md)           | Using the CMS admin panel            |
| [DEPLOY.md](DEPLOY.md)                                 | Deployment details                   |
| [CODE_DOCUMENTATION.md](CODE_DOCUMENTATION.md)         | Code architecture and templates      |
| [HUGO_0.152.1_MIGRATION.md](HUGO_0.152.1_MIGRATION.md) | Notes on the Hugo version upgrade    |
| [cms-web/README.md](cms-web/README.md)                 | The Node.js CMS interface            |

---

## Contributing

All contributions are welcome — from fixing a typo to adding new content.

1. Make your changes in a branch and open a pull request
2. Run `npm run format:write` before committing code changes
3. Test your build locally with `npm run build` and check the output
4. Follow the frontmatter rules above (especially lowercase village names)

---

_Made with ❤️ for the communities of Douentza, Mali_
