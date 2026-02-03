import { Diamond } from 'lucide-react'

export function SeoContent() {
    return (
        <div className="container mx-auto px-6 relative z-10 py-32 border-t border-white/10">
            <div className="max-w-7xl mx-auto">

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* LEFT: FAQ - THE GOLDEN STANDARD */}
                    <div className="lg:col-span-7">
                        <div className="mb-20">
                            <h3 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                                The <br />
                                <span className="text-[#D4AF37] italic">Essentials.</span>
                            </h3>
                            <p className="text-[#E6EEF5]/40 text-lg font-light max-w-md border-l border-[#D4AF37] pl-6 ml-2">
                                Everything you need to know about crafting your visual legacy.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { q: "Destination Logistics", sub: "Global Reach", a: "We are passport-ready. From the backwaters of Kerala to the beaches of Goa, 70% of our commissions are destination weddings. We handle our own travel logistics flawlessly." },
                                { q: "The Delivery Arc", sub: "Timeline", a: "Perfection is a process. You receive a high-impact 'Teaser Set' (50 photos) within 48 hours. The full cinematic gallery unlocks in 4-6 weeks. Films in 8-10 weeks." },
                                { q: "Archive Access", sub: "Raw Data", a: "We curate finished art, not raw ingredients. However, we offer an exclusive 'Vault Access' add-on for clients wishing to purchase the raw archival footage." }
                            ].map((item, i) => (
                                <div key={i} className="group relative">
                                    {/* Golden Backdrop Effect */}
                                    <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-r-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-0 group-hover:opacity-100" />

                                    <div className="relative border-b border-[#D4AF37]/20 pb-8 pl-4 transition-all duration-500 group-hover:pl-8 group-hover:border-[#D4AF37]">
                                        <div className="flex justify-between items-baseline mb-4">
                                            <h4 className="text-xl md:text-2xl text-white font-serif group-hover:text-[#D4AF37] transition-colors">{item.q}</h4>
                                            <span className="text-xs font-mono text-[#D4AF37]/50 uppercase tracking-widest group-hover:text-[#D4AF37]">0{i + 1}</span>
                                        </div>
                                        <p className="text-[#E6EEF5]/60 text-base leading-relaxed font-light max-w-xl group-hover:text-white transition-colors">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: LOCATION - "ROYAL DECREE" CARD */}
                    <div className="lg:col-span-5 relative">
                        {/* Rotating Gold Ring Background */}
                        <div className="absolute -top-20 -right-20 w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] border border-[#D4AF37]/5 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute -top-10 -right-10 w-[15rem] h-[15rem] md:w-[20rem] md:h-[20rem] border border-[#D4AF37]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                        <div className="relative bg-[#121212]/50 backdrop-blur-sm rounded-[3px] p-1 shadow-2xl group overflow-hidden border border-[#D4AF37]/10">
                            {/* Double Border Art Deco Style */}
                            <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-20 m-1 rounded-[1px]" />
                            <div className="absolute inset-0 border border-[#D4AF37] opacity-10 m-3 rounded-[1px]" />

                            <div className="relative p-8 md:p-14 z-10">
                                <div className="flex flex-col items-center text-center">

                                    {/* Logo mark */}
                                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                        <Diamond size={24} className="text-black" fill="currentColor" />
                                    </div>

                                    <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Studio Headquarters</h3>
                                    <p className="text-[#E6EEF5]/40 text-xs uppercase tracking-widest mb-10">The Center of Excellence</p>

                                    <div className="bg-[#121212]/30 p-8 w-full border border-[#D4AF37]/10 backdrop-blur-sm mb-10 group-hover:border-[#D4AF37]/40 transition-colors">
                                        <p className="text-[#D4AF37] font-serif text-2xl italic mb-4">First Floor</p>
                                        <p className="text-white text-lg font-light leading-relaxed mb-1">
                                            Vadavalli - Edayarpalayam Rd
                                        </p>
                                        <p className="text-[#E6EEF5]/60 text-sm uppercase tracking-wider font-bold">
                                            Edayarpalayam, Coimbatore
                                        </p>
                                        <p className="text-[#D4AF37]/50 text-xs mt-2 font-mono">TN 641025</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 w-full text-center">
                                        <div className="border-r border-[#D4AF37]/10">
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Status</p>
                                            <p className="text-[#D4AF37] text-xs font-bold">Open for 2026</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Reach</p>
                                            <p className="text-[#D4AF37] text-xs font-bold">Pan-India</p>
                                        </div>
                                    </div>

                                    {/* SEO Tags - Discreet */}
                                    <div className="mt-12 flex flex-wrap justify-center gap-2 opacity-40">
                                        {['#VadavalliAudio', '#EdayarpalayamStudio', '#CoimbatoreWeddings', '#WeddingPhotography', '#CandidPhotography', '#CoimbatoreEvents'].map((tag, i) => (
                                            <span key={i} className="text-[9px] text-white">{tag}</span>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
