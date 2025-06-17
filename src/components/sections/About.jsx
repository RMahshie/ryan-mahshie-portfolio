import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
    
    const frontendSkills = ["React", "TailwindCSS", "Vite", "JavaScript"]
    const backendSkills = ["Python", "Java", "SQL", "Git", "REST APIs", "ChromaDB"]
    const aiSkills = ["Python", "LangChain", "LangGraph", "PyTorch", "RAG Pipeline", "Classification", "Regression"]
    const devtoolSkills = ["VS Code", "MS SQL Server", "Jupyter Notebook", "Intelij", "Git"]
    
    return (
        <RevealOnScroll>
        <section 
            id="about" 
            className="min-h-screen flex items-center justify-center py-20">
          
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center"> 
                    About Me
                </h2>
                <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
                    <p className="text-gray-300 mb-6">
                    I'm Ryan Mahshie, a computer science student at Northeastern University with a 
                    concentration in artificial intelligence. I’m passionate about building practical, 
                    backend-driven systems and using AI to solve real-world problems. My experience ranges 
                    from developing RAG pipelines and image classifiers to working on data migrations and 
                    system restructuring during my internship at OPEXUS. I’m always looking to grow as a 
                    developer, take on meaningful challenges, and build things that make a real impact.
                    </p>
                

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4"> Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {backendSkills.map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                        hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition"
                                    >
                                       {tech} 
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4"> AI/ML</h3>
                            <div className="flex flex-wrap gap-2">
                                {aiSkills.map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                        hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition"
                                    >
                                       {tech} 
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4"> Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {frontendSkills.map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                        hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition"
                                    >
                                       {tech} 
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4"> Developer Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {devtoolSkills.map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20
                                                        hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition"
                                    >
                                       {tech} 
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
                        <h3 className="text-xl font-bold mb-4">
                        🏫 Education
                        </h3>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h4 className="font-semibold">B.S in Computer Science - Northeastern University</h4>
                                <p className="text-sm text-gray-400 mb-1">(2023 - 2027)</p>
                                <p className="ml-4">• Relevant Coursework: Object Oriented Design, Data Structures and Algorithms, Artificial Intelligence</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
                        <h3 className="text-xl font-bold mb-4">
                        💼 Experience
                        </h3>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h4 className="font-semibold"> Software Engineering CO-OP at <a href="https://www.linkedin.com/company/opscanvas/" target="_blank" rel="noopener noreferrer" className="text-inherit hover:text-purple-500 no-underline cursor-pointer transition-colors">OpsCanvas</a></h4>
                                <p className="text-sm text-gray-400 mb-1">(Jul. 2025 - Dec. 2025)</p>
                                <p className="ml-4">• Incoming co-op working on automated cloud deployment</p>
                            </div>

                            <div>
                                <h4 className="font-semibold"> Software Engineering Intern at Pelagic AI</h4>
                                <p className="text-sm text-gray-400 mb-1">(Jun. 2025 - Jul. 2025)</p>
                                <p className="ml-4">• Working on AI applications for aerospace technology solutions.</p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold"> Software Engineering Intern at OPEXUS</h4>
                                <p className="text-sm text-gray-400 mb-1">(Jun. 2024 - Sep. 2024)</p>
                                <p className="ml-4">• Developed SQL mapping scripts and supported large-scale data migrations 
                                    for legacy system transitions in public sector software.</p>
                            </div>

                            <div>
                                <h4 className="font-semibold"> Information Technology Volunteer at CEO</h4>
                                <p className="text-sm text-gray-400 mb-1">(Dec. 2023 - Jun. 2024)</p>
                                <p className="ml-4">•
                                Migrated web content from a legacy CMS to Google Sites and integrated donation 
                                and planning tools, improving accessibility and helping raise over $5,000 in online contributions.
                                </p>
                            </div>
                        </div>
                    </div>                      
                </div>
            </div>
          
        </section>
        </RevealOnScroll>);
};