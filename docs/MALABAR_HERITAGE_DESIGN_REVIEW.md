# Malabar Heritage — Senior Design Review

## Current Rating: 4/10 — "Petal Atelier with a different color palette"

The Malabar Heritage template is structurally identical to Petal Atelier. Same cover layout, same details page flow, same component order, same animations, same button styles, same copy text. The only differences are:
- Color palette (emerald/gold vs ivory/blush)
- Leaf shapes instead of rose shapes in SVGs
- A faint Kerala arch silhouette behind the cover

This is a **reskin**, not a distinct template. A senior designer would expect each template to have its own visual language, layout rhythm, and cultural identity.

---

## Side-by-Side Comparison

| Element | Petal Atelier | Malabar Heritage (current) | Verdict |
|---|---|---|---|
| Cover background | Light gradient (ivory/blush) | Dark gradient (emerald) | ✅ Different |
| Cover decorative corners | Rose clusters | Leaf clusters (same positions) | ❌ Same layout, different SVG |
| Cover center silhouette | Mosque silhouette, blurred | Kerala arch, blurred | ✅ Different shape |
| Cover content layout | Bismillah → Names → Ornament → Copy → Date | Bismillah → Names → Ornament → Copy → Date | ❌ Identical |
| Cover CTA button | Glass capsule + gold circle, "Open Invitation" | Glass capsule + gold circle, "Open Invitation" | ❌ Identical |
| Cover swipe indicator | Chevron + "Swipe up to continue" | Chevron + "Swipe up to continue" | ❌ Identical |
| Details page width | max-w-[480px] | max-w-[480px] | ❌ Identical |
| Details page sections | Header → Tagline → Countdown → Events → Timeline → Venue → Family → Quran → RSVP → Dua → Footer | Header → Tagline → Countdown → Events → Timeline → Venue → Family → Quran → RSVP → Dua → Footer | ❌ Identical order |
| Glass card style | `ib-glass` class | `ib-glass` class | ❌ Identical |
| Fonts | Cormorant Garamond + system sans | Cormorant Garamond + system sans | ❌ Identical |
| Animations | motion fade-up, whileInView | motion fade-up, whileInView | ❌ Identical |
| RSVP | Glass card with gradient bg + modal | Glass card with gradient bg + modal | ❌ Identical |
| ActionBar | 3 buttons (Location, Confirm, Calendar) | 3 buttons (Location, Confirm, Calendar) | ❌ Identical |
| Music player | Fixed top-right glass circle | Fixed top-right glass circle | ❌ Identical |
| Floating decor | Rose petals drifting | Leaves drifting | ❌ Same animation, different SVG |

**14 out of 17 elements are identical.** This is a ~82% clone.

---

## What Makes Malabar Heritage Unique (Design Brief)

From `design-registry.ts`:
- **Tagline**: "Kerala heritage"
- **Description**: "Emerald and gold elegance rooted in Malabar tradition — timeless, regal, and warm"
- **Signature**: "Glass countdown"
- **Tone**: light (but cover is dark emerald — contradiction)
- **Tags**: Emerald & Gold, Glassmorphism, Live RSVP

### Cultural Identity to Express
- **Kerala / Malabar coast**: backwaters, palm fronds, traditional Kerala architecture (gabled roofs, laterite walls)
- **Mappila / Muslim Kerala heritage**: Mappila cultural motifs, traditional Kerala gold jewelry patterns
- **Regal warmth**: the invitation should feel like a traditional Kerala home — warm, grounded, not floating glassmorphism

---

## Redesign Plan — Target: 10/10

### 1. Cover Screen — Complete Rethink

**Current**: Dark emerald gradient + leaf clusters in corners + arch silhouette + centered text stack + glass capsule button

**Redesigned**:
- **Background**: Deep emerald gradient with a **subtle Kerala paddy-field pattern** (horizontal lines like terraced fields) instead of the arabesque lattice
- **Decorative element**: Replace 4-corner clusters with **two vertical palm-frond borders** running down left and right edges (full height), like a traditional Kerala doorway frame
- **Center frame**: Replace the faint arch with a **Kerala gable roof (triangular peak)** at top center — the signature silhouette of Kerala architecture
- **Content layout**: Instead of vertically centered, use a **top-weighted layout**:
  - Top 15%: Bismillah (smaller, right-aligned for RTL)
  - Center 50%: Names in a **horizontal layout** — "Groom & Bride" on a single line (not stacked word-by-word), using a larger ampersand
  - Below names: A **traditional Kerala gold border strip** (horizontal, full width) instead of a small ornament
  - Bottom 25%: Ceremony headline + date in a compact block
