import { Navbar } from '../components/Navbar'
import { Services } from '../components/Services'
import { Footer } from '../components/Footer'

export default function Capabilities() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <div className="pt-24">
                <Services />
            </div>
            <Footer />
        </div>
    )
}
