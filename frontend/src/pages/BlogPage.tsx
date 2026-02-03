import { Navbar } from '../components/Navbar'
import { Blog as BlogSection } from '../components/Blog'
import { Footer } from '../components/Footer'

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <div className="pt-24">
                <BlogSection />
            </div>
            <Footer />
        </div>
    )
}
