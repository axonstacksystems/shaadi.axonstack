# shaadi.axonstack.in

Public hosting for delivered **Shaadi Cards** — the digital wedding invitations
crafted by [AxonStack](https://axonstack.in/apps/shaadi-cards).

Each delivered client card is served at the root of the domain by slug:

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
│   ├── [slug]/page.tsx     # The delivered card route
│   ├── layout.tsx          # Loads the invitation fonts + shared CSS
│   ├── globals.css         # Tailwind + invitation theme tokens
│   ├── page.tsx            # Landing fallback (redirects to marketing site)
│   └── not-found.tsx
├── components/
│   └── cards/
│       └── MalabarEmeraldCard.tsx
└── data/
    └── delivered-orders.ts # Source of truth for what's hosted here
```

## Adding a new delivered card

1. Add an entry to `src/data/delivered-orders.ts` with a unique `slug`.
2. If it uses an existing template (e.g. `malabar-emerald`), nothing else is
   needed — the card route resolves the right component from `templateSlug`.
3. If it uses a new template, add the component under `src/components/cards/`
   and wire it into the switch in `src/app/[slug]/page.tsx`.

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

Then open <http://localhost:3000/siyad-faleela>.

## Deploy

Deploy to Vercel and point the `shaadi.axonstack.in` domain at the project.
