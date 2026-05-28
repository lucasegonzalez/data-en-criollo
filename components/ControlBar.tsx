'use client'

import { EPISODES } from '@/data/episodes'
import { Keycap } from '@/components/ui/Keycap'
import styles from './ControlBar.module.css'

interface ControlBarProps {
  currentEpisode: number
  onPrevEp: () => void
  onNextEp: () => void
  onNavEp: (idx: number) => void
  onTogglePlanes: () => void
}

export function ControlBar({
  currentEpisode,
  onPrevEp,
  onNextEp,
  onNavEp,
  onTogglePlanes,
}: ControlBarProps) {
  const ep = EPISODES[currentEpisode]

  return (
    <>
      <div className={styles.ctrlBar}>
        <div style={{ display: 'flex', gap: 5 }}>
          <Keycap onClick={onPrevEp}>◂ ANT</Keycap>
          <Keycap onClick={onNextEp}>SIG ▸</Keycap>
        </div>
        <div className={styles.chDisplay}>
          CH <span>{ep.ch}</span>
        </div>
        <Keycap variant="planes" onClick={onTogglePlanes}>
          ▶ PLANES
        </Keycap>
      </div>

      <div className={styles.frow}>
        {EPISODES.map((e, i) => (
          <div
            key={e.id}
            className={`${styles.fi} ${i === currentEpisode ? styles.fiSelected : ''}`}
            onClick={() => onNavEp(i)}
          >
            <div className={styles.fiImg}>
              {e.icon ? (
                <img src={e.icon} alt="" style={{ width: 14, height: 12 }} />
              ) : (
                <svg width="14" height="12" viewBox="0 0 14 12">
                  <rect x="1" y="1" width="12" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="2" y="2" width="10" height="2" fill="currentColor" />
                  <rect x="2" y="6" width={5 + i * 2} height="1" fill="currentColor" />
                </svg>
              )}
            </div>
            <div className={styles.fiLbl}>
              EP.{e.ch}
              <br />
              {e.label.split('·')[1]?.trim().slice(0, 7)}
            </div>
          </div>
        ))}
        <div className={styles.moreBtn}>
          <div style={{ fontSize: 11, color: 'var(--tinta)' }}>···</div>
          <div style={{ fontSize: 7, color: '#888' }}>+44</div>
        </div>
      </div>
    </>
  )
}
