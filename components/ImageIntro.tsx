import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import maternityImg from '../assets/IMG_5973.JPEG'
import babyImg from '../assets/baby_newborn.png'
import weddingImg from '../assets/IMG_6212.JPG (1).jpeg'

const images = [
    {
        src: babyImg, // Baby
        id: "cover6",
        expanded: { x: -320, y: -120 },
    },
    {
        src: maternityImg, // Maternity
        id: "cover5",
        expanded: { x: -200, y: -80 },
    },
    {
        src: "https://images.unsplash.com/photo-1530103862676-de3c9a59aa28?w=800&h=1200&fit=crop&auto=format", // Birthday
        id: "cover4",
        expanded: { x: -80, y: -40 },
    },
    {
        src: "https://images.unsplash.com/photo-1546193430-c2d207739ed7?w=800&h=1200&fit=crop&auto=format", // Bridal
        id: "cover3",
        expanded: { x: 80, y: 40 },
    },
    {
        src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=1200&fit=crop&auto=format", // Couple
        id: "cover2",
        expanded: { x: 200, y: 80 },
    },
    {
        src: weddingImg, // Wedding
        id: "cover1",
        expanded: { x: 320, y: 120 },
    },
]

export function ImageIntro() {
    const [variant, setVariant] = useState("out")

    useEffect(() => {
        const timer1 = setTimeout(() => setVariant("in"), 200)
        const timer2 = setTimeout(() => setVariant("expanded"), 1500)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    const variants = {
        out: {
            opacity: 0,
            scale: 0.8,
            rotate: 0,
            rotateX: 0,
            rotateY: 0
        },
        in: {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            rotateX: 0,
            rotateY: 0,
            transition: {
                type: "spring",
                duration: 1,
                bounce: 0
            } as const
        },
        expanded: (custom: any) => ({
            x: custom.x,
            y: custom.y,
            opacity: 1,
            rotate: -4,
            rotateX: 2,
            rotateY: 4,
            transition: {
                type: "spring",
                duration: 1.5,
                bounce: 0.2,
                delay: 0.1
            } as const
        })
    }

    return (
        <section className="relative w-full min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-100 to-white py-12 md:py-24 gap-8 md:gap-16">

            {/* Ambient Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-red-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

            {/* 3D Container - Scaled down for mobile */}
            <div
                className="relative w-[300px] h-[400px] md:w-[350px] md:h-[500px] flex items-center justify-center z-10 scale-[0.6] sm:scale-75 md:scale-100 origin-center transition-transform duration-500"
                style={{
                    perspective: '1200px',
                    transformStyle: 'preserve-3d'
                }}
            >
                {images.map((img, index) => (
                    <motion.div
                        key={img.id}
                        custom={img.expanded}
                        variants={variants}
                        initial="out"
                        animate={variant}
                        className={cn(
                            "absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white border-[3px] border-black/5",
                        )}
                        style={{
                            zIndex: index,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <img
                            src={img.src}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {/* Elegant overlay */}
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            {/* Title - Now part of flow with proper gap */}
            <motion.div
                className="relative z-50 text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span className="block text-xs md:text-sm font-medium text-black/60 tracking-[0.2em] mb-2 md:mb-4 uppercase">
                    Captured Memories
                </span>
                <h2 className="text-3xl md:text-6xl font-black text-black tracking-tight drop-shadow-sm">
                    Studio Collections
                </h2>
            </motion.div>

        </section>
    )
}
