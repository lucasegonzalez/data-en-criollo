'use client'

import { useEffect, useRef } from 'react'
import styles from './PainPointsCarousel.module.css'

interface CardData {
  id: string
  pain: string
  solution: string
  graphic: React.ReactNode
}

const cards: CardData[] = [
  {
    id: 'riesgo',
    pain: '¿Sabés cuánto riesgo tiene tu negocio?',
    solution: 'Modelos de análisis para evaluar decisiones antes de ejecutarlas.',
    graphic: (
      <svg viewBox="0 0 120 80" fill="none" className={styles.graphic}>
        <rect x="10" y="15" width="100" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="25" y="25" width="15" height="30" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="45" y="20" width="15" height="35" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="65" y="28" width="15" height="27" rx="2" fill="currentColor" opacity="0.6" />
        <rect x="85" y="22" width="15" height="33" rx="2" fill="var(--accent)" opacity="0.9" />
        <circle cx="60" cy="10" r="6" fill="var(--accent)" />
        <path d="M57 10 L60 7 L63 13" stroke="var(--card-bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'control',
    pain: '¿Tenés control de tus números?',
    solution: 'Dashboards claros con métricas que importan para tu operación diaria.',
    graphic: (
      <svg viewBox="0 0 120 80" fill="none" className={styles.graphic}>
        <circle cx="35" cy="40" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="35" cy="40" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle cx="35" cy="40" r="4" fill="var(--accent)" />
        <rect x="65" y="20" width="40" height="8" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="65" y="34" width="35" height="8" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="65" y="48" width="38" height="8" rx="2" fill="currentColor" opacity="0.7" />
        <rect x="65" y="62" width="30" height="8" rx="2" fill="var(--accent)" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: 'datos',
    pain: '¿Tus decisiones se basan en datos o corazonadas?',
    solution: 'Análisis de datos aplicado a tu negocio para reducir incertidumbre.',
    graphic: (
      <svg viewBox="0 0 120 80" fill="none" className={styles.graphic}>
        <path d="M10 65 Q 30 30, 45 50 T 70 25 T 95 40" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M10 65 Q 30 45, 45 55 T 70 40 T 95 50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round" />
        <path d="M10 65 Q 30 55, 45 60 T 70 55 T 95 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" strokeLinecap="round" />
        <circle cx="45" cy="50" r="3" fill="var(--accent)" />
        <circle cx="70" cy="25" r="3" fill="var(--accent)" />
        <circle cx="10" cy="65" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="95" cy="40" r="3" fill="var(--accent)" />
      </svg>
    ),
  },
  {
    id: 'futuro',
    pain: '¿Sabés hacia dónde va tu negocio?',
    solution: 'Proyecciones basadas en datos reales, no en supuestos.',
    graphic: (
      <svg viewBox="0 0 120 80" fill="none" className={styles.graphic}>
        <rect x="15" y="50" width="90" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="20" y="55" width="15" height="10" rx="1" fill="var(--accent)" opacity="0.9" />
        <rect x="40" y="55" width="15" height="10" rx="1" fill="var(--accent)" opacity="0.7" />
        <rect x="60" y="55" width="15" height="10" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="80" y="55" width="15" height="10" rx="1" fill="currentColor" opacity="0.2" />
        <path d="M25 45 L35 35 L50 40 L65 25 L80 30" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="65" cy="25" r="3" fill="var(--accent)" />
        <path d="M65 20 L68 10 L62 14 L56 8" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function PainPointsCarousel() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => { cardRefs.current[i] = el }}
          className={`${styles.card} reveal-card`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          <div className={styles.graphicWrap}>
            {card.graphic}
          </div>
          <div className={styles.textWrap}>
            <p className={styles.pain}>{card.pain}</p>
            <p className={styles.solution}>{card.solution}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
