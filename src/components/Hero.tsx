import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ChevronDown, Mountain } from 'lucide-react'
import { HOUSE } from '../config'
import { useBooking } from '../booking'

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
      className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center"
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
        className="relative z-10 flex flex-col items-center text-center px-5 sm:px-6 max-w-3xl mx-auto"
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
          className="font-display font-400 text-white tracking-[-0.015em] leading-[1.06] text-[clamp(2.1rem,7vw,5.4rem)] text-shadow-hero text-balance"
        >
          Exceptional tattoos,<br />
          <span className="italic-display text-green-3">timeless memories.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-5 sm:mt-7 max-w-xl font-sans text-[15px] sm:text-[17px] leading-relaxed font-400 text-white/85 text-shadow-sub text-pretty"
        >
          {HOUSE.intro} Marc au réalisme, Isabelle au fine line, Indi au graphique.
          Ils tatouent en hauteur à {HOUSE.city} des pièces pensées pour traverser les décennies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82, ease }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <button
            onClick={() => openBooking()}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-ink text-sm font-600 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] hover:bg-green hover:text-white transition-colors duration-300 active:scale-[0.98]"
          >
            Prendre rendez-vous
            <ArrowRight size={16} strokeWidth={2.25} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
          <a
            href="#artistes"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-600 text-white rounded-full border border-white/35 bg-white/5 backdrop-blur-md hover:bg-white/15 transition-colors duration-300"
          >
            Voir les artistes
          </a>
        </motion.div>
      </motion.div>

      {/* Flèche de scroll */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        onClick={() => window.scrollBy({ top: window.innerHeight - 80, behavior: 'smooth' })}
        aria-label="Défiler vers le bas"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-white/55 hover:text-white transition-colors duration-300"
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
