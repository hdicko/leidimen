---

## 7. code-review-checklist.prompt.md

```markdown
---

name: code-review-checklist
description: Hugo template and code review checklist for Leidimen site. Validates Go templates, checks for common pitfalls, and ensures best practices.
argument-hint: "File path or component to review"

---

Review the Hugo code/template at: **${input:filePath:Path to file or component}**

## Review Checklist

Perform a comprehensive code review following this checklist:

### 1. Go Template Syntax Validation
