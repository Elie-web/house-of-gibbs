import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { HOUSE } from '../config'
import { useBooking } from '../booking'
import { logoFull } from '../assets'
import Magnetic from './Magnetic'

const ease = [0.22, 1, 0.36, 1] as const

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
          alt="Manchette réaliste forêt, montagnes et coucher de soleil, réalisée par Mark chez House of Gibbs"
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
        className="relative z-10 flex flex-col items-center text-center px-5 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Le logo, en gros plan : la première chose qu'on voit.
            Le monogramme et la typo « House of Gibbs » font partie du logo. */}
        <motion.img
          src={logoFull}
          alt="House of Gibbs"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease }}
          className="w-[clamp(220px,42vw,440px)] h-auto invert drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
          fetchPriority="high"
          decoding="async"
        />

        {/* Localisation, discrète, sous le logo */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-7 font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-white/80 text-shadow-sub"
        >
          {HOUSE.city} · {HOUSE.department} · sur rendez-vous
        </motion.p>

        {/* Intro d'accueil (texte fourni par Mark, version courte) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease }}
          className="mt-6 sm:mt-7 max-w-xl font-sans text-[15px] sm:text-[17px] leading-relaxed font-400 text-white/85 text-shadow-sub text-pretty"
        >
          Un collectif familial de tatoueurs basé en Savoie. Trois artistes aux
          univers complémentaires : Mark, Zaz et Indy.
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
            href="#galeries"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-600 text-white rounded-full border border-white/35 bg-white/5 backdrop-blur-md hover:bg-white/15 transition-colors duration-300"
          >
            Voir les galeries
          </a>
        </motion.div>

        {/* Ligne de repères sobre, sans avis : le métier parle de lui-même */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-white/65"
        >
          <span>~30 ans de métier</span>
          <span className="text-green-3" aria-hidden="true">·</span>
          <span>Studio privé, sur RDV</span>
          <span className="text-green-3" aria-hidden="true">·</span>
          <a
            href={`tel:${HOUSE.phoneRaw}`}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200"
            aria-label={`Appeler le ${HOUSE.phone}`}
          >
            <Phone size={11} strokeWidth={2} aria-hidden="true" />
            {HOUSE.phone}
          </a>
        </motion.p>
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
