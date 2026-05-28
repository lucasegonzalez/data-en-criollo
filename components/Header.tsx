'use client'

import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.wordmark}>DATA</span>
        <span className={styles.divider} />
        <span className={styles.subtitle}>en Criollo</span>
        <span className={styles.cursor}>▊</span>
      </div>
    </header>
  )
}
