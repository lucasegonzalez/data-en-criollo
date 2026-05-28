# Proposal: Main Landing Redesign v3

## Intent

Replace the main landing page (`/`) with the new design from `data_en_criollo_v3.html`, keeping the interactive features (calculator, booking) wired to the existing backend infrastructure.

## Scope

### In Scope
- Replace main landing at `/` with new design (header, ticker, hero, carousel, calculator, booking, footer)
- Header with Data en Criollo branding + "Nueva consulta" badge
- Marquee/ticker with rotating messages
- Hero section with grid background + typewriter heading
- SVG carousel (4 slides: churn, margen, correlación, cash flow)
- Loss calculator: ventas mensuales × % decisiones sin datos × 7.5%
- Booking calendar with time slots + email input
- All booking submissions through existing `/api/agenda` endpoint
- All email notifications through existing Resend infrastructure
- Scroll-reveal animations via IntersectionObserver
- Scoped CSS in `app/landing.css` (no bleed into existing styles)

### Out of Scope
- `/consultoria` route — unchanged
- `/api/agenda` and `lib/email.ts` — unchanged
- Removing old components (Shell, Header, AgendaPanel, etc.) — remain in tree but unused
- New API routes or database
- Obsidian vault or CMS integration

## Capabilities

### New Capabilities
- `landing-page`: New main landing layout with SVG carousel, hero, ticker, and footer
- `calculator`: Interactive loss-estimation widget (ventas × % sin datos × 7.5%)
- `booking-scheduling`: Calendar + time-slot picker + email submission via `/api/agenda` (reuses existing backend)

### Consumed Capabilities (existing, unchanged)
- `agenda-scheduling` (via `/api/agenda`): Accepts booking POSTs
- `email-notification` (via `lib/email.ts`): Sends confirmation emails

## Approach

1. `app/page.tsx` — client component, composes all landing sections
2. `app/landing.css` — scoped CSS file imported by page, no global bleed (`.landing-page` wrapper)
3. `components/landing/Carousel.tsx` — client component, 4 SVG slides with auto-advance + dot nav
4. `components/landing/Calculator.tsx` — client component, ventas input + slider + result
5. `components/landing/Booking.tsx` — client component, calendar + time slots + email + POST to API
6. Design: amber retro-brutalism (matching existing brand), dark header, SVG data-visualizations, red urgency accent on calculator result

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/page.tsx` | Modified | Replaced Shell with new landing composition |
| `app/landing.css` | New | Scoped design tokens and layout styles |
| `components/landing/Carousel.tsx` | New | SVG carousel with 4 data-themed slides |
| `components/landing/Calculator.tsx` | New | Loss-estimation calculator |
| `components/landing/Booking.tsx` | New | Booking widget wired to `/api/agenda` |
| `components/Shell.tsx` | Unchanged | Orphaned — not imported anymore |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Calculator formula mismatch with user expectation | Low | Clear formula display + labels in result box |
| Booking submission fails | Low | Reuses existing tested API; inline error handling |
| Style bleed with /consultoria | Low | `.landing-page` wrapper scopes all CSS |

## Rollback Plan

Restore previous `app/page.tsx` from git, delete `app/landing.css` and `components/landing/`.

## Success Criteria

- [ ] Main landing renders with new design (header, ticker, hero, carousel, calculator, booking, footer)
- [ ] Calculator updates result on slider/input change
- [ ] Calendar shows available days, selecting a day shows time slots
- [ ] Booking with valid email + day + time → toast success
- [ ] Booking sends confirmation email via Resend
- [ ] `next build` passes with zero errors
