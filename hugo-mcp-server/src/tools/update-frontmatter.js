import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function updateFrontmatter(hugoRoot, params) {
  const filePath = path.join(
    hugoRoot,
    "content",
    params.path
  );

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data: fm, content } = matter(raw);

    const updatedFields = [];
    for (const [key, value] of Object.entries(
      params.fields
    )) {
      const oldValue = fm[key];
      fm[key] = value;
      updatedFields.push(
        `  ${key}: ${JSON.stringify(oldValue)} → ${JSON.stringify(value)}`
      );
    }

    // Reconstruct file with updated frontmatter
    const output = matter.stringify(content, fm);
    await fs.writeFile(filePath, output, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: `✅ Updated frontmatter in ${params.path}\n\nChanges:\n${updatedFields.join("\n")}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Failed to update: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}