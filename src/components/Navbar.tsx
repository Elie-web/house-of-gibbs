import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Menu, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useBooking } from '../booking'
import { HOUSE } from '../config'

const NAV_LINKS = [
  { label: 'Le collectif', href: '#collectif' },
  { label: 'Les artistes', href: '#artistes' },
  { label: 'Galerie',      href: '#galerie' },
  { label: 'Le studio',    href: '#studio' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { openBooking } = useBooking()

  // Reste transparent (texte blanc) sur tout le hero plein écran, puis
  // bascule en barre claire une fois le hero dépassé — pas de flash de contraste.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const trigger = typeof window !== 'undefined' ? window.innerHeight * 0.82 : 600
    setScrolled(y > trigger)
  })

  // Verrouille le scroll de la page + ferme à Échap quand le menu est ouvert
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'bg-canvas/90 backdrop-blur-md border-b border-line shadow-[0_4px_24px_-18px_rgba(21,32,27,0.5)] py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-container mx-auto px-5 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="group flex items-baseline gap-2">
            <span className={`font-display text-[1.4rem] font-500 tracking-tight leading-none transition-colors duration-300 ${scrolled ? 'text-ink' : 'text-white'}`}>
              House of Gibbs
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-green group-hover:scale-125 transition-transform duration-300" />
          </a>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-sans text-[13.5px] font-500 transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-green after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? 'text-soft hover:text-ink' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <button
            onClick={() => openBooking()}
            className={`hidden lg:inline-flex items-center gap-2 pl-5 pr-4 py-2.5 text-[13px] font-600 rounded-full transition-colors duration-300 active:scale-[0.98] ${
              scrolled
                ? 'bg-ink text-canvas hover:bg-green'
                : 'bg-white/10 text-white border border-white/30 backdrop-blur-md hover:bg-white/20'
            }`}
          >
            Prendre rendez-vous
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`lg:hidden w-11 h-11 -mr-2 flex items-center justify-center transition-colors hover:text-green ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>
      </motion.header>

      {/* Menu mobile — feuille compacte qui descend sous l'en-tête.
          Hauteur = contenu (jamais plein écran) : reste lisible même
          dans un aperçu qui aplatit les éléments `position: fixed`. */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/45 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="sheet"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 inset-x-0 z-[70] bg-white border-b border-line shadow-[0_24px_60px_-30px_rgba(21,32,27,0.5)] lg:hidden"
            >
              <div className="flex items-center justify-between px-5 sm:px-6 h-[64px] border-b border-line">
                <span className="font-display text-lg font-500 text-ink">House of Gibbs</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-11 h-11 -mr-2 flex items-center justify-center text-soft hover:text-ink transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="px-5 sm:px-6 py-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between gap-4 py-3.5 border-b border-line last:border-b-0"
                  >
                    <span className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[11px] text-green tracking-widest">0{i + 1}</span>
                      <span className="font-display text-2xl font-400 text-ink transition-colors duration-200 group-hover:text-green">
                        {link.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted transition-all duration-200 group-hover:text-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </motion.a>
                ))}
              </nav>

              <div className="px-5 sm:px-6 pt-4 pb-6 space-y-4">
                <button
                  onClick={() => { setMenuOpen(false); openBooking() }}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-ink text-canvas font-600 rounded-full text-[15px] transition-colors duration-300 hover:bg-green active:scale-[0.98]"
                >
                  Prendre rendez-vous
                  <ArrowRight size={16} strokeWidth={2.25} />
                </button>
                <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                  <a href={`tel:${HOUSE.phoneRaw}`} className="hover:text-green transition-colors">
                    {HOUSE.phone}
                  </a>
                  <span className="tracking-wide">{HOUSE.city} · {HOUSE.department}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
