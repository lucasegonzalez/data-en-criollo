'use client'

import { useState, useCallback } from 'react'
import { MONTH_NAMES, AVAILABLE_DAYS, TIME_SLOTS } from '@/data/calendar'
import { buildMonthGrid, monthName, formatDate } from '@/lib/calendar'
import styles from './AgendaPanel.module.css'

export function AgendaPanel() {
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

  const prevMes = useCallback(() => {
    setCm((p) => (p === 0 ? 11 : p - 1))
    if (cm === 0) setCy((p) => p - 1)
    setSd(null)
    setSh(null)
  }, [cm])

  const nextMes = useCallback(() => {
    setCm((p) => (p === 11 ? 0 : p + 1))
    if (cm === 11) setCy((p) => p + 1)
    setSd(null)
    setSh(null)
  }, [cm])

  const selectDay = (d: number) => {
    setSd(d)
    setSh(null)
  }

  const selectTime = (h: string) => {
    setSh(h)
  }

  const handleAgendar = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(mail)) {
      setError('Email inválido')
      return
    }
    if (!sd || !sh) {
      setError('Seleccioná un día y horario')
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
        }),
      })

      if (res.status === 429) {
        setError('Demasiados intentos. Esperá un momento.')
        return
      }

      if (!res.ok) {
        setError('Algo salió mal. Escribinos a info@dataencriollo.com.')
        return
      }

      setConfirmed(true)
    } catch {
      setError('Algo salió mal. Escribinos a info@dataencriollo.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.agenda}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>📅</span>
        <span className={styles.headerTitle}>Agendá una llamada</span>
      </div>

      <div className={styles.body}>
        {/* Calendar */}
        <div>
          <div className={styles.secLbl}>DISPONIBILIDAD</div>
          <div className={styles.calNav}>
            <button className={styles.navBtn} onClick={prevMes}>◂</button>
            <span className={styles.calMonth}>{MONTH_NAMES[cm]} {cy}</span>
            <button className={styles.navBtn} onClick={nextMes}>▸</button>
          </div>
          <div className={styles.calGrid}>
            {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((d) => (
              <div key={d} className={styles.calDh}>{d}</div>
            ))}
            {cells.map((cell, i) => (
              <div
                key={i}
                className={`${styles.calD} ${cell.available ? styles.calAv : ''} ${cell.selected ? styles.calSelected : ''}`}
                onClick={() => cell.available && !cell.selected && selectDay(cell.day)}
              >
                {!cell.isPadding && cell.day}
                {cell.available && !cell.selected && <div className={styles.calDot} />}
              </div>
            ))}
          </div>
        </div>

        {/* Time slots */}
        {sd !== null && (
          <div>
            <div className={styles.secLbl}>HORARIOS · {sd} DE {monthName(cm)}</div>
            <div className={styles.tGrid}>
              {TIME_SLOTS.map((h) => (
                <div
                  key={h}
                  className={`${styles.tslot} ${sh === h ? styles.tslotSel : ''}`}
                  onClick={() => selectTime(h)}
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation message */}
        {sd !== null && sh !== null && !confirmed && (
          <div className={styles.confirmLine}>
            {formatDate(cy, cm, sd, sh)}
          </div>
        )}

        {/* Success */}
        {confirmed && (
          <div className={styles.okSec}>
            <div className={styles.okTitle}>✓ LLAMADA AGENDADA</div>
            <div className={styles.okDetail}>Revisá tu casilla. Si no está, revisá spam.</div>
          </div>
        )}

        {/* Email + Submit */}
        <div className={styles.mailRow}>
          <input
            className={styles.mailInp}
            placeholder="tu@mail.com"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            disabled={confirmed || loading}
          />
          <button
            className={styles.submitBtn}
            onClick={handleAgendar}
            disabled={confirmed || loading}
          >
            {loading ? '⋯' : 'AGENDAR'}
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  )
}
