# Wedding Management Company — Template Portfolio Review

> **Reviewer:** Shaadi Cards Business Development Team  
> **Date:** June 22, 2026  
> **Scope:** 5 implemented templates (3 new + 2 existing)  
> **Target Market:** South Asian Muslim weddings (Nikkah), Kerala/Malappuram region

---

## Executive Summary

| Template | Status | Market Readiness | Recommended Tier | Client Appeal |
|---|---|---|---|---|
| **Celestial Canvas** | Implemented | **Ready to sell** | Premium (₹4,999) | 9/10 |
| **Nordic Frost** | Implemented | **Ready to sell** | Premium (₹4,999) | 8/10 |
| **Mughal Miniature** | Implemented | Minor fixes needed | Standard (₹3,499) | 7/10 |
| **Malabar Emerald** | Existing | Needs shadcn refactor | Standard (₹2,999) | 7/10 |
| **Noor-e-Nikah** | Existing | Needs shadcn refactor | Standard (₹2,999) | 7/10 |

**Verdict:** 2 templates are immediately sellable. 3 need work before they can go to clients. The portfolio lacks a budget tier and an ultra-premium tier.

---

## 1. Celestial Canvas

### Business Assessment: STRONG SELLER

| Criterion | Score | Notes |
|---|---|---|
| **Client "Wow" Factor** | 9/10 | Shooting star curtain + starfield = instant shareability. Every guest will screenshot this. |
| **Social Media Value** | 9/10 | Dark mode + gold + space = Instagram gold. Couples will share the link organically. |
| **Cultural Fit** | 8/10 | "Under the stars, by the will of Allah" — maps beautifully to Islamic destiny concepts. The dark solemnity suits Nikkah reverence. |
| **Mobile Performance** | 8/10 | Canvas 2D runs well on mid-range phones. 250 stars is manageable. The only risk: cheap LCDs show gray instead of true black. |
| **Pricing Justification** | 9/10 | The Canvas 2D starfield and 3D parallax justify a premium. No competitor in India offers this level of animation. |
| **Customization Ease** | 8/10 | Names swap easily. Star colors could be adjusted for client preference (gold → silver for modern couples). |

### Strengths for Sales
- **Unique in market** — No Indian wedding card competitor has an astronomical theme
- **Gender-neutral appeal** — Works for both groom-led and bride-led families
- **Night event synergy** — Perfect for evening/night ceremonies (common for Nikkah)
- **Shareable hero moment** — The shooting star curtain is a "wait for it" moment that guests talk about

### Weaknesses for Sales
- **"Too modern" risk** — Conservative families may find the space theme too unconventional for a religious ceremony
- **No traditional motifs** — Missing Islamic geometric patterns, floral elements, or calligraphic flourishes that older generations expect
- **Battery concern** — Continuous Canvas animation on mobile may drain battery during a long event

### Action Items
- [ ] Add optional Bismillah calligraphy overlay (toggle for conservative families)
- [ ] Add a "traditional mode" that swaps starfield for subtle geometric pattern
- [ ] Test on sub-₹10,000 Android devices (Canvas performance)

---

## 2. Nordic Frost

### Business Assessment: NICHE PREMIUM

| Criterion | Score | Notes |
|---|---|---|
| **Client "Wow" Factor** | 8/10 | Aurora + snowfall + ice crystals = visually stunning. The calm pace feels luxurious. |
| **Social Media Value** | 7/10 | Beautiful but subtle. The "wow" requires patience — some guests may scroll past before crystals form. |
| **Cultural Fit** | 6/10 | **Major concern.** Scandinavian minimalism for a Kerala Nikkah is a hard sell. Winter weddings are rare in Kerala. |
| **Mobile Performance** | 8/10 | Mostly CSS animations. 40 snowfall particles is light. Hex crystals are opacity-only. |
| **Pricing Justification** | 7/10 | Heavy glassmorphism and aurora effects justify premium, but the cultural mismatch limits the addressable market. |
| **Customization Ease** | 7/10 | Color palette is restrictive (ice, pine, silver). Hard to adapt for warm-toned weddings. |

### Strengths for Sales
- **Differentiation** — Completely unique aesthetic in the South Asian market
- **Premium perception** — Glassmorphism + aurora = "expensive" feel
- **Calm pacing** — Forces guests to slow down, which works for formal invitations
- **Winter destination weddings** — Perfect for couples getting married in Manali, Kashmir, or abroad (Europe/Canada)

### Weaknesses for Sales
- **Cultural mismatch** — Kerala weddings are colorful, loud, warm. This template is cold, quiet, pale.
- **Seasonal limitation** — Designed for winter. In Kerala's tropical climate, snow/ice feels out of place.
- **Missing warmth** — No gold, no henna tones, no marigold. The pine green is the only warm accent.

