# The SEO Playbook

**A portable guide to search-friendly web apps: philosophy first, then the details.**
Code samples use Next.js App Router + TypeScript, but the principles apply to any framework. Blocks marked **Example** show each idea applied to a made-up site (a shop, a recipe site, a job board).

\---

## 1\. The mental model

Search engines do six things to a page. Every SEO fix belongs to one of them.

```
DISCOVER ──► CRAWL ──► RENDER ──► INDEX ──► RANK ──► CLICK
find URL     fetch     run JS,    store it   order    win the
             HTML      see text                        human
```

|Step|Your levers|
|-|-|
|Discover|internal links, `sitemap.xml`|
|Crawl|`robots.txt`, status codes, speed|
|Render|content present in the first HTML|
|Index|`canonical`, `noindex`, quality|
|Rank|titles, headings, structured data, speed|
|Click|title, description, social card|

> \[!TIP]
> Page not showing up → \*discover / crawl / index\* problem. Shows up but no clicks → \*click\* problem. Different fixes.

\---

## 2\. Philosophy: 12 principles

### 1\. Index what has public value; hide the rest

Split the app into the **public surface** (things a stranger would search for) and the **private app** (dashboards, settings, auth). Only the first gets indexed.

> \*\*Example\*\* — a recipe site indexes its home page, category pages and every published recipe. `/account`, `/checkout`, `/admin` and `/login` are `noindex`.

### 2\. `noindex` is the control; `robots.txt` only limits crawling

A `Disallow`ed URL can still appear in results if others link to it. To stay out of the index a page must be fetchable *and* say `noindex`. Use both on private areas.

> \*\*Example\*\* — `/dashboard` sets `<meta name="robots" content="noindex">` in its layout \*\*and\*\* has `Disallow: /dashboard` in `robots.txt`. The `noindex` is what actually keeps it out of results.

### 3\. Put the real content in the first HTML

Crawlers run JavaScript late and unreliably. A spinner is an empty page to them. Fetch on the server, render, then hydrate.

> \*\*Example\*\* — a product page returns the name, price and description in the HTML response, and the gallery and "Add to cart" button hydrate afterwards. View Source shows the product, not a spinner.

### 4\. One thing = one canonical URL

Duplicates (IDs vs slugs, query params, `www`, trailing slashes) split ranking. Use readable slugs and a `canonical` on every indexable page, built from the record, not the request.

> \*\*Example\*\* — `/products/42`, `/products/42?ref=email` and `/products/blue-kettle` are the same product, and all three declare the canonical `https://shop.example/products/blue-kettle`.

### 5\. URLs are promises

Renaming copy is free; renaming a URL loses rankings unless you 301 and update everything that mentions it.

> \*\*Example\*\* — a shop renames "Gadgets" to "Electronics" in its navigation. `/gadgets` keeps working (or 301s to `/electronics`), and the sitemap, canonicals and breadcrumbs change together.

### 6\. Publish only what is real and approved

Drafts, unapproved and inactive records never reach the sitemap, directories or structured data. Empty fields are omitted, never faked.

> \*\*Example\*\* — a job board lists only jobs with `status = published` and a future `expiresAt`. Drafts and expired jobs are left out of the listing, the sitemap and the JSON-LD.

### 7\. Structured data mirrors the page

JSON-LD is a machine-readable copy of what a visitor sees, built from the same data. Not visible on the page → not in the markup.

> \*\*Example\*\* — a recipe page's `Recipe` JSON-LD carries the same title, ingredients and cook time that are shown on screen, and no `aggregateRating` unless real reviews are displayed.

### 8\. Anything a public page receives is public

Server-rendered frameworks serialise props into the page source. "Hidden in the UI" isn't hidden. Strip sensitive fields on the server.

> \*\*Example\*\* — a listing has a `contactEmail` and a `couponCode`. The server component drops both and passes `hasCoupon: true`, and the client fetches the code after sign-in.

### 9\. User-written text is unpredictable and hostile

