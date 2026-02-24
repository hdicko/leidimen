---

## 6. add-team-member.prompt.md

```markdown
---

name: add-team-member
description: Team member profile creation template with proper card frontmatter structure for Leidimen équipe page
argument-hint: "Full Name" "Role/Title"

---

Create a new team member profile for **${input:fullName:Full name}** with the role of **${input:role:Role/Title}**.

## Instructions

1. **Generate filename** from name:
   ```javascript
   // Convert "Jean-Pierre Diarra" → "jeanpierrediarra.md"
   const filename =
     fullName
       .toLowerCase()
       .normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "") // Remove accents
       .replace(/[^a-z0-9]+/g, "") + // Remove spaces/hyphens
     ".md";
   ```
