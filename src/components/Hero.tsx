import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ChevronDown, Mountain, Star, Phone } from 'lucide-react'
import { HOUSE, SOCIAL, REASSURANCE } from '../config'
import { useBooking } from '../booking'
import Magnetic from './Magnetic'
import { GoogleG } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

// Repères de confiance affichés sous la note Google (hors note + hygiène)
const TRUST = REASSURANCE.filter((r) => r.icon !== 'star' && r.icon !== 'shield')

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { openBooking } = useBooking()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const scale    = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  const imageY   = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const fade     = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center py-28 sm:py-0"
    >
      {/* Photo de fond + parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={reduce ? undefined : { scale, y: imageY }}
      >
        <img
          src={HOUSE.heroImage}
          alt="Tatouage réaliste réalisé chez House of Gibbs"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Voile dégradé */}
      <div className="hero-overlay absolute inset-0" />

      {/* Contenu centré */}
      <motion.div
        style={reduce ? undefined : { opacity: fade, y: contentY }}
        className="relative z-10 flex flex-col items-center text-center px-5 sm:px-6 max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="inline-flex items-center gap-2.5 mb-7 pl-2.5 pr-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
        >
          <Mountain size={14} strokeWidth={2} className="text-green-3" />
          <span className="font-mono text-[10.5px] uppercase tracking-widest text-white/90">
            {HOUSE.city} · vue Belledonne
          </span>
        </motion.div>

        {/* Titre = slogan */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="font-display font-400 text-white tracking-[-0.015em] leading-[1.04] text-[clamp(1.85rem,7vw,5rem)] text-shadow-hero"
        >
          <span className="block whitespace-nowrap">Exceptional tattoos,</span>
          <span className="block whitespace-nowrap italic-display text-green-3">timeless memories.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-5 sm:mt-7 max-w-xl font-sans text-[15px] sm:text-[17px] leading-relaxed font-400 text-white/85 text-shadow-sub text-pretty"
        >
          Vous avez une idée en tête. On en fait une pièce que vous porterez toute votre vie. Réalisme, fine line ou graphique : ensemble, on trouve l'artiste fait pour votre projet. Studio privé à {HOUSE.city}, sur rendez-vous.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82, ease }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <Magnetic strength={0.4} className="w-full sm:w-auto">
            <button
              onClick={() => openBooking()}
              className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-ink text-sm font-600 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] hover:bg-green hover:text-white transition-colors duration-300 active:scale-[0.98]"
            >
              Prendre rendez-vous
              <ArrowRight size={16} strokeWidth={2.25} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </Magnetic>
          <a
            href="#galerie"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-600 text-white rounded-full border border-white/35 bg-white/5 backdrop-blur-md hover:bg-white/15 transition-colors duration-300"
          >
            Voir la galerie
          </a>
        </motion.div>

        {/* Preuve sociale — un seul bloc typographique soigné, pas une pile de pilules */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease }}
          className="mt-9 flex flex-col items-center gap-3"
        >
          {/* Note Google — lockup mis en valeur */}
          <a
            href={SOCIAL.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-white"
            aria-label={`${SOCIAL.rating} sur 5 sur Google, ${SOCIAL.reviewCount} avis`}
          >
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={17} className="fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="font-display text-xl font-600 leading-none tracking-tight">{SOCIAL.rating}</span>
            <span className="h-4 w-px bg-white/25" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 text-[13px] text-white/75">
              <GoogleG size={14} />
              <span className="border-b border-transparent group-hover:border-white/40 transition-colors">
                {SOCIAL.reviewCount} avis Google
              </span>
            </span>
          </a>

          {/* Repères + téléphone — fine ligne pointée, aucune pilule */}
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-white/60">
            {TRUST.map((r, i) => (
              <span key={r.title} className="inline-flex items-center">
                {i > 0 && <span className="mr-2.5 text-green-3" aria-hidden="true">·</span>}
                {r.title}
              </span>
            ))}
            <span className="text-green-3" aria-hidden="true">·</span>
            <a
              href={`tel:${HOUSE.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors duration-200"
              aria-label={`Appeler le ${HOUSE.phone}`}
            >
              <Phone size={11} strokeWidth={2} aria-hidden="true" />
              {HOUSE.phone}
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Flèche de scroll */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        onClick={() => window.scrollBy({ top: window.innerHeight - 80, behavior: 'smooth' })}
        aria-label="Défiler vers le bas"
        className="hidden sm:block absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-white/55 hover:text-white transition-colors duration-300"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown strokeWidth={1.25} size={28} />
        </motion.span>
      </motion.button>
    </section>
  )
}