Expect 3-word bios, 4,000-word bios and `</script>` in names. Every derived SEO field needs **truncation, a quality gate with a fallback, and escaping.**

> \*\*Example\*\* — a seller called `</script><script>alert(1)</script>` is harmless because the JSON-LD is escaped; a 90-character shop name is shortened to fit the title; a one-word bio is replaced by "Blue Kettle Co. on Acme Shop."

### 10\. Say the region out loud

Tell the engine who the page is for in every layer: `lang`, OG locale, address country, domain, and copy.

> \*\*Example\*\* — a UK-only shop uses `lang="en-GB"`, `og:locale en\_GB`, `priceCurrency: "GBP"`, `addressCountry: "GB"` and a `.co.uk` domain.

### 11\. Environment-scoped indexing, on purpose

Staging must never be indexed; production must never be accidentally blocked. Make the switch explicit, commented, and guarded against cross-environment merges.

> \*\*Example\*\* — `staging.example.com` sends `X-Robots-Tag: noindex, nofollow` and `Disallow: /`; `example.com` sends neither. The release checklist includes a `curl -sI` check on prod.

### 12\. Be honest

Descriptions, markup and machine-readable summaries should describe what the product does **today**. Search engines and AI assistants repeat your claims.

> \*\*Example\*\* — "Gift cards" launch next quarter, so they stay out of the meta description, JSON-LD and `llms.txt` until they are live.

\---

## 3\. Decide what to index (before writing code)

|Page kind|Index|Sitemap|Structured data|
|-|:-:|:-:|-|
|Home|Yes|Yes|`Organization`, `WebSite`|
|Directory / section index|Yes|Yes|`BreadcrumbList`, `ItemList`|
|**Entity detail** (profile / listing / product)|Yes|Yes|`BreadcrumbList` + specific type|
|Content, legal|Yes|Yes|`Article` / `FAQPage`|
|Filters, sort, pagination, `?tab=`|No (canonical → base page)|No|—|
|Redirect-only URLs|No|No|—|
|Auth, dashboards, settings, admin, 404|No (`noindex`)|No|—|

> \*\*Example\*\* — `/search?q=kettle`, `/products?sort=price` and `/products?page=2` canonicalise to `/products` and stay out of the sitemap. A redirecting `/old-sale` isn't listed either.

\---

## 4\. The building blocks

### 4.1 Indexing controls

|Tool|Stops crawling|Stops indexing|Use for|
|-|:-:|:-:|-|
|`robots.txt` `Disallow`|Yes|No|crawl budget on private areas|
|`<meta robots noindex>`|No|Yes|per-page / per-layout|
|`X-Robots-Tag` header|No|Yes|sitewide blocks, non-HTML|

* Private areas: `noindex` **and** `Disallow`.
* Set `noindex` once in a **route-group layout** so new pages inherit it.
* Scope `Disallow` narrowly: `/user/settings`, not `/user` (which would also block `/users`).

```ts
// app/(private)/layout.tsx
export const metadata: Metadata = { robots: { index: false, follow: false } };
```

> \*\*Example\*\* — `Disallow: /admin` is safe. `Disallow: /a` would also block `/about` and `/artists`, so scope every rule to the full private path.

### 4.2 Canonical URLs \& slugs

* Slugs: lowercase, hyphenated, stable, unique. Don't change on rename without a 301.
* Canonical comes from `record.slug`, never the incoming URL.
* One `SITE\_URL` in one file; everything derives from it.

```ts
export const SITE\_URL = (process.env.NEXT\_PUBLIC\_SITE\_URL ?? 'https://example.com').replace(/\\/$/, '');
export const absoluteUrl = (p: string) => `${SITE\_URL}${p.startsWith('/') ? p : `/${p}`}`;
// layout: metadataBase: new URL(SITE\_URL)   → makes relative canonicals/OG absolute
```

> \[!WARNING]
> `NEXT\_PUBLIC\_\*` is inlined at \*\*build\*\* time. Set it in the build environment.

