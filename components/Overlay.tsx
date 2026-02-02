import { useState } from 'react';
import { useTransform, motion, MotionValue, AnimatePresence } from 'framer-motion';
import { resumeData } from '@/data/resume';

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export function Overlay({ scrollYProgress }: OverlayProps) {
    // --- Scroll Transforms ---

    // 1. Hero: 0 - 0.15
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

    // 2. Summary & Skills: 0.15 - 0.35
    const aboutOpacity = useTransform(scrollYProgress, [0.12, 0.2, 0.3, 0.38], [0, 1, 1, 0]);
    const aboutY = useTransform(scrollYProgress, [0.12, 0.2, 0.3, 0.38], [100, 0, 0, -100]);
    const aboutScale = useTransform(scrollYProgress, [0.12, 0.2], [0.8, 1]);

    // 3. Experience: 0.35 - 0.6
    const expOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.53, 0.6], [0, 1, 1, 0]);
    const expX = useTransform(scrollYProgress, [0.35, 0.42, 0.53, 0.6], [-100, 0, 0, -100]);

    // 4. Achievements: 0.6 - 0.8
    const achOpacity = useTransform(scrollYProgress, [0.58, 0.65, 0.75, 0.82], [0, 1, 1, 0]);
    const achScale = useTransform(scrollYProgress, [0.58, 0.65], [0.8, 1]);
    const achY = useTransform(scrollYProgress, [0.58, 0.82], [50, -50]);

    // 5. Projects: 0.8 - 1.0
    const projOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
    const projY = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="absolute inset-0 z-50 h-full w-full pointer-events-none overflow-hidden">

            {/* --- CONTACT BUTTON --- */}
            <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] pointer-events-auto">
                <button
                    onClick={() => setIsContactOpen(true)}
                    className="group relative px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:scale-105 transition-all duration-300"
                >
                    <span className="relative z-10 text-white font-bold tracking-wide text-xs md:text-sm bg-gradient-to-r from-purple-300 to-orange-300 bg-clip-text text-transparent group-hover:text-white transition-colors">
                        Let's Collaborate
                    </span>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/20 to-orange-500/20 blur-md transition-opacity duration-300" />
                </button>
            </div>

            {/* --- CONTACT MODAL --- */}
            <AnimatePresence>
                {isContactOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setIsContactOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-md w-full p-8 rounded-3xl bg-[#121212]/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/30 rounded-full blur-3xl pointer-events-none" />

                            <h3 className="text-3xl font-bold text-white mb-2">Let's Connect</h3>
                            <p className="text-white/60 mb-8">I'm always open to discussing new projects, creative ideas within AI & Web3.</p>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 uppercase tracking-wider">Email</p>
                                        <a href="mailto:mdsakibsayyed@gmail.com" className="text-white font-mono hover:text-purple-300 transition-colors">
                                            mdsakibsayyed@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsContactOpen(false)}
                                className="mt-8 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/5"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 text-center"
            >
                <div className="backdrop-blur-[2px] p-4 md:p-6 rounded-3xl border border-white/5 bg-black/20 shadow-2xl w-full max-w-lg md:max-w-4xl">
                    <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-sm leading-tight">
                        {resumeData.profile.name}
                    </h1>
                    <h2 className="text-lg sm:text-xl md:text-3xl mt-2 md:mt-4 font-light tracking-widest uppercase text-purple-300">
                        {resumeData.profile.title}
                    </h2>
                    <p className="mt-2 text-white/60 font-mono text-xs md:text-sm">{resumeData.profile.subtitle}</p>
                </div>
            </motion.div>


            {/* --- ABOUT & SKILLS SECTION --- */}
            <motion.div
                style={{ opacity: aboutOpacity, y: aboutY, scale: aboutScale }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-20"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl w-full">

                    {/* Glass Card: Summary */}
                    <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                        <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-2 md:mb-4">About Me</h3>
                        <p className="text-sm md:text-lg leading-relaxed text-white/80 font-light">
                            {resumeData.profile.summary}
                        </p>
                    </div>

                    {/* Glass Card: Skills */}
                    <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                        <h3 className="text-xl md:text-2xl font-bold text-orange-300 mb-2 md:mb-4">Core Competencies</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(resumeData.skills).map(([category, skills]) => (
                                skills.map((skill) => (
                                    <span key={skill} className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm bg-white/10 border border-white/5 rounded-full text-white/90">
                                        {skill}
                                    </span>
                                ))
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>


            {/* --- EXPERIENCE SECTION --- */}
            <motion.div
                style={{ opacity: expOpacity, x: expX }}
                className="absolute inset-0 flex items-center justify-start p-4 md:p-20"
            >
                <div className="max-w-2xl w-full space-y-4 md:space-y-6">
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-8 pl-4 border-l-4 border-purple-500">
                        Experience
                    </h2>

                    {resumeData.experience.map((job, index) => (
                        <div key={index} className="p-4 md:p-6 rounded-2xl bg-black/40 border-l-2 border-white/20 backdrop-blur-sm hover:bg-black/60 transition-colors">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <h3 className="text-lg md:text-xl font-bold text-white">{job.role}</h3>
                                <span className="text-xs md:text-sm font-mono text-purple-300">{job.period}</span>
                            </div>
                            <p className="text-base md:text-lg text-white/60 mb-2 md:mb-4">{job.company}</p>
                            <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-white/50">
                                {job.highlights.slice(0, 2).map((pt, i) => (
                                    <li key={i} className="line-clamp-2 md:line-clamp-none">{pt}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>


            {/* --- ACHIEVEMENTS SECTION --- */}
            <motion.div
                style={{ opacity: achOpacity, y: achY, scale: achScale }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-20 pointer-events-none"
            >
                <div className="max-w-4xl w-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-center pointer-events-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mb-8">
                        Achievements
                    </h2>
                    <div className="space-y-4 md:space-y-6 text-left">
                        {resumeData.achievements && resumeData.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="mt-1 min-w-[24px] text-yellow-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-sm md:text-lg text-white/90 font-medium">{achievement}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* --- PROJECTS SECTION --- */}
            <motion.div
                style={{ opacity: projOpacity, y: projY }}
                className="absolute inset-0 flex items-center justify-center md:justify-end p-4 md:p-20 pointer-events-none"
            >
                <div className="max-w-2xl w-full text-left md:text-right pointer-events-auto max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-8 pl-4 border-l-4 md:pl-0 md:border-l-0 md:border-r-4 md:pr-4 border-orange-500 sticky top-0 bg-[#121212]/0 backdrop-blur-sm z-10">
                        Selected Works
                    </h2>

                    <div className="space-y-4 md:space-y-6">
                        {resumeData.projects.map((project, index) => (
                            <div key={index} className="group relative p-4 md:p-6 rounded-2xl bg-gradient-to-r md:bg-gradient-to-l from-white/10 to-transparent border-l-2 md:border-l-0 md:border-r-2 border-white/10 backdrop-blur-sm hover:border-orange-400 transition-all">
                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">{project.title}</h3>
                                <p className="text-xs md:text-sm font-mono text-purple-300 mb-2">{project.tech}</p>
                                <p className="text-xs md:text-sm text-white/60 line-clamp-3 md:line-clamp-none">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
