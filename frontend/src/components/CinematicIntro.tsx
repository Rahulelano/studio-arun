import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CinematicIntroProps {
    onComplete: () => void
}

const WORDS = [
    { text: "PURE", color: "text-white" },
    { text: "CINEMA", color: "text-white" },
    { text: "EMOTION", color: "text-white" },
    { text: "ARUN PRASAD PHOTOGRAPHY", color: "text-[#D4AF37]" } // Brand Gold
]

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        // Cycle through words
        // 0 -> 1 -> 2 -> 3 (Final) -> Complete

        if (index < WORDS.length - 1) {
            const timer = setTimeout(() => {
                setIndex(prev => prev + 1)
            }, 800) // Original: 0.8s per word
            return () => clearTimeout(timer)
        } else {
            // Final word "ARUN PRASAD PHOTOGRAPHY" stays longer
            const timer = setTimeout(() => {
                onComplete()
            }, 2500) // Original: Hold for 2.5s
            return () => clearTimeout(timer)
        }
    }, [index, onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-none"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute px-4 text-center"
                >
                    <h1 className={`${WORDS[index].color} transition-all duration-300 w-full break-words
                        ${index === WORDS.length - 1
                            ? "font-serif italic text-xl sm:text-3xl md:text-5xl tracking-widest leading-relaxed px-4"  // Brand: Elegant, Serif, Gold
                            : "font-sans font-black text-6xl md:text-9xl tracking-[0.1em] md:tracking-[0.3em]" // Teaser: Bold, Sans, Massive
                        }`}
                    >
                        {WORDS[index].text}
                    </h1>
                </motion.div>
            </AnimatePresence>

            {/* Cinematic Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </motion.div>
    )
}
