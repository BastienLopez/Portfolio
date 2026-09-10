import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(rootDirectory, "src", "data", "articles");
const translationDirectory = path.join(sourceDirectory, "en");
const categories = ["architecture", "culture", "devops", "freelance", "tools"];
const failures = [];
const sourceIds = new Map();
const idPattern = /\bid:\s*["']([^"']+)["']/g;

for (const category of categories) {
  const sourcePath = path.join(sourceDirectory, `${category}.ts`);
  if (!existsSync(sourcePath)) {
    failures.push(`Missing source article file: src/data/articles/${category}.ts`);
    continue;
  }

  const source = readFileSync(sourcePath, "utf8");
  for (const match of source.matchAll(idPattern)) {
    const id = match[1];
    if (sourceIds.has(id)) {
      failures.push(`Duplicate source article id: ${id}`);
    }
    sourceIds.set(id, category);
  }
}

const translatedIds = new Map();
for (const category of categories) {
  const translationPath = path.join(translationDirectory, `${category}.json`);
  if (!existsSync(translationPath)) {
    failures.push(`Missing English translation file: src/data/articles/en/${category}.json`);
    continue;
  }

  let entries;
  try {
    entries = JSON.parse(readFileSync(translationPath, "utf8"));
  } catch (error) {
    failures.push(`Invalid JSON in src/data/articles/en/${category}.json: ${error.message}`);
    continue;
  }

  if (!Array.isArray(entries)) {
    failures.push(`Translation file is not an array: src/data/articles/en/${category}.json`);
    continue;
  }

  for (const entry of entries) {
    if (!entry || typeof entry !== "object") {
      failures.push(`Invalid translation entry in ${category}.json`);
      continue;
    }
    const { id, title, content } = entry;
    if (typeof id !== "string" || !id.trim()) failures.push(`Missing translation id in ${category}.json`);
    if (typeof title !== "string" || !title.trim()) failures.push(`Missing English title for ${id ?? "unknown"}`);
    if (typeof content !== "string" || !content.trim()) failures.push(`Missing English content for ${id ?? "unknown"}`);
    if (typeof id === "string") {
      if (translatedIds.has(id)) failures.push(`Duplicate translated article id: ${id}`);
      translatedIds.set(id, category);
    }
  }
}

for (const [id, category] of sourceIds) {
  if (!translatedIds.has(id)) failures.push(`Missing English translation for ${id} (${category})`);
}
for (const [id, category] of translatedIds) {
  if (!sourceIds.has(id)) failures.push(`Unknown translated article id: ${id} (${category})`);
}

if (sourceIds.size !== 60) failures.push(`Expected 60 source articles, found ${sourceIds.size}.`);
if (translatedIds.size !== sourceIds.size) {
  failures.push(`Expected ${sourceIds.size} translated articles, found ${translatedIds.size}.`);
}

if (failures.length > 0) {
  console.error("English article verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`English article verification passed: ${translatedIds.size} articles match the ${sourceIds.size} source ids.`);
}
