import { useState, useEffect } from "react";
import { ExternalLink, Github, Star, Code, Eye, Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useResetScroll from "../../hooks/useResetScroll";
import { containerVariants, itemVariants } from "../../utils/animationVariants";
import { Link } from "react-router-dom";
import useJsonData from "../../hooks/useJsonData";
import { DataLoading, DataError } from "../common/DataState";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDetails, setShowDetails] = useState(null);

  const { data, loading, error } = useJsonData("project");
  console.log("Project Data:", data); // Debugging line to check the fetched data
  const categories = data?.categories ?? ["all"];
  const projects = data?.projects ?? [];
  const visibleProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  useResetScroll();

  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      document.querySelector(".projects-container")?.classList.add("fade-in");
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, data]);

  if (loading) return <DataLoading />;
  if (error || !data)
    return (
      <DataError message="Data project tidak dapat dimuat. Coba muat ulang halaman." />
    );

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
              Kumpulan project web, mobile, dan layanan backend yang telah saya
              kembangkan
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
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#67AE6E] text-white shadow-md"
                    : "bg-white text-[#4B5320] hover:bg-[#67AE6E]/10"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Featured Projects Section */}
          {selectedCategory === "all" && (
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
                {projects
                  .filter((p) => p.featured)
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-[#67AE6E]/20 hover:shadow-xl"
                    >
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_DATA_BASE_URL}${project.image}`}
                          alt={project.title}
                          className="w-full h-52 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <span className="px-3 py-1 bg-[#67AE6E] text-white text-xs font-medium rounded-full capitalize">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-[#4B5320]/80 mb-4">
                          {project.description}
                        </p>

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
                              <Star
                                size={16}
                                className="text-yellow-500 mr-1"
                              />
                              <span className="text-sm font-medium">
                                {project.stars}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Eye
                                size={16}
                                className="text-[#4B5320]/70 mr-1"
                              />
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
                className={`relative bg-white rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition-[box-shadow,border-color] duration-300 ${
                  showDetails === project.id
                    ? "border-[#67AE6E]"
                    : "border-[#67AE6E]/20"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_DATA_BASE_URL}${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/80 backdrop-blur-sm text-[#4B5320] text-xs font-medium rounded-md capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[#4B5320]/80 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

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
                        onClick={() =>
                          setShowDetails(
                            showDetails === project.id ? null : project.id,
                          )
                        }
                        className="text-sm font-medium text-[#67AE6E] hover:text-[#4B5320] transition-colors flex items-center"
                      >
                        {showDetails === project.id
                          ? "Hide Details"
                          : "View Details"}
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

                  <AnimatePresence initial={false}>
                    {showDetails === project.id && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.3, ease: "easeInOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-dashed border-[#67AE6E]/30">
                          <p className="text-sm text-[#4B5320]/90 mb-3 text-justify">
                            {project.longDescription}
                          </p>
                          <div className="flex justify-between items-center text-sm text-[#4B5320]/70">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Star
                                  size={14}
                                  className="text-yellow-500 mr-1"
                                />
                                <span>{project.stars}</span>
                              </div>
                              <div className="flex items-center">
                                <Eye size={14} className="mr-1" />
                                <span>{project.forks}k</span>
                              </div>
                            </div>
                            <span>Last updated: {project.lastUpdated}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state message */}
          {selectedCategory === "networking" &&
            visibleProjects.length === 0 && (
              <div className="text-center py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-10 rounded-xl shadow-md inline-block max-w-md border border-[#67AE6E]/20"
                >
                  <Network className="mx-auto mb-4 text-[#67AE6E]" size={40} />
                  <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                  <p className="text-[#4B5320]/80">
                    Project networking sedang dipersiapkan dan akan segera hadir
                    di sini.
                  </p>
                </motion.div>
              </div>
            )}

          {selectedCategory !== "networking" &&
            visibleProjects.length === 0 && (
              <div className="text-center py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-xl shadow-md inline-block"
                >
                  <p className="text-xl">No projects found in this category</p>
                  <button
                    onClick={() => setSelectedCategory("all")}
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
