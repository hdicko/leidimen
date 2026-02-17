import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

export async function buildSite(hugoRoot, params) {
  const hugoBin = path.join(
    hugoRoot,
    "node_modules",
    ".bin",
    "hugo",
    "hugo"
  );

  const args = ["--gc", "--cleanDestinationDir"];
  if (params.minify) args.push("--minify");
  if (params.includeDrafts) args.push("--buildDrafts");

  try {
    const { stdout, stderr } = await execAsync(
      `${hugoBin} ${args.join(" ")}`,
      {
        cwd: hugoRoot,
        timeout: 60000,
      }
    );

    return {
      content: [
        {
          type: "text",
          text: `✅ Hugo build completed!\n\n${stdout}${stderr ? `\n⚠️ Warnings:\n${stderr}` : ""}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: [
            `❌ Build failed!`,
            ``,
            error.stderr || error.message,
            ``,
            `Common fixes:`,
            `- Run \`npm install\` to install Hugo binary`,
            `- Check content files for syntax errors`,
            `- Verify SCSS compilation (Dart Sass required)`,
          ].join("\n"),
        },
      ],
      isError: true,
    };
  }
}