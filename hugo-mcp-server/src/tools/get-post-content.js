import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function getPostContent(hugoRoot, params) {
  const filePath = path.join(
    hugoRoot,
    "content",
    params.path
  );

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data: fm, content } = matter(raw);

    return {
      content: [
        {
          type: "text",
          text: `📄 ${params.path}\n\n**Frontmatter:**\n\`\`\`json\n${JSON.stringify(fm, null, 2)}\n\`\`\`\n\n**Content:**\n${content}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Could not read file: content/${params.path}\nError: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}