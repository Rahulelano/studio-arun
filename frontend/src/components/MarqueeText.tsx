'use client'

import { motion } from 'framer-motion'

export function MarqueeText() {
    const text = "ARUN PRASAD PHOTOGRAPHY • VISUAL LEGACY • TIMELESS MOMENTS • CINEMATIC STORYTELLING • EDITORIAL STYLE • "

    return (
        <div className="relative py-10 md:py-20 overflow-hidden bg-white border-y border-black/5 whitespace-nowrap select-none pointer-events-none">
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex"
            >
                <span className="text-[12vw] md:text-[8vw] font-serif font-black uppercase tracking-tighter text-black/5 leading-none px-4">
                    {text}
                </span>
                <span className="text-[12vw] md:text-[8vw] font-serif font-black uppercase tracking-tighter text-black/5 leading-none px-4">
                    {text}
                </span>
            </motion.div>
        </div>
    )
}
