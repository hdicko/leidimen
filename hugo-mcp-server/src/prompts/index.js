/**
 * Prompts Registration Module
 * 
 * This module registers pre-configured prompt templates that guide users through
 * common Hugo site management tasks. Prompts provide structured instructions and
 * rules for content creation, ensuring consistency with site conventions.
 * 
 * Available Prompts:
 * - new-post: Guide for creating blog posts with proper frontmatter
 * - new-gallery: Guide for creating photo galleries
 * - content-audit: Run comprehensive site content validation
 * - createnewpost: Complete professional guide for creating high-quality blog posts
 */

import { z } from "zod";

/**
 * Register all prompt templates with the MCP server
 * 
 * @param {McpServer} server - The MCP server instance
 * @param {string} hugoRoot - Root directory of the Hugo site
 */
export function registerPrompts(server, hugoRoot) {
  // ═══════════════════════════════════════
  // PROMPT: Create a new post with guidance
  // ═══════════════════════════════════════
  server.prompt(
    "new-post",
    "Guide for creating a new Leidimen blog post",
    {
      topic: z.string().describe("What the post is about"),
      village: z.string().optional().describe("Which village(s) it relates to"),
    },
    async ({ topic, village }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create a new blog post for the Leidimen association website about: "${topic}"${village ? ` related to village: ${village}` : ""}.

The site is for a French solidarity association supporting villages in the Douentza region of Mali.

Rules:
- Write in French
- Use proper Hugo frontmatter with type: "posts"
- Villages must be lowercase: douentza, dorool, diona, debere, diambana, darawal, tanal, manko, tacouti, ndumpa
- Categories: Éducation, Santé, Infrastructure, informations
- Moods: heureux, triste, inspire, motive, reconnaissant
- Include an SEO description (150-160 characters)
- Date should be today: ${new Date().toISOString().split("T")[0]}
- Post goes in content/posts/${new Date().getFullYear()}/

Use the create-post tool to create it.`,
          },
        },
      ],
    })
  );

  // ═══════════════════════════════════════
  // PROMPT: Create a gallery
  // ═══════════════════════════════════════
  server.prompt(
    "new-gallery",
    "Guide for creating a photo gallery",
    {
      title: z.string().describe("Gallery title"),
    },
    async ({ title }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create a new photo gallery titled "${title}" for the Leidimen site.

Remember:
- Use the create-gallery tool
- Images must be page resources (placed in the same folder as index.md)
- The {{< gallery >}} shortcode auto-loads PhotoSwipe
- Never load PhotoSwipe twice on the same page
- Supported formats: .jpg, .jpeg, .png, .webp`,
          },
        },
      ],
    })
  );

  // ═══════════════════════════════════════
  // PROMPT: Content audit
  // ═══════════════════════════════════════
  server.prompt(
    "content-audit",
    "Run a full content audit on the Leidimen site",
    {},
    async () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Run a complete content audit on the Leidimen Hugo site:

1. Use validate-content to check all files for issues
2. Use list-content for "posts" to see all articles
3. Read the site-stats resource for an overview
4. Check villages-data resource for completeness

Report:
- Total content count by type
- Any validation errors (taxonomy casing, missing fields)
- Posts without descriptions (bad for SEO)
- Posts without villages (unlinked to geography)
- Content distribution by year`,
          },
        },
      ],
    })
  );

  // ═══════════════════════════════════════
  // PROMPT: Create a comprehensive new post
  // ═══════════════════════════════════════
  server.prompt(
    "createnewpost",
    "Complete guide for creating a professional Leidimen blog post with all best practices",
    {
      topic: z.string().describe("Main subject or theme of the post"),
      villages: z.string().optional().describe("Related villages (comma-separated)"),
      category: z.string().optional().describe("Primary category (Éducation, Santé, Infrastructure, or informations)"),
      mood: z.string().optional().describe("Emotional tone (heureux, triste, inspire, motive, reconnaissant)"),
      hasImages: z.boolean().optional().describe("Whether the post will include images/gallery"),
    },
    async ({ topic, villages, category, mood, hasImages }) => {
      const currentYear = new Date().getFullYear();
      const currentDate = new Date().toISOString().split("T")[0];
      
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a comprehensive, high-quality blog post for the Leidimen association website.

═══════════════════════════════════
CONTEXT & MISSION
═══════════════════════════════════
Leidimen is a French solidarity association supporting villages in the Douentza region of Mali.
The site uses Hugo static site generator with custom taxonomies for organizing content.

Topic: "${topic}"
${villages ? `Related Villages: ${villages}` : "Villages: [To be determined based on content]"}
${category ? `Category: ${category}` : "Category: [Choose: Éducation, Santé, Infrastructure, or informations]"}
${mood ? `Mood: ${mood}` : "Mood: [Choose: heureux, triste, inspire, motive, or reconnaissant]"}
${hasImages ? "📸 This post will include images/gallery" : ""}

═══════════════════════════════════
CRITICAL REQUIREMENTS
═══════════════════════════════════

1. LANGUAGE & STYLE
   - Write in French (professional but warm tone)
   - Target audience: Donors, supporters, members, and general public
   - Focus on human impact and solidarity
   - Be specific and concrete (names, dates, numbers when relevant)

2. FRONTMATTER STRUCTURE (YAML)
   Required fields:
   ---
   title: "Compelling, descriptive title (max 60 chars for SEO)"
   date: ${currentDate}
   type: "posts"
   villages: ["lowercase-village-name"]  # MUST be lowercase!
   categories: ["Category Name"]
   tags: ["relevant", "keywords"]
   moods: ["emotional-tone"]
   description: "SEO-optimized summary (150-160 characters)"
   image: "/images/uploads/cover-image.jpg"  # If applicable
   draft: false
   ---

3. TAXONOMY RULES (STRICTLY ENFORCED)
   
   Villages (MUST be lowercase):
   - douentza, dorool, diona, debere, diambana, darawal, tanal, manko, tacouti, ndumpa
   - Multiple villages allowed: villages: ["dorool", "diona"]
   - Villages are centralized in data/villages/mali_villages.yaml
   
   Categories (Choose one or more):
   - Éducation (schools, education projects)
   - Santé (health, medical initiatives)
   - Infrastructure (construction, water, electricity)
   - informations (general news, announcements)
   
   Moods (emotional tone):
   - heureux (joyful, celebratory)
   - triste (sad, somber)
   - inspire (inspiring, uplifting)
   - motive (motivational, call to action)
   - reconnaissant (grateful, thankful)
   
   Tags (lowercase, specific keywords):
   - Examples: école, santé, puits, don, mission, fête

4. CONTENT STRUCTURE
   
   Opening paragraph:
   - Hook the reader immediately
   - State the main point clearly
   - Establish context (who, what, where, when)
   
   Body:
   - Use headings (##, ###) for organization
   - Include concrete details (dates, names, numbers)
   - Tell stories that illustrate impact
   - Use bullet points for clarity
   - Include quotes from beneficiaries/team if relevant
   
   Closing:
   - Summarize key takeaways
   - Call to action (donate, share, volunteer)
   - Link to related content if applicable

5. SEO OPTIMIZATION
   - Description: 150-160 characters, include keywords
   - Title: Under 60 characters, engaging and descriptive
   - Include image with alt text (if applicable)
   - Use semantic HTML headings (H2, H3)
   - Internal linking to villages, team, or related posts

6. FILE ORGANIZATION
   - Path: content/posts/${currentYear}/[slug].md
   - Year-based directory structure (NEW convention)
   - Slug: Auto-generated from title (Unicode safe)
   
   ${hasImages ? `
   For posts with images:
   - Use bundle structure: content/posts/${currentYear}/[slug]/index.md
   - Place images in same folder (page resources)
   - Reference with {{< gallery >}} shortcode or ![alt](/path)
   - PhotoSwipe auto-loads with gallery shortcode` : ""}

7. SHORTCODES AVAILABLE
   - {{< gallery >}} - Auto photo gallery from page resources
   - {{< image src="photo.jpg" alt="Description" >}} - Responsive image
   - {{< divider >}} - Visual separator
   - {{< details "Summary" >}}Content{{< /details >}} - Collapsible section

═══════════════════════════════════
IMPLEMENTATION STEPS
═══════════════════════════════════

1. Research the topic thoroughly (use web search if needed)
2. Draft the post content in French with proper structure
3. Create compelling frontmatter with all required fields
4. Use the create-post tool with these parameters:
   - title: [Compelling title]
   - content: [Full post body in Markdown]
   - villages: [Array of lowercase village names]
   - categories: [Array of categories]
   - tags: [Array of relevant tags]
   - moods: [Array of mood(s)]
   - description: [SEO description 150-160 chars]
   - image: [Cover image path if applicable]
   - bundle: ${hasImages ? "true" : "false"}

5. Validate with validate-content tool after creation
6. Confirm all taxonomies are lowercase and valid

═══════════════════════════════════
QUALITY CHECKLIST
═══════════════════════════════════

Before finalizing, verify:
✓ Written in French
✓ Title under 60 characters
✓ Description 150-160 characters
✓ Villages are lowercase
✓ At least one category assigned
✓ Relevant tags included (3-6 tags recommended)
✓ Mood reflects content tone
✓ Content has clear structure (intro, body, conclusion)
✓ Includes concrete details (dates, names, numbers)
✓ Human impact emphasized
✓ SEO optimized (keywords in title/description)
${hasImages ? "✓ Images are page resources (in same folder)" : ""}
✓ Call to action included
✓ Proper year directory (${currentYear})

═══════════════════════════════════
EXAMPLES OF GREAT POSTS
═══════════════════════════════════

Example 1: Education Project
---
title: "Nouvelle bibliothèque inaugurée à Dorool"
date: ${currentDate}
type: "posts"
villages: ["dorool"]
categories: ["Éducation"]
tags: ["bibliothèque", "école", "lecture", "don"]
moods: ["heureux", "reconnaissant"]
description: "La nouvelle bibliothèque de Dorool ouvre ses portes avec 500 livres pour les enfants du village."
image: "/images/uploads/bibliotheque-dorool.jpg"
draft: false
---

Example 2: Health Initiative
---
title: "Mission médicale à Diona : 200 consultations"
date: ${currentDate}
type: "posts"
villages: ["diona"]
categories: ["Santé"]
tags: ["mission", "santé", "consultation", "médecin"]
moods: ["inspire", "reconnaissant"]
description: "Retour sur la mission médicale du Dr. Touré à Diona qui a permis 200 consultations gratuites."
draft: false
---

═══════════════════════════════════
NOW PROCEED
═══════════════════════════════════

Use the create-post tool to create this post following all guidelines above.
Ensure quality, accuracy, and adherence to Leidimen's mission and values.`,
            },
          },
        ],
      };
    }
  );
}