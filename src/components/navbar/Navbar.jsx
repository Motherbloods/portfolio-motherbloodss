import logo from '../../assets/modern_green_logo.svg';
import darkLogo from '../../assets/modern_dark_green_logo.svg';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'

const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Project', path: '/projects' }
]

function Navbar() {
    const [logoSrc, setLogoSrc] = useState(logo);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenuWithDelay = () => {
        setIsClosing(true);
        setTimeout(() => {
            setMobileMenuOpen(false);
            setIsClosing(false);
        }, 50); // delay 200ms
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-4 lg:px-6 py-3 lg:py-2 flex items-center justify-between">
                {/* Logo Teks */}
                <div className="text-[#4B5320] font-bold text-xl md:text-2xl tracking-wide transition-all duration-300 hover:tracking-wider flex items-center">
                    <span className="relative">
                        Motherbloodss
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#67AE6E] transition-all duration-300 ease-out hover:w-full"></span>
                    </span>
                </div>

                {/* Logo Tengah (hanya tampil di desktop) */}
                <div className="hidden md:flex flex-1 justify-center cursor-pointer">
                    <div className="relative group">
                        <img
                            src={logoSrc}
                            alt="Logo"
                            className={`h-10 w-auto transition-all duration-500 ease-in-out hover:scale-110 ${scrolled ? 'h-8' : 'h-10'}`}
                            onMouseEnter={() => setLogoSrc(darkLogo)}
                            onMouseLeave={() => setLogoSrc(logo)}
                        />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#67AE6E] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                    </div>
                </div>

                {/* Menu Desktop */}
                <div className="hidden md:block">
                    <ul className="flex space-x-8">
                        {menuItems.map(({ label, path }) => (
                            <li key={label} className="text-[#4B5320] hover:text-[#2F3414] font-medium transition-colors cursor-pointer relative group">
                                <Link to={path} className="py-2 inline-block">
                                    {label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#67AE6E] transition-all duration-300 ease-out group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Hamburger Menu untuk Mobile */}
                <div className="block md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-[#4B5320] hover:text-[#67AE6E] transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {(mobileMenuOpen || isClosing) && (
                <div
                    className={`md:hidden bg-white/95 backdrop-blur-sm border-t border-[#67AE6E]/20 py-4 shadow-lg ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
                        }`}
                >
                    <div className="container mx-auto px-4">
                        <ul className="space-y-4">
                            {menuItems.map(({ label, path }) => (
                                <li
                                    key={label}
                                    className="text-[#4B5320] hover:text-[#2F3414] font-medium transition-colors cursor-pointer relative group"
                                >
                                    <Link
                                        to={path}
                                        className="block py-2 w-full"
                                        onClick={closeMobileMenuWithDelay}
                                    >
                                        {label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#67AE6E] transition-all duration-300 ease-out group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Navbar;