### Action Items
- [ ] **Critical:** Add a "Tropical Frost" variant with teal/coral aurora instead of ice-blue (for Kerala couples who love the aesthetic but not the season)
- [ ] Add subtle Islamic geometric patterns in the hex crystals (connects to traditional art)
- [ ] Test on older phones — `backdrop-blur-2xl` may fallback poorly

---

## 3. Mughal Miniature

### Business Assessment: STANDARD WORKHORSE

| Criterion | Score | Notes |
|---|---|---|
| **Client "Wow" Factor** | 7/10 | Filigree border draw is nice but not surprising. The aesthetic is familiar, not disruptive. |
| **Social Media Value** | 6/10 | Heritage aesthetic is Instagram-friendly but not viral. Seen before in many Indian wedding cards. |
| **Cultural Fit** | 9/10 | **Best cultural fit in the portfolio.** Parchment, gold filigree, jewel tones = instant "wedding" recognition for South Asian families. |
| **Mobile Performance** | 9/10 | Almost no heavy animation. SVG filigree draw is CPU-light. Most performant template. |
| **Pricing Justification** | 6/10 | The filigree border and jewel nodes are nice, but the template feels closer to a well-designed static card than a premium digital experience. |
| **Customization Ease** | 9/10 | Easy color swaps (ruby → emerald, etc.). Family-specific motifs can be added to the filigree SVG. |

### Strengths for Sales
- **Instantly recognizable as "wedding"** — No explanation needed for any generation
- **Low technical risk** — Runs on any phone, any browser
- **Multi-generational appeal** — Grandparents will love this. Young couples will respect it.
- **Heritage pride** — Connects to Mughal art history, which resonates with Muslim families

### Weaknesses for Sales
- **Not distinctive enough** — Many competitors offer similar heritage-themed cards (Paperless Post, Evite Indian collections)
- **"Static" feel** — After the filigree draws, the rest of the page is conventional. No second "wow."
- **Similar to existing Malabar Emerald** — Both use gold + parchment. Clients may not see the difference.

### Action Items
- [ ] **Critical:** Differentiate from Malabar Emerald more sharply. Add Mughal arch motifs, miniature painting illustrations, or Persian calligraphy flourishes
- [ ] Add the pigeon messenger animation (from 9.5+ upgrade spec) — this would be the differentiator
- [ ] Add gemstone refraction to timeline nodes (SVG filter) — elevates it to premium

---

## 4. Malabar Emerald (Existing)

### Business Assessment: NEEDS REFACTOR

| Criterion | Score | Notes |
|---|---|---|
| **Client "Wow" Factor** | 5/10 | Pre-shadcn implementation. Custom CSS that doesn't match the new premium standard. |
| **Social Media Value** | 6/10 | Green and gold is classic Kerala. But the execution is dated compared to new templates. |
| **Cultural Fit** | 8/10 | Strong Kerala identity. Malappuram green + gold resonates locally. |
| **Mobile Performance** | 7/10 | Pre-shadcn CSS may have rendering issues on newer phones. |
| **Pricing Justification** | 4/10 | Cannot be sold at the same price as Celestial Canvas. The quality gap is visible. |
| **Customization Ease** | 6/10 | Hardcoded styles make customization difficult compared to shadcn-based templates. |

### Action Items
- [ ] Refactor to shadcn/ui primitives (Card, Button, Badge, Separator)
- [ ] Add one signature animation (emerald particle burst on open?)
- [ ] Otherwise, position as "budget tier" or retire in favor of Mughal Miniature

---

## 5. Noor-e-Nikah (Existing)

### Business Assessment: NEEDS REFACTOR

| Criterion | Score | Notes |
|---|---|---|
| **Client "Wow" Factor** | 6/10 | The mihrab arch and curtain reveal are strong. But the underlying CSS is pre-shadcn. |
| **Social Media Value** | 7/10 | The curtain opening is shareable. The mihrab frame is distinctive. |
| **Cultural Fit** | 9/10 | Arabic calligraphy, mihrab shape, Islamic geometry = perfect for conservative families. |
| **Mobile Performance** | 7/10 | Curtain animation may stutter on low-end devices. |
| **Pricing Justification** | 5/10 | Good design but the tech stack is outdated. Need to modernize to justify premium pricing. |
| **Customization Ease** | 6/10 | Hardcoded custom CSS throughout. Swapping colors requires editing raw CSS. |

