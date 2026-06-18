import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * En-tête de section homogène et centré, réutilisé partout pour un rythme
 * identique d'une section à l'autre : kicker (mono) + titre serif révélé par
 * masque + lead. C'est ce qui donne la cohérence « maison » à tout le site.
 */
export default function SectionHeader({
  kicker,
  title,
  lead,
  className = 'mb-14 md:mb-20',
}: {
  kicker: string
  title: ReactNode
  lead?: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className={`text-center max-w-2xl mx-auto ${className}`}>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease }}
        className="font-mono text-[11px] uppercase tracking-widest text-green mb-5"
      >
        {kicker}
      </motion.p>

      {/* Titre révélé par masque (slide vertical) */}
      <div className="overflow-hidden pb-[0.14em] -mb-[0.14em]">
        <motion.h2
          initial={reduce ? false : { y: '115%' }}
          animate={inView ? { y: '0%' } : undefined}
          transition={{ duration: 0.85, delay: 0.08, ease }}
          className="font-display text-[clamp(2rem,5vw,3.6rem)] font-400 tracking-tight text-ink leading-[1.05] text-balance"
        >
          {title}
        </motion.h2>
      </div>

      {lead && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="font-sans text-[15px] md:text-base text-soft leading-relaxed max-w-xl mx-auto mt-5"
        >
          {lead}
        </motion.p>
      )}
    </div>
  )
}
