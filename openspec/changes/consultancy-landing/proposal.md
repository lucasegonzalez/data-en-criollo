# Proposal: Consultancy Landing Page (`/consultoria`)

## Intent

Add a single-page consulting landing at `/consultoria` for financial consulting lead generation (Consultoría Financiera PyME), reusing existing scheduling infrastructure without touching the main CRT-styled site.

## Scope

### In Scope
- Route `/consultoria` with dedicated layout (no CRT aesthetic)
- Hero section with value proposition + CTA to book a call
- Time-slot booking widget (reuses `/api/agenda` with `source=consulting`)
- Confirmation email via Resend (consulting-specific template)
- Social links: YouTube, Instagram, LinkedIn
- Professional design system: warm retro-minimalist (crema/papel base, clean layout, subtle retro accents)

### Out of Scope
- Multi-page site (`/servicios`, `/blog`, etc.)
- Obsidian vault integration (deferred post-MVP)
- CMS, markdown pipeline, or dynamic content sources
- Modifying any existing CRT-styled pages or components

## Capabilities

> No existing `openspec/specs/` dir — all capabilities below are initial specs or deltas against unformalized code.

### New Capabilities
- `consulting-landing`: Single landing page for financial consulting lead gen with scheduling widget and social links

### Modified Capabilities
- `agenda-scheduling` (existing via `/api/agenda`): accept `source` param to differentiate booking origin
- `email-notification` (existing via `lib/email.ts`): add consulting-specific email template with professional tone

## Approach

1. `app/consultoria/page.tsx` — server component, minimal client islands (booking widget)
2. `app/consultoria/layout.tsx` — clean layout, no CRT. Load Inter + serif display fonts
3. CSS variables in `app/consultoria/consultoria.css` scoped via layout, not entangled with `globals.css`
4. Reuse `/api/agenda` POST — add optional `source` field for routing to consulting template
5. Extend `lib/email.ts` with `sendConsultingConfirmation()` for professional-toned emails
6. Design: retro-minimalist — warm crema/papel, clean spacing, Inter body + serif headings, subtle CRT texture (scanline accent, not full blast), terracota/mostaza CTAs

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/consultoria/page.tsx` | New | Main landing page |
| `app/consultoria/layout.tsx` | New | Consulting-specific layout + font loading |
| `app/consultoria/consultoria.css` | New | Scoped design tokens |
| `components/consultoria/` | New | Hero, BookingWidget, SocialLinks |
| `app/api/agenda/route.ts` | Modified | Accept `source` param for routing |
| `lib/email.ts` | Modified | Add consulting email template |
| `app/layout.tsx` | Unchanged | Root layout untouched — consulting layout is nested |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Design inconsistency with main site | Medium | Isolated CSS scope per layout |
| Booking flow breaks main site | Low | Single API, routing by `source` param |

## Rollback Plan

Delete `app/consultoria/`, revert `app/api/agenda/route.ts` and `lib/email.ts` to previous state.

## Success Criteria

- [ ] `/consultoria` renders with zero layout shift from main site
- [ ] User selects date/time and receives consulting confirmation email
- [ ] Social links open in new tab with `rel="noopener noreferrer"`
- [ ] `next build` passes with zero errors