> \*\*Example\*\* — one `lib/site.ts` exports `SITE\_URL = 'https://shop.example'`. Every canonical, sitemap entry and JSON-LD URL is built with `absoluteUrl('/products/blue-kettle')`.

### 4.3 Titles

* ≈ 50–60 chars total, unique per page, specific thing first, brand last.
* Use a **template** for the brand suffix; budget for it (a 12-character ` | Acme Shop` suffix leaves about 45 characters for the name).
* Home is the exception (`title: { absolute: … }`).
* The template applies to `<title>` only. Write the brand into OG/Twitter titles yourself.

```ts
title: { default: 'Acme', template: '%s | Acme' }
```

> \*\*Example\*\* — `Blue Kettle | Acme Shop` for a product; the home page is `Acme Shop | Kitchenware delivered in 24 hours`.

### 4.4 Meta descriptions

* ≈ 120–155 chars, one benefit-led sentence, unique, cut at a word boundary.
* User content goes through a **quality gate**: use a bio only if long enough; else a generated fallback (`"{name} on Acme."`).

> \*\*Example\*\* — a seller bio of "Hi" is too short, so the description becomes "Blue Kettle Co. on Acme Shop."; a 400-character bio is cut at a word boundary near 150 characters and ends with `…`.

### 4.5 Social cards (Open Graph / Twitter)

* `og:title` / `twitter:title` include the brand; `og:url` = canonical; `twitter:card = summary\_large\_image`; `og:locale` set.
* `og:image`: **1200×630 PNG/JPG. SVG doesn't work** on Facebook, LinkedIn or X.
* Every page needs a fallback (a generated sitewide card); entity pages override with their own image. Images only, never video/PDF.

> \*\*Example\*\* — a product page uses its main photo as `og:image`; a category page with no photo uses the generated 1200×630 site card.

### 4.6 Structured data (JSON-LD)

|Page|Type|
|-|-|
|Home|`Organization` + `WebSite` (`@graph`)|
|Below home|`BreadcrumbList`|
|Directory|`ItemList`|
|Person / creator|`Person`, `Organization`|
|Shop, restaurant, office|`LocalBusiness` subtype, `Place`|
|Company|`Organization` (`LocalBusiness` if it has a location)|
|Product / article / FAQ|`Product`, `Article`, `FAQPage`|

Rules: most specific *honest* type · same data as the page · omit missing fields · absolute URLs · `sameAs` = real profiles only (no emails) · never add ratings/prices you don't show · **always escape**.

```tsx
const serialize = (d: object) => JSON.stringify(d)
  .replace(/</g, '\\\\u003c').replace(/>/g, '\\\\u003e').replace(/\&/g, '\\\\u0026')
  .replace(/\\u2028/g, '\\\\u2028').replace(/\\u2029/g, '\\\\u2029');   // JSON.stringify doesn't escape "<"

export const JsonLd = ({ data }: { data: object }) =>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ \_\_html: serialize(data) }} />;
```

> \*\*Example\*\* — product page: `BreadcrumbList` + `Product`. Recipe: `Recipe`. Shop location: `LocalBusiness`. Blog post: `Article`. Category page: `ItemList`.

### 4.7 Sitemap

* Only canonical, indexable, HTTP-200 URLs. No redirects, `noindex`, private pages or query variants.
* Every entity, paged through the API; approved/active only; absolute URLs.
* Regenerate on a schedule so new records appear without a deploy.
* Real `lastModified` if you have it. Over 50,000 URLs: split into a sitemap index.
* Reference it from `robots.txt` (prod only).

```ts
export const revalidate = 3600;        // otherwise frozen at build time
// known total → fetch page 1, then Promise.all the rest
// no total   → page sequentially until a short page comes back
```

> \*\*Example\*\* — a shop with 12,000 products pages its API 100 at a time, keeps only `status = active`, and revalidates hourly so new products appear without a redeploy.

### 4.8 Rendering strategy

