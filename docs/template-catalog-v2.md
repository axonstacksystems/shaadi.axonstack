# Shaadi Cards — 10 Independent Template Designs

> **Design Lead:** Senior UI/Visual Designer  
> **Status:** Ready for review. Each template is a distinct visual system. No two share the same layout, animation language, or emotional register.

---

## Design Principles

1. **No color swaps.** Each template has its own typography, spacing system, border language, and motif vocabulary.
2. **One signature effect per template.** Every design has a "hero moment" that makes guests stop and stare.
3. **Mobile-first, always.** Every effect degrades gracefully on low-end devices via `prefers-reduced-motion`.
4. **shadcn/ui foundation.** All templates use `Button`, `Card`, `Separator`, `Badge` as primitives, but styled so differently you won't recognize them.

---

## Template 01 — Celestial Canvas (`celestial-canvas`)

**Visual Language:** Deep-space astronomy. Names written in star constellations.  
**Emotion:** Awe. Like looking up at a clear night sky in the desert.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Void | `#050508` | Page background — true black, not navy |
| Nebula 1 | `#1a0a2e` | Deep violet gradient stop |
| Nebula 2 | `#0d1b2a` | Deep teal gradient stop |
| Star Gold | `#f4e4b8` | Bright star dots, name constellation lines |
| Comet | `#ffffff` | Shooting star streaks |
| Text | `rgba(255,255,255,0.85)` | Body copy |

### Layout Architecture
- **Full-bleed Canvas 2D background** — 200–300 white dots (stars) with random twinkle opacity cycles
- **Constellation name reveal** — couple names rendered as connected line segments between star points. Lines draw themselves with `stroke-dashoffset` animation over 3 seconds
- **Single-column, centered** — content floats over the starfield in a narrow column (max-w-md) so the sky dominates
- **No cards in hero** — only the constellation names and Bismillah float. Everything else is below the fold

### Signature Effect: **Shooting Star Curtain Reveal**
Instead of a sliding curtain, 5–8 shooting stars streak diagonally across the screen. Where they pass, the dark overlay dissolves (CSS mask reveal). Guest feels like the sky is opening for them.

### Animations
- **Star twinkle:** Random stars pulse opacity 0.3→1→0.3 over 2–5s cycles (CSS `@keyframes`)
- **Constellation draw:** `stroke-dasharray` + `stroke-dashoffset` on SVG path (2s duration)
- **Scroll reveals:** `motion` `whileInView` with gentle fade-up
- **Shooting stars:** CSS `@keyframes` translate diagonal with opacity trail

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | Content cards use `bg-white/5 backdrop-blur-md border-white/10` — frosted glass floating over the starfield. Essential for readability without killing the void aesthetic | High |
| **3D Depth** | Starfield has 3 parallax layers: distant stars (slow), mid stars (medium), bright stars (fast). Creates genuine depth without WebGL | High |
| **Mouse Parallax** | Entire starfield shifts slightly with mouse movement (`transform: translate(x*0.02, y*0.02)`). Guest feels like they're moving through space | High |
| **Scroll Parallax** | Background nebula gradients move at 0.3× scroll speed. Content at 1×. Creates layered depth | High |
| **3D Tilt Cards** | Glass cards tilt toward cursor on hover (`perspective: 1000px rotateX/Y`). Adds tactility to the void | High |

### Upgrades for 9.5+ Rating

1. **Gravitational Lensing Effect** — A subtle CSS `radial-gradient` mask around the cursor that warps star positions slightly, like light bending around a black hole. On desktop only, adds 2KB JS
2. **Holographic Name Reveal** — Couple names start as scattered individual letters (each letter is a separate DOM element at random star positions) that gravitate toward their correct positions over 2.5s with spring physics. Like stars aligning to spell a destiny
3. **Nebula Bloom on Scroll** — As guest scrolls past the Ayah section, a deep violet `radial-gradient` slowly expands from the center, like a nebula blooming. Pure CSS `animation-timeline: scroll()`
4. **Sound-Reactive Option** — If guest taps a "Play Nikkah Nasheed" button, the starfield twinkles intensify to a simulated beat (pre-baked keyframes matched to track tempo, not real audio analysis). Adds 0KB runtime, just synced CSS
5. **Constellation Connect-the-Dots** — On hover over the couple's constellation, faint lines temporarily connect to nearby stars, showing hidden constellations. Like the sky has secrets

### What to AVOID
- **No confetti** — breaks the astronomical solemnity
- **No spring physics on scroll** — stars should feel weightless, not bouncy. Use linear or ease-out curves only

### shadcn Usage
- `Card` for ceremony details and timeline — styled with `bg-white/5 backdrop-blur-md border-white/10`
- `Button` for CTA — `variant="outline"` with gold border and glow hover

---

## Template 02 — Mughal Miniature (`mughal-miniature`)

**Visual Language:** Indian miniature painting brought to digital. Dense ornamentation, jewel tones, gold filigree borders.  
**Emotion:** Heritage, grandeur, royalty.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Parchment | `#f5e6d3` | Background — warm aged paper |
| Ruby | `#8b1a2d` | Primary accent — headings, borders |
| Sapphire | `#1e3a5f` | Secondary accent — groom card |
| Emerald | `#0f5e4a` | Tertiary accent — bride card |
| Gold | `#c9a227` | Filigree, borders, text highlights |
| Ink | `#2c1810` | Body text — warm dark brown, not black |

### Layout Architecture
- **Ornate border frame** — CSS `border-image` or pseudo-element with SVG paisley/filigree pattern that frames the entire page content (like a painting frame)
- **Asymmetrical density** — left side has dense ornamental pattern at 8% opacity; right side is clean. Content sits in the visual "quiet zone"
- **Decorated initials** — couple's first initials rendered as illuminated manuscript letters (SVG paths with ruby/emerald/gold fills)
- **Dense timeline** — events stack vertically with thick gold connecting lines and jeweled node markers (SVG circles with gradient fills)

### Signature Effect: **Filigree Border Draw**
The ornamental page border is an SVG path. On load, the gold filigree border draws itself clockwise around the page over 4 seconds (`stroke-dashoffset` animation). The guest watches the frame materialize before content appears.

### Animations
- **Border draw:** SVG stroke animation, 4s
- **Illuminated initials:** SVG fill fades in with `motion` after border completes
- **Scroll:** Gentle opacity reveals; no movement — the ornamentation does the work
- **Gold shimmer on filigree:** CSS gradient `background-clip: text` on active border elements

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | **REJECTED** — frosted glass fights the 16th-century painting aesthetic. Use solid parchment cards with gold-leaf edges instead | N/A |
| **3D Depth** | The ornate border frame has subtle `perspective: 800px` tilt on mouse move. Like tilting a physical miniature painting to catch the light | High |
| **Parallax** | Dense ornamental pattern on left moves at 0.5× scroll speed. Content at 1×. Quiet zone stays still. Creates the feeling of moving past a tapestry | High |
| **Particle System** | Tiny gold dust particles (20 particles) float upward slowly, like glitter on a royal document. Subtle, not distracting | High |
| **SVG Morph** | Jeweled node markers subtly pulse — SVG circle `r` animates 4px→5px→4px with gold gradient shimmer | High |

