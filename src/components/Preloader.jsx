import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { personalInfo } from "../data/personalInfo"

const letterVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6 + i * 0.04,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.8, duration: 0.6, ease: "easeOut" },
  },
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState("loading") // "loading" | "revealing" | "done"
  const nameParts = personalInfo.name.toUpperCase().split(" ")

  useEffect(() => {
    const duration = 2400
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(elapsed / duration, 1)
      // Ease-out curve
      const eased = 1 - Math.pow(1 - pct, 3)
      setProgress(Math.round(eased * 100))

      if (pct < 1) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => setPhase("revealing"), 300)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (phase === "revealing") {
      const timer = setTimeout(() => {
        setPhase("done")
        setTimeout(onComplete, 600)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Cinematic top/bottom bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-[#050505] z-10"
            initial={{ height: "8vh" }}
            animate={
              phase === "revealing"
                ? { height: "50vh" }
                : { height: "8vh" }
            }
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-[#050505] z-10"
            initial={{ height: "8vh" }}
            animate={
              phase === "revealing"
                ? { height: "50vh" }
                : { height: "8vh" }
            }
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Name reveal */}
          <div className="relative z-20 text-center">
            {nameParts.map((word, wordIdx) => (
              <div key={wordIdx} className="overflow-hidden">
                <div className="flex justify-center">
                  {word.split("").map((char, charIdx) => {
                    const globalIdx =
                      wordIdx === 0
                        ? charIdx
                        : nameParts[0].length + charIdx
                    return (
                      <motion.span
                        key={charIdx}
                        custom={globalIdx}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tight leading-[0.9]"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          background: wordIdx === 0
                            ? "linear-gradient(90deg, #ff8000, #ffaa44)"
                            : "linear-gradient(90deg, #f5f5f5, #cccccc)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {char}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Subtitle */}
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 text-xs sm:text-sm tracking-[0.3em] text-[#ff8000] font-['Space_Mono']"
            >
              {personalInfo.title.toUpperCase()}
            </motion.p>
          </div>

          {/* Progress bar — papaya orange */}
          <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-48">
            <div className="w-full h-px bg-[#222] relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #ff8000, #0088ff)",
                }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <span className="font-['Space_Mono'] text-xs text-[#ff8000] tracking-widest">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
