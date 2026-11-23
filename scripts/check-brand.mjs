#!/usr/bin/env node
/**
 * Brand guard for the Sarmayacar site.
 *
 * Fails (exit 1) when code under src/ breaks the brand rules in AGENTS.md:
 *   1. A color literal (hex, rgb(), hsl(), oklch()...) outside the theme files.
 *      Use var(--sc-*) or the semantic tokens instead. Pure black and white
 *      (with any alpha) are allowed for masks and overlays.
 *   2. A font-family that is not a var(--font-*) token. Everett is
 *      reserved for the logo, and Graphik comes in through the tokens.
 *   3. The logo or wordmark recreated as text (e.g. "Sarmayacar" set in a
 *      heading styled as a logo). The logo must always be the image file.
 *
 * Runs automatically before `npm run build` (the "prebuild" script), so
 * an off-brand change fails its Cloudflare preview build and its pull request
 * check.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");

// Files allowed to define raw color values.
const THEME_FILES = new Set(["src/styles/theme.css", "src/styles/tokens.css"]);
const EXTENSIONS = /\.(astro|css|scss|ts|tsx|js|jsx|mjs)$/;

const COLOR_LITERAL =
	/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\([^)]*\)/g;
const ALLOWED_COLORS = [
	/^#(?:000|000000|fff|ffffff)$/i,
	/^rgba?\(\s*0[ ,]+0[ ,]+0(?:\s*[,/][^)]*)?\)$/i,
	/^rgba?\(\s*255[ ,]+255[ ,]+255(?:\s*[,/][^)]*)?\)$/i,
	/^oklch\(\s*[01]\s+0\s+0(?:\s*\/[^)]*)?\)$/i,
];
const FONT_FAMILY = /font-family\s*:\s*([^;}]+)/g;
const FONT_SHORTHAND = /\bfont\s*:\s*([^;}]+)/g;
const LOGO_AS_TEXT = /class="[^"]*(?:logo|wordmark)[^"]*"[^>]*>\s*Sarmayacar\s*</i;

function walk(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const full = join(dir, name);
		if (statSync(full).isDirectory()) walk(full, out);
		else if (EXTENSIONS.test(name)) out.push(full);
	}
	return out;
}

function lineOf(text, index) {
	return text.slice(0, index).split("\n").length;
}

// Ignore anything inside comments so documentation can mention values.
function stripComments(text) {
	return text
		.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
		.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
		.replace(/(^|[^:"'])\/\/[^\n]*/g, (m, p) => p + " ".repeat(m.length - p.length));
}

const problems = [];

for (const file of walk(SRC)) {
	const rel = relative(ROOT, file);
	const raw = readFileSync(file, "utf8");
	const text = stripComments(raw);

	if (!THEME_FILES.has(rel)) {
		for (const m of text.matchAll(COLOR_LITERAL)) {
			const value = m[0];
			if (ALLOWED_COLORS.some((re) => re.test(value))) continue;
			// Skip id-like hash fragments in URLs/hrefs (e.g. href="#faq").
			if (/^#[0-9a-f]{3,8}$/i.test(value) && /["'`]#/.test(text.slice(m.index - 1, m.index + 1))) continue;
			problems.push(
				`${rel}:${lineOf(text, m.index)}  color "${value}" — use a var(--sc-*) brand color or a semantic token from theme.css`,
			);
		}
	}

	for (const re of [FONT_FAMILY, FONT_SHORTHAND]) {
		for (const m of text.matchAll(re)) {
			const value = m[1].trim();
			if (rel.startsWith("src/styles/")) continue;
			if (/var\(--font-[a-z-]+\)/.test(value) || /^(inherit|initial|unset)$/.test(value)) continue;
			problems.push(
				`${rel}:${lineOf(text, m.index)}  font "${value}" — use var(--font-body) / var(--font-display); Everett is for the logo only`,
			);
		}
	}

	if (/everett/i.test(text) && !rel.startsWith("src/styles/")) {
		problems.push(`${rel}  mentions Everett — Everett is reserved for the logo artwork`);
	}

	const logo = text.match(LOGO_AS_TEXT);
	if (logo) {
		problems.push(
			`${rel}:${lineOf(text, logo.index)}  logo typed out as text — use the logo image (see AGENTS.md, Logo rules)`,
		);
	}
}

if (problems.length) {
	console.error(`\nBrand check failed (${problems.length}):\n`);
	for (const p of problems) console.error("  ✗ " + p);
	console.error("\nSee the 'Sarmayacar brand rules' section of AGENTS.md.\n");
	process.exit(1);
}
console.log("Brand check passed.");
