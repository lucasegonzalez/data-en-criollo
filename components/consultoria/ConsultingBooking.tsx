'use client'

import { useState, useCallback } from 'react'
import { MONTH_NAMES, AVAILABLE_DAYS, TIME_SLOTS } from '@/data/calendar'
import { buildMonthGrid, monthName, formatDate } from '@/lib/calendar'
import styles from './ConsultingBooking.module.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DAY_HEADERS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

export function ConsultingBooking() {
  const now = new Date()
  const [cm, setCm] = useState(now.getMonth())
  const [cy, setCy] = useState(now.getFullYear())
  const [sd, setSd] = useState<number | null>(null)
  const [sh, setSh] = useState<string | null>(null)
  const [mail, setMail] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cells = buildMonthGrid(cy, cm, AVAILABLE_DAYS, sd)

  const prevMonth = useCallback(() => {
    setCm((p) => (p === 0 ? 11 : p - 1))
    if (cm === 0) setCy((p) => p - 1)
    setSd(null)
    setSh(null)
  }, [cm])

  const nextMonth = useCallback(() => {
    setCm((p) => (p === 11 ? 0 : p + 1))
    if (cm === 11) setCy((p) => p + 1)
    setSd(null)
    setSh(null)
  }, [cm])

  const selectDay = (d: number) => {
    setSd(d)
    setSh(null)
  }

  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(mail)) {
      setError('Ingresá un email válido.')
      return
    }
    if (!sd || !sh) {
      setError('Seleccioná un día y un horario.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: mail,
          day: sd,
          month: cm,
          year: cy,
          time: sh,
          source: 'consulting',
        }),
      })

      if (res.status === 429) {
        setError('Demasiados intentos. Esperá un momento y volvé a intentar.')
        return
      }

      if (!res.ok) {
        setError(
          'Ocurrió un error al agendar. Escribinos a info@dataencriollo.com.'
        )
        return
      }

      setConfirmed(true)
    } catch {
      setError(
        'Ocurrió un error al agendar. Escribinos a info@dataencriollo.com.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (confirmed) {
    return (
      <section className={styles.section} id="booking">
        <div className={styles.container}>
          <div className={styles.successBox}>
            <p className={styles.successTitle}>Consulta registrada</p>
            <p className={styles.successDetail}>
              Te confirmamos la fecha por email en menos de 24 horas.
              Revisá tu casilla de correo.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="booking">
      <div className={styles.container}>
        <h2 className={styles.title}>Agendá una llamada</h2>
        <p className={styles.subtitle}>
          Elegí el día y horario que mejor te quede. Te llamamos para
          conocerte y entender cómo podemos ayudarte.
        </p>

        {/* Calendar navigation */}
        <div className={styles.calHeader}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={prevMonth}
            aria-label="Mes anterior"
          >
            ← Anterior
          </button>
          <span className={styles.calMonth}>
            {MONTH_NAMES[cm]} {cy}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            onClick={nextMonth}
            aria-label="Mes siguiente"
          >
            Siguiente →
          </button>
        </div>

        {/* Calendar grid */}
        <div className={styles.calGrid}>
          {DAY_HEADERS.map((d) => (
            <div key={d} className={styles.calDayHeader}>
              {d}
            </div>
          ))}
          {cells.map((cell, i) => (
            <div
              key={i}
              className={`${styles.calDay} ${
                cell.available ? styles.calDayAvailable : ''
              } ${cell.selected ? styles.calDaySelected : ''}`}
              onClick={() =>
                cell.available && !cell.selected && selectDay(cell.day)
              }
            >
              {!cell.isPadding && cell.day}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {sd !== null && (
          <div className={styles.timeSection}>
            <p className={styles.timeLabel}>
              Horarios disponibles — {sd} de {monthName(cm)}
            </p>
            <div className={styles.timeGrid}>
              {TIME_SLOTS.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`${styles.timeSlot} ${
                    sh === h ? styles.timeSlotSelected : ''
                  }`}
                  onClick={() => setSh(h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {sd !== null && sh !== null && (
          <p className={styles.summary}>
            {formatDate(cy, cm, sd, sh)}
          </p>
        )}

        {/* Email input + submit */}
        <div className={styles.inputRow}>
          <input
            className={styles.emailInput}
            type="email"
            placeholder="tu@email.com"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Agendar llamada'}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  )
}
