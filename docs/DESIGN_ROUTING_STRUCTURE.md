# Design & Theme Routing Structure

> Planning document for organising wedding invitation designs, their colour themes, and URL routing.

---

## 1. Core Concepts

| Term | Meaning | Example |
|---|---|---|
| **Design** | A complete invitation layout — its components, animations, structure. Named by its **visual style**, not a colour. | `petal-atelier`, `celestial-canvas`, `mughal-miniature` |
| **Theme** | A colour palette applied to a design. Named by **colour/mood**, not the layout. | `ivory-blush`, `amethyst-silver`, `crimson-maroon` |
| **Design slug** | URL-safe identifier for a design. General, colour-agnostic. | `/designs/petal-atelier` |
| **Theme slug** | URL-safe identifier for a colour palette. Colour-specific. | `/designs/petal-atelier/ivory-blush` |

**Rule:** A design name never contains a colour. A theme name always describes colours/mood.

---

## 2. Current State (what needs fixing)

### Problem: Design names contain colours

| Current slug | Problem |
|---|---|
| `ivory-blush` | "Ivory" and "Blush" are colours — this is a **theme**, not a design |
| `malabar-emerald` | "Emerald" is a colour — the design is Kerala heritage, the colour is emerald |
| `nordic-frost` | "Frost" implies white/icy — the design is Scandinavian minimal, the colour is frost |

### Current component folder naming is inconsistent

```
src/components/cards/
├── IvoryBlushCard.tsx          ← mixes design + colour
├── CelestialCanvasCard.tsx     ← OK (no colour in name)
├── MalabarEmeraldCard.tsx      ← mixes design + colour
├── NordicFrostCard.tsx         ← mixes design + colour (frost = colour)
├── MughalMiniatureCard.tsx     ← OK
├── NoorENikahCard.tsx          ← OK
├── MonsoonSpecialCard.tsx      ← OK
├── ivory-blush/                ← sub-components named after colour
├── celestial/                  ← OK
├── nordic/                     ← OK
└── shared/                     ← OK
```

### Current routing has no theme support (except ivory-blush)

```
src/app/designs/
├── page.tsx                    ← gallery index
├── ivory-blush/
│   ├── page.tsx                ← default theme (implicit)
│   ├── [theme]/page.tsx        ← theme subroute (only one that has this)
│   └── opengraph-image.tsx
├── celestial-canvas/page.tsx   ← no theme support
├── malabar-emerald/page.tsx    ← no theme support
├── mughal-miniature/page.tsx   ← no theme support
├── noor-e-nikah/page.tsx       ← no theme support
├── nordic-frost/page.tsx       ← no theme support
└── monsoon-special/page.tsx    ← no theme support
```

---

## 3. Proposed Naming

### 3.1 Rename designs (colour-agnostic)

| Current name | New design name | Design slug | Rationale |
|---|---|---|---|
| Ivory Blush | **Petal Atelier** | `petal-atelier` | Core feature is drifting petals + glassmorphism. "Atelier" conveys craftsmanship. No colour in the name — customers search for "elegant" not "glass". |
| Malabar Emerald | **Malabar Heritage** | `malabar-heritage` | Kerala heritage layout. "Emerald" is a colour theme. |
| Nordic Frost | **Nordic Minimal** | `nordic-minimal` | Scandinavian minimal layout. "Frost" is a colour theme. |
| Celestial Canvas | **Celestial Canvas** | `celestial-canvas` | Already colour-agnostic. Keep as-is. |
| Mughal Miniature | **Mughal Miniature** | `mughal-miniature` | Already colour-agnostic. Keep as-is. |
| Noor-e-Nikah | **Noor-e-Nikah** | `noor-e-nikah` | Already colour-agnostic. Keep as-is. |
| Monsoon Special | **Monsoon Garden** | `monsoon-garden` | "Special" is vague. "Garden" describes the botanical layout without implying any colour. |

### 3.2 Define themes per design (colour-specific)

Each design can have multiple colour themes. The first theme in the list is the **default** (shown when no theme is in the URL).

