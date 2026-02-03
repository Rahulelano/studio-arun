'use client'

import { motion } from 'framer-motion'

import img1 from '../assets/_ALL1492-Edit.jpg'
import img2 from '../assets/_ALL1488-Edit.jpg'
import img3 from '../assets/_ALL1481-Edit.jpg'
import img4 from '../assets/_ALL1153-Edit1655212203564.jpg'
import img5 from '../assets/_60A5371-Edit-2.jpg'
import img6 from '../assets/_60A5367-Edit-2.jpg'
import img7 from '../assets/_60A5347-Edit-2.jpg'

const images1 = [img1, img2, img3]
const images2 = [img4, img5, img4]
const images3 = [img6, img7, img1]

function TickerColumn({ images, direction = "up", speed = 20 }: { images: string[], direction?: "up" | "down", speed?: number }) {
    return (
        <div className="flex-1 h-full overflow-hidden relative">
            <motion.div
                initial={{ y: direction === "up" ? 0 : "-50%" }}
                animate={{ y: direction === "up" ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex flex-col gap-6 w-full"
            >
                {/* Tripling the array to ensure smooth loop without gaps */}
                {[...images, ...images, ...images].map((img, index) => (
                    <div
                        key={`${index}`}
                        className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shrink-0 filter grayscale hover:grayscale-0 transition-all duration-500 border border-black/10 hover:border-black/50"
                    >
                        <img
                            src={img}
                            alt="Ticker image"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export function ImageTicker() {
    return (
        <section className="relative w-full h-screen bg-white overflow-hidden py-0">

            {/* Background gradient blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="container mx-auto h-full px-4 sm:px-8 relative z-10">
                <div className="flex gap-6 h-full w-full">
                    {/* Column 1 - Moves Up */}
                    <TickerColumn images={images1} direction="up" speed={35} />

                    {/* Column 2 - Moves Down */}
                    <TickerColumn images={images2} direction="down" speed={40} />

                    {/* Column 3 - Moves Up */}
                    <TickerColumn images={images3} direction="up" speed={30} />

                    {/* Column 4 (Hidden on mobile) - Moves Down */}
                    <div className="hidden lg:block flex-1 h-full overflow-hidden relative">
                        <TickerColumn images={images1} direction="down" speed={45} />
                    </div>
                </div>
            </div>

            {/* Gradient Overlay for smooth fade */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
        </section>
    )
}
