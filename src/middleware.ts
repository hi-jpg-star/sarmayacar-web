import { defineMiddleware } from "astro:middleware";

// Security headers for every response. There is deliberately no strict
// Content-Security-Policy yet: the EmDash admin needs inline scripts, and a
// wrong policy would break editing. Add one only after testing the admin.
const headers: Record<string, string> = {
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
	"Cross-Origin-Opener-Policy": "same-origin",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"X-Frame-Options": "SAMEORIGIN",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	try {
		for (const [name, value] of Object.entries(headers)) {
			if (!response.headers.has(name)) response.headers.set(name, value);
		}
		return response;
	} catch {
		// Some responses (e.g. redirects) have immutable headers; copy them.
		const copy = new Response(response.body, response);
		for (const [name, value] of Object.entries(headers)) {
			if (!copy.headers.has(name)) copy.headers.set(name, value);
		}
		return copy;
	}
});