### Upgrades for 9.5+ Rating

1. **Gemstone Lens Refraction** — The jeweled timeline node markers are not flat circles — they're SVG gemstones (ruby, sapphire, emerald) with `feSpecularLighting` and `fePointLight` filters that create real light refraction. On hover, the light source shifts, and the gem sparkles. 3KB SVG filters, GPU-composited
2. **Mughal Architectural Parallax** — Behind the content, faint silhouettes of Mughal arches and minarets scroll at 0.1× speed, creating the feeling of standing inside a palace. Pure CSS background-position parallax
3. **Calligraphic Flourish on Hover** — When hovering over the couple's names, a gold calligraphic flourish SVG draws itself outward from the text (like a Persian illuminator adding a decorative extension). One-shot SVG stroke animation
4. **Gold Leaf Foil Stamp** — The "Open Invitation" wax seal is replaced with a gold foil stamp that physically "presses" into the parchment with a CSS `transform: scale(0.95) rotateX(10deg)` and leaves a permanent gold deboss mark. Tactile and royal
5. **Pigeon Messenger Animation** — A small white pigeon SVG flies across the screen once when the card opens, carrying a scroll. Like a royal messenger delivering the invitation. Pure CSS `@keyframes` translate + wing flap (scaleY oscillation)

### What to AVOID
- **No glassmorphism** — ruins the historical authenticity
- **No spring physics** — this is a painting, not an app. Linear fades and draws only

### shadcn Usage
- `Card` for all content blocks — heavy custom styling with `border-gold/30 bg-parchment`
- `Badge` for "NIKAH CEREMONY" label — custom gold border, parchment bg
- `Button` — solid ruby background with gold text, ornamental corners via `clip-path`

---

## Template 03 — Neon Dhaba (`neon-dhaba`)

**Visual Language:** Indian street neon signage. Hot pink, electric blue, saffron against pitch black. Bollywood poster typography. Gritty, loud, joyous.  
**Emotion:** Unapologetic celebration. This is not subtle.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Street Black | `#0a0a0a` | Background |
| Neon Pink | `#ff2a6d` | Primary headings, bride's name |
| Electric Blue | `#05d9e8` | Secondary headings, groom's name |
| Saffron | `#ff9f1c` | Accents, CTA buttons, dividers |
| White Neon | `#ffffff` | Body text with glow |
| Shadow | `#1a1a1a` | Card surfaces |

### Layout Architecture
- **Diagonal energy** — everything is slightly tilted. Cards have `rotate(-1deg)`, the hero text is at a 2-degree angle. Even the timeline zigzags instead of going straight down
- **Stacked neon signs** — each section is a separate "neon sign board" with thick borders and inner glow
- **Bold stacked typography** — names are huge, stacked vertically, each letter a different neon color gradient
- **QR-code style pattern** — subtle repeating halftone dot pattern at 3% opacity in background (like a printed poster)

### Signature Effect: **Neon Flicker Entrance**
When the card opens, all neon text elements flicker on randomly like a faulty street sign (random `opacity` keyframes 0→1→0.5→1 over 0.3s intervals). Then they stabilize with a warm glow. The effect is immediate, surprising, and unmistakably Indian street culture.

### Animations
- **Neon flicker:** CSS `@keyframes` with random `opacity` steps on text elements
- **Text glow pulse:** `text-shadow` with alternating blur radius (simulating neon transformer hum)
- **Scroll:** Bold `motion` slide-ins from alternating left/right with spring physics
- **Hover on cards:** Intensified glow + slight scale-up

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | Neon signs use **frosted glass panels** (`bg-black/40 backdrop-blur-lg border-neon-pink/30`) behind the neon text. The glow bleeds through the glass like real signage | High |
| **3D Depth** | Cards have aggressive 3D tilt (`perspective: 800px rotateX: ±15deg rotateY: ±15deg`). Like physically grabbing a neon sign and tilting it | High |
| **Parallax** | Halftone dot pattern background moves at 0.2× scroll speed. Neon signs at 1×. Creates "poster on a moving wall" depth | High |
| **RGB Split Depth** | On hover, card contents get an RGB chromatic aberration shift (`text-shadow: 3px 0 cyan, -3px 0 magenta`). Like a 3D anaglyph without glasses | High |
| **Particle System** | Tiny neon-colored sparks (15 particles) burst outward when hovering a card. One-shot, not continuous | High |

### Upgrades for 9.5+ Rating

1. **Holographic Projection Grid** — Behind the neon signs, a faint cyan grid floor extends into 3D perspective (`perspective: 800px rotateX(60deg)`), like a retro holographic display. The grid lines pulse with the neon glow. Pure CSS, 0KB added
2. **Bass-Reactive Neon Pulse** — The neon glow intensity subtly pulses in a pre-baked rhythm (simulating music) when the guest scrolls into the hero section. Not real audio analysis — just CSS `@keyframes` with carefully timed opacity/blur cycles
3. **AR-Style Scan Grid on Open** — When the card opens, a cyan scanning line sweeps top-to-bottom once (like a barcode scanner), and as it passes, the neon elements "lock in" and brighten. Adds a sci-fi activation feel
4. **Exploding Text Reveal** — The couple's names don't just appear — each letter explodes inward from off-screen positions with `motion` spring physics (high stiffness), slamming into place like neon tubes being installed. One-shot, not continuous
5. **Reflection on Wet Street** — The bottom 15% of the screen shows a dark reflection of the neon signs with `transform: scaleY(-1) opacity(0.3) blur(2px)`, like wet Mumbai streets at 2 AM. Adds atmosphere instantly

### What to AVOID
- **No spring physics** — neon signs snap, they don't bounce. Use `stiffness: 400, damping: 15` for hard, snappy motion
- **No soft gradients** — this is sharp, blocky, high-contrast

### shadcn Usage
- `Card` — thick colored borders (`border-2 border-neon-pink/50`), dark surface, inner glow via `box-shadow`
- `Button` — solid saffron with black text, neon glow on hover
- `Badge` — neon tube style: dark bg, colored border, colored text with glow

---

## Template 04 — Brutalist Union (`brutalist-union`)

**Visual Language:** Swiss brutalism / concrete architecture. No decoration. Pure information, massive scale, thick borders, systematic grids.  
**Emotion:** Quiet power. Confidence without ornament.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Concrete | `#e5e5e5` | Page background |
| Charcoal | `#1a1a1a` | Primary text, borders, buttons |
| Signal Red | `#ff3300` | ONLY accent — used exactly 3 times: ampersand, RSVP deadline, one divider |
| White | `#ffffff` | Card surfaces |
| Gray | `#888888` | Secondary text, metadata |