**Theme slug convention:** All theme slugs follow the `{colour}-{colour}` pattern (two colour/metal words joined by a hyphen). This keeps URLs consistent, predictable, and immediately readable as a palette. Exceptions are allowed only when a word is more evocative than the literal colour (e.g. `frost-silver` — "frost" communicates the icy mood better than "ice").

#### Petal Atelier (was: Ivory Blush)

| Theme slug | Theme label | Palette summary |
|---|---|---|
| `ivory-blush` | Ivory Blush | Champagne ivory, blush rose, gold |
| `amethyst-silver` | Amethyst Silver | Lavender, amethyst, silver |
| `crimson-maroon` | Crimson Maroon | Deep maroon, burgundy, rose-gold |

#### Malabar Heritage (was: Malabar Emerald)

| Theme slug | Theme label | Palette summary |
|---|---|---|
| `emerald-gold` | Emerald Gold | Emerald green, gold, cream |
| `sapphire-pearl` | Sapphire Pearl | Sapphire blue, pearl white, silver |
| `rose-copper` | Rose Copper | Rose pink, copper, ivory |

#### Nordic Minimal (was: Nordic Frost)

| Theme slug | Theme label | Palette summary |
|---|---|---|
| `frost-silver` | Frost Silver | Ice blue, white, silver |
| `navy-teal` | Navy Teal | Deep navy, teal, silver |
| `blush-champagne` | Blush Champagne | Soft pink, white, champagne |

#### Celestial Canvas

| Theme slug | Theme label | Palette summary |
|---|---|---|
| `indigo-gold` | Indigo Gold | Black, indigo, star-gold |
| `purple-magenta` | Purple Magenta | Dark purple, magenta, rose-gold |
| `blue-teal` | Blue Teal | Midnight blue, teal, silver |

#### Mughal Miniature

| Theme slug | Theme label | Palette summary |
|---|---|---|
| `ruby-gold` | Ruby Gold | Ruby red, gold, ivory |
| `sapphire-emerald` | Sapphire Emerald | Sapphire blue, emerald, gold |
| `ivory-rose` | Ivory Rose | Ivory, rose, gold |

#### Noor-e-Nikah

| Theme slug | Theme label | Palette summary |
|---|---|---|
| `navy-gold` | Navy Gold | Navy blue, gold, cream |
| `emerald-ivory` | Emerald Ivory | Emerald, gold, ivory |
| `rose-gold` | Rose Gold | Rose quartz, gold, white |

#### Monsoon Garden

| Theme slug | Theme label | Palette summary |
|---|---|---|
| `green-silver` | Green Silver | Deep green, lime, rain-silver |
| `purple-magenta` | Purple Magenta | Purple, magenta, green |
| `gold-green` | Gold Green | Golden yellow, green, cream |

---

## 4. Proposed Folder Structure

### 4.1 App Router (pages)

```
src/app/designs/
├── page.tsx                              ← Gallery index (all designs)
│
├── petal-atelier/                       ← Design: Petal Atelier
│   ├── page.tsx                          ← Redirects to default theme
│   ├── [theme]/
│   │   ├── page.tsx                      ← Theme-specific render
│   │   └── opengraph-image.tsx           ← Dynamic OG image per theme
│   └── opengraph-image.tsx               ← Default OG image
│
├── malabar-heritage/
│   ├── page.tsx
│   ├── [theme]/
│   │   ├── page.tsx
│   │   └── opengraph-image.tsx
│   └── opengraph-image.tsx
│
├── nordic-minimal/
│   ├── page.tsx
│   ├── [theme]/
│   │   ├── page.tsx
│   │   └── opengraph-image.tsx
│   └── opengraph-image.tsx
│
├── celestial-canvas/
│   ├── page.tsx
│   ├── [theme]/
│   │   ├── page.tsx
│   │   └── opengraph-image.tsx
│   └── opengraph-image.tsx
│
├── mughal-miniature/
│   ├── page.tsx
│   ├── [theme]/
│   │   ├── page.tsx
│   │   └── opengraph-image.tsx
│   └── opengraph-image.tsx
│
├── noor-e-nikah/
│   ├── page.tsx
│   ├── [theme]/
│   │   ├── page.tsx
│   │   └── opengraph-image.tsx
│   └── opengraph-image.tsx
│
└── monsoon-garden/                        ← Design: Monsoon Garden
    ├── page.tsx
    ├── [theme]/
    │   ├── page.tsx
    │   └── opengraph-image.tsx
    └── opengraph-image.tsx
```

