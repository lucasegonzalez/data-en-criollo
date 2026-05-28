# Design: Consultancy Landing Page (`/consultoria`)

## Technical Approach

New `/consultoria` route with independent layout, reusing the existing `/api/agenda` endpoint with a `source=consulting` discriminator. Components live in `components/consultoria/` — no shared state with the main CRT site. CSS Modules per existing conventions. The booking widget is a new `ConsultingBooking` client component (not a refactor of `AgendaPanel`) to avoid coupling.

---

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|-------------|-----------|
| CSS scoping | CSS Modules in `components/consultoria/` + layout-level overrides | Single `consultoria.css` blob imported in layout | Matches existing convention; CSS Module co-location prevents cross-contamination with CRT styles |
| Booking widget | New `ConsultingBooking` component | Adapt `AgendaPanel` with prop switches | `AgendaPanel` is tightly coupled to CRT aesthetic (DM Mono, Keycap buttons, dark-on-papel palette). Unwinding that in-place risks breaking the main site |
| Font loading | Load Inter in consulting layout; reuse Playfair Display from root | Load Inter + a separate serif | Root layout already declares `--font-playfair` at the `<html>` level — available to all nested routes. Inter is added as `--font-inter` and applied in the consulting layout wrapper |
| Social links | Simple `<a>` elements with inline icons | Reuse `Keycap` component | Keycap's retro box-shadow aesthetic is inappropriate for a professional consulting page |
| API routing | `source` field on existing POST body | Separate `/api/consulting` route | Single endpoint reduces surface area; `source` discriminator is a one-line if/else. Rate limiting is per-IP, shared across both booking flows — acceptable at current traffic levels |

---

## Data Flow

```
User ──→ /consultoria (server component)
            ├── Hero (static)
            ├── ConsultingBooking (client)
            │     ├── Calendar nav (local state)
            │     ├── Day/time selection (local state)
            │     └── Email input ──→ POST /api/agenda
            │                                  │
            │                                  ├── source="consulting"?
            │                                  │   YES → sendConsultingConfirmation()
            │                                  │   NO  → sendConfirmationEmails() (existing)
            │                                  │
            │                                  └── { success: true } ──→ confirmed UI
            └── SocialLinks (static links, new tab)
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `app/consultoria/page.tsx` | Create | Server component — renders Hero + ConsultingBooking + SocialLinks |
| `app/consultoria/layout.tsx` | Create | Loads Inter font, applies `consulting-layout` wrapper class, scoped CSS Modules import |
| `components/consultoria/Hero.tsx` | Create | Static hero section — headline, subheadline, CTA scroll anchor |
| `components/consultoria/Hero.module.css` | Create | Hero styles — serif headings, crema background, clean spacing |
| `components/consultoria/ConsultingBooking.tsx` | Create | Client component — calendar picker, time slots, email form, POST to `/api/agenda` with `source: "consulting"` |
| `components/consultoria/ConsultingBooking.module.css` | Create | Booking styles — warm tones, no CRT, professional inputs |
| `components/consultoria/SocialLinks.tsx` | Create | YouTube, Instagram, LinkedIn links with icons |
| `components/consultoria/SocialLinks.module.css` | Create | Social link styles |
| `app/api/agenda/route.ts` | Modify | Destructure `source` from body; if `"consulting"` call `sendConsultingConfirmation()` |
| `lib/email.ts` | Modify | Add `sendConsultingConfirmation()` — professional tone, no emoji, formal Spanish |

---

## Interfaces / Contracts

### API — POST /api/agenda (extended)

```typescript
// Request body (new optional field)
{
  email: string
  day: number
  month: number
  year: number
  time: string        // one of TIME_SLOTS
  plan?: string
  source?: string     // new — "consulting" | undefined
}
```

### Email — new function signature

```typescript
// Added to lib/email.ts
export async function sendConsultingConfirmation(params: {
  email: string
  day: number
  month: number
  year: number
  time: string
}): Promise<void>
```

---

## Testing Strategy

No test runner exists. Manual verification steps:

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to `/consultoria` | Page renders with clean layout, no CRT scanlines or static |
| 2 | Navigate to `/` | Main CRT site renders unchanged — no style bleed |
| 3 | Select a date + time, enter email, submit | POST to `/api/agenda` with `source: "consulting"`, success message shown |
| 4 | Check inbox | Consulting confirmation email received (professional tone, no emoji) |
| 5 | `next build` | Zero errors, zero warnings |
| 6 | Navigate from `/consultoria` to `/` (or vice versa) via URL bar | No layout shift, no flash of wrong styling |

---

## Migration / Rollout

No migration required. Feature is additive — new route, new components, backward-compatible API change. Rollback: delete `app/consultoria/`, revert the two modified files.

---

## Open Questions

None.
