import './App.css'
import { useState } from "react";
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Home } from './components/sections/Home'
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import "./index.css"

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div
        style={{ background: 'var(--surface-base)' }}
        className="min-h-screen"
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {menuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 opacity-0 animate-fade-in" />
        )}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
