import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { glob } from "glob";

export async function listContent(hugoRoot, params) {
  const contentDir = path.join(hugoRoot, "content", params.contentType);

  let pattern;
  if (params.contentType === "posts" && params.year) {
    pattern = path.join(contentDir, params.year, "**/*.md");
  } else {
    pattern = path.join(contentDir, "**/*.md");
  }

  const files = await glob(pattern);
  const items = [];

  for (const file of files.slice(0, params.limit || 20)) {
    const basename = path.basename(file);
    if (basename === "_index.md") continue;

    try {
      const raw = await fs.readFile(file, "utf-8");
      const { data: fm } = matter(raw);

      const relativePath = path.relative(
        path.join(hugoRoot, "content"),
        file
      );

      // Filter by village if specified
      if (
        params.village &&
        fm.villages &&
        !fm.villages.includes(params.village)
      ) {
        continue;
      }

      items.push({
        path: relativePath,
        title: fm.title || basename,
        date: fm.date ? String(fm.date).substring(0, 10) : "",
        draft: fm.draft || false,
        villages: fm.villages || [],
        categories: fm.categories || [],
      });
    } catch {
      // Skip unparseable files
    }
  }

  // Sort by date descending
  items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const formatted = items
    .map(
      (item) =>
        `${item.draft ? "📝" : "✅"} [${item.date}] ${item.title}\n   📄 ${item.path}${
          item.villages.length
            ? "\n   🏘️ " + item.villages.join(", ")
            : ""
        }`
    )
    .join("\n\n");

  return {
    content: [
      {
        type: "text",
        text: `📋 ${params.contentType} (${items.length} items)${
          params.village ? ` — filtered by village: ${params.village}` : ""
        }${params.year ? ` — year: ${params.year}` : ""}\n\n${
          formatted || "No items found."
        }`,
      },
    ],
  };
}