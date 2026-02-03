import { Navbar } from '../components/Navbar'
import { About } from '../components/About'
import { Footer } from '../components/Footer'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <div className="pt-24">
                <About />
            </div>
            <Footer />
        </div>
    )
}
