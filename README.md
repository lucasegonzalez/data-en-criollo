# Data en Criollo

Data analysis education platform for Latin American entrepreneurs.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## Setup

```bash
# Install dependencies
pnpm install

# Environment variables
cp .env.example .env.local
# Fill in RESEND_API_KEY, RESEND_FROM, RESEND_TO in .env.local
```

## Development

```bash
pnpm dev
```

## Production Build

```bash
pnpm build
pnpm start
```

## Deploy to Vercel

One-click via Vercel dashboard or CLI:

```bash
vercel --prod
```

## How to Add a New Episode

1. Open `data/episodes.ts`
2. Add a new entry to the `EPISODES` array
3. Drop the episode image in `public/episodios/ep-XX.jpg`

## How to Change Available Calendar Days

Edit `data/calendar.ts` — the `AVAILABLE_DAYS` array contains the day numbers of the current month that are bookable.

## How to Update Plan Prices or Items

Edit `data/plans.ts` — each plan has `priceUSD`, `items`, and `ideal` that can be freely modified.

## Fonts

- **Playfair Display** — headings (900, 700, 400 italic)
- **DM Mono** — UI text (500, 400)
- **Source Serif 4** — body/notes (400, 400 italic)

Loaded via `next/font/google` — no self-hosting required.
