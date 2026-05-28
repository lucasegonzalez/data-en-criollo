'use client'

import { useEffect } from 'react'

export function CRTFlicker() {
  useEffect(() => {
    document.body.classList.add('crt-on')
    const timer = setTimeout(() => {
      document.body.classList.remove('crt-on')
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return null
}