```
Server component                     Client component
1. fetch data              ──►       receives `initialData`, renders full content
2. generateMetadata (same data)      handles filters / search / favourites
3. emit JSON-LD (same data)          refetches only on interaction
```

* Give lists a `revalidate` window (short for lists, longer for home/sitemap).
* Use identical query params on server and client so the server result seeds the cache exactly.
* Dedupe: `generateMetadata` and the page share one memoised `fetch`.

> \*\*Example\*\* — a category page server-fetches page 1 (24 items) and passes it as `initialData`. The client's "Load more" then fetches page 2 with the same query parameters.

### 4.9 Headings, links \& internal linking

* **One `<h1>`** per page; logical `h2 → h3`.
* Use real `<a href>` / `<Link>`. Crawlers don't follow `onClick` + `router.push`.
* Link down (home → directory → entity) and up (breadcrumbs). Every indexable page within \~3 clicks of home.
* Descriptive anchor text; cross-link related entities.

> \*\*Example\*\* — product cards are `<Link href="/products/blue-kettle">`, not `<div onClick>`. The page has one `<h1>` (the product name) and the breadcrumb Home › Kitchen › Kettles.

### 4.10 Images

* Use the framework image component (lazy loading, `sizes`, modern formats, no layout shift).
* `alt` describes the image ("Blue enamel kettle, front view"); decorative → `alt=""`.
* Above-the-fold hero: eager/`priority`; give explicit dimensions.
* Allow-list remote hosts **explicitly** (`remotePatterns`), never a bare wildcard (SSRF).

> \*\*Example\*\* — the hero is `<Image src=… alt="Blue enamel kettle, front view" priority />` with fixed dimensions, the rest of the gallery lazy-loads, and `remotePatterns` lists only `cdn.example.com`.

### 4.11 Locale \& region

|Layer|Example|
|-|-|
|`<html lang>`|`en-GB`|
|Open Graph|`og:locale = en\_GB`|
|Structured data|`addressCountry: 'GB'`, `areaServed: 'GB'`|
|Domain, copy, spelling, currency|`.co.uk`, "colour", GBP|

Multi-region sites also need `hreflang` alternates.

> \*\*Example\*\* — a UK shop uses `en-GB`, writes "colour" and "postcode", shows prices in GBP, and declares `addressCountry: "GB"` in its business JSON-LD.

### 4.12 Environments

> \[!CAUTION]
> The two worst incidents: staging gets indexed, or production ships with staging's `noindex` still on.

|Layer|Non-prod|Prod|
|-|-|-|
|`X-Robots-Tag` header|`noindex, nofollow`|absent|
|`robots.txt`|`Disallow: /`, no sitemap|scoped rules + `sitemap:`|

* Drive it from an env var or per-branch config, comment *why*, and add `curl -sI <prod> | grep -i x-robots-tag` (must be empty) to the release checklist.
* `noindex` is polite, not secure. Password-protect staging if it must stay private.

> \*\*Example\*\* — a `DEPLOY\_ENV` variable adds the `noindex` header on staging only, and a CI step fails the production deploy if that header is present.

### 4.13 Privacy inside public pages

```
API ──► server component ──► STRIP sensitive fields ──► client component
                              (emails, codes, notes, unapproved data)
```

* Strip on the server before passing props; pass booleans (`hasCoupon`) where the UI only needs existence.
* Fetch the sensitive value client-side after auth.
* Hiding in the page is defence in depth only; real protection is API access control.

> \*\*Example\*\* — a classifieds ad page strips `ownerPhone` and `moderationNotes` on the server and shows a "Show phone" button that calls an authenticated endpoint.

### 4.14 Errors, redirects \& 404s

|Situation|Behaviour|
|-|-|
|Record missing / unapproved|real **404** (`notFound()`) + `noindex`|
|Slug or section moved|**301**, then update sitemap, canonicals, JSON-LD, `llms.txt`|
|Temporary legacy redirect|keep out of the sitemap|
|Server error|5xx, never a friendly page with 200|

