function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="pb-6 relative overflow-hidden z-100">
            {/* Decorative elements */}
            <div className="absolute -bottom-4 right-10 w-15 h-15 bg-[#67AE6E]/10 rounded-full"></div>
            <div className="absolute top-10 left-10 w-40 h-40 bg-[#4B5320]/5 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#67AE6E]/10 rounded-full"></div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">

                <div className="text-center text-[#4B5320]/70 text-sm">
                    <p>© {currentYear} Habib Risky Kurniawan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;