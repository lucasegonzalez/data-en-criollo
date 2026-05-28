'use client'

import { useState, useEffect, useCallback } from 'react'
import { EPISODES } from '@/data/episodes'
import { EpisodeSlide } from '@/components/EpisodeSlide'
import { PlansOverlay } from '@/components/PlansOverlay'
import { useStaticEffect } from '@/hooks/useStaticEffect'
import styles from './MonitorCRT.module.css'

interface MonitorCRTProps {
  currentEpisode: number
  overlayOpen: boolean
  onNextEp: () => void
  onCloseOverlay: () => void
  onPlanCta: (name: string) => void
}

export function MonitorCRT({
  currentEpisode,
  overlayOpen,
  onNextEp,
  onCloseOverlay,
  onPlanCta,
}: MonitorCRTProps) {
  const [pixels, setPixels] = useState<React.ReactNode[] | null>(null)
  const { showStatic } = useStaticEffect()

  useEffect(() => {
    if (!overlayOpen) {
      showStatic(setPixels, () => {})
    }
  }, [currentEpisode, overlayOpen, showStatic])

  const advanceEp = useCallback(() => {
    if (overlayOpen) return
    showStatic(setPixels, () => {
      onNextEp()
    })
  }, [overlayOpen, showStatic, onNextEp])

  useEffect(() => {
    const id = setInterval(advanceEp, 9000)
    return () => clearInterval(id)
  }, [advanceEp])

  const ep = EPISODES[currentEpisode]

  return (
    <div className={styles.monitorWrap}>
      <div className={styles.monitorOuter}>
        <div className={styles.monitorScreen}>
          <div className={styles.scanlines} />
          <div className={styles.vignette} />
          {pixels && <div className={styles.staticLayer}>{pixels}</div>}
          <EpisodeSlide episode={ep} />
          {overlayOpen && (
            <PlansOverlay onClose={onCloseOverlay} onCta={onPlanCta} />
          )}
        </div>
        <div className={styles.monitorChin}>
          <div className={styles.powerLed} />
        </div>
      </div>
    </div>
  )
}

export { EPISODES }
