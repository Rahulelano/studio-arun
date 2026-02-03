'use client'

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react'

// Shared data - in a real app this would be in a CMS or separate data file
const posts = [
    {
        id: 1,
        category: "Wedding Trends",
        date: "Oct 24, 2025",
        readTime: "5 min read",
        title: "The Return of Intimate Weddings",
        excerpt: "Why couples in 2025 are choosing smaller, more meaningful celebrations over grand spectacles.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=80",
        content: [
            "In recent years, we've witnessed a beautiful shift in the wedding industry. The era of the 'Big Fat Indian Wedding', while still glorious, is making space for something more personal, more grounded, and deeply emotional—the intimate wedding.",
            "But what exactly is driving this change? It's not just about budget or logistics; it's about connection.",
            "Couples today want to spend their special day with the people who truly matter. They want to have real conversations, share genuine laughter, and create memories that aren't lost in a crowd of thousands.",
            "From a photography perspective, intimate weddings are a dream. Without the chaos of managing huge crowds, we can focus on the micro-moments. The way your grandmother looks at you during the pheras, the tear rolling down your father's cheek, the quiet inside jokes shared between the couple.",
            "We believe this trend is here to stay, and we couldn't be happier. It brings the focus back to what weddings are truly about: two families coming together to celebrate love."
        ]
    },
    {
        id: 2,
        category: "Photography Tips",
        date: "Nov 02, 2025",
        readTime: "4 min read",
        title: "Golden Hour: The Magic Behind the Light",
        excerpt: "Understanding why the hour before sunset creates the most cinematic wedding portraits.",
        image: "https://images.unsplash.com/photo-1506169894395-36397e4aaee4?w=800&h=1000&fit=crop&q=80",
        content: [
            "You've probably heard your photographer obsess over 'Golden Hour'. But what makes this time of day so special?",
            "Golden Hour occurs roughly one hour after sunrise and one hour before sunset. During this time, the sun is low in the sky, creating a soft, diffused, and warm light that is incredibly flattering for portraits.",
            "Unlike the harsh midday sun, which casts unflattering shadows under the eyes and nose, Golden Hour light wraps around the subject, creating a natural glow. It adds a cinematic, dreamy quality to images that is almost impossible to replicate with artificial lighting.",
            "For our couples, we always recommend scheduling a 30-45 minute window for couple portraits during this time. It's a moment to step away from the festivities, take a breath, and just be with each other while we create magic.",
            "Trust us, the results are always worth it."
        ]
    },
    {
        id: 3,
        category: "Real Weddings",
        date: "Dec 15, 2025",
        readTime: "6 min read",
        title: "A Royal Celebration in Chettinad",
        excerpt: "Documenting a traditional Tamil Brahmin wedding set against the heritage backdrop of Karaikudi.",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop&q=80",
        content: [
            "Chettinad is a place where time seems to stand still. The heritage mansions, the rich culture, and the vibrant colors make it a photographer's paradise.",
            "We recently had the honor of documenting a traditional Tamil Brahmin wedding in the heart of Karaikudi. The couple, deeply rooted in their traditions, chose a 100-year-old heritage home as their venue.",
            "From the early morning janavasam to the grand oonjal ceremony, every ritual was steeped in history. The architecture of the Chettinad mansion provided a majestic backdrop, with its sun-drenched courtyards and intricate athangudi tiles.",
            "Our approach was to capture the grandeur of the location while keeping the focus on the emotions of the couple and their families. The contrast of the vibrant silk sarees against the rustic limestone walls created a visual feast.",
            "This wedding was a perfect example of how location plays a crucial role in storytelling. It wasn't just a venue; it was a character in their love story."
        ]
    },
    {
        id: 4,
        category: "Guides",
        date: "Jan 10, 2026",
        readTime: "5 min read",
        title: "How to Pose Naturally",
        excerpt: "Tips for couples who feel camera shy but want those candid, effortless shots.",
        image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=800&h=1000&fit=crop&q=80",
        content: [
            "\"We are not models.\" This is the most common phrase we hear from our couples. And our response is always: \"Good, because we don't want you to be.\"",
            "The best wedding photos are the ones that feel authentic. But we understand that having a camera pointed at you can be intimidating.",
            "The secret to natural posing is... movement. Instead of freezing in a stiff position, we encourage our couples to move. Walk towards us, look at each other, whisper a joke, or just hold hands and breathe.",
            "We also focus on 'prompts' rather than poses. Instead of saying \"put your hand here,\" we might say \"pull her close like you haven't seen her in a week.\"",
            "Remember, the focus should be on your connection with your partner, not the camera. Ignore us, enjoy the moment, and let us handle the rest."
        ]
    }
]

