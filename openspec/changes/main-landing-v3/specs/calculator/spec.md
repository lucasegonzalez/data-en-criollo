# Spec: Loss Calculator

## Requirements

### L1 — Inputs
- [x] L1.1 Monthly revenue input (ARS), type="number", with `$` prefix display
- [x] L1.2 Slider for "Decisiones sin datos" (5%–95%, step 5)
- [x] L1.3 Slider value displayed as large percentage next to slider

### L2 — Calculation
- [x] L2.1 Formula: `ventas × (pct/100) × 0.075`
- [x] L2.2 Shows: monthly loss, yearly loss (×12), formula breakdown
- [x] L2.3 Rotating urgency message based on slider position

### L3 — Visual
- [x] L3.1 Result box has: red border, pulse animation, orbital decoration
- [x] L3.2 Number pops + shakes on recalculation

## Scenarios

### S1: Calculate loss
1. Default: $5.000.000 ventas, 40% slider → $150.000/mes, $1.800.000/año
2. Drag slider to 80% → value updates, message changes
3. Change ventas to 10.000.000 → result recalculates

### S2: Edge cases
1. Set ventas to 0 → result shows $0
2. Slide to 5% → minimal loss, first urgency message
