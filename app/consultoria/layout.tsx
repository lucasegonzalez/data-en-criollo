import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './consultoria.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Consultoría Financiera PyME — Data en Criollo',
  description:
    'Transformá los números de tu PyME en decisiones. Análisis financiero, dashboard y planeamiento para empresas argentinas.',
  openGraph: {
    title: 'Consultoría Financiera PyME | Data en Criollo',
    description:
      'Análisis financiero, dashboard y planeamiento para PyMEs argentinas.',
    locale: 'es_AR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function ConsultoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`consulting-layout ${inter.variable}`}>
      {children}
    </div>
  )
}
