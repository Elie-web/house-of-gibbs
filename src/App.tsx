import './App.css'
import { BookingProvider } from './booking'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Artists from './components/Artists'
import Gallery from './components/Gallery'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Instagram from './components/Instagram'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import BookingModal from './components/BookingModal'

export default function App() {
  return (
    <BookingProvider>
      <div className="bg-canvas font-sans text-ink">
        <Navbar />

        <main>
          {/* 1. Accroche — slogan + trio */}
          <Hero />

          {/* 2. Le collectif familial */}
          <About />

          {/* 3. Les trois artistes */}
          <Artists />

          {/* 4. Galerie photo/vidéo par artiste */}
          <Gallery />

          {/* 5. Le déroulé */}
          <Process />

          {/* 6. Avis clients */}
          <Testimonials />

          {/* 7. Instagram */}
          <Instagram />

          {/* 8. Le studio + prise de RDV */}
          <Contact />
        </main>

        <Footer />
        <FloatingCTA />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
