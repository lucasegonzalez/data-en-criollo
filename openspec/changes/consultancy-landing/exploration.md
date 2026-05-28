# Exploration: Consultancy Landing Page — Obsidian-Powered

## Current State

The project at `/Users/user/data-en-criollo` is a **single-page Next.js 14 App Router application** with a retro-CRT aesthetic, serving as a data-analysis education platform ("Data en Criollo") for LATAM entrepreneurs.

**Architecture snapshot:**
- **Pages:** Single route (`/`) — renders `<Shell />` which splits into left (CRT monitor with episode slides) and right (ROI calculator + agenda/scheduling) panels
- **Data layer:** All content is hardcoded TypeScript in `data/` — `episodes.ts`, `plans.ts`, `services.ts`, `calendar.ts`. Zero dynamic content sources.
- **Components:** 8 components + 3 UI primitives (`Keycap`, `PanelTitle`, `VhsBands`), all with CSS Modules. All client components except `EpisodeSlide` (server-compatible) and UI primitives.
- **API routes:** Single POST endpoint at `/api/agenda` for scheduling consultations via Resend
- **Hooks:** `useClock`, `useTicker`, `useStaticEffect` — all strongly UI-bound to the CRT aesthetic
- **Styling:** CSS custom properties for a warm papel/tinta palette. DM Mono for UI, Playfair Display for headings, Source Serif 4 for body.
- **Stack:** Next.js 14.2, React 18.3, TypeScript 5.4, Resend 4.0
- **No CMS, no database, no markdown processing, no dynamic routing.**

**Key observation:** The consultancy landing page would be a fundamentally new concern. This is not a refactor — it's a domain addition. The existing app is a single-purpose education platform with strong visual identity. A consultancy landing page has different goals (lead generation, service presentation, trust-building) and a different visual tone.

## Affected Areas

| File / Path | Why Affected |
|---|---|
| `app/layout.tsx` | New metadata/OG for consultancy section; may need locale/language strategy |
| `app/page.tsx` | May need routing to consultancy pages, or consultancy becomes the new root |
| `app/consultoria/page.tsx` | **New** — main landing page for the consultancy |
| `app/consultoria/layout.tsx` | **New** — layout for consultancy pages (could differ from main site) |
| `app/consultoria/[slug]/page.tsx` | **New** — dynamic routes for consultancy sub-pages from Obsidian markdown |
| `components/` | New components for service cards, testimonials, about section, contact form |
| `data/` | Would be replaced/overlaid by Obsidian-sourced content |
| `lib/` | **New** — markdown parser, Obsidian vault reader, content transformer |
| `lib/email.ts` | May need additional email templates (consultancy inquiry vs. agenda booking) |
| `.env.local` | May need Obsidian vault path or API keys |
| `next.config.mjs` | May need to configure `output: export` or server component configs |
| `package.json` | New deps: `gray-matter`, `remark`/`rehype`, `unified` for MD processing |
| `tsconfig.json` | MAY need `"moduleResolution": "bundler"` adjustments for MD imports |
| `globals.css` | May need a complementary design system for consultancy (different from CRT aesthetic) |

## Approaches

### 1. 🟢 **Build-time Markdown Import via Plugin** (Recommended)

**Description:** Use `gray-matter` + `unified`/`remark` at build time to read `.md` files from a defined Obsidian vault directory. Generate static pages via Next.js `generateStaticParams`. The Obsidian vault path is configured via `.env.local`.

**How it works:**
```
obsidian-vault/consultoria/
├── index.md          -> /consultoria
├── servicios/
│   ├── analisis.md   -> /consultoria/servicios/analisis
│   └── dashboard.md  -> /consultoria/servicios/dashboard
├── sobre-mi.md       -> /consultoria/sobre-mi
└── casos/
    ├── caso-1.md     -> /consultoria/casos/caso-1
    └── caso-2.md     -> /consultoria/casos/caso-2

┌─────────────────────────────┐
│  next build                  │
│  ├── read vault .md files    │
│  ├── parse frontmatter       │
│  ├── remark → HTML           │
│  └── static pages            │
└─────────────────────────────┘
```

**Pros:**
- Fully static at build time — fastest possible delivery, no runtime overhead
- Deployable to Vercel/Netlify without server adapters
- Obsidian vault stays as source of truth; git-ignorable
- Frontmatter in `.md` gives structured metadata (title, description, order, tags)
- Works with Next.js App Router SSG naturally
- Can keep old `data-en-criollo` pages and new consultancy pages side-by-side via routes

**Cons:**
- Content changes require a new build (no live editing)
- Vault path must be accessible at build time (works locally and in CI if vault is in repo or mounted)
- Obsidian-specific syntax (wikilinks `[[`, embeds `![[`) needs custom remark plugins
- Need to handle images referenced in Obsidian (typically at `vault/assets/` — needs copying to `public/`)

**Effort:** Medium — 3-5 days

**Dependencies to add:**
- `gray-matter` — frontmatter parsing
- `unified` + `remark-parse` + `remark-html` or `rehype` pipeline
- `remark-wiki-link` or custom transformer for Obsidian `[[links]]`
- `copy-webpack-plugin` (or custom build script) to sync vault images to `public/`

### 2. 🔵 **Runtime API Route with Vault Watcher**

**Description:** Create a Next.js API route that reads the Obsidian vault at runtime (using Node.js `fs`). Optionally add file-watching (chokidar) to hot-reload content during development. Content is served via API to client components or rendered as server components.

**How it works:**
```
Client request → API route /api/content/[path]
                → fs.readFileSync(vaultPath + path + ".md")
                → parse frontmatter + markdown
                → return JSON or HTML
```

