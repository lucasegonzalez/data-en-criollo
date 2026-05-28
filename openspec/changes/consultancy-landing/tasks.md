# Tasks: Consultancy Landing Page (`/consultoria`)

This task breakdown is designed as a **reusable template** for any Next.js microsite or sub-route. Each phase documents WHY it applies to other projects — so you can follow the same sequence for a different landing page, blog section, or marketing route.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~385–455 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Full consultancy landing | PR 1 | All phases in sequence. Frontend + API changes are backward-compatible |

## Phase 1: Infrastructure — Scoped Layout + Design Tokens

_Reusable: every sub-route that needs different styling than the root layout starts here. Isolated CSS + dedicated layout prevent style bleed._

- [x] 1.1 Create `app/consultoria/consultoria.css` — scoped variables (`--crema`, `--terracota`, `--mostaza`), `.consulting-layout` wrapper, Inter body font, no CRT tokens
- [x] 1.2 Create `app/consultoria/layout.tsx` — load Inter as `--font-inter`, reuse `--font-playfair` from root, apply `.consulting-layout` class, override metadata + SEO for consulting page

## Phase 2: UI Components — Static Content + Client Islands

_Reusable: component-per-file with CSS Modules. Works for any Next.js page — build static content first, then add interactive islands._

- [x] 2.1 Create `components/consultoria/Hero.tsx` + `Hero.module.css` — static hero with serif heading, warm crema bg, terracota CTA that scrolls to `#booking`
- [x] 2.2 Create `components/consultoria/SocialLinks.tsx` + `SocialLinks.module.css` — YouTube/Instagram/LinkedIn icons, `target="_blank" rel="noopener noreferrer"`, no CRT styling
- [x] 2.3 Create `components/consultoria/ConsultingBooking.tsx` + `ConsultingBooking.module.css` — client component: calendar picker, time slots, email input, client-side validation, POSTs to `/api/agenda` with `source:"consulting"`, success/error UI

## Phase 3: API Extension — Backward-Compatible Field Addition

_Reusable: optional param + conditional routing is the standard pattern for extending a single API endpoint across multiple sources._

- [x] 3.1 Modify `app/api/agenda/route.ts` — destructure `source` from POST body; when `source="consulting"`, call `sendConsultingConfirmation()` instead of `sendConfirmationEmails()`
- [x] 3.2 Modify `lib/email.ts` — add `sendConsultingConfirmation()`: formal Spanish, no emojis, distinct subject lines for admin ("Nueva consultoría...") and user ("Tu consulta está registrada")

## Phase 4: Page Integration — Compose Components

_Reusable: server component that composes static + interactive parts. Pure composition — no new logic, just layout wiring._

- [x] 4.1 Create `app/consultoria/page.tsx` — render Hero (scroll CTA to `#booking`), ConsultingBooking (id="booking"), SocialLinks. All imports from `@/components/consultoria/`

## Phase 5: Verification — Build + Manual Scenarios

_Reusable: `next build` plus manual scenario walkthrough works for any Next.js project without a test runner — adapt the checklist per feature._

- [x] 5.1 Run `next build` — zero errors, zero warnings
- [ ] 5.2 Manual check: `/consultoria` renders clean (no CRT bleed), booking form submits and shows success, confirmation email arrives with professional tone
- [ ] 5.3 Cross-navigate `/consultoria` ↔ `/` — no layout shift, main CRT site unchanged, `/consultoria` has no scanline/phosphor effects
