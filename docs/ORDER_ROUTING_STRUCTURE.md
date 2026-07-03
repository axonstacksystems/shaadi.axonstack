# Order Routing Structure

> Permanent URL scheme for **actual customer invitations** — each couple
> gets a lifelong-stable link that works forever, is theme-aware, and
> generates dynamic OG previews.

---

## §1 Problem Statement

Today every delivered order lives at `/{slug}` (e.g. `/siyad-faleela`).
This works but has three problems:

1. **No design context in the URL** — the link says nothing about which
   template or theme the couple chose.
2. **Flat namespace** — as the catalogue grows, slug collisions become
   likely and the root route gets crowded.
3. **No per-order theming** — a couple who picked *Petal Atelier* in
   *Amethyst Silver* can't share a link that reflects their palette.

We need a hierarchical, lifelong-stable URL scheme that:

- Never breaks once shared (backward-compatible forever).
- Encodes the design and theme the couple selected.
- Keeps the short, shareable `/{slug}` as a permanent redirect.
- Scales to hundreds of orders without code changes.
- Generates per-order OG images with the couple's names, date, and venue.

---

## §2 URL Hierarchy

```
shaadi.axonstack.in/
├── /                                    # Landing page
├── /designs                             # Gallery (all designs)
├── /designs/{design}                    # Design preview → redirects to default theme
├── /designs/{design}/{theme}            # Design preview with specific theme
├── /designs/{design}/{theme}/opengraph-image  # Design OG (dynamic)
│
├── /[slug]                             # ⚠ PERMANENT 308 redirect → /i/{design}/{theme}/{slug}
├── /i/[design]/[theme]/[slug]          # ✅ Canonical order URL (lifelong)
├── /i/[design]/[theme]/[slug]/opengraph-image  # Per-order OG (dynamic)
│
└── /faq, /pricing, etc.                 # App pages
```

### §2.1 Why `/i/` prefix?

