#!/usr/bin/env node
/**
 * Cloudflare deploy step: apply EmDash database migrations, then deploy.
 *
 * Used as the "Deploy command" in Cloudflare Workers Builds (`npm run deploy:cf`),
 * after the build command (`npm run build`) has written .emdash/migrations.json.
 *
 * Why: on the Workers free plan a single request has too little CPU time to
 * run EmDash's database migrations, so the site returns 503 "Database
 * migrations are required". Running `emdash migrate` here applies them from
 * the build machine instead, before the new code goes live.
 *
 * The D1 database is taken from wrangler.jsonc. Cloudflare's build
 * environment supplies the account and API token.
 */
import { spawnSync } from "node:child_process";

const TARGET = ["--wrangler-config", "wrangler.jsonc"];

function run(args, { capture = false } = {}) {
	const result = spawnSync("npx", args, {
		stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit",
		encoding: "utf8",
	});
	return { code: result.status ?? 1, out: result.stdout ?? "" };
}

// 1. Inspect the target database and read its fingerprint.
//    Exit code 2 means "migrations pending", which is expected.
const status = run(["emdash", "migrate", "--status", "--json", ...TARGET], { capture: true });
if (status.code !== 0 && status.code !== 2) {
	console.error("emdash migrate --status failed; not deploying.");
	process.exit(status.code);
}
let fingerprint;
try {
	fingerprint = JSON.parse(status.out.trim().split("\n").pop()).target.fingerprint;
} catch {
	console.error("Could not read the migration target from:\n" + status.out);
	process.exit(1);
}
console.log(`Migration target fingerprint: ${fingerprint}`);

// 2. Apply pending migrations.
const apply = run(["emdash", "migrate", ...TARGET, "--expected-target-fingerprint", fingerprint]);
if (apply.code !== 0) {
	console.error("Applying migrations failed; not deploying.");
	process.exit(apply.code);
}

// 3. Deploy the Worker.
const deploy = run(["wrangler", "deploy"]);
if (deploy.code !== 0) process.exit(deploy.code);

// 4. Confirm nothing is left pending.
const check = run(["emdash", "migrate", "--check", ...TARGET]);
process.exit(check.code);
