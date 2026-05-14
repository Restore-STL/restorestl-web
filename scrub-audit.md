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
