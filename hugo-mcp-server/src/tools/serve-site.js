/**
 * Serve Site Tool
 * 
 * Starts Hugo's development server for local testing and content editing.
 * The server provides live reload functionality and serves the site at
 * http://localhost:PORT/leidimen/ with the Netlify CMS at /admin/.
 * 
 * Features:
 * - Live reload on file changes
 * - Disable fast render for accurate rebuilds
 * - Configurable port (default: 1313)
 * - Singleton pattern: only one server runs at a time
 * - Call again to stop the running server
 * 
 * URLs:
 * - Site: http://localhost:PORT/leidimen/
 * - CMS: http://localhost:PORT/leidimen/admin/
 */

import { spawn } from "child_process";
import path from "path";

// Track the running server process (singleton pattern)
let serverProcess = null;

/**
 * Start or stop the Hugo development server
 * 
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Server parameters
 * @param {number} [params.port=1313] - Port number for the server
 * @param {boolean} [params.openBrowser=false] - Auto-open browser (not implemented)
 * @returns {Promise<Object>} MCP tool response with server status
 */
export async function serveSite(hugoRoot, params) {
  // Singleton pattern: stop existing server if running
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
    return {
      content: [{ type: "text", text: "🛑 Hugo dev server stopped." }],
    };
  }

  // Path to Hugo binary from hugo-installer package
  const hugoBin = path.join(
    hugoRoot,
    "node_modules",
    ".bin",
    "hugo",
    "hugo"
  );

  const port = params.port || 1313;

  // Server command arguments
  const args = [
    "server",                                     // Start dev server
    "--disableFastRender",                       // Force full rebuilds (more accurate)
    "--gc",                                       // Garbage collect
    "--baseURL",                                  // Override baseURL for local dev
    `http://localhost:${port}/leidimen/`,
    "--port",
    String(port),
    "--appendPort=false",                         // Don't append port to URLs
  ];

  // Spawn Hugo server process in the background
  serverProcess = spawn(hugoBin, args, {
    cwd: hugoRoot,
    stdio: ["ignore", "pipe", "pipe"], // Ignore stdin, pipe stdout/stderr
  });

  // Clean up process reference when server exits
  serverProcess.on("close", () => {
    serverProcess = null;
  });

  // Wait for server to start and capture output
  return new Promise((resolve) => {
    let output = "";

    // Monitor server output for "ready" message
    const onData = (data) => {
      output += data.toString();
      // Hugo prints this when server is ready
      if (output.includes("Web Server is available")) {
        resolve({
          content: [
            {
              type: "text",
              text: [
                `🚀 Hugo dev server running!`,
                `🌐 URL: http://localhost:${port}/leidimen/`,
                `📝 CMS: http://localhost:${port}/leidimen/admin/`,
                ``,
                `Call serve-site again to stop the server.`,
              ].join("\n"),
            },
          ],
        });
      }
    };

    // Listen to both stdout and stderr (Hugo uses stderr for logs)
    serverProcess.stdout.on("data", onData);
    serverProcess.stderr.on("data", onData);

    // Timeout fallback if "ready" message not detected
    setTimeout(() => {
      resolve({
        content: [
          {
            type: "text",
            text: `⏳ Hugo server started (may still be building).\nCheck http://localhost:${port}/leidimen/\n\nOutput so far:\n${output}`,
          },
        ],
      });
    }, 15000);
  });
}