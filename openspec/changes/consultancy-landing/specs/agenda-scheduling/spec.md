# Delta for Agenda Scheduling

## Context

Existing code at `app/api/agenda/route.ts` accepts POST with `email`, `day`, `month`, `year`, `time`, `plan`. No `source` field currently exists. This delta adds an optional `source` parameter for routing to different email templates.

## ADDED Requirements

### Requirement: API accepts optional source field

The API MUST accept an optional `source` string field in the POST body. When present, the API SHALL forward the value to the email sending function.

#### Scenario: Request with source=consulting

- GIVEN a POST to `/api/agenda` with `source: "consulting"` and valid booking fields
- WHEN the request is processed
- THEN the API responds with `{ success: true }`
- AND the `source` value is forwarded to the email function

#### Scenario: Request without source

- GIVEN a POST to `/api/agenda` with valid booking fields but without a `source` field
- WHEN the request is processed
- THEN the API responds with `{ success: true }`
- AND the default (non-consulting) email behavior is used

#### Scenario: Request with unrecognized source

- GIVEN a POST to `/api/agenda` with `source: "unknown_value"` and valid booking fields
- WHEN the request is processed
- THEN the API responds with `{ success: true }`
- AND the source value defaults to the non-consulting email behavior

### Requirement: Source value routes to consulting email template

When `source=consulting`, the system MUST route to a consulting-specific email template instead of the default agenda template.

#### Scenario: Consulting source triggers consulting email

- GIVEN a valid POST with `source: "consulting"`
- WHEN `sendConfirmationEmails` is invoked
- THEN the consulting email template SHALL be used with professional subject and body
- AND the default agenda template SHALL NOT be used
