'use client'

import { useState } from 'react'
import { PLANS } from '@/data/plans'
import { Keycap } from '@/components/ui/Keycap'
import styles from './PlansOverlay.module.css'

interface PlansOverlayProps {
  onClose: () => void
  onCta: (planName: string) => void
}

export function PlansOverlay({ onClose, onCta }: PlansOverlayProps) {
  const [curPlan, setCurPlan] = useState(0)

  const nav = (dir: number) => {
    setCurPlan((p) => (p + dir + PLANS.length) % PLANS.length)
  }

  const plan = PLANS[curPlan]

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayHeader}>
        <div className={styles.navGroup}>
          <button className={styles.navBtn} onClick={() => nav(-1)}>
            ◂
          </button>
          <span className={styles.navTitle}>
            PLAN {curPlan + 1} / {PLANS.length}
          </span>
          <button className={styles.navBtn} onClick={() => nav(1)}>
            ▸
          </button>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕ VOLVER
        </button>
      </div>

      <div className={styles.slideContainer}>
        {PLANS.map((p, i) => (
          <div
            key={p.id}
            className={`${styles.planSlide} ${i === curPlan ? styles.planSlideActive : ''}`}
          >
            <div className={styles.planHeader}>
              <span className={styles.planEmoji}>{p.emoji}</span>
              <span className={styles.planName}>{p.name}</span>
              {p.badge && <span className={styles.planBadge}>{p.badge}</span>}
              <span className={styles.planPrice}>USD {p.priceUSD}/mes</span>
            </div>
            <div className={styles.planIdeal}>Ideal para: {p.ideal}</div>
            <div className={styles.itemsGrid}>
              {p.items.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.itemRow}
                  style={{
                    color: item.included
                      ? 'rgba(232,223,200,0.85)'
                      : 'rgba(232,223,200,0.2)',
                  }}
                >
                  <span
                    style={{
                      color: item.included
                        ? '#7A8C5A'
                        : 'rgba(232,223,200,0.15)',
                      flexShrink: 0,
                    }}
                  >
                    {item.included ? '✓' : '—'}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <Keycap
              variant={p.id === 'pro' ? 'red' : 'dark'}
              fullWidth
              onClick={() => onCta(p.name)}
            >
              EMPEZAR CON {p.name.toUpperCase()} →
            </Keycap>
          </div>
        ))}
      </div>
    </div>
  )
}
