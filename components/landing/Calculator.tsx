'use client'

import { useState, useCallback } from 'react'

const FACTOR = 0.075

const URG_MSGS = [
  '"Una sola decisión mala al mes cuesta esto."',
  '"Con esa plata pagás 3 meses de asesoría."',
  '"Es lo que perdés mientras lo seguís pensando."',
  '"El mercado no espera que termines de decidir."',
]

export function Calculator() {
  const [ventas, setVentas] = useState('5000000')
  const [pct, setPct] = useState(40)

  const calc = useCallback(() => {
    const v = parseFloat(ventas) || 0
    const p = pct / 100
    const total = Math.round(v * p * FACTOR)
    const yearly = total * 12
    const idx = Math.min(Math.floor(p * 4), 3)
    return { total, yearly, idx }
  }, [ventas, pct])

  const { total, yearly, idx } = calc()

  const handleVentas = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVentas(e.target.value)
  }

  const handlePct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPct(parseInt(e.target.value))
  }

  return (
    <section className="cs rv">
      <div className="cl">
        <div className="cl-hd"><em>→</em> ¿Cuánto te cuesta no tener datos?</div>
        <div className="cl-bd">
          <div>
            <span className="lbl">Facturación mensual</span>
            <div className="inp-wp">
              <span className="inp-pr">$</span>
              <input className="inp" type="number" value={ventas} onChange={handleVentas} min="0" step="100000" />
            </div>
          </div>

          <div className="sl-bk">
            <div className="sl-tp">
              <span className="lbl">Decisiones que tomás sin datos</span>
              <span><span className="pct-bg">{pct}</span><span className="pct-sg">%</span></span>
            </div>
            <input className="sld" type="range" min="5" max="95" value={pct} onChange={handlePct} step="5" />
            <span className="sl-hi">Pensá: cambios de precio, compras de stock, contrataciones… ¿cuántas las tomás &quot;a ojo&quot;?</span>
          </div>

          <div className="res">
            <div className="res-orb"></div>
            <span className="res-lb">⚠ Pérdida mensual estimada</span>
            <span className="res-vl pop">${total.toLocaleString('es-AR')}</span>
            <span className="res-yr">→ ${yearly.toLocaleString('es-AR')} por año</span>
            <span className="res-ug">{URG_MSGS[idx]}</span>
            <span className="res-fm">= ${Math.round(parseFloat(ventas) || 0).toLocaleString('es-AR')} × {pct}% × 7.5% · (estimación conservadora)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
