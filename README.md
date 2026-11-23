# sarmayacar.com

The Sarmayacar website: Astro + EmDash CMS on Cloudflare Workers (D1 database, R2 media).

- **Edit content:** `https://<site>/_emdash/admin`, or connect an AI assistant to the EmDash MCP server at `https://<site>/_emdash/api/mcp`.
- **Change code:** branch → pull request → Cloudflare preview link → review → merge. Never push to `main`.
- **Rules for people and AI:** [AGENTS.md](AGENTS.md) — brand rules first, then how the template works.

```bash
npm install
npm run dev          # local site at http://localhost:4321, admin at /_emdash/admin
npm run check:brand  # brand guard (also runs before every build)
npm run build
```
