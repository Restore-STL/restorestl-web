# Scrub Audit — restorestl-web

Pre-handoff scrub of Chris-personal references. Part of TICKET-189 (RSTL site handoff to Kevin).

## Scope

Every file searched: all tracked files in this repo with extensions `.tsx .ts .jsx .js .json .md .mdx .html .css .yml .yaml .txt .xml .env*`, excluding `node_modules/`, `.next/`, `.git/`, and `design-ref/` (local design scratch).

## Grep commands run (re-runnable for verification)

```bash
# Chris-personal name variants
grep -rniE "chris|okeefe|o'keefe|o’keefe" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" \
  --include="*.json" --include="*.md" --include="*.mdx" --include="*.html" --include="*.css" \
  --include="*.yml" --include="*.yaml" --include="*.env*" --include="*.txt" --include="*.xml" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref

# Email addresses
grep -rEho "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" --include="*.tsx" --include="*.ts" \
  --include="*.json" --include="*.md" --include="*.html" --include="*.txt" --include="*.env*" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref | sort -u

# Phone numbers
grep -rEhn "(\([0-9]{3}\)[ -]?[0-9]{3}[ -]?[0-9]{4}|tel:[+0-9 ()-]+)" \
  --include="*.tsx" --include="*.ts" --include="*.json" --include="*.md" --include="*.html" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref

# Author meta + JSON-LD
grep -rniE "\"author\"|name=\"author\"|og:author|twitter:creator|application/ld\\+json" \
  --include="*.tsx" --include="*.ts" --include="*.json" --include="*.html" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref

# Webhook / form endpoints
grep -rniE "hook\.us[0-9]*\.make\.com|hooks\.zapier\.com|podio|tracerfy|reiskip|formspree|n8n\." \
  --include="*.tsx" --include="*.ts" --include="*.json" --include="*.md" --include="*.env*" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref

# Analytics IDs
grep -rEhn "G-[A-Z0-9]{8,}|GTM-[A-Z0-9]+|UA-[0-9]+-[0-9]+" \
  --include="*.tsx" --include="*.ts" --include="*.json" --include="*.html" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref
```

## Matches found and actions taken

### Chris-personal name / photo references — REMOVED

| Location | Original | Action |
|---|---|---|
| `app/about/page.tsx` lines 33–43 | Chris O’Keefe entry in `TEAM` array (initials, name, role, description, photo src/alt) | **Removed.** Team array now contains Kevin only. |
| `app/about/page.tsx` line 89 (was) | `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">` | **Updated** to `grid-cols-1 gap-8 max-w-md mx-auto` to center the single remaining card. |
| `app/join/page.tsx` line 435 | "After you submit, Kevin and Chris will schedule a short call…" | **Updated** to "Kevin will schedule a short call". |
| `app/join/page.tsx` line 611 | `title: 'Kevin and Chris review your profile'` | **Updated** to `'Kevin reviews your profile'`. |
| `public/team/chris-okeefe.jpg` | Chris's headshot asset | **Deleted** via `git rm`. |

### Emails — KEPT (none Chris-personal)

| Match | Location | Action |
|---|---|---|
| `help@restorestl.com` | Various contact CTAs | **Kept** — routes to the Restore STL business inbox; transfers with the brand. |
| `kevin@restorestl.com` | Contact CTAs | **Kept** — Kevin's own address. |
| `you@company.com`, `you@email.com` | Form placeholder strings | **Kept** — generic placeholders, not real addresses. |

### Phone numbers — KEPT (none Chris-personal)

- `(314) 736-3311` (multiple locations, including JSON-LD `telephone` in `app/page.tsx:25`) — Kevin's business line.
- Form placeholders like `(314) 555-0000` and `(314) 555-1234` — fake demo numbers.

### Author meta / JSON-LD — VERIFIED CLEAN

- `app/page.tsx:13` — `application/ld+json` `LocalBusiness` schema. `name: "Restore STL"`, no Person/author field. Clean.
- `app/blog/[slug]/page.tsx:84` — `BlogPosting` schema. `author: { "@type": "Organization", name: fm.author, ... }`. The `fm.author` value comes from MDX frontmatter; the only blog post (`content/blog/placeholder.mdx:4`) sets `author: "Restore STL"`. Clean.
- `app/blog/[slug]/page.tsx:50` — Open Graph `authors: [fm.author]` — same source, "Restore STL". Clean.
- `app/blog/rss.xml/route.ts` — does not emit author fields. Clean.

