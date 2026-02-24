/**
 * Build Site Tool
 *
 * Compiles the Hugo site into static files in the public/ directory.
 * Uses the Hugo binary from node_modules (installed via hugo-installer).
 *
 * Build Options:
 * - Garbage collection (--gc): Remove unused cache files
 * - Clean destination (--cleanDestinationDir): Remove old files
 * - Minification (--minify): Compress HTML, CSS, JS
 * - Draft inclusion (--buildDrafts): Include draft content
 *
 * Common Issues:
 * - Hugo binary missing: Run `npm install` to install hugo-installer
 * - SCSS errors: Ensure Dart Sass is installed (required by Netlify build)
 * - Template errors: Check Hugo version compatibility (0.152.1)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

// Promisify exec for async/await usage
const execAsync = promisify(exec);

/**
 * Build the Hugo site to static files
 *
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Build parameters
 * @param {boolean} [params.minify=true] - Minify HTML/CSS output
 * @param {boolean} [params.includeDrafts=false] - Include draft content
 * @returns {Object} MCP tool response with build output or errors
 */
export async function buildSite(hugoRoot, params) {
	// Path to Hugo binary installed by hugo-installer package
	const hugoBin = path.join(hugoRoot, 'node_modules', '.bin', 'hugo', 'hugo');

	// Build command arguments
	const args = [
		'--gc', // Garbage collect unused cache
		'--cleanDestinationDir', // Remove old files before build
	];
	if (params.minify) args.push('--minify'); // Compress output
	if (params.includeDrafts) args.push('--buildDrafts'); // Include drafts

	try {
		const { stdout, stderr } = await execAsync(`${hugoBin} ${args.join(' ')}`, {
			cwd: hugoRoot,
			timeout: 60000,
		});

		return {
			content: [
				{
					type: 'text',
					text: `✅ Hugo build completed!\n\n${stdout}${stderr ? `\n⚠️ Warnings:\n${stderr}` : ''}`,
				},
			],
		};
	} catch (error) {
		return {
			content: [
				{
					type: 'text',
					text: [
						`❌ Build failed!`,
						``,
						error.stderr || error.message,
						``,
						`Common fixes:`,
						`- Run \`npm install\` to install Hugo binary`,
						`- Check content files for syntax errors`,
						`- Verify SCSS compilation (Dart Sass required)`,
					].join('\n'),
				},
			],
			isError: true,
		};
	}
}
