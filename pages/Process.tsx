import { Navbar } from '../components/Navbar'
import { Process as ProcessSection } from '../components/Process'
import { Footer } from '../components/Footer'

export default function Process() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-24">
                <ProcessSection />
            </div>
            <Footer />
        </div>
    )
}
