import { achievements } from "../data/personalInfo"

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="split-heading text-[clamp(3rem,10vw,8rem)]">
            <span className="block text-[var(--color-papaya)]">HIGH</span>
            <span className="block text-[var(--color-text)]">LIGHTS</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm font-['Space_Mono'] tracking-wider mt-4 max-w-md">
            Milestones earned through discipline, curiosity, and leadership.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((group, i) => (
            <article
              key={group.category}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-papaya)]/10 text-sm text-[var(--color-papaya)]">
                  0{i + 1}
                </span>
                <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--color-papaya)] font-['Space_Mono']">
                  {group.category}
                </h3>
              </div>
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-mclaren-blue)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
