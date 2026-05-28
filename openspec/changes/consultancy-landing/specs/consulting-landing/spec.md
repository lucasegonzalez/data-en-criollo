# Consulting Landing Specification

## Purpose

Single-page consulting landing at `/consultoria` for Consultoría Financiera PyME lead generation. Reuses the existing `/api/agenda` scheduling API with `source=consulting`. Design is retro-minimalist, distinct from the main CRT aesthetic.

## Requirements

### Requirement: Route renders landing page

The system MUST render a responsive landing page at the `/consultoria` route. The page MUST use a dedicated layout that does NOT inherit the root layout's CRT aesthetic.

#### Scenario: Page loads successfully

- GIVEN a user navigates to `/consultoria`
- WHEN the page renders
- THEN a landing page is displayed with hero, booking widget, and social links
- AND the CRT scanline or phosphor aesthetic MUST NOT appear

### Requirement: Hero section with value proposition

The system MUST display a hero section with a heading, subheading, and a prominent call-to-action button that scrolls to or activates the booking widget.

#### Scenario: Hero section is visible

- GIVEN a user visits `/consultoria`
- WHEN the page renders
- THEN a hero heading and subheading describe the consulting value proposition
- AND a CTA button prompts the user to book a consultation

### Requirement: Booking widget with date/time selection

The system MUST provide a booking form that captures email, date, and time, and submits to `/api/agenda`.

#### Scenario: Successful booking submission

- GIVEN a user fills in a valid email, selects a future date and an available time slot
- WHEN the user submits the form
- THEN the system POSTs to `/api/agenda` with `source=consulting`
- AND a success confirmation is shown to the user

#### Scenario: Form validation error

- GIVEN a user submits the form with an invalid email or a past date
- WHEN the form is submitted
- THEN an appropriate error message is displayed
- AND no API call is made

### Requirement: Form submission includes source=consulting

All booking submissions from this page MUST include `source=consulting` in the POST payload.

#### Scenario: POST contains source

- GIVEN a user submits the booking form on `/consultoria`
- WHEN the POST request is sent to `/api/agenda`
- THEN the payload MUST contain `source: "consulting"`

### Requirement: Social links to YouTube, Instagram, LinkedIn

The system MUST display links to the three social platforms.

#### Scenario: Social links render

- GIVEN a user views the consulting landing page
- WHEN the page renders
- THEN YouTube, Instagram, and LinkedIn links SHALL be visible

### Requirement: External links have security attributes

All external links on the consulting landing MUST open in a new tab with `rel="noopener noreferrer"`.

#### Scenario: Link security attributes

- GIVEN a social link on `/consultoria`
- WHEN the link is rendered
- THEN it MUST have `target="_blank"` and `rel="noopener noreferrer"`

### Requirement: Retro-minimalist design (NOT CRT)

The consulting landing MUST use a warm retro-minimalist aesthetic — crema/papel color palette, clean sans-serif body typography, subtle retro accents — and MUST NOT use the CRT scanline or phosphor aesthetic.

#### Scenario: Design matches retro-minimalist spec

- GIVEN a user visits `/consultoria`
- WHEN the page renders
- THEN the color palette is warm and paper-toned
- AND no CRT scanline overlay, green phosphor, or similar CRT effects are present
