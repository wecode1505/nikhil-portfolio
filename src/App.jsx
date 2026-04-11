import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Preloader from './components/Preloader'
import CursorAura from './components/CursorAura'
import LiveBackground from './components/LiveBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(true)

  const handleLoadComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <LiveBackground />
      <CursorAura />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Navbar />
          <Hero />
          <Projects />
          <Skills />
          <Experience />
          <About />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App
