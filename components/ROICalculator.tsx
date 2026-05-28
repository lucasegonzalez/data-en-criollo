'use client'

import { useState, useMemo } from 'react'
import { parseMiles, fmtVentas, fmtARS, calcDiagnostics } from '@/lib/roi'
import styles from './ROICalculator.module.css'

export function ROICalculator() {
  const [ventasStr, setVentasStr] = useState('5.000.000')
  const [churn, setChurn] = useState(8)

  const ventas = useMemo(() => parseMiles(ventasStr), [ventasStr])
  const churnPct = churn / 100

  const diag = useMemo(() => calcDiagnostics(ventas, churnPct), [ventas, churnPct])

  const handleVentas = (value: string) => {
    setVentasStr(fmtVentas(value))
  }

  return (
    <div className={styles.calc}>
      <div className={styles.calcHeader}>
        <span className={styles.calcIcon}>→</span>
        <span className={styles.calcTitle}>¿Cuánto estás perdiendo?</span>
      </div>

      <div className={styles.calcBody}>
        <div className={styles.field}>
          <label className={styles.label}>VENTAS MENSUALES (ARS)</label>
          <input
            className={styles.input}
            value={ventasStr}
            onChange={(e) => handleVentas(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.churnRow}>
            <label className={styles.label}>PÉRDIDA DE CLIENTES (% mensual)</label>
            <span className={styles.churnValue}>{churn}%</span>
          </div>
          <input
            type="range"
            className={styles.slider}
            min={1}
            max={20}
            value={churn}
            onChange={(e) => setChurn(parseInt(e.target.value))}
          />
        </div>

        <div className={styles.result}>
          <span className={styles.resultLabel}>PÉRDIDA ESTIMADA POR MES</span>
          <span className={styles.resultValue}>{fmtARS(diag.total)}</span>
          <span className={styles.resultHint}>En datos mal aprovechados, clientes y decisiones tardías</span>
        </div>
      </div>
    </div>
  )
}
