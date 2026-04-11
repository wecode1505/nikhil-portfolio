import { useEffect, useRef } from "react"

export default function LiveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w, h

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    // ── Mouse tracking for interactive glow ──
    let mouseX = w / 2
    let mouseY = h / 2
    let smoothMX = mouseX
    let smoothMY = mouseY

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", onMouseMove)

    // ── Large aurora blobs — McLaren papaya & blue color wash ──
    const blobs = [
      { x: 0.2, y: 0.3, r: 0.45, vx: 0.08, vy: 0.05, h: 30, s: 100, l: 40, a: 0.10 },   // papaya orange
      { x: 0.7, y: 0.2, r: 0.5, vx: -0.06, vy: 0.07, h: 210, s: 100, l: 35, a: 0.08 },  // McLaren blue
      { x: 0.5, y: 0.7, r: 0.55, vx: 0.04, vy: -0.06, h: 25, s: 90, l: 30, a: 0.07 },   // deep orange
      { x: 0.8, y: 0.8, r: 0.4, vx: -0.05, vy: -0.04, h: 200, s: 80, l: 25, a: 0.06 },  // ocean blue
      { x: 0.3, y: 0.6, r: 0.35, vx: 0.07, vy: 0.03, h: 40, s: 100, l: 50, a: 0.05 },   // golden energy
    ].map((b) => ({
      ...b,
      cx: b.x * w,
      cy: b.y * h,
      baseR: b.r * Math.max(w, h),
      phase: Math.random() * Math.PI * 2,
    }))

    // ── Particles — more, with trails ──
    const PARTICLE_COUNT = 100
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.6 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    }))

    // ── Shooting lines — occasional streaks ──
    const lines = []
    const spawnLine = () => {
      if (lines.length > 3) return
      const fromLeft = Math.random() > 0.5
      lines.push({
        x: fromLeft ? -50 : w + 50,
        y: Math.random() * h * 0.6,
        vx: fromLeft ? 3 + Math.random() * 4 : -(3 + Math.random() * 4),
        vy: 0.5 + Math.random() * 1.5,
        len: 80 + Math.random() * 150,
        alpha: 0.15 + Math.random() * 0.2,
        life: 1,
        decay: 0.003 + Math.random() * 0.004,
      })
    }

    let t = 0
    let rafId

    const draw = () => {
      t++

      // Smooth mouse
      smoothMX += (mouseX - smoothMX) * 0.05
      smoothMY += (mouseY - smoothMY) * 0.05

      // Clear with slight fade for motion blur
      ctx.fillStyle = "rgba(5, 5, 5, 0.35)"
      ctx.fillRect(0, 0, w, h)

      // ── Aurora blobs ──
      for (const b of blobs) {
        const drift = Math.sin(t * 0.003 + b.phase) * 60
        const driftY = Math.cos(t * 0.002 + b.phase * 1.3) * 40
        const pulse = 1 + Math.sin(t * 0.004 + b.phase) * 0.2

        // React to mouse proximity
        const dx = smoothMX - b.cx
        const dy = smoothMY - b.cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / 600) * 30

        const drawX = b.cx + drift + dx * influence * 0.02
        const drawY = b.cy + driftY + dy * influence * 0.02
        const drawR = b.baseR * pulse

        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, drawR)
        grad.addColorStop(0, `hsla(${b.h}, ${b.s}%, ${b.l}%, ${b.a})`)
        grad.addColorStop(0.3, `hsla(${b.h}, ${b.s - 10}%, ${b.l - 5}%, ${b.a * 0.6})`)
        grad.addColorStop(0.6, `hsla(${b.h}, ${b.s - 20}%, ${b.l - 8}%, ${b.a * 0.2})`)
        grad.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(drawX, drawY, drawR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // ── Mouse spotlight glow — papaya orange ──
      const spotGrad = ctx.createRadialGradient(smoothMX, smoothMY, 0, smoothMX, smoothMY, 350)
      spotGrad.addColorStop(0, "rgba(255, 128, 0, 0.08)")
      spotGrad.addColorStop(0.3, "rgba(0, 136, 255, 0.04)")
      spotGrad.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(smoothMX, smoothMY, 350, 0, Math.PI * 2)
      ctx.fillStyle = spotGrad
      ctx.fill()

      // ── Particles with glow ──
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.phase += p.speed

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        const flAlpha = p.alpha * (0.5 + Math.sin(p.phase) * 0.5)

        // Outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        glow.addColorStop(0, `rgba(255, 160, 60, ${flAlpha * 0.5})`)
        glow.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 200, 120, ${flAlpha})`
        ctx.fill()
      }

      // ── Shooting streaks ──
      if (Math.random() < 0.008) spawnLine()
      for (let i = lines.length - 1; i >= 0; i--) {
        const ln = lines[i]
        ln.x += ln.vx
        ln.y += ln.vy
        ln.life -= ln.decay

        if (ln.life <= 0) { lines.splice(i, 1); continue }

        const angle = Math.atan2(ln.vy, ln.vx)
        const endX = ln.x - Math.cos(angle) * ln.len
        const endY = ln.y - Math.sin(angle) * ln.len

        const lineGrad = ctx.createLinearGradient(ln.x, ln.y, endX, endY)
        lineGrad.addColorStop(0, `rgba(255, 160, 60, ${ln.alpha * ln.life})`)
        lineGrad.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.moveTo(ln.x, ln.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // ── Subtle grid lines (carbon fiber racing feel) ──
      ctx.strokeStyle = "rgba(255, 128, 0, 0.015)"
      ctx.lineWidth = 0.5
      const gridSize = 120
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "#050505" }}
    />
  )
}
