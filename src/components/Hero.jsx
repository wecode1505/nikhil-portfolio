import { useRef, lazy, Suspense } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { personalInfo } from "../data/personalInfo"

const HeroScene = lazy(() => import("./HeroScene"))

/* Infinite scrolling marquee ticker — like LN4's "mclaren f1 since 2019" */
function MarqueeTicker() {
  const items = personalInfo.headlines || [personalInfo.title]
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="w-full overflow-hidden border-y border-[var(--color-border)] py-4">
      <div className="marquee-track">
        {repeated.map((text, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <span className="text-sm md:text-base tracking-[0.15em] uppercase font-['Space_Mono'] text-[var(--color-text-secondary)]">
              {text}
            </span>
            <span className="text-[var(--color-papaya)] text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const year = new Date().getFullYear()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-between relative pt-20 pb-0"
    >
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <motion.div
        className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center"
        style={{ scale, opacity }}
      >
        {/* Subtitle line — like "2025 MCLAREN FORMULA 1 DRIVER" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-sm md:text-base tracking-[0.2em] uppercase font-['Space_Mono'] text-[var(--color-papaya)]">
            {year} — {personalInfo.title}
          </p>
        </motion.div>

        {/* Giant name — the LN4 centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
          style={{ y: y1 }}
        >
          <h1 className="split-heading text-[clamp(3.5rem,15vw,13rem)]">
            {personalInfo.name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  background: i === 0
                    ? "linear-gradient(90deg, #ff8000, #ffaa44)"
                    : "linear-gradient(90deg, #f5f5f5, #999)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Bio text + avatar — editorial intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-10"
        >
          <div className="flex items-center gap-5">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-papaya)]"
              style={{ animation: "papaya-pulse 3s ease-in-out infinite" }}
            />
            <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-sm leading-relaxed">
              {personalInfo.tagline}
            </p>
          </div>

          {/* "Next" callout — like LN4's "Next Race" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex items-center gap-3 px-5 py-3 rounded-full border border-[var(--color-papaya)]/30 bg-[var(--color-papaya)]/5 hover:bg-[var(--color-papaya)]/10 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-papaya)] animate-pulse" />
            <span className="font-['Space_Mono'] text-xs tracking-wider text-[var(--color-papaya)] uppercase">
              {personalInfo.subtitle}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Marquee ticker — full-width scrolling text like LN4 site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <MarqueeTicker />
      </motion.div>
    </section>
  )
}
