# Hugo MCP Server for Leidimen

A custom [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server providing AI assistants with comprehensive tools, resources, and prompts to manage the Leidimen Hugo static site.

## Overview

This MCP server exposes the complete Leidimen Hugo site management workflow through a standardized protocol, enabling AI assistants (like Claude Desktop, Cline, or other MCP-compatible clients) to:

- **Create and manage content** (blog posts, team profiles, galleries)
- **Build and serve** the Hugo site
- **Validate and audit** content for quality and consistency
- **Search and query** site data
- **Access site resources** (configuration, village data, taxonomies)

**Key Benefits:**

- ✅ **Type-safe** content creation with Zod schema validation
- ✅ **Hugo-specific conventions** baked in (year-based posts, taxonomy rules, frontmatter structure)
- ✅ **Leidimen-specific** taxonomies and village data integration
- ✅ **Consistent content structure** across all creation methods
- ✅ **Built-in validation** to prevent common errors (taxonomy casing, missing fields, broken image paths)

---

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Tools Reference](#tools-reference)
- [Resources Reference](#resources-reference)
- [Prompts Reference](#prompts-reference)
- [MCP Client Setup](#mcp-client-setup)
- [Development](#development)
- [Architecture](#architecture)
- [Use Cases](#use-cases)
- [Troubleshooting](#troubleshooting)

---

## Installation

### Prerequisites

- **Node.js** 18+ (for native ES modules support)
- **Hugo** 0.152.1 (installed via `npm install` in parent directory)
- **MCP-compatible client** (Claude Desktop, Cline, etc.)

### Setup

```bash
# 1. Install dependencies
cd hugo-mcp-server
npm install

# 2. Test the server locally
npm run inspect

# 3. Configure your MCP client (see MCP Client Setup section)
```

---

## Configuration

### Environment Variables

The server uses `HUGO_ROOT` to locate the Hugo site:

```bash
export HUGO_ROOT="/path/to/leidimen"
```

**Default:** `/home/dicko/dev/hugo/hugo_sites/leidimen` (hardcoded in `src/index.js` line 11)

**For production usage:** Set `HUGO_ROOT` in your MCP client configuration (see [MCP Client Setup](#mcp-client-setup)).

---

## Tools Reference

The server provides 11 tools for content management and site operations.

### Content Creation Tools

#### `create-post`

**Description:** Create a new Hugo blog post with proper frontmatter for Leidimen

**Parameters:**

- `title` (string, required): Post title
- `body` (string, required): Post content in Markdown
- `date` (string, optional): Publication date (YYYY-MM-DD). Defaults to today.
- `villages` (array, optional): Villages related to this post (lowercase)
  - Valid values: `douentza`, `dorool`, `diona`, `debere`, `diambana`, `darawal`, `tanal`, `manko`, `tacouti`, `ndumpa`
- `categories` (array, optional): Categories (e.g., `Éducation`, `Santé`, `Infrastructure`)
- `tags` (array, optional): Tags/keywords (free-form strings)
- `moods` (array, optional): Mood/emotional tone
  - Valid values: `heureux`, `triste`, `inspire`, `motive`, `reconnaissant`
- `description` (string, optional): SEO description (150-160 chars recommended)
- `image` (string, optional): Cover image path (e.g., `/images/uploads/cover.jpg`)
- `draft` (boolean, optional, default: `false`): Whether this is a draft
- `isBundle` (boolean, optional, default: `false`): Create as page bundle (folder with `index.md`) for galleries

**Output:**

- Creates file at `content/posts/{YEAR}/{slug}.md` (or `content/posts/{YEAR}/{slug}/index.md` for bundles)
- Returns confirmation with file path and preview URL

**Example:**

```javascript
{
  "title": "Nouvelle école à Dorool",
  "body": "Le projet d'école primaire à Dorool est maintenant terminé...",
  "villages": ["dorool"],
  "categories": ["Éducation"],
  "tags": ["école", "projet", "2025"],
  "description": "Inauguration de la nouvelle école primaire dans le village de Dorool",
  "draft": false
}
```

---

#### `create-team-member`

**Description:** Create a new team member profile for the Leidimen équipe

**Parameters:**

- `name` (string, required): Full name of the team member
- `fonction` (string, required): Role/function (e.g., `Président`, `Trésorier`, `Secrétaire`)
- `membre` (enum, required): Member status
  - Valid values: `fondateur`, `bureau`, `adherent`, `bienfaiteur`
- `image` (string, optional): Profile photo path (e.g., `/images/team/john-doe.jpg`)
- `ville` (string, optional): City
- `pays` (string, optional, default: `France`): Country
- `email` (string, optional): Email address
- `devise` (string, optional): Personal motto
- `specialites` (array, optional): List of specialties
- `presentation` (string, optional): Short bio (2-3 sentences)
- `body` (string, optional): Full biography in Markdown

**Output:**

- Creates file at `content/equipe/{firstname-lastname}.md`
- Uses custom `card` frontmatter structure for profile display
- Returns file path and member profile URL

---

#### `create-gallery`

**Description:** Create a new photo gallery page bundle

**Parameters:**

- `title` (string, required): Gallery title
- `slug` (string, required): URL slug (e.g., `soiree-2025`)
- `description` (string, optional): Gallery description
- `date` (string, optional): Date (YYYY-MM-DD)
- `villages` (array, optional): Related villages (lowercase)

**Output:**

- Creates bundle at `content/galleries/{slug}/index.md`
- Creates directory structure for page resources (images go here)
- Returns instructions for adding photos

**Important:** Images must be placed in the same folder as `index.md` (page resources pattern) for the `{{< gallery >}}` shortcode to work.

---

### Content Management Tools

#### `get-post-content`

**Description:** Read and parse a Hugo content file, returning frontmatter and body separately

**Parameters:**

- `path` (string, required): Relative path from `content/` (e.g., `posts/2025/my-post.md`)

**Output:**

- Frontmatter as parsed YAML object
- Body as Markdown string
- File metadata (path, last modified)

**Use cases:**

- Reading existing content for updates
- Extracting frontmatter for validation
- Copying content structure

---

#### `update-frontmatter`

**Description:** Update frontmatter fields of an existing Hugo content file

**Parameters:**

- `path` (string, required): Relative path from `content/` (e.g., `posts/2025/my-post.md`)
- `fields` (object, required): Key-value pairs to update in frontmatter

**Output:**

- Updates file in-place
- Returns updated frontmatter and diff

**Example:**

```javascript
{
  "path": "posts/2025/my-article.md",
  "fields": {
    "draft": false,
    "villages": ["dorool", "diona"],
    "description": "Updated SEO description"
  }
}
```

**Important:** Preserves existing frontmatter fields not specified in `fields` parameter. Only updates/adds specified keys.

---

#### `list-content`

**Description:** List Hugo content items (posts, team members, galleries, villages)

**Parameters:**

- `contentType` (enum, required): Type of content to list
  - Valid values: `posts`, `equipe`, `galleries`, `villages`, `documents`
- `year` (string, optional): Filter posts by year (e.g., `2025`)
- `village` (string, optional): Filter posts by village (lowercase)
- `limit` (number, optional, default: `20`): Max results

**Output:**

- List of content items with metadata (title, date, path, frontmatter)
- Sorted by date (newest first) for posts
- Filtered by year/village if specified

**Example:**

```javascript
{
  "contentType": "posts",
  "year": "2025",
  "limit": 10
}
```

---

#### `search-content`

**Description:** Full-text search across all Hugo content files

**Parameters:**

- `query` (string, required): Search query (matches title, body, frontmatter)
- `contentType` (enum, optional, default: `all`): Limit search to specific content type
  - Valid values: `all`, `posts`, `equipe`, `galleries`, `villages`

**Output:**

- List of matching content items
- Match context (snippet showing where query was found)
- Match count and relevance

**Use cases:**

- Finding posts about specific topics
- Searching for content mentioning villages
- Discovering related content

---

### Quality Assurance Tools

#### `validate-content`

**Description:** Validate Hugo content files for common issues

**Parameters:**

- `path` (string, optional): Specific file or folder to validate (relative to `content/`). Defaults to all content.

**Output:**

- List of validation errors and warnings:
  - **Taxonomy casing errors** (e.g., `villages: ["Dorool"]` should be `["dorool"]`)
  - **Missing required frontmatter** (title, date, type)
  - **Invalid village names** (not in allowed list)
  - **Invalid mood values** (not in allowed enum)
  - **Broken image paths** (image field references non-existent file)
  - **Posts without descriptions** (bad for SEO)
  - **Posts without villages** (unlinked to geography)

**Example validation errors:**

```
❌ posts/2025/my-article.md
   - Village 'Dorool' should be lowercase: 'dorool'
   - Missing description field (bad for SEO)
   - Image not found: /images/uploads/missing.jpg

⚠️  posts/2024/old-post.md
   - No villages specified (consider adding geographic context)
```

**Use cases:**

- Pre-deployment validation
- Content audit before major releases
- Finding outdated or incomplete content

---

### Build & Development Tools

#### `build-site`

**Description:** Build the Leidimen Hugo site (production or draft mode)

**Parameters:**

- `includeDrafts` (boolean, optional, default: `false`): Include draft content in the build
- `minify` (boolean, optional, default: `true`): Minify output (HTML, CSS)

**Output:**

- Builds site to `public/` directory
- Returns build summary (files generated, processing time, errors)

**Example:**

```javascript
{
  "includeDrafts": true,
  "minify": false
}
```

**Use cases:**

- Production builds for deployment
- Draft previews for content review
- Build testing after major changes

---

#### `serve-site`

**Description:** Start the Hugo development server

**Parameters:**

- `port` (number, optional, default: `1313`): Port number
- `openBrowser` (boolean, optional, default: `false`): Auto-open browser

**Output:**

- Starts Hugo server (background process)
- Returns server URL and status

**Important:** This starts a long-running process. Use Ctrl+C to stop the server.

**Use cases:**

- Local development and live-reload
- Content preview during editing
- Testing before deployment

---

## Resources Reference

Resources provide read-only access to site configuration and data. MCP clients can fetch these to provide context to AI assistants.

### `hugo://config`

**Name:** `site-config`

**Description:** Site configuration (hugo.toml)

**Content:**

- Full `hugo.toml` contents
- MIME type: `application/toml`

**Use cases:**

- Understanding site settings
- Checking taxonomy configuration
- Verifying baseURL and permalinks

---

### `hugo://data/villages`

**Name:** `villages-data`

**Description:** Village data from `data/villages/mali_villages.yaml`

**Content:**

- List of all villages with:
  - Name, type (village/city)
  - Coordinates (latitude, longitude)
  - Population
  - Projects list
  - Description
- MIME type: `text/plain` (formatted summary)

**Example output:**

```
# Leidimen Villages (10 total)

🏘️ Douentza (city) — pop. 35000
   📍 15.0167, -2.9500
   📋 Projects: marché, centre de santé
   📝 Chef-lieu de cercle

🏘️ Dorool (village) — pop. 1200
   📍 14.9833, -3.0167
   📋 Projects: école primaire, puits
   📝 Village historique...
```

**Use cases:**

- Creating posts with village context
- Generating maps
- Displaying village statistics

---

### `hugo://taxonomies`

**Name:** `taxonomies`

**Description:** Available taxonomies and their valid values

**Content:**

- List of all taxonomies:
  - `villages`: Valid village names (lowercase)
  - `categories`: Standard categories
  - `moods`: Emotional tone values
  - `tags`: Free-form (any string)
- MIME type: `application/json`

**Example output:**

```json
{
  "villages": ["douentza", "dorool", "diona", "debere", ...],
  "categories": ["Éducation", "Santé", "Infrastructure", "informations"],
  "moods": ["heureux", "triste", "inspire", "motive", "reconnaissant"],
  "tags": "Free-form (any string)"
}
```

**Use cases:**

- Validating frontmatter before content creation
- Providing autocomplete suggestions
- Checking taxonomy consistency

---

### `hugo://admin/config`

**Name:** `cms-config`

**Description:** Netlify CMS configuration (`static/admin/config.yml`)

**Content:**

- Full Netlify CMS config
- Collection definitions
- Field schemas
- MIME type: `text/yaml`

**Use cases:**

- Understanding CMS field structure
- Syncing MCP tools with CMS configuration
- Debugging CMS issues

---

### `hugo://shortcodes`

**Name:** `shortcodes`

**Description:** Available Hugo shortcodes

**Content:**

- List of all shortcodes in `layouts/shortcodes/`
- First line of each shortcode file (usually a comment explaining usage)
- MIME type: `text/plain`

**Example output:**

```
# Available Shortcodes

{{< gallery >}} — Auto photo gallery from page resources (auto-loads PhotoSwipe)
{{< gallery-pro >}} — Professional gallery with advanced options
{{< image >}} — Responsive image with lazy loading
{{< divider >}} — Horizontal separator
{{< details >}} — Collapsible content
{{< typeit >}} — Typing animation
```

**Use cases:**

- Discovering available shortcodes
- Understanding shortcode syntax
- Generating content with proper shortcode usage

---

### `hugo://stats`

**Name:** `site-stats`

**Description:** Content statistics and overview

**Content:**

- Total counts by content type (posts, team, galleries, villages)
- Posts broken down by year
- MIME type: `application/json`

**Example output:**

```json
{
  "totalPosts": 127,
  "totalTeamMembers": 8,
  "totalGalleries": 15,
  "totalVillages": 10,
  "postsByYear": {
    "2024": 42,
    "2025": 85
  }
}
```

**Use cases:**

- Site audit and reporting
- Understanding content distribution
- Planning content strategy

---

## Prompts Reference

Prompts provide guided workflows for common tasks. MCP clients can surface these as quick actions.

### `new-post`

**Description:** Guide for creating a new Leidimen blog post

**Parameters:**

- `topic` (string, required): What the post is about
- `village` (string, optional): Which village(s) it relates to

**Output:**

- Pre-filled prompt with:
  - Content creation guidelines
  - Leidimen-specific conventions (French language, lowercase villages, etc.)
  - Current date for frontmatter
  - Year-based directory path
- Instructs AI to use `create-post` tool

**Use cases:**

- Quick post creation with proper context
- Onboarding new content creators
- Ensuring consistent post structure

---

### `new-gallery`

**Description:** Guide for creating a photo gallery

**Parameters:**

- `title` (string, required): Gallery title

**Output:**

- Pre-filled prompt with:
  - Gallery creation instructions
  - PhotoSwipe integration requirements (page resources, no duplicate loading)
  - Supported image formats

**Use cases:**

- Creating photo galleries correctly
- Avoiding common gallery mistakes (wrong image paths, duplicate PhotoSwipe)

---

### `content-audit`

**Description:** Run a full content audit on the Leidimen site

**Parameters:** None

**Output:**

- Multi-step audit workflow:
  1. Validate all content for errors
  2. List all posts
  3. Check site statistics
  4. Review village data completeness
- Report with:
  - Total content count by type
  - Validation errors
  - SEO issues (missing descriptions)
  - Geographic gaps (posts without villages)
  - Content distribution by year

**Use cases:**

- Pre-deployment quality checks
- Quarterly content audits
- Identifying content gaps

---

## MCP Client Setup

### Claude Desktop Configuration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%/Claude/claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "leidimen-hugo": {
      "command": "node",
      "args": ["/path/to/leidimen/hugo-mcp-server/src/index.js"],
      "env": {
        "HUGO_ROOT": "/path/to/leidimen"
      }
    }
  }
}
```

**Restart Claude Desktop** to load the server.

---

### Cline Configuration

Add to `.vscode/settings.json` in your workspace:

```json
{
  "cline.mcpServers": {
    "leidimen-hugo": {
      "command": "node",
      "args": ["${workspaceFolder}/hugo-mcp-server/src/index.js"],
      "env": {
        "HUGO_ROOT": "${workspaceFolder}"
      }
    }
  }
}
```

**Reload VS Code** to activate the server.

---

### Other MCP Clients

For any MCP-compatible client that supports stdio transport:

**Command:**

```bash
node /path/to/leidimen/hugo-mcp-server/src/index.js
```

**Environment:**

```bash
HUGO_ROOT=/path/to/leidimen
```

**Transport:** stdio (standard input/output)

---

## Development

### Running Locally

```bash
# Standard mode (stdio transport)
npm start

# Development mode (auto-restart on file changes)
npm run dev

# Inspector mode (web UI for testing)
npm run inspect
```

**Inspector URL:** http://localhost:5173 (opens automatically)

The MCP Inspector provides a web UI to:

- Test tools with sample inputs
- View resource contents
- Execute prompts
- Debug server responses

---

### Project Structure

```
hugo-mcp-server/
├── src/
│   ├── index.js              # Main server entry point
│   ├── tools/
│   │   ├── index.js          # Tool registration
│   │   ├── create-post.js    # Post creation implementation
│   │   ├── create-team-member.js
│   │   ├── create-gallery.js
│   │   ├── build-site.js
│   │   ├── serve-site.js
│   │   ├── list-content.js
│   │   ├── search-content.js
│   │   ├── get-post-content.js
│   │   ├── update-frontmatter.js
│   │   └── validate-content.js
│   ├── resources/
│   │   └── index.js          # Resource registration
│   └── prompts/
│       └── index.js          # Prompt registration
├── package.json
└── README.md
```

---

### Adding New Tools

1. **Create tool implementation:**

   ```javascript
   // src/tools/my-tool.js
   import fs from "fs/promises";

   export async function myTool(hugoRoot, params) {
     // Implementation
     return {
       content: [
         {
           type: "text",
           text: "Tool output",
         },
       ],
     };
   }
   ```

2. **Register tool in `src/tools/index.js`:**

   ```javascript
   import { z } from "zod";
   import { myTool } from "./my-tool.js";

   export function registerTools(server, hugoRoot) {
     // ... existing tools

     server.tool(
       "my-tool",
       "Description of what this tool does",
       {
         param1: z.string().describe("Parameter description"),
         param2: z.number().optional().describe("Optional parameter"),
       },
       async (params) => myTool(hugoRoot, params)
     );
   }
   ```

3. **Test with inspector:**
   ```bash
   npm run inspect
   ```

---

### Adding New Resources

1. **Add resource in `src/resources/index.js`:**

   ```javascript
   export function registerResources(server, hugoRoot) {
     // ... existing resources

     server.resource(
       "my-resource",
       "hugo://my-data",
       async (uri) => {
         const data = await loadMyData(hugoRoot);
         return {
           contents: [
             {
               uri: uri.href,
               mimeType: "application/json",
               text: JSON.stringify(data, null, 2),
             },
           ],
         };
       }
     );
   }
   ```

2. **Test with inspector:**
   ```bash
   npm run inspect
   # Navigate to Resources tab
   ```

---

## Architecture

### MCP Protocol Overview

The server implements the [Model Context Protocol](https://modelcontextprotocol.io/) specification:

- **Transport:** stdio (standard input/output)
- **Format:** JSON-RPC 2.0 messages
- **Capabilities:**
  - Tools (functions AI can call)
  - Resources (read-only data sources)
  - Prompts (guided workflows)

### Design Principles

1. **Type Safety:** All tool parameters use Zod schemas for runtime validation
2. **Hugo Conventions:** Tools enforce Leidimen-specific patterns (year-based posts, lowercase taxonomies, etc.)
3. **Single Source of Truth:** Village data comes from `data/villages/mali_villages.yaml`
4. **Fail-Fast Validation:** Tools check for common errors before file creation
5. **Idempotency:** Tools check for existing files and prevent accidental overwrites

### Integration Points

The MCP server integrates with:

- **Hugo CLI:** Tools call `hugo` commands for build/serve operations
- **File System:** Direct read/write for content creation (faster than Hugo CLI)
- **gray-matter:** Frontmatter parsing (YAML ↔ JavaScript object)
- **glob:** Content discovery and listing
- **Hugo Data Files:** Village coordinates, settings

---

## Use Cases

### 1. AI-Assisted Content Creation

**Scenario:** Content editor wants to create a blog post about a new school in Dorool.

**Workflow:**

```
User: "Create a post about the new school in Dorool"

AI (using MCP server):
1. Fetches hugo://taxonomies resource (knows valid villages)
2. Calls create-post tool with:
   - title: "Nouvelle école à Dorool"
   - villages: ["dorool"]
   - categories: ["Éducation"]
   - Auto-generated slug and date
3. Returns file path and preview URL

Result: Post created at content/posts/2025/nouvelle-ecole-a-dorool.md
```

---

### 2. Content Audit & Quality Control

**Scenario:** Site maintainer wants to check for content issues before deployment.

**Workflow:**

```
User: "Audit the site for content issues"

AI (using MCP server):
1. Runs content-audit prompt
2. Calls validate-content tool (all content)
3. Calls hugo://stats resource (overview)
4. Reports:
   - 3 posts with uppercase villages (taxonomy errors)
   - 12 posts without descriptions (SEO issues)
   - 8 posts without village tags (geographic gaps)
   - Content distribution: 85% in 2025, 15% in 2024

Result: Detailed audit report with actionable fixes
```

---

### 3. Bulk Content Updates

**Scenario:** Need to add a missing description field to all 2024 posts.

**Workflow:**

```
User: "Add descriptions to all 2024 posts without them"

AI (using MCP server):
1. Calls list-content (posts, year: 2024)
2. For each post:
   - Calls get-post-content (read current content)
   - Checks if description field exists
   - Generates SEO description from body
   - Calls update-frontmatter (add description)
3. Reports updates made

Result: 42 posts updated with auto-generated descriptions
```

---

### 4. Data-Driven Content

**Scenario:** Create a post listing all villages with schools.

**Workflow:**

```
User: "Create a post about villages with schools"

AI (using MCP server):
1. Fetches hugo://data/villages resource
2. Filters villages with "école" in projects
3. Calls create-post with:
   - Content generated from village data
   - Villages list includes all mentioned villages
   - Categories: ["Éducation"]

Result: Post with accurate village data and map integration
```

---

## Troubleshooting

### Common Issues

#### Server Not Starting

**Symptom:** `npm start` fails with module errors

**Solutions:**

1. Check Node.js version: `node --version` (needs 18+)
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Verify ES modules support: `package.json` must have `"type": "module"`

---

#### HUGO_ROOT Not Found

**Symptom:** Tools fail with "directory not found" errors

**Solutions:**

1. Set `HUGO_ROOT` environment variable in MCP client config
2. Or update default in `src/index.js` line 11
3. Verify path exists: `ls $HUGO_ROOT/hugo.toml`

---

#### Taxonomy Validation Errors

**Symptom:** `create-post` fails with "invalid village name"

**Solutions:**

1. Check valid villages in `hugo://taxonomies` resource
2. Ensure lowercase: `dorool` not `Dorool`
3. Verify village exists in `data/villages/mali_villages.yaml`

---

#### Image Path Issues

**Symptom:** Gallery images not showing

**Solutions:**

1. Verify images are page resources (same folder as `index.md`)
2. Not in `static/images/` (those aren't page resources)
3. Use `isBundle: true` when creating gallery posts
4. Place images in `content/posts/{year}/{slug}/` directory

---

### Debug Mode

Enable verbose logging:

```javascript
// src/index.js (add after imports)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});

// Add debug logging to tools
console.error("DEBUG:", JSON.stringify(params, null, 2));
```

**View logs:**

- Claude Desktop: Check console output in app logs
- Cline: VS Code Developer Tools Console
- Terminal: stderr output from `npm start`

---

## Roadmap

### Planned Features

- [ ] **Image upload tool** - Upload images directly via MCP
- [ ] **Translation support** - Multi-language content creation
- [ ] **Git integration** - Commit and push from MCP tools
- [ ] **SEO analyzer** - Advanced SEO scoring and recommendations
- [ ] **Content scheduler** - Schedule posts for future publication
- [ ] **Batch operations** - Bulk update multiple posts at once
- [ ] **Template system** - Pre-defined post templates for common content types

---

## Contributing

### Guidelines

1. **Follow existing patterns** - Tools use consistent structure
2. **Validate all inputs** - Use Zod schemas for type safety
3. **Return structured output** - Use MCP content format
4. **Add tests** - Test tools with inspector before committing
5. **Update docs** - Add new tools/resources to this README

### Testing Checklist

Before submitting changes:

- [ ] Tools work in MCP inspector
- [ ] Zod schemas validate correctly
- [ ] Error messages are helpful
- [ ] File paths are relative to `hugoRoot`
- [ ] Resources return valid MIME types
- [ ] Documentation updated

---

## License

MIT License - see parent project for details.

---

## Support

**Issues:** Report bugs via GitHub issues in the main Leidimen repository

**Documentation:** See parent project's `QUICK_REFERENCE.md`, `CONTENT_CREATION_GUIDE.md`, and `.github/copilot-instructions.md`

**MCP Protocol:** https://modelcontextprotocol.io/

---

## Credits

Developed for the Leidimen association (https://leidimen.org) - Supporting solidarity projects in the Douentza region of Mali.

**Built with:**

- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/sdk) - MCP implementation
- [Hugo](https://gohugo.io/) - Static site generator
- [Zod](https://zod.dev/) - Schema validation
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
