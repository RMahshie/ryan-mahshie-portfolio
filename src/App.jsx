import './App.css'
import { useState } from "react";
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Home } from './components/sections/Home'
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import "./index.css"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div 
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
          } bg-black text-gray-100`}
      >
       <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* ✅ Add this overlay before MobileMenu */}
      {menuOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 opacity-0 animate-fade-in"></div>
      )}
       <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
       <Home />
       <About />
       <Projects />
       <Contact />
       <Footer />
      </div>
    </>
  )
}

export default App
