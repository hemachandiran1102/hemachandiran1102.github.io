import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Architecture from './components/Architecture'
import Contact from './components/Contact'
import Footer from './components/Footer'
import GridBackground from './components/GridBackground'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Animate in
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
          // Track active section for nav
          if (entry.isIntersecting && entry.target.dataset.section) {
            setActiveSection(entry.target.dataset.section)
          }
        })
      },
      { threshold: 0.15, rootMargin: '-50px 0px' }
    )

    document.querySelectorAll('.animate-in, [data-section]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <GridBackground />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
