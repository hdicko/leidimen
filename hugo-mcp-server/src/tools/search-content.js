import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { glob } from "glob";

export async function searchContent(hugoRoot, params) {
  const searchDir =
    params.contentType === "all"
      ? path.join(hugoRoot, "content")
      : path.join(hugoRoot, "content", params.contentType);

  const files = await glob(path.join(searchDir, "**/*.md"));
  const query = params.query.toLowerCase();
  const results = [];

  for (const file of files) {
    const basename = path.basename(file);
    if (basename === "_index.md") continue;

    try {
      const raw = await fs.readFile(file, "utf-8");
      const { data: fm, content } = matter(raw);

      const titleMatch = (fm.title || "")
        .toLowerCase()
        .includes(query);
      const bodyMatch = content
        .toLowerCase()
        .includes(query);
      const descMatch = (fm.description || "")
        .toLowerCase()
        .includes(query);
      const tagMatch = (fm.tags || []).some((t) =>
        t.toLowerCase().includes(query)
      );
      const villageMatch = (fm.villages || []).some((v) =>
        v.toLowerCase().includes(query)
      );

      if (
        titleMatch ||
        bodyMatch ||
        descMatch ||
        tagMatch ||
        villageMatch
      ) {
        const relativePath = path.relative(
          path.join(hugoRoot, "content"),
          file
        );

        // Extract snippet around match
        let snippet = "";
        if (bodyMatch) {
          const idx = content.toLowerCase().indexOf(query);
          const start = Math.max(0, idx - 60);
          const end = Math.min(
            content.length,
            idx + query.length + 60
          );
          snippet =
            "..." +
            content
              .substring(start, end)
              .replace(/\n/g, " ") +
            "...";
        }

        results.push({
          path: relativePath,
          title: fm.title || basename,
          date: fm.date
            ? String(fm.date).substring(0, 10)
            : "",
          matchIn: [
            titleMatch && "title",
            bodyMatch && "body",
            descMatch && "description",
            tagMatch && "tags",
            villageMatch && "villages",
          ].filter(Boolean),
          snippet,
        });
      }
    } catch {
      // skip
    }
  }

  results.sort((a, b) =>
    (b.date || "").localeCompare(a.date || "")
  );

  const formatted = results
    .map(
      (r) =>
        `📄 ${r.title} (${r.date})\n   Path: ${r.path}\n   Match: ${r.matchIn.join(", ")}${
          r.snippet ? `\n   "${r.snippet}"` : ""
        }`
    )
    .join("\n\n");

  return {
    content: [
      {
        type: "text",
        text: `🔍 Search: "${params.query}" — ${results.length} result(s)\n\n${
          formatted || "No matches found."
        }`,
      },
    ],
  };
}