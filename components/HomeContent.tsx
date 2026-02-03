import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Globe, Star, Play, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { Navbar } from './Navbar'

// Images
import heroImg from '../assets/_ALL1133-Edit1655212203564.jpg'
import weddingImg from '../assets/IMG_6212.JPG (1).jpeg'
import one from '../assets/_ALL4857-Edit.jpg.jpeg'
import two from '../assets/baby_newborn.png'
import maternityImg from '../assets/IMG_5973.JPEG'
import imgBg from '../assets/_ALL4857-Edit.jpg.jpeg'

// --- COMPONENTS ---

// 1. Preloader Overlay
function Preloader({ onComplete }: { onComplete: () => void }) {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 2.5 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-[100] bg-[#1a1a1a] flex items-center justify-center text-[#D4AF37]"
        >
            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="text-[12vw] font-serif leading-none tracking-tighter text-center"
                >
                    ARUN PRASAD
                </motion.h1>
            </div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute bottom-10 left-0 h-[2px] bg-[#D4AF37]"
            />
        </motion.div>
    )
}


// 3. Horizontal Accordion Services (White Theme)
function ServiceAccordion({ items }: { items: { title: string, category: string, img: string }[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="px-6 md:px-12 overflow-hidden flex flex-col justify-center">
            <div className="mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Our Expertise</span>
            </div>
            <div className="flex flex-col md:flex-row gap-2 h-[80vh] w-full">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className="relative overflow-hidden cursor-pointer rounded-2xl bg-white border border-black/5"
                        animate={{ flex: activeIndex === i ? 3 : 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        onHoverStart={() => setActiveIndex(i)}
                        onClick={() => setActiveIndex(i)}
                    >
                        {/* Background Image - Only visible when active or dimmed when inactive */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            animate={{ opacity: 1, scale: activeIndex === i ? 1 : 1.2 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={item.img} className="w-full h-full object-cover transition-all duration-700" alt={item.title} />
                        </motion.div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white shadow-[inset_0_-100px_100px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-mono border border-white/50 rounded-full w-8 h-8 flex items-center justify-center pt-1 shadow-sm">0{i + 1}</span>
                                <ArrowUpRight className={`w-6 h-6 text-[#D4AF37] transition-opacity duration-300 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`} />
                            </div>

                            {/* Vertical Text for inactive, Horizontal for active */}
                            <div className="relative">
                                {activeIndex !== i && (
                                    <div className="absolute bottom-0 left-0 origin-bottom-left -rotate-90 translate-x-8 w-[300px]">
                                        <h3 className="text-2xl font-serif whitespace-nowrap opacity-90 drop-shadow-md">{item.title}</h3>
                                    </div>
                                )}

                                <motion.div
                                    animate={{ opacity: activeIndex === i ? 1 : 0, y: activeIndex === i ? 0 : 20 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-4xl md:text-6xl font-serif leading-none">{item.title}</h3>
                                    <p className="max-w-md text-sm opacity-80 font-light hidden md:block">
                                        Providing extensive {item.category} services with a touch of modern luxury and timeless elegance.
                                    </p>
                                    <Link
                                        to={`/gallery?category=${item.title === 'Weddings' ? 'Wedding' : item.title}`}
                                        className="inline-block text-[#D4AF37] uppercase tracking-widest text-[10px] border-b border-[#D4AF37] pb-1 hover:text-black hover:border-black transition-colors"
                                    >
                                        View Gallery
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}


// 4. Horizontal Gallery Slider (Snap Scroll) - Replaces FilmStrip
function FilmStripGallery() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-32 bg-white border-t border-zinc-100 overflow-hidden">
            <div className="px-6 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <span className="block text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-4">Selected Works</span>
                    <h2 className="text-5xl md:text-8xl font-serif text-black leading-[0.9]">
                        Visual <span className="italic text-zinc-400">Diary</span>
                    </h2>
                </div>
                <div className="hidden md:flex gap-4">
                    <button
                        onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                        className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                        onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                        className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-6 md:gap-12 overflow-x-auto pb-12 px-6 md:px-12 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {[one, heroImg, weddingImg, two, maternityImg, imgBg, one].map((img, i) => (
                    <motion.div
                        key={i}
                        className="relative flex-shrink-0 w-[85vw] md:w-[450px] aspect-[3/4] snap-center group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        viewport={{ margin: "-50px" }}
                    >
                        <div className="w-full h-full overflow-hidden relative bg-zinc-100 shadow-sm">
                            <img
                                src={img}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                alt="Gallery"
                            />
                            {/* Overlay info */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="text-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-xs uppercase tracking-widest block mb-2">Project 0{i + 1}</span>
                                    <h3 className="text-2xl font-serif italic">View Shoot</h3>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center text-black">
                            <h3 className="text-lg font-serif">Eternal Sunshine</h3>
                            <span className="text-xs text-zinc-400 font-mono">202{i}</span>
                        </div>
                    </motion.div>
                ))}

                {/* View All Link Card */}
                <div className="flex-shrink-0 w-[85vw] md:w-[300px] aspect-[3/4] snap-center flex items-center justify-center bg-zinc-50 border border-zinc-100">
                    <Link to="/gallery" className="group flex flex-col items-center gap-6 text-black">
                        <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em]">View Full Archive</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

// 5. Text Reveal Philosophy
function TextReveal() {
    return (
        <section className="py-10 md:py-40 px-6 bg-white text-black/20">
            <div className="max-w-[90vw] mx-auto text-center">
                <p className="text-4xl md:text-7xl font-serif leading-tight">
                    {"We curate visual legacies for those who seek depth over trends. Capturing silence in a world of noise.".split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            className="inline-block mr-2 md:mr-4 text-zinc-200"
                            whileInView={{ color: "#000000" }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </p>
            </div>
        </section>
    )
}

// 6. Video Showcase Section (Premium)
function VideoShowcase() {
    const videos = [
        "AetzS6jBOXw", // Video 1
        "UNhyr1Hm0Yw", // Video 3
        "r7S1Igco0PI", // Video 4
        "hrpAoGekdaM", // Video 5
        "AetzS6jBOXw"  // Video 2 (Duplicate as requested/provided)
    ];

    return (
        <section className="py-24 bg-black text-white overflow-hidden">
            <div className="px-6 md:px-12 mb-12 flex items-end justify-between">
                <div>
                    <span className="block text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-4">Motion Portfolio</span>
                    <h2 className="text-4xl md:text-7xl font-serif">
                        Cinematic <span className="italic text-zinc-500">Shorts</span>
                    </h2>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">Experience the Emotion</p>
                </div>
            </div>

            <div className="flex gap-6 md:gap-8 overflow-x-auto pb-12 px-6 md:px-12 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {videos.map((id, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-[85vw] md:w-[400px] aspect-[9/16] snap-center relative rounded-sm overflow-hidden border border-white/10 group"
                    >
                        <iframe
                            className="w-full h-full object-cover pointer-events-none"
                            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`}
                            title="Cinematic Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{ border: 0 }}
                        />
                        {/* Overlay to prevent interaction and keep it atmospheric */}
                        <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors pointer-events-none" />

                        <div className="absolute bottom-6 left-6 z-10">
                            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Play size={12} fill="white" className="text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// 7. Signature / About Section
function SignatureSection() {
    return (
        <section className="py-24 md:py-40 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden"
                >
                    <img src={one} className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-1000" alt="Arun Prasad" />
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-4">
                        <span className="block text-xs font-mono uppercase tracking-widest text-black">Arun Prasad</span>
                        <span className="text-xs text-zinc-500">Lead Photographer</span>
                    </div>
                </motion.div>

                <div className="space-y-8 md:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] text-black">
                            "I don't just take photos; I preserve <span className="italic text-zinc-400">feelings</span>."
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md font-light"
                    >
                        With over 8 years of experience documenting love stories across the globe, my approach is rooted in quiet observation. I seek the in-between moments—the glances, the touches, the unscripted laughter—that truly define your connection.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="opacity-50"
                    >
                        <div className="text-4xl font-serif italic text-black">Arun Prasad</div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// 7. Testimonials / Reviews
function ReviewSection() {
    return (
        <section className="py-24 bg-zinc-50 overflow-hidden">
            <div className="px-6 mb-12 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-black/20" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Kind Words</span>
            </div>

            <div className="flex gap-8 md:gap-16 overflow-x-auto pb-12 px-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[
                    { text: "The photos feel like stills from a movie. Absolutely timeless and breathtaking.", author: "Sarah & James", loc: "London, UK" },
                    { text: "Arun captured moments we didn't even know existed. Pure magic from start to finish.", author: "Priya & Rahul", loc: "Chennai, India" },
                    { text: "Not just a photographer, but an artist who understands light and emotion perfectly.", author: "Elena & Marc", loc: "Paris, France" }
                ].map((review, i) => (
                    <motion.div
                        key={i}
                        className="min-w-[85vw] md:min-w-[600px] snap-center p-8 md:p-12 bg-white border border-zinc-100 shadow-sm flex flex-col justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        viewport={{ margin: "-50px" }}
                    >
                        <div>
                            <div className="flex gap-1 mb-8">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />)}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-serif leading-snug text-black italic">"{review.text}"</h3>
                        </div>
                        <div className="mt-8 pt-8 border-t border-zinc-50">
                            <span className="block text-sm font-bold uppercase tracking-widest text-black">{review.author}</span>
                            <span className="text-xs text-zinc-400 font-mono mt-1 block">{review.loc}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export function HomeContent() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Zoom out hero effect (Keep exactly as user requested)
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1.1, 1]);

    // Background color animation (Kept White for consistent theme)
    const bgColor = useTransform(scrollYProgress, [0, 0.2], ["#ffffff", "#ffffff"]);

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor: bgColor }}
            className="w-full min-h-screen text-white transition-colors duration-1000"
        >
            <Preloader onComplete={() => setLoading(false)} />

            <Navbar transparent />

            {/* --- HERO: Sticky Full Image Zoom Out (White Theme) --- */}
            <section className="relative h-[120vh] md:h-[250vh]">
                <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center overflow-hidden bg-white">

                    {/* Dynamic Image Container */}
                    <motion.div
                        style={{
                            width: useTransform(scrollYProgress, [0, 0.25], ["100%", "90%"]),
                            height: useTransform(scrollYProgress, [0, 0.25], ["100%", "85%"]),
                            borderRadius: useTransform(scrollYProgress, [0, 0.25], ["0px", "40px"]),
                            y: useTransform(scrollYProgress, [0, 0.25], ["0%", "5%"]),
                        }}
                        className="relative z-0 shadow-2xl overflow-hidden will-change-transform"
                    >
                        <img
                            src={heroImg}
                            className="w-full h-full object-cover"
                            alt="Hero"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* Floating Scroll Label */}
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                            className="absolute bottom-10 left-10 text-white flex items-center gap-4 z-20"
                        >
                            <div className="h-[1px] w-12 bg-white/50" />
                            <span className="text-xs font-mono uppercase tracking-widest">Scroll to Explore</span>
                        </motion.div>
                    </motion.div>

                    {/* Hero Text Overlay (Centered) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none text-white mix-blend-difference">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.5em] mb-6"
                        >
                            Est. 2018
                        </motion.h2>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-[14vw] md:text-[10vw] font-serif leading-none tracking-tighter text-center"
                        >
                            TIMELESS
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-6 text-sm md:text-lg font-serif italic tracking-wide opacity-80"
                        >
                            Capturing Life's Greatest Moments
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* --- PHILOSOPHY: White Theme Text Reveal --- */}
            <section className="py-10 md:py-40 px-6 bg-white text-black/20">
                <div className="max-w-[90vw] mx-auto text-center">
                    <p className="text-4xl md:text-7xl font-serif leading-tight">
                        {"We curate visual legacies for those who seek depth over trends. Capturing silence in a world of noise.".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-2 md:mr-4 text-zinc-200"
                                whileInView={{ color: "#000000" }}
                                viewport={{ margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
                </div>
            </section>

            {/* --- SERVICES: Light Theme Accordion --- */}
            <div className="bg-zinc-50 py-24 text-black">
                <ServiceAccordion items={[
                    { title: "Weddings", category: "Documentation", img: weddingImg },
                    { title: "Maternity", category: "Portrait", img: maternityImg },
                    { title: "Fashion", category: "Campaign", img: heroImg },
                    { title: "Films", category: "Motion", img: imgBg }
                ]} />
            </div>

            {/* --- GALLERY: Film Strip --- */}
            <FilmStripGallery />

            {/* --- NEW SECTIONS: Signature & Reviews --- */}
            <VideoShowcase />
            <SignatureSection />
            <ReviewSection />

            {/* --- FOOTER: Simple Contact --- */}
            <div className="py-24 bg-white text-center text-zinc-400 text-xs uppercase tracking-widest border-t border-zinc-100">
                <div className="mb-12">
                    <Link to="/contact" className="inline-block px-10 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-300">
                        Book Your Session
                    </Link>
                </div>
                <p>&copy; 2026 Arun Prasad Studio. All Rights Reserved.</p>
            </div>
        </motion.div>
    )
}
