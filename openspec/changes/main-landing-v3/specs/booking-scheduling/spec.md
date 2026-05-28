# Spec: Booking & Scheduling

## Requirements

### L1 — Calendar
- [x] L1.1 Month navigation: prev/next buttons, month+year display
- [x] L1.2 Available days shown with dot indicator
- [x] L1.3 Clicking an available day selects it (highlighted)

### L2 — Time Slots
- [x] L2.1 Time panel slides open when a day is selected
- [x] L2.2 Predefined time slots rendered as selectable buttons
- [x] L2.3 Selected slot highlighted; clicking another changes selection

### L3 — Email & Submission
- [x] L3.1 Email input field with validation (must contain `@`)
- [x] L3.2 "CONFIRMAR" button POSTs to `/api/agenda` with `{email, day, month, year, time}`
- [x] L3.3 On success: toast appears for 5 seconds, form resets
- [x] L3.4 On error: inline error message shown
- [x] L3.5 Rate limiting (429): specific error message

## Scenarios

### S1: Book a consultation
1. Navigate to next month → see available days
2. Click an available day → time slots appear
3. Click a time slot → summary shows "✓ Mes Día · HH:00 hs"
4. Enter valid email → click CONFIRMAR
5. Toast: "✓ Consulta agendada — te escribo a tu mail"

### S2: Invalid email
1. Select day + time
2. Enter "abc" → click CONFIRMAR
3. Error: "Ingresá un email válido."

### S3: No day/time selected
1. Enter valid email → click CONFIRMAR
2. Error: "Seleccioná un día y un horario."
