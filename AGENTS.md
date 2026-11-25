# Sarmayacar website — read this first

This is the website for **Sarmayacar**, an early-stage venture capital firm in Lahore that backs founders building technology companies in Pakistan. It runs on Astro with the EmDash CMS and is hosted on Cloudflare Workers.

The rules in this first part come from the client's brand manual (*Sarmayacar Brand Guidelines v1.0, March 2020*). **They override anything later in this file**, including the template's own "Visual character" and "Customisation" notes, which describe the starter template this site was built from.

## How to make changes (for every AI assistant and every person)

1. **Try content before code.** If a request can be met with the existing blocks (see "Marketing blocks" below), build it in the CMS (the admin at `/_emdash/admin` or the EmDash MCP server at `/_emdash/api/mcp`), not in code. A new page made of existing blocks needs **no code change at all**.
2. **New design = new block, not a one-off page.** When a page needs something no block can do, add a new reusable block type (seed schema + `src/components/blocks/*.astro` + the mapping in `MarketingBlocks.astro`), so the client can reuse it on any page. Do not hand-code pages in `src/pages/`.
3. **Never push to `main`.** Work on a new branch, open a pull request, and describe in plain language what changed and why. Cloudflare posts a preview link on the pull request; the developer reviews it and merges.
4. **Before opening the pull request**, run `npm run check:brand` and `npm run build`. Both must pass. The brand check also runs automatically on every build, so an off-brand change fails its preview.
5. **Ask the developer before touching:** `astro.config.mjs`, `wrangler.jsonc`, `package.json` dependencies, `src/live.config.ts`, `src/worker.ts`, `src/styles/tokens.css`, the brand values in `src/styles/theme.css`, `scripts/`, `.github/`, or anything that changes or deletes a content field (deleting a field deletes its data).
6. Never put passwords, API keys or tokens in code, pull requests or chat.

## Brand rules

### Colors (manual 1.3)

Use only these, through their CSS variables in `src/styles/theme.css`. Never type a color value anywhere else — the brand check fails the build if you do.

| Role | Name | Variable | Hex |
|---|---|---|---|
| Primary | Dark Green | `--sc-dark-green` | #13322B |
| Primary | Light Green | `--sc-light-green` | #008675 |
| Secondary | Black | `--sc-black` | #000000 |
| Secondary | Grey | `--sc-grey` | #939598 |
| Secondary | Mid Grey | `--sc-mid-grey` | #B7B9BC |
| Secondary | White | `--sc-white` | #FFFFFF |

- Tints of 75%, 50% and 25% exist for Dark Green, Light Green and Mid Grey: `--sc-dark-green-75`, `--sc-light-green-50`, `--sc-grey-25`, etc.
- Secondary colors add variety but must stay **under 50%** of any one page or piece. The greens lead.
- Light Green is the action color (buttons, links, highlights). Dark Green is for large panels and dark sections, with white text on it.
- Prefer the template's semantic tokens (`--color-brand`, `--color-night`, `--color-text`...) in components; they are already mapped to the brand.
- No gradients, glows or colors outside this palette.

### Logo (manual 1.2)

- The logo exists in two forms: the **insignia** (the green interlocking-squares mark) alone, and the insignia with the **wordmark** "Sarmayacar". Always use the supplied image files (SVG preferred) — set in Site settings → Logo, or from `src/assets/brand/`.
- **Never** recreate the logo in text or CSS, retype the wordmark (in Everett or any font), tilt, skew, stretch, squeeze, reposition its parts, recolor it, enlarge it out of proportion, or add effects such as shadows or outlines.
- On white or light backgrounds use the version with the black wordmark; on black or Dark Green use the version with the white wordmark. The insignia stays green.
- **Clear space:** keep empty space around the logo at least equal to the x-height of the wordmark. No text, other logos or busy imagery inside it.
- **Minimum size:** 150px wide on desktop, 200px wide on mobile (as written in the manual). Never smaller.
- **Over photos:** place the logo in an area of calm negative space with steady contrast. If the image is too busy, add the 75% black scrim (`--sc-scrim`) behind it — but avoid that when a better crop is possible.
- Favicon: insignia only, 16×16 and larger sizes. Social avatars use the same insignia format everywhere.

### Typography (manual 1.4)

