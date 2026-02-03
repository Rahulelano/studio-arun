'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import maternityImg from '../assets/IMG_5973.JPEG'
import babyImg from '../assets/baby_newborn.png'
import weddingImg from '../assets/IMG_6212.JPG (1).jpeg'

// Images (Unsplash High Quality)
const services = [
  {
    id: '01',
    title: "The Wedding",
    category: "Signature Service",
    description: "Capturing the grandeur of your union with cinematic precision. We focus on the rituals, the tears, and the unbridled joy of your special day.",
    img: weddingImg,
    checkpoints: ["Dual Photographer Coverage", "Drone Cinematography", "Same-Day Edits", "Luxury Album"],
    color: "#D4AF37"
  },
  {
    id: '02',
    title: "The Film",
    category: "Cinematography",
    description: "A 4K cinematic masterpiece of your wedding. Drone shots, professional grading, and sound design that rivals feature films.",
    img: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop",
    checkpoints: ["4K Resolution", "Professional Color Grading", "Licensed Music", "Teaser + Feature Film"],
    color: "#C0C0C0"
  },
  {
    id: '03',
    title: "Couple Portrait",
    category: "High Fashion",
    description: "Editorial-style portraits that look like they belong in Vogue. We scout locations and direct you to look your absolute best.",
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80",
    checkpoints: ["Location Scouting", "Styling Assistance", "High-End Retouching", "Print Rights"],
    color: "#B8860B"
  },
  {
    id: '04',
    title: "The Legacy",
    category: "Maternity & Family",
    description: "Documenting the growth of your family. From maternity shoots to first birthdays, we are there to capture every milestone.",
    img: maternityImg,
    checkpoints: ["Comfortable Pacing", "Prop Styling", "Studio or Outdoors", "Family Groupings"],
    color: "#D4AF37"
  }
]

function Card({ i, title, description, img, range, targetScale, progress, category, checkpoints }: any) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  // Scales the card as it reaches the top to create depth
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div
        style={{
          scale,
          top: i * 25 // Subtle controlled offset for visual stacking
        }}
        className="relative flex flex-col md:flex-row w-full max-w-[1200px] h-[75vh] md:h-[70vh] rounded-[3rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-black/5 bg-white"
      >
        {/* Text Section - White Theme */}
        <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center bg-white relative order-2 md:order-1 h-3/5 md:h-full z-10 border-r border-black/5">

          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

          {/* Decorative Number - Light Grey */}
          <span className="text-[6rem] md:text-[12rem] font-serif font-black text-black/[0.03] absolute top-4 left-4 md:-top-6 md:-left-6 pointer-events-none select-none z-0 tracking-tighter leading-none">
            0{i + 1}
          </span>

          <div className="relative z-10 flex flex-col h-full justify-between md:justify-center">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 border border-[#D4AF37]/20 rounded-full mb-6 backdrop-blur-sm bg-[#D4AF37]/5">
                <span className="text-[#D4AF37] text-[10px] md:text-xs font-serif font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  {category}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-serif font-medium uppercase text-black mb-4 md:mb-6 leading-tight">
                {title}
              </h2>

              <p className="text-zinc-600 text-sm md:text-base font-light leading-relaxed border-l border-black/10 pl-6 mb-6 md:mb-8 max-w-sm">
                {description}
              </p>
            </div>

            {/* Checkpoints Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-8">
              {checkpoints.map((point: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#D4AF37] min-w-[12px]" />
                  <span className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider truncate">{point}</span>
                </div>
              ))}
            </div>

            <div>
              <a href="/contact" className="group inline-flex items-center gap-3 text-black hover:text-[#D4AF37] transition-colors cursor-pointer">
                <span className="h-px w-8 bg-black group-hover:bg-[#D4AF37] transition-colors" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  View Full Details
                </span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Image Section - Parallax Inside */}
        <div className="w-full md:w-[55%] h-2/5 md:h-full overflow-hidden relative group order-1 md:order-2">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover transition-all duration-1000 ease-out"
            />
          </motion.div>

          {/* Overlay - Lighter on White */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-white/20 via-transparent to-transparent pointer-events-none" />
        </div>

      </motion.div>
    </div>
  )
}

export function Services() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  // Fixed header animations
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={container} id="services" className="bg-zinc-50 relative min-h-[350vh] selection:bg-[#D4AF37] selection:text-white">

      {/* Services Header - White */}
      <div className="h-[100vh] flex items-center justify-center sticky top-0 z-0 overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[#FAFAFA]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full opacity-50" />
        </div>

        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center px-6 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 border border-[#D4AF37]/30 rounded-full bg-white shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] font-serif">World Class</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-serif font-medium uppercase text-black leading-none tracking-tighter mb-8 text-shadow-sm">
              Our <span className="text-[#D4AF37] italic font-light">Services</span>
            </h1>

            <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent mb-8" />

            <p className="text-zinc-500 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed text-center">
              Comprehensive visual solutions ranging from intimate portraits to grand cinematic productions.
            </p>

          </motion.div>
        </motion.div>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative z-10 mt-[-20vh] pb-[20vh]">
        {services.map((service, i) => {
          // Calculate scale for the stacking effect
          const targetScale = 1 - ((services.length - i) * 0.05)
          return (
            <Card
              key={i}
              i={i}
              {...service}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>

    </section>
  )
}