export function BlogPostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState<any>(null)

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return
            try {
                // Try to fetch from backend first
                const res = await fetch('http://localhost:3000/api/blog')
                const data = await res.json()
                if (Array.isArray(data)) {
                    const found = data.find((p: any) => p.id === id || p.id === parseInt(id))
                    if (found) {
                        // Normalize content to array if it's a string
                        const contentArray = Array.isArray(found.content)
                            ? found.content
                            : (found.content || '').split('\n').filter((line: string) => line.trim() !== '')

                        setPost({
                            ...found,
                            content: contentArray,
                            tags: found.tags || [],
                            keywords: found.keywords || '',
                            additionalImages: found.additionalImages || []
                        })

                        // Update meta description and keywords if available
                        if (found.keywords && typeof document !== 'undefined') {
                            const metaKeywords = document.querySelector('meta[name="keywords"]');
                            if (metaKeywords) {
                                metaKeywords.setAttribute('content', found.keywords);
                            } else {
                                const meta = document.createElement('meta');
                                meta.name = "keywords";
                                meta.content = found.keywords;
                                document.head.appendChild(meta);
                            }
                        }
                        return
                    }
                }

                // Fallback to static posts if not found in backend
                const foundStatic = posts.find(p => p.id === parseInt(id))
                if (foundStatic) {
                    setPost(foundStatic)
                }

            } catch (e) {
                // Fallback on error
                const foundStatic = posts.find(p => p.id === parseInt(id))
                if (foundStatic) {
                    setPost(foundStatic)
                }
            }
        }
        fetchPost()
        window.scrollTo(0, 0)
    }, [id])

    // SEO Title Update
    useEffect(() => {
        if (post && typeof document !== 'undefined') {
            document.title = `${post.title} | Arun Prasad Photography Blog`
        }
    }, [post])

    if (!post) {
        return (
            <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">
                <p>Loading article...</p>
            </div>
        )
    }

    return (
        <article className="min-h-screen bg-white text-black font-sans selection:bg-[#D4AF37] selection:text-white">

            {/* Progress Bar (Optional - simplified for now) */}

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-24 px-4 md:px-6 container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors mb-6 uppercase tracking-widest text-xs font-serif font-bold">
                            <ArrowLeft className="w-4 h-4" /> Back to Journal
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 text-[#D4AF37] text-xs md:text-sm font-serif font-bold uppercase tracking-widest mb-4">
                            <span>{post.category}</span>
                            <span className="w-1 h-1 bg-white/50 rounded-full" />
                            <span className="text-white/80 flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> {post.date}
                            </span>
                            <span className="w-1 h-1 bg-white/50 rounded-full" />
                            <span className="text-white/80 flex items-center gap-2">
                                <Clock className="w-3 h-3" /> {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-serif font-black uppercase tracking-tighter leading-tight max-w-4xl text-white">
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Article */}
                <div className="lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="prose prose-lg md:prose-xl max-w-none"
                    >
                        {/* Tags & Keywords Display for SEO visibility */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {post.tags && post.tags.map((tag: string, idx: number) => (
                                <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-serif">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <p className="lead text-xl md:text-2xl text-black/90 font-serif italic font-light mb-12 border-l-4 border-[#D4AF37] pl-6">
                            {post.excerpt}
                        </p>

                        <div className="space-y-8 text-black/70 font-light leading-relaxed">
                            {post.content.map((paragraph: string, idx: number) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Additional Images Grid */}
                        {post.additionalImages && post.additionalImages.length > 0 && (
                            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {post.additionalImages.map((img: string, idx: number) => (
                                    <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-black/10 flex items-center justify-between">
                        <span className="uppercase tracking-widest text-xs font-bold text-black/40">Share this story</span>
                        <div className="flex gap-4">
                            <button className="p-2 rounded-full border border-black/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all group">
                                <Share2 className="w-4 h-4 group-hover:text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="bg-gray-50 p-8 border border-black/5">
                        <h3 className="text-xl font-serif font-bold uppercase tracking-wider mb-4 text-[#D4AF37]">About Us</h3>
                        <p className="text-black/50 text-sm leading-relaxed mb-6 font-serif italic">
                            Arun Prasad Photography is a premium wedding photography team based in Coimbatore, capturing stories across South India.
                        </p>
                        <Link to="/contact" className="text-xs font-serif font-bold uppercase tracking-widest border-b border-black hover:border-[#D4AF37] hover:text-[#D4AF37] pb-1 transition-colors">
                            Book Us for Your Day
                        </Link>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-black/40">Recent Stories</h3>
                        <div className="space-y-6">
                            {posts.filter(p => p.id !== post.id).slice(0, 3).map(recent => (
                                <Link to={`/blog/${recent.id}`} key={recent.id} className="group block">
                                    <h4 className="font-serif font-bold text-lg group-hover:text-[#D4AF37] transition-colors leading-tight mb-2">
                                        {recent.title}
                                    </h4>
                                    <span className="text-xs text-black/30 uppercase tracking-wider font-serif">{recent.date}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </article>
    )
}
