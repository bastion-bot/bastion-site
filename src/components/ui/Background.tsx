'use client'

import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let rafId: number
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * 9999,
      y: Math.random() * 9999,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.004 + 0.001,
    }))

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      stars.forEach(s => {
        s.phase += s.speed
        const alpha = ((Math.sin(s.phase) + 1) / 2) * 0.7 + 0.08
        const dx = (mx - W / 2) * 0.005 * s.r
        const dy = (my - H / 2) * 0.005 * s.r
        ctx.beginPath()
        ctx.arc((s.x % W) + dx, (s.y % H) + dy, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      })
      rafId = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', resize)
    document.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
