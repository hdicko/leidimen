/**
 * List Content Tool
 * 
 * Lists Hugo content items with filtering and sorting capabilities.
 * Parses frontmatter from Markdown files to extract metadata.
 * 
 * Supported Content Types:
 * - posts: Blog articles organized by year
 * - equipe: Team member profiles
 * - galleries: Photo gallery collections
 * - villages: Village information pages
 * - documents: Legal documents (RGPD, privacy policy)
 * 
 * Filters:
 * - year: Filter posts by year (e.g., '2025')
 * - village: Filter by village taxonomy
 * - limit: Maximum number of results
 * 
 * Output includes:
 * - File path (relative to content/)
 * - Title, date, draft status
 * - Associated villages and categories
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter"; // YAML frontmatter parser
import { glob } from "glob";       // File pattern matching

/**
 * List content items with optional filtering
 * 
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Listing parameters
 * @param {string} params.contentType - Type of content to list
 * @param {string} [params.year] - Filter posts by year
 * @param {string} [params.village] - Filter by village
 * @param {number} [params.limit=20] - Maximum results
 * @returns {Object} MCP tool response with formatted content list
 */
export async function listContent(hugoRoot, params) {
  const contentDir = path.join(hugoRoot, "content", params.contentType);

  // Build glob pattern based on content type and filters
  let pattern;
  if (params.contentType === "posts" && params.year) {
    // Filter posts by year directory
    pattern = path.join(contentDir, params.year, "**/*.md");
  } else {
    // Get all content files recursively
    pattern = path.join(contentDir, "**/*.md");
  }

  const files = await glob(pattern);
  const items = [];

  // Process files up to the limit
  for (const file of files.slice(0, params.limit || 20)) {
    const basename = path.basename(file);
    // Skip Hugo section index files
    if (basename === "_index.md") continue;

    try {
      // Read file and parse YAML frontmatter
      const raw = await fs.readFile(file, "utf-8");
      const { data: fm } = matter(raw); // fm = frontmatter data

      // Get path relative to content/ directory
      const relativePath = path.relative(
        path.join(hugoRoot, "content"),
        file
      );

      // Apply village filter if specified
      if (
        params.village &&
        fm.villages &&
        !fm.villages.includes(params.village)
      ) {
        continue; // Skip files that don't match village filter
      }

      items.push({
        path: relativePath,
        title: fm.title || basename,
        date: fm.date ? String(fm.date).substring(0, 10) : "",
        draft: fm.draft || false,
        villages: fm.villages || [],
        categories: fm.categories || [],
      });
    } catch {
      // Skip unparseable files
    }
  }

  // Sort by date descending (newest first)
  items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  // Format items with emojis for visual clarity
  const formatted = items
    .map(
      (item) =>
        `${item.draft ? "📝" : "✅"} [${item.date}] ${item.title}\n   📄 ${item.path}${
          item.villages.length
            ? "\n   🏘️ " + item.villages.join(", ")
            : ""
        }`
    )
    .join("\n\n");

  return {
    content: [
      {
        type: "text",
        text: `📋 ${params.contentType} (${items.length} items)${
          params.village ? ` — filtered by village: ${params.village}` : ""
        }${params.year ? ` — year: ${params.year}` : ""}\n\n${
          formatted || "No items found."
        }`,
      },
    ],
  };
}