/**
 * Create Gallery Tool
 * 
 * Creates a new photo gallery page bundle for the Leidimen site.
 * Uses Hugo's page bundle structure (folder with index.md) to keep
 * images as page resources alongside the gallery content.
 * 
 * Gallery Structure:
 * - Directory: content/galleries/slug/
 * - Index file: content/galleries/slug/index.md
 * - Images: Place .jpg/.png/.webp files in the same folder
 * 
 * The {{< gallery >}} shortcode:
 * - Auto-detects images from page resources
 * - Automatically loads PhotoSwipe lightbox library
 * - Generates responsive thumbnails using Hugo's image processing
 * 
 * Important:
 * - Images MUST be page resources (in bundle folder), not in static/
 * - Supported formats: .jpg, .jpeg, .png, .webp, .gif
 * - The gallery shortcode handles all image processing and display
 */

import fs from "fs/promises";
import path from "path";

/**
 * Create a new photo gallery page bundle
 * 
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Gallery parameters
 * @param {string} params.title - Gallery title
 * @param {string} params.slug - URL slug (e.g., 'soiree-2025')
 * @param {string} [params.description] - Gallery description
 * @param {string} [params.date] - Date (YYYY-MM-DD), defaults to today
 * @param {string[]} [params.villages] - Related villages
 * @returns {Object} MCP tool response with creation status
 */
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