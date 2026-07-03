# shaadi.axonstack.in

Public hosting for delivered **Shaadi Cards** — the digital wedding invitations
crafted by [AxonStack](https://axonstack.in/apps/shaadi-cards).

Each delivered client card is served at a permanent canonical URL:

```
https://shaadi.axonstack.in/i/<slug>
```

For example: <https://shaadi.axonstack.in/i/siyad-faleela>

A short link is also permanently available and 308-redirects to the
canonical URL:

```
https://shaadi.axonstack.in/<slug>
```

For example: <https://shaadi.axonstack.in/siyad-faleela>

## Architecture

This repo is intentionally minimal — it only does one thing: render a delivered
invitation page. The marketing site, templates, demos and the rest of the
Shaadi Cards experience live in the main [`axonstack.in`](https://axonstack.in)
repo at `/apps/shaadi-cards`.

```
src/
├── app/
│   ├── [slug]/page.tsx              # Legacy short link → 308 redirect to /i/<slug>
│   ├── i/[slug]/                    # Canonical order route
│   │   ├── page.tsx                 # Renders the card
│   │   └── opengraph-image.tsx      # Per-order OG image
│   ├── designs/                     # Design gallery + previews
│   ├── layout.tsx                   # Loads the invitation fonts + shared CSS
│   ├── globals.css                  # Tailwind + invitation theme tokens
│   ├── page.tsx                     # Landing page
│   └── not-found.tsx
├── components/
│   └── cards/
│       ├── shared/                   # Shared utilities (ThemeContext, og-image)
│       ├── petal-atelier/            # Design sub-components
│       └── PetalAtelierCard.tsx      # Card wrapper components
└── data/
    ├── design-registry.ts           # Design + theme catalogue
    ├── demo-orders.ts               # Demo orders for /designs/
    └── delivered-orders.ts           # Real customer orders for /i/
```

## Adding a new delivered card

1. Add an entry to `src/data/delivered-orders.ts` with a unique `slug`,
   `designSlug`, and `themeSlug`:
   ```ts
   {
     slug: "rahman-zaira",
     designSlug: "petal-atelier",
     themeSlug: "amethyst-silver",
     title: "Rahman & Zaira",
     // ... couple-specific fields
   }
   ```
2. That's it. The canonical route `/i/rahman-zaira` is automatically
   generated via `generateStaticParams()`. The OG image is automatically
   generated from the order + theme data.
3. The short link `shaadi.axonstack.in/rahman-zaira` will 308-redirect to
   the canonical URL. Share either link — both work forever.
4. If the couple chose a new design not yet in the registry, add the card
   component under `src/components/cards/` and one entry to
   `COMPONENT_MAP` in `src/app/i/[slug]/page.tsx`.

## Collecting RSVPs (Google Sheets)

Each delivered card can collect RSVPs straight into the couple's own
Google Sheet — no backend required. The card automatically renders a
real form (name, attending, guest count, message) when `rsvp.webhookUrl`
is set, and falls back to WhatsApp buttons otherwise.

**One-time setup per card:**

1. Open the Sheet you want to collect responses in (or create a fresh one).
2. Extensions → Apps Script.
3. Replace the boilerplate with the contents of
   [`docs/apps-script-template.js`](./docs/apps-script-template.js).
4. Deploy → New deployment → Type: **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web app URL.
6. Paste it into the order's `rsvp.webhookUrl` in
   `src/data/delivered-orders.ts`:

   ```ts
   rsvp: {
     webhookUrl: "https://script.google.com/macros/s/AKfy.../exec",
     deadline: "20th May 2026",
     maxGuests: 5,
   }
   ```

7. Push and redeploy.

The couple just opens their Sheet to see live responses — names, yes/no,
guest counts, messages, all timestamped. They can sort, filter, export
or share read-only access with whoever's coordinating the guest list.

If you ever need to swap the Sheet, repeat steps 1–6 with the new
script and update the URL.

## Develop

```bash
npm install
npm run dev
```

Then open <http://localhost:3000/siyad-faleela> (redirects to canonical) or
<http://localhost:3000/i/siyad-faleela>.

## Deploy

Deploy to Vercel and point the `shaadi.axonstack.in` domain at the project.
