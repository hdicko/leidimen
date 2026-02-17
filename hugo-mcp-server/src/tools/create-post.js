import fs from "fs/promises";
import path from "path";

export async function createPost(hugoRoot, params) {
  const date = params.date || new Date().toISOString().split("T")[0];
  const year = date.substring(0, 4);
  const slug = params.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  let filePath;
  let contentDir;

  if (params.isBundle) {
    contentDir = path.join(hugoRoot, "content", "posts", year, slug);
    filePath = path.join(contentDir, "index.md");
    await fs.mkdir(contentDir, { recursive: true });
  } else {
    contentDir = path.join(hugoRoot, "content", "posts", year);
    filePath = path.join(contentDir, `${slug}.md`);
    await fs.mkdir(contentDir, { recursive: true });
  }

  // Check if file already exists
  try {
    await fs.access(filePath);
    return {
      content: [
        {
          type: "text",
          text: `❌ File already exists: ${path.relative(hugoRoot, filePath)}\nUse a different title or delete the existing file first.`,
        },
      ],
    };
  } catch {
    // File doesn't exist — proceed
  }

  // Build YAML frontmatter
  const yamlLines = ["---"];
  yamlLines.push(`title: "${params.title}"`);
  yamlLines.push(`date: ${date}`);
  yamlLines.push(`type: "posts"`);
  yamlLines.push(`draft: ${params.draft ?? false}`);
  if (params.description)
    yamlLines.push(`description: "${params.description}"`);
  if (params.image) yamlLines.push(`image: "${params.image}"`);
  if (params.villages?.length) {
    yamlLines.push(`villages:`);
    params.villages.forEach((v) => yamlLines.push(`  - "${v}"`));
  }
  if (params.categories?.length) {
    yamlLines.push(`categories:`);
    params.categories.forEach((c) => yamlLines.push(`  - "${c}"`));
  }
  if (params.tags?.length) {
    yamlLines.push(`tags:`);
    params.tags.forEach((t) => yamlLines.push(`  - "${t}"`));
  }
  if (params.moods?.length) {
    yamlLines.push(`moods:`);
    params.moods.forEach((m) => yamlLines.push(`  - "${m}"`));
  }
  yamlLines.push("---");
  yamlLines.push("");

  const fileContent = yamlLines.join("\n") + params.body + "\n";
  await fs.writeFile(filePath, fileContent, "utf-8");

  const relativePath = path.relative(hugoRoot, filePath);
  return {
    content: [
      {
        type: "text",
        text: [
          `✅ Post created successfully!`,
          `📄 File: ${relativePath}`,
          `📅 Date: ${date}`,
          `🏷️ Villages: ${(params.villages || []).join(", ") || "none"}`,
          `📁 Type: ${params.isBundle ? "Page Bundle" : "Single File"}`,
        ].join("\n"),
      },
    ],
  };
}