### Action Items
- [ ] Refactor to shadcn/ui primitives
- [ ] Keep the curtain reveal and mihrab frame — those are the selling points
- [ ] Add glassmorphism to content cards (heavy frosted glass behind the mihrab)
- [ ] Consider merging the best elements into Mughal Miniature (mihrab + filigree = ultimate heritage template)

---

## Portfolio Gap Analysis

### What's Missing for a Complete Product Line

| Tier | Description | Templates Needed |
|---|---|---|
| **Ultra-Premium (₹7,999+)** | Custom animation, dedicated design time, exclusive use | None yet. Celestial Canvas could be pushed here with more features. |
| **Premium (₹4,999)** | High animation, glassmorphism, unique concepts | **Celestial Canvas** ✅, **Nordic Frost** ✅ |
| **Standard (₹2,999-3,499)** | Clean design, moderate animation, proven concepts | **Mughal Miniature** (with fixes), **Noor-e-Nikah** (after refactor) |
| **Budget (₹1,499)** | Simple, fast, minimal animation, high volume | None. Need a minimal template for price-sensitive clients. |

### Target Client Personas Not Yet Served

1. **The Conservative Family** — Wants traditional Islamic calligraphy, no "western" aesthetics. Noor-e-Nikah serves this, but needs modernization.
2. **The Budget Couple** — Students, young professionals, small weddings. Need a ₹1,499 template.
3. **The Modern/Downtown Couple** — Neon Dhaba (not yet built) is the only template for this persona.
4. **The Destination Wedding** — Tropical Heat (not yet built) serves beach/destination weddings.
5. **The Luxury Client** — Art Deco Grand (not yet built) or a fully custom Celestial Canvas variant.

---

## Competitive Benchmarking

| Competitor | Price Range | Our Advantage | Their Advantage |
|---|---|---|---|
| **Paperless Post** | ₹1,500-5,000 | Better animations, Islamic-specific, local RSVP | Brand recognition, vast template library |
| **Evite (India)** | ₹800-3,000 | Premium animations, glassmorphism, 3D effects | Cheaper, faster setup, familiar UI |
| **WhatsApp-only cards** | ₹500-1,500 | Infinitely more impressive, shareable link | Cheaper, immediate, no tech barrier |
| **Local print shops** | ₹2,000-8,000 | Digital + animated + RSVP tracking | Physical card keepsake, no phone required |

**Our positioning:** We are the only premium digital Islamic wedding invitation studio in Kerala with cinematic animation. No competitor matches our technical sophistication.

---

## Immediate Business Recommendations

### Phase 1: Sell What's Ready (This Week)
1. **Launch Celestial Canvas** as the flagship "Premium" tier
2. **Launch Nordic Frost** as the "Winter Premium" tier (smaller audience, higher margin)
3. Create a **comparison page** showing both templates side-by-side

### Phase 2: Fix and Launch (Next 2 Weeks)
1. **Refactor Malabar Emerald and Noor-e-Nikah** to shadcn
2. **Differentiate Mughal Miniature** with pigeon messenger + gemstone effects
3. Launch all three as "Standard" tier

### Phase 3: Fill Portfolio Gaps (Next Month)
1. **Implement Neon Dhaba** — Captures the modern/young couple market
2. **Implement a Budget template** — Simple, clean, fast. High volume, low margin.
3. **Implement Art Deco Grand** — Ultra-premium for luxury clients

### Pricing Strategy

| Tier | Price | Templates | Target Client |
|---|---|---|---|
| **Shaadi Premium** | ₹4,999 | Celestial Canvas, Nordic Frost, Art Deco Grand | Upper-middle class, wants to impress |
| **Shaadi Standard** | ₹2,999 | Mughal Miniature, Noor-e-Nikah, Malabar Emerald | Middle class, traditional families |
| **Shaadi Lite** | ₹1,499 | Simple template (TBD) | Budget-conscious, small weddings |
| **Shaadi Custom** | ₹9,999+ | Bespoke design, dedicated designer | VIP clients, celebrity weddings |

---

## Final Verdict

**Celestial Canvas is our flagship.** Lead with it in all marketing. It is technically impressive, culturally appropriate, and unlike anything in the market.

**Nordic Frost is our niche play.** Market it to winter weddings, destination weddings, and modern couples who want something unexpected.

**Mughal Miniature is our safe bet.** It won't go viral, but it won't offend anyone. It's the "you can't go wrong" choice for conservative families.

**Malabar Emerald and Noor-e-Nikah need work.** Don't sell them at full price until they're refactored. Use them as "coming soon" teasers or discount them heavily.

---

**Recommendation: Proceed with Phase 1 immediately. Celestial Canvas alone justifies the entire product line.**
