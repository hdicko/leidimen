#!/usr/bin/env node

/**
 * Hugo MCP Server - Main Entry Point
 *
 * This is a Model Context Protocol (MCP) server for managing the Leidimen Hugo site.
 * It provides tools, resources, and prompts for content creation, site building,
 * and content validation.
 *
 * Architecture:
 * - Tools: Executable operations (create posts, build site, validate content)
 * - Resources: Read-only data access (site config, village data, statistics)
 * - Prompts: Pre-configured interaction templates for common tasks
 *
 * @see https://modelcontextprotocol.io/
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerTools } from './tools/index.js';
import { registerResources } from './resources/index.js';
import { registerPrompts } from './prompts/index.js';

// Hugo site root directory - can be overridden via HUGO_ROOT environment variable
const HUGO_ROOT = process.env.HUGO_ROOT || '/home/dicko/dev/hugo/hugo_sites/leidimen';

// Initialize MCP server with metadata
const server = new McpServer({
	name: 'hugo-mcp-server',
	version: '1.0.0',
	description: 'MCP server for managing the Leidimen Hugo site',
});

// Register all capabilities with the server
// These provide the core functionality for Hugo site management
registerTools(server, HUGO_ROOT);
registerResources(server, HUGO_ROOT);
registerPrompts(server, HUGO_ROOT);

// Start server with stdio transport for communication
// The server communicates via standard input/output
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Hugo MCP Server running on stdio');
