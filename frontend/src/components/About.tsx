'use client'

import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { Camera, Video, Award, Heart, Shield, ArrowRight } from 'lucide-react'
import { MarqueeText } from './MarqueeText'

// Images
import img4 from '../assets/_ALL1481-Edit.jpg'
import img6 from '../assets/arun4.png'

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
)

function PhilosophyCard({ icon: Icon, title, description, index }: any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-12 border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden min-h-[400px] flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110 group-hover:-rotate-12 origin-top-right">
        <Icon className="w-32 h-32 text-[#D4AF37] stroke-[0.5px]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className={`w-14 h-14 rounded-full border border-black/10 flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'text-[#D4AF37]'}`}>
            <span className="font-serif font-bold text-lg">0{index + 1}</span>
          </div>
          <motion.div
            animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="text-black" />
          </motion.div>
        </div>

        <h3 className="text-3xl font-serif text-black mb-6 group-hover:translate-x-2 transition-transform duration-500">{title}</h3>

        <div className="relative overflow-hidden">
          <p className="text-zinc-500 font-light leading-relaxed text-lg transition-all duration-500 group-hover:text-black">
            {description}
          </p>
          <motion.div
            className="h-1 w-12 bg-[#D4AF37] mt-6"
            animate={{ width: isHovered ? 80 : 48 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

function TeamMember({ name, role, image, index, className = "" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative ${className}`}
    >
      <div className="overflow-hidden aspect-[3/4] mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 cursor-none">
        <img src={image} alt={name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <div className="flex justify-between items-end border-b border-black/10 pb-4 group-hover:border-[#D4AF37] transition-colors duration-500">
        <div>
          <h4 className="text-2xl font-serif text-black mb-1 group-hover:text-[#D4AF37] transition-colors">{name}</h4>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">{role}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#D4AF37]">
          <ArrowRight size={20} className="-rotate-45" />
        </div>
      </div>
    </motion.div>
  )
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax Header
  const headerRef = useRef(null);
  const { scrollYProgress: headerScroll } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(headerScroll, [0, 1], ["0%", "40%"]);
  const headerScale = useTransform(headerScroll, [0, 1], [1.1, 1]);
  const textY = useTransform(headerScroll, [0, 0.5], [0, 100]);
  const textOpacity = useTransform(headerScroll, [0, 0.5], [1, 0]);

  // SEO
  if (typeof document !== 'undefined') {
    document.title = "The Studio | Arun Prasad"
  }

  return (
    <div ref={containerRef} className="bg-white text-black min-h-screen selection:bg-[#D4AF37] selection:text-white">

      {/* ================= HEADER - Cinematic ================= */}
      <section ref={headerRef} className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: headerY, scale: headerScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src="https://images.unsplash.com/photo-1605218427360-3639a04a5691?q=80&w=2070&auto=format&fit=crop"
            alt="Studio Environment"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center"
        >
          <div className="inline-flex items-center gap-4 mb-8 border border-white/20 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-white uppercase tracking-[0.2em] text-[10px] font-bold">Est. 2018 • Coimbatore</span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-serif font-medium uppercase tracking-tighter text-white mb-6 leading-[0.8] mix-blend-overlay">
            Visual<br />
            <span className="font-light italic text-[#D4AF37]">Alchemy</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl font-light text-zinc-100 leading-relaxed font-serif italic drop-shadow-lg">
            "We don't just capture moments; we architect memories."
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white animate-pulse">Scroll</span>
          <div className="w-[1px] h-16 bg-white" />
        </motion.div>
      </section>

      {/* ================= THE VISIONARY - Asymmetric Layout ================= */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-white">

        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">

            {/* Image Col */}
            <div className="lg:w-1/2 relative group">
              <div className="relative z-10 overflow-hidden transform transition-transform duration-1000 hover:scale-[1.02]">
                <img
                  src={img6}
                  alt="Arun Prasad"
                  className="w-full max-w-lg mx-auto transition-all duration-1000 ease-out shadow-2xl shadow-black/5"
                />
              </div>

              {/* Background Text Layer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-5">
                <span className="text-[15vw] font-serif font-black uppercase text-black leading-none">
                  Arun
                </span>
              </div>
            </div>

            {/* Content Col */}
            <div className="lg:w-1/2 pl-0 lg:pl-20">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[#D4AF37] font-bold text-6xl font-serif">"</span>
                  <div className="h-[1px] w-20 bg-black/10" />
                </div>

                <h2 className="text-4xl md:text-6xl font-serif text-black mb-10 leading-tight">
                  From Engineering <br />
                  <span className="text-zinc-400 italic">to Artistry.</span>
                </h2>

                <div className="space-y-8 text-lg text-zinc-600 font-light leading-relaxed mb-12 border-l border-black/10 pl-8">
                  <p>
                    Photography bridges gaps, freezes time, and holds onto feelings that words often fail to express. My journey wasn't born in a classroom, but in the quiet observation of the world around me.
                  </p>
                  <p>
                    Transitioning from the structured world of engineering to the fluid art of photography was a leap of faith. It was a move from logic to emotion. Today, Studio Arun stands at that intersection.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: "Founded", value: "2018" },
                    { label: "Weddings", value: "250+" },
                    { label: "Style", value: "Cinematic" },
                    { label: "Base", value: "Global" }
                  ].map((item, i) => (
                    <div key={i} className="border-t border-black/10 pt-4">
                      <h4 className="text-2xl font-serif text-black mb-1">{item.value}</h4>
                      <p className="text-[#D4AF37] text-xs uppercase tracking-widest">{item.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHILOSOPHY - Expanded Interaction ================= */}
      <section className="py-32 bg-zinc-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold block mb-4">Our DNA</span>
              <h2 className="text-5xl md:text-7xl font-serif text-black">The Code We <br /><span className="italic text-zinc-400">Live By</span></h2>
            </div>
            <p className="text-zinc-500 max-w-md text-right font-light leading-relaxed">
              Three pillars that define every frame we capture and every film we produce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PhilosophyCard
              index={0}
              icon={Heart}
              title="Authenticity"
              description="We reject the staged. We hunt for the raw, unscripted moments that genuinely reflect who you are."
            />
            <PhilosophyCard
              index={1}
              icon={Video}
              title="Cinematic"
              description="Your life is a movie. We film it with the same equipment and grading techniques used in cinema."
            />
            <PhilosophyCard
              index={2}
              icon={Shield}
              title="Legacy"
              description="We archive your memories with the highest fidelity, ensuring they survive generations."
            />
          </div>
        </div>
      </section>

      {/* ================= THE TEAM ================= */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-black mb-6">The Collective</h2>
            <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto" />
          </div>

          <div className="flex justify-center flex-wrap gap-8">
            <TeamMember name="Arun Prasad" role="Founder & Lead" image={img6} index={0} className="w-full max-w-sm" />
          </div>
        </div>
      </section>

      <MarqueeText />

      {/* ================= CTA ================= */}
      <section className="py-40 relative flex items-center justify-center overflow-hidden bg-white border-t border-zinc-100">
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="block text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-6">Ready to begin?</span>
          <h2 className="text-6xl md:text-9xl font-serif text-black mb-12 tracking-tighter">
            Create History
          </h2>
          <Link to="/contact">
            <button className="group relative px-16 py-6 border border-black text-black overflow-hidden transition-all duration-500 hover:bg-black hover:text-white">
              <span className="relative z-10 text-sm font-bold uppercase tracking-[0.3em] flex items-center gap-4">
                Start the Conversation <ArrowRight size={16} />
              </span>
            </button>
          </Link>
        </div>
      </section>

    </div>
  )
}