import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const workspace = await readFile(resolve(root, "pnpm-workspace.yaml"), "utf8");
let lockfile;
try {
  lockfile = await readFile(resolve(root, "pnpm-lock.yaml"), "utf8");
} catch (error) {
  if (error?.code === "ENOENT") {
    throw new Error("Release blocked: pnpm-lock.yaml is absent.");
  }
  throw error;
}
assert(
  !/(?:^|\s)(?:link|file|workspace):|^\s*overrides\s*:/im.test(`${workspace}\n${lockfile}`),
  "Release blocked: local dependency links or workspace overrides remain.",
);
for (const [name, version] of Object.entries(packageJson.dependencies ?? {})) {
  assert.match(version, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);
  let published;
  try {
    published = execFileSync("npm", ["view", `${name}@${version}`, "version", "--json"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    throw new Error(`Release blocked: ${name}@${version} is unavailable in npm.`);
  }
  assert.equal(JSON.parse(published), version);
}
console.log("Release prerequisites verified: frozen registry graph, no local links.");
