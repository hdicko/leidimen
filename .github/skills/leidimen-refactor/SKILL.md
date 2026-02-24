---
name: leidimen-refactor
description: "Repeatable, low-risk refactoring process for the Leidimen Hugo project: templates, SCSS, JS, and config"
---

# SKILL — Refactoring Guide

## Purpose

Provide a repeatable, low-risk refactoring process for this Hugo project to improve maintainability while preserving behavior.

## Scope

- Templates (`layouts/`), partials, shortcodes
- SCSS/JS under `assets/` and static CSS/JS
- Configuration files (`hugo.toml`, data files)
- NOT content rewriting unless explicitly listed in a task

## Goals

- Reduce duplication and complexity
- Move inline styles into SCSS and centralize theme-aware styles
- Fix template errors and make templates resilient
- Keep changes small, testable and reversible

## Process (per refactor task)

1. Analyze: identify hotspot files and gather failing pages or console errors.
2. Plan: create a minimal scoped task (1–3 files). Document risk and rollback steps.
3. Implement: make minimal change, remove inline styles to SCSS, add unit/visual checks.
4. Test: run local dev server and production build. Verify visuals and console.
5. PR: open a small PR with screenshots, description, and rollback steps.
6. Merge & Monitor: merge when green; validate `public/` output and monitor logs.

## Checklist (each PR)

- Small scope: affects a single responsibility
- Build: `npm run build` or `hugo` succeeds
- Visual: screenshots for desktop & mobile for changed pages
- Accessibility: color contrast and semantic markup checked
- No inline styles remaining (move to SCSS when reusable)
- Theme-aware: use CSS variables and `body[data-bs-theme]` when needed
- Docs: update `QUICK_REFERENCE.md` or `CODE_DOCUMENTATION.md` if behaviour changes

## Tools & Commands

- Start dev server: `./dev-server.sh`
- Production build: `npm run build` or `exec-bin node_modules/.bin/hugo/hugo --gc --minify`
- Format: `npm run format:write`
- Search for inline styles: `rg 'style="'` or `rg "class=.*bg-"`

## Example Tasks

- Move Quick Navigation inline styles into `assets/scss/_components.scss` and import into main SCSS
- Make `.member-quote` theme-aware using `theme-colors.css` variables and `body[data-bs-theme]` overrides
- Fix PhotoSwipe duplication: ensure `layouts/galleries/list.html` does not render shortcodes and remove shortcodes from bundle pages
- Replace hard-coded contact data in templates with values from `hugo.toml` and document the data source

## PR Template (short)

- **Title:** `refactor(scope): short description`
- **Description:** what changed, why, risk, rollback steps
- **Checklist:** build ok, screenshots added, format run
- **Rollback:** `git revert <commit>` and re-deploy if needed

## Definition of Done

- Changes merged with green CI
- No Hugo template errors
- Visual regression checked on affected pages
- Documentation updated when behaviour changed

## Notes

- Keep PRs small — easier to review and revert. Prefer several focused PRs to one large change.
- Use Hugo `resources` for image processing and avoid committing large media in the repo.
