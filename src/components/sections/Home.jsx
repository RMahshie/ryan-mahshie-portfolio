import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
    return (
        <section 
            id="home" 
            className="min-h-screen flex items-center justify-center relative"
        >
            <div className="text-center z-10 px-4">
                <RevealOnScroll delay={0}>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-right">
                        Hi, I'm Ryan Mahshie
                    </h1>
                </RevealOnScroll>

                <RevealOnScroll delay={150}>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                    Welcome! This website introduces my latest projects as a third year computer 
                    science major at Northeastern University. Current projects and interests 
                    include solving real world problems using LLMs and back-end development.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={300}>
                    <div className="flex justify-center space-x-4">
                        <a 
                            href="#about"
                            className="group bg-purple-500 text-white py-3 px-6 rounded font-medium transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5
                             hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2"
                        >
                            View Experience
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                        <a 
                            href="#contact"
                            className="group border border-purple-500/50 text-purple-500 py-3 px-6 rounded font-medium transition-all duration-300 
                             hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:bg-purple-500/10 flex items-center gap-2"
                        >
                            Contact Me
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};