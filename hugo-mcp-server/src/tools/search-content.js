/**
 * Search Content Tool
 *
 * Performs full-text search across Hugo content files.
 * Searches in multiple fields: title, body, description, tags, villages.
 *
 * Search Locations:
 * - Title: Frontmatter title field
 * - Body: Main Markdown content
 * - Description: SEO description
 * - Tags: Tag taxonomy values
 * - Villages: Village taxonomy values
 *
 * Features:
 * - Case-insensitive search
 * - Context snippets around matches
 * - Sorted by date (newest first)
 * - Indicates which field(s) matched
 *
 * Content Types:
 * - all: Search across all content (default)
 * - posts: Blog articles only
 * - equipe: Team members only
 * - galleries: Photo galleries only
 * - villages: Village pages only
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

/**
 * Search content files for a query string
 *
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query (case-insensitive)
 * @param {string} [params.contentType="all"] - Type of content to search
 * @returns {Object} MCP tool response with search results
 */
export async function searchContent(hugoRoot, params) {
	// Determine search scope
	const searchDir =
		params.contentType === 'all' ? path.join(hugoRoot, 'content') : path.join(hugoRoot, 'content', params.contentType);

	const files = await glob(path.join(searchDir, '**/*.md'));
	const query = params.query.toLowerCase(); // Case-insensitive
	const results = [];

	// Search through each file
	for (const file of files) {
		const basename = path.basename(file);
		if (basename === '_index.md') continue; // Skip section indexes

		try {
			// Parse file into frontmatter and content
			const raw = await fs.readFile(file, 'utf-8');
			const { data: fm, content } = matter(raw);

			// Check all searchable fields
			const titleMatch = (fm.title || '').toLowerCase().includes(query);
			const bodyMatch = content.toLowerCase().includes(query);
			const descMatch = (fm.description || '').toLowerCase().includes(query);
			const tagMatch = (fm.tags || []).some((t) => t.toLowerCase().includes(query));
			const villageMatch = (fm.villages || []).some((v) => v.toLowerCase().includes(query));

			// If any field matches, add to results
			if (titleMatch || bodyMatch || descMatch || tagMatch || villageMatch) {
				const relativePath = path.relative(path.join(hugoRoot, 'content'), file);

				// Extract context snippet around the match in body
				let snippet = '';
				if (bodyMatch) {
					const idx = content.toLowerCase().indexOf(query);
					const start = Math.max(0, idx - 60); // 60 chars before
					const end = Math.min(
						content.length,
						idx + query.length + 60, // 60 chars after
					);
					snippet =
						'...' +
						content.substring(start, end).replace(/\n/g, ' ') + // Collapse newlines
						'...';
				}

				results.push({
					path: relativePath,
					title: fm.title || basename,
					date: fm.date ? String(fm.date).substring(0, 10) : '',
					matchIn: [
						titleMatch && 'title',
						bodyMatch && 'body',
						descMatch && 'description',
						tagMatch && 'tags',
						villageMatch && 'villages',
					].filter(Boolean),
					snippet,
				});
			}
		} catch {
			// skip
		}
	}

	results.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

	const formatted = results
		.map(
			(r) =>
				`📄 ${r.title} (${r.date})\n   Path: ${r.path}\n   Match: ${r.matchIn.join(', ')}${
					r.snippet ? `\n   "${r.snippet}"` : ''
				}`,
		)
		.join('\n\n');

	return {
		content: [
			{
				type: 'text',
				text: `🔍 Search: "${params.query}" — ${results.length} result(s)\n\n${formatted || 'No matches found.'}`,
			},
		],
	};
}
