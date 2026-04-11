import { motion } from "framer-motion"
import { experience } from "../data/personalInfo"

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* LN4 split heading — like ON / TRACK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="split-heading text-[clamp(3rem,10vw,8rem)]">
            <span className="block text-[var(--color-papaya)]">ON</span>
            <span className="block text-[var(--color-text)]">TRACK</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm font-['Space_Mono'] tracking-wider mt-4 max-w-md">
            Career milestones and experience highlights.
          </p>
        </motion.div>

        {/* Timeline list */}
        <div className="space-y-0">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border-b border-[var(--color-border)] py-8 first:pt-0 hover:bg-[var(--color-papaya)]/[0.02] transition-colors px-4 -mx-4 rounded-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-[var(--color-papaya)] transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-['Space_Mono'] text-xs text-[var(--color-text-muted)]">
                    {item.duration}
                  </span>
                  {item.current && (
                    <span className="text-[10px] px-3 py-1 rounded-full bg-[var(--color-papaya)]/10 text-[var(--color-papaya)] border border-[var(--color-papaya)]/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-papaya)] animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
              </div>
              <ul className="space-y-1.5 max-w-2xl">
                {item.description.map((point, pi) => (
                  <li
                    key={pi}
                    className="text-sm text-[var(--color-text-muted)] leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[var(--color-papaya)] mt-1 text-[8px]">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
