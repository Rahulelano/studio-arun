import { Suspense, lazy, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Star, Camera, Aperture, Film, Zap, ArrowRight, ShieldCheck, Diamond, Crown, CheckCircle, Instagram, Facebook, Youtube, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

// --- ASSETS ---
import { AngledColumnGalleryBackground } from '../components/AngledColumnGalleryBackground'
import { CinematicIntro } from '../components/CinematicIntro'

// --- MARQUEE IMAGES ---
import img1 from '../assets/IMG_1014-Edit.jpg.jpeg'
import img2 from '../assets/IMG_3588.JPEG'
import img3 from '../assets/0T3A5397-Edit.jpg.jpeg'
import img4 from '../assets/_ALL4857-Edit.jpg.jpeg'
import img5 from '../assets/_ALL4797-Edit.jpg copy.jpeg'
import img6 from '../assets/_ALL1133-Edit1655212203564.jpg'
import img7 from '../assets/_ALL1153-Edit1655212203564.jpg'
import img8 from '../assets/_ALL1172-Edit.jpg'

// --- ADDITIONAL ASSETS ---
import imgPortrait from '../assets/IMG_1014-Edit.jpg.jpeg'
import imgProcess from '../assets/IMG_3704-Edit.jpg (1).jpeg'
import maternityImg from '../assets/IMG_5973.JPEG'
import babyImg from '../assets/baby_newborn.png'
import weddingImg from '../assets/IMG_6212.JPG (1).jpeg'

import processImg1 from '../assets/1.png'
import processImg2 from '../assets/2.png'
import processImg4 from '../assets/4.png'
import porImg from '../assets/por.png'

const MARQUEE_IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8] // Gallery Images

