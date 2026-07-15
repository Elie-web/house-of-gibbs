import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * En-tête de section homogène et centré. Volontairement dépouillé :
 * juste un grand titre (grotesque display) révélé par masque. Le kicker
 * est optionnel et il n'y a plus de sous-titre — la différenciation entre
 * les passages se fait par le titre et la structure, pas par du texte en plus.
 */
export default function SectionHeader({
  kicker,
  title,
  className = 'mb-14 md:mb-20',
  align = 'center',
}: {
  kicker?: string
  title: ReactNode
  className?: string
  align?: 'center' | 'left'
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const centered = align === 'center'

  return (
    <div ref={ref} className={`${centered ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {kicker && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-widest text-green mb-5"
        >
          {kicker}
        </motion.p>
      )}

      {/* Titre révélé par masque (slide vertical) */}
      <div className="overflow-hidden pb-[0.14em] -mb-[0.14em]">
        <motion.h2
          initial={reduce ? false : { y: '115%' }}
          animate={inView ? { y: '0%' } : undefined}
          transition={{ duration: 0.85, delay: 0.08, ease }}
          className="font-display text-[clamp(2.4rem,6.5vw,4.6rem)] font-600 tracking-[-0.02em] text-ink leading-[0.98] text-balance"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  )
}
