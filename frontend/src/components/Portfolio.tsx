'use client'

import { Play, ArrowUpRight, Maximize2, Plus } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const projects = [
  {
    title: "The Solitude",
    client: "Vogue India",
    type: "Editorial",
    year: "2024",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Eternal Bond",
    client: "Private Wedding",
    type: "Cinematography",
    year: "2024",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Urban Rhythm",
    client: "Nike",
    type: "Commercial",
    year: "2023",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Golden Hour",
    client: "Tourism Board",
    type: "Travel",
    year: "2023",
    category: "Event",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Silk & Stone",
    client: "Campaign",
    type: "Fine Art",
    year: "2022",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
  }
]

function ProjectRow({ project, index }: any) {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <Link to={`/gallery?category=${encodeURIComponent(project.category)}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative border-t border-white/10 group cursor-pointer overflow-hidden"
      >
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between relative z-10 transition-transform duration-500 group-hover:translate-x-4">
          <div className="flex items-center gap-8 md:w-1/3">
            <span className="text-zinc-600 font-serif text-lg">0{index + 1}</span>
            <h3 className="text-4xl md:text-5xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-300">{project.title}</h3>
          </div>

          <div className="hidden md:flex flex-col gap-1 md:w-1/3 text-center opacity-50 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]">{project.category}</span>
            <span className="text-lg font-serif text-white">{project.client}</span>
          </div>

          <div className="flex items-center gap-12 md:w-1/3 justify-end">
            <span className="text-zinc-500 text-sm font-light hidden md:block">{project.type}</span>
            <span className="text-white text-lg font-serif hidden md:block">{project.year}</span>
            <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-[#D4AF37] border-[#D4AF37] rotate-45' : ''}`}>
              <ArrowUpRight className={`w-5 h-5 ${isHovered ? 'text-black' : 'text-white'}`} />
            </div>
          </div>
        </div>

        {/* Hover Reveal Image - Floating */}
        <motion.div
          className="fixed pointer-events-none z-50 h-[300px] w-[240px] hidden md:block opacity-0 overflow-hidden shadow-2xl rounded-sm border-[4px] border-white/10"
          style={{
            left: 0,
            top: 0,
            x: mouseX,
            y: mouseY,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.1 }} // Instant follow
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="absolute inset-0 bg-zinc-900 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-0" />
      </motion.div>
    </Link>
  )
}

export function Portfolio() {
  const containerRef = useRef(null)

  return (
    <section id="portfolio" ref={containerRef} className="relative bg-black text-white min-h-screen selection:bg-[#D4AF37] selection:text-black">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <div className="pt-40 pb-20 relative z-20">

        {/* Section Header */}
        <div className="container mx-auto px-6 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl md:text-[10rem] font-serif font-medium uppercase text-white leading-[0.8] tracking-tighter"
              >
                Selected<br />
                <span className="text-zinc-700">Works</span>
              </motion.h2>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <Link to="/gallery" className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">All</Link>
              <Link to="/gallery?category=Wedding" className="px-4 py-2 border border-white/10 rounded-full text-xs uppercase tracking-widest text-zinc-500 hover:border-white hover:text-white transition-colors">Wedding</Link>
              <Link to="/gallery?category=Commercial" className="px-4 py-2 border border-white/10 rounded-full text-xs uppercase tracking-widest text-zinc-500 hover:border-white hover:text-white transition-colors">Commercial</Link>
              <Link to="/gallery?category=Fashion" className="px-4 py-2 border border-white/10 rounded-full text-xs uppercase tracking-widest text-zinc-500 hover:border-white hover:text-white transition-colors">Fashion</Link>
              <Link to="/gallery?category=Maternity" className="px-4 py-2 border border-white/10 rounded-full text-xs uppercase tracking-widest text-zinc-500 hover:border-white hover:text-white transition-colors">Maternity</Link>
            </div>
          </div>
        </div>

        {/* Featured Video Showcase - THEATER MODE 2.0 */}
        <div className="container mx-auto px-6 mb-40">
          <div className="relative group w-full aspect-[21/9] bg-zinc-900 overflow-hidden shadow-2xl">

            {/* Video Cover */}
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

            <iframe
              src="https://www.youtube.com/embed/fIbDWDh6aYw?autoplay=1&mute=1&loop=1&playlist=fIbDWDh6aYw&controls=0&showinfo=0"
              title="Hampton Commercial"
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <div className="absolute bottom-8 left-8 z-20">
              <div className="bg-white/10 backdrop-blur border border-white/20 px-6 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">Showreel 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project List - Interactive Hover Reveal */}
        <div className="border-b border-white/10">
          {projects.map((project, index) => (
            <ProjectRow key={index} project={project} index={index} />
          ))}
        </div>

        <div className="mt-32 text-center">
          <a href="/gallery" className="group relative inline-block px-12 py-5 overflow-hidden border border-white/20 hover:border-white transition-colors duration-500">
            <div className="absolute inset-0 w-0 bg-white transition-all duration-[350ms] ease-out group-hover:w-full opacity-100" />
            <span className="relative text-xs font-bold uppercase tracking-[0.2em] group-hover:text-black transition-colors flex items-center gap-2">
              View Full Archive <Plus size={14} />
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}