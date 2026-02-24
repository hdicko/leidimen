/**
 * Resources Registration Module
 *
 * This module provides read-only access to Hugo site data and configuration.
 * Resources are static or computed data that can be queried by MCP clients.
 *
 * Available Resources:
 * - site-config: Hugo configuration from hugo.toml
 * - villages-data: Village information with coordinates and projects
 * - taxonomies: Available taxonomy terms (villages, categories, moods, tags)
 * - cms-config: Netlify CMS configuration
 * - shortcodes: List of available Hugo shortcodes
 * - site-stats: Content statistics (post counts, distributions)
 */

import fs from 'fs/promises';
import path from 'path';
import YAML from 'yaml';

/**
 * Register all resource providers with the MCP server
 *
 * @param {McpServer} server - The MCP server instance
 * @param {string} hugoRoot - Root directory of the Hugo site
 */
export function registerResources(server, hugoRoot) {
	// ═══════════════════════════════════════
	// RESOURCE: Site configuration
	// ═══════════════════════════════════════
	server.resource('site-config', 'hugo://config', async (uri) => {
		const configPath = path.join(hugoRoot, 'hugo.toml');
		const content = await fs.readFile(configPath, 'utf-8');
		return {
			contents: [
				{
					uri: uri.href,
					mimeType: 'application/toml',
					text: content,
				},
			],
		};
	});

	// ═══════════════════════════════════════
	// RESOURCE: Village data
	// ═══════════════════════════════════════
	server.resource('villages-data', 'hugo://data/villages', async (uri) => {
		const villagesPath = path.join(hugoRoot, 'data', 'villages', 'mali_villages.yaml');
		const raw = await fs.readFile(villagesPath, 'utf-8');
		const villages = YAML.parse(raw);

		const summary = villages
			.map(
				(v) =>
					`🏘️ ${v.name} (${v.type}) — pop. ${v.population}\n   📍 ${v.latitude}, ${v.longitude}\n   📋 Projects: ${v.projects.join(', ')}\n   📝 ${v.description}`,
			)
			.join('\n\n');

		return {
			contents: [
				{
					uri: uri.href,
					mimeType: 'text/plain',
					text: `# Leidimen Villages (${villages.length} total)\n\n${summary}`,
				},
			],
		};
	});

	// ═══════════════════════════════════════
	// RESOURCE: Available taxonomies
	// ═══════════════════════════════════════
	server.resource('taxonomies', 'hugo://taxonomies', async (uri) => {
		const taxonomies = {
			villages: ['douentza', 'dorool', 'diona', 'debere', 'diambana', 'darawal', 'tanal', 'manko', 'tacouti', 'ndumpa'],
			categories: ['Éducation', 'Santé', 'Infrastructure', 'informations'],
			moods: ['heureux', 'triste', 'inspire', 'motive', 'reconnaissant'],
			tags: 'Free-form (any string)',
		};

		return {
			contents: [
				{
					uri: uri.href,
					mimeType: 'application/json',
					text: JSON.stringify(taxonomies, null, 2),
				},
			],
		};
	});

	// ═══════════════════════════════════════
	// RESOURCE: Netlify CMS config
	// ═══════════════════════════════════════
	server.resource('cms-config', 'hugo://admin/config', async (uri) => {
		const configPath = path.join(hugoRoot, 'static', 'admin', 'config.yml');
		const content = await fs.readFile(configPath, 'utf-8');
		return {
			contents: [
				{
					uri: uri.href,
					mimeType: 'text/yaml',
					text: content,
				},
			],
		};
	});

	// ═══════════════════════════════════════
	// RESOURCE: Available shortcodes
	// ═══════════════════════════════════════
	server.resource('shortcodes', 'hugo://shortcodes', async (uri) => {
		const shortcodesDir = path.join(hugoRoot, 'layouts', 'shortcodes');
		const files = await fs.readdir(shortcodesDir);

		const shortcodes = [];
		for (const file of files) {
			if (!file.endsWith('.html')) continue;
			const name = file.replace('.html', '');
			const content = await fs.readFile(path.join(shortcodesDir, file), 'utf-8');
			const firstLine = content.split('\n')[0];
			shortcodes.push(`{{< ${name} >}} — ${firstLine.substring(0, 80)}`);
		}

		return {
			contents: [
				{
					uri: uri.href,
					mimeType: 'text/plain',
					text: `# Available Shortcodes\n\n${shortcodes.join('\n')}`,
				},
			],
		};
	});

	// ═══════════════════════════════════════
	// RESOURCE: Content statistics
	// ═══════════════════════════════════════
	server.resource('site-stats', 'hugo://stats', async (uri) => {
		const { glob } = await import('glob');

		const posts = await glob(path.join(hugoRoot, 'content/posts/**/*.md'));
		const team = await glob(path.join(hugoRoot, 'content/equipe/*.md'));
		const galleries = await glob(path.join(hugoRoot, 'content/galleries/*/index.md'));
		const villages = await glob(path.join(hugoRoot, 'content/villages/*/'));

		// Count posts by year
		const postsByYear = {};
		for (const p of posts) {
			const match = p.match(/posts\/(\d{4})\//);
			if (match) {
				postsByYear[match[1]] = (postsByYear[match[1]] || 0) + 1;
			}
		}

		const stats = {
			totalPosts: posts.filter((f) => !f.endsWith('_index.md')).length,
			totalTeamMembers: team.filter((f) => !f.endsWith('_index.md')).length,
			totalGalleries: galleries.length,
			totalVillages: villages.length,
			postsByYear,
		};

		return {
			contents: [
				{
					uri: uri.href,
					mimeType: 'application/json',
					text: JSON.stringify(stats, null, 2),
				},
			],
		};
	});
}
