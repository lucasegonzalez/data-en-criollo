'use client'

import { useCallback } from 'react'

export function useStaticEffect() {
  const generateStatic = useCallback(() => {
    const pixels: React.ReactNode[] = []
    const count = 40 * 30
    for (let i = 0; i < count; i++) {
      const v = Math.random() > 0.5 ? 255 : 0
      const opacity = (Math.random() * 0.85 + 0.1).toFixed(2)
      pixels.push(
        <div
          key={i}
          style={{
            width: '2.5%',
            height: '3.34%',
            background: `rgb(${v},${v},${v})`,
            opacity,
          }}
        />
      )
    }
    return pixels
  }, [])

  const triggerStatic = useCallback(
    (cb: () => void) => {
      cb()
    },
    []
  )

  const showStatic = useCallback(
    (
      setPixels: (p: React.ReactNode[] | null) => void,
      cb: () => void
    ) => {
      setPixels(generateStatic())
      setTimeout(() => {
        setPixels(generateStatic())
        setTimeout(() => {
          setPixels(null)
          cb()
        }, 150)
      }, 150)
    },
    [generateStatic]
  )

  return { showStatic, generateStatic }
}
