import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

const copyTargets = [
  { source: path.join(projectRoot, "assets"), destination: path.join(distDir, "assets") },
  { source: path.join(projectRoot, "legacy-static"), destination: path.join(distDir, "legacy-static") },
];

if (!existsSync(distDir)) {
  throw new Error(`Build output not found: ${distDir}`);
}

for (const { source, destination } of copyTargets) {
  if (!existsSync(source)) {
    continue;
  }

  rmSync(destination, { force: true, recursive: true });
  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
}
