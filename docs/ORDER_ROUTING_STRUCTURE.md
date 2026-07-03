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
├── /{slug}                              # ⚠ PERMANENT redirect → /i/{design}/{theme}/{slug}
├── /i/{design}/{theme}/{slug}           # ✅ Canonical order URL (lifelong)
├── /i/{design}/{theme}/{slug}/opengraph-image  # Per-order OG (dynamic)
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
| Siyad & Faleela | `/siyad-faleela` | `/i/malabar-heritage/emerald-gold/siyad-faleela` | ✅ 301 redirect |
| Ashik & Abia | `/ashik-abiya` | `/i/noor-e-nikah/navy-gold/ashik-abiya` | ✅ 301 redirect |
| Demo Petal Atelier | `/demo-ivory-blush` | `/i/petal-atelier/ivory-blush/demo-ivory-blush` | ✅ 301 redirect |

---

## §3 Data Model

### §3.1 Extended `DeliveredOrder`

```ts
// src/data/delivered-orders.ts

export interface DeliveredOrder {
  slug: string;              // unchanged — unique human slug
  templateSlug: string;      // → renamed to designSlug
  designSlug: string;        // NEW: which design (e.g. "petal-atelier")
  themeSlug: string;         // NEW: which theme (e.g. "amethyst-silver")
  title: string;
  deliveredOn: string;
  // ... all existing fields stay the same
}
```

**Migration**: `templateSlug` → `designSlug` + add `themeSlug`.
Old `templateSlug` values already match `designSlug` values after Phase 1.
`themeSlug` defaults to the design's `defaultTheme` if not specified.

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

---

## §4 Route Structure

```
src/app/
├── [slug]/
│   ├── page.tsx                    # → 301 redirect to /i/{design}/{theme}/{slug}
│   └── opengraph-image.tsx         # keep for old shares (reads order by slug)
│
├── i/
│   └── [design]/
│       └── [theme]/
│           └── [slug]/
│               ├── page.tsx              # Renders the card
│               └── opengraph-image.tsx   # Per-order OG image
│
├── designs/
│   └── {design}/
│       ├── page.tsx                      # → redirect to default theme
│       ├── [theme]/
│       │   ├── page.tsx                  # Design preview (demo data)
│       │   └── opengraph-image.tsx       # Design OG
│       └── opengraph-image.tsx           # Design default OG
```

### §4.1 `[slug]/page.tsx` — Permanent Redirect

```ts
import { redirect } from "next/navigation";
import { getDeliveredOrderBySlug } from "@/data/delivered-orders";

export default async function LegacyOrderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) notFound();
  redirect(308, `/i/${order.designSlug}/${order.themeSlug}/${order.slug}`);
}
```

**308 (Permanent Redirect)** preserves the HTTP method and signals
"this link has moved forever" — search engines and link previews
follow it seamlessly.

### §4.2 `i/[design]/[theme]/[slug]/page.tsx` — Canonical Order Page

```ts
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDeliveredOrder } from "@/data/delivered-orders";
import { isValidTheme } from "@/data/design-registry";
import { PetalAtelierCard } from "@/components/cards/PetalAtelierCard";
import { MalabarHeritageCard } from "@/components/cards/MalabarHeritageCard";
// ... all card imports

const COMPONENT_MAP: Record<string, React.ComponentType<{
  order: DeliveredOrder;
  initialTheme?: string;
}>> = {
  "petal-atelier": PetalAtelierCard,
  "malabar-heritage": MalabarHeritageCard,
  // ...
};

export function generateStaticParams() {
  return deliveredOrders.map((o) => ({
    design: o.designSlug,
    theme: o.themeSlug,
    slug: o.slug,
  }));
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ design: string; theme: string; slug: string }>;
}) {
  const { design, theme, slug } = await params;
  if (!isValidTheme(design, theme)) notFound();
  const order = getDeliveredOrder(design, theme, slug);
  if (!order) notFound();

  const Card = COMPONENT_MAP[design];
  if (!Card) notFound();

  return <Card order={order} initialTheme={theme} />;
}
```

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
couple-specific fields (names, date, venue) from the `DeliveredOrder`.

---

