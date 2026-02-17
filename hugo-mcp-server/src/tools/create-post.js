/**
 * Create Post Tool
 * 
 * Creates a new Hugo blog post with proper YAML frontmatter for the Leidimen site.
 * Posts are organized by year in the content/posts/ directory.
 * 
 * Features:
 * - Auto-generates URL slug from title (normalized, lowercase, no accents)
 * - Supports both single-file posts and page bundles (for galleries)
 * - Validates required frontmatter fields
 * - Prevents duplicate file creation
 * 
 * Directory Structure:
 * - Single file: content/posts/YYYY/slug.md
 * - Bundle: content/posts/YYYY/slug/index.md
 */

import fs from "fs/promises";
import path from "path";

/**
 * Create a new blog post with YAML frontmatter
 * 
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Post parameters
 * @param {string} params.title - Post title
 * @param {string} [params.date] - Publication date (YYYY-MM-DD), defaults to today
 * @param {string[]} [params.villages] - Related villages (lowercase)
 * @param {string[]} [params.categories] - Post categories
 * @param {string[]} [params.tags] - Post tags/keywords
 * @param {string[]} [params.moods] - Emotional tone tags
 * @param {string} [params.description] - SEO description (150-160 chars)
 * @param {string} [params.image] - Cover image path
 * @param {string} params.body - Post content in Markdown
 * @param {boolean} [params.draft=false] - Whether post is a draft
 * @param {boolean} [params.isBundle=false] - Create as page bundle for galleries
 * @returns {Object} MCP tool response with creation status
 */
export async function createPost(hugoRoot, params) {
  // Use provided date or default to today
  const date = params.date || new Date().toISOString().split("T")[0];
  const year = date.substring(0, 4);
  
  // Generate URL-friendly slug from title
  // - Convert to lowercase
  // - Normalize Unicode (NFD = decomposed form)
  // - Remove accent marks (diacritics)
  // - Replace non-alphanumeric with hyphens
  // - Remove leading/trailing hyphens
  const slug = params.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  let filePath;
  let contentDir;

  // Determine file structure based on bundle type
  if (params.isBundle) {
    // Page bundle: folder with index.md for posts with images
    contentDir = path.join(hugoRoot, "content", "posts", year, slug);
    filePath = path.join(contentDir, "index.md");
    await fs.mkdir(contentDir, { recursive: true });
  } else {
    // Single file: standalone markdown file
    contentDir = path.join(hugoRoot, "content", "posts", year);
    filePath = path.join(contentDir, `${slug}.md`);
    await fs.mkdir(contentDir, { recursive: true });
  }

  // Check if file already exists
  try {
    await fs.access(filePath);
    return {
      content: [
        {
          type: "text",
          text: `❌ File already exists: ${path.relative(hugoRoot, filePath)}\nUse a different title or delete the existing file first.`,
        },
      ],
    };
  } catch {
    // File doesn't exist — proceed
  }

  // Build YAML frontmatter with required and optional fields
  const yamlLines = ["---"];
  
  // Required fields
  yamlLines.push(`title: "${params.title}"`);
  yamlLines.push(`date: ${date}`);
  yamlLines.push(`type: "posts"`); // Required for proper routing in Hugo
  yamlLines.push(`draft: ${params.draft ?? false}`);
  
  // Optional metadata fields
  if (params.description)
    yamlLines.push(`description: "${params.description}"`);
  if (params.image) yamlLines.push(`image: "${params.image}"`);
  
  // Taxonomies (arrays in YAML)
  if (params.villages?.length) {
    yamlLines.push(`villages:`);
    params.villages.forEach((v) => yamlLines.push(`  - "${v}"`));
  }
  if (params.categories?.length) {
    yamlLines.push(`categories:`);
    params.categories.forEach((c) => yamlLines.push(`  - "${c}"`));
  }
  if (params.tags?.length) {
    yamlLines.push(`tags:`);
    params.tags.forEach((t) => yamlLines.push(`  - "${t}"`));
  }
  if (params.moods?.length) {
    yamlLines.push(`moods:`);
    params.moods.forEach((m) => yamlLines.push(`  - "${m}"`));
  }
  
  yamlLines.push("---");
  yamlLines.push("");

  // Combine frontmatter and content body
  const fileContent = yamlLines.join("\n") + params.body + "\n";
  
  // Write the complete file to disk
  await fs.writeFile(filePath, fileContent, "utf-8");

  // Return success response with file details
  const relativePath = path.relative(hugoRoot, filePath);
  return {
    content: [
      {
        type: "text",
        text: [
          `✅ Post created successfully!`,
          `📄 File: ${relativePath}`,
          `📅 Date: ${date}`,
          `🏷️ Villages: ${(params.villages || []).join(", ") || "none"}`,
          `📁 Type: ${params.isBundle ? "Page Bundle" : "Single File"}`,
        ].join("\n"),
      },
    ],
  };
}