import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Main Portfolio Page
const MainPortfolio = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection] = useState('home')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [terminalText, setTerminalText] = useState('')
  const fullTerminalText = `vinh@portfolio:~$ whoami
> Fullstack Developer
> Backend-focused
> NestJS + React
> Java / Spring Boot

vinh@portfolio:~$ status
● Available for opportunities`

  // Typing animation
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullTerminalText.length) {
        setTerminalText(fullTerminalText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const navItems = ['Home', 'About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact']

  const scrollToSection = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="bg-dark text-gray-100 min-h-screen font-sans overflow-x-hidden">
      {/* Mouse glow */}
      <div
        className="fixed pointer-events-none w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] z-0 transition-all duration-300"
        style={{ left: cursorPosition.x - 200, top: cursorPosition.y - 200 }}
      />

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">VINH.DEV</Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`transition-colors hover:text-accent ${activeSection === item.toLowerCase() ? 'text-accent' : 'text-muted'}`}
              >
                {item}
              </button>
            ))}
            <button className="bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-lg text-sm transition-all">
              Download CV
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-white/5"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navItems.map(item => (
                  <button key={item} onClick={() => scrollToSection(item)} className="text-left py-2">
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-mono text-sm mb-4">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              ĐINH THANH VINH
            </h1>
            <p className="text-xl text-muted mb-2">FULLSTACK DEVELOPER_</p>
            <p className="text-muted font-mono text-sm mb-6">NodeJS • React • Java • TypeScript</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('projects')} className="bg-accent hover:bg-accent/90 text-dark px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2">
                Explore My Work <ChevronDown size={16} />
              </button>
              <button className="border border-white/10 hover:border-accent/50 px-6 py-3 rounded-lg font-medium transition-all">
                Download CV
              </button>
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-darker border border-white/5 rounded-xl p-6 font-mono text-sm shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <pre className="text-muted whitespace-pre-wrap leading-relaxed">
              {terminalText}<span className="animate-pulse">_</span>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12">
            <div>
              <h2 className="text-4xl font-bold md:sticky md:top-32">ABOUT ME.</h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted">
                I'm a final-year Information Technology student at CMC University, focused on Fullstack Development with a strong interest in Backend Engineering.
              </p>
              <p className="text-lg leading-relaxed text-muted">
                I build web applications using NestJS, React and Java/Spring Boot, with experience in REST APIs, databases, authentication, real-time systems and third-party integrations.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-12">
                {[
                  { num: "02+", label: "MAIN PROJECTS" },
                  { num: "03+", label: "BACKEND STACKS" },
                  { num: "", label: "FULLSTACK TEAM ROLE" },
                ].map((stat, i) => (
                  <div key={i} className="border border-white/5 rounded-xl p-6 text-center hover:border-accent/20 transition-all">
                    <p className="text-2xl font-bold text-accent mb-2">{stat.num}</p>
                    <p className="text-xs text-muted uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-darker/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12">
            <div>
              <h2 className="text-4xl font-bold md:sticky md:top-32">EDUCATION.</h2>
            </div>
            <div className="relative border-l border-white/10 ml-4 md:ml-0 pl-8">
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent -translate-x-[7px]" />
              <div className="space-y-4">
                <p className="text-muted">Final-year Student</p>
                <h3 className="text-2xl font-bold">Information Technology</h3>
                <p className="text-accent">CMC University</p>
                
                <div className="pt-4">
                  <p className="font-medium text-sm text-gray-300 mb-3">Relevant Knowledge:</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted">
                    <span className="px-3 py-1.5 bg-white/5 rounded">OOP</span>
                    <span className="px-3 py-1.5 bg-white/5 rounded">Data Structures & Algorithms</span>
                    <span className="px-3 py-1.5 bg-white/5 rounded">Database Systems</span>
                    <span className="px-3 py-1.5 bg-white/5 rounded">Software Engineering</span>
                    <span className="px-3 py-1.5 bg-white/5 rounded">Web Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12">
            <div>
              <h2 className="text-4xl font-bold md:sticky md:top-32">EXPERIENCE.</h2>
            </div>
            <div className="relative border-l border-white/10 ml-4 md:ml-0 pl-8">
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent -translate-x-[7px]" />
              <div className="space-y-4">
                <p className="text-muted">2026</p>
                <h3 className="text-2xl font-bold">BACKEND DEVELOPER</h3>
                <p className="text-accent">Company Name</p>
                <p className="text-sm text-muted">Java • Spring Boot • REST API • MySQL • Git</p>
                <ul className="space-y-2 text-muted">
                  <li>• Developed REST APIs</li>
                  <li>• Implemented business logic</li>
                  <li>• Integrated frontend APIs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10">SELECTED PROJECTS.</h2>

          {/* Project 1 - Helpdesk */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="bg-darker border border-white/5 rounded-xl h-[300px] hover:border-accent/20 transition-all group overflow-hidden relative">
              <img
                src="/helpdesk-preview.png"
                alt="Helpdesk SaaS Preview"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-500" />
            </div>
            <div className="space-y-6">
              <p className="text-accent text-sm font-mono">01 / FEATURED PROJECT</p>
              <h3 className="text-3xl font-bold">HELPDESK SaaS</h3>
              <p className="text-muted">Real-time Customer Support Platform</p>
              <p className="text-sm text-muted">Fullstack Developer — Team 1</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span className="px-2 py-1 bg-white/5 rounded">NestJS</span>
                <span className="px-2 py-1 bg-white/5 rounded">React</span>
                <span className="px-2 py-1 bg-white/5 rounded">PostgreSQL</span>
                <span className="px-2 py-1 bg-white/5 rounded">Socket.io</span>
              </div>
              <p className="text-muted leading-relaxed">
                A customer support platform for managing tickets, conversations and real-time communication between customers and agents.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <a href="https://helpdest-fe.onrender.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm border border-white/10 px-4 py-2 rounded-lg hover:border-accent/50 transition-all">
                  <ExternalLink size={14} /> LIVE DEMO
                </a>
                <a href="https://github.com/vdprogramm/helpdest.git" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm border border-white/10 px-4 py-2 rounded-lg hover:border-accent/50 transition-all">
                  <Github size={14} /> SOURCE CODE
                </a>
                <Link to="/projects/helpdesk" className="flex items-center gap-2 text-sm bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition-all">
                  <ArrowRight size={14} /> VIEW CASE STUDY
                </Link>
              </div>
            </div>
          </div>

          {/* Project 2 - ShopTech */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <p className="text-accent text-sm font-mono">02 / FEATURED PROJECT</p>
              <h3 className="text-3xl font-bold">SHOPTECH.</h3>
              <p className="text-muted">E-commerce Web & Mobile Platform</p>
              <p className="text-sm text-muted">Fullstack Developer — Team 1</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span className="px-2 py-1 bg-white/5 rounded">NestJS</span>
                <span className="px-2 py-1 bg-white/5 rounded">React</span>
                <span className="px-2 py-1 bg-white/5 rounded">React Native</span>
                <span className="px-2 py-1 bg-white/5 rounded">MongoDB</span>
                <span className="px-2 py-1 bg-white/5 rounded">AI</span>
              </div>
              <p className="text-muted leading-relaxed">
                Multi-platform e-commerce system with online payments, administration, mobile shopping and AI-powered features.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <a href="https://shoptech-ecommerce.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm border border-white/10 px-4 py-2 rounded-lg hover:border-accent/50 transition-all">
                  <ExternalLink size={14} /> LIVE DEMO
                </a>
                <a href="https://github.com/vdprogramm/Shoptech-ecommerce.git" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm border border-white/10 px-4 py-2 rounded-lg hover:border-accent/50 transition-all">
                  <Github size={14} /> SOURCE CODE
                </a>
              </div>
            </div>
            <div className="bg-darker border border-white/5 rounded-xl h-[300px] hover:border-accent/20 transition-all group overflow-hidden order-1 md:order-2 relative">
              <img
                src="/shoptech-preview.png"
                alt="ShopTech E-commerce Dashboard"
                className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="skills" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10">TECH STACK.</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['NestJS', 'React', 'Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Docker', 'Git'].map(tech => (
              <motion.div
                key={tech}
                whileHover={{ y: -5 }}
                className="bg-darker border border-white/5 rounded-xl p-6 text-center hover:border-accent/20 transition-all cursor-pointer group"
              >
                <p className="font-medium group-hover:text-accent transition-colors">{tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">HAVE A PROJECT OR OPPORTUNITY?</h2>
          <p className="text-3xl md:text-5xl font-bold text-accent mb-12">LET'S BUILD SOMETHING.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href="mailto:dinhthanhvinhnb205@gmail.com" className="bg-accent hover:bg-accent/90 text-dark px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2">
              <Mail size={16} /> EMAIL ME
            </a>
          </div>
          <div className="flex justify-center gap-8">
            <a href="https://github.com/vdprogramm" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/vinh-%C4%91inh-62141b359/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><Linkedin size={24} /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-muted text-sm">
        <p>Designed & Built by Đinh Thành Vinh © 2026</p>
      </footer>
    </div>
  )
}

// Helpdesk Case Study Page
const HelpdeskCaseStudy = () => {
  return (
    <div className="bg-dark text-gray-100 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/" className="text-accent mb-12 inline-block">← Back to Portfolio</Link>
        <h1 className="text-5xl font-bold mb-8">HELPDESK SaaS</h1>
        <p className="text-muted text-lg mb-10">Real-time Customer Support Platform</p>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted leading-relaxed">
              Helpdesk is a full-stack real-time customer support platform built for teams to manage customer tickets, live chat conversations and agent assignments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Architecture</h2>
            <pre className="text-muted font-mono text-sm whitespace-pre-wrap bg-darker p-8 rounded-xl border border-white/5">
              {`          React             
             ▼          
         NestJS         
    ↙   │   ↘ 
PostgreSQL Redis Socket.io    
    │    Prisma`}
            </pre>
          </section>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/projects/helpdesk" element={<HelpdeskCaseStudy />} />
      </Routes>
    </Router>
  )
}

export default App
