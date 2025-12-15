import { useEffect, useState } from "react";

export const Navbar = ({menuOpen, setMenuOpen}) => {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
    }, [menuOpen]);

    useEffect(() => {
        const sections = ["home", "about", "projects", "contact"];
        
        const handleScroll = () => {
            let currentSection = "home";
            let minDistance = Infinity;
            
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top - 80);
                    
                    if (rect.top <= 100 && distance < minDistance) {
                        minDistance = distance;
                        currentSection = sectionId;
                    }
                }
            }
            
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" }
    ];

    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#home" className="font-mono text-xl font-bold text-white"> 
                        {" "}
                        ryan-mahshie<span className="text-purple-500">.xyz</span> 
                    </a>

                    <div 
                        className={`w-7 h-5 relative cursor-pointer z-40 md:hidden transition-opacity duration-200 ${
                            menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                        onClick={() => setMenuOpen(true)}>
                        &#9776;
                    </div>

                    <div className="hidden md:flex items-center space-x-8 relative">
                        {navLinks.map((link) => (
                            <a 
                                key={link.id}
                                href={`#${link.id}`} 
                                className={`relative py-2 transition-colors duration-300 ${
                                    activeSection === link.id 
                                        ? "text-purple-400" 
                                        : "text-gray-300 hover:text-white"
                                }`}
                            > 
                                {link.label}
                                {activeSection === link.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full nav-indicator" />
                                )}
                            </a>
                        ))}
                    </div>
                    
                </div>

            </div>
        
        </nav>
    );
};