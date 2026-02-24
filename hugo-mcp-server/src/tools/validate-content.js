/**
 * Validate Content Tool
 *
 * Validates Hugo content files for common issues and best practices.
 * Helps maintain content quality and prevent build errors.
 *
 * Validation Checks:
 * - Required fields: title, date
 * - Taxonomy values: villages must be lowercase and from valid list
 * - Moods: must be from predefined list
 * - Post type field: posts must have type: "posts"
 * - SEO: description length (max 160 chars for optimal SEO)
 * - Image bundles: warn if images exist but file isn't index.md
 *
 * Valid Values:
 * - Villages: douentza, dorool, diona, debere, diambana, darawal,
 *            tanal, manko, tacouti, ndumpa
 * - Moods: heureux, triste, inspire, motive, reconnaissant
 *
 * Common Issues:
 * - Uppercase villages ("Dorool" → should be "dorool")
 * - Missing type field in posts/
 * - Description too long (hurts SEO snippet)
 * - Images in folder but not using index.md (should be page bundle)
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

// Valid taxonomy values - must match hugo.toml configuration
const VALID_VILLAGES = [
	'douentza',
	'dorool',
	'diona',
	'debere',
	'diambana',
	'darawal',
	'tanal',
	'manko',
	'tacouti',
	'ndumpa',
];

const VALID_MOODS = ['heureux', 'triste', 'inspire', 'motive', 'reconnaissant'];

/**
 * Validate content files for common issues
 *
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Validation parameters
 * @param {string} [params.path] - Specific file or folder to validate (relative to content/)
 * @returns {Object} MCP tool response with validation results
 */
export async function validateContent(hugoRoot, params) {
	// Determine what to validate: specific path or all content
	const searchPath = params.path ? path.join(hugoRoot, 'content', params.path) : path.join(hugoRoot, 'content');

	// Build glob pattern based on whether it's a file or directory
	let pattern;
	try {
		const stat = await fs.stat(searchPath);
		pattern = stat.isDirectory() ? path.join(searchPath, '**/*.md') : searchPath;
	} catch {
		return {
			content: [
				{
					type: 'text',
					text: `❌ Path not found: ${searchPath}`,
				},
			],
			isError: true,
		};
	}

	const files = await glob(pattern);
	const issues = []; // Collect all validation issues

	// Validate each content file
	for (const file of files) {
		const relativePath = path.relative(path.join(hugoRoot, 'content'), file);
		const basename = path.basename(file);
		// Skip Hugo section index files
		if (basename === '_index.md') continue;

		try {
			// Parse frontmatter from Markdown file
			const raw = await fs.readFile(file, 'utf-8');
			const { data: fm } = matter(raw);
			const fileIssues = []; // Issues for this specific file

			// Check: title exists
			if (!fm.title) fileIssues.push('⚠️ Missing title');

			// Check: date exists
			if (!fm.date) fileIssues.push('⚠️ Missing date');

			// Check: villages are lowercase and valid
			if (fm.villages) {
				for (const v of fm.villages) {
					if (v !== v.toLowerCase()) {
						fileIssues.push(`❌ Village "${v}" must be lowercase → "${v.toLowerCase()}"`);
					}
					if (!VALID_VILLAGES.includes(v.toLowerCase())) {
						fileIssues.push(`❌ Unknown village: "${v}". Valid: ${VALID_VILLAGES.join(', ')}`);
					}
				}
			}

			// Check: moods are valid
			if (fm.moods) {
				for (const m of fm.moods) {
					if (!VALID_MOODS.includes(m)) {
						fileIssues.push(`❌ Unknown mood: "${m}". Valid: ${VALID_MOODS.join(', ')}`);
					}
				}
			}

			// Check: posts have type field
			if (relativePath.startsWith('posts/') && fm.type !== 'posts') {
				fileIssues.push(`⚠️ Missing or wrong type field. Should be type: "posts"`);
			}

			// Check: description length for SEO
			if (fm.description && fm.description.length > 160) {
				fileIssues.push(`⚠️ Description too long (${fm.description.length} chars, max 160 for SEO)`);
			}

			// Check: bundle posts use index.md
			if (relativePath.startsWith('posts/') && basename !== 'index.md') {
				const dir = path.dirname(file);
				try {
					const siblings = await fs.readdir(dir);
					const hasImages = siblings.some((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
					if (hasImages) {
						fileIssues.push(
							`❌ Images found in directory but file is not index.md. Rename to index.md for page bundle.`,
						);
					}
				} catch {
					// skip readdir errors
				}
			}

			if (fileIssues.length > 0) {
				issues.push(`📄 ${relativePath}\n${fileIssues.map((i) => `   ${i}`).join('\n')}`);
			}
		} catch (e) {
			issues.push(`📄 ${relativePath}\n   ❌ Failed to parse: ${e.message}`);
		}
	}

	const totalFiles = files.filter((f) => path.basename(f) !== '_index.md').length;

	return {
		content: [
			{
				type: 'text',
				text:
					issues.length === 0
						? `✅ All ${totalFiles} content files validated — no issues found!`
						: `🔍 Validated ${totalFiles} files — ${issues.length} file(s) with issues:\n\n${issues.join('\n\n')}`,
			},
		],
	};
}
