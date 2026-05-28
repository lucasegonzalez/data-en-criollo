'use client'

import { useEffect, useRef } from 'react'

export function useTicker(ref: React.RefObject<HTMLDivElement | null>) {
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const animate = () => {
      posRef.current -= 0.5
      const halfWidth = el.scrollWidth / 2
      if (posRef.current < -halfWidth) {
        posRef.current = 0
      }
      el.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [ref])
}