### Webhook / form endpoints — NONE FOUND

- `app/api/newsletter/route.ts` is a stub that only `console.log`s — no external endpoint, no Chris-personal address.
- No Make, Zapier, Podio, Tracerfy, REISkip, Formspree, or n8n endpoints found in tracked code.

### Analytics IDs — FLAGGED FOR KEVIN/CHRIS REVIEW (not changed)

| ID | Location | Note |
|---|---|---|
| `GTM-M7DX6C4X` | `app/layout.tsx:75, 81`; `app/components/wmhw/WMHWWidget.tsx:15` (comment) | GTM container shared across all three RSTL sites. **Action item for Chris before handoff:** confirm whose Google Tag Manager account hosts this container. If it's Chris's, either swap to Kevin's container or transfer container ownership in GTM. |
| `G-KMKSDK02X9` | `app/components/wmhw/WMHWWidget.tsx:16` (comment only) | GA4 property ID. Same question — verify GA account ownership. |

These IDs are not Chris's *name*, so they don't violate the literal "personal references" scrub criterion, but the ticket says to "verify whose GA, GTM, etc." — that verification has to happen in the GA/GTM admin UIs, not from code.

### Third-party widgets — FLAGGED

- `.env.local` (gitignored, **NOT committed**) contains `NEXT_PUBLIC_CRISP_WEBSITE_ID=6e4f9378-1d2f-4f43-a4b5-55821ecbdbe0`. Same verification question as above — confirm whose Crisp Chat account owns this widget ID before handoff. Since the value is in `.env.local` and not in tracked source, no code change is needed; Kevin will set his own value in his own Vercel env after transfer.

### `.env` files

- `.env.local` exists locally, is matched by `.env*` in `.gitignore` line 34, and is **not tracked**. Confirmed via `git ls-files .env.local` (empty).
- No `.env.example` present.

### README / package.json / footer / copyright

- `README.md` — default `create-next-app` boilerplate. No Chris references.
- `package.json` — no `author` field.
- `app/components/Footer.tsx` — copyright reads "Restore STL © {year}". No Chris references.
- No `public/robots.txt`, `public/sitemap.xml`, or `public/humans.txt` present.

## Out of scope (intentionally left)

- `.claude/` (untracked, local agent config) — not committed.
- `design-ref/` (untracked local design scratch) — not committed.
- Git history — per ticket, history is left intact; Kevin can squash post-transfer if he wants.
- Restore-STL org name itself — Kevin's call post-transfer.

## Re-verification

