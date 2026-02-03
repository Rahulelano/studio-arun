'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react'

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        // Create audio instance
        audioRef.current = new Audio('/the-wind-awakening-memories-of-the-forest-468155.mp3')
        audioRef.current.loop = true
        audioRef.current.volume = 0.5

        // Attempt autoplay
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true)
            }).catch((error) => {
                console.log("Autoplay blocked. Waiting for interaction.")
                setIsPlaying(false)
            })
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    // Interaction Listener - Maximal Aggression
    useEffect(() => {
        const handleInteraction = () => {
            if (audioRef.current && !hasInteracted) {
                // Try to play
                const playPromise = audioRef.current.play()
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true)
                            setHasInteracted(true)
                            // Remove all listeners
                            document.removeEventListener('click', handleInteraction)
                            document.removeEventListener('keydown', handleInteraction)
                            document.removeEventListener('touchstart', handleInteraction)
                            document.removeEventListener('scroll', handleInteraction)
                            document.removeEventListener('mousemove', handleInteraction)
                        })
                        .catch(e => {
                            // Still blocked
                            console.log("Autoplay retry failed (transient)", e)
                        })
                }
            }
        }

        // Add extensive listeners
        document.addEventListener('click', handleInteraction)
        document.addEventListener('keydown', handleInteraction)
        document.addEventListener('touchstart', handleInteraction)
        document.addEventListener('scroll', handleInteraction)
        document.addEventListener('mousemove', handleInteraction) // Added mousemove

        return () => {
            document.removeEventListener('click', handleInteraction)
            document.removeEventListener('keydown', handleInteraction)
            document.removeEventListener('touchstart', handleInteraction)
            document.removeEventListener('scroll', handleInteraction)
            document.removeEventListener('mousemove', handleInteraction)
        }
    }, [hasInteracted])

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="fixed bottom-8 right-8 z-[100] group/player">

            {/* Ambient Gold Glow - Pulses when playing */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.4, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 bg-[#D4AF37] blur-[40px] rounded-full pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <motion.div
                layout
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={togglePlay}
                initial={{ width: 56 }}
                animate={{
                    width: isPlaying || isHovered ? 'auto' : 56,
                    paddingRight: isPlaying || isHovered ? 28 : 0,
                    borderColor: isPlaying ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 0, 0, 0.05)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative h-14 bg-white/80 backdrop-blur-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full flex items-center overflow-hidden cursor-pointer"
                style={{ minWidth: '56px' }}
            >
                {/* Subtle Grain Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

                {/* Left Icon: The Control Center */}
                <div className="w-14 h-14 flex items-center justify-center shrink-0 relative z-10">

                    {/* Spinning Border Disc when playing */}
                    <AnimatePresence>
                        {isPlaying && (
                            <motion.div
                                className="absolute inset-2 border border-[#D4AF37] rounded-full opacity-50 border-t-transparent border-l-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode='wait'>
                        {isPlaying ? (
                            <motion.div
                                key="playing"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Pause size={18} className="text-[#D4AF37]" fill="currentColor" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="paused"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Play size={18} className="text-black ml-1" fill="currentColor" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Expanding Content: The Audio Visual Experience */}
                <AnimatePresence>
                    {(isPlaying || isHovered) && (
                        <motion.div
                            initial={{ opacity: 0, width: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, width: 'auto', filter: "blur(0px)" }}
                            exit={{ opacity: 0, width: 0, filter: "blur(10px)" }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-5 overflow-hidden whitespace-nowrap pr-2 relative z-10"
                        >
                            {/* Organic Equalizer - Smooth Sine Waves */}
                            <div className="flex items-center gap-[3px] h-4">
                                {[1, 2, 3, 4, 3, 2, 1].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-[2px] bg-[#D4AF37] rounded-full"
                                        animate={isPlaying ? {
                                            height: [6, 16, 8, 14, 6],
                                            opacity: [0.6, 1, 0.6]
                                        } : { height: 3, opacity: 0.3 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                            ease: "easeInOut",
                                            repeatType: "mirror"
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Typography - The Premium Feel */}
                            <div className="flex flex-col justify-center gap-0.5">
                                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-400">
                                    {isPlaying ? 'Now Playing' : 'Paused'}
                                </span>
                                <span className="text-sm font-serif italic text-black leading-none">
                                    Sonic Ambience
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
