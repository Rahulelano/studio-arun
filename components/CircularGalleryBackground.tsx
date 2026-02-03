'use client'

import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface CircularGalleryBackgroundProps {
    images: string[]
}

export function CircularGalleryBackground({ images }: CircularGalleryBackgroundProps) {
    const [radii, setRadii] = useState({ inner: 300, outer: 480 })

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768
            setRadii({
                inner: isMobile ? 140 : 280,
                outer: isMobile ? 240 : 450
            })
        }

        handleResize() // Set initial
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Ensure we have enough images for both rings
    const allImages = useMemo(() => {
        let imgs = [...images]
        while (imgs.length < 16) {
            imgs = [...imgs, ...images]
        }
        return imgs
    }, [images])

    const innerRingImages = allImages.slice(0, 8)
    const outerRingImages = allImages.slice(8, 16)

    return (
        <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none bg-white">

            {/* --- Ambient Glows --- */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
            <div className="absolute w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px] opacity-10" />

            {/* --- Floating Particles --- */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute text-[#D4AF37]/20"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            scale: 0.5
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                    >
                        <Star size={16 + Math.random() * 16} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* --- OUTER RING (Counter-Clockwise) --- */}
            <OrbitRing
                images={outerRingImages}
                radius={radii.outer}
                duration={60}
                direction={-1}
                imgSize={window.innerWidth < 768 ? { w: 80, h: 110 } : { w: 140, h: 200 }}
                opacity={0.6}
            />

            {/* --- INNER RING (Clockwise) --- */}
            <OrbitRing
                images={innerRingImages}
                radius={radii.inner}
                duration={45}
                direction={1}
                imgSize={window.innerWidth < 768 ? { w: 100, h: 140 } : { w: 160, h: 220 }}
                opacity={1}
            />

        </div>
    )
}

function OrbitRing({ images, radius, duration, direction, imgSize, opacity }: {
    images: string[],
    radius: number,
    duration: number,
    direction: number,
    imgSize: { w: number, h: number },
    opacity: number
}) {
    return (
        <motion.div
            animate={{ rotate: direction * 360 }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
            className="absolute flex items-center justify-center rounded-full border border-[#D4AF37]/5"
            style={{ width: radius * 2, height: radius * 2 }}
        >
            {images.map((src, i) => {
                const angle = (i / images.length) * 360
                const radian = (angle * Math.PI) / 180
                const x = Math.cos(radian) * radius
                const y = Math.sin(radian) * radius

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/50 bg-white"
                        style={{
                            width: imgSize.w,
                            height: imgSize.h,
                            x,
                            y,
                            left: '50%',
                            top: '50%',
                            marginLeft: -imgSize.w / 2,
                            marginTop: -imgSize.h / 2,
                            rotate: angle + 90, // Orient outward
                            opacity: opacity
                        }}
                    >
                        <img
                            src={src}
                            alt="Gallery"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                        />
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none" />
                    </motion.div>
                )
            })}
        </motion.div>
    )
}
