import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import Work from './pages/Work'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import Capabilities from './pages/Capabilities'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import { MusicPlayer } from './components/MusicPlayer'

import AdLandingPage from './pages/AdLandingPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <MusicPlayer />
      <Toaster position="top-center" richColors theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/services" element={<Capabilities />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book-now" element={<AdLandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}