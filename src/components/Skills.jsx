import { useRef, lazy, Suspense, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { skills } from "../data/personalInfo"

const SkillsScene = lazy(() => import("./SkillsScene"))

export default function Skills() {
  const sectionRef = useRef(null)
  const isMobile = useMemo(() => typeof window !== "undefined" && window.innerWidth < 768, [])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="skills" className="py-20 relative" ref={sectionRef}>
      {/* 3D Background Scene - Disabled on mobile */}
      {!isMobile && (
        <Suspense fallback={null}>
          <SkillsScene />
        </Suspense>
      )}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* LN4 split heading — like ON / TRACK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="split-heading text-[clamp(3rem,10vw,8rem)]">
            <span className="block text-[var(--color-papaya)]">SKILL</span>
            <span className="block text-[var(--color-text)]">SET</span>
          </h2>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          {skills.map((group) => (
            <span
              key={group.category}
              className="px-5 py-2.5 rounded-full border border-[var(--color-papaya)]/30 text-sm text-[var(--color-papaya)] hover:bg-[var(--color-papaya)]/10 hover:border-[var(--color-papaya)]/60 transition-all duration-300 cursor-default"
            >
              {group.category}
            </span>
          ))}
        </motion.div>

        {/* Skills grid with animated bars */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10" style={{ y }}>
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="p-5 rounded-xl glass-card"
            >
              <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--color-papaya)] font-['Space_Mono'] mb-5">
                {group.category}
              </h3>
              <div className="space-y-3">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[var(--color-text-secondary)]">{skill.name}</span>
                      <span className="font-['Space_Mono'] text-[10px] text-[var(--color-papaya)]/80">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Skill bar — LN4 data visualization feel */}
                    <div className="w-full h-[3px] bg-[var(--color-border)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, var(--color-papaya), var(--color-mclaren-blue))`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: gi * 0.1 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
