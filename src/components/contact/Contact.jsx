import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import useResetScroll from '../../hooks/useResetScroll';

function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const [elementVisibility, setElementVisibility] = useState({
        heading: false,
        subheading: false,
        form: false,
        contactInfo: false,
        socialLinks: false,
        decorations: false
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: '',
        isSubmitting: false
    });

    useEffect(() => {
        // Reset scroll position
        window.scrollTo(0, 0);

        const mainTimer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        const timers = [
            setTimeout(() => setElementVisibility(prev => ({ ...prev, heading: true })), 300),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, subheading: true })), 500),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, form: true })), 700),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, contactInfo: true })), 900),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, socialLinks: true })), 1100),
            setTimeout(() => setElementVisibility(prev => ({ ...prev, decorations: true })), 800)
        ];

        return () => {
            clearTimeout(mainTimer);
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({
                submitted: true,
                success: false,
                message: 'Please fill in all required fields.',
                isSubmitting: false
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({
                submitted: true,
                success: false,
                message: 'Please enter a valid email address.',
                isSubmitting: false
            });
            return;
        }

        // Set submitting state
        setFormStatus(prev => ({
            ...prev,
            isSubmitting: true
        }));

        try {
            // Send form data to Formspree
            const response = await fetch('https://formspree.io/f/xdkgbwby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Form submission successful
                setFormStatus({
                    submitted: true,
                    success: true,
                    message: 'Message sent successfully! I will get back to you soon.',
                    isSubmitting: false
                });

                // Clear form data
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                // Form submission failed
                setFormStatus({
                    submitted: true,
                    success: false,
                    message: 'Sorry, there was an error sending your message. Please try again later.',
                    isSubmitting: false
                });
            }
        } catch (error) {
            // Handle network or other errors
            setFormStatus({
                submitted: true,
                success: false,
                message: 'Sorry, there was an error sending your message. Please try again later.',
                isSubmitting: false
            });
        }

        // Reset status message after 5 seconds
        setTimeout(() => {
            setFormStatus(prev => ({
                ...prev,
                submitted: false,
                message: ''
            }));
        }, 5000);
    };
    useResetScroll()
    return (
        <div className="min-h-screen relative pt-20 pb-16 px-6 md:px-12 bg-[#FBF8EF] overflow-hidden">
            {/* Backdrop decorations with staggered animation */}
            <div className={`absolute top-20 left-10 w-40 h-40 bg-[#67AE6E]/10 rounded-full z-0 animate-pulse 
                transition-all duration-1000 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
            <div className={`absolute bottom-16 left-1/4 w-32 h-32 bg-[#67AE6E]/15 rounded-full z-0
                transition-all duration-1000 delay-300 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
            <div className={`absolute top-1/3 right-10 w-36 h-36 bg-[#4B5320]/10 rounded-full z-0
                transition-all duration-1000 delay-200 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
            <div className={`absolute bottom-1/4 right-1/5 w-24 h-24 bg-[#67AE6E]/20 rounded-full z-0 animate-pulse
                transition-all duration-1000 delay-500 transform ${elementVisibility.decorations ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>

            {/* Dotted pattern overlay */}
            <div className={`absolute inset-0 bg-[radial-gradient(#4B5320_1px,transparent_1px)] opacity-[0.03] [background-size:20px_20px] z-0
                transition-opacity duration-2000 ${isVisible ? 'opacity-[0.03]' : 'opacity-0'}`}></div>

            <div className="container mx-auto relative z-10">
                {/* Page Header */}
                <div className="text-center mb-14">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-[#4B5320] leading-tight
                        transition-all duration-700 transform ${elementVisibility.heading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Get In <span className="text-[#67AE6E] relative inline-block">
                            Touch
                            <span className={`absolute -bottom-1 left-0 h-1 bg-[#67AE6E]/20
                                transition-all duration-1000 delay-500 ${elementVisibility.heading ? 'w-full' : 'w-0'}`}></span>
                        </span>
                    </h1>

                    <p className={`text-lg max-w-xl mx-auto text-[#4B5320]/90
                        transition-all duration-700 delay-100 transform ${elementVisibility.subheading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Feel free to reach out for collaborations, project inquiries, or just to say hello!
                        I'm always open to discussing new projects and opportunities.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 delay-200 transform 
                        ${elementVisibility.form ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-2xl font-semibold mb-6 text-[#4B5320]">Send Me a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[#4B5320]/80 mb-1">Your Name <span className="text-[#67AE6E]">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-[#67AE6E]/20 focus:outline-none focus:ring-2 focus:ring-[#67AE6E]/30 focus:border-[#67AE6E]"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#4B5320]/80 mb-1">Email Address <span className="text-[#67AE6E]">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-[#67AE6E]/20 focus:outline-none focus:ring-2 focus:ring-[#67AE6E]/30 focus:border-[#67AE6E]"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-[#4B5320]/80 mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-[#67AE6E]/20 focus:outline-none focus:ring-2 focus:ring-[#67AE6E]/30 focus:border-[#67AE6E]"
                                    placeholder="What is this regarding?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-[#4B5320]/80 mb-1">Message <span className="text-[#67AE6E]">*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-[#67AE6E]/20 focus:outline-none focus:ring-2 focus:ring-[#67AE6E]/30 focus:border-[#67AE6E]"
                                    placeholder="Your message here..."
                                    required
                                ></textarea>
                            </div>

                            {formStatus.submitted && (
                                <div className={`p-3 rounded-lg ${formStatus.success ? 'bg-[#67AE6E]/20 text-[#4B5320]' : 'bg-red-100 text-red-700'}`}>
                                    {formStatus.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={formStatus.isSubmitting}
                                className={`w-full bg-[#67AE6E] text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group shadow-md 
                                ${formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#4B5320] hover:shadow-lg'}`}
                            >
                                <span>{formStatus.isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                <Send className={`ml-2 w-4 h-4 transform transition-transform duration-300 ${formStatus.isSubmitting ? '' : 'group-hover:translate-x-1'}`} />
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col space-y-8">
                        <div className={`transition-all duration-700 delay-300 transform 
                            ${elementVisibility.contactInfo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h2 className="text-2xl font-semibold mb-6 text-[#4B5320]">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#67AE6E]/10 p-3 rounded-full">
                                        <Mail className="w-6 h-6 text-[#67AE6E]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#4B5320]">Email</h3>
                                        <a href="mailto:habibskh06@gmail.com" className="text-[#67AE6E] hover:underline">habibskh06@gmail.com</a>
                                    </div>
                                </div>



                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#67AE6E]/10 p-3 rounded-full">
                                        <MapPin className="w-6 h-6 text-[#67AE6E]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#4B5320]">Location</h3>
                                        <p className="text-[#4B5320]/80">Surakarta, Indonesia</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 delay-400 transform 
                            ${elementVisibility.socialLinks ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h2 className="text-2xl font-semibold mb-6 text-[#4B5320]">Connect With Me</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href="https://github.com/Motherbloods"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 rounded-lg bg-[#4B5320]/5 hover:bg-[#67AE6E]/20 transition-colors duration-300"
                                >
                                    <Github className="w-6 h-6 text-[#4B5320] mr-3" />
                                    <span className="text-[#4B5320]">GitHub</span>
                                </a>

                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 rounded-lg bg-[#4B5320]/5 hover:bg-[#67AE6E]/20 transition-colors duration-300"
                                >
                                    <Linkedin className="w-6 h-6 text-[#4B5320] mr-3" />
                                    <span className="text-[#4B5320]">LinkedIn</span>
                                </a>

                                <a
                                    href="https://instagram.com/habibrk_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 rounded-lg bg-[#4B5320]/5 hover:bg-[#67AE6E]/20 transition-colors duration-300"
                                >
                                    <Instagram className="w-6 h-6 text-[#4B5320] mr-3" />
                                    <span className="text-[#4B5320]">Instagram</span>
                                </a>

                                <a
                                    href="mailto:habibskh06@gmail.com"
                                    className="flex items-center p-4 rounded-lg bg-[#4B5320]/5 hover:bg-[#67AE6E]/20 transition-colors duration-300"
                                >
                                    <Mail className="w-6 h-6 text-[#4B5320] mr-3" />
                                    <span className="text-[#4B5320]">Email</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;