| Concern | Answer |
|---|---|
| **Collision** | `/i/` reserves a clean namespace for invitations only. Design slugs like `petal-atelier` will never collide with app routes like `/pricing`. |
| **Brevity** | Single character — keeps URLs short enough to share on WhatsApp status. |
| **Semantics** | `i` = invitation. Obvious in context. |
| **SEO** | `/i/` routes are `noindex` (they're personal invitations, not landing pages). The gallery `/designs` is the indexable content. |

### §2.2 URL examples

| Order | Old URL | New canonical URL | Short URL still works? |
|---|---|---|---|
| Siyad & Faleela | `/siyad-faleela` | `/i/malabar-heritage/emerald-gold/siyad-faleela` | ✅ 308 redirect |
| Ashik & Abia | `/ashik-abiya` | `/i/noor-e-nikah/navy-gold/ashik-abiya` | ✅ 308 redirect |
| Demo Petal Atelier | `/demo-ivory-blush` | `/i/petal-atelier/ivory-blush/demo-ivory-blush` | ✅ 308 redirect |

---

## §3 Data Model

### §3.1 Extended `DeliveredOrder`

```ts
// src/data/delivered-orders.ts

export interface DeliveredOrder {
  slug: string;              // unchanged — globally unique human slug
  designSlug: string;        // RENAMED from templateSlug — which design (e.g. "petal-atelier")
  themeSlug: string;         // NEW: which theme the couple chose (e.g. "amethyst-silver")
  title: string;
  deliveredOn: string;
  // ... all existing fields stay the same
}
```

**Migration**: Rename `templateSlug` → `designSlug` (values already match
after Phase 1 — e.g. `"petal-atelier"`, `"malabar-heritage"`).
Add `themeSlug` to each entry, defaulting to the design's `defaultTheme`
from `design-registry.ts`.

No deprecated alias — the field is renamed in-place since all consumers
are in the same codebase and will be updated atomically in Phase A.

### §3.2 Order Registry (single source of truth)

```
src/data/
├── design-registry.ts      # Design + theme catalogue (gallery)
├── demo-orders.ts          # Demo orders for /designs/{design}/{theme}
└── delivered-orders.ts     # Real customer orders for /i/{design}/{theme}/{slug}
```

`delivered-orders.ts` remains the single source of truth for actual orders.
Each entry now carries `designSlug` + `themeSlug` so the route can resolve
both the component and the theme without a switch statement.

### §3.3 Selector Helpers

```ts
// src/data/delivered-orders.ts

export function getDeliveredOrder(
  designSlug: string,
  themeSlug: string,
  slug: string,
): DeliveredOrder | undefined { ... }

export function getDeliveredOrderBySlug(
  slug: string,
): DeliveredOrder | undefined { ... }  // for backward-compat redirect
```

### §3.4 Slug Uniqueness

`slug` must be **globally unique** across all orders — not per-design.
This prevents collisions when two couples share the same names.

**Convention**: `{groom}-{bride}` in lowercase, hyphenated.
If a collision occurs, append the year: `{groom}-{bride}-{year}`
(e.g. `rahman-zaira-2027`).

A build-time assertion enforces this:
```ts
const slugs = deliveredOrders.map(o => o.slug);
const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (duplicates.length) throw new Error(`Duplicate order slugs: ${duplicates}`);
```

---

## §4 Route Structure

```
src/app/
├── [slug]/                            # Dynamic catch-all for legacy short links
│   ├── page.tsx                       # → permanentRedirect() to /i/[design]/[theme]/[slug]
│   └── opengraph-image.tsx            # Legacy OG (reads order by slug, kept forever)
│
├── i/
│   └── [design]/                      # Dynamic segment
│       └── [theme]/                   # Dynamic segment
│           └── [slug]/                # Dynamic segment
│               ├── page.tsx           # Canonical order page (renders card)
│               └── opengraph-image.tsx  # Per-order OG image
│
├── designs/
│   └── petal-atelier/                 # Literal folder per design
│       ├── page.tsx                   # → redirect to default theme
│       ├── [theme]/                   # Dynamic segment
│       │   ├── page.tsx               # Design preview (demo data)
│       │   └── opengraph-image.tsx    # Design OG
│       └── opengraph-image.tsx        # Design default OG
│   └── malabar-heritage/              # One literal folder per design...
│   └── ...other designs/
```

### §4.1 `[slug]/page.tsx` — Permanent Redirect

Next.js provides `permanentRedirect()` from `next/navigation` which
serves a **308 (Permanent Redirect)** status code. Unlike `redirect()`
(which serves 307), `permanentRedirect()` signals "this link has moved
forever" — search engines and link previews follow it seamlessly and
update their caches.

```ts
import { notFound, permanentRedirect } from "next/navigation";
import {
  deliveredOrders,
  getDeliveredOrderBySlug,
} from "@/data/delivered-orders";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return deliveredOrders.map((o) => ({ slug: o.slug }));
}

export default async function LegacyOrderPage({ params }: Props) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) notFound();
  permanentRedirect(`/i/${order.designSlug}/${order.themeSlug}/${order.slug}`);
}
```

`generateStaticParams()` is included so the redirect pages are
pre-rendered at build time — no on-demand server computation needed.

### §4.2 `i/[design]/[theme]/[slug]/page.tsx` — Canonical Order Page

```ts
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  deliveredOrders,
  getDeliveredOrder,
  type DeliveredOrder,
} from "@/data/delivered-orders";
import { isValidTheme } from "@/data/design-registry";
import { PetalAtelierCard } from "@/components/cards/PetalAtelierCard";
import { MalabarHeritageCard } from "@/components/cards/MalabarHeritageCard";
import { NoorENikahCard } from "@/components/cards/NoorENikahCard";
import { CelestialCanvasCard } from "@/components/cards/CelestialCanvasCard";
import { NordicMinimalCard } from "@/components/cards/NordicMinimalCard";
import { MughalMiniatureCard } from "@/components/cards/MughalMiniatureCard";
import { MonsoonGardenCard } from "@/components/cards/MonsoonGardenCard";
import type { InvitationCardProps } from "@/data/design-registry";

type Props = { params: Promise<{ design: string; theme: string; slug: string }> };

const COMPONENT_MAP: Record<string, React.ComponentType<InvitationCardProps>> = {
  "petal-atelier": PetalAtelierCard,
  "malabar-heritage": MalabarHeritageCard,
  "noor-e-nikah": NoorENikahCard,
  "celestial-canvas": CelestialCanvasCard,
  "nordic-minimal": NordicMinimalCard,
  "mughal-miniature": MughalMiniatureCard,
  "monsoon-garden": MonsoonGardenCard,
};

export function generateStaticParams() {
  return deliveredOrders.map((o) => ({
    design: o.designSlug,
    theme: o.themeSlug,
    slug: o.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { design, theme, slug } = await params;
  const order = getDeliveredOrder(design, theme, slug);
  if (!order) return {};

  const url = `https://shaadi.axonstack.in/i/${design}/${theme}/${slug}`;
  const title = `${order.title} — Wedding Invitation`;
  const description = `${order.invitationLine}. You're invited to ${order.groom} & ${order.bride}'s ${order.ceremonyHeadline} on ${order.primaryEvent.date} at ${order.primaryEvent.venue}.`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "Shaadi Cards by axonstack",
      title: `${order.title} · Wedding Invitation`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${order.title} · Wedding Invitation`,
      description,
      creator: "@axonstack",
    },
  };
}

export default async function OrderPage({ params }: Props) {
  const { design, theme, slug } = await params;
  if (!isValidTheme(design, theme)) notFound();
  const order = getDeliveredOrder(design, theme, slug);
  if (!order) notFound();

  const Card = COMPONENT_MAP[design];
  if (!Card) notFound();

  return <Card order={order} initialTheme={theme} />;
}
```

`COMPONENT_MAP` uses the shared `InvitationCardProps` interface from
`design-registry.ts` — all card components are interchangeable via this
contract (LSP). Adding a new design requires one import + one map entry;
new orders require zero code changes (OCP for data, pragmatic for designs).

### §4.3 `i/[design]/[theme]/[slug]/opengraph-image.tsx` — Per-Order OG

```ts
import { generateOrderOGImage, OG_SIZE, OG_CONTENT_TYPE }
  from "@/components/cards/shared/og-image";
import { getDeliveredOrder } from "@/data/delivered-orders";
import { getDesign, getDesignTheme } from "@/data/design-registry";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage({
  params,
}: {
  params: Promise<{ design: string; theme: string; slug: string }>;
}) {
  const { design, theme, slug } = await params;
  const order = getDeliveredOrder(design, theme, slug);
  if (!order) return new Response("Not found", { status: 404 });

  const designEntry = getDesign(design)!;
  const themeEntry = getDesignTheme(design, theme) ?? designEntry.themes[0];

  return generateOrderOGImage(designEntry, themeEntry, order);
}
```

The shared `generateOrderOGImage()` extends `generateOGImage()` with
couple-specific fields from the `DeliveredOrder`.

---

## §5 Shared OG Image — Order Variant

```ts
// src/components/cards/shared/og-image.tsx (extended)

import type { DeliveredOrder } from "@/data/delivered-orders";

export function generateOrderOGImage(
  design: DesignEntry,
  theme: DesignTheme,
  order: DeliveredOrder,
): ImageResponse {
  // Reuses the same glass-card layout as generateOGImage() but:
  // - Replaces "Nikah Invitation" with order.title (couple names)
  // - Adds order.primaryEvent.date below the names
  // - Adds order.primaryEvent.venue below the date
  // - Replaces "{theme.label} Collection" with order.ceremonyHeadline
  // - Uses theme palette colours for gradients and accents
  // - Keeps "Shaadi Cards · by axonstack" branding bar
  // - Removes the price badge (order pages are not sales pages)
  //
  // Fields consumed from DeliveredOrder:
  //   order.title              → main heading (couple names)
  //   order.ceremonyHeadline   → subheading (e.g. "Nikah")
  //   order.primaryEvent.date  → date line (e.g. "Sunday, 19th July 2026")
  //   order.primaryEvent.venue → venue line (e.g. "Noor Mahal Convention Centre")
}
```

This keeps a **single rendering utility** for all OG images — DRY.
The function shares the same `OG_SIZE` and `OG_CONTENT_TYPE` exports.

---

## §6 Metadata & SEO

### §6.1 Order pages are `noindex`

Order pages are **personal invitations**, not landing pages. They should
not appear in Google search results.

```ts
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
```

### §6.2 Canonical URL

Each order page sets its canonical URL to the `/i/` path:

```ts
alternates: {
  canonical: `https://shaadi.axonstack.in/i/${design}/${theme}/${slug}`,
}
```

### §6.3 Legacy `[slug]` OG image

The existing `/[slug]/opengraph-image.tsx` stays as-is so that links
already shared on WhatsApp continue to show previews. The 308 redirect
on `/[slug]` itself will cause WhatsApp to follow and resolve the new
canonical URL over time.

**Note**: WhatsApp caches OG images aggressively. The legacy OG endpoint
ensures that even if WhatsApp doesn't immediately follow the redirect,
the old URL still serves a valid preview image. Over time, WhatsApp will
re-scrape and pick up the new canonical URL's OG image.

---

## §7 Backward Compatibility

| Old URL | Behaviour | Forever? |
|---|---|---|
| `/{slug}` | `permanentRedirect()` → 308 → `/i/{design}/{theme}/{slug}` | ✅ Permanent |
| `/{slug}/opengraph-image` | Serves OG image (reads order by slug) | ✅ Permanent |
| `/designs/ivory-blush` | 308 → `/designs/petal-atelier` | ✅ (Phase 4) |
| `/designs/ivory-blush/{theme}` | 308 → `/designs/petal-atelier/{theme}` | ✅ (Phase 4) |

**Rule**: Once a couple's invitation link is shared, it must never 404.
The `[slug]` route is a permanent redirect, not a deprecation.

### §7.1 Post-Delivery Theme Changes

If a couple switches their theme after the invitation has been shared
(e.g. from `emerald-gold` to `sapphire-pearl`):

1. Update `themeSlug` in `delivered-orders.ts`.
2. The old `/i/{design}/{old-theme}/{slug}` URL will 404 — **but** the
   short link `/{slug}` (the one actually shared on WhatsApp) will
   `permanentRedirect()` to the new `/i/{design}/{new-theme}/{slug}`.
3. Add a `next.config.ts` redirect from the old `/i/` path to the new
   one for safety: `{ source: "/i/{design}/{old-theme}/{slug}",
   destination: "/i/{design}/{new-theme}/{slug}", permanent: true }`.

**Decision**: The short link `/{slug}` is the primary share URL.
The canonical `/i/` URL is for SEO/OG correctness. Theme changes are
rare; the short link covers it.

---

## §8 Folder Structure (Complete)

```
src/
├── app/
│   ├── [slug]/                              # Dynamic: legacy short links
│   │   ├── page.tsx                         # permanentRedirect() → /i/...
│   │   └── opengraph-image.tsx              # Legacy OG (by slug, kept forever)
│   │
│   ├── i/
│   │   └── [design]/                        # Dynamic segment
│   │       └── [theme]/                     # Dynamic segment
│   │           └── [slug]/                  # Dynamic segment
│   │               ├── page.tsx             # Canonical order page
│   │               └── opengraph-image.tsx  # Per-order OG
│   │
│   └── designs/
│       ├── petal-atelier/                   # Literal folder per design
│       │   ├── page.tsx                     # Redirect to default theme
│       │   ├── [theme]/                     # Dynamic segment
│       │   │   ├── page.tsx                 # Design preview (demo data)
│       │   │   └── opengraph-image.tsx      # Design OG
│       │   └── opengraph-image.tsx          # Design default OG
│       ├── malabar-heritage/                # One literal folder per design
│       └── ...other designs/
│
├── components/
│   └── cards/
│       ├── shared/
│       │   ├── ThemeContext.tsx             # Generic ThemeProvider<T>
│       │   ├── og-image.tsx                 # generateOGImage + generateOrderOGImage
│       │   ├── Khatam.tsx
│       │   └── MihrabFrame.tsx
│       ├── petal-atelier/
│       │   ├── themes.ts
│       │   ├── ThemeContext.tsx             # Thin re-export
│       │   ├── CoverScreen.tsx
│       │   └── ...sub-components
│       ├── PetalAtelierCard.tsx
│       ├── MalabarHeritageCard.tsx
│       └── ...other card wrappers
│
├── data/
│   ├── design-registry.ts                   # Design + theme catalogue
│   ├── demo-orders.ts                       # Demo orders for /designs/
│   └── delivered-orders.ts                  # Real orders for /i/
```

---

## §9 Adding a New Customer Order (Updated Workflow)

1. **Add order data** to `src/data/delivered-orders.ts`:
   ```ts
   {
     slug: "rahman-zaira",
     designSlug: "petal-atelier",
     themeSlug: "amethyst-silver",
     title: "Rahman & Zaira",
     // ... couple-specific fields
   }
   ```

2. **That's it.** The route `/i/petal-atelier/amethyst-silver/rahman-zaira`
   is automatically generated via `generateStaticParams()`. The OG image
   is automatically generated from the order + theme data.

3. **Short link**: `shaadi.axonstack.in/rahman-zaira` will 308-redirect
   to the canonical URL. Share either link — both work forever.

4. **If the couple chose a new theme** not yet in the design registry,
   add it to `src/data/design-registry.ts` under the design's `themes[]`
   and (if the design has a `themes.ts`) to the design's local themes.

---

## §10 Migration Plan

### Phase A: Data Model (no route changes)

1. Rename `templateSlug` → `designSlug` in `DeliveredOrder` interface.
2. Add `themeSlug` field to `DeliveredOrder`.
3. Populate `themeSlug` for each existing order from the design's
   `defaultTheme` in `design-registry.ts`.
4. Update all consumers of `templateSlug` to use `designSlug`
   (only `src/app/[slug]/page.tsx` switch statement).
5. Add `getDeliveredOrder(design, theme, slug)` helper.
6. Add slug uniqueness assertion.

No deprecated alias — the rename is atomic across the codebase.

### Phase B: Canonical `/i/` Route

1. Create `src/app/i/[design]/[theme]/[slug]/page.tsx`.
2. Create `src/app/i/[design]/[theme]/[slug]/opengraph-image.tsx`.
3. Add `generateStaticParams()` from `deliveredOrders`.
4. Use `COMPONENT_MAP` instead of switch statement.

### Phase C: Legacy Redirect

1. Replace `src/app/[slug]/page.tsx` with `permanentRedirect()` call.
2. Add `generateStaticParams()` to pre-render redirect pages.
3. Keep `src/app/[slug]/opengraph-image.tsx` as-is (legacy OG).

### Phase D: OG Enhancement

1. Extend `og-image.tsx` with `generateOrderOGImage()`.
2. Wire it into `i/[design]/[theme]/[slug]/opengraph-image.tsx`.

### Phase E: Cleanup

1. Update README "Adding a new delivered card" section with new
   `designSlug` + `themeSlug` workflow.
2. Remove old `next.config.ts` design redirects if fully superseded.
3. Add post-delivery theme change redirect to `next.config.ts` if needed.

---

## §11 SOLID Compliance

| Principle | How |
|---|---|
| **SRP** | `delivered-orders.ts` = data only. Route files = routing only. `og-image.tsx` = rendering only. |
| **OCP** | New orders require zero code changes — just data. New designs require one `COMPONENT_MAP` entry (pragmatic, not pure OCP — but avoids switch-statement sprawl). |
| **LSP** | All card components accept `{ order, initialTheme }` — interchangeable via `InvitationCardProps`. |
| **ISP** | `DeliveredOrder` interface is consumed as-is; route files don't depend on design internals. |
| **DIP** | Route depends on `COMPONENT_MAP` abstraction, not concrete card imports inline. |
| **DRY** | Single OG utility. Single order data source. Single redirect rule. |
| **KISS** | `/i/` prefix is one character. Slug redirect is one line. |
| **Convention over Configuration** | `{design}/{theme}/{slug}` mirrors the existing `/designs/{design}/{theme}` pattern. |

---

## §12 Decision Log

| Decision | Rationale |
|---|---|
| `/i/` prefix | Avoids collision with `/designs/`, `/pricing`, etc. Short for WhatsApp. |
| `permanentRedirect()` not `redirect()` | `permanentRedirect()` from `next/navigation` serves 308 (permanent). `redirect()` serves 307 (temporary). 308 is correct for links that should work forever. |
| Keep `[slug]/opengraph-image.tsx` | WhatsApp caches OG images; removing it would break old shares. |
| `noindex` on `/i/` | Personal invitations shouldn't be indexed. Gallery `/designs` is the SEO surface. |
| `COMPONENT_MAP` instead of switch | OCP — new designs need one line, not a new case branch. |
| `themeSlug` on order | Couples choose a specific theme; the URL should reflect their choice. Theme changes handled via short-link redirect (§7.1). |
| Slug uniqueness global | Prevents collisions across designs. Convention: `{groom}-{bride}`, append `-{year}` if collision. |
| `generateStaticParams` on `[slug]` | Pre-renders redirect pages at build time — no server computation for legacy links. |
