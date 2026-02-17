#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerTools } from "./tools/index.js";
import { registerResources } from "./resources/index.js";
import { registerPrompts } from "./prompts/index.js";

const HUGO_ROOT =
  process.env.HUGO_ROOT ||
  "/home/dicko/dev/hugo/hugo_sites/leidimen";

const server = new McpServer({
  name: "hugo-mcp-server",
  version: "1.0.0",
  description: "MCP server for managing the Leidimen Hugo site",
});

// Register all capabilities
registerTools(server, HUGO_ROOT);
registerResources(server, HUGO_ROOT);
registerPrompts(server, HUGO_ROOT);

// Start server with stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Hugo MCP Server running on stdio");