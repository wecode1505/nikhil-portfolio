import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { personalInfo } from "../data/personalInfo"
import { FiMapPin, FiBook, FiCode } from "react-icons/fi"

export default function About() {
  const sectionRef = useRef(null)
  const isMobile = useMemo(() => typeof window !== "undefined" && window.innerWidth < 768, [])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section id="about" className="relative py-20" ref={sectionRef}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* LN4 split heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="split-heading text-[clamp(3rem,10vw,8rem)]">
            <span className="block text-[var(--color-papaya)]">OFF</span>
            <span className="block text-[var(--color-text)]">TRACK</span>
          </h2>
        </motion.div>

        {/* LN4 inspirational quote — full width, cinematic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 py-16 px-8 md:px-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-papaya)]/[0.04] to-transparent pointer-events-none" />

          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-[var(--color-text)] max-w-4xl relative z-10">
            Built different. Coded better. Trained harder.
            <br />
            <span className="text-[var(--color-papaya)]">Code. Combat. Calculus. Repeat at max speed.</span>
          </blockquote>

          {/* Signature-style name */}
          <div className="mt-8 flex items-center gap-4 relative z-10">
            <div className="w-12 h-px bg-[var(--color-papaya)]" />
            <span className="font-['Space_Mono'] text-sm tracking-[0.2em] text-[var(--color-papaya)] uppercase">
              {personalInfo.name}
            </span>
          </div>
        </motion.div>

        {/* Two-column editorial layout */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ y: textY }}
          >
            <p className="text-[var(--color-text-secondary)] leading-[1.8] text-base mb-8">
              {personalInfo.bio}
            </p>
            <p className="text-[var(--color-text-secondary)] leading-[1.8] text-base">
              {personalInfo.longBio}
            </p>
          </motion.div>

          {/* Right: Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile image */}
            <motion.div className="mb-8" style={{ y: imgY }}>
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full max-w-xs rounded-lg object-cover transition-all duration-700 border-2 border-[var(--color-papaya)]/40 hover:border-[var(--color-papaya)] hover:shadow-[0_0_30px_rgba(255,128,0,0.2)]"
              />
            </motion.div>

            {/* Info items — styled like LN4 stats */}
            {[
              { icon: <FiMapPin />, label: "Based in", value: personalInfo.location },
              { icon: <FiBook />, label: "Education", value: `${personalInfo.degree} — ${personalInfo.university}` },
              { icon: <FiCode />, label: "Focus", value: personalInfo.title },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-[var(--color-papaya)]/[0.03] transition-colors">
                <span className="text-[var(--color-papaya)] text-sm mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] font-['Space_Mono'] mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.value}</p>
                </div>
              </div>
            ))}

            {/* CTA — LN4 button style */}
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-papaya)]/30 text-sm text-[var(--color-papaya)] hover:bg-[var(--color-papaya)]/10 hover:border-[var(--color-papaya)]/60 transition-all font-['Space_Mono'] tracking-wide"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-papaya)]" />
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
