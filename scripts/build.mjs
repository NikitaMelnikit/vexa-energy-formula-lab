import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDirectory = join(projectRoot, "dist");
const vinextCli = join(projectRoot, "node_modules", "vinext", "dist", "cli.js");

rmSync(distDirectory, { recursive: true, force: true });

const build = spawnSync(process.execPath, [vinextCli, "build"], {
  cwd: projectRoot,
  env: process.env,
  stdio: "inherit",
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const manifestDirectory = join(distDirectory, ".openai");
mkdirSync(manifestDirectory, { recursive: true });
copyFileSync(
  join(projectRoot, ".openai", "hosting.json"),
  join(manifestDirectory, "hosting.json"),
);

console.log("Sites artifact ready: dist/server/index.js + dist/.openai/hosting.json");
