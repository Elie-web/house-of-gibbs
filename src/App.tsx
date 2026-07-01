import './App.css'
import { BookingProvider } from './booking'
import Grain from './components/Grain'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Artists from './components/Artists'
import Styles from './components/Styles'
import Gallery from './components/Gallery'
import Spotlight from './components/Spotlight'
import Process from './components/Process'
import Aftercare from './components/Aftercare'
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
          {/* 1. Accroche - CTA immédiat + preuve sociale intégrée (note Google + repères de confiance) */}
          <Hero />

          {/* 2. Qui va me tatouer - lien personnel, le collectif familial */}
          <Artists />

          {/* 4. Par style - le client trouve son langage en 10 s */}
          <Styles />

          {/* 5. Leur travail - valide la qualité */}
          <Gallery />

          {/* 6. Pièce en lumière - spotlight sombre façon galerie d'art */}
          <Spotlight />

          {/* 7. La preuve sociale - remontée : « ils sont bien notés » juste après le travail */}
          <Testimonials />

          {/* 8. Comment ça se passe - réduit l'anxiété */}
          <Process />

          {/* 9. Le soin - aftercare, prouve l'expertise */}
          <Aftercare />

          {/* 10. Le studio - l'expérience & le lieu */}
          <About />

          {/* 11. Rester en lien */}
          <Instagram />

          {/* 12. Lever les derniers doutes - juste avant de réserver */}
          <Faq />

          {/* 13. Le climax : venir & réserver */}
          <Contact />
        </main>

        <Footer />
        <FloatingCTA />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
