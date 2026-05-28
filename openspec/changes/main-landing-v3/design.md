# Design: Main Landing Redesign v3

## Technical Approach

Replace `app/page.tsx` to render new landing sections, with interactive parts as client components. CSS scope via `.landing-page` wrapper class in `app/landing.css`. No changes to backend API or existing routes.

---

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|-------------|-----------|
| CSS scoping | Single `app/landing.css` with `.landing-page` wrapper | CSS Modules per component | Carousel SVGs and layout share many styles; one scoped file avoids duplication. Follows `/consultoria` pattern |
| Page type | Client component (`'use client'`) | Server component + separate scroll-reveal client | Scroll-reveal needs `useEffect` + IntersectionObserver on DOM. Simpler to colocate |
| Carousel state | React state + refs for auto-advance | Pure CSS carousel | Auto-advance, dot nav, and timer reset require imperative control |
| Booking data | Reuses `data/calendar.ts` (AVAILABLE_DAYS, TIME_SLOTS) | Hardcoded values from HTML | API validates against TIME_SLOTS; using existing data guarantees compatibility |
| Calculator formula | `ventas × (pct/100) × 0.075` | More complex multi-factor model | Conservative estimate (7.5% midpoint from management studies). Same as HTML original |
| Old components | Orphaned (not deleted) | Delete Shell/Header/AgendaPanel | Zero risk approach; cleanup deferred to separate change |

---

## Data Flow

```
User ──→ / (client component)
            ├── Header (static HTML)
            ├── Ticker (static HTML with CSS animation)
            ├── Hero (static HTML)
            ├── Carousel (client)
            │     ├── SVG slides (hardcoded JSX)
            │     ├── Auto-advance (useEffect)
            │     └── Dot/button nav (local state)
            ├── Calculator (client)
            │     ├── Revenue input (local state)
            │     ├── Slider (local state)
            │     └── Result display (derived value)
            ├── Booking (client)
            │     ├── Calendar nav (local state)
            │     ├── Day/time selection (local state)
            │     └── Email → POST /api/agenda
            │                      │
            │                      └── { success: true } → Toast
            └── Footer (static HTML)
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `app/page.tsx` | Modify | Replace Shell import with new landing composition |
| `app/landing.css` | New | Scoped CSS: all landing styles under `.landing-page` |
| `components/landing/Carousel.tsx` | New | SVG carousel, 4 slides, auto-advance, dot nav |
| `components/landing/Calculator.tsx` | New | Loss calculator with slider and formatted results |
| `components/landing/Booking.tsx` | New | Calendar picker, time slots, email → POST `/api/agenda` |

---

## Interfaces / Contracts

### API — POST /api/agenda (consumed, unchanged)

```typescript
// Request body
{
  email: string
  day: number
  month: number
  year: number
  time: string   // one of TIME_SLOTS from data/calendar.ts
}
```

### Calculator State

```typescript
interface CalculatorState {
  ventas: number        // monthly revenue in ARS
  pct: number           // slider 5..95
}

// Derived
interface CalculatorResult {
  total: number         // monthly loss
  yearly: number       // yearly loss
  idx: number          // urgency message index (0-3)
}
```

---

## Testing Strategy

No test runner exists. Manual verification:

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to `/` | Page renders with new design, CRT boot animation plays |
| 2 | Scroll down | Sections fade in via scroll-reveal |
| 3 | Click carousel dots/buttons | Slides change, timer resets |
| 4 | Drag calculator slider | Values update, result pulses |
| 5 | Select day + time + email + confirm | Toast success, email sent |
| 6 | `next build` | Zero errors |

---

## Migration / Rollout

In-place replacement. The old components (Shell, Header, AgendaPanel, etc.) remain in the tree but are no longer imported. Rollback: revert `app/page.tsx`, delete `app/landing.css` + `components/landing/`.