- **Graphik** is the only typeface for the website: headlines, body, buttons, everything. Weights: Light, Regular, Medium, Semibold, Bold. Headlines use Graphik Medium.
- **Everett** is for the logo artwork only. Never use it for any text.
- Where Graphik is unavailable, the approved fallback is **Arial**.
- In code, always use `var(--font-body)` or `var(--font-display)`; never write a font name. The brand check enforces this.
- Type style from the manual's specimen: a small uppercase, widely letter-spaced eyebrow (e.g. "ADDING VALUE BEYOND CAPITAL"), a large Graphik Medium headline, a plain one-line subheadline, then short body paragraphs and a simple button.

### Photography and imagery (manual 1.5)

- Real people doing real work: founders, teams, meetings, events, offices and architecture. Candid, not posed.
- Natural light and a moody, editorial feel. Black-and-white or muted, desaturated color works well; avoid saturated, glossy stock photos.
- Never use stock photos to represent real founders, team members or portfolio companies. Use the company's own photos.
- No cartoon illustrations of people, no clip art, no emoji as decoration.

### Charts and data (manual 1.5)

Keep charts simple and use the brand palette with as few colors as possible: Light Green first, then Dark Green, then greys.

### Web look and feel (manual 1.5)

Confident and editorial: large clean sans-serif headlines, lots of white space, high contrast, and solid dark sections (Black or Dark Green) alternating with white. Simple shapes, no decoration for its own sake.

### Voice

Sarmayacar's mission is to bring international investment practice to Pakistan through a team that understands both local and international business. Its purpose is to enable daring entrepreneurs to build the iconic companies of the future. Core values: **conviction-led, trusted partners, beyond capital returns, here for good.** Tagline in use: *Adding value beyond capital.* Write plainly and specifically, as a trusted partner — no hype, no buzzwords.

## Sarmayacar content and sections

**Collections** (edit in the admin or through MCP; never hard-code this content):

| Collection | What it holds | Shown by |
|---|---|---|
| `companies` (Portfolio) | Ventures and Operator Angel companies; `program`, logos, description, founders, dates; `sector` taxonomy | `sc_portfolio`, `sc_sectors`, `sc_marquee` |
| `team` | People; unpublish to hide | `sc_team` |
| `news` | Press, Portfolio news, Newsletter issues (`category`) | `sc_press`, `sc_news_feed` |
| `events` | Events with cover and gallery | `sc_events`, `sc_news_feed` |
| `faqs` | Get-funding questions | `sc_faqs` |
| `milestones` | About-page timeline | `sc_timeline` |
| `reports` | **Private investor reports. Never render, link or publish these.** | nothing |

**Sarmayacar section types** (`src/components/sc/`), used in the `pages` collection's `content` field. Prefer these over the `marketing_*` template blocks:

| Block | Use |
|---|---|
| `sc_hero` | Page header (dark). First block on the home page with a `video` gets the intro animation and full-screen video. |
| `sc_manifesto` | Statement that lights up word by word on scroll |
| `sc_numbers` | Giant counting figures (`value` short, e.g. `$25m`) |
| `sc_sectors` | Sector list + logos, from the `sector` taxonomy |
| `sc_marquee` | Ventures logo band |
| `sc_press` / `sc_events` | Latest press rows / sideways-scrolling events |
| `sc_portfolio` / `sc_team` / `sc_news_feed` | Full collection pages with pop-ups and tabs |
| `sc_values`, `sc_timeline`, `sc_text`, `sc_image_card`, `sc_intro`, `sc_faqs`, `sc_statement` | Supporting sections |

Every section sets a tone (`tone-light`, `tone-dark`, `tone-black`) and a matching `data-tone` attribute so the header switches colour. Shared styles live in `src/styles/sarmayacar.css`; motion respects `prefers-reduced-motion`.

---

# Template reference (EmDash marketing template)

The rest of this file is the starter template's own documentation. It is accurate for how the code and blocks work. Where it describes colors, fonts, the serif display face, glows, the footer wordmark or demo content, the brand rules above win.

This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
npm run dev           # Start the Astro dev server
npx emdash types      # Regenerate TypeScript types from a running site
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- When Astro's cache is enabled, pass content-query hints to `Astro.cache.set(cacheHint)`. Use the `WithCacheHint` variants for site settings, menus, taxonomies, and widget areas rendered by cached routes.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## This Template

