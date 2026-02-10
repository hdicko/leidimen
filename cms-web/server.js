const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Validate required environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'hdicko';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'leidimen';
const BRANCH = process.env.GITHUB_BRANCH || 'main';

if (!GITHUB_TOKEN) {
	console.error('❌ ERROR: GITHUB_TOKEN not found in environment variables');
	console.error('Please create a .env file with your GitHub token.');
	console.error('See .env.example for reference.');
	process.exit(1);
}

// Rate limiting configuration
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

function rateLimiter(req, res, next) {
	const ip = req.ip || req.connection.remoteAddress;
	const now = Date.now();
	
	if (!requestCounts.has(ip)) {
		requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
		return next();
	}
	
	const userData = requestCounts.get(ip);
	
	if (now > userData.resetTime) {
		userData.count = 1;
		userData.resetTime = now + RATE_LIMIT_WINDOW;
		return next();
	}
	
	if (userData.count >= MAX_REQUESTS) {
		return res.status(429).json({
			error: 'Too many requests',
			message: 'Rate limit exceeded. Please try again later.',
			retryAfter: Math.ceil((userData.resetTime - now) / 1000)
		});
	}
	
	userData.count++;
	next();
}

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Add size limit
app.use(express.static('.'));
app.use('/api', rateLimiter); // Apply rate limiting to API routes

// Initialize Octokit
const octokit = new Octokit({
	auth: GITHUB_TOKEN,
});

// Helper function to get file SHA (needed for updates)
async function getFileSha(path) {
	try {
		const { data } = await octokit.repos.getContent({
			owner: REPO_OWNER,
			repo: REPO_NAME,
			path: path,
			ref: BRANCH,
		});
		return data.sha;
	} catch (error) {
		return null; // File doesn't exist
	}
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', message: 'Leidimen CMS API is running' });
});

// Create or update post
app.post('/api/create-post', async (req, res) => {
	try {
		const { path, content, message, branch = BRANCH } = req.body;

		if (!path || !content || !message) {
			return res.status(400).json({
				error: 'Missing required fields: path, content, message',
			});
		}

		// Check if file exists
		const sha = await getFileSha(path);

		// Create or update file
		const response = await octokit.repos.createOrUpdateFileContents({
			owner: REPO_OWNER,
			repo: REPO_NAME,
			path: path,
			message: message,
			content: Buffer.from(content).toString('base64'),
			branch: branch,
			...(sha && { sha }), // Include SHA if updating existing file
		});

		res.json({
			success: true,
			message: 'Post created successfully',
			data: {
				path: path,
				sha: response.data.content.sha,
				url: response.data.content.html_url,
			},
		});
	} catch (error) {
		console.error('Error creating post:', error);
		res.status(500).json({
			error: 'Failed to create post',
			details: error.message,
		});
	}
});

// Get repository statistics
app.get('/api/stats', async (req, res) => {
	try {
		// Get all posts
		const postsResponse = await octokit.repos.getContent({
			owner: REPO_OWNER,
			repo: REPO_NAME,
			path: 'content/posts',
		});

		let postsCount = 0;
		if (Array.isArray(postsResponse.data)) {
			// Count files in subdirectories
			for (const item of postsResponse.data) {
				if (item.type === 'dir') {
					const dirContents = await octokit.repos.getContent({
						owner: REPO_OWNER,
						repo: REPO_NAME,
						path: item.path,
					});
					if (Array.isArray(dirContents.data)) {
						postsCount += dirContents.data.filter((f) => f.name.endsWith('.md')).length;
					}
				}
			}
		}

		// Get team members
		const membersResponse = await octokit.repos.getContent({
			owner: REPO_OWNER,
			repo: REPO_NAME,
			path: 'content/about',
		});

		const membersCount = Array.isArray(membersResponse.data)
			? membersResponse.data.filter((f) => f.name.endsWith('.md') && f.name !== '_index.md').length
			: 0;

		res.json({
			posts: postsCount,
			members: membersCount,
			villages: 10,
		});
	} catch (error) {
		console.error('Error fetching stats:', error);
		res.json({
			posts: '-',
			members: '-',
			villages: 10,
		});
	}
});

// Get list of posts
app.get('/api/posts', async (req, res) => {
	try {
		const posts = [];

		// Get posts from 2025
		const year2025Response = await octokit.repos.getContent({
			owner: REPO_OWNER,
			repo: REPO_NAME,
			path: 'content/posts/2025',
		});

		if (Array.isArray(year2025Response.data)) {
			for (const file of year2025Response.data.slice(0, 10)) {
				// Limit to 10 most recent
				if (file.name.endsWith('.md')) {
					try {
						const fileContent = await octokit.repos.getContent({
							owner: REPO_OWNER,
							repo: REPO_NAME,
							path: file.path,
						});

						const content = Buffer.from(fileContent.data.content, 'base64').toString('utf8');

						// Parse frontmatter (simple regex)
						const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
						if (frontmatterMatch) {
							const frontmatter = frontmatterMatch[1];
							const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
							const dateMatch = frontmatter.match(/date:\s*(\d{4}-\d{2}-\d{2})/);
							const descMatch = frontmatter.match(/description:\s*["'](.+?)["']/);
							const villagesMatch = frontmatter.match(/villages:\s*\[(.*?)\]/);
							const categoryMatch = frontmatter.match(/categories:\s*\["(.+?)"\]/);
							const moodMatch = frontmatter.match(/moods:\s*\["(.+?)"\]/);

							posts.push({
								title: titleMatch ? titleMatch[1] : file.name,
								date: dateMatch ? dateMatch[1] : '',
								description: descMatch ? descMatch[1] : '',
								villages: villagesMatch ? villagesMatch[1].split(',').map((v) => v.trim().replace(/['"]/g, '')) : [],
								category: categoryMatch ? categoryMatch[1] : '',
								mood: moodMatch ? moodMatch[1] : '',
								path: file.path,
							});
						}
					} catch (error) {
						console.error(`Error reading file ${file.name}:`, error);
					}
				}
			}
		}

		// Sort by date (most recent first)
		posts.sort((a, b) => new Date(b.date) - new Date(a.date));

		res.json(posts);
	} catch (error) {
		console.error('Error fetching posts:', error);
		res.status(500).json({
			error: 'Failed to fetch posts',
			details: error.message,
		});
	}
});

// Upload image (future implementation)
app.post('/api/upload-image', async (req, res) => {
	res.status(501).json({
		error: 'Image upload not yet implemented',
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          🏛️  LEIDIMEN CMS - Backend Server 🚀             ║
║                                                            ║
║  Server running on: http://localhost:${PORT}               ║
║  API endpoint:      http://localhost:${PORT}/api           ║
║                                                            ║
║  GitHub Repository: ${REPO_OWNER}/${REPO_NAME}                       ║
║  Branch:            ${BRANCH}                                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

Ready to manage Leidimen content! 🎉
    `);
});

// Error handling
process.on('unhandledRejection', (error) => {
	console.error('Unhandled rejection:', error);
});
