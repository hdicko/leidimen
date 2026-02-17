/**
 * Create Team Member Tool
 * 
 * Creates a new team member profile for the Leidimen équipe (team) section.
 * Generates a properly structured file with card frontmatter for the team page.
 * 
 * File Structure:
 * - Location: content/equipe/firstname-lastname.md
 * - Frontmatter includes: card data, experience, skills, social links
 * - Body: Full biography in Markdown
 * 
 * Team Member Types:
 * - fondateur: Founding member
 * - bureau: Board member (CA - Conseil d'Administration)
 * - adherent: Regular member
 * - bienfaiteur: Benefactor/supporter
 * 
 * The card object is used to render member cards on the team page:
 * - image: Profile photo path
 * - fonction: Role/title
 * - membre: Member type
 * - presentation: Short bio
 * - social: Array of social links (email, linkedin, etc.)
 */

import fs from "fs/promises";
import path from "path";

/**
 * Create a new team member profile
 * 
 * @param {string} hugoRoot - Root directory of the Hugo site
 * @param {Object} params - Team member parameters
 * @param {string} params.name - Full name
 * @param {string} params.fonction - Role/title (e.g., "Président", "Trésorier")
 * @param {string} params.membre - Member type (fondateur/bureau/adherent/bienfaiteur)
 * @param {string} [params.image] - Profile photo path
 * @param {string} [params.ville] - City
 * @param {string} [params.pays="France"] - Country
 * @param {string} [params.email] - Email address
 * @param {string} [params.devise] - Personal motto
 * @param {string[]} [params.specialites] - Skills/specialties
 * @param {string} [params.presentation] - Short bio
 * @param {string} [params.body] - Full biography in Markdown
 * @returns {Object} MCP tool response with creation status
 */
export async function createTeamMember(hugoRoot, params) {
  // Generate URL-friendly slug from name
  const slug = params.name
    .toLowerCase()
    .normalize("NFD")                  // Decompose Unicode
    .replace(/[\u0300-\u036f]/g, "")  // Remove accents
    .replace(/[^a-z0-9]+/g, "-")      // Replace non-alphanumeric with hyphens
    .replace(/^-|-$/g, "");            // Remove leading/trailing hyphens

  const filePath = path.join(
    hugoRoot,
    "content",
    "equipe",  // French for "team"
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