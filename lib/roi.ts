import { PLANS } from '@/data/plans'

export function parseMiles(s: string): number {
  return parseFloat(String(s).replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '')) || 0
}

export function fmtARS(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-AR')
}

export function fmtVentas(value: string): string {
  const raw = value.replace(/\./g, '').replace(/\D/g, '')
  return (parseInt(raw) || 0).toLocaleString('es-AR')
}

export interface Diagnostics {
  d1: number
  d2: number
  d3: number
  d4: number
  total: number
}

export function calcDiagnostics(ventas: number, churn: number): Diagnostics {
  const d1 = ventas * 0.02
  const d2 = ventas * churn * 0.25
  const d3 = ventas * 0.015
  const d4 = ventas * 0.008
  const total = d1 + d2 + d3 + d4
  return { d1, d2, d3, d4, total }
}

export interface PlanROI {
  planIdx: number
  roi: number
  costARS: number
  color: string
  icon: string
  label: string
  recommended: boolean
}

export function calcPlanROIs(total: number, tc: number): PlanROI[] {
  const costos = PLANS.map((p) => p.priceUSD * tc)
  const rois = costos.map((c) => total / c)

  let recIdx = 0
  for (let i = PLANS.length - 1; i >= 0; i--) {
    if (rois[i] >= 1) {
      recIdx = i
      break
    }
  }

  const badColors: [string, string, string] = ['#7A8C5A', '#C8843A', '#C0392B']
  const goodIcons: [string, string, string] = ['✓', '◐', '✕']
  const goodLabels: [string, string, string] = ['ROI positivo', 'Cubre el costo', 'ROI negativo']

  return PLANS.map((_, i) => {
    const roi = rois[i]
    const colorIdx = roi >= 1.5 ? 0 : roi >= 1 ? 1 : 2
    return {
      planIdx: i,
      roi,
      costARS: costos[i],
      color: badColors[colorIdx],
      icon: goodIcons[colorIdx],
      label: goodLabels[colorIdx],
      recommended: i === recIdx,
    }
  })
}

export function calcNota(
  ventas: number,
  total: number,
  tc: number,
  planROIs: PlanROI[]
): string {
  if (planROIs[0].roi < 1) {
    const breakEven = PLANS[0].priceUSD * tc / 0.043
    return (
      'Con ' +
      fmtARS(ventas) +
      ' en ventas el análisis genera ' +
      fmtARS(total) +
      '/mes. El Starter (USD ' +
      PLANS[0].priceUSD +
      ') se justifica a partir de ' +
      fmtARS(breakEven) +
      ' en ventas mensuales.'
    )
  }

  const rec = planROIs.find((r) => r.recommended)!
  const recPlan = PLANS[rec.planIdx]
  const days = Math.round(30 / rec.roi)
  return (
    'Con ' +
    fmtARS(ventas) +
    ' en ventas estás dejando ir ' +
    fmtARS(total) +
    '/mes. El plan ' +
    recPlan.name +
    ' (USD ' +
    recPlan.priceUSD +
    ') se recupera solo en ' +
    days +
    ' días del mes.'
  )
}