**Pros:**
- Content updates immediately without rebuild (great for active Obsidian users)
- Can be extended to live preview (Obsidian + browser side-by-side)
- Natural fit for the "Obsidian-powered" concept — the vault IS the CMS

**Cons:**
- Requires server runtime — cannot deploy static-only (needs Node.js server)
- Each page request incurs filesystem I/O (mitigated by caching/memoization)
- File watching doesn't work in serverless (Vercel Edge/Lambda)
- Security concerns: need strict path traversal protection
- More complex deployment story

**Effort:** Medium-High — 5-7 days

**Dependencies to add:**
- `gray-matter` — frontmatter parsing
- `unified` + `remark-parse` — markdown parsing
- `chokidar` (dev only) — filesystem watcher
- Custom path sanitizer for security

### 3. ⚪ **Obsidian Publish API / Obsidian Sync Integration**

**Description:** Use Obsidian's official Publish API or community Sync API as a headless CMS. Content lives exclusively in Obsidian cloud; the Next.js app fetches it via API at build time or runtime.

**Pros:**
- True "write in Obsidian, publish anywhere" separation
- No filesystem coupling
- Could support non-technical users managing content
- Secure — no file path exposure

**Cons:**
- Obsidian Publish requires a paid subscription ($10/mo per site)
- API is not designed as a headless CMS — limited querying capabilities
- Rate limits and caching considerations
- Vendor lock-in to Obsidian's infrastructure
- No offline/content-in-repo fallback
- Least mature integration path

**Effort:** High — 7-10 days

**Dependencies to add:**
- `obsidian-api` (community, potentially unstable)
- HTTP fetching + cache layer
- Fallback content mechanism

## Recommendation

**Go with Approach 1 (Build-time Markdown Import) for the MVP.**

Why:

1. **Fits the project's current shape** — the existing site is entirely static. Adding build-time content sourcing is consistent with the current architecture.

2. **Deployment flexibility** — stays deployable to Vercel via `next build`. No server required.

3. **Version-controllable** — if the vault or a subset of it lives in the repo (or is synced via git), every content change is traceable. This aligns with the "openspec" artifact store mode ethos.

4. **Clean separation of concerns** — the existing `data-en-criollo` pages (episodes, plans, ROI calculator) can remain untouched while `/consultoria/*` routes serve markdown-driven content. Different layout, different styling, same app.

5. **Reusable workflow** — the vault-reader + markdown-pipeline + route-generator can be extracted into a shared module (e.g., `lib/vault-loader.ts`) that future projects import.

For the **reusable workflow**, structure it as:
```
vault-loader/                    # Could be extracted to a separate npm package
├── index.ts                     # Public API: loadVault(), parseMarkdown()
├── vault-reader.ts              # Crawls vault directory, returns file tree
├── obsidian-transforms.ts       # [[wikilink]] → next/link, ![[embed]] → Image
└── types.ts                     # VaultEntry, VaultPage, Frontmatter types
```

**Implementation sketch for reusability:**
```typescript
// lib/vault-loader.ts — the reusable core
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export interface VaultPage {
  slug: string
  frontmatter: Record<string, unknown>
  content: string
  html: string
}

export async function loadVaultPages(vaultPath: string, subdir?: string): Promise<VaultPage[]> {
  // 1. Walk vault directory
  // 2. Read .md files
  // 3. Parse frontmatter
  // 4. Convert markdown to HTML
  // 5. Resolve Obsidian wikilinks
  // 6. Return structured pages
}
```

This same `loadVaultPages()` function works for ANY project — just point it at a different vault path.

## Risks

- **Obsidian syntax incompatibility:** Obsidian uses non-standard markdown extensions (`[[wikilinks]]`, `![[embeds]]`, `#tags`, `%%comments%%`, dataview queries). Each needs a remark plugin or custom transformer. Without these, the rendered pages look broken.
- **Image handling gap:** Obsidian images are typically at `vault/assets/` or similar. They need to resolve correctly in the Next.js public directory. A custom build script or symlink strategy is needed.
- **Frontmatter consistency:** Without a schema, different team members (or future self) might write inconsistent frontmatter. A validation step in the loader (with Zod or similar) mitigates this.
- **Path traversal:** If Approach 2 (runtime) is ever used, path traversal via `../` in the slug is a real security concern.
- **Change scope creep:** The consultancy landing page could balloon into a full multi-page site. The first pass MUST define a strict boundary: "One landing page with sub-pages for services and about."
- **Visual identity clash:** The existing CRT/retro aesthetic is strong and opinionated. A consultancy landing page likely needs a cleaner, more professional tone. Design decisions need to be made about whether to share the design system or create a separate one.
- **Build-time vault access:** In CI (Vercel deploys), the vault directory won't exist. You'll need either (a) commit the relevant markdown to the repo, or (b) add a CI step to clone/pull the vault, or (c) use a submodule.

## Ready for Proposal

**Yes.** The exploration is sufficient to proceed to the proposal phase.

**What the orchestrator should tell the user:**
- The project currently has zero content-management plumbing — all data is hardcoded TS
- Recommended approach is **build-time markdown import** using `gray-matter` + `remark`/`rehype`
- A reusable `vault-loader` module can be designed that works across future projects
- The biggest unknown is how the Obsidian vault is structured and where it lives — this must be clarified before spec/design
- Need to decide: **separate design system** for consultancy pages vs. extending the existing CRT aesthetic
- The change is additive: existing pages stay untouched, consultancy lives under `/consultoria/*` routes
