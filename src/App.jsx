import './App.css'
import { useState, useEffect } from "react";               // ← import useEffect
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Home } from './components/sections/Home'
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import "./index.css"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  // NEW: control whether the overlay is actually mounted
  const [showOverlay, setShowOverlay] = useState(false);

  // NEW: handle mounting/unmounting overlay around the 0.2s fade
  useEffect(() => {
    if (menuOpen) {
      setShowOverlay(true);
    } else {
      const timeout = setTimeout(() => setShowOverlay(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div 
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* UPDATED: fade overlay mounts via showOverlay, animates via menuOpen */}
        {showOverlay && (
          <div
            onClick={() => setMenuOpen(false)}
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 ${
              menuOpen ? 'animate-fade-in' : 'animate-fade-out'
            }`}
          ></div>
        )}

        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <Home />
        <About />
        <Projects />
        <Contact />
      </div>
    </>
  )
}

export default App
