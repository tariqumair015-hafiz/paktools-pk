# PakTools.pk — Build Plan

A free online tools site for Pakistan with 25 calculators, full SEO, AdSense slots, and dark mode.

## Stack note (important)
This project is **TanStack Start** (not plain Vite + React Router DOM). I'll keep the stack as-is — it gives you better SEO out of the box (SSR, per-route `head()` meta, real `<title>`/`<meta>` tags in the HTML). All tools will be pure client-side JS; only Currency & Prayer Times call public APIs.

## Routes (each is its own SEO page)
- `/` Home (hero, search, categories, popular, FAQ)
- `/about`, `/contact`, `/privacy`, `/disclaimer`, `/blog`
- Finance: `/gst-calculator`, `/income-tax-calculator`, `/loan-calculator`, `/currency-converter`, `/profit-loss-calculator`, `/discount-calculator`, `/salary-tax-calculator`, `/tip-calculator`
- Students: `/cgpa-calculator`, `/percentage-calculator`, `/age-calculator`, `/date-difference-calculator`, `/attendance-calculator`, `/gpa-to-percentage`, `/word-counter`, `/random-number-generator`, `/unit-converter`
- Daily Use: `/bmi-calculator`, `/password-generator`, `/zakat-calculator`, `/prayer-times`, `/hijri-date-converter`, `/electricity-bill-calculator`, `/fuel-cost-calculator`, `/calorie-calculator`
- `/sitemap.xml` (server route), `/robots.txt` (public file)

## Shared shell
- Header: PakTools logo (wrench icon), search bar (fuzzy filter over tool list), nav (Home, Finance, Students, Daily Use, Blog), dark-mode toggle
- Footer: About / Privacy / Contact / Disclaimer + copyright
- 4 ad-slot placeholder components (`<AdSlot variant="header|sidebar|below|mobile" />`) rendered with HTML comments so you can paste AdSense later
- GA4 placeholder script slot in `__root.tsx`

## Tool page template (reused for all 25)
Each tool route uses one `<ToolLayout>`:
1. H1 with tool name + "Pakistan / PKR"
2. Calculator UI (form + result)
3. AdSlot (below calculator)
4. H2 "How to use" + steps
5. H2 "Formula used"
6. ~150-word description
7. H2 "FAQ" (4 Q&A with FAQPage JSON-LD)
8. "Related tools" (3 internal links)
9. Per-route `head()` with unique title, meta description, canonical, OG tags, WebApplication JSON-LD

## SEO
- Per-route `head()` (TanStack Start native) — title, description, OG, canonical
- `WebApplication` + `FAQPage` JSON-LD on every tool
- `public/robots.txt` + `src/routes/sitemap[.]xml.ts` with all 31 URLs
- Semantic HTML, single H1, lazy-loaded icons, image alt text

## Design system (`src/styles.css`)
- Primary: deep green `oklch(~0.58 0.17 145)` (~#16a34a) + foreground white
- Surfaces: white / light-gray; dark mode tokens defined
- Font: Inter (Google Fonts)
- Tool card: clean shadow, hover lift, category-colored icon chip

## Tool logic highlights
- Income Tax: FBR 2024-25 salaried slabs (as specified)
- Electricity: WAPDA protected/unprotected slabs (1-100, 101-200, 201-300, 301-400, 401-500, 501-600, 601-700, 700+)
- Zakat: 2.5% on (gold value + silver value + cash + assets) above Nisab
- Currency: exchangerate-api.com open endpoint (`/v4/latest/PKR`)
- Prayer Times: aladhan.com `/timingsByCity` with `country=Pakistan`
- Hijri: aladhan.com `/gToH` and `/hToG`
- All others: pure formulas, offline

## File structure
```
src/
  components/
    layout/{Header,Footer,AdSlot,ToolLayout,ToolCard,SearchBar,ThemeToggle}.tsx
    tools/<one file per calculator>.tsx
  lib/
    tools-registry.ts   // single source of truth: id, slug, name, category, icon, description, keywords
    seo.ts              // head() helper for tool pages
    formulas.ts         // shared math (tax slabs, electricity slabs, etc.)
  routes/
    __root.tsx, index.tsx, about.tsx, contact.tsx, privacy.tsx, disclaimer.tsx, blog.tsx
    <slug>.tsx × 25
    sitemap[.]xml.ts
  styles.css            // green theme + dark mode
public/robots.txt
```

## Out of scope (can add later)
- Real AdSense + GA4 IDs (placeholders only, per your spec)
- Blog posts (page exists, empty)
- Backend / database (none needed)

I'll build this in one pass. Approve and I'll start.
