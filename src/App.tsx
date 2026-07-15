import './App.css'
import { BookingProvider } from './booking'
import Grain from './components/Grain'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Artists from './components/Artists'
import Gallery from './components/Gallery'
import Process from './components/Process'
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
          {/* 1. Accroche — le nom de la maison + CTA immédiat */}
          <Hero />

          {/* 2. Les artistes — la famille, chacun lié à sa galerie */}
          <Artists />

          {/* 3. Les galeries — une par artiste, à la suite (fond vert) */}
          <Gallery />

          {/* 4. Comment ça se passe — réduit l'anxiété */}
          <Process />

          {/* 5. Le studio — l'expérience & le lieu (fond vert) */}
          <About />

          {/* 6. Rester en lien */}
          <Instagram />

          {/* 7. Lever les derniers doutes */}
          <Faq />

          {/* 8. Prendre contact — sans formulaire */}
          <Contact />
        </main>

        <Footer />
        <FloatingCTA />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