A photo-led marketing site template built entirely from modular content blocks: hero, logo wall, features, text and image, stats, testimonials, pricing, FAQ, call to action, contact options, and long-form text. Designed for product and service marketing sites that need a hero, supporting sections, pricing, and a closing call to action.

The demo content is Halden, a fictional energy-intelligence company for commercial buildings. The voice is calm and specific, with concrete outcomes instead of superlatives. Replace the copy and photos with your own.

## Pages

| Page    | Path       | What it shows                                                                                                                                                                                                                              |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Home    | `/`        | Marketing blocks in any order, authored in the Home page's blocks field. The demo uses every block type except pricing, contact options, and text: hero, logo wall, features, two text-and-image blocks, stats, testimonials, FAQ, and CTA |
| Pricing | `/pricing` | The same block editor, with a centred hero, three pricing plans, a pricing FAQ, and a call to action without a photo                                                                                                                       |
| Contact | `/contact` | The same block editor, with a centred hero and contact options linking to the general, support, and sales email addresses                                                                                                                  |

There is no posts collection. Content is entirely authored as marketing blocks inside `pages`.

`src/pages/index.astro` renders the `home` entry at `/`, and `src/pages/[slug].astro` renders every other page at `/{slug}`, so a page created or renamed in the admin works without a new route file; renaming a slug also adds an automatic redirect from the old URL. A slug with no page renders the 404 page. When a page has no hero, its title renders above the blocks as the `h1` (the home page shows the site title instead). A page without blocks shows only that heading to visitors, plus a link to edit it for logged-in editors; if the `home` entry is missing, the home page shows the site title and tagline, and editors get a link to create the page.

## Schema

