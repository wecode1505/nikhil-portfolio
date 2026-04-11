import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { personalInfo } from "../data/personalInfo"

function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  return (
    <span className="font-['Space_Mono'] text-2xl md:text-4xl text-[var(--color-papaya)] tabular-nums">
      {formatted}
    </span>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  const socials = [
    { name: "GitHub", url: personalInfo.socialLinks.github },
    { name: "LinkedIn", url: personalInfo.socialLinks.linkedin },
    { name: "Instagram", url: personalInfo.socialLinks.instagram },
    { name: "Twitter", url: personalInfo.socialLinks.twitter },
  ]

  return (
    <footer className="border-t border-[var(--color-border)]">
      {/* WHAT'S UP ON SOCIALS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="split-heading text-[clamp(2rem,6vw,5rem)]">
            <span className="block text-[var(--color-text-muted)]">WHAT&apos;S UP</span>
            <span className="block text-[var(--color-papaya)]">ON SOCIALS</span>
          </h2>
        </motion.div>

        {/* Social links — pill buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-papaya)] hover:border-[var(--color-papaya)]/40 hover:bg-[var(--color-papaya)]/5 transition-all duration-300 font-['Space_Mono'] tracking-wider uppercase"
            >
              {s.name}
            </a>
          ))}
        </motion.div>

        {/* Clock + handle */}
        <div className="section-divider" />
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="section-label mb-3">Lap time</p>
            <LiveClock />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--color-papaya)] animate-pulse" />
            <span className="font-['Space_Mono'] text-xs text-[var(--color-papaya)]">
              @{personalInfo.name.toLowerCase().replace(/\s+/g, "")}
            </span>
          </div>
        </div>
      </div>

      {/* ALWAYS BRINGING THE FIGHT */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-card)]/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="split-heading text-[clamp(1.5rem,5vw,4rem)] mb-8"
          >
            <span className="text-[var(--color-text)]">ALWAYS BRINGING </span>
            <span className="text-[var(--color-papaya)]">THE FIGHT.</span>
          </motion.h3>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-papaya)] transition-colors font-['Space_Mono'] hover-line"
              >
                {personalInfo.email}
              </a>
              <span className="text-[var(--color-border)]">|</span>
              <span className="text-sm text-[var(--color-text-muted)] font-['Space_Mono']">
                {personalInfo.location}
              </span>
            </div>
            <a
              href="#home"
              className="text-xs text-[var(--color-papaya)] hover:text-[var(--color-primary-light)] transition-colors font-['Space_Mono'] uppercase tracking-wider"
            >
              Back to top ↑
            </a>
          </div>

          <div className="section-divider mt-8" />
          <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-[var(--color-text-muted)]">
              &copy; {year} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
