import type { Metadata } from 'next'
import { Playfair_Display, DM_Mono, Source_Serif_4 } from 'next/font/google'
import { CRTFlicker } from '@/components/CRTFlicker'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
})

export const metadata: Metadata = {
  title: 'Data en Criollo — Análisis de datos para emprendedores LATAM',
  description:
    'Aprendé a leer tus números sin un MBA. Conceptos de analista explicados en criollo.',
  openGraph: {
    title: 'Data en Criollo',
    description:
      'Análisis de datos para emprendedores latinoamericanos.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmMono.variable} ${sourceSerif.variable}`}>
      <body>
        <CRTFlicker />
        {children}
      </body>
    </html>
  )
}