### Layout Architecture
- **Strict grid system** — everything aligns to an 8px baseline grid. No centering without reason
- **Massive type** — couple names at `clamp(4rem, 15vw, 10rem)`, weight 900, uppercase, tight letter-spacing
- **Thick rules** — dividers are 4px solid charcoal, not 1px gold
- **Boxy cards** — zero border-radius. Sharp 90-degree corners on everything
- **Asymmetrical layout** — groom info left-aligned in a wide column, bride info right-aligned. They don't mirror. The grid respects the content
- **Monospaced date** — event date in monospace font (JetBrains Mono), emphasizing precision

### Signature Effect: **Typewriter Reveal**
The couple's names type themselves out letter by letter on the opening screen (CSS `width` animation with `overflow: hidden` + `white-space: nowrap`). A blinking cursor (`|` in signal red) follows. Then the cursor disappears and the rest of the page scrolls into view. Brutalist, mechanical, unforgettable.

### Animations
- **Typewriter:** CSS `width` animation from 0 to 100% over 2s on name text
- **Scroll:** Hard cuts. No fade. Content snaps into place with `motion` `stiffness: 300, damping: 30` (fast, decisive)
- **Hover on buttons:** Background color inverts (charcoal → concrete, text → charcoal). No glow, no scale, no nonsense

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | **REJECTED** — brutalism is about raw material. Use solid concrete-gray cards with sharp edges. No blur, no transparency | N/A |
| **3D Depth** | Massive type has a subtle `text-shadow: 4px 4px 0px #cccccc` — flat 3D extrusion, like a concrete block casting a shadow. No perspective, no rotate | High |
| **Parallax** | The 8px baseline grid lines are visible at 5% opacity and move at 0.1× scroll speed. Like looking down at architectural blueprints as you scroll | High |
| **Scroll-Triggered Reveal** | Content blocks enter with `motion` `stiffness: 300, damping: 30` — fast, decisive, no bounce. Like a blueprint snapping into place on a light table | High |
| **Grid Lines Draw** | On scroll, thin grid lines draw themselves horizontally (`width: 0→100%`) before content appears. Mechanical precision | High |

### Upgrades for 9.5+ Rating

1. **Architectural Isometric Blueprint Explosion** — On open, the entire invitation is initially displayed as a flat 2D architectural blueprint (thin white lines on charcoal). After 2 seconds, the blueprint "explodes" into 3D isometric depth — each section (hero, timeline, venue) physically separates along the Z-axis (`translateZ`) and rotates into its final position. Like a building assembling itself from a plan. Pure CSS `transform-style: preserve-3d`
2. **Concrete Pour Reveal** — Instead of a typewriter, the names are "poured" into place — a dark gray gradient mask expands from bottom to top, revealing the text like wet concrete filling a mold. Adds weight and physicality
3. **Structural Beam Divider** — Instead of thin lines, section dividers are thick I-beam shapes (CSS `clip-path` or SVG) that slide in from alternating sides. Like a building's structural elements locking into place
4. **Rebar Grid Interaction** — On hover over any card, a faint rebar (reinforcement bar) grid pattern fades in at 10% opacity within the card. Like X-raying concrete to see its strength
5. **Foundation Stone Stamp** — The RSVP confirmation triggers a heavy "STAMPED" overlay animation — a large red circle with "APPROVED" text slams onto the screen with a `scale(3)→scale(1)` spring animation and slight screen shake (`transform: translateX` jitter). Brutalist, definitive, satisfying

### What to AVOID
- **No rounded corners** — anywhere. `rounded-none` on everything
- **No gradients** — flat colors only. Concrete, charcoal, white, signal red
- **No blur/backdrop-filter** — brutalism rejects decoration

### shadcn Usage
- `Card` — `rounded-none border-4 border-charcoal bg-white`
- `Button` — `rounded-none bg-charcoal text-white hover:bg-signal-red hover:text-charcoal`
- `Separator` — `h-1 bg-charcoal` (thick, solid)
- `Badge` — `rounded-none border-2 border-charcoal bg-white text-charcoal uppercase tracking-widest`

### Font Addition
- Add `JetBrains Mono` to `layout.tsx` for the date/metadata. One additional Google Font.

---

## Template 05 — Art Deco Grand (`art-deco-grand`)

**Visual Language:** 1920s Gatsby glamour. Sunburst rays, stepped geometry, gold-leaf everything, fan motifs.  
**Emotion:** Old Hollywood luxury. Champagne and jazz.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Onyx | `#0f0f0f` | Background |
| Gold Leaf | `#c9a227` | Primary accent — everything ornamental |
| Champagne | `#f4e4b8` | Secondary text, highlights |
| Blush | `#d4a5a5` | Subtle accent — ampersand, bride labels |
| Cream | `#faf8f3` | Card surfaces |

### Layout Architecture
- **Sunburst hero** — CSS `repeating-conic-gradient` creating golden rays emanating from behind the couple's names
- **Stepped borders** — every card has a stepped/geometric border pattern using `clip-path` polygon (Art Deco ziggurat motif)
- **Fan-shaped dividers** — SVG fan motifs between sections (like a 1920s theater curtain tie-back)
- **Symmetrical perfection** — everything is mirrored. Groom left, bride right. Events left-aligned, details right-aligned. The layout itself is ornamental
- **Metallic gold text** — names rendered with `background: linear-gradient(90deg, #b8941f, #f4e4b8, #b8941f)` + `background-clip: text`

### Signature Effect: **Sunburst Spin**
The golden sunburst behind the names slowly rotates (CSS `animation: rotate 60s linear infinite`). It's almost imperceptible, but when you look back at the hero, the rays have shifted. It gives the page life without distraction.

### Animations
- **Sunburst rotation:** CSS `transform: rotate()` over 60s
- **Card entrance:** `motion` scale-up from 0.95 with spring — cards "pop" into place
- **Gold shimmer on names:** Gradient position shifts continuously
- **Fan dividers:** SVG paths draw themselves on scroll

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | Ceremony cards use **heavy glassmorphism** (`bg-cream/30 backdrop-blur-xl border-gold/40`) — like looking through champagne glass at the Gatsby party behind it | High |
| **3D Depth** | The sunburst has 3 concentric layers rotating at different speeds (outer: 90s, mid: 60s, inner: 45s). Creates genuine 3D depth in a 2D plane | High |
| **Parallax** | Fan dividers between sections move at 0.6× scroll speed. Content at 1×. Like theater curtains parting as you walk down the aisle | High |
| **Gold Shimmer Particles** | 15 tiny gold particles orbit slowly around the sunburst center. Like champagne bubbles catching light | High |
| **3D Card Tilt** | Glass cards have `perspective: 1200px` with gold reflection highlight that shifts with mouse position. Like tilting a gold-leafed mirror | High |
| **Metallic Text** | Names use animated gradient `background-clip: text` with shifting gold positions (shimmer). Like real gold leaf catching changing light | High |

