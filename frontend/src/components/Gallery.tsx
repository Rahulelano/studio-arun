'use client'

import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useAnimationFrame,
    animate
} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useSearchParams, Link } from 'react-router-dom'
import img1 from '../assets/_ALL1133-Edit1655212203564.jpg'
import img2 from '../assets/_ALL1112-Edit1655212203558.jpg'
import img3 from '../assets/_ALL1153-Edit1655212203564.jpg'
import img4 from '../assets/_ALL1172-Edit.jpg'
import img5 from '../assets/_ALL1179-Edit.jpg'
import img6 from '../assets/arun (2).png'
import maternityImg from '../assets/IMG_5973.JPEG'
import weddingImg from '../assets/IMG_6212.JPG (1).jpeg'

// Sample Data with "Reference-like" structure
const works = [
    {
        id: 1,
        title: "Traditional Wedding",
        category: "Wedding Photography",
        img: weddingImg,
        aspect: "aspect-[3/4]",
        width: "w-[300px] md:w-[400px]",
        yOffset: "translate-y-12"
    },
    {
        id: 2,
        title: "Candid Love",
        category: "Candid",
        img: img1,
        aspect: "aspect-[4/3]",
        width: "w-[400px] md:w-[600px]",
        yOffset: "-translate-y-8"
    },
    {
        id: 3,
        title: "Editorial Portrait",
        category: "Portrait",
        img: "https://images.unsplash.com/photo-154407875158fee2d8a03b?w=500&h=700&fit=crop",
        aspect: "aspect-[3/5]",
        width: "w-[250px] md:w-[350px]",
        yOffset: "translate-y-20"
    },
    {
        id: 4,
        title: "Golden Hour",
        category: "Couple Shoots",
        img: img2,
        aspect: "aspect-[16/9]",
        width: "w-[500px] md:w-[700px]",
        yOffset: "translate-y-0"
    },
    {
        id: 5,
        title: "Maternity",
        category: "Maternity",
        img: maternityImg,
        aspect: "aspect-square",
        width: "w-[300px] md:w-[500px]",
        yOffset: "translate-y-16"
    },
    {
        id: 6,
        title: "Cinematic",
        category: "Films",
        img: img3,
        aspect: "aspect-[2/3]",
        width: "w-[300px] md:w-[450px]",
        yOffset: "-translate-y-12"
    },
    {
        id: 7,
        title: "Detail Shot",
        category: "Details",
        img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=1200&fit=crop",
        aspect: "aspect-[3/4]",
        width: "w-[300px] md:w-[400px]",
        yOffset: "translate-y-8"
    },
    {
        id: 8,
        title: "Black & White",
        category: "Classic",
        img: img4,
        aspect: "aspect-[4/5]",
        width: "w-[350px] md:w-[500px]",
        yOffset: "-translate-y-4"
    },
]

