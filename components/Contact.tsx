'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { Crown, Star, User, Mail, Phone, MessageSquare, Send, Loader2, MapPin, ArrowRight, Instagram, Globe } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Form Validation Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(10, { message: "Invalid phone" }),
  subject: z.string().min(3, { message: "Required" }),
  message: z.string().min(10, { message: "Tell us a bit more..." }),
})

export function Contact() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  // Handle Submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:6050/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("Message transmitted. We will be in touch.")
        form.reset()
      } else {
        toast.error(data.message || "Failed to send message.")
      }
    } catch (error) {
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={containerRef} id="contact" className="relative py-32 lg:py-40 bg-white text-black overflow-hidden min-h-screen selection:bg-[#D4AF37] selection:text-white">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#ffffff]" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-black/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">

          {/* LEFT COLUMN: Info & Status */}
          <div className="lg:w-1/3 pt-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-8 block">Contact</span>
              <h1 className="text-6xl md:text-8xl font-serif font-medium uppercase text-black leading-[0.85] tracking-tighter mb-12">
                Get in<br />
                <span className="text-zinc-400">Touch</span>
              </h1>

              <div className="space-y-12">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    Current Status
                  </h3>
                  <p className="text-2xl font-serif text-black leading-relaxed border-l-2 border-[#D4AF37] pl-6 py-2">
                    Currently booking for <br />
                    <span className="text-zinc-500">2026 Season</span>
                  </p>
                </div>

                <div className="space-y-6">
                  <a href="mailto:arunprasadphotography@gmail.com" className="group flex items-center justify-between border-b border-black/10 pb-4 hover:border-[#D4AF37] transition-colors">
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Email</span>
                      <span className="text-xl font-serif">arunprasadphotography@gmail.com</span>
                    </div>
                    <ArrowRight className="-rotate-45 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="tel:9944878088" className="group flex items-center justify-between border-b border-black/10 pb-4 hover:border-[#D4AF37] transition-colors">
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Phone</span>
                      <span className="text-xl font-serif">9944878088</span>
                    </div>
                    <ArrowRight className="-rotate-45 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://www.instagram.com/arun_prasad_photography/?hl=en" target="_blank" className="group flex items-center justify-between border-b border-black/10 pb-4 hover:border-[#D4AF37] transition-colors">
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Social</span>
                      <span className="text-xl font-serif">Instagram</span>
                    </div>
                    <ArrowRight className="-rotate-45 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="pt-8">
                  <div className="flex items-start gap-4 text-zinc-500 font-light text-sm">
                    <MapPin className="text-[#D4AF37] shrink-0 mt-1" />
                    <p>
                      First Floor, Vadavalli – Edayarpalayam Rd,<br />
                      Coimbatore – 641025, Tamil Nadu
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>


          {/* RIGHT COLUMN: Minimalist Form */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-zinc-50 border border-black/5 p-8 md:p-16 relative overflow-hidden"
            >
              {/* Background Noise */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

              <h3 className="text-3xl font-serif mb-12 relative z-10 text-black">Start a Project</h3>

              <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 relative z-10">

                  <div className="grid md:grid-cols-2 gap-12">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel className={`absolute left-0 transition-all duration-300 ${activeField === 'name' || field.value ? '-top-6 text-xs text-[#D4AF37]' : 'top-0 text-zinc-400 text-lg font-serif'}`}>
                            What's your name?
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onFocus={() => setActiveField('name')}
                              onBlur={() => setActiveField(null)}
                              className="bg-transparent border-0 border-b border-black/10 rounded-none px-0 py-2 focus:border-[#D4AF37] focus:ring-0 text-black text-xl font-serif h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel className={`absolute left-0 transition-all duration-300 ${activeField === 'email' || field.value ? '-top-6 text-xs text-[#D4AF37]' : 'top-0 text-zinc-400 text-lg font-serif'}`}>
                            Your email address?
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onFocus={() => setActiveField('email')}
                              onBlur={() => setActiveField(null)}
                              className="bg-transparent border-0 border-b border-black/10 rounded-none px-0 py-2 focus:border-[#D4AF37] focus:ring-0 text-black text-xl font-serif h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel className={`absolute left-0 transition-all duration-300 ${activeField === 'phone' || field.value ? '-top-6 text-xs text-[#D4AF37]' : 'top-0 text-zinc-400 text-lg font-serif'}`}>
                            Phone number
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onFocus={() => setActiveField('phone')}
                              onBlur={() => setActiveField(null)}
                              className="bg-transparent border-0 border-b border-black/10 rounded-none px-0 py-2 focus:border-[#D4AF37] focus:ring-0 text-black text-xl font-serif h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel className={`absolute left-0 transition-all duration-300 ${activeField === 'subject' || field.value ? '-top-6 text-xs text-[#D4AF37]' : 'top-0 text-zinc-400 text-lg font-serif'}`}>
                            Type of Event?
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onFocus={() => setActiveField('subject')}
                              onBlur={() => setActiveField(null)}
                              className="bg-transparent border-0 border-b border-black/10 rounded-none px-0 py-2 focus:border-[#D4AF37] focus:ring-0 text-black text-xl font-serif h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="relative mt-8">
                        <FormLabel className={`absolute left-0 transition-all duration-300 ${activeField === 'message' || field.value ? '-top-6 text-xs text-[#D4AF37]' : 'top-0 text-zinc-400 text-lg font-serif'}`}>
                          Tell us about your story...
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            onFocus={() => setActiveField('message')}
                            onBlur={() => setActiveField(null)}
                            className="bg-transparent border-0 border-b border-black/10 rounded-none px-0 py-2 focus:border-[#D4AF37] focus:ring-0 text-black text-xl font-serif min-h-[100px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-8 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-black text-white px-12 py-8 text-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>Send Inquiry <ArrowRight className="ml-2 w-4 h-4" /></>
                      )}
                    </Button>
                  </div>

                </form>
              </Form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}