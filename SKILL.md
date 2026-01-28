# Refactor SKILL — Inline Styles → SCSS + Code Modernization

> **Status: ✅ COMPLETED** — January 27, 2026
>
> All inline styles have been removed from source files. Verification passed.

## Purpose

- Centralize presentation rules into SCSS and remove inline `style="..."` usage across source templates, assets and JS
- Make components theme-aware and keep JS purely behavioral (class toggles / markup only)
- Modernize JavaScript code with ES6+ features (const/let, arrow functions, async/await, template literals)
- Improve CSS maintainability with custom properties (CSS variables) and better organization
- Enhance code readability and consistency throughout the codebase

## What Changed (High Level)

### SCSS Improvements

- **CSS Custom Properties**: Introduced CSS variables for colors, gradients, shadows, border-radius, and transitions
- **Better Organization**: Added section comments and logical grouping of related styles
- **DRY Principles**: Reduced code duplication by using variables for repeated values
- **Theme-Aware Design**: Centralized theme colors for easier dark/light mode management
- Moved inline CSS from templates/partials into `assets/scss/_skill-refactor.scss`
- Imported refactored styles from `assets/scss/index.scss`

### JavaScript Modernization

- **ES6+ Syntax**: Converted `var` to `const`/`let` with proper scoping
- **Arrow Functions**: Replaced traditional functions with modern arrow function syntax
- **Async/Await**: Replaced XMLHttpRequest with Fetch API and async/await pattern
- **Template Literals**: Replaced string concatenation with template literals for better readability
- **Array Methods**: Used modern array methods (forEach, find, Array.from) with arrow functions
- **Improved Error Handling**: Added try/catch blocks and better error messages
- **Code Documentation**: Added JSDoc comments for better function documentation

### General Improvements

- Fixed unclosed `<style>` blocks and stray template output
- Converted SVG `style=` attributes to element attributes (opacity, stop-color, stop-opacity)
- Reworked JS to inject markup and toggle classes instead of inline style text
- Lightbox now uses semantic CSS classes and clean HTML structure

## Key Files Edited

### SCSS Files

- **`assets/scss/_skill-refactor.scss`** (refactored):
  - Added CSS custom properties (variables) for colors, gradients, shadows, and transitions
  - Improved organization with clear section comments
  - Reduced code duplication using CSS variables
  - Centralized theme-aware styles
- **`assets/scss/index.scss`**: Imports the refactored partial

### JavaScript Files

- **`static/js/lightbox.js`** (modernized):
  - Converted to ES6+ syntax (const/let, arrow functions, template literals)
  - Replaced XMLHttpRequest with Fetch API and async/await
  - Added JSDoc documentation
  - Improved error handling with try/catch
  - Injects semantic `<img class="lightbox-img">` instead of inline background styles

### Template Files

- **`layouts/partials/mali-villages-map-interactive.html`** and **`layouts/partials/mali-villages-map-fallback.html`**:
  - Notifications now use `.notification-*` classes
  - Hide animation via `.notification-hide` class
- **`layouts/_default/taxonomy.html`**, **`layouts/partials/intro.html`**, **`layouts/partials/navbar.html`**:
  - Removed inline `<style>` blocks
  - Fixed template output issues

### SVG Files

- **`assets/icons/forgejo.svg`**: Converted `style="opacity:..."` → `opacity="..."` attributes

## Patterns & Conventions Introduced

### CSS Architecture

- **CSS Custom Properties**: Use `:root` variables for theme values (colors, shadows, transitions)
  ```scss
  --gradient-primary-start: #667eea;
  --transition-normal: 0.3s ease;
  ```
- **Semantic Class Names**: Use descriptive, purpose-driven class names (`.notification-hide`, `.lightbox-img`)
- **Section Organization**: Group related styles with clear section comments
- **DRY Principle**: Reuse variables instead of repeating values

### JavaScript Best Practices

- **Modern Syntax**: Use `const`/`let`, arrow functions, template literals
- **Async Operations**: Use Fetch API with async/await instead of XMLHttpRequest
- **Documentation**: Add JSDoc comments for functions
- **Error Handling**: Implement proper try/catch blocks
- **Semantic HTML**: JS toggles classes only; presentation lives in CSS

## Verification / How to Test Locally

1. **Install dependencies and build** (or run dev server):

   ```bash
   npm install
   rm -rf public/*
   npm run build   # or: npm run dev
   ```

2. **Check these areas interactively**:
   - **Galleries / PhotoSwipe pages**: Thumbnails and lightbox images should display correctly with smooth animations
   - **Map notifications**: Should slide in/out using CSS animations, not inline styles
   - **Intro, navbar, footer**: Ensure no visual regressions and dark-mode behavior works correctly
   - **Theme switching**: Verify CSS variables properly adapt to light/dark themes
   - **Browser console**: Check for JavaScript errors (should be none)

3. **Code quality checks**:
   ```bash
   npm run format:check   # Verify code formatting
   ./test-hugo-compatibility.sh  # Run full test suite
   ```

## Benefits of This Refactoring

### Maintainability

- **Centralized Styling**: All presentation logic in one place (SCSS files)
- **Easy Theme Updates**: Change CSS variables to update colors/effects site-wide
- **Better Organization**: Clear section comments make finding styles easier

### Performance

- **Reduced Inline Styles**: Fewer style attributes in HTML = smaller page size
- **Better Caching**: External stylesheets can be cached by browsers
- **Modern JavaScript**: ES6+ features often run faster than legacy equivalents

### Developer Experience

- **Readable Code**: Modern syntax and proper documentation
- **Easier Debugging**: Clear separation of concerns (HTML/CSS/JS)
- **Future-Proof**: Uses modern web standards and best practices
- **Type Safety**: JSDoc comments enable better IDE support

### Accessibility & SEO

- **Semantic HTML**: Proper structure without style pollution
- **Progressive Enhancement**: Core functionality works even if styles fail to load
- **Cleaner DOM**: Easier for screen readers and search engines to parse

Notes and next steps

- `public/` contains previously generated files with inline styles — regenerate the site locally to clear them.
- If you see any remaining inline `style="..."` in a generated page, paste the generated path and I will trace it back to the source template and patch it.
- Optional: I can open a PR with these changes and a short visual checklist if you want a formal review flow.

Contact

- If you want, I can now run a final repo-wide scan for other patterns (data-URL edge cases, inline event handlers) or produce a concise PR description.

— Refactor authored by the automation run (summary).

**References**

- `SCSS partial`: [assets/scss/\_skill-refactor.scss](assets/scss/_skill-refactor.scss) — centralized styles, animation keyframes and utility classes introduced by the refactor.
- `SCSS manifest`: [assets/scss/index.scss](assets/scss/index.scss) — imports the new partial so the Hugo pipeline builds it.
- `Lightbox JS`: [static/js/lightbox.js](static/js/lightbox.js) — refactored to inject an `<img class="lightbox-img">` and avoid inline background styles.
- `Map partials`: [layouts/partials/mali-villages-map-interactive.html](layouts/partials/mali-villages-map-interactive.html) and [layouts/partials/mali-villages-map-fallback.html](layouts/partials/mali-villages-map-fallback.html) — notifications now use `.notification-*` classes and `.notification-hide`.
- `Template fixes`: [layouts/\_default/taxonomy.html](layouts/_default/taxonomy.html), [layouts/partials/intro.html](layouts/partials/intro.html), [layouts/partials/navbar.html](layouts/partials/navbar.html) — removed inline `<style>` blocks and fixed stray template output.
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