### 4.2 Components

```
src/components/cards/
│
├── petal-atelier/                       ← Design sub-components
│   ├── CoverScreen.tsx
│   ├── PreviewToolbar.tsx
│   ├── InvitationHeader.tsx
│   ├── CountdownCard.tsx
│   ├── EventCards.tsx
│   ├── Timeline.tsx
│   ├── VenueCard.tsx
│   ├── FamilyCard.tsx
│   ├── RSVPCard.tsx
│   ├── ActionBar.tsx
│   ├── FloatingPetals.tsx
│   └── themes.ts                         ← All colour themes for this design
│
├── malabar-heritage/
│   ├── (sub-components…)
│   └── themes.ts
│
├── nordic-minimal/
│   ├── (sub-components…)
│   └── themes.ts
│
├── celestial-canvas/
│   ├── (sub-components…)
│   └── themes.ts
│
├── mughal-miniature/
│   ├── (sub-components…)
│   └── themes.ts
│
├── noor-e-nikah/
│   ├── (sub-components…)
│   └── themes.ts
│
├── monsoon-garden/
│   ├── (sub-components…)
│   └── themes.ts
│
├── PetalAtelierCard.tsx                  ← Top-level wrapper (accepts order + initialTheme)
├── MalabarHeritageCard.tsx
├── NordicMinimalCard.tsx
├── CelestialCanvasCard.tsx
├── MughalMiniatureCard.tsx
├── NoorENikahCard.tsx
├── MonsoonGardenCard.tsx
│
└── shared/                               ← Cross-design shared components
    ├── Khatam.tsx
    ├── MihrabFrame.tsx
    ├── ThemeContext.tsx                  ← Generic shared theme provider (see §4.3)
    └── og-image.tsx                     ← Shared OG image generator (see §4.5)
```

### 4.3 Shared ThemeContext (new)

Instead of each design having its own duplicated `ThemeContext.tsx`, a single generic provider lives in `shared/`:

```typescript
// src/components/cards/shared/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextValue<T> {
  theme: T;
  themeId: string;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue<any> | null>(null);

export function ThemeProvider<T>({
  themes,
  initialThemeId,
  children,
}: {
  themes: Record<string, T>;
  initialThemeId: string;
  children: ReactNode;
}) {
  const [themeId, setThemeId] = useState(initialThemeId);
  const theme = themes[themeId] ?? Object.values(themes)[0];
  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme<T>() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx as ThemeContextValue<T>;
}
```

Each design's `themes.ts` exports a `Record<string, ThemeTokens>` and the card wrapper passes it to `<ThemeProvider>`:

```typescript
// PetalAtelierCard.tsx (simplified)
import { ThemeProvider } from "./shared/ThemeContext";
import { THEMES } from "./petal-atelier/themes";
import type { InvitationCardProps } from "@/data/design-registry";

export function PetalAtelierCard({ order, initialTheme }: InvitationCardProps) {
  return (
    <ThemeProvider themes={THEMES} initialThemeId={initialTheme ?? "ivory-blush"}>
      <PetalAtelierCardInner order={order} />
    </ThemeProvider>
  );
}
```

All card wrappers implement `InvitationCardProps` — any card can substitute for any other (LSP). The `[theme]/page.tsx` depends on this interface, not a concrete card (DIP).

This eliminates 7 copies of `ThemeContext.tsx` — one generic provider serves all designs.

### 4.4 Shared design registry (new)

A central registry so the gallery, routing, and metadata can all reference designs + themes:

```
src/data/
└── design-registry.ts                    ← Single source of truth
```

