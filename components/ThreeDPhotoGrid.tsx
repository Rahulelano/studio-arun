import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../lib/utils'

import img1 from '../assets/IMG_0093-Edit1-2 (1).jpg.jpeg'
import img2 from '../assets/_ALL1503-Edit.jpg.jpeg'
import img3 from '../assets/_ALL4797-Edit.jpg copy 2.jpeg'
import img4 from '../assets/_ALL4857-Edit.jpg.jpeg'
import img5 from '../assets/_ALL5667-Edit.jpg (1).jpeg'
import img6 from '../assets/_ALL5675-Edit.jpg.jpeg'
import img7 from '../assets/_ALL7494-Edit.jpg.jpeg'
import img8 from '../assets/_ALL7498-Edit.jpg.jpeg'
import img9 from '../assets/0T3A5397-Edit.jpg.jpeg'
import imgNew1 from '../assets/IMG_6395.JPEG'
import imgNew2 from '../assets/IMG_5973.JPEG'
import imgNew3 from '../assets/IMG_3704-Edit.jpg (1).jpeg'
import imgBgRow1Col2 from '../assets/3.png'

const images = [
    img1, imgBgRow1Col2, img3, img4, imgNew1, imgNew2, img7, imgNew3, img9
]

export function ThreeDPhotoGrid() {
    // We attach the scroll listener to the document/window effectively by using standard useScroll()
    const { scrollY } = useScroll()

    // Transform math based on analysis
    // Initial: Tilted back and rotated. Final: Flat.
    // We map 0-500px of scroll to the transition.

    // RotateX: 20deg -> 0deg
    const rotateX = useTransform(scrollY, [0, 600], [25, 0])

    // RotateZ: -10deg -> 0deg
    const rotateZ = useTransform(scrollY, [0, 600], [-10, 0])

    // Scale: 0.8 -> 1.2 (Slight zoom in as we enter)
    const scale = useTransform(scrollY, [0, 600], [0.85, 1.1])

    // Y Movement: Move up as we scroll
    // But since this is a background, we might want it to move naturally or slightly parallax.
    // The framed example moves the grid UP.
    const y = useTransform(scrollY, [0, 1000], [0, -400])

    const opacity = useTransform(scrollY, [0, 400, 800], [1, 1, 0])

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center bg-white">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10" />

            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    scale,
                    y,
                    opacity,
                    perspective: 1200,
                    transformStyle: "preserve-3d",
                }}
                className="grid grid-cols-3 md:grid-cols-4 gap-4 w-[150%] md:w-[120%] origin-top my-auto will-change-transform"
            >
                {/* Triple the array to create a long flowing grid */}
                {[...images, ...images, ...images].map((src, i) => (
                    <div
                        key={i}
                        className={cn(
                            "relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-black/5",
                            // Staggered offsets for specific columns if we want a 'masonry-like' feel, 
                            // but grid is sufficient for the 'monolith' look.
                            i % 2 === 0 ? "mt-8" : "mt-0"
                        )}
                    >
                        <img
                            src={src}
                            alt="Gallery"
                            className="w-full h-full object-cover opacity-100 transition-opacity duration-700"
                        />

                    </div>
                ))}
            </motion.div>
        </div>
    )
}
