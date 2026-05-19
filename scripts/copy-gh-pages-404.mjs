import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist");
const indexFile = resolve(distDir, "index.html");
const notFoundFile = resolve(distDir, "404.html");

if (!existsSync(indexFile)) {
  throw new Error("Cannot create GitHub Pages fallback: dist/index.html not found.");
}

copyFileSync(indexFile, notFoundFile);
