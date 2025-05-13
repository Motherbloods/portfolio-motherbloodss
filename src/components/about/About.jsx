import { useEffect, useState } from 'react';

function About() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#FBF8EF]">
            <div className={`max-w-4xl text-[#4B5320] text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
                <p className="text-lg md:text-xl leading-relaxed text-[#4B5320]/90 mb-4">
                    Hello! I'm <span className="font-semibold text-[#67AE6E]">Habib Risky Kurniawan</span>, a passionate Full Stack Developer who enjoys building modern and efficient web applications.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-[#4B5320]/90 mb-4">
                    I have experience working with both frontend and backend technologies, including React, Tailwind CSS, Node.js, and MongoDB. I love turning ideas into reality through code.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-[#4B5320]/90">
                    My goal is to continuously grow as a developer and contribute to impactful projects. Let’s build something amazing together!
                </p>
            </div>
        </div>
    );
}

export default About;
