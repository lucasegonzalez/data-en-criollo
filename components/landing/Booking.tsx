'use client'

import { useState, useCallback } from 'react'
import { MONTH_NAMES, AVAILABLE_DAYS, TIME_SLOTS } from '@/data/calendar'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DAY_HEADERS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

export function Booking() {
  const now = new Date()
  const [cm, setCm] = useState(now.getMonth())
  const [cy, setCy] = useState(now.getFullYear())
  const [sd, setSd] = useState<number | null>(null)
  const [st, setSt] = useState<string | null>(null)
  const [mail, setMail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const first = new Date(cy, cm, 1).getDay()
  const off = first === 0 ? 6 : first - 1
  const daysInMonth = new Date(cy, cm + 1, 0).getDate()

  const cells: { day: number; avail: boolean; pad: boolean }[] = []
  for (let i = 0; i < off; i++) cells.push({ day: 0, avail: false, pad: true })
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, avail: AVAILABLE_DAYS.includes(d), pad: false })
  }

  const prevMonth = useCallback(() => {
    setCm((p) => (p === 0 ? 11 : p - 1))
    if (cm === 0) setCy((p) => p - 1)
    setSd(null)
    setSt(null)
  }, [cm])

  const nextMonth = useCallback(() => {
    setCm((p) => (p === 11 ? 0 : p + 1))
    if (cm === 11) setCy((p) => p + 1)
    setSd(null)
    setSt(null)
  }, [cm])

  const selectDay = (d: number) => {
    setSd(d)
    setSt(null)
  }

  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(mail)) {
      setError('Ingresá un email válido.')
      return
    }
    if (!sd || !st) {
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
          time: st,
        }),
      })

      if (res.status === 429) {
        setError('Demasiados intentos. Esperá un momento y volvé a intentar.')
        return
      }

      if (!res.ok) {
        setError('Ocurrió un error al agendar. Escribinos a info@dataencriollo.com.')
        return
      }

      setSent(true)
      setMail('')
      setSd(null)
      setSt(null)
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError('Ocurrió un error al agendar. Escribinos a info@dataencriollo.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bk rv">
      <div className="bk-tt">Agendá una consulta</div>
      <p className="bk-ds">Elegí un día disponible — los horarios aparecen al seleccionar la fecha.</p>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <div>
          <span className="sl-lb">Disponibilidad</span>
          <div className="cn-nav">
            <button className="cn-nb" onClick={prevMonth}>◂ ANT</button>
            <span className="cn-mn">{MONTH_NAMES[cm]} {cy}</span>
            <button className="cn-nb" onClick={nextMonth}>SIG ▸</button>
          </div>
          <div className="cn-gr">
            {DAY_HEADERS.map((h) => (
              <span key={h} className="cn-dh">{h}</span>
            ))}
            {cells.map((c, i) => (
              <span
                key={i}
                className={`cn-d${c.avail ? ' av' : ''}${sd === c.day ? ' sel' : ''}`}
                onClick={() => c.avail && sd !== c.day && selectDay(c.day)}
              >
                {!c.pad && c.day}
                {c.avail && sd !== c.day && <span className="cn-dot" />}
              </span>
            ))}
          </div>
        </div>

        {sd !== null && (
          <div className={`tm-pn${sd !== null ? ' open' : ''}`}>
            <span className="sl-lb">Horarios — {MONTH_NAMES[cm]} {sd}</span>
            <div className="tm-gr">
              {TIME_SLOTS.map((t) => (
                <span
                  key={t}
                  className={`tm-sl${st === t ? ' sel' : ''}`}
                  onClick={() => setSt(t)}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="em-sl">
          {sd && st ? `✓ ${MONTH_NAMES[cm]} ${sd} · ${st} hs` : sd ? 'Elegí un horario ↑' : ''}
        </div>

        <div className="em">
          <span className="em-lb">Tu email para confirmar la consulta</span>
          <div className="em-rw">
            <input
              className="em-in"
              type="email"
              placeholder="tu@mail.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              disabled={loading}
            />
            <button
              className="em-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'ENVIANDO...' : 'CONFIRMAR ▸'}
            </button>
          </div>
          {error && <p style={{fontFamily:'DM Mono, monospace',fontSize:10,color:'#C0392B',marginTop:6}}>{error}</p>}
        </div>
      </div>

      {/* Toast */}
      <div className={`toast${sent ? ' show' : ''}`}>
        ✓ Consulta agendada — te escribo a tu mail
      </div>
    </section>
  )
}
