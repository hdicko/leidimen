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
}