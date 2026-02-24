---
name: create-village-post
description: Quick template for creating village-specific update posts for Leidimen with pre-filled frontmatter
argument-hint: village-name "Post topic or title"
---

Create a new blog post about ${input:villageName:Village name (lowercase)} for the Leidimen site.

**Topic**: ${input:topic:What is this post about?}

## Instructions

1. **Verify village name** is one of: dorool, diona, debere, diambana, darawal, douentza, tanal, manko, tacouti, n'dumpa

2. **Create post** in `content/posts/2026/` with this frontmatter structure:

```yaml
---
title: "[Compelling title about ${villageName} - max 60 chars]"
date: 2026-02-23
type: "posts"
villages: ["${villageName}"]  # MUST be lowercase
categories: ["${input:category:Category (Éducation, Santé, Infrastructure, Événement)}"]
tags: ["${villageName}", "${input:tag1:tag1}", "${input:tag2:tag2}", "${input:tag3:tag3}"]
moods: ["${input:mood:Mood (heureux, triste, inspiré, motivé, reconnaissant)}"]
description: "${input:description:SEO description 150-160 characters}"
image: "/images/uploads/${input:imageFileName:image-filename.jpg}"
draft: false
---

## ${input:heading:Main heading}

${input:introText:Opening paragraph - explain context, who, what, where, when}

## ${input:section1Title:Section 1 heading}

${input:section1Content:Section 1 content with details, names, numbers, impact}

## ${input:section2Title:Section 2 heading}

${input:section2Content:Section 2 content}

## Conclusion

${input:conclusionText:Summary and call to action}

[En savoir plus sur ${villageName}](/villages/${villageName}/)
```
