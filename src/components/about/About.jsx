import { motion } from "framer-motion";
import {
  Book,
  Briefcase,
  GraduationCap,
  User,
  Heart,
  Code,
  Coffee,
} from "lucide-react";
import useResetScroll from "../../hooks/useResetScroll";
import { containerVariants, itemVariants } from "../../utils/animationVariants";
import useJsonData from "../../hooks/useJsonData";
import { renderRichText } from "../../utils/RichText";
import { DataLoading, DataError } from "../common/DataState";

function About() {
  useResetScroll();
  const { data, loading, error } = useJsonData("about");

  if (loading) return <DataLoading />;
  if (error || !data)
    return (
      <DataError message="Data About tidak dapat dimuat. Coba muat ulang halaman." />
    );

  const { bio, passionPoints, funFacts, techStack, education, timeline } = data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="min-h-screen  text-[#4B5320] px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-20">
            <motion.div
              className="absolute top-0 left-0 w-20 h-20 rounded-full bg-[#67AE6E]/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>

            <motion.div
              className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-[#4B5320]/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>

            <motion.h1
              className="text-5xl font-bold text-center mb-5 relative z-10"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About <span className="text-[#67AE6E]">Me</span>
            </motion.h1>

            <motion.div
              className="w-20 h-1.5 bg-[#67AE6E] mx-auto rounded-full mb-10"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.div>
          </div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-5 gap-12"
          >
            {/* Left Column - Bio */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-md border border-[#67AE6E]/20"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#67AE6E]/10 rounded-xl mr-4">
                  <User size={24} className="text-[#67AE6E]" />
                </div>
                <h3 className="text-2xl font-bold">Who I Am</h3>
              </div>

              {bio.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-lg mb-5 leading-relaxed">
                  {renderRichText(paragraph)}
                </p>
              ))}

              <div className="mb-8">
                <h4 className="flex items-center text-xl font-semibold mb-4">
                  <Heart size={18} className="text-[#67AE6E] mr-2" />
                  Passion Points
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {passionPoints.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-[#67AE6E] rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="flex items-center text-xl font-semibold mb-4">
                  <Coffee size={18} className="text-[#67AE6E] mr-2" />
                  Fun Facts
                </h4>
                <ul className="space-y-2">
                  {funFacts.map((fact, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-[#67AE6E] rounded-full mr-3"></div>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Skills & Education */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-8"
            >
              {/* Skills */}
              <div className="bg-white p-8 rounded-2xl shadow-md border border-[#67AE6E]/20">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-[#67AE6E]/10 rounded-xl mr-4">
                    <Code size={24} className="text-[#67AE6E]" />
                  </div>
                  <h3 className="text-2xl font-bold">Tech Stack</h3>
                </div>

                <div className="space-y-6">
                  {techStack.map((group, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-[#4B5320] mb-2">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#67AE6E]/15 hover:bg-[#67AE6E]/25 rounded-md text-sm transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white p-8 rounded-2xl shadow-md border border-[#67AE6E]/20">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-[#67AE6E]/10 rounded-xl mr-4">
                    <GraduationCap size={24} className="text-[#67AE6E]" />
                  </div>
                  <h3 className="text-2xl font-bold">Education</h3>
                </div>

                <div className="space-y-5">
                  {education.map((edu, i) => (
                    <div key={i}>
                      <h4 className="font-semibold">{edu.name}</h4>
                      <p className="text-sm text-[#4B5320]/70">{edu.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline Experience */}
          <motion.section variants={itemVariants} className="mt-16">
            <div className="flex items-center justify-center mb-12">
              <div className="p-3 bg-[#67AE6E]/10 rounded-xl mr-4">
                <Briefcase size={24} className="text-[#67AE6E]" />
              </div>
              <h2 className="text-2xl font-bold">Professional Journey</h2>
            </div>

            <div className="relative pl-8 border-l-2 border-[#67AE6E]/30 space-y-12 ml-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                >
                  <div className="absolute -left-[41px] w-6 h-6 bg-white rounded-full border-2 border-[#67AE6E] z-10"></div>
                  <div className="absolute -left-[35px] w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#67AE6E] border-b-[8px] border-b-transparent mt-[2px]"></div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-[#67AE6E]/20">
                    <span className="inline-block px-3 py-1 bg-[#67AE6E]/10 text-[#67AE6E] text-sm font-medium rounded-md mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="text-[#4B5320]/70 font-medium mb-2">
                      {item.company}
                    </p>
                    <p className="text-[#4B5320]/90">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
