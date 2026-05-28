export interface PlanItem {
  included: boolean
  text: string
}

export interface Plan {
  id: string
  emoji: string
  name: string
  priceUSD: number
  ideal: string
  badge?: string
  items: PlanItem[]
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    emoji: '🥉',
    name: 'Starter',
    priceUSD: 99,
    ideal: 'Visibilidad básica de tu negocio',
    items: [
      { included: true, text: 'P&L + Flujo de Caja' },
      { included: true, text: 'Scorecard KPIs' },
      { included: true, text: 'Altman Z-Score' },
      { included: true, text: 'Informe mensual (PDF)' },
      { included: false, text: 'Dashboard Looker' },
      { included: false, text: 'Base de datos' },
      { included: false, text: 'Reunión quincenal' },
      { included: false, text: 'Modelo de valoración' },
      { included: false, text: 'Plan 90 días' },
      { included: false, text: 'VAN / TIR / Payback' },
      { included: false, text: 'WhatsApp prioritario' },
    ],
  },
  {
    id: 'pro',
    emoji: '🥈',
    name: 'Pro',
    priceUSD: 250,
    ideal: 'Decisiones con datos, en crecimiento',
    badge: 'MÁS ELEGIDO',
    items: [
      { included: true, text: 'P&L + Flujo de Caja' },
      { included: true, text: 'Scorecard KPIs' },
      { included: true, text: 'Altman Z-Score' },
      { included: true, text: 'Informe mensual (PDF)' },
      { included: true, text: 'Dashboard Looker Studio' },
      { included: true, text: 'Base de datos SQL' },
      { included: true, text: 'Reunión quincenal' },
      { included: false, text: 'Modelo de valoración' },
      { included: false, text: 'Plan 90 días' },
      { included: false, text: 'VAN / TIR / Payback' },
      { included: false, text: 'WhatsApp prioritario' },
    ],
  },
  {
    id: 'scale',
    emoji: '🥇',
    name: 'Scale',
    priceUSD: 500,
    ideal: 'CFO virtual — listo para escalar',
    items: [
      { included: true, text: 'P&L + Flujo de Caja' },
      { included: true, text: 'Scorecard KPIs' },
      { included: true, text: 'Altman Z-Score' },
      { included: true, text: 'Informe mensual (PDF)' },
      { included: true, text: 'Dashboard Looker Studio' },
      { included: true, text: 'Base de datos SQL' },
      { included: true, text: 'Reunión quincenal' },
      { included: true, text: 'Modelo de valoración' },
      { included: true, text: 'Plan estratégico 90 días' },
      { included: true, text: 'VAN / TIR / Payback' },
      { included: true, text: 'WhatsApp prioritario 48hs' },
    ],
  },
]
