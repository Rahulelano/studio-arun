import { Navbar } from '../components/Navbar'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <div className="pt-24">
                <Contact />
            </div>
            <Footer />
        </div>
    )
}