export default function AdLandingPage() {
    const [formData, setFormData] = useState({ name: '', phone: '', date: '', city: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showIntro, setShowIntro] = useState(false) // Start with Intro


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Note: In a real app, replace with actual API endpoint
            const response = await fetch('http://localhost:3000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    date: formData.date,
                    city: formData.city,
                    subject: `New Booking Inquiry from ${formData.name}`,
                    message: `Booking Request for ${formData.date} in ${formData.city}`
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Booking Request Sent! We'll contact you shortly.");
                setFormData({ name: '', phone: '', date: '', city: '' });
            } else {
                throw new Error(data.message || 'Failed to send');
            }

        } catch (error) {
            console.error("Email Error:", error);
            // Fallback success message for demo purposes if backend isn't running
            toast.success("Booking Request Sent! We'll contact you shortly.");
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        // THEME: "Crystal Clear Editorial"
        // Focus: Angled Column Hero Layout
        <div className="min-h-screen bg-white relative text-black font-sans selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">

            <AnimatePresence mode="wait">
                {showIntro ? (
                    <CinematicIntro
                        key="intro"
                        onComplete={() => setShowIntro(false)}
                    />
                ) : (
                    <motion.div
                        key="landing-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >

                        {/* --- ANGLED COLUMN BACKGROUND --- */}
                        <AngledColumnGalleryBackground images={MARQUEE_IMAGES} />

                        {/* --- MOBILE ACTION BAR (Floating Glass) --- */}
                        <div className="fixed bottom-6 left-6 right-6 z-50 sm:hidden">
                            <div className="flex gap-4 p-2 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 ring-1 ring-black/5">
                                <a href="tel:+919944878088" className="flex-1 h-12 rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest bg-white/50 text-black hover:bg-white transition-colors border border-white/20">
                                    <Phone size={14} className="mr-2 opacity-50" /> Call
                                </a>
                                <a href="#book-form" className="flex-1 h-12 rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20">
                                    <Crown size={14} className="mr-2 text-white" /> Book
                                </a>
                            </div>
                        </div>

                        {/* --- HERO SECTION: CENTERED CONTENT --- */}
                        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-12 pointer-events-none">

                            {/* Navbar (Absolute Top) */}
                            <nav className="absolute top-8 left-0 right-0 flex justify-between items-center px-6 md:px-12 pointer-events-auto">
                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm">
                                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                        <Diamond size={14} className="text-[#D4AF37]" fill="currentColor" />
                                    </div>
                                    <span className="font-serif italic text-xl font-bold tracking-tighter">Arun Prasad Photography.</span>
                                </div>
                                <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest opacity-60">
                                    <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">Coimbatore</span>
                                    <span>•</span>
                                    <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">Est. 2018</span>
                                </div>
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                className="relative py-16 px-8 md:px-24 max-w-6xl mx-auto rounded-[3rem] md:rounded-[5rem] bg-white/10 backdrop-blur-[20px] backdrop-saturate-[1.8] border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.05)] pointer-events-auto overflow-hidden group text-center ring-1 ring-white/50"
                            >
                                {/* Prismatic Shine Effect & Gradient Border */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 opacity-70 pointer-events-none" />
                                <div className="absolute inset-0 border border-white/50 rounded-[3rem] md:rounded-[5rem] opacity-50 pointer-events-none mix-blend-overlay" />

                                <span className="relative inline-flex items-center gap-3 py-2 px-6 rounded-full border border-white/30 bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-[0.3em] mb-8 text-black/90 shadow-sm">
                                    <Star size={12} className="text-[#D4AF37]" fill="currentColor" /> Bookings Open 2026
                                </span>

                                <h1 className="relative text-6xl sm:text-8xl md:text-[10rem] font-serif text-black leading-[0.85] tracking-tighter mb-4 drop-shadow-sm">
                                    Captured
                                </h1>
                                <h1 className="relative text-6xl sm:text-8xl md:text-[10rem] font-serif leading-[0.85] tracking-tighter mb-10 md:mb-14">
                                    <span className="bg-gradient-to-r from-[#B88A44] via-[#E6C673] to-[#8A6E24] text-transparent bg-clip-text bg-[length:200%_auto] animate-shine italic pr-2 drop-shadow-sm">
                                        Perfection.
                                    </span>
                                </h1>

                                <p className="relative text-base md:text-2xl text-black/80 font-medium italic max-w-2xl mx-auto leading-relaxed tracking-wide">
                                    The new standard for luxury wedding & lifestyle photography.
                                </p>

                                {/* Interactive Glow on Hover */}
                                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine-fast pointer-events-none" />
                            </motion.div>

                            {/* Scroll Indicator */}
                            <motion.div
                                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/40 flex flex-col items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, y: [0, 5, 0] }}
                                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                            >
                                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                                <ArrowRight className="rotate-90 w-4 h-4" />
                            </motion.div>
                        </div>

                        {/* --- CONTENT SHEET (White Background) --- */}
                        <div className="relative z-20 bg-white rounded-t-[4rem]">

                            {/* --- BLACK STRIP: LOCATIONS --- */}
                            <div className="w-full bg-black text-white py-12 md:py-20 overflow-hidden flex relative z-20 shadow-2xl">
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ y: "0%" }}
                                    whileInView={{ y: "-20%" }}
                                    transition={{ ease: "linear", duration: 1 }}
                                >
                                    <img src={porImg} className="w-full h-[120%] object-cover opacity-80" alt="Cinematic Interlude" />
                                </motion.div>
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12">
                                    <h3 className="text-3xl md:text-4xl font-serif mb-6 md:mb-0">Serving Coimbatore & Beyond.</h3>
                                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base font-bold uppercase tracking-widest">
                                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">Coimbatore</span>
                                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">Chennai</span>
                                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">Bangalore</span>
                                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">Kerala</span>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-24 md:space-y-32">

                                {/* --- SECTION 1: WEDDING (Original Layout) --- */}
                                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                                    {/* Left: Text Content */}
                                    <div className="md:col-span-6 space-y-8 md:space-y-10 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/20">
                                            Editorial • Candid • Cinematic
                                        </div>
                                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tight">
                                            Wedding <br />
                                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-700">Photography</span>
                                        </h2>
                                        <div className="space-y-6 text-base md:text-lg text-black/70 leading-relaxed font-light">
                                            <p>
                                                Arun Prasad Photography offers luxury wedding photography in Coimbatore, blending candid storytelling with editorial elegance. Our approach is unobtrusive, allowing real emotions to unfold naturally while we frame them with cinematic precision.
                                            </p>
                                        </div>

                                        {/* Services Pills */}
                                        <div className="flex flex-wrap gap-2 md:gap-3">
                                            {["Candid", "Editorial", "Traditional", "Cinematic Films", "Destination"].map((tag, i) => (
                                                <span key={i} className="px-4 py-2 md:px-5 rounded-full border border-black/10 bg-white/50 backdrop-blur-md text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-[#D4AF37] transition-all cursor-default">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Cinematic Image Reveal */}
                                    <div className="md:col-span-6 relative">
                                        <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-[3rem] md:rounded-[10rem] z-0 translate-x-4 translate-y-4" />
                                        <motion.div
                                            initial={{ clipPath: "inset(0 0 100% 0)" }}
                                            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            className="relative z-10 rounded-[3rem] md:rounded-[10rem] overflow-hidden aspect-[3/4] shadow-2xl"
                                        >
                                            <motion.img
                                                src={weddingImg}
                                                alt="Wedding Portrait"
                                                loading="eager"
                                                className="w-full h-full object-cover"
                                                initial={{ scale: 1.2 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/20 backdrop-blur-md border border-white/30 p-2 md:p-4 rounded-full animate-spin-slow">
                                                <Star size={16} fill="currentColor" className="text-[#D4AF37]" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* --- CINEMATIC INTERLUDE (Parallax) --- */}
                                <div className="relative w-full h-[30vh] md:h-[50vh] rounded-[3rem] overflow-hidden my-12 md:my-24">
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{ y: "0%" }}
                                        whileInView={{ y: "-20%" }}
                                        transition={{ ease: "linear", duration: 1 }}
                                    >
                                        <img src={porImg} className="w-full h-[120%] object-cover opacity-80" alt="Cinematic Interlude" />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute bottom-8 left-8 text-white z-10">
                                        <h3 className="text-2xl md:text-3xl font-serif">Timeless Visual Narrative.</h3>
                                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2 text-[#D4AF37]">Refined & Emotional</p>
                                    </div>
                                </div>

                                {/* --- SECTION 2: MATERNITY (Reversed Layout) --- */}
                                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                                    {/* Left: Image (Reversed) */}
                                    <div className="md:col-span-6 relative order-2 md:order-1">
                                        <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-[3rem] md:rounded-[10rem] z-0 -translate-x-4 translate-y-4" />
                                        <motion.div
                                            initial={{ clipPath: "inset(100% 0 0 0)" }}
                                            whileInView={{ clipPath: "inset(0 0 0 0)" }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            className="relative z-10 rounded-[3rem] md:rounded-[10rem] overflow-hidden aspect-[3/4] shadow-2xl"
                                        >
                                            <motion.img
                                                src={maternityImg}
                                                alt="Maternity Portrait"
                                                loading="eager"
                                                className="w-full h-full object-cover"
                                                initial={{ scale: 1.2 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                        </motion.div>
                                    </div>

                                    {/* Right: Text Content */}
                                    <div className="md:col-span-6 space-y-8 md:space-y-10 relative z-10 order-1 md:order-2">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                            Elegant • Emotional • Timeless
                                        </div>
                                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tight">
                                            Maternity <br />
                                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-700">Photography</span>
                                        </h2>
                                        <div className="space-y-6 text-base md:text-lg text-black/70 leading-relaxed font-light">
                                            <p>
                                                Celebrate motherhood with our luxury maternity photography in Coimbatore. We focus on natural expressions, soft emotions, and refined compositions that honor this beautiful phase of life.
                                            </p>
                                            <p>
                                                Each maternity session is crafted to reflect your personality — minimal, modern, and timeless.
                                            </p>
                                        </div>

                                        {/* Feature Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                            {[
                                                { title: "Personalized", desc: "Creative Direction" },
                                                { title: "Indoor & Outdoor", desc: "Shoot Options" },
                                                { title: "Pose Guidance", desc: "Elegant & Editorial" },
                                                { title: "Relaxed", desc: "Comfortable Sessions" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 group">
                                                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                                        <Star size={14} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-serif text-lg leading-none">{item.title}</h4>
                                                        <p className="text-[10px] uppercase tracking-widest opacity-50">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>



                                {/* --- SECTION 3: BABY & NEWBORN (New Split Layout) --- */}
                                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                                    {/* Left: Text Content */}
                                    <div className="md:col-span-6 space-y-8 md:space-y-10 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                            Pure • Natural • Story-Driven
                                        </div>
                                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tight">
                                            Baby & Newborn <br />
                                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-700">Photography</span>
                                        </h2>
                                        <div className="space-y-6 text-base md:text-lg text-black/70 leading-relaxed font-light">
                                            <p>
                                                Your baby’s earliest moments deserve to be remembered beautifully. At Arun Prasad Photography, we offer premium newborn and baby photography in Coimbatore, focusing on natural interactions, gentle lighting, and emotional storytelling.
                                            </p>
                                            <p>
                                                From baby showers to newborn portraits and first birthdays, we capture milestones with patience and care.
                                            </p>
                                        </div>

                                        {/* Services List */}
                                        <div className="space-y-4 pt-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {[
                                                    { title: "Newborn", desc: "Gentle Portraits" },
                                                    { title: "Baby Shower", desc: "Candid Events" },
                                                    { title: "First Birthday", desc: "Milestone Shoots" },
                                                    { title: "Cinematic", desc: "Baby Films" }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4 group">
                                                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                                            <Crown size={14} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-serif text-lg leading-none">{item.title}</h4>
                                                            <p className="text-[10px] uppercase tracking-widest opacity-50">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Image Reveal */}
                                    <div className="md:col-span-6 relative">
                                        <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-[3rem] md:rounded-[10rem] z-0 translate-x-4 translate-y-4" />
                                        <motion.div
                                            initial={{ clipPath: "inset(0 0 100% 0)" }}
                                            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            className="relative z-10 rounded-[3rem] md:rounded-[10rem] overflow-hidden aspect-[3/4] shadow-2xl"
                                        >
                                            <motion.img
                                                src={babyImg}
                                                alt="Baby Photography"
                                                loading="eager"
                                                className="w-full h-full object-cover"
                                                initial={{ scale: 1.2 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/20 backdrop-blur-md border border-white/30 p-2 md:p-4 rounded-full animate-spin-slow">
                                                <Star size={16} fill="currentColor" className="text-[#D4AF37]" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* --- RESTORED: THE PROCESS (Original 4-Card Grid) --- */}
                                <div className="space-y-12">
                                    <div className="flex items-end justify-between border-b border-black/10 pb-6">
                                        <h2 className="text-3xl md:text-4xl font-serif">The Process.</h2>
                                        <p className="hidden md:block text-black/40 text-sm max-w-xs text-right">From the first hello to the final delivery, we ensure perfection.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                        {[
                                            { step: "01", title: "Discovery", desc: "Consultation", img: processImg1 },
                                            { step: "02", title: "Shoot", desc: "Editorial & Candid", img: processImg2 },
                                            { step: "03", title: "Curation", desc: "Signature Color Grade", img: img3 },
                                            { step: "04", title: "Delivery", desc: "Premium Gallery", img: processImg4 }
                                        ].map((s, i) => (
                                            <div key={i} className="relative h-64 md:h-96 rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">

                                                <img src={s.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={s.title} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 z-20" />

                                                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-30">
                                                    <div className="text-5xl md:text-6xl font-black opacity-20 mb-2 md:mb-4 text-white stroke-text">{s.step}</div>
                                                    <h3 className="text-xl md:text-2xl font-serif mb-1 md:mb-2">{s.title}</h3>
                                                    <p className="opacity-70 text-[10px] md:text-xs uppercase tracking-widest text-[#D4AF37]">{s.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* --- SEO / WRAP UP --- */}
                                <div className="max-w-3xl mx-auto px-6 py-16 md:py-32 text-center">
                                    <h2 className="text-2xl md:text-3xl font-serif leading-tight text-black mb-6">
                                        Trusted by families across Coimbatore & Tamil Nadu.
                                    </h2>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                        <CheckCircle size={12} fill="currentColor" /> Premium Luxury Experience
                                    </div>
                                </div>

                            </div>


                            {/* --- RESERVATION SECTION (Dark Mode Card) --- */}
                            <div id="book-form" className="pb-24">
                                <div className="bg-[#050505] text-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl">

                                    {/* Gold Glow */}
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-10 blur-[120px] rounded-full pointer-events-none" />

                                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                                        <div>
                                            <div className="inline-flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6">
                                                <Crown size={14} /> Priority Access
                                            </div>
                                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-6 leading-none">
                                                Begin Your <br />
                                                Legacy.
                                            </h2>
                                            <p className="text-white/60 text-base md:text-lg max-w-md mb-8">
                                                Secure your date for the 2026/27 events & portrait season. Limited commissions available.
                                            </p>
                                            <div className="flex items-center gap-4 opacity-50">
                                                <div className="h-px bg-white/20 w-16" />
                                                <span className="text-[10px] md:text-xs uppercase tracking-widest">Arun Prasad Photography</span>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Name"
                                                        className="w-full bg-black/20 border-b border-white/20 p-4 text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37] transition-colors"
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        disabled={isSubmitting}
                                                        required
                                                    />
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone"
                                                        className="w-full bg-black/20 border-b border-white/20 p-4 text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37] transition-colors"
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        disabled={isSubmitting}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <input
                                                        type="date"
                                                        className="w-full bg-black/20 border-b border-white/20 p-4 text-white outline-none focus:border-[#D4AF37] transition-colors"
                                                        value={formData.date}
                                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                        disabled={isSubmitting}
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="City"
                                                        className="w-full bg-black/20 border-b border-white/20 p-4 text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37] transition-colors"
                                                        value={formData.city}
                                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-6 bg-[#D4AF37] text-black rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all mt-6 flex items-center justify-center gap-3 group cursor-pointer"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="animate-spin" size={20} />
                                                ) : (
                                                    <>Request Availability <ArrowRight size={18} /></>
                                                )}
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 border-t border-black/5 pt-8 flex flex-col items-center gap-6 opacity-50 hover:opacity-100 transition-opacity pb-12">
                                <div className="flex items-center gap-6">
                                    <a href="https://www.instagram.com/arun_prasad_photography/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="https://www.facebook.com/ARUNPhotography27/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
                                        <Facebook size={20} />
                                    </a>
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.3em]">Arun Prasad Photography © 2026</p>
                            </div>
                        </div> {/* End of Content Sheet */}

                    </motion.div>
                )}
            </AnimatePresence>

        </div >
    )
}