### Upgrades for 9.5+ Rating

1. **Diamond Prism Light Refraction** — Behind the couple's names, a rotating diamond-shaped prism (SVG polygon with `feColorMatrix` and `feGaussianBlur` filters) casts colored light caustics onto the background. Like sunlight through a chandelier crystal. Shifts colors as it rotates
2. **Champagne Bubble Physics** — 30 tiny circular `div`s rise through the hero section with realistic wobble (`sin()`-based horizontal drift). Each bubble has a white highlight dot that shifts position, making them look 3D. Not particles — individual DOM elements for better control
3. **Velvet Curtain Drape** — The opening reveal is not a fade — it's a pair of heavy velvet curtains (SVG paths with rich crimson gradients) that physically draw apart with weighted-bottom sway physics. Like a theater premiere
4. **Marquee Light Bulb Flicker** — A thin horizontal marquee of tiny light bulbs frames the top of the page. Each bulb randomly flickers on/off (independent CSS animations) like old Broadway signage. Adds constant life
5. **Gatsby Confetti Cannon** — `canvas-confetti` fires gold and black feather-shaped confetti (custom `shapes` array) when the guest clicks "Open Invitation." The feathers drift slowly downward with rotation, like a 1920s ticker-tape parade

### What to AVOID
- **No neon/fluorescent colors** — this is 1920s, not 1980s
- **No bounce/spring** — Art Deco is geometric precision. Linear and ease-in-out only

### shadcn Usage
- `Card` — `clip-path` stepped border, gold border, cream surface
- `Button` — solid gold with onyx text, `clip-path` stepped corners
- `Badge` — gold border, cream bg, all-caps with wide tracking
- `Separator` — replaced entirely by SVG fan motifs

---

## Template 06 — Zen Sumi (`zen-sumi`)

**Visual Language:** Japanese ink wash painting (sumi-e). Asymmetry, vast whitespace, single brush strokes, meditative pace.  
**Emotion:** Peace. One breath. Presence over celebration.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Rice Paper | `#f7f5f0` | Background — not white, not cream. Rice paper warmth |
| Sumi Ink | `#1a1a1a` | Primary text — near-black with slight warmth |
| Wash Gray | `rgba(26,26,26,0.15)` | Subtle ink wash gradients |
| Vermillion | `#c0392b` | Single accent — the seal stamp (hanko) only |
| Sage | `#7a9e7e` | Single botanical accent — one leaf SVG |

### Layout Architecture
- **Asymmetrical composition** — content sits in the lower-right third of the viewport. Upper-left is empty — this is intentional negative space, the "ma" (間) of Japanese design
- **Single brushstroke Bismillah** — not typed. An SVG path of a single sweeping brushstroke that spells بسم الله. It reads as calligraphy, not text
- **Vertical timeline** — events read top-to-bottom in a single thin column on the right edge, like a scroll
- **Hanko seal** — a red vermillion circle stamp (SVG) at the bottom of the page, as if the artist signed the work
- **No cards** — no borders, no shadows. Content floats on the paper

### Signature Effect: **Ink Spread**
When the card opens, the brushstroke Bismillah doesn't just appear — it "spreads" like ink on rice paper. The SVG path draws itself (stroke-dashoffset), and simultaneously a radial `mask-image` expands from the center, revealing the path as if ink is soaking into paper from a brush touch.

### Animations
- **Ink spread:** SVG stroke-draw + radial mask expansion (3s)
- **Content reveals:** Very slow, gentle fade (1.5s). No movement. Just presence
- **Hanko stamp:** Scale from 1.2 to 1.0 with a slight "squish" — like a rubber stamp pressing down
- **Scroll:** Almost none. The page is short. Everything is visible or near-visible

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | **REJECTED** — ink on rice paper needs no glass. The "ma" (negative space) is the feature, not the material | N/A |
| **3D Depth** | Content blocks have the subtlest possible tilt: `perspective: 2000px rotateX: 1deg rotateY: 1deg` on hover. Like a scroll unrolling slightly | High |
| **Parallax** | The single brushstroke Bismillah is fixed at 0× scroll speed (pinned). Content scrolls past it. Like reading a scroll where the header stays visible | High |
| **Ink Bleed** | On scroll, a faint gray ink wash gradient (`radial-gradient` from transparent to `rgba(26,26,26,0.08)`) follows the cursor, as if the page absorbs moisture from touch | Medium |
| **Breathing Space** | Sections don't "enter" — they simply appear after a 2s delay when scrolled into view. No movement, no spring. Just presence | High |

### Upgrades for 9.5+ Rating

1. **Rain on Pond Ripples** — On the opening screen, a single raindrop falls (CSS `@keyframes` translateY) and "hits" the brushstroke Bismillah, triggering concentric SVG `circle` ripples that expand outward and fade. Like watching rain on a temple pond. Pure CSS, no JS
2. **Wind-Responsive Brushstroke** — The single brushstroke Bismillah subtly undulates (SVG path `d` morphing or CSS `skewX` oscillation) like a scroll hanging in a gentle breeze. Gives the static image life without breaking the calm
3. **Falling Maple Leaf** — A single red maple leaf (SVG) drifts diagonally across the screen once during the opening, rotating gently as it falls. Like autumn in Kyoto. Pure CSS `@keyframes` — one element, not a particle system
4. **Moss Growth on Scroll** — As the guest scrolls down, tiny green moss dots (5px circles in sage) gradually "grow" (scale 0→1) along the left edge of the content column, like moss colonizing a stone garden path over time. Scroll-linked via `animation-timeline: scroll()`
5. **Bonsai Pruning Interaction** — When the guest hovers over the timeline events, a tiny bonsai branch SVG extends from the event node and a single leaf "grows" (scale 0→1) on the branch. Like tending a garden. One-shot, not continuous

### What to AVOID
- **No cards, no borders, no shadows** — anything that frames content violates the aesthetic
- **No fast animations** — everything slower than 1.5s feels rushed for Zen
- **No gradients on text** — flat sumi ink only

### shadcn Usage
- **No shadcn Card** — borders violate the aesthetic. Use plain `div` with generous padding
- `Button` — minimal: text-only with a subtle underline that expands on hover
- `Badge` — not used. Labels are simple text

### Font Addition
- Add `Noto Serif JP` (Japanese serif) to `layout.tsx` for the English headings — adds a subtle Eastern gravitas

---

## Template 07 — Tropical Heat (`tropical-heat`)

