import myPhoto from '../../assets/me.jpg';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import useResetScroll from '../../hooks/useResetScroll';

function Content() {
    const [showContent, setShowContent] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [elementVisibility, setElementVisibility] = useState({
        heading: false,
        subheading: false,
        paragraphs: false,
        buttons: false,
        photo: false,
        decorations: false
    });

    useResetScroll()

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setShowContent(true);
        }, 200);

        return () => clearTimeout(delayTimer);
    }, []);

    useEffect(() => {
        if (!showContent) return;
        const mainTimer = setTimeout(() => {
            setElementVisibility(prev => ({ ...prev, decorations: true }));
        }, 0);

        const timers = [
            setTimeout(() => setElementVisibility(prev => ({ ...prev, heading: true })), 300),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, subheading: true })), 500),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, paragraphs: true })), 700),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, buttons: true })), 900),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, photo: true })), 600),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, decorations: true })), 1100)
        ];

        return () => {
            clearTimeout(mainTimer);
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [showContent]);


    return (
        <div className="min-h-screen relative flex flex-col-reverse lg:flex-row items-center justify-between p-6 pt-10 lg:pt-20 lg:p-12 bg-[#FBF8EF] overflow-hidden">
            {/* Backdrop decorations with staggered animation */}
            <div className={`absolute top-10 left-10 w-32 h-32 bg-[#67AE6E]/20 rounded-full z-0 animate-pulse 
                transition-all duration-1000 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
            <div className={`absolute bottom-10 left-1/2 w-40 h-40 bg-[#67AE6E]/10 rounded-full z-0
                transition-all duration-1000 delay-300 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
            <div className={`absolute top-1/4 right-16 w-24 h-24 bg-[#4B5320]/10 rounded-full z-0
                transition-all duration-1000 delay-200 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
            <div className={`absolute bottom-1/3 right-1/4 w-16 h-16 bg-[#67AE6E]/15 rounded-full z-0 animate-pulse
                transition-all duration-1000 delay-500 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>

            {/* Dotted pattern overlay */}
            <div className={`absolute inset-0 bg-[radial-gradient(#4B5320_1px,transparent_1px)] opacity-[0.03] [background-size:20px_20px] z-0
                transition-opacity duration-2000 ${isVisible ? 'opacity-[0.03]' : 'opacity-0'}`}></div>

            {/* Text Content */}
            <div className="flex flex-col items-start text-[#4B5320] max-w-2xl relative z-10">
                <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight
                    transition-all duration-700 transform ${elementVisibility.heading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Hi, I'm <span className="text-[#67AE6E] relative inline-block">
                        Habib Risky
                        <span className={`absolute -bottom-1 left-0 h-1 bg-[#67AE6E]/20
                            transition-all duration-1000 delay-500 ${elementVisibility.heading ? 'w-full' : 'w-0'}`}></span>
                    </span>
                </h1>

                <h2 className={`text-2xl mb-8 font-medium flex items-center
                    transition-all duration-700 delay-100 transform ${elementVisibility.subheading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    I'm a <span className="relative group mx-2">
                        <span className="text-[#67AE6E] font-semibold">Full Stack Developer</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#67AE6E] transition-all duration-500 group-hover:w-full"></span>
                    </span>
                </h2>

                <div className={`space-y-6 transition-all duration-700 delay-200 transform 
                    ${elementVisibility.paragraphs ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className="text-lg leading-relaxed text-[#4B5320]/90">
                        I specialize in building <span className="font-semibold">modern and responsive</span> web applications.
                        With experience in both frontend and backend development, I help businesses create
                        <span className="text-[#67AE6E]"> engaging</span> and <span className="text-[#67AE6E]">efficient</span> digital experiences.
                    </p>

                    <p className="text-lg leading-relaxed text-[#4B5320]/90">
                        Feel free to explore my projects and get in touch with me to collaborate on exciting web development opportunities!
                    </p>
                </div>

                <div className={`flex flex-col sm:flex-row sm:items-center gap-6 mt-8
                    transition-all duration-700 delay-300 transform ${elementVisibility.buttons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <Link
                        to="/contact"
                        className="bg-[#67AE6E] text-white py-3 px-8 rounded-lg hover:bg-[#4B5320] transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg"
                    >
                        <span>Contact Me</span>
                        <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    {/* <div className="flex items-center space-x-5 sm:ml-4">
                        {[
                            { icon: Github, link: "https://github.com/Motherbloods" },
                            { icon: Linkedin, link: "https://linkedin.com" },
                            { icon: Mail, link: "mailto:habibskh06@gmail.com" },
                            { icon: Instagram, link: "https://instagram.com/habibrk_" },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#4B5320] hover:text-[#67AE6E] transition-colors duration-300"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div> */}
                </div>
            </div>

            {/* Profile Photo Section */}
            <div className={`mt-16 lg:mt-0 flex-shrink-0 relative z-10 
                transition-all duration-1000 transform ${elementVisibility.photo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative">
                    {/* Main photo with decorative circle */}
                    <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-xl border-4 border-white relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#67AE6E]/30 to-transparent z-10 mix-blend-overlay"></div>
                        <img
                            src={myPhoto}
                            alt="Habib Risky Kurniawan"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 z-20 relative cursor-pointer"
                        />
                    </div>

                    {/* Decorative elements with staggered animations */}
                    <div className={`absolute -bottom-6 -right-6 w-28 h-28 bg-[#67AE6E]/20 rounded-full z-0 animate-pulse
                        transition-all duration-700 delay-200 transform ${elementVisibility.photo ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
                    <div className={`absolute -top-6 -left-6 w-20 h-20 bg-[#4B5320]/10 rounded-full z-0
                        transition-all duration-700 delay-400 transform ${elementVisibility.photo ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
                    <div className={`absolute -bottom-12 left-1/2 w-16 h-16 bg-[#67AE6E]/30 rounded-full z-0
                        transition-all duration-700 delay-600 transform ${elementVisibility.photo ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>

                    <div className={`absolute -bottom-4 -right-4 bg-white text-[#4B5320] px-4 py-2 rounded-full shadow-lg text-sm font-medium
                        transition-all duration-700 delay-800 transform ${elementVisibility.photo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        1 years exp.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;