import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
    return (
        <RevealOnScroll>
        <section 
            id="home" 
            className="min-h-screen flex items-center justify-center relative"
        >
            <div className="text-center z-10 px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-right">
                    Hi, I'm Ryan Mahshie
                </h1>

                <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                Welcome! This website introduces my latest projects as a third year computer 
                science major at Northeastern University. Current projects and interests 
                include solving real world problems using machine learning and back-end development.
                </p>
                <div className="flex justify-center space-x-4">
                    <a 
                        href="#about"
                        className="bg-purple-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5
                         hover:shadow-[0_0_15px_rgba(168, 85, 247, 0.4)]"
                    >
                        View Experience
                    </a>
                    <a 
                        href="#contact"
                        className="border border-purple-500/50 text-purple-500 py-3 px-6 round font-medium transition-all duration-200 
                         hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(168, 85, 247, 0.2)] hover:bg-purple-500/10"
                    >
                        Contact Me
                    </a>


                </div>
            </div>
        </section>
        </RevealOnScroll>
    );
};