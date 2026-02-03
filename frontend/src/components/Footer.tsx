'use client'

export function Footer() {
  const aiTools = [
    'Runway Gen-4',
    'Kling 2',
    'Veo 3',
    'Higgsfield AI',
    'Hailuo Minimax 2',
    'Midjourney',
    'Leonardo AI',
    'Krea AI',
    'Runway',
    'Suno AI',
    'ElevenLabs'
  ]

  return (
    <footer className="relative py-12 bg-white text-black border-t border-black/10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo and Description Compact */}
          <div className="text-center md:text-left">
            <div className="font-serif italic font-bold text-black text-2xl tracking-tighter mb-2">
              ARUN PRASAD PHOTOGRAPHY.
            </div>
            <p className="text-black/70 text-sm font-serif italic">
              Visual Legacy. Timeless.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/ARUNPhotography27/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 hover:text-[#D4AF37] hover:scale-110 gentle-animation cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.576h4.982l-.532 3.667h-4.45v7.98h-4.946z" />
              </svg>
            </a>



            {/* Instagram */}
            <a
              href="https://www.instagram.com/arun_prasad_photography/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 hover:text-[#D4AF37] hover:scale-110 gentle-animation cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>


          </div>
        </div>

        {/* Bottom Bar - Minimal */}
        <div className="border-t border-black/5 pt-4 mt-6 text-center text-xs text-black/40">
          © 2026 ARUN PRASAD PHOTOGRAPHY. All rights reserved.
        </div>
      </div>
    </footer>
  )
}