import './App.css'
import { BookingProvider } from './booking'
import Grain from './components/Grain'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Artists from './components/Artists'
import Gallery from './components/Gallery'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Instagram from './components/Instagram'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import BookingModal from './components/BookingModal'

export default function App() {
  return (
    <BookingProvider>
      {/* Texture + halos ambiants en fond (fixe, sous le contenu) */}
      <Grain />

      <div className="relative z-10 bg-transparent font-sans text-ink">
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <Navbar />

        <main id="contenu">
          {/* 1. Accroche — CTA immédiat + preuve sociale */}
          <Hero />

          {/* 2. Qui va me tatouer — lien personnel */}
          <Artists />

          {/* 3. Leur travail — valide la qualité */}
          <Gallery />

          {/* 4. Comment ça se passe — réduit l'anxiété */}
          <Process />

          {/* 5. La preuve sociale — crucial pour trafic Maps */}
          <Testimonials />

          {/* 6. L'histoire — contexte, moins prioritaire */}
          <About />

          {/* 7. Lever les derniers doutes */}
          <Faq />

          {/* 8. Rester en lien */}
          <Instagram />

          {/* 9. Le climax : venir & réserver */}
          <Contact />
        </main>

        <Footer />
        <FloatingCTA />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