**Visual Language:** Caribbean carnival. Liquid gradients, palm shadows, hot colors, beach sand texture.  
**Emotion:** Joy. Sweat. Dancing. The wedding is a party.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Sand | `#f5e6d3` | Base background |
| Coral | `#ff6b6b` | Primary accent — headings |
| Tangerine | `#f4a261` | Secondary accent — groom |
| Magenta | `#e056fd` | Tertiary accent — bride |
| Teal | `#2a9d8f` | Cool balance — footer, small text |
| Palm | `#2d3436` | Palm silhouette color |

### Layout Architecture
- **Liquid gradient hero** — CSS `linear-gradient` that slowly shifts hue via `@keyframes` (coral → tangerine → magenta → coral over 20s). The background is alive
- **Palm silhouette parallax** — SVG palm frond silhouettes fixed at different `z-index` layers. On scroll, they move at different speeds (pure CSS `transform: translateY` tied to scroll position via JS)
- **Polaroid timeline** — each event is a tilted polaroid-style frame with a drop shadow, slightly rotated (-2deg to +2deg each). Feels like scattered memories on a beach towel
- **Wave section dividers** — SVG wave paths between every section. They undulate gently via CSS `transform: translateX` loop

### Signature Effect: **Liquid Gradient Background**
The hero section's background is a massive gradient that slowly morphs through the entire warm spectrum. It never stops. This isn't a static color — it's a living, breathing sunset. Combined with the palm silhouettes, it feels like the sun is setting in real time behind the invitation.

### Animations
- **Liquid gradient:** CSS `@keyframes` shifting `background-position` on a 200% wide gradient
- **Palm parallax:** JS `scroll` event updates `transform` on fixed-position SVG layers
- **Polaroid tilt:** Each card has a fixed `rotate()` between -2deg and +2deg. On hover, it straightens to 0deg with spring
- **Wave motion:** SVG paths animate with CSS `transform: translateX` loop

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | Polaroid cards use **frosted glass backing** (`bg-white/70 backdrop-blur-md`) over the liquid gradient. The sunset bleeds through the polaroid edges like a real photo held against light | High |
| **3D Depth** | Each polaroid has a `transform-style: preserve-3d` with `rotateX(5deg) rotateY(-3deg)` by default. On hover, it straightens to 0deg with spring + lifts (`translateZ(20px)`). Like picking up a physical photo | High |
| **Parallax** | 4 palm silhouette layers at different z-depths: far palms (0.1× scroll), mid palms (0.3×), near palms (0.6×), content (1×). Creates genuine tropical depth | High |
| **Liquid Gradient** | Hero background is a 400%-wide `linear-gradient` animated via `background-position` shift over 15s. Coral → tangerine → magenta → coral. Never stops | High |
| **Wave Parallax** | SVG wave dividers have 3 layers with different amplitudes and speeds. Far waves slow, near waves fast. Like looking at the ocean | High |
| **Confetti Burst** | `canvas-confetti` on open — tropical flower-shaped confetti (no code needed, just colors: coral, tangerine, teal) | High |

### Upgrades for 9.5+ Rating

1. **Ocean Caustics Projection** — The background of the hero section has a moving light caustics pattern (SVG `filter` with `feTurbulence` animated `baseFrequency`) that projects rippling light onto the sand, like sunlight refracting through shallow water. Adds living texture
2. **Bioluminescent Plankton** — When the guest scrolls into the venue section at night (dark overlay fades in), tiny bioluminescent dots (5px cyan circles) appear in the wave section, glowing and fading. Like swimming in bioluminescent waters
3. **Coconut Tree Sway Physics** — The palm silhouette parallax layers include a subtle `skewX` oscillation (CSS `@keyframes` 4s loop, 2deg range) that simulates wind sway. The far palms sway less, near palms sway more — realistic depth
4. **Sandcastle Build Reveal** — The countdown section is revealed like a sandcastle being built — each number "rises" from the sand (gradient mask revealing from bottom) with a small puff of sand particles (5 CSS dots scaling up and fading). Playful and tactile
5. **Seashell Conch Sound** — A tiny conch shell SVG sits at the bottom of the page. On hover, it subtly glows (gold `box-shadow` pulse) and a tooltip says "Blow the conch to celebrate" — a cultural touchpoint for South Asian weddings. No actual sound needed, just the glow

### What to AVOID
- **No dark mode** — this is pure daylight. No navy, no charcoal backgrounds
- **No geometric precision** — everything is organic, wavy, tilted, imperfect

### shadcn Usage
- `Card` — polaroid style: `bg-white p-3 shadow-xl rotate-[-1deg]` (each card gets a different rotation via inline style)
- `Button` — solid coral with white text, rounded-full (pill shape)
- `Badge` — bright colored pills with white text

---

## Template 08 — Victorian Herbarium (`victorian-herbarium`)

**Visual Language:** 19th-century botanical illustration. Pressed flowers, wax seals, handwritten script, muted earth tones.  
**Emotion:** Nostalgia. Slow love. Timeless romance.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Aged Paper | `#ede8e0` | Background — warm, slightly yellowed |
| Sepia | `#5c4033` | Primary text — brown ink |
| Sage | `#7d8471` | Botanical accent — leaves, stems |
| Dusty Rose | `#c9a9a6` | Flower accent — muted, not bright |
| Wax Seal | `#8b0000` | Deep crimson — used only for the wax seal SVG |
| Gold | `#b8941f` | Thin gold lines, delicate filigree |