- `pages` collection: `title`, `content` (a first-class `blocks` field). Its `/{slug}` URL pattern drives admin links, previews, and the sitemap; `src/pages/home.astro` redirects `/home` to `/`, keeping the query string so Home's preview links work.
- No taxonomies.
- Four menus: `primary` (the header links), plus `footer_product`, `footer_company`, and `footer_support` (the footer's Product, Company, and Support columns). The seeded links point at home page sections (`/#platform`, `/#monitoring`, `/#planning`, `/#customers`, `/#faq`), the pricing and contact pages, and `mailto:` addresses. A `primary` item with the CSS class `button` renders as a header button instead of a link (the seeded Book a demo item); on narrow screens only the first button stays in the header and the rest move into the menu. Each footer column's heading is its menu's label. Only the `button` class has an effect. Change menu labels and item classes in the admin's menu editor: the pencil button next to a menu's title renames it, and an item's **CSS classes** field sets its classes. The MCP `menu_update` and `menu_set_items` tools change them too. Applying the seed to an existing site doesn't rename menus that already exist.

Site settings have `title` and `tagline`. The title renders as the serif wordmark in the header and footer (a logo set in site settings replaces it there) and as the giant cropped wordmark at the bottom of every page; an empty title shows "My Site". The tagline renders in the footer when set.

Each page's meta description is its SEO panel description, else the subheadline of its first hero, else the tagline. Its share image is the SEO panel image, else the first hero's photo, else the default social image from site settings. The home page is titled after the site unless its SEO panel sets a title. Browser titles join the page and site titles with the title separator from Settings › SEO, which the seed sets to an em dash (also the default when it's unset).

## Marketing blocks

The seed declares eleven versioned block types. Editors add, reorder, duplicate, and edit them with the built-in blocks field editor. `MarketingBlocks.astro` maps the generated `PageContentBlock` union to `src/components/blocks/{Hero,Features,Testimonials,Pricing,FAQ,Logos,Split,Stats,CTA,Contact,Text}.astro` with `defineBlockComponents()`.

| Block                    | Admin label     | Fields                                                                                                                                                                                 |
| ------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `marketing_hero`         | Hero            | `headline`, `subheadline`, flattened primary and secondary CTA label/URL pairs, `image`, `image_caption`, `eyebrow` and `eyebrow_url` (the announcement pill), `centered`, `anchor_id` |
| `marketing_features`     | Features        | `headline`, `subheadline`, `eyebrow`, repeater of `{ icon, title, description }`, `anchor_id`                                                                                          |
| `marketing_testimonials` | Testimonials    | `headline`, repeater of `{ quote, author, role, company, avatar }` where `avatar` is an image field, `anchor_id`                                                                       |
| `marketing_pricing`      | Pricing         | `headline`, repeater of `{ name, price, period, description, features, cta_label, cta_url, highlighted, badge }`, `anchor_id`                                                          |
| `marketing_faq`          | FAQ             | `headline`, `subheadline`, repeater of `{ question, answer }`, `anchor_id`                                                                                                             |
| `marketing_logos`        | Logo wall       | `headline`, repeater of `{ name, logo }` where `logo` is an image field, `anchor_id`                                                                                                   |
| `marketing_split`        | Text and image  | `headline`, `eyebrow`, `body`, `points`, `cta_label`, `cta_url`, `image`, `image_caption`, `image_first`, `anchor_id`                                                                  |
| `marketing_stats`        | Stats           | `headline`, `subheadline`, repeater of `{ value, label }`, `anchor_id`                                                                                                                 |
| `marketing_cta`          | Call to action  | `headline`, `body`, flattened primary and secondary CTA label/URL pairs, `image`, `anchor_id`                                                                                          |
| `marketing_contact`      | Contact options | `headline`, `eyebrow`, `subheadline`, repeater of `{ icon, title, description, link_label, link_url }`, `anchor_id`                                                                    |
| `marketing_text`         | Text            | `headline`, `body` (Portable Text), `anchor_id`                                                                                                                                        |

Constraints worth remembering:

- Block fields cannot contain nested object groups, so CTA labels and URLs remain sibling fields.
- Repeaters cannot contain nested repeaters. Pricing `features` and the Text and image `points` checklist are therefore multiline text values: the renderers split them on newlines and drop empty lines. Text fields that hold prose (`body`, FAQ answers, quotes, and feature, plan, and contact descriptions) split into paragraphs on blank lines.
- Every block lists `headline` first and `anchor_id` last, because the admin labels a collapsed block with its first filled-in text field. Block fields have no separate help text, so the labels carry it, such as the link formats a URL field accepts.
- Repeaters have fixed limits: 1 to 3 pricing plans, 1 to 6 stats or contact options, 1 to 12 features, testimonials, or questions, and 1 to 24 logos. A page holds at most 20 blocks.
- Every image field (hero and Text and image photos, the call to action background, logos, avatars) is an EmDash image field. Render it with `<Image>` from `emdash/ui`, not a raw URL, and treat it as optional: a failed download during setup leaves it empty.
- The Hero block has no fallback illustration. Without an image it renders text only; with one, the photo runs below the text as a near full-width rounded sheet. `centered` centres the text and uses a smaller headline.
- `image_caption` (Hero, Text and image) renders a frosted glass chip at the photo's bottom-start corner. It only appears when there is a photo.
- `image_first` puts the Text and image photo before the copy on desktop. When the columns stack on narrow screens, the copy always comes first. With no image, only the copy renders.
- A logo without an image renders the company name as a typographic wordmark, cycling through six text styles. Logo images render monochrome at 28px tall. The row scrolls as a marquee that pauses on hover and has a pause button for keyboard and touch users; with reduced motion it becomes a static, centred row.
- A highlighted pricing plan renders on the dark night panel with its `badge`, and an empty badge field shows none. A highlighted plan stored without any badge value, as in content seeded before the field existed, shows "Most popular". A `badge` on any other plan shows as a neutral pill.
- The Call to action block sets its copy over `image` behind a dark scrim, or on the dark night panel when `image` is empty. The photo is decorative there and renders with empty alt text.
- Each FAQ block is its own exclusive accordion: opening a question closes the others in that block.
- The Text block renders its Portable Text `body` (headings, lists, links, quotes, and images) in a readable column, with `headline` as an optional `h2` above it. Use it for pages such as About or Privacy.
- Contact options icons come from a fixed set: `email, support, sales, phone, chat, location`. `link_url` is a URL field, so it only accepts `http`, `https`, `mailto:`, and `tel:` links, a site-relative path, or a `#` fragment. Option titles render as `h3` under the block's headline, or as `h2` when the block has none (as on the seeded contact page, where the hero holds the page heading).
- Every stored block has immutable `_type`, `_version`, and `_key` values. Components receive the generated value as `value` plus `index` and `blockKey`; do not treat blocks as Portable Text nodes.
- Render stored CTA and link URLs through `sanitizeHref()` even when their field validation rejects unsafe-looking values.
- Menu links such as `/#platform` target a block's `anchor_id`. Change both together.
- Icons in the Features block come from a fixed set of 21 keys: `zap, shield, users, chart, code, globe, heart, star, check, lock, clock, cloud, building, leaf, gauge, thermometer, plug, bell, file, sun, trend`. Pick from that list. `Features.astro` maps each key to a Phosphor icon, and only the icons listed under `include.ph` in `astro.config.mjs` are bundled.

## Visual character

The palette is warm and neutral: an off-white canvas (`--color-bg`), white surfaces (`--color-surface`), a sunken tone (`--color-sunken`) for panels and icon tiles, and near-black ink (`--color-text`) with secondary (`--color-text-secondary`) and muted (`--color-muted`) steps. `--color-brand` is the ink too -- it fills the primary buttons. The only accent colour is a daylight amber, `--color-accent`, kept to one small mark: the featured testimonial's quote mark. The night tone (`--color-night`, `--color-on-night`) sets the stats panel, the highlighted pricing plan, and a call to action without a photo. Dark mode inverts the scale.

Typography pairs **Instrument Serif** on `--font-display` with **Inter** on `--font-body`. The serif, in its single 400 weight, sets the hero headline (`--font-size-display`), section headlines (`.section-headline`, `--font-size-h2`), the featured testimonial, stat values, prices, the call to action headline, and the wordmarks. Inter sets everything else; `--font-heading` is Inter at weight 500 for card titles and other small headings. Section headlines are often two-tone: `.section-headline__muted` mutes a trailing sentence inside the same `h2`.

Structure comes from whitespace, rounded surfaces, and soft shadows. There are no hairline rules between sections, no bordered grids, and no divided lists. The recurring devices are:

- A floating glass header: a sticky, rounded pill inset from the viewport edge, translucent with a backdrop blur. At 960px and narrower, its links move into a dropdown menu.
- Sheets: rounded panels that run almost edge to edge (`.sheet`). The Features block sits on a sunken sheet with a warm daylight glow (`.sheet--sunken`), the Stats block on a night sheet with a dusk glow (`.sheet--night`), and the hero photo and a call to action with an image are photo sheets.
- Glass caption chips on photos (`.media-chip`), driven by `image_caption`.
- A slow logo marquee, and a giant cropped serif wordmark at the bottom of the footer.

Motion is CSS only and switches off under `prefers-reduced-motion: reduce`: a staggered entrance on the hero (`.rise`), a scroll-linked zoom as photos come into view (`.settle`, only where `animation-timeline: view()` is supported), and the marquee.

The demo photography comes from Unsplash, whose licence allows free commercial use without attribution. With sample content, setup downloads four photos into the media library. The testimonials show initials instead of portraits: the quoted people are fictional, and a stock portrait would present a real person as one of them.

## Customisation

Design tokens live in `src/styles/tokens.css` with their default values. To restyle the site, override tokens in `src/styles/theme.css` -- declarations there are unlayered, so they always beat the `@layer base` defaults. Don't edit `tokens.css` or `Base.astro` for visual changes.

Colours are defined with `light-dark(<light>, <dark>)`, so each token carries both modes. Overriding with a plain colour changes light and dark at once; use `light-dark()` in the override to keep them distinct. There is no separate dark palette to maintain. The footer's Light, Dark, and System switch pins the mode with a `light` or `dark` class on `:root`, so style both modes through `light-dark()` tokens, not `[data-theme]` selectors.

To give the site a brand colour, set `--color-brand` and `--color-on-brand` together: `--color-on-brand` defaults to near-black in dark mode, to sit on the light ink brand. `--color-brand-strong`, the primary button hover, is mixed from `--color-brand` and follows it.

Webfonts are configured in `astro.config.mjs` under `fonts:`. Inter is bound to `cssVariable: "--font-body"` (weights 400 to 700) and Instrument Serif to `cssVariable: "--font-display"` (weight 400, normal and italic). To swap a face, change the `name:` of its entry. DM Serif Display, Newsreader, and Fraunces work as display replacements; Geist, Plus Jakarta Sans, Manrope, and DM Sans work for the body. For a system font, or a separate face for small headings, override `--font-body` / `--font-heading` in `theme.css`.

`Base.astro` defines the shared classes every block uses. Use them in new blocks rather than restyling per block:

- Layout and rhythm: `.container`, `.section`, `.sheet` with `.sheet--sunken` or `.sheet--night`, and `.sheet-section` with an inner `.sheet-body`. A plain section adds half of `--section-space` above and below, and a section-level sheet adds the same as margin, so any two neighbouring blocks sit one `--section-space` apart in any order.
- Type: `.section-header` (and `.section-header--center`), `.section-headline`, `.section-headline__muted`, `.section-subheadline`, `.eyebrow`, `.display`, `.lead`.
- Controls: `.btn` with `.btn-primary`, `.btn-secondary`, `.btn-light` and `.btn-glass` (for dark or photo backgrounds), and `.btn-sm` / `.btn-lg`; `.actions` for button rows; `.text-link`. An icon with the class `arrow` inside a button or text link nudges forward on hover.
- Surfaces and media: `.card` (with `.card--lift` for a hover lift), `.media` (a rounded photo frame; wrap the `<Image>` in `.media__img`), `.media-chip`, `.tick` (the round checklist badge), `.avatar` (the initials circle), and the `.settle` and `.rise` motion classes.

Use logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) in new blocks, as the existing blocks do, so the layout mirrors in right-to-left languages.

CSS variables worth knowing (see `tokens.css` for the full list):

- `--color-bg`, `--color-surface`, `--color-sunken`, `--color-text`, `--color-text-secondary`, `--color-muted`, `--color-border`, `--color-border-strong`
- `--color-brand`, `--color-brand-strong`, `--color-brand-soft`, `--color-on-brand`, `--color-brand-ring`
- `--color-accent`, `--color-accent-soft`
- `--color-night`, `--color-on-night`, `--color-on-night-muted` -- the dark panels
- `--glass-bg`, `--chip-bg`, `--chip-text` -- the header pill and caption chips
- `--glow-daylight`, `--glow-dusk` -- the radial glows on sunken and night sheets
- `--shadow-card`, `--shadow-card-hover`, `--shadow-glass`
- `--font-body`, `--font-display`, `--font-heading`, `--font-weight-heading` (500), `--font-weight-display` (400)
- `--font-size-display` (hero headline), `--font-size-h2` (section headlines)
- `--wide-width` (1200px container), `--gutter`, `--sheet-inset`, `--sheet-max` (1680px), `--section-space`
- `--radius-sm` (8px), `--radius` (12px), `--radius-lg` (18px), `--radius-xl` (22px, cards), `--radius-media` (28px, photos), `--radius-sheet`, `--radius-full`
- `--ease-out` -- the easing curve for transitions and animations

To re-brand, the highest-leverage moves are:

1. Replace the four seeded photos in the media library: the hero, the two Text and image blocks, and the closing call to action. The photos set the tone of every page, so choose ones with consistent light and colour.
2. Update the site title (the header and giant footer wordmarks) and tagline, or set a logo in site settings.
3. Set `--color-accent` to the brand's accent colour. It only marks small details, so a strong colour works.
4. Rewrite the hero headline, announcement, and subheadline with specific, concrete copy.

## What not to do

- Don't write stock SaaS copy: "Build products people actually want", "Elevate your workflow", "The all-in-one platform for modern teams". These are placeholders. Write what the product actually does, for whom, with one specific outcome.
- Don't draw structure with lines: no hairline rules between sections, bordered logo or feature grids, or divided stats, FAQ rows, and checklists. Space, cards, and sheets separate content in this design.
- Don't spread the accent colour onto buttons, panels, or headlines. It marks the quote mark; on everything, it stops signalling.
- Don't use stock portraits for fictional people. Leave testimonial avatars empty so initials show, and add photos only of real customers who agreed to be quoted.
- Don't ship more than three pricing tiers. Three is the default for a reason -- more makes choice harder, not easier -- and the pricing block allows no more.
- Don't put sentences in stat values. A value is a short figure (`23%`, `4,800`, `9 mo`); the label carries the explanation.
- Don't add a hero block followed immediately by another hero block. One hero, then the other blocks in any order.
- Don't add JavaScript animation or motion that ignores `prefers-reduced-motion`. Every animation here is CSS and stops when the reader asks for reduced motion.
- Don't replace the `marketing_pricing` block with a hand-coded table. The block is the data shape downstream renderers expect.
