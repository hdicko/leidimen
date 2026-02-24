/**
 * Get Post Content Tool
 *
 * Reads and parses a Hugo content file, separating frontmatter from body.
 * Returns structured data that can be used for editing or analysis.
 *
 * Output Format:
 * - Frontmatter: Parsed YAML as JSON object
 * - Content: Markdown body text
 *
 * Use Cases:
 * - Reading existing content before editing
 * - Extracting metadata for analysis
 * - Previewing content structure
 * - Validating frontmatter fields
 *
 * Path Format:
 * - Relative to content/ directory
 * - Example: "posts/2025/my-article.md"
 * - For bundles: "posts/2025/my-gallery/index.md"
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter'; // YAML frontmatter parser

/**
 * Read and parse a Hugo content file
 *
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Read parameters
 * @param {string} params.path - Relative path from content/ (e.g., 'posts/2025/my-post.md')
 * @returns {Object} MCP tool response with frontmatter and content
 */
export async function getPostContent(hugoRoot, params) {
	// Construct full file path
	const filePath = path.join(hugoRoot, 'content', params.path);

	try {
		// Read file and parse frontmatter
		const raw = await fs.readFile(filePath, 'utf-8');
		const { data: fm, content } = matter(raw);

		// Return structured response with separated frontmatter and content
		return {
			content: [
				{
					type: 'text',
					text: `📄 ${params.path}\n\n**Frontmatter:**\n\`\`\`json\n${JSON.stringify(fm, null, 2)}\n\`\`\`\n\n**Content:**\n${content}`,
				},
			],
		};
	} catch (error) {
		return {
			content: [
				{
					type: 'text',
					text: `❌ Could not read file: content/${params.path}\nError: ${error.message}`,
				},
			],
			isError: true,
		};
	}
}
