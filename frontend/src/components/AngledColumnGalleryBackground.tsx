'use client'

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'

interface AngledColumnGalleryBackgroundProps {
    images: string[]
}

export function AngledColumnGalleryBackground({ images }: AngledColumnGalleryBackgroundProps) {
    const [isHovering, setIsHovering] = useState(false)

    // Mouse Parallax for simple movement
    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth)
            mouseY.set(e.clientY / window.innerHeight)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const springConfig = { damping: 20, stiffness: 60 }
    const x = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig)
    const y = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig)

    // Ensure plenty of images for seamless looping
    const extendedImages = useMemo(() => {
        let imgs = [...images]
        while (imgs.length < 24) {
            imgs = [...imgs, ...images]
        }
        return imgs
    }, [images])

    const col1 = extendedImages.slice(0, 6)
    const col2 = extendedImages.slice(6, 12)
    const col3 = extendedImages.slice(12, 18)
    const col4 = extendedImages.slice(18, 24)

    return (
        <div
            className="fixed inset-0 z-[-1] bg-stone-100/50 overflow-hidden flex items-center justify-center pointer-events-none"
        >
            {/* Tilted & Parallax Container - Crystal Clear */}
            <motion.div
                style={{ x, y }}
                className="relative w-[150vw] h-[150vh] flex justify-center gap-6 md:gap-10 -rotate-[8deg] origin-center"
            >
                {/* Column 1 - Slow */}
                <MarqueeColumn
                    images={col1}
                    duration={isHovering ? 90 : 60}
                    direction={-1}
                    className="opacity-70 blur-[1px] hidden xl:flex"
                />

                {/* Column 2 - Main */}
                <MarqueeColumn
                    images={col2}
                    duration={isHovering ? 60 : 40}
                    direction={1}
                    className="shadow-2xl z-10 scale-105 saturate-100 contrast-105"
                />

                {/* Column 3 - Main */}
                <MarqueeColumn
                    images={col3}
                    duration={isHovering ? 70 : 45}
                    direction={-1}
                    className="shadow-2xl z-10 scale-105 saturate-100 contrast-105"
                />

                {/* Column 4 - Slow */}
                <MarqueeColumn
                    images={col4}
                    duration={isHovering ? 100 : 65}
                    direction={1}
                    className="opacity-70 blur-[1px] hidden xl:flex"
                />
            </motion.div>

            {/* Vignette for focus */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/40 z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 z-20" />
        </div>
    )
}

function MarqueeColumn({ images, duration, direction, className }: {
    images: string[],
    duration: number,
    direction: number,
    className?: string
}) {
    return (
        <div className={`relative w-full md:w-1/4 h-[200%] flex flex-col gap-6 md:gap-10 ${className}`}>
            <motion.div
                initial={{ y: direction === 1 ? "-33.33%" : "0%" }}
                animate={{ y: direction === 1 ? "0%" : "-33.33%" }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-6 md:gap-10 min-h-full pb-8"
            >
                {[...images, ...images, ...images].map((src, i) => (
                    <div key={i} className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-md bg-white relative border-[6px] border-white">
                        <img
                            src={src}
                            alt="Gallery"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
