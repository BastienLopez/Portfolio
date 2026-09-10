import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(rootDirectory, "src", "lib", "image-variants.ts");
const assetsDirectory = path.join(rootDirectory, "public", "img_optimized");
const failures = [];

if (!existsSync(manifestPath)) failures.push("Missing src/lib/image-variants.ts.");
if (!existsSync(assetsDirectory)) failures.push("Missing public/img_optimized/.");

const source = existsSync(manifestPath) ? readFileSync(manifestPath, "utf8") : "";
const referencedNames = [...source.matchAll(/path:\s*["']\/img_optimized\/([^"']+)["']/g)].map((match) => match[1]);
const uniqueReferencedNames = new Set(referencedNames);

if (referencedNames.length === 0) failures.push("The image manifest contains no optimized image paths.");
if (uniqueReferencedNames.size !== referencedNames.length) failures.push("The image manifest contains duplicate optimized image paths.");

for (const name of uniqueReferencedNames) {
  const assetPath = path.join(assetsDirectory, name);
  if (!existsSync(assetPath)) failures.push(`Missing optimized image: public/img_optimized/${name}`);
}

const actualNames = existsSync(assetsDirectory)
  ? readdirSync(assetsDirectory).filter((name) => name.endsWith(".webp"))
  : [];
const referencedSet = new Set(uniqueReferencedNames);
for (const name of actualNames) {
  if (!referencedSet.has(name)) failures.push(`Unreferenced optimized image: public/img_optimized/${name}`);
}

if (failures.length > 0) {
  console.error("Responsive image verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Responsive image verification passed: ${actualNames.length} WebP files are referenced by the manifest.`);
}
