/**
 * Update Frontmatter Tool
 * 
 * Updates specific fields in a content file's YAML frontmatter.
 * Preserves the content body and other frontmatter fields unchanged.
 * 
 * Use Cases:
 * - Fix taxonomy values (e.g., uppercase villages → lowercase)
 * - Add missing required fields (description, type)
 * - Update metadata (date, categories, tags)
 * - Change draft status
 * 
 * Field Updates:
 * - Accepts key-value pairs as a record/object
 * - Existing fields are replaced with new values
 * - New fields are added to frontmatter
 * - Content body is preserved unchanged
 * 
 * Example Updates:
 * - { "draft": false } - Publish a draft
 * - { "villages": ["dorool", "diona"] } - Fix taxonomy
 * - { "description": "..." } - Add SEO description
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter"; // YAML frontmatter parser

/**
 * Update frontmatter fields in a content file
 * 
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Update parameters
 * @param {string} params.path - Relative path from content/ (e.g., 'posts/2025/my-post.md')
 * @param {Object} params.fields - Key-value pairs to update in frontmatter
 * @returns {Object} MCP tool response with update status
 */
export async function updateFrontmatter(hugoRoot, params) {
  // Construct full file path
  const filePath = path.join(
    hugoRoot,
    "content",
    params.path
  );

  try {
    // Read and parse existing file
    const raw = await fs.readFile(filePath, "utf-8");
    const { data: fm, content } = matter(raw);

    // Track changes for reporting
    const updatedFields = [];
    
    // Apply field updates
    for (const [key, value] of Object.entries(
      params.fields
    )) {
      const oldValue = fm[key];
      fm[key] = value; // Update or add field
      updatedFields.push(
        `  ${key}: ${JSON.stringify(oldValue)} → ${JSON.stringify(value)}`
      );
    }

    // Reconstruct file with updated frontmatter
    // matter.stringify() preserves YAML formatting
    const output = matter.stringify(content, fm);
    await fs.writeFile(filePath, output, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: `✅ Updated frontmatter in ${params.path}\n\nChanges:\n${updatedFields.join("\n")}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Failed to update: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}