```typescript
// src/data/design-registry.ts

// ── Theme-level data (routing + palette) ──
export interface DesignTheme {
  slug: string;
  label: string;
  swatch: string;
  palette: string[];
}

// ── Gallery presentation data (gallery-only consumers) ──
export interface DesignGalleryInfo {
  name: string;
  tagline: string;
  description: string;
  signature: string;
  tags: string[];
  tone: "light" | "dark";
}

// ── Routing data (routing + OG consumers) ──
export interface DesignRoutingInfo {
  slug: string;
  themes: DesignTheme[];
  defaultTheme: string;
}

// ── Full entry (composes both concerns) ──
export interface DesignEntry extends DesignGalleryInfo, DesignRoutingInfo {}

// ── Shared card contract (DIP + LSP) ──
import type { DeliveredOrder } from "@/data/delivered-orders";

export interface InvitationCardProps {
  order: DeliveredOrder;
  initialTheme?: string;
}

export const DESIGNS: DesignEntry[] = [
  {
    slug: "petal-atelier",
    name: "Petal Atelier",
    tagline: "Apple-luxury elegance",
    description: "Champagne glassmorphism invitation with drifting petals and live countdown.",
    signature: "Floating rose petals",
    tags: ["Glassmorphism", "Islamic", "Live RSVP"],
    tone: "light",
    defaultTheme: "ivory-blush",
    themes: [
      { slug: "ivory-blush",    label: "Ivory Blush",    swatch: "#D9B67A", palette: ["#FBF8F4", "#E8C6C1", "#D9B67A", "#4B3A2A"] },
      { slug: "amethyst-silver", label: "Amethyst Silver", swatch: "#9B72CF", palette: ["#F7F3FF", "#D4B8E8", "#9B72CF", "#2D1A4A"] },
      { slug: "crimson-maroon", label: "Crimson Maroon", swatch: "#8B1A2E", palette: ["#FDF4F4", "#D4818E", "#8B1A2E", "#3A0D18"] },
    ],
  },
  // ... other designs
];

// ── Selector helpers (Law of Demeter: prevent chaining in consumers) ──
export function getDesign(slug: string): DesignEntry | undefined {
  return DESIGNS.find(d => d.slug === slug);
}

export function getDesignThemes(slug: string): DesignTheme[] {
  return getDesign(slug)?.themes ?? [];
}

export function getThemeSlugs(slug: string): string[] {
  return getDesignThemes(slug).map(t => t.slug);
}

export function isValidTheme(designSlug: string, themeSlug: string): boolean {
  return getThemeSlugs(designSlug).includes(themeSlug);
}
```

---

### 4.5 Shared OG image utility (DRY)

Each `[theme]/opengraph-image.tsx` shares the same layout logic (gradient background, glass card, price pill). Extract a shared utility to avoid 7 × 3 = 21 duplicated files:

```typescript
// src/components/cards/shared/og-image.tsx
import { ImageResponse } from "next/og";
import type { DesignEntry, DesignTheme } from "@/data/design-registry";

export function generateOGImage(design: DesignEntry, theme: DesignTheme): ImageResponse {
  return new ImageResponse(
    // … shared JSX layout using design.name + theme.palette …
    { width: 1200, height: 630 }
  );
}
```

Each route file becomes a thin wrapper using the Next.js `opengraph-image.tsx` file convention:

```typescript
// [theme]/opengraph-image.tsx
import { generateOGImage } from "@/components/cards/shared/og-image";
import { getDesign } from "@/data/design-registry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ theme: string }> }) {
  const { theme: themeSlug } = await params;
  const design = getDesign("petal-atelier")!;
  const theme = design.themes.find(t => t.slug === themeSlug)!;
  return generateOGImage(design, theme);
}
```

---

### 4.6 Shared demo order (DRY)

Each `page.tsx` currently defines its own `demoOrder` with near-identical data. Extract a shared base:

```typescript
// src/data/demo-orders.ts
export const BASE_DEMO_ORDER = {
  groomParents: "Son of Mr. & Mrs. Abdul Rahman",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  ceremonyHeadline: "Nikah",
  closingDuaArabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  closingDua: "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
  rsvpWhatsApp: "918985798572",
  rsvp: { webhookUrl: "", deadline: "", maxGuests: 5 },
};

// Per-design override only what changes
export const PETAL_ATELIER_DEMO = {
  ...BASE_DEMO_ORDER,
  slug: "demo-petal-atelier",
  templateSlug: "petal-atelier" as const,
  title: "Muhammed Ashik & Abia Manal",
  // … design-specific fields …
};
```

