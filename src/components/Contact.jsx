import { useState, lazy, Suspense, useMemo } from "react"
import { motion } from "framer-motion"
import { personalInfo } from "../data/personalInfo"
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi"

const ContactScene = lazy(() => import("./ContactScene"))

const WEB3FORMS_ACCESS_KEY = "041ce127-d23b-4bba-b8f0-0175b05ca3ba"

export default function Contact() {
  const isMobile = useMemo(() => typeof window !== "undefined" && window.innerWidth < 768, [])
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Contact Form",
          subject: `New message from ${formData.name}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setStatusMessage("Message sent! I'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
        setStatusMessage("Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setStatusMessage("Network error. Please try again later.")
    }

    setTimeout(() => {
      setStatus("idle")
      setStatusMessage("")
    }, 5000)
  }

  return (
    <section id="contact" className="py-24 relative">
      {/* 3D Background Scene - Disabled on mobile */}
      {!isMobile && (
        <Suspense fallback={null}>
          <ContactScene />
        </Suspense>
      )}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* LN4 split heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="split-heading text-[clamp(2.5rem,8vw,7rem)]">
            <span className="block text-[var(--color-text-muted)]">GET IN</span>
            <span className="block text-[var(--color-papaya)]">TOUCH</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: message + info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-md">
              Ready to build something fast? I&apos;m always open to new
              opportunities, collaborations, and interesting conversations.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="block text-[var(--color-papaya)] hover:text-[var(--color-primary-light)] transition-colors hover-line text-sm font-['Space_Mono']"
              >
                {personalInfo.email}
              </a>
              <p className="text-sm text-[var(--color-text-muted)] font-['Space_Mono']">
                {personalInfo.location}
              </p>
            </div>

            {/* Decorative quote */}
            <div className="mt-12 border-l-2 border-[var(--color-papaya)]/30 pl-6">
              <p className="text-sm italic text-[var(--color-text-muted)] leading-relaxed">
              &ldquo;My only competition is the version of me that slept in.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Honeypot spam protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] font-['Space_Mono'] mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-papaya)] transition-colors text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] font-['Space_Mono'] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-papaya)] transition-colors text-sm"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] font-['Space_Mono'] mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-papaya)] transition-colors resize-none text-sm"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-3 text-sm text-[var(--color-bg)] bg-[var(--color-papaya)] hover:bg-[var(--color-primary-light)] transition-colors font-['Space_Mono'] tracking-wider cursor-pointer py-3 px-8 rounded-full font-bold uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>Sending...</>
              ) : status === "success" ? (
                <>
                  <FiCheck className="text-xs" />
                  Sent!
                </>
              ) : (
                <>
                  <FiSend className="text-xs" />
                  Send Message
                </>
              )}
            </motion.button>

            {statusMessage && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm font-['Space_Mono'] ${
                  status === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {status === "error" && <FiAlertCircle className="inline mr-1" />}
                {statusMessage}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
