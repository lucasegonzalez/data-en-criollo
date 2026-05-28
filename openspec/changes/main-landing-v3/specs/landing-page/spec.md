# Spec: Main Landing Page

## Requirements

### L1 — Layout & Branding
- [x] L1.1 Header shows Data en Criollo logo (YouTube icon + name), subtitle, and "Nueva consulta" badge
- [x] L1.2 Animated ticker scrolls horizontally with rotating taglines
- [x] L1.3 Hero section has: eye line ("Tu negocio merece certeza"), heading with em emphasis on "invertir", subtitle paragraph
- [x] L1.4 Footer shows social links (YouTube, Instagram, LinkedIn) and copyright
- [x] L1.5 Grid background pattern in hero section

### L2 — Carousel
- [x] L2.1 4 slides with SVG data visualizations (churn bar chart, margin donut, correlation scatter, cash flow lines)
- [x] L2.2 Each slide has: tag, headline, body text
- [x] L2.3 Auto-advances every 5 seconds
- [x] L2.4 Dot navigation + prev/next buttons
- [x] L2.5 Clicking dot or button resets the auto-advance timer

### L3 — Animations
- [x] L3.1 Scroll-reveal: elements with `.rv` class fade-up when intersecting viewport
- [x] L3.2 Header has scan-line animation
- [x] L3.3 Calculator result pulses with red glow and shakes on update
- [x] L3.4 CRT boot animation on page load

## Scenarios

### S1: Scroll reveal on landing
1. Load page → elements start hidden (opacity 0, translateY)
2. Scroll down → each `.rv` section fades in with transition
3. All sections become visible at end of scroll

### S2: Carousel navigation
1. Page loads → slides auto-advance every 5s starting from slide 0
2. Click "SIG ▸" → next slide immediately
3. Click dot → jump to that slide
4. Timer resets on any manual interaction
