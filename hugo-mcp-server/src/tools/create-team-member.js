import fs from "fs/promises";
import path from "path";

export async function createTeamMember(hugoRoot, params) {
  const slug = params.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const filePath = path.join(
    hugoRoot,
    "content",
    "equipe",
    `${slug}.md`
  );

  // Check if file exists
  try {
    await fs.access(filePath);
    return {
      content: [
        {
          type: "text",
          text: `❌ Team member file already exists: content/equipe/${slug}.md`,
        },
      ],
    };
  } catch {
    // OK — doesn't exist
  }

  const date = new Date().toISOString().split("T")[0];

  const lines = ["---"];
  lines.push(`title: "${params.name}"`);
  lines.push(`date: "${date}"`);
  lines.push(`draft: false`);
  lines.push(
    `description: "${params.presentation || ""}"`
  );
  lines.push(`slug: "${slug}"`);
  lines.push(`weight: 10`);
  lines.push(``);
  lines.push(`card:`);
  lines.push(
    `  image: "${params.image || "images/default-avatar.jpg"}"`
  );
  lines.push(`  fonction: "${params.fonction}"`);
  lines.push(`  membre: "${params.membre}"`);
  lines.push(
    `  presentation: "${params.presentation || ""}"`
  );
  lines.push(`  ville: "${params.ville || ""}"`);
  lines.push(`  pays: "${params.pays || "France"}"`);
  lines.push(`  email: "${params.email || ""}"`);
  if (params.devise)
    lines.push(`  devise: "${params.devise}"`);
  if (params.specialites?.length) {
    lines.push(`  specialites:`);
    params.specialites.forEach((s) =>
      lines.push(`    - "${s}"`)
    );
  }
  lines.push("---");
  lines.push("");
  lines.push(
    params.body ||
      `## ${params.name}\n\nBienvenue dans l'équipe Leidimen !`
  );
  lines.push("");

  await fs.writeFile(filePath, lines.join("\n"), "utf-8");

  return {
    content: [
      {
        type: "text",
        text: [
          `✅ Team member created!`,
          `👤 ${params.name}`,
          `💼 ${params.fonction} (${params.membre})`,
          `📄 content/equipe/${slug}.md`,
        ].join("\n"),
      },
    ],
  };
}