## §5 Shared OG Image — Order Variant

```ts
// src/components/cards/shared/og-image.tsx (extended)

export function generateOrderOGImage(
  design: DesignEntry,
  theme: DesignTheme,
  order: DeliveredOrder,
): ImageResponse {
  // Same layout as generateOGImage() but:
  // - Shows order.title (couple names) instead of "Nikah Invitation"
  // - Shows order.primaryEvent.date and venue
  // - Uses theme palette colours
  // - Includes "Shaadi Cards · by axonstack" branding
}
```

This keeps a **single rendering utility** for all OG images — DRY.

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

---

## §7 Backward Compatibility

| Old URL | Behaviour | Forever? |
|---|---|---|
| `/{slug}` | 308 → `/i/{design}/{theme}/{slug}` | ✅ Permanent |
| `/{slug}/opengraph-image` | Serves OG image (reads order by slug) | ✅ Permanent |
| `/designs/ivory-blush` | 308 → `/designs/petal-atelier` | ✅ (Phase 4) |
| `/designs/ivory-blush/{theme}` | 308 → `/designs/petal-atelier/{theme}` | ✅ (Phase 4) |

**Rule**: Once a couple's invitation link is shared, it must never 404.
The `[slug]` route is a permanent redirect, not a deprecation.

---

## §8 Folder Structure (Complete)

```
src/
├── app/
│   ├── [slug]/
│   │   ├── page.tsx                         # 308 redirect to /i/...
│   │   └── opengraph-image.tsx              # Legacy OG (by slug)
│   │
│   ├── i/
│   │   └── [design]/
│   │       └── [theme]/
│   │           └── [slug]/
│   │               ├── page.tsx             # Canonical order page
│   │               └── opengraph-image.tsx  # Per-order OG
│   │
│   └── designs/
│       └── {design}/
│           ├── page.tsx                     # Redirect to default theme
│           ├── [theme]/
│           │   ├── page.tsx                 # Design preview (demo data)
│           │   └── opengraph-image.tsx      # Design OG
│           └── opengraph-image.tsx          # Design default OG
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

1. Add `designSlug` and `themeSlug` fields to `DeliveredOrder`.
2. Populate from existing `templateSlug` + design's `defaultTheme`.
3. Keep `templateSlug` as a deprecated alias for `designSlug`.
4. Add `getDeliveredOrder(design, theme, slug)` helper.

### Phase B: Canonical `/i/` Route

1. Create `src/app/i/[design]/[theme]/[slug]/page.tsx`.
2. Create `src/app/i/[design]/[theme]/[slug]/opengraph-image.tsx`.
3. Add `generateStaticParams()` from `deliveredOrders`.
4. Use `COMPONENT_MAP` instead of switch statement.

### Phase C: Legacy Redirect

1. Replace `src/app/[slug]/page.tsx` with 308 redirect.
2. Keep `src/app/[slug]/opengraph-image.tsx` as-is (legacy OG).

### Phase D: OG Enhancement

1. Extend `og-image.tsx` with `generateOrderOGImage()`.
2. Wire it into `i/[design]/[theme]/[slug]/opengraph-image.tsx`.

### Phase E: Cleanup

1. Remove `templateSlug` field (now fully replaced by `designSlug`).
2. Update README "Adding a new delivered card" section.
3. Update `next.config.ts` if any new redirects are needed.

---

## §11 SOLID Compliance

| Principle | How |
|---|---|
| **SRP** | `delivered-orders.ts` = data only. Route files = routing only. `og-image.tsx` = rendering only. |
| **OCP** | New orders require zero code changes — just data. New designs require one `COMPONENT_MAP` entry. |
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
| 308 not 301 | 308 preserves method; both are permanent. 308 is more correct for POST (RSVP). |
| Keep `[slug]/opengraph-image.tsx` | WhatsApp caches OG images; removing it would break old shares. |
| `noindex` on `/i/` | Personal invitations shouldn't be indexed. Gallery `/designs` is the SEO surface. |
| `COMPONENT_MAP` instead of switch | OCP — new designs need one line, not a new case branch. |
| `themeSlug` on order | Couples choose a specific theme; the URL should reflect their choice. |
