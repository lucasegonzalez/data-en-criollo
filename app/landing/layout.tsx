import type { Metadata } from 'next'
import './landing.css'

export const metadata: Metadata = {
  title: 'Data en Criollo — Evaluá el riesgo antes de invertir',
  description:
    'Análisis de datos claro y aplicado para emprendedores y dueños de negocio argentinos. Evaluá el riesgo antes de invertir.',
  openGraph: {
    title: 'Data en Criollo — Análisis para tu negocio',
    description:
      'Análisis de datos financieros para PyMEs argentinas.',
    locale: 'es_AR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="landing-page">{children}</div>
}
