'use client'

import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 2.5 + 0.8
      const duration = Math.random() * 14 + 10
      const delay = Math.random() * 12
      p.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: rgba(232,32,58,${(Math.random() * 0.35 + 0.08).toFixed(2)});
        animation: particleRise ${duration}s ${delay}s linear infinite;
      `
      el.appendChild(p)
    }

    return () => { el.innerHTML = '' }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    />
  )
}
