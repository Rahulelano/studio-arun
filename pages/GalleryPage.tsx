import { Navbar } from '../components/Navbar'
import { Gallery } from '../components/Gallery'
import { Footer } from '../components/Footer'

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <Gallery />
            <Footer />
        </div>
    )
}
