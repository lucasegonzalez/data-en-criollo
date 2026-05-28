import type { Episode } from '@/data/episodes'
import styles from './EpisodeSlide.module.css'

interface EpisodeSlideProps {
  episode: Episode
}

export function EpisodeSlide({ episode }: EpisodeSlideProps) {
  return (
    <>
      <div className={styles.slideGrad} />
      <div className={styles.slideContent}>
        <div className={styles.topRow}>
          <div className={styles.label}>{episode.label}</div>
          <div className={styles.timecode}>{episode.timecode}</div>
        </div>
        <div>
          <div className={styles.title}>{episode.title}</div>
          <div className={styles.subtitle}>{episode.subtitle}</div>
        </div>
      </div>
    </>
  )
}
