import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const bytes = await readFile(resolve(root, "openapi.json"));
const document = JSON.parse(bytes);
const provenance = JSON.parse(await readFile(resolve(root, "openapi.provenance.json"), "utf8"));
const methods = new Set(["get", "put", "post", "delete", "patch", "head", "options", "trace"]);

const operations = Object.entries(document.paths ?? {}).flatMap(([pathname, pathItem]) =>
  Object.entries(pathItem)
    .filter(([method]) => methods.has(method))
    .map(([method, operation]) => ({ pathname, method, operation })),
);

function resolveLocal(ref) {
  assert(ref.startsWith("#/"), `external reference is not allowed: ${ref}`);
  return ref.slice(2).split("/").reduce((value, segment) =>
    value?.[segment.replaceAll("~1", "/").replaceAll("~0", "~")], document);
}

function walk(value, visitor, pointer = "$") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visitor, `${pointer}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    visitor(key, child, `${pointer}.${key}`);
    walk(child, visitor, `${pointer}.${key}`);
  }
}

assert.equal(document.openapi, "3.0.0");
assert.equal(document.info.version, "2026-07-29.dahlia");
assert.equal(Object.keys(document.paths).length, 6);
assert.equal(operations.length, 8);
assert.equal(Object.keys(document.components.schemas).length, 35);
assert.equal(new Set(operations.map(({ operation }) => operation.operationId)).size, 8);
assert.equal(operations.filter(({ method }) => method === "post").length, 4);
assert(operations.every(({ pathname }) => pathname.startsWith("/v1/identity/")));
assert(operations.every(({ operation }) => !operation.tags?.length),
  "Stripe Identity Endpoints must remain untagged and flat in the SDK");
assert(operations.every(({ operation }) => /^[a-z][A-Za-z0-9]*$/.test(operation.operationId)),
  "Stripe Identity operation IDs must be lower-camel-cased for the flat SDK");
assert(operations.every(({ operation }) => /^[A-Z][A-Za-z0-9]*$/.test(
  operation["x-pontx-upstream-operation-id"],
)), "Stripe Identity Endpoints must retain their exact upstream operation IDs");
assert.deepEqual(document.security, [{ basicAuth: [] }, { bearerAuth: [] }]);
assert.equal(document.components.securitySchemes.basicAuth.scheme, "basic");
assert.equal(document.components.securitySchemes.bearerAuth.scheme, "bearer");
assert(document.servers.every(({ url }) => url.startsWith("https://")));

const credentialPattern = /sk_(?:test|live|restricted)_[A-Za-z0-9]+|authorization|secret[_-]?key/i;
for (const { pathname, method, operation } of operations) {
  const label = `${method.toUpperCase()} ${pathname}`;
  assert.equal(operation["x-pontx-documentation-status"], "official", `${label}: evidence drifted`);
  assert.equal(Object.hasOwn(operation, "x-pontx-proxy-enabled"), false,
    `${label}: must not carry a policy-based execution disablement`);
  assert.equal(Object.hasOwn(operation, "x-pontx-proxy-disabled-reason"), false,
    `${label}: must not carry a policy-based execution disablement reason`);
  assert(operation["x-pontx-evidence"]?.every((url) => url.startsWith("https://")),
    `${label}: evidence must use HTTPS`);
  const example = operation["x-pontx-request-examples"]?.default;
  assert.equal(example?.expectedStatus, "200", `${label}: request example missing`);
  assert(example.request && typeof example.request.path === "object" &&
    typeof example.request.query === "object" && typeof example.request.headers === "object",
  `${label}: request example sections are incomplete`);
  assert(!credentialPattern.test(JSON.stringify(example)), `${label}: request example leaks credentials`);
  const form = operation.requestBody?.content?.["application/x-www-form-urlencoded"];
  if (method === "post") assert(form, `${label}: Stripe form request media was lost`);
  else assert.equal(operation.requestBody, undefined, `${label}: empty GET request body was reintroduced`);
  for (const match of pathname.matchAll(/\{([^}]+)\}/g)) {
    const parameter = operation.parameters?.find(({ name, in: location }) =>
      name === match[1] && location === "path");
    assert.equal(parameter?.required, true, `${label}: path parameter ${match[1]} is not required`);
  }
}

walk(document, (key, value, pointer) => {
  if (key === "$ref") assert(resolveLocal(value) !== undefined, `unresolved reference at ${pointer}`);
  if (typeof value === "string") {
    assert(!/\]\(\/docs\/|href="\/docs\//.test(value), `relative Stripe docs link at ${pointer}`);
  }
});

assert.equal(document.components.schemas.stripe_api_error.additionalProperties, true);
assert(document.components.schemas.stripe_identity_verification_report);
assert(document.components.schemas.stripe_identity_verification_session);
assert(Object.keys(document.components.schemas).every((name) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name)),
  "component identifiers must be valid TypeScript identifiers");
for (const unrelated of ["payment_intent", "payment_method", "setup_intent", "source"]) {
  assert(!document.components.schemas.stripe_api_error.properties[unrelated],
    `shared error envelope reintroduced unrelated ${unrelated} graph`);
}

const actualHash = createHash("sha256").update(bytes).digest("hex");
assert.equal(actualHash, provenance.output.sha256);
assert.equal(provenance.source.revision, "325f3b157f7250f2a5d228b870d77bb63fc7e54c");
assert.equal(provenance.output.operations, 8);
assert.equal(provenance.output.schemas, 35);
assert.equal(provenance.output.untaggedOperations, 8);
assert.equal(provenance.output.executionEligibleOperations, 8);
assert.equal(provenance.output.formUrlencodedOperations, 4);
assert.equal(provenance.output.mutationOperations, 4);

console.log(`Verified Stripe Identity contract ${actualHash}: 6 paths, 8 flat Endpoints, 35 Schemas, 4 mutations, and no policy-based execution disablements.`);
