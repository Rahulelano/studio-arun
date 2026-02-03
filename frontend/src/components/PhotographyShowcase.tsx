'use client'

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Camera } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const images = [
    "https://images.unsplash.com/photo-1590272456521-1bbe16659ca9?min-w=600",
    "https://images.unsplash.com/photo-1534531173927-aeb928d54385?min-w=600",
    "https://images.unsplash.com/photo-1472393365320-db77a5abbecc?min-w=600",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?min-w=600",
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?min-w=600",
    "https://images.unsplash.com/photo-1574375927938-d5a9d824d67e?min-w=600",
    "https://images.unsplash.com/photo-1598550476439-c9202a0b3c67?min-w=600",
    "https://images.unsplash.com/photo-1554200876-56c2f25224fa?min-w=600",
]

export function PhotographyShowcase() {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add({
            // Mobile (up to 767px)
            isMobile: "(max-width: 767px)",
            // Desktop (768px and up)
            isDesktop: "(min-width: 768px)",
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean }
            const totalImages = images.length

            // Responsive values
            const radius = isMobile ? 140 : 360
            const centerCardScale = isMobile ? 0.85 : 1
            const scrollDistance = isMobile ? "+=180%" : "+=250%"

            // Ensure images start at center
            gsap.set(".gallery-card", {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 0.5, // Start smaller in stack
                opacity: 1
            })

            // Create the timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pin-section",
                    start: "top top",
                    end: scrollDistance,
                    scrub: 1.5, // Soft smooth scrubbing
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Handle resize
                }
            })

            // 1. Reveal Center Content
            tl.to(".center-content", {
                opacity: 1,
                scale: centerCardScale,
                duration: 0.5,
                ease: "power2.inOut"
            }, 0)

            // 2. Expand Images from Stack to Circle
            const cards = gsap.utils.toArray(".gallery-card") as HTMLElement[]
            cards.forEach((card, i) => {
                const angle = (360 / totalImages) * i
                const radian = (angle * Math.PI) / 180

                const tx = Math.cos(radian) * radius
                const ty = Math.sin(radian) * radius

                tl.to(card, {
                    x: tx,
                    y: ty,
                    rotation: 0, // Keep images upright like the reference
                    scale: isMobile ? 0.65 : 1, // Keep original size
                    duration: 1,
                    ease: "power2.out"
                }, 0)
            })
        })

    }, { scope: container })

    return (
        <div ref={container}>
            <section className="pin-section relative h-screen w-full bg-white overflow-hidden flex items-center justify-center">

                {/* Center Content */}
                <div className="center-content absolute z-30 text-center max-w-md px-6 opacity-0 flex flex-col items-center justify-center h-full pointer-events-none">
                    <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2rem] border border-black/10 shadow-2xl">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-md mx-auto">
                            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span className="text-xs font-serif font-bold text-black/60 uppercase tracking-widest">Professional Studio</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-serif font-black text-black mb-4 leading-tight uppercase tracking-tighter">
                            20+ Flexible<br /> <span className="text-[#D4AF37]">Categories</span>
                        </h2>
                        <p className="text-black/60 mb-6 text-sm font-serif italic leading-relaxed max-w-xs mx-auto">
                            Explore all categories and full control over your gallery selection.
                        </p>
                        <Link to="/gallery" className="pointer-events-auto">
                            <button className="group relative px-6 py-3 bg-[#D4AF37] text-white font-serif font-bold rounded-full overflow-hidden transition-all hover:bg-black active:scale-95 cursor-pointer text-sm uppercase tracking-widest">
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore all categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Images Stack */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="gallery-card absolute w-40 h-40 sm:w-52 sm:h-52 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20 bg-gray-900 origin-center will-change-transform"
                            style={{ zIndex: 20 - index }}
                        >

                            <img
                                src={img}
                                alt={`Gallery ${index}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>
                    ))}
                </div>

                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none z-40" />
            </section>
        </div>
    )
}
