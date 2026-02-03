import { Navbar } from '../components/Navbar'
import { BlogPostDetail } from '../components/BlogPostDetail'
import { Footer } from '../components/Footer'

export default function BlogPostPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            {/* No pt-24 here because BlogPostDetail has a hero image that should go under the navbar ideally, 
                or we can add it if the design expects it. The Hero in BlogPostDetail uses h-[60vh] so it should probably sit behind or start below.
                However, Navbar is fixed, so content starts at top.
            */}
            <BlogPostDetail />
            <Footer />
        </div>
    )
}
