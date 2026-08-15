import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

test("the built ESM and CJS SDK surfaces complete an authenticated flat-client round trip", async (context) => {
  const requests = [];
  const payload = {
    object: "list",
    url: "/v1/identity/verification_sessions",
    has_more: false,
    data: [],
  };
  const server = createServer((request, response) => {
    requests.push({ method: request.method, url: request.url, headers: request.headers });
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(payload));
  });
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  context.after(() => new Promise((resolveClose) => server.close(resolveClose)));

  const address = server.address();
  assert(address && typeof address === "object");
  const esm = await import(
    `${pathToFileURL(resolve(repositoryRoot, "dist/index.mjs")).href}?e2e=${Date.now()}`
  );
  const client = esm.createStripeIdentityClient({
    secretKey: "sk_test_fixture",
    baseUrl: `http://127.0.0.1:${address.port}`,
  });
  assert.equal("common" in client, false);
  assert.equal("default" in client, false);
  assert.deepEqual(await client.getIdentityVerificationSessions({ limit: 10 }), payload);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].method, "GET");
  assert.equal(requests[0].url, "/v1/identity/verification_sessions?limit=10");
  assert.equal(requests[0].headers.authorization, "Bearer sk_test_fixture");

  const require = createRequire(import.meta.url);
  const cjs = require(resolve(repositoryRoot, "dist/index.js"));
  assert.equal(typeof cjs.createStripeIdentityClient, "function");
  assert.equal(cjs.default, cjs.createStripeIdentityClient);
});

test("the CLI and npm package surface include the complete contract", async () => {
  const cli = resolve(repositoryRoot, "dist/bin/cli.cjs");
  const { stdout: help } = await execFileAsync(process.execPath, [cli, "--help"], {
    cwd: repositoryRoot,
  });
  assert.match(help, /pontx-stripe-identity/);
  const { stdout: endpoints } = await execFileAsync(process.execPath, [cli, "list", "apis"], {
    cwd: repositoryRoot,
  });
  assert.equal(endpoints.trim().split("\n").length, 8);
  assert.match(endpoints, /postIdentityVerificationSessionsSessionRedact/);
  assert.doesNotMatch(endpoints, /common|default/);

  const { stdout } = await execFileAsync("npm", ["pack", "--dry-run", "--json"], {
    cwd: repositoryRoot,
  });
  const [packed] = JSON.parse(stdout);
  const files = new Set(packed.files.map((file) => file.path));
  for (const expected of [
    "LICENSE",
    "LICENSES/MIT-stripe-openapi.txt",
    "README.md",
    "THIRD_PARTY_NOTICES.md",
    "dist/index.d.ts",
    "dist/index.js",
    "dist/index.mjs",
    "dist/bin/api-lock.json",
    "dist/bin/cli.cjs",
  ]) {
    assert(files.has(expected), `missing npm artifact: ${expected}`);
  }
});

test("the CLI blocks mutations until the exact redacted preview is confirmed", async (context) => {
  const requests = [];
  const server = createServer((request, response) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => { body += chunk; });
    request.on("end", () => {
      requests.push({ method: request.method, url: request.url, headers: request.headers, body });
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ id: "vs_fixture", object: "identity.verification_session" }));
    });
  });
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  context.after(() => new Promise((resolveClose) => server.close(resolveClose)));

  const address = server.address();
  assert(address && typeof address === "object");
  const args = [
    resolve(repositoryRoot, "dist/bin/cli.cjs"),
    "call",
    "postIdentityVerificationSessions",
    "--body",
    JSON.stringify({ type: "document" }),
    "--env",
    `http://127.0.0.1:${address.port}`,
  ];
  const env = { ...process.env, STRIPE_SECRET_KEY: "sk_test_fixture-never-log" };

  const preview = await execFileAsync(process.execPath, [...args, "--dry-run", "--curl"], {
    cwd: repositoryRoot,
    env,
  });
  const previewOutput = `${preview.stdout}\n${preview.stderr}`;
  assert.equal(requests.length, 0);
  assert.match(previewOutput, /authorization: <redacted>/i);
  assert.doesNotMatch(previewOutput, /sk_test_fixture-never-log/);
  const token = previewOutput.match(/ptx1\.\d+\.[a-f0-9]{64}/)?.[0];
  assert(token, "dry-run did not return a mutation confirmation token");

  await assert.rejects(
    execFileAsync(process.execPath, args, { cwd: repositoryRoot, env }),
    (error) => /Mutation blocked/.test(`${error.stdout}\n${error.stderr}`),
  );
  assert.equal(requests.length, 0);

  const changedArgs = args.map((argument) =>
    argument.includes('"document"') ? argument.replace("document", "id_number") : argument,
  );
  await assert.rejects(
    execFileAsync(process.execPath, [...changedArgs, "--confirm", token], {
      cwd: repositoryRoot,
      env,
    }),
    (error) => /Mutation blocked/.test(`${error.stdout}\n${error.stderr}`),
  );
  assert.equal(requests.length, 0);

  const executed = await execFileAsync(process.execPath, [...args, "--confirm", token], {
    cwd: repositoryRoot,
    env,
  });
  assert.match(executed.stdout, /"id": "vs_fixture"/);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].method, "POST");
  assert.equal(requests[0].url, "/v1/identity/verification_sessions");
  assert.equal(requests[0].headers.authorization, "Bearer sk_test_fixture-never-log");
  assert.equal(requests[0].headers["content-type"], "application/x-www-form-urlencoded");
  assert.equal(requests[0].body, "type=document");
});
