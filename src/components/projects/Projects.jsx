import { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, Code, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import useResetScroll from '../../hooks/useResetScroll';
import { containerVariants, itemVariants } from '../../utils/animationVariants';
import { Link } from 'react-router-dom';

function Projects() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [visibleProjects, setVisibleProjects] = useState([]);
    const [showDetails, setShowDetails] = useState(null);

    const categories = ['all', 'web', 'mobile', 'backend'];

    const projects = [
        {
            id: 1,
            title: 'Smart Expense Tracker',
            description: 'Aplikasi web untuk mencatat pengeluaran secara otomatis dengan kategorisasi berbasis AI dan notifikasi real-time.',
            longDescription: 'Smart Expense Tracker adalah aplikasi berbasis web yang dirancang untuk membantu pengguna mengelola keuangan dengan efisien. Aplikasi ini menggunakan model AI AutoExpense Categorizer untuk mengelompokkan pengeluaran secara otomatis. Didukung notifikasi real-time melalui Pusher dan Telegram Webhook, serta tampilan modern menggunakan Vite + React. Fitur unggulan termasuk histori transaksi, pengelompokan otomatis, analisis bulanan, dan integrasi notifikasi cerdas.',
            tech: ['React (Vite)', 'Node.js', 'Pusher', 'Telegram Webhook', 'AutoExpense Categorizer'],
            link: 'https://github.com/Motherbloods/Smart-Expense-Tracker',
            demoLink: 'https://smart-expense-tracker-pearl.vercel.app/',
            image: '/api/placeholder/SmartExpenseTracker.svg',
            category: 'web',
            stars: 0,
            forks: 0,
            featured: true
        },
        {
            id: 2,
            title: 'Auto Expense Categorizer',
            description: 'Layanan backend berbasis Python untuk mengelompokkan pengeluaran secara otomatis menggunakan AI.',
            longDescription: 'Auto Expense Categorizer adalah sistem klasifikasi transaksi berbasis AI yang dibangun dengan Python dan menggunakan dataset khusus buatan sendiri. Model ini memanfaatkan teknik Natural Language Processing (NLP) untuk mengkategorikan deskripsi transaksi ke dalam kategori seperti Makanan, Transportasi, dan Belanja. Dirancang agar mudah diintegrasikan ke aplikasi keuangan lainnya sebagai layanan backend mandiri.',
            tech: ['Python', 'FastAPI', 'scikit-learn', 'pandas'],
            link: 'https://github.com/Motherbloods/autoexpense-categorizer',
            demoLink: '#',
            image: '/api/placeholder/AutoExpenseCategorizer.png',
            category: 'backend',
            stars: 0,
            forks: 0
        },
        {
            id: 3,
            title: 'Live Push Notification',
            description: 'Aplikasi Flutter yang memberikan notifikasi real-time saat pengguna TikTok tertentu mulai live.',
            longDescription: 'Aplikasi ini memantau akun TikTok pilihan dan mengirimkan notifikasi instan melalui Firebase Cloud Messaging saat akun tersebut mulai live. Dilengkapi dengan dashboard analitik yang menampilkan data sesi live secara rinci, kalender untuk melihat riwayat live berdasarkan tanggal, serta visualisasi data menggunakan chart. Aplikasi juga mendukung cache untuk akses offline dan fitur alarm otomatis saat sesi live dimulai.',
            tech: ['Flutter', 'Firebase FCM', 'MongoDB', 'Node.js'],
            link: 'https://github.com/Motherbloods/Live-Push-Notification',
            demoLink: '#',
            image: '/api/placeholder/live-dashboard.svg ',
            category: 'mobile',
            stars: 0,
            forks: 0,
            featured: true
        }
        ,
        {
            id: 4,
            title: 'Pintar Berhitung Kivy',
            description: 'Aplikasi belajar matematika interaktif dengan fitur gamifikasi untuk semua usia.',
            longDescription: 'Selamat datang di Pintar Berhitung, aplikasi belajar matematika yang penuh tantangan seru dan interaktif! Pintar Berhitung membantu meningkatkan kemampuan berhitung sambil bersenang-senang dengan fitur gamifikasi yang menarik, seperti avatar, stars, skor, dan sistem level. Cocok untuk pelajar dari segala usia, aplikasi ini menawarkan pengalaman belajar yang mengasyikkan dan memotivasi pengguna untuk terus berlatih. Dilengkapi dengan mode latihan, kuis, dan laporan kemajuan.',
            tech: ['Python', 'Kivy'],
            link: 'https://github.com/Motherbloods/Pintar-Berhitung-Kivy-Python',
            demoLink: 'https://play.google.com/store/apps/details?id=org.motherbloodss.asix.pintarberhitungasix',
            image: '/api/placeholder/pintarberhitung.png',
            category: 'mobile',
            stars: 0,
            forks: 0
        }
        ,
        {
            id: 5,
            title: 'Expense Splitter',
            description: 'Aplikasi web untuk membagi pengeluaran kelompok secara otomatis.',
            longDescription: 'Aplikasi ini menghitung pembagian pengeluaran berdasarkan kontribusi masing-masing anggota. Cocok untuk kegiatan seperti hiking, jalan-jalan, atau acara bersama. Mendukung ekspor laporan PDF dan pengelolaan multi-event.',
            tech: ['Node.js', 'Express', 'EJS', 'MongoDB'],
            link: 'https://github.com/Motherbloods/Expense-Splitter',
            demoLink: '#',
            image: '/api/placeholder/expense_dashboard_placeholder.svg',
            category: 'web',
            stars: 0,
            forks: 0,
            featured: true
        },
        {
            id: 6,
            title: 'Apotek Management App',
            description: 'Aplikasi mobile Flutter untuk manajemen stok obat dan informasi apotek.',
            longDescription: 'Aplikasi Apotek adalah sebuah aplikasi mobile yang memungkinkan pengguna untuk mencari, melihat, dan mengelola informasi obat-obatan. Fitur termasuk pencarian obat, tampilan detail obat, manajemen stok, autentikasi pengguna, dan profil. Backend menggunakan Node.js dan MongoDB untuk operasi CRUD yang andal.',
            tech: ['Flutter', 'Node.js', 'MongoDB', 'Express'],
            link: 'https://github.com/Motherbloods/Apotek',
            demoLink: '#',
            image: '/api/placeholder/apotek.png',
            category: 'mobile',
            stars: 0,
            forks: 0
        },
        {
            id: 7,
            title: 'Flutter Ecommerce',
            description: 'Aplikasi belanja online berbasis Flutter dengan fitur lengkap dan backend Node.js.',
            longDescription: 'Aplikasi ini adalah platform e-commerce modern yang memungkinkan pengguna untuk berbelanja online, berkomunikasi dengan penjual secara real-time, serta mengelola profil mereka. Dibangun dengan Flutter untuk tampilan frontend dan Node.js sebagai backend, aplikasi ini mendukung pencarian dan penjelajahan produk, keranjang belanja, checkout, rekomendasi produk, dan sistem obrolan menggunakan Socket.IO. Redis digunakan untuk caching dan MongoDB sebagai database utama.',
            tech: ['Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Redis'],
            link: 'https://github.com/habibrk/flutter-ecommerce',
            demoLink: '#',
            image: '/api/placeholder/iriecommerce.png',
            category: 'mobile',
            stars: 0,
            forks: 0,
            featured: true
        }
        , {
            id: 8,
            title: 'Puskesmas Digital',
            description: 'Aplikasi manajemen Puskesmas berbasis web dengan fitur CRUD dan notifikasi real-time.',
            longDescription: 'Puskesmas Digital adalah sistem manajemen berbasis web yang dirancang untuk membantu staf Puskesmas dalam mengelola data pasien, jadwal dokter, riwayat pemeriksaan, dan antrian layanan. Aplikasi ini memiliki sistem autentikasi dengan peran Admin dan User, mendukung fitur CRUD lengkap, serta dilengkapi dengan notifikasi real-time menggunakan Pusher. Backend dibangun menggunakan Laravel dan database menggunakan MySQL.',
            tech: ['Laravel', 'MySQL', 'Pusher'],
            link: 'https://github.com/Motherbloods/Pukesmas-Crud-with-Pusher',
            demoLink: '#',
            image: '/api/placeholder/pukesmas.png',
            category: 'web',
            stars: 0,
            forks: 0
        }
        ,
        {
            id: 9,
            title: 'Imager Tagger',
            description: 'Aplikasi web untuk mengunggah gambar dan otomatis menambahkan cap waktu, lalu mengunduh hasilnya.',
            longDescription: 'Imager Tagger memungkinkan pengguna mengunggah satu atau banyak gambar sekaligus, kemudian secara otomatis menambahkan cap waktu pada setiap gambar menggunakan pemrosesan gambar dengan Jimp di backend Node.js. Untuk unggahan banyak gambar, aplikasi akan mengemas gambar hasil edit ke dalam file zip agar mudah diunduh. Cocok untuk pengelolaan media dan optimasi SEO gambar. Tampilan menggunakan EJS sebagai templating engine.',
            tech: ['Node.js', 'Express.js', 'Multer', 'Jimp', 'EJS', 'Archiver'],
            link: 'https://github.com/Motherbloods/Image-Tagger',
            demoLink: '#',
            image: '/api/placeholder/imagetagger.png',
            category: 'web',
            stars: 0,
            forks: 0
        }
    ];
    useResetScroll();

    useEffect(() => {
        filterProjects(selectedCategory);

        // Animasi saat komponen dimuat
        const timer = setTimeout(() => {
            document.querySelector('.projects-container').classList.add('fade-in');
        }, 300);

        return () => clearTimeout(timer);
    }, [selectedCategory]);

    const filterProjects = (category) => {
        if (category === 'all') {
            setVisibleProjects(projects);
        } else {
            setVisibleProjects(projects.filter(project => project.category === category));
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            <div className="min-h-screen px-6 py-20 text-[#4B5320]">
                <div className="max-w-6xl mx-auto">
                    {/* Header with animated elements */}
                    <div className="relative mb-16 text-center">
                        <motion.div
                            className="absolute top-10 left-20 w-24 h-24 rounded-full bg-[#67AE6E]/10 blur-md"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6 }}
                        ></motion.div>

                        <motion.div
                            className="absolute bottom-0 right-20 w-32 h-32 rounded-full bg-[#4B5320]/10 blur-md"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        ></motion.div>

                        <motion.h2
                            className="text-5xl font-bold mb-4 relative z-10"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            My <span className="text-[#67AE6E]">Projects</span>
                        </motion.h2>

                        <motion.p
                            className="text-xl text-[#4B5320]/80 max-w-2xl mx-auto"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Kumpulan project web, mobile, dan layanan backend yang telah saya kembangkan
                        </motion.p>

                        <motion.div
                            className="w-24 h-1.5 bg-[#67AE6E] mx-auto rounded-full mt-6"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 96, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        ></motion.div>
                    </div>

                    {/* Category Filter */}
                    <motion.div
                        className="flex flex-wrap justify-center mb-12 gap-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-[#67AE6E] text-white shadow-md'
                                    : 'bg-white text-[#4B5320] hover:bg-[#67AE6E]/10'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </motion.div>

                    {/* Featured Projects Section */}
                    {selectedCategory === 'all' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-16"
                        >
                            <h3 className="text-2xl font-bold mb-8 inline-flex items-center">
                                <Star className="mr-2 text-[#67AE6E]" size={20} />
                                Featured Projects
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {projects.filter(p => p.featured).map((project) => (
                                    <motion.div
                                        key={project.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-[#67AE6E]/20 hover:shadow-xl"
                                    >
                                        <div className="relative">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-52 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                                <span className="px-3 py-1 bg-[#67AE6E] text-white text-xs font-medium rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                            <p className="text-[#4B5320]/80 mb-4">{project.description}</p>

                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {project.tech.slice(0, 3).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-[#67AE6E]/15 text-sm rounded-lg font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 3 && (
                                                    <span className="px-2 py-1 bg-[#4B5320]/10 text-sm rounded-lg font-medium">
                                                        +{project.tech.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center">
                                                        <Star size={16} className="text-yellow-500 mr-1" />
                                                        <span className="text-sm font-medium">{project.stars}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Eye size={16} className="text-[#4B5320]/70 mr-1" />
                                                        <span className="text-sm">{project.forks}k</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-[#4B5320]/10 rounded-full hover:bg-[#4B5320]/20 transition-colors"
                                                        aria-label="GitHub Repository"
                                                    >
                                                        <Github size={18} />
                                                    </a>
                                                    <a
                                                        href={project.demoLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-[#67AE6E]/20 rounded-full hover:bg-[#67AE6E]/30 transition-colors"
                                                        aria-label="Live Demo"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* All Projects */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="projects-container opacity-0 transition-opacity duration-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {visibleProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className={`relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${showDetails === project.id ? 'ring-2 ring-[#67AE6E]' : 'border border-[#67AE6E]/20'
                                    }`}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-transparent to-transparent"></div>
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-white/80 backdrop-blur-sm text-[#4B5320] text-xs font-medium rounded-md">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                                    <p className="text-[#4B5320]/80 text-sm mb-4 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-[#67AE6E]/10 text-xs rounded-md font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="px-2 py-1 bg-[#4B5320]/10 text-xs rounded-md font-medium">
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => setShowDetails(showDetails === project.id ? null : project.id)}
                                                className="text-sm font-medium text-[#67AE6E] hover:text-[#4B5320] transition-colors flex items-center"
                                            >
                                                {showDetails === project.id ? 'Hide Details' : 'View Details'}
                                                <Code className="ml-1" size={14} />
                                            </button>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 bg-[#4B5320]/10 rounded-full hover:bg-[#4B5320]/20 transition-colors"
                                                aria-label="GitHub Repository"
                                            >
                                                <Github size={16} />
                                            </a>
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 bg-[#67AE6E]/15 rounded-full hover:bg-[#67AE6E]/30 transition-colors"
                                                aria-label="Live Demo"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    {showDetails === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 pt-4 border-t border-dashed border-[#67AE6E]/30"
                                        >
                                            <p className="text-sm text-[#4B5320]/90 mb-3">{project.longDescription}</p>
                                            <div className="flex justify-between items-center text-sm text-[#4B5320]/70">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center">
                                                        <Star size={14} className="text-yellow-500 mr-1" />
                                                        <span>{project.stars}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Eye size={14} className="mr-1" />
                                                        <span>{project.forks}k</span>
                                                    </div>
                                                </div>
                                                <span>Last updated: March 2025</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Empty state message */}
                    {visibleProjects.length === 0 && (
                        <div className="text-center py-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white p-8 rounded-xl shadow-md inline-block"
                            >
                                <p className="text-xl">No projects found in this category</p>
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className="mt-4 px-6 py-2 bg-[#67AE6E] text-white rounded-lg hover:bg-[#67AE6E]/90 transition-colors"
                                >
                                    View All Projects
                                </button>
                            </motion.div>
                        </div>
                    )}

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-24 text-center bg-gradient-to-r from-[#67AE6E]/20 to-[#4B5320]/20 p-12 rounded-2xl shadow-inner"
                    >
                        <h3 className="text-3xl font-bold mb-4">Have a project in mind?</h3>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            I'm always open to discussing new projects and creative ideas.
                            Let's create something amazing together!
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-3 bg-[#67AE6E] text-white rounded-lg hover:bg-[#4B5320] transition-colors shadow-md"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default Projects;