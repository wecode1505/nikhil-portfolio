import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "../data/personalInfo"

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const isWide = index % 3 === 0

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"
  }

  return (
    <motion.a
      href={project.live || project.github || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={`group block ln4-card ${isWide ? "md:col-span-2" : ""}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.2s ease-out" }}
    >
      {/* Photo area — LN4 editorial style */}
      <div className={`${isWide ? "aspect-[21/9]" : "aspect-[16/10]"} rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-hidden relative group-hover:border-[var(--color-papaya)]/50 transition-all duration-400`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-papaya)]/[0.05] to-[var(--color-mclaren-blue)]/[0.03]" />
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`${isWide ? "text-7xl md:text-9xl" : "text-5xl md:text-7xl"} font-bold text-[var(--color-papaya)]/[0.06] font-['Space_Grotesk'] group-hover:text-[var(--color-papaya)]/[0.15] transition-all duration-700 group-hover:scale-110`}>
              {project.title.split(" ").map((w) => w[0]).join("")}
            </span>
          </div>
        )}
        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Bottom speed line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-papaya)] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-400" />

        {/* Caption overlay — LN4 style location/date markers */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="photo-caption text-[var(--color-papaya)]">
            {project.featured ? "🏁 Featured" : "⚡ Project"}
          </span>
          <span className="photo-caption text-[var(--color-text-muted)]">
            {project.tags[0]}
          </span>
        </div>
      </div>

      {/* Title + tags below photo */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold group-hover:text-[var(--color-papaya)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{project.description.slice(0, 80)}…</p>
        </div>
        <span className="font-['Space_Mono'] text-[10px] tracking-wider text-[var(--color-text-muted)] uppercase whitespace-nowrap mt-1">
          {project.tags.join(" · ")}
        </span>
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? projects : projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* LN4 split heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="split-heading text-[clamp(3rem,10vw,8rem)]">
            <span className="block text-[var(--color-papaya)]">MY</span>
            <span className="block text-[var(--color-text)]">PROJECTS</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm font-['Space_Mono'] tracking-wider mt-4 max-w-md">
            Featured work, case studies, and builds from the track.
          </p>
        </motion.div>

        {/* Masonry-ish grid — alternating wide/narrow like LN4 photo gallery */}
        <motion.div layout className="grid md:grid-cols-2 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.length > 3 && (
          <div className="mt-16">
            <div className="section-divider" />
            <div className="pt-6 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 rounded-full border border-[var(--color-papaya)]/30 text-sm text-[var(--color-papaya)] hover:bg-[var(--color-papaya)]/10 hover:border-[var(--color-papaya)]/60 transition-all font-['Space_Mono'] tracking-wide cursor-pointer"
              >
                {showAll ? "Show Less ↑" : "View All Projects ↓"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
