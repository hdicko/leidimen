import fs from "fs/promises";
import path from "path";

export async function createGallery(hugoRoot, params) {
  const galleryDir = path.join(
    hugoRoot,
    "content",
    "galleries",
    params.slug
  );
  const filePath = path.join(galleryDir, "index.md");

  try {
    await fs.access(galleryDir);
    return {
      content: [
        {
          type: "text",
          text: `❌ Gallery directory already exists: content/galleries/${params.slug}/\nAdd images to the existing gallery or choose a different slug.`,
        },
      ],
    };
  } catch {
    // OK
  }

  await fs.mkdir(galleryDir, { recursive: true });

  const date =
    params.date || new Date().toISOString().split("T")[0];

  const lines = ["---"];
  lines.push(`title: "${params.title}"`);
  lines.push(`date: ${date}`);
  lines.push(`type: "galleries"`);
  lines.push(`draft: false`);
  if (params.description)
    lines.push(`description: "${params.description}"`);
  if (params.villages?.length) {
    lines.push(`villages:`);
    params.villages.forEach((v) =>
      lines.push(`  - "${v}"`)
    );
  }
  lines.push("---");
  lines.push("");
  lines.push("{{< gallery >}}");
  lines.push("");
  lines.push("<!--");
  lines.push(
    "  Add images to this folder (content/galleries/" +
      params.slug +
      "/)"
  );
  lines.push(
    "  Supported formats: .jpg, .jpeg, .png, .webp"
  );
  lines.push(
    "  The gallery shortcode will auto-detect page resources."
  );
  lines.push("-->");
  lines.push("");

  await fs.writeFile(
    filePath,
    lines.join("\n"),
    "utf-8"
  );

  return {
    content: [
      {
        type: "text",
        text: [
          `✅ Gallery created!`,
          `📸 ${params.title}`,
          `📁 content/galleries/${params.slug}/`,
          `📝 content/galleries/${params.slug}/index.md`,
          ``,
          `📌 Next step: Add .jpg/.png/.webp images to the gallery folder.`,
          `The {{< gallery >}} shortcode will auto-detect them.`,
        ].join("\n"),
      },
    ],
  };
}