'use client'

import { type ReactNode } from 'react'
import styles from './Keycap.module.css'

interface KeycapProps {
  variant?: 'base' | 'dark' | 'red' | 'mostaza' | 'planes'
  onClick?: () => void
  href?: string
  external?: boolean
  fullWidth?: boolean
  disabled?: boolean
  style?: React.CSSProperties
  children: ReactNode
}

export function Keycap({
  variant = 'base',
  onClick,
  href,
  external,
  fullWidth,
  disabled,
  style,
  children,
}: KeycapProps) {
  const cls = [
    styles.key,
    variant === 'dark' && styles.dark,
    variant === 'red' && styles.red,
    variant === 'mostaza' && styles.mostaza,
    variant === 'planes' && styles.planes,
    fullWidth && styles.fullWidth,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
        style={style}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={cls} onClick={onClick} type="button" disabled={disabled} style={style}>
      {children}
    </button>
  )
}
