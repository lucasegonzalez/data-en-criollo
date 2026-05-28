# Tasks: Main Landing Redesign v3

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~300–380 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |

## Phase 1: CSS — Scoped Styles

- [x] 1.1 Create `app/landing.css` — all styles from `data_en_criollo_v3.html`, scoped under `.landing-page` wrapper

## Phase 2: Interactive Components

- [x] 2.1 Create `components/landing/Carousel.tsx` — 4 SVG slides, auto-advance (5s), dot nav, prev/next buttons, timer reset on interaction
- [x] 2.2 Create `components/landing/Calculator.tsx` — revenue input, slider (5-95%), formula: `v × p × 0.075`, rotating urgency messages
- [x] 2.3 Create `components/landing/Booking.tsx` — calendar grid, time slots, email validation, POST to `/api/agenda`, toast confirmation, error handling

## Phase 3: Page Composition

- [x] 3.1 Update `app/page.tsx` — import `landing.css`, compose header, ticker, hero, carousel, calculator, booking, footer
- [x] 3.2 Add scroll-reveal: IntersectionObserver in useEffect for `.rv` elements

## Phase 4: Verification

- [x] 4.1 Run `next build` — zero errors, zero warnings
- [ ] 4.2 Manual check: carousel auto-advances, calculator updates, booking validates and submits
- [ ] 4.3 Manual check: `/consultoria` still renders correctly
