import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { generateGracefulClient } from "@pontx/sdk/plugin";

const directory = resolve("src/apis/stripe-identity");
const spec = JSON.parse(await readFile(resolve(directory, "api-lock.json"), "utf8"));
const expected = generateGracefulClient(spec);

for (const [name, content] of Object.entries(expected)) {
  const actual = await readFile(resolve(directory, name), "utf8");
  assert.equal(actual, content, `${name} is stale; regenerate from openapi.json`);
}

assert.deepEqual(spec.tags, [], "untagged Stripe Endpoints must remain a flat client");
assert(!Object.prototype.hasOwnProperty.call(spec.apis, "common"),
  "a synthetic common controller must never be generated");
console.log(`Generated-source gate passed: ${Object.keys(expected).length} deterministic files, flat client.`);