export function Gallery() {
    const baseVelocity = 0.5 // Speed
    const x = useMotionValue(0)
    const mainRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const [items, setItems] = useState(works)
    const [isLoaded, setIsLoaded] = useState(false)

    // Duplicate items for infinite loop illusion


    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/gallery')
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    const mappedData = data.map((item: any, index: number) => {
                        const template = works[index % works.length]
                        return {
                            ...item,
                            img: item.src,
                            aspect: template.aspect,
                            width: template.width,
                            yOffset: template.yOffset
                        }
                    })
                    setItems(mappedData)
                }
            } catch (error) {
                console.error("Failed to fetch gallery:", error)
            } finally {
                setIsLoaded(true)
            }
        }
        fetchGallery()
    }, [])

    const filteredItems = category
        ? items.filter(item => item.category?.toLowerCase() === category.toLowerCase())
        : items

    const displayItems = filteredItems.length > 0 ? filteredItems : items

    // Duplicate items for infinite loop illusion
    const extendedWorks = [...displayItems, ...displayItems, ...displayItems, ...displayItems]

    useAnimationFrame((t, delta) => {
        if (!isDragging && !isHovered) {
            // Move left
            let moveBy = baseVelocity * (delta / 16)

            // Check boundaries for loop
            const currentX = x.get()
            const resetThreshold = -4540 // Approx width of one set

            if (currentX <= resetThreshold) {
                x.set(0)
            } else {
                x.set(currentX - moveBy)
            }
        }
    })

    const handleManualScroll = (direction: 'left' | 'right') => {
        const currentX = x.get()
        const moveAmount = direction === 'left' ? 300 : -300
        animate(x, currentX + moveAmount, { duration: 0.5, ease: "easeOut" })
    }

    return (
        <section className="relative min-h-screen bg-white text-black overflow-hidden flex flex-col pt-32">

            {/* Decorative Background Text */}
            <div className="absolute top-36 left-10 text-[10px] md:text-xs font-serif font-bold tracking-[0.3em] text-[#D4AF37] z-20 pointer-events-none">
                WEDDING PHOTOGRAPHY
            </div>
            <div className="absolute bottom-8 right-10 text-[10px] md:text-xs font-bold tracking-[0.3em] text-black/40 z-20 pointer-events-none">
                CINEMATIC FILMS
            </div>
            <div className="absolute top-1/2 left-10 md:left-32 -translate-y-1/2 -z-10 opacity-5 pointer-events-none">
                <h1 className="text-[20vw] font-black leading-none text-black select-none">WORK</h1>
            </div>

            {/* ========== DESKTOP: Draggable & Auto-Scrolling Track ========== */}
            <div
                ref={mainRef}
                className="hidden md:block w-full cursor-grab active:cursor-grabbing relative py-12"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Desktop Headers */}
                <div className="pl-10 md:pl-32 mb-12 pointer-events-none sticky left-0 z-10">
                    <h2 className="text-4xl md:text-7xl font-serif font-black uppercase leading-[0.9]">
                        {category ? (
                            <>
                                {category}<br /><span className="text-[#D4AF37]">Collection</span>
                            </>
                        ) : (
                            <>
                                Selected<br /><span className="text-[#D4AF37]">Works</span>
                            </>
                        )}
                    </h2>
                    {category && (
                        <Link to="/gallery" className="pointer-events-auto mt-4 inline-block text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
                            ← View All Works
                        </Link>
                    )}
                </div>

                <motion.div
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -10000, right: 0 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    className="flex items-center gap-10 md:gap-20 px-10 md:px-32 w-max"
                >
                    {/* Images Mapping */}
                    {extendedWorks.map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className={`relative shrink-0 group ${item.width} ${item.yOffset} transition-all duration-500 select-none`}
                        >
                            {/* Floating Category Label */}
                            <div className="absolute -top-6 left-0 text-[10px] font-serif font-bold uppercase tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.category}
                            </div>

                            <div className={`w-full overflow-hidden ${item.aspect} bg-gray-100`}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                                />
                            </div>

                            {/* Title Hover */}
                            <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-xl font-serif font-bold uppercase">{item.title}</h3>
                            </div>
                        </div>
                    ))}

                    {/* End Link for reference */}
                    <div className="w-[300px] flex items-center justify-center shrink-0">
                        <a href="/contact" className="text-[#D4AF37] font-serif font-bold tracking-widest uppercase border-b border-[#D4AF37] pb-1 whitespace-nowrap">Book Your Date</a>
                    </div>
                </motion.div>

                {/* Desktop Arrows */}
                <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 flex gap-4 z-50 pointer-events-auto">
                    <button
                        onClick={() => handleManualScroll('left')}
                        className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors bg-white/80 backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleManualScroll('right')}
                        className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors bg-white/80 backdrop-blur-sm"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* ========== MOBILE: Vertical Stack Layout ========== */}
            <div className="md:hidden flex flex-col gap-16 px-6 py-32 w-full">
                <div>
                    <h2 className="text-5xl font-serif font-black uppercase leading-[0.9] mb-4">
                        Selected<br /><span className="text-[#D4AF37]">Works</span>
                    </h2>
                    <p className="text-sm font-serif text-black/60 font-light leading-relaxed text-justify mb-8">
                        A curated selection of our finest moments.
                    </p>
                </div>

                {displayItems.map((item, index) => (
                    <motion.div
                        key={`mobile-${item.id}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`w-[85%] group flex flex-col ${index % 2 === 0 ? 'self-start items-start text-left' : 'self-end items-end text-right'}`}
                    >
                        <div className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                            {item.category}
                        </div>
                        <div className={`w-full ${item.aspect} bg-gray-100 mb-2 overflow-hidden`}>
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-2xl font-serif font-black uppercase leading-[0.9]">{item.title}</h3>
                    </motion.div>
                ))}

                <div className="mt-8 text-center">
                    <a href="/contact" className="text-[#D4AF37] font-serif font-bold tracking-widest uppercase border-b border-[#D4AF37] pb-1">Book Your Date</a>
                </div>
            </div>

            {/* Scroll Indicator (Desktop Only) */}
            <div className="hidden md:block fixed bottom-10 left-10 md:left-20 z-50 mix-blend-difference text-white text-xs font-mono">
                DRAG OR USE ARROWS TO EXPLORE
            </div>

        </section>
    )
}
