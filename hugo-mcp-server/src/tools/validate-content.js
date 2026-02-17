import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { glob } from "glob";

const VALID_VILLAGES = [
  "douentza",
  "dorool",
  "diona",
  "debere",
  "diambana",
  "darawal",
  "tanal",
  "manko",
  "tacouti",
  "ndumpa",
];

const VALID_MOODS = [
  "heureux",
  "triste",
  "inspire",
  "motive",
  "reconnaissant",
];

export async function validateContent(hugoRoot, params) {
  const searchPath = params.path
    ? path.join(hugoRoot, "content", params.path)
    : path.join(hugoRoot, "content");

  let pattern;
  try {
    const stat = await fs.stat(searchPath);
    pattern = stat.isDirectory()
      ? path.join(searchPath, "**/*.md")
      : searchPath;
  } catch {
    return {
      content: [
        {
          type: "text",
          text: `❌ Path not found: ${searchPath}`,
        },
      ],
      isError: true,
    };
  }

  const files = await glob(pattern);
  const issues = [];

  for (const file of files) {
    const relativePath = path.relative(
      path.join(hugoRoot, "content"),
      file
    );
    const basename = path.basename(file);
    if (basename === "_index.md") continue;

    try {
      const raw = await fs.readFile(file, "utf-8");
      const { data: fm } = matter(raw);
      const fileIssues = [];

      // Check: title exists
      if (!fm.title) fileIssues.push("⚠️ Missing title");

      // Check: date exists
      if (!fm.date) fileIssues.push("⚠️ Missing date");

      // Check: villages are lowercase and valid
      if (fm.villages) {
        for (const v of fm.villages) {
          if (v !== v.toLowerCase()) {
            fileIssues.push(
              `❌ Village "${v}" must be lowercase → "${v.toLowerCase()}"`
            );
          }
          if (!VALID_VILLAGES.includes(v.toLowerCase())) {
            fileIssues.push(
              `❌ Unknown village: "${v}". Valid: ${VALID_VILLAGES.join(", ")}`
            );
          }
        }
      }

      // Check: moods are valid
      if (fm.moods) {
        for (const m of fm.moods) {
          if (!VALID_MOODS.includes(m)) {
            fileIssues.push(
              `❌ Unknown mood: "${m}". Valid: ${VALID_MOODS.join(", ")}`
            );
          }
        }
      }

      // Check: posts have type field
      if (
        relativePath.startsWith("posts/") &&
        fm.type !== "posts"
      ) {
        fileIssues.push(
          `⚠️ Missing or wrong type field. Should be type: "posts"`
        );
      }

      // Check: description length for SEO
      if (fm.description && fm.description.length > 160) {
        fileIssues.push(
          `⚠️ Description too long (${fm.description.length} chars, max 160 for SEO)`
        );
      }

      // Check: bundle posts use index.md
      if (
        relativePath.startsWith("posts/") &&
        basename !== "index.md"
      ) {
        const dir = path.dirname(file);
        try {
          const siblings = await fs.readdir(dir);
          const hasImages = siblings.some((f) =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
          );
          if (hasImages) {
            fileIssues.push(
              `❌ Images found in directory but file is not index.md. Rename to index.md for page bundle.`
            );
          }
        } catch {
          // skip readdir errors
        }
      }

      if (fileIssues.length > 0) {
        issues.push(
          `📄 ${relativePath}\n${fileIssues.map((i) => `   ${i}`).join("\n")}`
        );
      }
    } catch (e) {
      issues.push(
        `📄 ${relativePath}\n   ❌ Failed to parse: ${e.message}`
      );
    }
  }

  const totalFiles = files.filter(
    (f) => path.basename(f) !== "_index.md"
  ).length;

  return {
    content: [
      {
        type: "text",
        text:
          issues.length === 0
            ? `✅ All ${totalFiles} content files validated — no issues found!`
            : `🔍 Validated ${totalFiles} files — ${issues.length} file(s) with issues:\n\n${issues.join("\n\n")}`,
      },
    ],
  };
}