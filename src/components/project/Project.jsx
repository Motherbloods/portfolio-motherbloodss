function Project() {
    const projects = [
        {
            title: 'Live Checker TikTok',
            description: 'A web app that detects whether a TikTok account is currently live using Puppeteer and Axios.',
            tech: ['Node.js', 'Puppeteer', 'Telegram Bot'],
            link: 'https://github.com/habibrk/tiktok-live-checker',
        },
        {
            title: 'Expense Splitter',
            description: 'An app to automatically calculate and split group expenses for hiking trips and events.',
            tech: ['Node.js', 'Express', 'EJS'],
            link: 'https://github.com/habibrk/expense-splitter',
        },
        {
            title: 'Language Learning App',
            description: 'A Flutter app that helps users learn new languages interactively with voice and image support.',
            tech: ['Flutter', 'Firebase', 'GetX'],
            link: 'https://github.com/habibrk/language-learning-app',
        },
    ];

    return (
        <div className="min-h-screen px-6 py-20 bg-[#FBF8EF] text-[#4B5320]">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">My Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white border border-[#67AE6E]/30 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
                    >
                        <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-[#4B5320]/80 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 bg-[#67AE6E]/20 text-sm rounded-lg font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-[#67AE6E] font-medium hover:underline"
                        >
                            View on GitHub →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
