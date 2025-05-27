import { RevealOnScroll } from "../RevealOnScroll";
import { useState, useEffect } from "react";

export const Projects = () => {
    const [showVideoModal, setShowVideoModal] = useState(false);
    
    // Close modal when Escape key is pressed
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setShowVideoModal(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (showVideoModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showVideoModal]);
    
    // Google Drive embed URL conversion
    // Convert from: https://drive.google.com/file/d/1EsUQjmiFeGlnH7900i08dRjaDtF6015u/view?t=14
    // To: https://drive.google.com/file/d/1EsUQjmiFeGlnH7900i08dRjaDtF6015u/preview
    const videoId = "1EsUQjmiFeGlnH7900i08dRjaDtF6015u";
    const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;
    
    return (
        <RevealOnScroll>
        <section 
            id="projects" 
            className="min-h-screen flex items-center py-20"
        >
            {/* Video Modal */}
            {showVideoModal && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20 p-4 overflow-y-auto">
                    <div className="relative w-full max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden max-h-[80vh]">
                        {/* Close button positioned outside video */}
                        <button 
                            onClick={() => setShowVideoModal(false)}
                            className="absolute -top-10 -right-2 bg-black/60 text-white p-2.5 rounded-full 
                                      hover:bg-purple-600 hover:scale-110 transition-all duration-200"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div className="aspect-video">
                            <iframe 
                                src={embedUrl}
                                className="w-full h-full" 
                                frameBorder="0" 
                                allowFullScreen
                                title="LawSearch AI Demo"
                                allow="autoplay"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
          
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center"> 
                    {" "}
                    Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-purple-500/30 
                                    hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all">
                        <h3 className="text-xl font-bold mb-2"> LawSearch AI </h3>
                        <p className="text-gray-400 mb-4">
                            An AI-powered question-answering system that uses 
                            a dynamic RAG pipeline to retrieve and summarize key information 
                            from U.S. legislative documents.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {["Python", "LangChain", "LangGraph", "ChromaDB", "requests", "ChatGPT API", "Congressional API"].map((tech, key) => (
                                <span 
                                    key={key}
                                    className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition-all"
                                >
                                    {tech} 
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-start gap-6 items-center">
                            <a 
                                href="https://github.com/RMahshie/LawSearch-AI" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 transition-colors my-5"
                            > 
                                View Project →</a>
                            <button 
                                onClick={() => setShowVideoModal(true)}
                                className="text-purple-400 hover:text-purple-300 transition-colors my-5 cursor-pointer"
                            > 
                                Watch Demo →</button>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-purple-500/30 
                                    hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all">
                        <h3 className="text-xl font-bold mb-2"> ASL Image Classifier </h3>
                        <p className="text-gray-400 mb-4">
                        A deep learning model built with a convolutional neural network 
                        architecture to classify American Sign Language hand signs from 
                        image data.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {["Python", "PyTorch", "Regression", "CNN Architecture", "Multi-Class Classification"].map((tech, key) => (
                                <span 
                                    key={key}
                                    className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition-all"
                                >
                                    {tech} 
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <a 
                                href="https://github.com/RMahshie/ASLClassifier"
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="text-purple-400 hover:text-purple 300 transition-colors my-5"
                            > 
                                View Project →</a>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-purple-500/30 
                                    hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all">
                        <h3 className="text-xl font-bold mb-2"> MacOS ZSH Shell </h3>
                        <p className="text-gray-400 mb-4">
                            A custom Unix shell built in C, featuring a deterministic finite 
                            automaton tokenizer, along with support for command parsing, piping, 
                            file redirection, and built-in shell commands.                        
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {["C", "Unix", "Git", "GCC/Make", "Bash/ZSH", "Valgrind"].map((tech, key) => (
                                <span 
                                    key={key}
                                    className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition-all"
                                >
                                    {tech} 
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <a 
                                href="https://github.com/RMahshie/MacOS-ZSH-Shell"
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="text-purple-400 hover:text-purple 300 transition-colors my-5"
                            > 
                                View Project →</a>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-purple-500/30 
                                    hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all">
                        <h3 className="text-xl font-bold mb-2"> This Website </h3>
                        <p className="text-gray-400 mb-4">
                            I made this website to be a portfolio of my work and way to explore Frontend programming.                       
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {["JavaScript", "React", "Tailwind CSS", "Vite", "GitHub Pages", "Static Hosting", "Custom Domain"].map((tech, key) => (
                                <span 
                                    key={key}
                                    className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition-all"
                                >
                                    {tech} 
                                </span>
                            ))}
                        </div>
                        {/*
                        <div className="flex justify-between items-center">
                            <a 
                                href="#" 
                                className="text-purple-400 hover:text-purple 300 transition-colors my-5"
                            > 
                                View Project →</a>
                        </div>
                            */}
                    </div>

                    <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-purple-500/30 
                                    hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all">
                        <h3 className="text-xl font-bold mb-2"> What's Next... </h3>
                        <p className="text-gray-400 mb-4">
                            I'm working on building a workout tracker app for my phone. I currently pay for an easy
                            to use app, and I'd like to have my own that is free and my friends can use as well.                       
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {[].map((tech, key) => (
                                <span 
                                    key={key}
                                    className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition-all"
                                >
                                    {tech} 
                                </span>
                            ))}
                        </div>
                        {/*
                        <div className="flex justify-between items-center">
                            <a 
                                href="#" 
                                className="text-purple-400 hover:text-purple 300 transition-colors my-5"
                            > 
                                View Project →</a>
                        </div>
                            */}
                    </div>




                </div>
            </div>
          
        </section>
        </RevealOnScroll>
    );
};