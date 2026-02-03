import { Navbar } from '../components/Navbar'
import { Portfolio } from '../components/Portfolio'
import { Awards } from '../components/Awards'
import { Footer } from '../components/Footer'

export default function Work() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <div className="pt-24">
                <Portfolio />
                <Awards />
            </div>
            <Footer />
        </div>
    )
}
