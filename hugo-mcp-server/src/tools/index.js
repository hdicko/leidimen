/**
 * Tools Registration Module
 *
 * This module registers all executable tools (operations) with the MCP server.
 * Tools provide functionality for content creation, site building, validation,
 * and other site management tasks.
 *
 * Tool Categories:
 * - Content Creation: create-post, create-team-member, create-gallery
 * - Site Building: build-site, serve-site
 * - Content Management: list-content, search-content, get-post-content
 * - Validation & Updates: validate-content, update-frontmatter
 */

import { z } from 'zod';
import { createPost } from './create-post.js';
import { buildSite } from './build-site.js';
import { serveSite } from './serve-site.js';
import { listContent } from './list-content.js';
import { createTeamMember } from './create-team-member.js';
import { createGallery } from './create-gallery.js';
import { validateContent } from './validate-content.js';
import { searchContent } from './search-content.js';
import { getPostContent } from './get-post-content.js';
import { updateFrontmatter } from './update-frontmatter.js';

/**
 * Register all tools with the MCP server
 * Each tool is defined with a name, description, schema, and handler function
 *
 * @param {McpServer} server - The MCP server instance
 * @param {string} hugoRoot - Root directory of the Hugo site
 */
export function registerTools(server, hugoRoot) {
	// ═══════════════════════════════════════
	// TOOL: Create a new blog post
	// ═══════════════════════════════════════
	server.tool(
		'create-post',
		'Create a new Hugo blog post with proper frontmatter for Leidimen',
		{
			title: z.string().describe('Post title'),
			date: z.string().optional().describe('Publication date (YYYY-MM-DD). Defaults to today.'),
			villages: z
				.array(
					z.enum([
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
					]),
				)
				.optional()
				.describe('Villages related to this post (lowercase)'),
			categories: z.array(z.string()).optional().describe('Categories (e.g., Éducation, Santé, Infrastructure)'),
			tags: z.array(z.string()).optional().describe('Tags/keywords'),
			moods: z
				.array(z.enum(['heureux', 'triste', 'inspire', 'motive', 'reconnaissant']))
				.optional()
				.describe('Mood/emotional tone'),
			description: z.string().optional().describe('SEO description (150-160 chars recommended)'),
			image: z.string().optional().describe('Cover image path'),
			body: z.string().describe('Post content in Markdown'),
			draft: z.boolean().optional().default(false).describe('Whether this is a draft'),
			isBundle: z
				.boolean()
				.optional()
				.default(false)
				.describe('Create as page bundle (folder with index.md) for galleries'),
		},
		async (params) => createPost(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Build the Hugo site
	// ═══════════════════════════════════════
	server.tool(
		'build-site',
		'Build the Leidimen Hugo site (production or draft mode)',
		{
			includeDrafts: z.boolean().optional().default(false).describe('Include draft content in the build'),
			minify: z.boolean().optional().default(true).describe('Minify output (HTML, CSS)'),
		},
		async (params) => buildSite(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Start Hugo dev server
	// ═══════════════════════════════════════
	server.tool(
		'serve-site',
		'Start the Hugo development server',
		{
			port: z.number().optional().default(1313).describe('Port number'),
			openBrowser: z.boolean().optional().default(false),
		},
		async (params) => serveSite(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: List content (posts, team, galleries, villages)
	// ═══════════════════════════════════════
	server.tool(
		'list-content',
		'List Hugo content items (posts, team members, galleries, villages)',
		{
			contentType: z
				.enum(['posts', 'equipe', 'galleries', 'villages', 'documents'])
				.describe('Type of content to list'),
			year: z.string().optional().describe("Filter posts by year (e.g., '2025')"),
			village: z.string().optional().describe('Filter posts by village'),
			limit: z.number().optional().default(20).describe('Max results'),
		},
		async (params) => listContent(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Create a team member profile
	// ═══════════════════════════════════════
	server.tool(
		'create-team-member',
		'Create a new team member profile for the Leidimen équipe',
		{
			name: z.string().describe('Full name of the team member'),
			fonction: z.string().describe('Role/function (e.g., Président, Trésorier)'),
			membre: z.enum(['fondateur', 'bureau', 'adherent', 'bienfaiteur']).describe('Member status'),
			image: z.string().optional().describe('Profile photo path'),
			ville: z.string().optional().describe('City'),
			pays: z.string().optional().default('France').describe('Country'),
			email: z.string().optional(),
			devise: z.string().optional().describe('Personal motto'),
			specialites: z.array(z.string()).optional().describe('Specialties'),
			presentation: z.string().optional().describe('Short bio'),
			body: z.string().optional().describe('Full biography in Markdown'),
		},
		async (params) => createTeamMember(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Create a photo gallery
	// ═══════════════════════════════════════
	server.tool(
		'create-gallery',
		'Create a new photo gallery page bundle',
		{
			title: z.string().describe('Gallery title'),
			slug: z.string().describe("URL slug (e.g., 'soiree-2025')"),
			description: z.string().optional(),
			date: z.string().optional().describe('Date (YYYY-MM-DD)'),
			villages: z.array(z.string()).optional().describe('Related villages'),
		},
		async (params) => createGallery(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Validate content
	// ═══════════════════════════════════════
	server.tool(
		'validate-content',
		'Validate Hugo content files for common issues (taxonomy casing, missing fields, image paths)',
		{
			path: z
				.string()
				.optional()
				.describe('Specific file or folder to validate (relative to content/). Defaults to all content.'),
		},
		async (params) => validateContent(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Search content
	// ═══════════════════════════════════════
	server.tool(
		'search-content',
		'Full-text search across all Hugo content files',
		{
			query: z.string().describe('Search query'),
			contentType: z.enum(['all', 'posts', 'equipe', 'galleries', 'villages']).optional().default('all'),
		},
		async (params) => searchContent(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Read post content
	// ═══════════════════════════════════════
	server.tool(
		'get-post-content',
		'Read and parse a Hugo content file, returning frontmatter and body separately',
		{
			path: z.string().describe("Relative path from content/ (e.g., 'posts/2025/my-post.md')"),
		},
		async (params) => getPostContent(hugoRoot, params),
	);

	// ═══════════════════════════════════════
	// TOOL: Update frontmatter fields
	// ═══════════════════════════════════════
	server.tool(
		'update-frontmatter',
		'Update frontmatter fields of an existing Hugo content file',
		{
			path: z.string().describe("Relative path from content/ (e.g., 'posts/2025/my-post.md')"),
			fields: z.record(z.string(), z.any()).describe('Key-value pairs to update in frontmatter'),
		},
		async (params) => updateFrontmatter(hugoRoot, params),
	);
}