> \*\*Example\*\* — `/products/discontinued-item` returns 404 with `noindex`; a renamed product slug 301s to the new URL; `/blog?draft=1` never reaches the sitemap.

### 4.15 AI crawlers (`llms.txt`)

A short factual Markdown summary at `/llms.txt`: one-line description, audiences, main pages, URL patterns. Keep it current and say what is *not yet live*. Decide your AI-training stance deliberately (`ai.txt` or robots rules).

> \*\*Example\*\* — `/llms.txt` holds `# Acme Shop`, a one-line description ("Online kitchenware store shipping across the UK."), a list of main pages, and a note that gift cards are coming soon and shouldn't be described as available.

### 4.16 Performance

|Metric|Target|Usual fixes|
|-|-|-|
|LCP|≤ 2.5 s|server-render content, hero `priority`, CDN, font preload|
|CLS|≤ 0.1|image dimensions, reserved space, `font-display: swap`|
|INP|≤ 200 ms|less client JS; push `"use client"` to small leaves|

Measure real-user data in Search Console after launch, not just Lighthouse.

> \*\*Example\*\* — self-hosted fonts with `display: swap`, a `priority` hero image with fixed dimensions, and only the cart widget shipped as client-side JavaScript.

\---

## 5\. Launch checklist

* \[ ] Wrote down which page kinds are indexed vs not (§3); public URLs are slugs
* \[ ] Root metadata: `metadataBase`, title template, `lang`, OG locale
* \[ ] Every indexable page: unique title + description + canonical + OG image (fallback exists)
* \[ ] `robots.txt` (prod) allows public, disallows private, lists the sitemap; private groups are `noindex`
* \[ ] Sitemap covers all approved entities and revalidates
* \[ ] JSON-LD present, escaped, honest; one `<h1>` and real `<a href>` links per page
* \[ ] Missing records return a real 404
* \[ ] No private data in page source
* \[ ] Non-prod blocked, **prod not blocked** (`curl -sI`); base-URL var set at build
* \[ ] After go-live: verify in Search Console, submit sitemap, inspect a few URLs

## 6\. How to verify

```bash
curl -sI https://example.com/ | grep -i x-robots-tag              # prod: empty
curl -s  https://example.com/robots.txt
curl -s  https://example.com/sitemap.xml | head -40
curl -s  https://example.com/things/a-slug | grep -E '<title>|rel="canonical"|og:image|ld\\+json|<h1'
curl -s  https://example.com/things/a-slug | grep -i -E 'secret|couponCode|mailto:'   # expect nothing
curl -sI https://example.com/things/does-not-exist | head -1      # expect 404
```

Tools: **Search Console** (indexing, sitemap, Web Vitals, URL Inspection) · **Rich Results Test** (JSON-LD) · social card debuggers · **Lighthouse** · **View Source** (not DevTools Elements: it shows what a crawler gets first).

\---

## 7\. Anti-patterns

|Don't|Do|
|-|-|
|Rely on `robots.txt` to hide a page|`noindex` + `Disallow`|
|Render a spinner, fetch on the client|Server-fetch, pass `initialData`|
|Use IDs/UUIDs in public URLs|Stable slugs|
|Build canonical from the request URL|Build it from `record.slug`|
|Put filters/tabs/redirects in the sitemap|Canonical URLs only|
|SVG as `og:image`|1200×630 PNG/JPG + generated fallback|
|User text straight into title/description|Truncate, gate, fall back|
|Raw JSON-LD `<script>` with user data|One escaping `<JsonLd>` component|
|Invent ratings, prices, phones|Omit missing fields|
|"Hide" secrets in the UI only|Strip on the server|
|`onClick` navigation|Real `<a href>`|
|HTTP 200 for "not found"|Real 404 + `noindex`|
|Rename a URL with no redirect|301 + update everything|
|Hard-code the domain|One `SITE\_URL`|
|Advertise features that aren't live|Describe what exists today|



