import { useEffect, useRef } from 'react'

// Lagane zlatne čestice na canvasu; pauziraju se kada je kartica skrivena.
export default function Particles() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let parts = []

    const make = (randomY) => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.9,
      vy: 0.12 + Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      tw: 0.008 + Math.random() * 0.02,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = reduce ? 18 : Math.round(Math.min(70, Math.max(28, (w * h) / 16000)))
      parts = Array.from({ length: count }, () => make(true))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.phase += p.tw
        if (!reduce) {
          p.y -= p.vy
          p.x += p.vx + Math.sin(p.phase) * 0.15
          if (p.y < -10) Object.assign(p, make(false))
        }
        const a = 0.25 + (Math.sin(p.phase) + 1) * 0.3
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, `rgba(240, 214, 150, ${a})`)
        g.addColorStop(0.4, `rgba(201, 165, 94, ${a * 0.5})`)
        g.addColorStop(1, 'rgba(201, 165, 94, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
