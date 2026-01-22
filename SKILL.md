# Refactor SKILL — Inline Styles → SCSS

Purpose
- Centralize presentation rules into SCSS and remove inline `style="..."` usage across source templates, assets and JS. Make components theme-aware and keep JS purely behavioral (class toggles / markup only).

What changed (high level)
- Moved inline CSS from templates/partials into `assets/scss/_skill-refactor.scss` and imported it from `assets/scss/index.scss`.
- Reworked JS to stop injecting inline style text; JS now injects markup and toggles classes (examples: lightbox and map notifications).
- Converted SVG `style=` attributes and embedded data-URL `style` properties (e.g., `stop-color`, `stop-opacity`) to element attributes.
- Fixed unclosed `<style>` blocks and stray template output which could break builds.

Key files edited
- `assets/scss/_skill-refactor.scss` (new): centralized styles and animation keyframes.
- `assets/scss/index.scss`: imports the new partial.
- `static/js/lightbox.js`: injects an `<img class="lightbox-img">` instead of inline background styles.
- `layouts/partials/mali-villages-map-interactive.html` and `layouts/partials/mali-villages-map-fallback.html`: notifications now use `.notification-...` classes; hide via `.notification-hide` animation class.
- `layouts/_default/taxonomy.html`, `layouts/partials/intro.html`, `layouts/partials/navbar.html`: removed inline `<style>` blocks and template fixes.
- `assets/icons/forgejo.svg`: converted `style="opacity:..."` → `opacity="..."`.

Patterns & conventions introduced
- Presentation lives in SCSS; JS toggles classes only (`.notification-hide`, `.lightbox-img`, etc.).
- Use semantic utility classes over inline spacing rules; follow existing Hugo/BEM-like naming where practical.
- SVG attributes should use explicit element attributes (`opacity`, `stop-color`, `stop-opacity`) not inline `style` strings.

Verification / how to test locally
1. Install deps and build (or run dev server):
```bash
npm install
rm -rf public/*
npm run build   # or: npm run dev
```
2. Check these areas interactively:
- Galleries / PhotoSwipe pages — thumbnails and lightbox images should display correctly.
- Map notifications — they should slide in/out and not rely on inline style strings.
- Intro, navbar, footer — ensure no visual regressions and dark-mode behavior works.

Notes and next steps
- `public/` contains previously generated files with inline styles — regenerate the site locally to clear them.
- If you see any remaining inline `style="..."` in a generated page, paste the generated path and I will trace it back to the source template and patch it.
- Optional: I can open a PR with these changes and a short visual checklist if you want a formal review flow.

Contact
- If you want, I can now run a final repo-wide scan for other patterns (data-URL edge cases, inline event handlers) or produce a concise PR description.

— Refactor authored by the automation run (summary).

**References**
- `SCSS partial`: [assets/scss/_skill-refactor.scss](assets/scss/_skill-refactor.scss) — centralized styles, animation keyframes and utility classes introduced by the refactor.
- `SCSS manifest`: [assets/scss/index.scss](assets/scss/index.scss) — imports the new partial so the Hugo pipeline builds it.
- `Lightbox JS`: [static/js/lightbox.js](static/js/lightbox.js) — refactored to inject an `<img class="lightbox-img">` and avoid inline background styles.
- `Map partials`: [layouts/partials/mali-villages-map-interactive.html](layouts/partials/mali-villages-map-interactive.html) and [layouts/partials/mali-villages-map-fallback.html](layouts/partials/mali-villages-map-fallback.html) — notifications now use `.notification-*` classes and `.notification-hide`.
- `Template fixes`: [layouts/_default/taxonomy.html](layouts/_default/taxonomy.html), [layouts/partials/intro.html](layouts/partials/intro.html), [layouts/partials/navbar.html](layouts/partials/navbar.html) — removed inline `<style>` blocks and fixed stray template output.
- `SVG`: [assets/icons/forgejo.svg](assets/icons/forgejo.svg) — converted `style="opacity:..."` to `opacity="..."` attributes.
- `Scripts`: [scripts/run-skill.sh](scripts/run-skill.sh), [scripts/scan-inline-styles.sh](scripts/scan-inline-styles.sh), [scripts/rebuild-serve.sh](scripts/rebuild-serve.sh) — helper scripts to build, scan, and serve the site locally.

**Quick commands**
- Make helper scripts executable:

```bash
chmod +x scripts/*.sh
```

- Run the SKILL verification (install, build, scan):

```bash
./scripts/run-skill.sh
```

- Scan only for remaining inline styles:

```bash
./scripts/scan-inline-styles.sh
```

If you'd like these references converted into a short PR description or included in a repository README, tell me where to place it and I'll prepare the PR draft.
