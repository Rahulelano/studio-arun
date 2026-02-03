import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

// Images for Menu Preview
import heroImg from '../assets/_ALL1133-Edit1655212203564.jpg'
import weddingImg from '../assets/IMG_6212.JPG (1).jpeg'
import one from '../assets/_ALL4857-Edit.jpg.jpeg'
import two from '../assets/baby_newborn.png'
import maternityImg from '../assets/IMG_5973.JPEG'

const MENU_ITEMS = [
    { name: 'Home', path: '/', img: heroImg, id: '01' },
    { name: 'About', path: '/about', img: one, id: '02' },
    { name: 'Services', path: '/services', img: weddingImg, id: '03' },
    { name: 'Gallery', path: '/gallery', img: one, id: '04' },
    { name: 'Blog', path: '/blog', img: two, id: '05' },
    { name: 'Contact', path: '/contact', img: maternityImg, id: '06' }
]

interface NavbarProps {
    rightElement?: React.ReactNode;
    transparent?: boolean;
}

export function Navbar({ rightElement, transparent = false }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hoveredImage, setHoveredImage] = useState<string | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const location = useLocation()

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    const isLightMode = isScrolled || isMenuOpen || !transparent;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-500 flex justify-between items-center ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-[#D4AF37]/10' : 'bg-transparent'
                    }`}
            >
                {/* Logo Area */}
                <Link to="/" className="group relative z-50">
                    <span className="font-serif text-xl tracking-widest font-bold transition-colors duration-500 text-black">
                        ARUN PRASAD
                    </span>
                    <span className={`block text-[8px] uppercase tracking-[0.4em] transition-colors duration-500 ${isMenuOpen ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>
                        Studio
                    </span>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-6 md:gap-12 relative z-50">
                    <Link
                        to="/contact"
                        className="hidden md:block text-xs uppercase tracking-[0.2em] font-bold border-b border-transparent hover:border-[#D4AF37] transition-all text-black hover:text-[#D4AF37]"
                    >
                        Inquire
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold transition-colors group text-black"
                    >
                        <span className="hidden md:block group-hover:text-[#D4AF37] transition-colors">
                            {isMenuOpen ? 'Close' : 'Menu'}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isMenuOpen ? 'border-black/20 bg-black/5 rotate-90' : 'border-black/10 hover:border-[#D4AF37]'}`}>
                            {isMenuOpen ? <X size={16} /> : <div className="space-y-1">
                                <span className="block w-4 h-[1px] bg-current"></span>
                                <span className="block w-4 h-[1px] bg-current"></span>
                            </div>}
                        </div>
                    </button>

                    {rightElement}
                </div>
            </motion.nav>

            {/* FULL SCREEN LUXURY MENU OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-white z-40 flex flex-col justify-center px-6 md:px-24"
                    >
                        {/* Background Text Texture - Vertical */}
                        <div className="absolute left-6 md:left-24 top-0 bottom-0 w-[1px] bg-black/5 z-0" />
                        <div className="absolute right-6 md:right-24 top-0 bottom-0 w-[1px] bg-black/5 z-0" />

                        <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
                            <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[40vh] leading-none font-serif text-black whitespace-nowrap -rotate-90">
                                MENU
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto h-full items-center">

                            {/* Left: Navigation Links */}
                            <div className="space-y-2 md:space-y-4 relative z-10 pl-6 md:pl-0">
                                {MENU_ITEMS.map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{
                                            opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.3 : 1,
                                            x: hoveredIndex === index ? 40 : 1,
                                            scale: hoveredIndex === index ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.4 }}
                                        onMouseEnter={() => {
                                            setHoveredImage(item.img)
                                            setHoveredIndex(index)
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredImage(null)
                                            setHoveredIndex(null)
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group block relative"
                                        >
                                            <span className={`absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-mono transition-colors duration-300 ${hoveredIndex === index ? 'text-[#D4AF37]' : 'text-zinc-300'}`}>
                                                {item.id}
                                            </span>
                                            <span className={`text-3xl md:text-6xl font-serif tracking-tight transition-colors duration-300 block ${hoveredIndex === index ? 'text-black italic' : 'text-black'}`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Right: Dynamic Image Preview */}
                            <div className="hidden md:block relative h-[65vh] w-full max-w-[500px] mx-auto overflow-hidden rounded-sm shadow-2xl shadow-black/5">
                                <AnimatePresence mode='wait'>
                                    {hoveredImage ? (
                                        <motion.div
                                            key={hoveredImage}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <img src={hoveredImage} className="w-full h-full object-cover" alt="Preview" />
                                            <div className="absolute inset-0 bg-black/10" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <img src={heroImg} className="w-full h-full object-cover grayscale opacity-50" alt="Default" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Overlay Info */}
                                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
                                    <div className="text-white">
                                        <span className="block text-[10px] uppercase tracking-widest text-[#D4AF37] mb-2">Featured Collection</span>
                                        <div className="w-12 h-[1px] bg-[#D4AF37] mb-4" />
                                        <span className="font-serif text-2xl italic">Explore the Studio</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Footer Info */}
                            <div className="md:hidden mt-8 pt-8 border-t border-black/10 text-zinc-500 text-xs uppercase tracking-widest flex flex-col gap-4">
                                <Link to="/contact">Book Now</Link>
                                <a href="https://www.instagram.com/arun_prasad_photography/?hl=en">Instagram</a>
                                <a href="https://www.facebook.com/ARUNPhotography27/">Facebook</a>
                                <a href="#">Email Us</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