---

## 5. URL Routing Patterns

### 5.1 URL structure

| URL | What it shows |
|---|---|
| `/designs` | Gallery of all designs (cards show default theme preview) |
| `/designs/petal-atelier` | Design with **default theme** (redirects to default) |
| `/designs/petal-atelier/ivory-blush` | Design with **Ivory Blush** colour theme |
| `/designs/petal-atelier/amethyst-silver` | Design with **Amethyst Silver** colour theme |
| `/designs/petal-atelier/crimson-maroon` | Design with **Crimson Maroon** colour theme |

### 5.2 Default theme behaviour

Two options for `/designs/{design}` (no theme in URL):

**Option A — Redirect (recommended):**
```typescript
// /designs/petal-atelier/page.tsx
import { redirect } from "next/navigation";
export default function Page() {
  redirect("/designs/petal-atelier/ivory-blush");
}
```
- Clean URLs — users always see the full theme path
- Shareable — every URL is self-describing
- SEO — no duplicate content

**Option B — Render default (no redirect):**
```typescript
// /designs/petal-atelier/page.tsx
export default function Page() {
  return <PetalAtelierCard order={demoOrder} initialTheme="ivory-blush" />;
}
```
- Faster — no redirect hop
- Shorter URL for the default
- But: two URLs render the same content (SEO duplicate)

**Recommendation:** Option A (redirect) for SEO clarity.

### 5.3 Theme switching in the toolbar

The `PreviewToolbar` theme switcher cycles through themes using `router.push`:

```
/designs/petal-atelier/ivory-blush
  → tap "Theme" → router.push("/designs/petal-atelier/amethyst-silver")
  → tap "Theme" → router.push("/designs/petal-atelier/crimson-maroon")
  → tap "Theme" → router.push("/designs/petal-atelier/ivory-blush")  ← loops back
```

**Where the toolbar gets the theme list:**

The `[theme]/page.tsx` reads the design's theme list from `design-registry.ts` (or the design's local `themes.ts`) and passes the full ordered list + current index to `PreviewToolbar` as props:

```typescript
// [theme]/page.tsx (simplified)
import { getThemeSlugs, isValidTheme } from "@/data/design-registry";
import { PetalAtelierCard } from "@/components/cards/PetalAtelierCard";
import { notFound } from "next/navigation";

const DESIGN_SLUG = "petal-atelier";

export async function generateStaticParams() {
  return getThemeSlugs(DESIGN_SLUG).map(slug => ({ theme: slug }));
}

export default async function Page({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  if (!isValidTheme(DESIGN_SLUG, theme)) notFound();
  return <PetalAtelierCard order={demoOrder} initialTheme={theme} />;
}
```

