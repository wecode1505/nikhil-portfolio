import { useEffect, useRef } from "react"

export default function CursorAura() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
    }

    let rafId
    const animate = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 128, 0, 0.3)",
          willChange: "transform",
        }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255, 128, 0, 0.8)",
          boxShadow: "0 0 8px rgba(255, 128, 0, 0.4)",
          willChange: "transform",
        }}
      />
    </>
  )
}
