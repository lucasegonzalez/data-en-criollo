'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { PainPointsCarousel } from '@/components/PainPointsCarousel'
import { ROICalculator } from '@/components/ROICalculator'
import { AgendaPanel } from '@/components/AgendaPanel'

import styles from './Shell.module.css'

export function Shell() {
  const [typed, setTyped] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTyped(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.shell}>
      <Header />

      <main className={styles.main}>
        {/* ── Hero Section ── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.badge}>Data Analytics · Riesgo · Control</span>

            <h1 className={styles.heroTitle}>
              <span className={typed ? styles.typewriterDone : styles.typewriter}>
                Evaluá el riesgo antes de invertir.
              </span>
            </h1>

            <p className={styles.heroSub}>
              Análisis de datos financieros para PyMEs argentinas. Tomá decisiones con datos, no con intuición.
            </p>
          </div>
        </section>

        {/* ── Pain Point Cards ── */}
        <section className={styles.section}>
          <PainPointsCarousel />
        </section>

        {/* ── ROI Calculator ── */}
        <section className={styles.section}>
          <ROICalculator />
        </section>

        {/* ── Booking ── */}
        <section id="agenda" className={styles.section}>
          <AgendaPanel />
        </section>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <a href="https://youtube.com/@dataencriollo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>YouTube</a>
          <a href="https://instagram.com/dataencriollo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
          <a href="https://linkedin.com/company/dataencriollo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
        </footer>
      </main>
    </div>
  )
}
