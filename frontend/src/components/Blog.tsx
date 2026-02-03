'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Blog() {

    // SEO: Update Page Title
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.title = "Journal | Arun Prasad Photography"
        }
    }, [])

    const posts = [
        {
            id: 1,
            category: "Insight",
            date: "Oct 24, 2025",
            readTime: "5 min read",
            title: "Intimate Weddings: A Return to Meaning",
            excerpt: "Why couples in 2025 are choosing smaller, more meaningful celebrations over grand spectacles. The shift towards authentic connection.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=80"
        },
        {
            id: 2,
            category: "Technique",
            date: "Nov 02, 2025",
            readTime: "3 min read",
            title: "The Physics of Golden Hour",
            excerpt: "Understanding the scientific and artistic reasons why the hour before sunset creates the most cinematic wedding portraits.",
            image: "https://images.unsplash.com/photo-1506169894395-36397e4aaee4?w=800&h=1000&fit=crop&q=80"
        },
        {
            id: 3,
            category: "Stories",
            date: "Dec 15, 2025",
            readTime: "8 min read",
            title: "Royalty in Chettinad",
            excerpt: "Documenting a traditional Tamil Brahmin wedding set against the heritage backdrop of Karaikudi. A visual essay.",
            image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop&q=80"
        },
        {
            id: 4,
            category: "Guide",
            date: "Jan 10, 2026",
            readTime: "6 min read",
            title: "The Art of Natural Posing",
            excerpt: "Tips for couples who feel camera shy but want those candid, effortless shots. How we direct without directing.",
            image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=800&h=1000&fit=crop&q=80"
        }
    ]

    const [blogPosts, setBlogPosts] = useState(posts)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/blog')
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    setBlogPosts(data)
                }
            } catch (error) {
                console.error("Failed to fetch blog posts:", error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <section id="blog" className="relative bg-white text-black min-h-screen font-sans selection:bg-[#D4AF37] selection:text-white">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

            {/* ================= HEADER ================= */}
            <div className="pt-32 pb-20 px-6 container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Archive</span>
                            <h1 className="text-6xl md:text-9xl font-serif font-medium uppercase tracking-tighter leading-[0.85]">
                                The<br />
                                <span className="text-zinc-400">Journal</span>
                            </h1>
                        </motion.div>
                    </div>
                    <div className="max-w-md text-right mt-8 md:mt-0">
                        <p className="text-xl font-light text-zinc-500 leading-relaxed border-r-2 border-[#D4AF37] pr-6">
                            "A collection of thoughts, techniques, and visual stories from our world."
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= BLOG LIST ================= */}
            <div className="container mx-auto px-6 pb-32 relative z-10">
                <div className="flex flex-col">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group border-b border-black/10"
                        >
                            <Link to={`/blog/${post.id}`} className="block py-16">
                                <div className="grid md:grid-cols-12 gap-8 items-center">

                                    {/* Date & Meta */}
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest">{post.category}</span>
                                        <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider">
                                            <Calendar size={12} />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>

                                    {/* Title & Excerpt */}
                                    <div className="md:col-span-6">
                                        <h2 className="text-3xl md:text-5xl font-serif font-medium uppercase mb-4 text-black group-hover:text-[#D4AF37] transition-colors duration-300">
                                            {post.title}
                                        </h2>
                                        <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-2xl">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/50 group-hover:text-black transition-colors">
                                            <span>Read Article</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Image Hover Preview (Hidden on mobile, visible on desktop hover) or simple image */}
                                    <div className="md:col-span-4 relative h-[200px] md:h-[250px] overflow-hidden rounded-sm md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute inset-0 bg-[#D4AF37]/20 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Newsletter CTA */}
            <div className="border-t border-black/5 bg-zinc-50 py-32 px-6">
                <div className="container mx-auto text-center max-w-3xl">
                    <h3 className="text-3xl md:text-5xl font-serif text-black mb-6 uppercase">Stay Updated</h3>
                    <p className="text-zinc-500 mb-10 text-lg font-light">
                        Join our mailing list to receive the latest stories and updates directly in your inbox.
                    </p>
                    <div className="flex flex-col md:flex-row gap-0">
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="w-full bg-transparent border border-black/10 px-6 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors uppercase tracking-widest text-xs"
                        />
                        <button className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}