- **CTA**: Replace the glass capsule with a **solid emerald button with gold border** — no glassmorphism, more grounded and traditional. Text: "Open Invitation" in serif, with a small gold arrow
- **Swipe indicator**: Remove — the button is clear enough. Instead, add a subtle **gold line animation** at the bottom that draws left-to-right

### 2. Details Page — Distinct Layout Rhythm

**Current**: Same vertical stack as Petal Atelier (Header → Countdown → Events → Timeline → Venue → Family → Quran → RSVP → Dua → Footer)

**Redesigned**:
- **Page width**: `max-w-[420px]` (slightly narrower — more intimate, phone-like)
- **Header**: Remove the floral corner accents. Instead, a **gold horizontal border line** at the very top of the page (like a traditional Kerala letterhead). Bismillah centered, then names, then date — same content but **no floral divider SVG**. Use a simple gold line with a center diamond.
- **Section spacing**: Increase to `pb-8` (more breathing room between sections — Kerala aesthetic is spacious, not cramped)
- **Countdown**: Replace the glass card with a **solid cream card with gold border** — no glassmorphism. Numbers in gold, labels in emerald.
- **Event cards**: Instead of side-by-side glass cards, use a **vertical stack** with emerald left-border accent lines — like entries in a traditional Kerala document
- **Timeline**: Replace the horizontal dot-line with a **vertical timeline** (Kerala palm tree motif as the connecting line, with gold dots at each step)
- **Venue**: Replace the SVG illustration with a **real embedded map** (as the original Malabar Heritage had) inside a gold-bordered card. Keep the "Get Directions" button but style it as solid emerald with gold text.
- **Family card**: Keep the two-column layout but replace the center floral ornament with a **traditional Kerala lamp (nilavilakku)** SVG — the iconic Kerala oil lamp that symbolizes auspicious beginnings
- **Quran verse**: Keep the same card but use a **parchment/cream background** instead of the mosque-tinted gradient — more traditional, less glassy
- **RSVP**: Replace the gradient glass card with a **solid emerald card with gold border** — "Kindly Confirm Your Presence" in gold serif on emerald background. Button is gold on emerald.
- **Closing dua**: Same content but remove the circle divider — use a **full-width gold line** with "بسم الله" calligraphy style
- **Footer**: Add a **Kerala gold border pattern** (repeating diamond motif) as a top border, then the text

### 3. Floating Decor — Rethink

**Current**: 10 leaf SVGs drifting down (same animation as Petal Atelier's petals)

**Redesigned**: Replace with **falling gold dust particles** — tiny gold dots that drift slowly downward, like sunlight filtering through palm leaves. Much more subtle (opacity 0.15-0.25), smaller (4-8px), more numerous (20 particles). This gives a warm, golden-hour Kerala feel without copying the petal drift.

### 4. Color System Adjustments

**Current themes** are correct in palette but the cover uses dark backgrounds while the design registry says `tone: "light"`. This is actually fine — the cover is a dramatic reveal, and the details page is light. But the cover text should use **warm white (#FAF8F3)** instead of pure `#fff` for the names — pure white on emerald looks clinical, warm white looks regal.

### 5. Typography Hierarchy

**Current**: Same as Petal Atelier — Cormorant Garamond for everything decorative

**Redesigned**: Introduce a **secondary display font** for section headers — use `var(--font-invitation-serif)` (which is likely Bodoni Moda or similar) for section titles like "Event Details", "Timeline", "Venue" — this creates visual hierarchy distinction from Petal Atelier which uses Cormorant for everything.

### 6. Unique Signature Element

Every template needs a "wow" moment that's unique. For Malabar Heritage:

**Kerala Gold Border Frame**: A decorative SVG border that frames the entire details page — a thin gold line with repeating traditional Kerala motifs (small diamonds, dots, and leaf curves) running down both sides of the content area. This is the signature visual that immediately distinguishes Malabar Heritage from every other template.

---

## Implementation Priority

1. **Cover Screen** — New layout (palm borders, gable roof, horizontal names, solid button)
2. **Details page section order & spacing** — Vertical timeline, vertical event cards, narrower width
3. **Glass → Solid cards** — Replace `ib-glass` with emerald/cream solid cards with gold borders
4. **Floating decor** — Gold dust particles instead of leaves
5. **Kerala gold border frame** — Signature side borders on details page
6. **Nilavilakku ornament** — Replace floral ornaments with Kerala lamp SVG
7. **Typography** — Section headers in display serif, body in Cormorant

## Target Rating: 10/10

A 10/10 Malabar Heritage should be **instantly recognizable as Kerala-inspired** within 2 seconds of seeing the cover. Currently, it's indistinguishable from Petal Atelier until you notice the color difference.
