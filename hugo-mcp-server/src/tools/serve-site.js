import { spawn } from "child_process";
import path from "path";

let serverProcess = null;

export async function serveSite(hugoRoot, params) {
  // If already running, stop it
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
    return {
      content: [{ type: "text", text: "🛑 Hugo dev server stopped." }],
    };
  }

  const hugoBin = path.join(
    hugoRoot,
    "node_modules",
    ".bin",
    "hugo",
    "hugo"
  );

  const port = params.port || 1313;

  const args = [
    "server",
    "--disableFastRender",
    "--gc",
    "--baseURL",
    `http://localhost:${port}/leidimen/`,
    "--port",
    String(port),
    "--appendPort=false",
  ];

  serverProcess = spawn(hugoBin, args, {
    cwd: hugoRoot,
    stdio: ["ignore", "pipe", "pipe"],
  });

  // Clean up on exit
  serverProcess.on("close", () => {
    serverProcess = null;
  });

  return new Promise((resolve) => {
    let output = "";

    const onData = (data) => {
      output += data.toString();
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

    serverProcess.stdout.on("data", onData);
    serverProcess.stderr.on("data", onData);

    // Timeout after 15s
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