# Delta for Email Notification

## Context

Existing `lib/email.ts` provides `sendConfirmationEmails()` which sends two Resend emails: one to the admin (with booking details) and one to the user (confirmation). Both use casual Spanish with emoji subjects. This delta adds a consulting-specific email template with a professional tone.

## ADDED Requirements

### Requirement: Consulting email template with professional tone

The system MUST provide a consulting-specific email template for bookings originating from `source=consulting`. The template SHALL use professional language, formal salutations, and omit casual elements such as emojis.

#### Scenario: Admin receives consulting notification

- GIVEN a booking with `source: "consulting"` and valid booking data
- WHEN the admin notification email is sent
- THEN the subject line SHALL reflect a consulting inquiry (not a general agenda booking)
- AND the body SHALL include client email, date, and time in a professional format without emojis

#### Scenario: User receives consulting confirmation

- GIVEN a booking with `source: "consulting"`
- WHEN the user confirmation email is sent
- THEN the subject SHALL confirm the consulting inquiry registration
- AND the body SHALL use professional language and formal tone

### Requirement: Different subject line for consulting

The consulting confirmation email MUST use a distinct subject line from the default agenda template.

#### Scenario: Subject lines differ by source

- GIVEN a consulting booking and a default agenda booking
- WHEN comparing email subjects
- THEN the consulting subject SHALL be different from the default agenda subject

### Requirement: Existing email template unchanged

The existing `sendConfirmationEmails` function and its templates MUST remain unchanged. The consulting template MAY be a new exported function.

#### Scenario: Default bookings still use original template

- GIVEN a booking without `source` or with `source` not equal to `"consulting"`
- WHEN `sendConfirmationEmails` is called
- THEN the original subjects and body text are used
- AND no consulting template formatting is applied