After this PR is merged, re-run any of the grep commands above on `main`. The Chris/Okeefe grep should return zero hits across all `.tsx/.ts/.md` files (it may still match this `scrub-audit.md` itself — that's expected; the audit file is a record, not user-facing content).

---

## Phase 1.5 changes (2026-05-14) — Backend dependency cut & tracking strip

Phase 1.5 of TICKET-189 — removes GTM/GA loading, all contact forms that POST to Chris's Cloud Run backend, and the blog surface.

### Grep commands run (re-runnable for Phase-1.5 verification)

```bash
# GTM / GA / dataLayer
grep -rniE "googletagmanager|GTM-|G-KMKSDK|gtm\.js|dataLayer" \
  --include="*.tsx" --include="*.ts" --include="*.json" --include="*.html" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref

# Backend API env vars + endpoints
grep -rniE "NEXT_PUBLIC_API_URL|NEXT_PUBLIC_API_KEY|NEXT_PUBLIC_RESTORESTL|X-API-Key|/api/leads/|/api/buyers/|/api/capital-partners/|/api/valuation" \
  --include="*.tsx" --include="*.ts" --include="*.json" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref

# Blog surface
grep -rn "/blog\b|app/blog|content/blog|next-mdx-remote|gray-matter|reading-time|@mdx-js|@next/mdx|remark-gfm|rehype-" \
  --include="*.tsx" --include="*.ts" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref
```

All three return only the audit doc itself (zero non-audit hits) after Phase 1.5.

### 1. GTM / GA strip — REMOVED

| Location | Action |
|---|---|
| `app/layout.tsx` | Removed the inline `<Script id="gtm-script">` block (the `(function(w,d,s,l,i){...})(...,'GTM-M7DX6C4X')` injection) **and** the `<noscript><iframe src="googletagmanager.com/ns.html?id=GTM-M7DX6C4X" />` fallback. Also removed the `import Script from "next/script"` line that became unused. |
| `app/components/wmhw/WMHWWidget.tsx` | Entire file rewritten (see §3 below); the GTM/GA4 comment header (`GTM Container: GTM-M7DX6C4X` / `GA4 Property: G-KMKSDK02X9`) is gone with it. |
| `app/components/book/GoogleCalendarEmbed.tsx` | Removed the `useEffect` that pushed `{ event: 'book_page_viewed' }` to `window.dataLayer`. The component is now a pure server-renderable iframe wrapper. |
| `app/book/confirmed/BookingConfirmedClient.tsx` | **Deleted.** The component only existed to push `{ event: 'booking_completed' }` to `window.dataLayer`. With GTM gone, it had no purpose. Its caller in `app/book/confirmed/page.tsx` was updated to drop the import and render. |

No `app/lib/tracking.ts` exists in this repo, so no tracking-module gate or deletion was needed.

### 2. Contact-form rip-and-replace — REMOVED + REPLACED

The ticket asked to "Remove the form component file entirely" + "Replace each render site with a phone-CTA card". `restorestl-web` had no separate `ContactModal` component; the forms were inline in three places. Strategy chosen: rewrite each form-bearing surface so the file location stays put and render sites are untouched.

| Location | Original | Action |
|---|---|---|
| `app/components/wmhw/WMHWWidget.tsx` (~470 lines) | "What's My Home Worth" multi-step widget — Google Places autocomplete → POST `/api/valuation` → condition selection → POST `/api/leads/wmhw` (X-API-Key) | **Rewritten** as a ~20-line phone-CTA card. Default export preserved, so render sites in `app/components/BrandStatement.tsx` (homepage) and `app/components/sell/WMHWSection.tsx` (sell page) work unchanged. New copy: "Get your numbers, straight from Kevin." + `tel:+13147363311` button. |
| `app/join/page.tsx` (~660 lines) | Multi-step buyer-profile wizard — POST `/api/buyers/submit` (X-API-Key) | **Rewritten** as a single-section landing page. New copy: "Join the Buyers List" hero + phone-CTA card. Page now uses site `Navigation` + `Footer` (previously full-screen wizard had no site chrome). |
| `app/capital/page.tsx` (~680 lines) | Multi-step capital-partner inquiry wizard — POST `/api/capital-partners/submit` (X-API-Key) | **Rewritten** as a single-section landing page. New copy: "Lend on Real Deals" hero + phone-CTA card. Page now uses site `Navigation` + `Footer`. |

`NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_RESTORESTL` (API key), and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env-var reads — all removed from source. The Cloud Run backend URL no longer appears anywhere in committed code.

### 3. Blog removal — DELETED

| Path | Action |
|---|---|
| `app/blog/` (entire directory: `page.tsx`, `[slug]/page.tsx`, `rss.xml/route.ts`) | **Deleted** via `git rm -r`. |
| `content/blog/placeholder.mdx` | **Deleted.** The only blog post was a placeholder. |
| `app/components/blog/` (9 files: HOLCGradeBadge, MDXComponents, NeighborhoodCard, NewsletterBand, PillarBadge, PostMeta, PullQuote, SourceCitation, TopicExplorer) | **Deleted** — all blog-only components. |
| `app/lib/blog.ts`, `app/lib/blog-types.ts`, `app/lib/knowledge-client.ts` | **Deleted** — used only by blog files (verified via grep). |
| `app/api/newsletter/route.ts` | **Deleted** — only invoked by `NewsletterBand` (blog-only). The route was a stub that `console.log`'d; no real subscribers to migrate. |
| `public/blog/placeholder-hero.svg` | **Deleted** along with the rest. |
| `app/components/Navigation.tsx` | Removed the two `<Link href="/blog">Blog</Link>` entries (one desktop, one mobile). |
| `app/sitemap.ts` | Removed `getAllPosts` import and the `/blog` + per-post URL entries. |
| `next.config.ts` | **Added** `/blog` → `/` and `/blog/:path*` → `/` permanent redirects so inbound links don't 404. |
| `package.json` | Removed blog/MDX deps: `@mdx-js/loader`, `@mdx-js/react`, `@next/mdx`, `gray-matter`, `next-mdx-remote`, `reading-time`, `rehype-autolink-headings`, `rehype-slug`, `remark-gfm`. Verified zero remaining imports of any of these. `package-lock.json` regenerated (`npm install` removed 149 packages). |

### 4. Typecheck

After all edits, `npx tsc --noEmit` (with `.next/` cleared) returns zero errors. Vercel build will exercise the production compile path.

### Phase-1.5 acceptance checklist for Chris on Vercel preview

(matches the list in the ticket §"Post-Phase-1.5 acceptance checks")

- [ ] View Source on `/`, `/about`, `/sell`, `/join`, `/capital`, `/book`, `/book/confirmed`: no `googletagmanager.com`, no `gtm.js`, no `GTM-`, no `G-` strings.
- [ ] `/` homepage: WMHW section now shows the phone-CTA card (no address autocomplete, no condition selector).
- [ ] `/join` and `/capital`: pages are short single-section landings with the phone-CTA card; no multi-step wizard.
- [ ] Click the phone CTA on any of the above — confirms `tel:+13147363311`.
- [ ] Visit `/blog` and `/blog/anything` — both should 301 to `/`.
- [ ] Navigation no longer shows a "Blog" link (desktop or mobile).
- [ ] No console errors on initial page load.

### What this phase did NOT touch

- `app/components/book/GoogleCalendarEmbed.tsx` still embeds Kevin's Google Calendar booking iframe. Booking flow itself is unchanged — only the `dataLayer.push` GTM event was removed.
- `app/api/newsletter/route.ts` removal was incidental to blog removal; the route was internal-only and not a backend dependency.
- `google-maps.d.ts` (typing reference for Google Maps API) was left in place. It's no longer used after the WMHWWidget rewrite, but it's a 10-line type stub with no Chris/GTM/form/blog content. Cleanup is out of scope for this phase.

---

## Phase 1.6 changes (2026-05-14) — WMHW, /join, /capital removal

Phase 1.6 of TICKET-189 — removes the "What's My Home Worth" valuation widget and the `/join` (buyer-profile) and `/capital` (capital-partner) wizard pages. The Phase 1.5 rewrites of these surfaces were transitional placeholders; Phase 1.6 deletes the surfaces entirely. Pre-Phase-1.5 source is preserved outside this repo for future rebuild on STL Property Review / Keystone (see Archive section below).

### Archive (outside this repo)

Pre-deletion source extracted from commit `8b8e9463f64817803c03b2986f46de82993c0fb8` (the Phase 1 commit — last state where the original wizards existed) and written to:

```
~/Dev/projects/restorestl-agent-platform-main/_archive/rstl-baseline-2026-05-14/
├── README.md                    — top-level archive overview
├── wmhw/                        — WMHWWidget + WMHWSection + google-maps.d.ts (~982 lines)
│   └── README.md                — data contract (POST /api/valuation, POST /api/leads/wmhw), flow, deps
├── join/                        — buyer-profile wizard (page + layout, ~700 lines)
│   └── README.md                — data contract (POST /api/buyers/submit), 5-step flow, deps
└── capital/                     — capital-partner wizard (page + layout, ~700 lines)
    └── README.md                — data contract (POST /api/capital-partners/submit), 4-step flow, deps
```

Archive is **untracked** in the platform repo. Per ticket §Step 0.6, it is a one-way reference copy Chris will place deliberately later. It does **not** appear in any RSTL repo commit.

### Grep commands run (re-runnable for Phase-1.6 verification)

```bash
# Should return zero non-audit hits after Phase 1.6 (except the redirect rules in next.config.ts)
grep -rniE "wmhw|/join\b|/capital\b|buyer network|capital partner|join our buyer|become a capital|apply to join" \
  --include="*.tsx" --include="*.ts" --include="*.json" --include="*.html" --include="*.md" --include="*.mdx" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git --exclude-dir=design-ref \
  | grep -v "^scrub-audit.md:"
```

Result: only `next.config.ts` lines that define the `/join` and `/capital` redirect rules match — that's by design.

### 1. WMHW removal — DELETED

| Location | Action |
|---|---|
| `app/components/wmhw/WMHWWidget.tsx` | **Deleted** — the Phase-1.5 phone-CTA card that lived here is now gone. Its render sites (BrandStatement, WMHWSection) updated below. |
| `app/components/sell/WMHWSection.tsx` | **Deleted** — section wrapper used only on `/sell`. |
| `google-maps.d.ts` (repo root) | **Deleted** — Google Maps type stub used only by the original WMHW widget. Phase 1.5 had left it as dead code; cleaned up now. |
| `app/components/BrandStatement.tsx` | Removed the `import WMHWWidget from './wmhw/WMHWWidget'` and the surrounding "WMHW intro" `<div>` (the headline "Your home has value. You should know what it is." and its paragraph) plus the `<WMHWWidget />` render. Kept the mission body paragraph and the TIME / ENERGY / MONEY three-card grid. Removed the `mb-16` on the grid so the section ends cleanly on the cards. |
| `app/sell/page.tsx` | Removed the `import WMHWSection from '../components/sell/WMHWSection'` and the `<WMHWSection />` render. Did not touch metadata, headlines, or the "Time to Talk" CTA — page now flows Hero → TimeMoneyEnergy → TwoPathComparison → Sell CTA → Footer. |

### 2. /join and /capital removal — DELETED

| Location | Action |
|---|---|
| `app/join/` (entire directory: `page.tsx`, `layout.tsx`) | **Deleted** via `git rm -r`. |
| `app/capital/` (entire directory: `page.tsx`, `layout.tsx`) | **Deleted** via `git rm -r`. |
| `app/robots.ts` | Removed `/join` from the `disallow` array. The page no longer exists; the redirect (below) handles deindex naturally. `/book/confirmed` kept. |
| `next.config.ts` | Added four permanent (301) redirects: `/join` → `/`, `/join/:path*` → `/`, `/capital` → `/`, `/capital/:path*` → `/`. Coexist with the Phase-1.5 `/blog` redirects. |
| `app/sitemap.ts` | Already pruned in Phase 1.5 (does not include `/join` or `/capital`). Verified. |

### 3. Inbound links + CTA copy — VERIFIED CLEAN

| Surface | Result |
|---|---|
| `app/components/Navigation.tsx` (desktop + mobile) | No `/join` or `/capital` links. Verified via grep. |
| `app/components/Footer.tsx` | No `/join` or `/capital` links. Verified via grep. |
| `app/page.tsx` (homepage) | No `/join` or `/capital` links. Verified via grep. |
| CTA copy ("buyer network", "capital partner", "Become a", "Apply to join", "Join our buyer", "Investor Buy Box") | Zero non-audit hits. Verified via grep. |
| `app/about/page.tsx` line 234 ("Want to join our team?") | **Left as-is** — this is a careers CTA linked to `/book`, not a promotion of the deleted `/join` flow. The phrase "join our team" does not match the deleted-flow promotional copy patterns. |

### 4. Typecheck

After all edits, `npx tsc --noEmit` (with `.next/` cleared) returns zero errors.

### Phase-1.6 acceptance checklist for Chris on Vercel preview

(matches the list in the dispatch §"Visual acceptance checklist")

- [ ] Homepage `/` — Brand statement section ends on the TIME / ENERGY / MONEY three-card grid. No empty space, no hanging headline.
- [ ] `/sell` — flows Hero → TimeMoneyEnergy → TwoPathComparison → "Time to Talk" CTA → Footer. No empty section where WMHW used to be.
- [ ] `/join` → 301 redirect to `/`.
- [ ] `/capital` → 301 redirect to `/`.
- [ ] Navigation (desktop + mobile) — no `/join` or `/capital` links.
- [ ] Footer — no `/join` or `/capital` links.
- [ ] Homepage CTAs — no "join our buyer network" or "become a capital partner" copy.
- [ ] No console errors on initial page load.
- [ ] Build succeeds, deploy is green.