### Layout Architecture
- **Handwritten headings** — Cormorant Garamond (already loaded) but used more expressively: large, slightly irregular letter-spacing, like actual handwriting
- **Pressed flower illustrations** — SVG botanical illustrations (rose, fern, baby's breath) placed at the corners of cards, as if physically pressed onto the page
- **Wax seal CTA** — the "Open Invitation" button is a wax seal (SVG circle with crimson fill, gold rim, embossed letter "W" for "Welcome"). It "presses" down on click (scale 0.95 + shadow change)
- **Thin gold rules** — 0.5px gold lines separating sections, like a letter from the 1800s
- **Vintage paper texture** — heavy grain overlay via CSS `mix-blend-mode: multiply`

### Signature Effect: **Wax Seal Press**
The opening interaction is a wax seal press. A large SVG wax seal (crimson circle with gold rim) sits in the center. On click, it physically presses down (CSS `transform: scale(0.9)` + shadow deepens), and the page "unfolds" like a letter — content sections slide in from alternating sides with a paper-curl feel.

### Animations
- **Wax seal press:** CSS `transform: scale(0.9)` + `box-shadow` deepen on click
- **Letter unfold:** Content sections enter with `motion` from alternating left/right, like unfolding paper
- **Flower bloom:** SVG botanical illustrations have petals that subtly "open" (scale from 0.8 to 1.0) on scroll
- **Grain texture:** Static, no animation. Adds tactile depth

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | **REJECTED** — wax seals and pressed flowers on paper need no glass. Use textured cardstock surfaces with deckle edges instead | N/A |
| **3D Depth** | The wax seal has `perspective: 600px rotateX(15deg)` by default. On click, it presses flat (`rotateX(0deg)`) with shadow deepening. Like physically pressing a seal into wax | High |
| **Parallax** | Botanical illustrations in the corners are pinned at different scroll speeds. Top-left fern (0.3×), bottom-right rose (0.5×). Like looking at a scrapbook where the decorations lift off the page | High |
| **Paper Curl Shadow** | Cards have a subtle `box-shadow: -2px 2px 5px rgba(0,0,0,0.1)` offset to the bottom-right, like a page lifted at the corner. On hover, shadow shifts as if the page is being turned | High |
| **Flower Bloom** | SVG botanical petals scale from 0.7 to 1.0 with `motion` spring when scrolled into view. Like the pressed flower is "opening" after years in a book | High |
| **Wax Drip** | Tiny SVG wax drips below the seal animate with `height: 0→8px` on hover, as if fresh wax is melting | Medium |

### Upgrades for 9.5+ Rating

1. **Victorian Zoetrope Animation** — A small circular zoetrope strip (SVG sequence of 8 frames showing a couple walking toward each other) sits near the couple's names. On scroll past, the strip rotates rapidly, creating the illusion of motion — the first animation technology, at a Victorian wedding. Pure CSS `@keyframes` rotating a masked SVG strip
2. **Pressed Flower AR Reveal** — Each pressed flower illustration (rose, fern, jasmine) is initially flat and muted. On hover, it "lifts" off the page (`translateZ(10px) rotateX(-5deg)`) and gains saturation, like seeing the real flower through an AR lens while the pressed version stays below
3. **Handwritten Letter Unfold** — The RSVP section appears as a folded letter. On tap, it unfolds in 3D (`rotateY: -90deg → 0deg` with `preserve-3d`) revealing the form inside, complete with a wax seal breaking. Pure CSS 3D transform
4. **Copperplate Engraving Reveal** — The couple's names are initially invisible (same color as background). A virtual "engraving tool" (a thin gold line) traces the letter outlines one by one, and as each letter is traced, it turns dark sepia. Like a copperplate being etched. SVG stroke animation on text paths
5. **Dust Mote Dance** — 20 tiny golden dust particles float in sunbeams (diagonal gradient bands at 5% opacity). The dust motes move in slow, random Brownian motion within each sunbeam. Like light streaming through a Victorian library window. Pure CSS `@keyframes` with random delays

### What to AVOID
- **No blur, no transparency** — everything is physical: paper, wax, ink
- **No fast motion** — Victorian pace is slow, deliberate, sentimental

### shadcn Usage
- `Card` — `bg-aged-paper border border-gold/20 shadow-none`. No modern shadow. Feels like cardstock
- `Button` — replaced by the wax seal interaction entirely
- `Badge` — small pressed-flower icon + text label
- `Separator` — thin 0.5px gold line

---

## Template 09 — Nordic Frost (`nordic-frost`)

**Visual Language:** Scandinavian minimalism. Pure white, pale pine, crystal geometry. Restrained, cold, beautiful.  
**Emotion:** Calm. Clarity. The quiet before the celebration.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Snow | `#fafafa` | Page background — not white, but snow-white |
| Pine | `#2d4a3e` | Single accent color — evergreen green |
| Ice | `#a8c8d8` | Secondary accent — cool blue-gray |
| Charcoal | `#1a1a1a` | Text |
| Silver | `#c0c0c0` | Subtle borders, dividers |

### Layout Architecture
- **Single massive serif heading** — couple names at `clamp(5rem, 20vw, 12rem)`, centered, taking up 60% of the viewport
- **Extreme whitespace** — 200px+ vertical padding between sections. Content breathes
- **Crystal geometry dividers** — SVG hexagon/snowflake shapes at 5% opacity, aligned to a strict grid
- **Two-column asymmetric** — left column is 60% width (content), right column is 40% (metadata). The grid is visible: thin silver lines form a grid behind the content at 3% opacity
- **Monospace metadata** — dates, times, addresses in monospace font for precision

### Signature Effect: **Frost Crystal Formation**
The background starts as pure white. As the guest scrolls, SVG hexagonal "ice crystals" fade in and connect to each other like a growing frost pattern on a window. The crystals are positioned via a hexagonal grid algorithm. By the bottom of the page, a delicate lattice of ice connects all content blocks.

### Animations
- **Crystal formation:** SVG hexagons fade in and connect with thin ice lines as scroll progresses (JS `scroll` event updates opacity/connectors)
- **Text entrance:** Very slow fade (2s). No movement. No spring
- **Hover on links:** Ice-blue underline expands from center outward

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | **HEAVY glassmorphism** — this IS the Nordic aesthetic. Cards use `bg-white/60 backdrop-blur-2xl border-white/40` with `box-shadow: 0 8px 32px rgba(168,200,216,0.2)`. Like looking through a frosted window at the snow | High |
| **3D Depth** | Hexagonal crystals have `preserve-3d` with each face at a slightly different `translateZ`. On scroll, the lattice "grows" outward from the page. Like ice crystals forming in 3D space | High |
| **Parallax** | Hex grid background moves at 0.15× scroll speed (very slow). Crystal nodes at 0.5×. Content at 1×. Creates the feeling of looking through layered ice | High |
| **Snowfall Particles** | 40 white dots drift downward at varying speeds and sizes. Some have slight horizontal drift (wind). Like looking out a window during a gentle snowfall | High |
| **Frost Edge** | Cards have a `border-image: linear-gradient(180deg, white 0%, transparent 100%)` on the top edge only. Like frost accumulating at the top of a window | Medium |
| **Ice Crack** | On hover, a thin SVG crack line draws itself across the glass card (`stroke-dashoffset` animation). Playful, not destructive | Medium |

### Upgrades for 9.5+ Rating

1. **Aurora Borealis** — Behind the frost crystals, a faint aurora borealis effect (CSS `linear-gradient` with `hue-rotate` animation shifting through ice-blue, pine-green, and pale violet) undulates slowly. Like the northern sky behind a frosted window. Pure CSS, GPU-composited
2. **Ice Fractal Growth** — The frost crystals don't just fade in — they "grow" using an L-system fractal algorithm rendered as SVG paths that extend branch by branch over 4 seconds. Each crystal starts as a single hexagon and recursively adds arms. Mathematically beautiful and mesmerizing
3. **Breath Fog on Glass** — When the guest hovers over a card, a small circular area near the cursor briefly fogs up (opacity gradient from clear to white, then clears) like breathing on cold glass. Pure CSS `radial-gradient` mask that follows cursor position via JS
4. **Northern Star Constellation** — A small Ursa Major constellation (7 stars) sits in the top-right corner. The stars twinkle, and on hover, faint lines connect them (SVG stroke draw). A quiet astronomical touch that fits the Nordic night sky
5. **Ice Crystal Sound Visualization** — If the guest taps a "Play Nasheed" button, the frost crystals subtly pulse in brightness (`opacity` oscillation) in a pre-baked rhythm, like the ice is vibrating to the music. No actual audio analysis — just synced CSS keyframes

### What to AVOID
- **No warm colors** — no gold, no coral, no orange. Ice, pine, silver, white only
- **No rounded corners** — hexagons and crystals have sharp geometry. Use `rounded-sm` maximum

### shadcn Usage
- `Card` — `bg-white border border-silver/30 shadow-none`. Clean, no radius exaggeration
- `Button` — `variant="outline"` with pine border and text. On hover, background fills with pine, text turns white
- `Badge` — `bg-ice/20 text-pine` — subtle, no border
- `Separator` — 1px silver line

### Font Addition
- `JetBrains Mono` for all metadata (dates, times, addresses) — adds Scandinavian precision

---

## Template 10 — Glitch Noir (`glitch-noir`)

**Visual Language:** Cyberpunk / Y2K digital aesthetic. Glitch text, scanlines, terminal monospace, raw digital noise.  
**Emotion:** Unexpected. Playful disruption. A wedding card that breaks the rules.

### Palette
| Role | Hex | Usage |
|---|---|---|
| Terminal Black | `#0c0c0c` | Background |
| Phosphor Green | `#00ff41` | Primary text — terminal green |
| CRT Amber | `#ffb000` | Accent — warnings, CTAs |
| Glitch Cyan | `#00f0ff` | Secondary accent — bride's name |
| Glitch Magenta | `#ff00ff` | Tertiary accent — groom's name |
| Scanline | `rgba(0,0,0,0.3)` | Horizontal line overlay |

### Layout Architecture
- **CRT screen frame** — the entire card sits inside a CSS border that looks like a vintage CRT monitor bezel (rounded corners, thick gray border with inner shadow)
- **Scanline overlay** — a fixed overlay of 1px horizontal lines at 50% opacity, creating the classic CRT interlaced look
- **Glitch typography** — names rendered with `text-shadow` offsets in cyan/magenta (RGB split glitch effect). The offsets animate slightly on hover
- **Terminal monospace body** — all body text in `JetBrains Mono`, green-on-black, like reading a system log
- **Progress bar countdown** — countdown timer as a terminal progress bar: `[████████░░] 12 days`
- **Blinking cursor** — a blinking `█` follows the last line of text

### Signature Effect: **RGB Glitch Reveal**
On open, the couple's names appear with a severe glitch: they split into cyan/magenta/yellow channels that violently offset left/right for 0.5s, then snap back into alignment. This is achieved with CSS `text-shadow` animation. It's jarring, funny, and completely unforgettable. Then the scanlines settle in and the "system" (the invitation) boots up.

### Animations
- **RGB glitch:** CSS `@keyframes` shifting `text-shadow` offsets for 0.5s
- **Scanline flicker:** CSS `@keyframes` subtle opacity jitter on scanline overlay (0.98→1.0)
- **Cursor blink:** CSS `@keyframes` opacity 0→1 every 0.8s
- **Progress bar fill:** CSS `width` animation on countdown bar
- **Scroll:** Hard snap-in. No fade. Content appears instantly like a terminal refresh

### Modern UI Features Audit

| Feature | Implementation | Feasibility |
|---|---|---|
| **Glassmorphism** | Terminal "windows" use glassmorphism: `bg-black/80 backdrop-blur-sm border border-phosphor-green/40`. Like a transparent terminal window floating in a dark room | High |
| **3D Depth** | The CRT frame has `perspective: 1000px` with a slight inward bezel shadow. The screen content sits recessed, like a real monitor | High |
| **Parallax** | Scanlines scroll at 0× speed (fixed overlay). Glitch text at 1×. Background noise pattern at 0.5×. Like the screen is a window into a digital world | High |
| **RGB Split Depth** | Names have persistent RGB split (`text-shadow: 2px 0 magenta, -2px 0 cyan`). On hover, the split intensifies and the channels offset further, then snap back. Like a damaged video signal | High |
| **Data Corruption** | On scroll, 1-2 random characters in headings briefly glitch to wrong glyphs (using CSS `content` with `:before/:after` pseudo-elements). Like data corruption in transit | Medium |
| **Terminal Boot** | On open, the entire page "boots" — a phosphor-green cursor blinks, then lines of text appear one by one (CSS `height` animation on each line). The invitation is "loading" | High |

### Upgrades for 9.5+ Rating

1. **Holographic Terminal Projection** — The terminal window doesn't just sit on the page — it appears to float above it with a holographic glow (`box-shadow: 0 0 60px rgba(0,255,65,0.15)`). On mouse move, the glow shifts slightly (CSS `radial-gradient` background-position following cursor), like a projected hologram responding to hand position
2. **Corrupted Memory Dump Reveal** — Before the terminal boots, the screen shows a brief "memory dump" — random hex values (`0x7F3A...`) scrolling vertically for 0.8s, then the hex morphs into the wedding text. Like the system had to recover the invitation from corrupted memory. Pure CSS `@keyframes` on text content via `::before`/`::after`
3. **VHS Tracking Distortion** — During the RGB glitch reveal, horizontal tracking lines (thin white/green lines that shift up/down rapidly) sweep across the names for 0.3s, like a damaged VHS tape. Then the tracking stabilizes. Adds retro physicality to the digital glitch
4. **Terminal Typing Sound Visualizer** — As each line of the invitation "types" itself in the boot sequence, a tiny green bar (5px wide) pulses at the bottom-right of the terminal window, like a volume indicator. Not actual sound — just visual feedback that "data is arriving"
5. **Hidden Command Easter Egg** — A `>` prompt at the bottom allows the guest to "type" (tap pre-written commands): `> show_venue` — map iframe slides in; `> confirm_rsvp` — RSVP form appears with a green `[OK]` status. Gamifies the invitation without breaking the terminal fiction

### What to AVOID
- **No organic shapes** — everything is rectangular, blocky, pixelated
- **No gradients** — flat phosphor colors only. Green, amber, cyan, magenta on black
- **No smooth curves** — sharp cuts, hard snaps, instant state changes

### shadcn Usage
- `Card` — `bg-terminal-black border border-phosphor-green/30 rounded-sm` (slight radius, like a window)
- `Button` — `bg-crt-amber text-black font-mono uppercase hover:bg-phosphor-green hover:text-black`
- `Badge` — `bg-glitch-cyan/10 border border-glitch-cyan text-glitch-cyan font-mono`
- `Separator` — `h-px bg-phosphor-green/20` (dotted line optional)

### Font Addition
- `JetBrains Mono` (or `Space Mono`) for everything except names. Names stay in Playfair Display for contrast — serif on monospace creates the "elegant glitch" tension

---

## Shared Infrastructure

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 + shadcn/ui primitives (Button, Card, Separator, Badge) |
| Animation | `motion` — scroll reveals, spring physics, staggered entrances |
| Celebration | `canvas-confetti` — where applicable (Neon Dhaba, Mughal Miniature) |
| Utilities | `cn()` from `@/lib/utils` |
| Fonts | Playfair Display (serif), Inter (sans), Cormorant Garamond (script), Noto Naskh Arabic (Arabic), JetBrains Mono (terminal/brutalist), Noto Serif JP (Zen) |

### New CSS Utilities Needed

Add to `globals.css` `@layer utilities`:

```css
/* Neon glow */
.neon-glow-pink { text-shadow: 0 0 10px #ff2a6d, 0 0 20px #ff2a6d, 0 0 40px #ff2a6d; }
.neon-glow-blue { text-shadow: 0 0 10px #05d9e8, 0 0 20px #05d9e8, 0 0 40px #05d9e8; }

/* CRT scanlines */
.crt-scanlines {
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
}

/* Glitch text */
.glitch-text {
  text-shadow: 2px 0 #ff00ff, -2px 0 #00f0ff;
}

/* Sunburst */
.sunburst {
  background: repeating-conic-gradient(from 0deg, #c9a227 0deg 10deg, transparent 10deg 20deg);
}

/* Paper grain (heavy) */
.paper-grain-heavy {
  background-image: url("data:image/svg+xml,..."); /* higher freq noise */
  mix-blend-mode: multiply;
}
```

---

## Implementation Roadmap

| Phase | Templates | Effort | Why First |
|---|---|---|---|
| **Phase 1** | Celestial Canvas, Mughal Miniature, Neon Dhaba | 3 days | Three completely different directions. Proves the system works for any aesthetic |
| **Phase 2** | Brutalist Union, Art Deco Grand, Zen Sumi | 3 days | Three more extremes: architecture, vintage, minimalism |
| **Phase 3** | Tropical Heat, Victorian Herbarium, Nordic Frost | 3 days | Nature, nostalgia, cold minimalism |
| **Phase 4** | Glitch Noir | 1 day | The wildcard. Most experimental. Best saved for last |
| **Phase 0** | Refactor Malabar Emerald + Noor-e-Nikah to shadcn | 1 day | Baseline maintenance |

**Total: ~11 days** for all 10 templates + 2 refactors.

---

## Modern UI Features — Audit Summary

| Template | Glassmorphism | 3D Effect | Parallax | Particles | Signature 3D/FX |
|---|---|---|---|---|---|
| **Celestial Canvas** | ✅ Frosted void cards | ✅ 3-layer starfield depth | ✅ Mouse + scroll | ✅ Star twinkle | Constellation draw + shooting stars |
| **Mughal Miniature** | ❌ Rejected (authenticity) | ✅ Frame tilt on mouse | ✅ Tapestry parallax | ✅ Gold dust | Filigree border SVG draw |
| **Neon Dhaba** | ✅ Frosted neon panels | ✅ Aggressive card tilt (±15°) | ✅ Poster wall depth | ✅ Neon sparks | RGB chromatic aberration |
| **Brutalist Union** | ❌ Rejected (raw concrete) | ✅ Flat extrusion shadow | ✅ Blueprint grid | ❌ None | Typewriter + grid line draw |
| **Art Deco Grand** | ✅ Heavy champagne glass | ✅ 3-layer sunburst spin | ✅ Theater curtain | ✅ Gold orbit particles | Metallic shimmer text |
| **Zen Sumi** | ❌ Rejected (rice paper) | ✅ Micro-tilt (1° only) | ✅ Pinned brushstroke | ❌ None | Ink spread + radial mask |
| **Tropical Heat** | ✅ Frosted polaroid backing | ✅ 3D polaroid lift | ✅ 4-layer palm depth | ❌ None | Liquid sunset gradient |
| **Victorian Herbarium** | ❌ Rejected (cardstock) | ✅ Wax seal press (rotateX) | ✅ Scrapbook corners | ❌ None | Wax drip + paper curl |
| **Nordic Frost** | ✅ Heavy frosted window | ✅ 3D crystal lattice | ✅ Layered ice depth | ✅ Snowfall (40 dots) | Frost edge + ice crack |
| **Glitch Noir** | ✅ Terminal window glass | ✅ CRT bezel recess | ✅ Scanline fixed overlay | ❌ None | RGB split + data corruption |

### Glassmorphism Verdict
- **Use it:** Celestial, Neon, Art Deco, Tropical, Nordic, Glitch (6 templates)
- **Reject it:** Mughal, Brutalist, Zen, Victorian (4 templates — glass fights the physical material aesthetic)

### 3D/Parallax Verdict
- **Every template has either 3D depth or parallax** (or both)
- No template relies solely on flat CSS. Every guest gets a sense of depth and space
- All effects are CSS/native — no WebGL, no Three.js, no performance killers

---

## Implementation Roadmap

| Phase | Templates | Effort | Why First |
|---|---|---|---|
| **Phase 1** | Celestial Canvas, Neon Dhaba, Nordic Frost | 4 days | Three heavy glassmorphism + 3D templates. Establishes the animation system |
| **Phase 2** | Art Deco Grand, Tropical Heat, Glitch Noir | 4 days | Three more visual extremes: vintage glamour, organic warmth, digital disruption |
| **Phase 3** | Mughal Miniature, Brutalist Union, Zen Sumi | 3 days | Three "no-glass" templates. Proves restraint is also a design system |
| **Phase 4** | Victorian Herbarium | 1 day | Most experimental interaction (wax seal). Best saved for polish phase |
| **Phase 0** | Refactor Malabar Emerald + Noor-e-Nikah to shadcn | 1 day | Baseline maintenance |

**Total: ~13 days** for all 10 templates + 2 refactors + animation system.

---

## Approval Checklist

- [ ] All 10 templates feel meaningfully different (not color swaps)
- [ ] Each has a signature "wow" effect
- [ ] Palette diversity: dark (Celestial, Neon, Glitch), light (Zen, Nordic, Victorian), warm (Mughal, Tropical), cool (Nordic), neutral (Brutalist)
- [ ] Animation diversity: Canvas 2D, SVG draw, CSS glitch, parallax, typewriter, liquid gradient, crystal formation, ink spread, wax seal, neon flicker
- [ ] Modern UI feature diversity: glassmorphism (6 templates), 3D depth (10 templates), parallax (10 templates), particle systems (5 templates)
- [ ] Glassmorphism rejection justified for 4 templates (authenticity, not laziness)
- [ ] Mobile degradation plan for each signature effect
- [ ] shadcn integration doesn't fight any aesthetic
- [ ] Bundle impact acceptable (~40KB shared + ~2KB per template)

---

**Awaiting your review.** Which templates should I start with?
