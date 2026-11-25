import { sanitizeHref } from "emdash";

type FileValue = { src?: string; url?: string; provider?: string; meta?: Record<string, unknown> } | null | undefined;

/** Public URL for an EmDash file field (videos, PDFs). */
export function fileUrl(
	file: FileValue,
	locals: { emdash?: { getPublicMediaUrl?: (key: string) => string } },
): string | undefined {
	if (!file) return undefined;
	const key = typeof file.meta?.storageKey === "string" ? file.meta.storageKey : undefined;
	if (key) return locals.emdash?.getPublicMediaUrl?.(key) ?? `/_emdash/api/media/file/${key}`;
	return file.provider === "external" ? file.src : file.url;
}

/** Safe href or undefined. */
export function href(url: string | null | undefined): string | undefined {
	if (!url) return undefined;
	const safe = sanitizeHref(url);
	return safe && safe !== "#" ? safe : undefined;
}

export function isExternal(url: string | undefined): boolean {
	return !!url && /^https?:\/\//.test(url);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseDate(value: string | Date | null | undefined): Date | null {
	if (!value) return null;
	const d = value instanceof Date ? value : new Date(value);
	return Number.isNaN(d.getTime()) ? null : d;
}

/** "11 Jan 2024" */
export function formatDate(value: string | Date | null | undefined): string {
	const d = parseDate(value);
	return d ? `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}` : "";
}

/** { month: "Jan", year: "2024", short: "24" } */
export function monthYear(value: string | Date | null | undefined) {
	const d = parseDate(value);
	if (!d) return null;
	const year = String(d.getUTCFullYear());
	return { month: MONTHS[d.getUTCMonth()], year, short: year.slice(2) };
}

/** Split a headline into words for the masked word-by-word reveal. */
export function words(text: string | null | undefined): string[] {
	return (text ?? "").split(/\s+/).filter(Boolean);
}

export function byOrder<T extends { data: { sort_order?: number | null; title?: string } }>(a: T, b: T) {
	const x = a.data.sort_order ?? 999;
	const y = b.data.sort_order ?? 999;
	return x - y || (a.data.title ?? "").localeCompare(b.data.title ?? "");
}