The `PreviewToolbar` receives segregated props (ISP — no design is forced to accept props it doesn't use):

```typescript
// Toolbar props split by concern
interface ToolbarThemeProps {
  themeOrder: string[];       // ordered theme slugs
  currentTheme: string;       // active slug
  onThemeSwitch: () => void;  // parent handles router.push
}

interface ToolbarCommerceProps {
  price: string;
  mrp: string;
  discountLabel: string;
  whatsappUrl: string;
}

interface PreviewToolbarProps extends ToolbarThemeProps, ToolbarCommerceProps {}
```

A design without commerce features can omit `ToolbarCommerceProps` — the interface is segregated, not monolithic.

---

## 6. Migration Plan

### Phase 1: Rename + restructure (no breaking changes)

1. Create `src/data/design-registry.ts` with all designs + themes + selector helpers (`getDesign`, `getThemeSlugs`, `isValidTheme`)
2. Create `src/data/demo-orders.ts` with `BASE_DEMO_ORDER` + per-design demo orders
3. Create `src/components/cards/shared/ThemeContext.tsx` (generic `ThemeProvider<T>`)
4. Create `src/components/cards/shared/og-image.tsx` (shared `generateOGImage` utility)
5. Rename component folders and files:
   - `ivory-blush/` → `petal-atelier/`
   - `IvoryBlushCard.tsx` → `PetalAtelierCard.tsx`
   - `MalabarEmeraldCard.tsx` → `MalabarHeritageCard.tsx`
   - `NordicFrostCard.tsx` → `NordicMinimalCard.tsx`
   - `MonsoonSpecialCard.tsx` → `MonsoonGardenCard.tsx`
6. Update all imports across the codebase
7. Update `TemplatesGallery.tsx` to use `DESIGNS` from registry instead of hardcoded `templates` array

### Phase 2: Restructure routes

1. Rename route folders to match new design slugs
2. Add `[theme]/page.tsx` + `[theme]/opengraph-image.tsx` to every design — OG routes must use shared `generateOGImage()` from §4.5
3. Add `opengraph-image.tsx` to every design's root (default theme, also using `generateOGImage()`)
4. Add redirect from `/designs/{design}` → `/designs/{design}/{defaultTheme}`

### Phase 3: Add themes to each design

1. Create `themes.ts` in each design's component folder
2. Wire shared `ThemeProvider<T>` from `shared/ThemeContext.tsx` in each card wrapper
3. Replace hardcoded colours with theme tokens (same pattern as petal-atelier)
4. Add `initialTheme` prop to each card wrapper component
5. Add `generateStaticParams` to every `[theme]/page.tsx` so themes are pre-rendered at build time
6. Add `notFound()` guard in every `[theme]/page.tsx` for invalid theme slugs

### Phase 4: Backward compatibility

Add redirects for old URLs:

```typescript
// next.config.ts
async redirects() {
  return [
    { source: "/designs/ivory-blush", destination: "/designs/petal-atelier/ivory-blush", permanent: true },
    { source: "/designs/ivory-blush/:theme*", destination: "/designs/petal-atelier/:theme*", permanent: true },
    { source: "/designs/malabar-emerald", destination: "/designs/malabar-heritage/emerald-gold", permanent: true },
    { source: "/designs/nordic-frost", destination: "/designs/nordic-minimal/frost-silver", permanent: true },
    { source: "/designs/monsoon-special", destination: "/designs/monsoon-garden/green-silver", permanent: true },
  ];
}
```

---

## 7. SOLID & Design Principles Compliance

### S — Single Responsibility Principle

| Module | Responsibility | Status |
|---|---|---|
| `themes.ts` (per design) | Colour token definitions only | ✅ One reason to change |
| `shared/ThemeContext.tsx` | Theme state management only | ✅ |
| `design-registry.ts` | Data definitions + selector helpers | ✅ Data + selectors are cohesive |
| `DesignEntry` interface | Split into `DesignGalleryInfo` + `DesignRoutingInfo` | ✅ Consumers depend only on what they need |
| `shared/og-image.tsx` | OG image rendering logic | ✅ Extracted from route files |
| `PreviewToolbar` | UI rendering + drag/collapse UX | ✅ Theme switching delegated to parent via callback |
| `[theme]/page.tsx` | Routing, validation, rendering | ⚠️ Multiple concerns but dictated by Next.js convention — acceptable |

### O — Open/Closed Principle

| Scenario | Status |
|---|---|
| Add a new design | ✅ Create new folder + add entry to `DESIGNS` array. Gallery, routing, OG all auto-discover from registry |
| Add a new theme to existing design | ✅ Add entry to design's `themes.ts` + `DESIGNS`. No existing code modified |
| Add a new card wrapper | ✅ Implements `InvitationCardProps` — no base class to modify |
| Modify `ThemeProvider` for new theme shape | ✅ Generic `<T>` — no modification needed |
| Add a new shared utility | ✅ Drop file in `shared/` — no existing files change |

### L — Liskov Substitution Principle

| Scenario | Status |
|---|---|
| Swap `PetalAtelierCard` for `CelestialCanvasCard` in any `[theme]/page.tsx` | ✅ Both implement `InvitationCardProps` — any card substitutes for any other |
| Swap one design's `themes.ts` for another's in `ThemeProvider` | ✅ Generic `Record<string, T>` accepts any theme shape |
| Swap `ToolbarThemeProps` between designs | ✅ Same interface contract |

### I — Interface Segregation Principle

| Consumer | Interface it depends on | Status |
|---|---|---|
| Gallery (`TemplatesGallery`) | `DesignGalleryInfo` | ✅ Doesn't see routing fields |
| Route (`[theme]/page.tsx`) | `DesignRoutingInfo` + selector helpers | ✅ Doesn't see gallery fields |
| OG image route | `DesignEntry` (name + themes) | ✅ Uses both concerns — justified |
| `PreviewToolbar` | `ToolbarThemeProps` + `ToolbarCommerceProps` (segregated) | ✅ Designs without commerce can omit commerce props |

### D — Dependency Inversion Principle

| Consumer | Depends on | Status |
|---|---|---|
| `[theme]/page.tsx` | `InvitationCardProps` interface (abstraction) | ✅ Not a concrete card class |
| `PreviewToolbar` | Callback props (`onThemeSwitch`) | ✅ Depends on abstraction, not router directly |
| `ThemeProvider` | Generic `Record<string, T>` | ✅ Depends on abstraction |
| Gallery | `DESIGNS` array (concretion) | ⚠️ Could inject but over-engineering for Next.js — acceptable |
| `og-image.tsx` routes | `generateOGImage()` shared utility (DRY, not DIP) | ✅ DRY — concrete function, not an interface. Acceptable for rendering utilities |

### Other Principles

| Principle | Compliance |
|---|---|
| **DRY** | ✅ Shared `ThemeContext`, shared `og-image.tsx`, shared `BASE_DEMO_ORDER`, selector helpers |
| **KISS** | ✅ Simple array registry, generic provider, one-liner OG routes |
| **YAGNI** | ✅ Define themes per design only when implementing that design. Don't pre-define all 21 themes upfront — add as you build |
| **Separation of Concerns** | ✅ `DesignGalleryInfo` vs `DesignRoutingInfo` split. Theme state vs UI vs routing vs OG generation all separate |
| **Composition over Inheritance** | ✅ `DesignEntry` composes `DesignGalleryInfo` + `DesignRoutingInfo`. Card wrappers compose sub-components. `ThemeProvider` wraps card inner |
| **Law of Demeter** | ✅ Selector helpers (`getDesign`, `getThemeSlugs`, `isValidTheme`) prevent `DESIGNS.find(...).themes.map(...)` chaining in consumers |
| **Convention over Configuration** | ✅ Next.js file conventions (`opengraph-image.tsx`, `[theme]/page.tsx`, `generateStaticParams`) |
| **Single Source of Truth** | ✅ `design-registry.ts` is the only place design + theme metadata lives. Gallery, routes, OG images all read from it |

---

## 8. OG Image Strategy

Each design's `[theme]/opengraph-image.tsx` generates a 1200x630 PNG using `next/og` `ImageResponse`:

- Background gradient matches the theme's palette
- Glass card with design name + theme label
- Price pill (₹2,000 → 50% OFF → ₹999)
- Runs on Edge runtime
- Automatically wired by Next.js convention (no manual `<meta>` tags)
- **Shared utility** (`shared/og-image.tsx`) — each route is a one-liner calling `generateOGImage(design, theme)` (see §4.5)

The design root `opengraph-image.tsx` generates the same image using the default theme.

---

## 9. Summary of changes

| What | Before | After |
|---|---|---|
| Design naming | Mixed colours in names | Colour-agnostic design names |
| Theme support | Only ivory-blush had themes | Every design has 3+ themes |
| Routing | Flat `/designs/{slug}` | Hierarchical `/designs/{design}/{theme}` |
| Component folders | Named after colours | Named after design style |
| Gallery data | Hardcoded in `TemplatesGallery.tsx` | Central `design-registry.ts` |
| OG images | Only ivory-blush | Every design + every theme |
| Old URLs | Would 404 | Permanent redirects to new paths |
| SOLID compliance | Not considered | Full compliance (see §7) |
