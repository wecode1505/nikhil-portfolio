import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { navLinks, personalInfo } from "../data/personalInfo"
import { HiMenuAlt3, HiX } from "react-icons/hi"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo — LN4 bold initials style */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
        >
          <span className="text-lg font-black tracking-tighter text-[var(--color-papaya)] font-['Space_Grotesk']">
            {personalInfo.name.split(" ").map(n => n[0]).join("")}
          </span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors font-['Space_Mono']">
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-papaya)] transition-colors duration-200 font-['Space_Mono']"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Status dot + hamburger */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-papaya)] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-['Space_Mono']">
              Available
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-xl text-[var(--color-text)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu — full screen LN4 style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-[var(--color-border)] px-6 overflow-hidden"
          >
            <ul className="flex flex-col py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="border-b border-[var(--color-border)]/20 last:border-0"
                >
                  <a
                    href={link.href}
                    className="block py-4 text-sm uppercase tracking-[0.15em] text-[var(--color-text-secondary)] hover:text-[var(--color-papaya)] transition-colors font-['Space_Mono']"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
