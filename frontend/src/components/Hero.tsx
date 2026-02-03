'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'
import { useState, useEffect } from 'react'

import img1 from '../assets/_ALL1492-Edit.jpg'
import img2 from '../assets/_ALL1488-Edit.jpg'
import img3 from '../assets/_ALL1481-Edit.jpg'
import img4 from '../assets/_ALL1153-Edit1655212203564.jpg'
import img5 from '../assets/_60A5371-Edit-2.jpg'
import img6 from '../assets/_60A5367-Edit-2.jpg'
import img7 from '../assets/_60A5347-Edit-2.jpg'

const heroImages = [img1, img2, img3, img4, img5, img6, img7]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow with Slow Zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${heroImages[currentImageIndex]}')`
            }}
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Full-Width Navbar */}
      <Navbar transparent={true} />

      {/* Main Hero Content - Centered & Editorial */}
      <div className="absolute inset-0 flex items-center justify-center z-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-5xl w-full text-center"
        >
          <div className="mb-6 overflow-hidden inline-block relative">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block text-white/80 font-serif text-xs md:text-sm tracking-[0.4em] uppercase border-b border-[#D4AF37] pb-2 px-4"
            >
              Est. 2018
            </motion.span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium uppercase tracking-tighter leading-none text-white mb-8 mix-blend-overlay opacity-90">
            <span className="block drop-shadow-2xl">Capture Every</span>
            <span className="block text-[#D4AF37] italic font-light drop-shadow-2xl opacity-100 mix-blend-normal">
              Joyful Moment
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/90 mb-12 max-w-2xl mx-auto font-serif italic font-light leading-relaxed drop-shadow-md">
            Premium Wedding Photography — Turning your love stories into timeless memories.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#portfolio"
              className="group relative px-10 py-4 bg-[#D4AF37] text-white font-serif font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Portfolio <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            <a
              href="#contact"
              className="group px-10 py-4 border border-white/30 text-white font-serif font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              Book Your Date
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Refined Slider Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1 transition-all duration-500 rounded-full ${index === currentImageIndex ? 'bg-[#D4AF37] w-12' : 'bg-white/30 w-4 hover:bg-white/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-8 hidden md:flex items-center gap-4 text-white/50 font-serif text-xs tracking-widest uppercase writing-vertical-rl rotate-180"
      >
        <div className="h-12 w-[1px] bg-white/30" />
        <span>Scroll</span>
      </motion.div>
    </div>
  )
}