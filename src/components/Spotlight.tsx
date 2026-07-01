import { useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { markForearmPortrait, markChestSamurai, indyWomanWolf } from '../assets'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * « Pièce en lumière » - le seul moment sombre du site. Un spotlight façon
 * galerie d'art : une pièce signature à la fois, en grand, sur fond encre,
 * où la couleur du tatouage claque comme sur un mur de musée. Légende
 * éditoriale + vignettes pour passer d'une pièce à l'autre. Sobre, dramatique.
 */
const PIECES = [
  {
    img: markForearmPortrait,
    artist: 'Mark',
    handle: 'markblackscab',
    ig: 'https://www.instagram.com/markblackscab/',
    style: 'Réalisme couleur · avant-bras',
    text: "Un portrait réaliste posé sur un motif géométrique, le long de l'avant-bras. La couleur est posée pour garder son éclat des années plus tard.",
  },
  {
    img: indyWomanWolf,
    artist: 'Indy',
    handle: 'in_dtatts',
    ig: 'https://www.instagram.com/in_dtatts/',
    style: 'Réalisme graphique · manchette couleur',
    text: "Un visage et un loup remontent l'avant-bras, là où le réalisme rencontre le trait graphique. Une pièce qui n'existe qu'en un exemplaire.",
  },
  {
    img: markChestSamurai,
    artist: 'Mark',
    handle: 'markblackscab',
    ig: 'https://www.instagram.com/markblackscab/',
    style: 'Couleur graphique · pleine poitrine',
    text: "Une composition pleine poitrine, équilibrée trait par trait et validée avec le client avant la toute première aiguille.",
  },
]

export default function Spotlight() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const piece = PIECES[active]

  return (
    <section
      id="piece"
      ref={ref}
      className="relative overflow-hidden bg-ink text-canvas py-16 sm:py-24 md:py-32 px-5 md:px-10"
    >
      {/* halo de profondeur derrière l'image */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[min(900px,90vw)] aspect-square rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(79,162,136,0.18) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-container mx-auto">
        {/* En-tête (variante sombre du SectionHeader, pas de gradient-clip sur fond noir) */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease }}
            className="font-mono text-[11px] uppercase tracking-widest text-green-3 mb-5"
          >
            Pièce en lumière
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="font-display text-[clamp(2rem,5vw,3.6rem)] font-400 tracking-tight leading-[1.05] text-balance"
          >
            De plus près <span className="italic-display text-green-3">encore</span>.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="font-sans text-[15px] md:text-base text-ink-soft leading-relaxed max-w-xl mx-auto mt-5"
          >
            Quelques pièces de la maison, sorties de la grille. Sur fond noir, la couleur et le grain de la peau ressortent autrement.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image principale - crossfade au changement */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.8, ease }}
            className="relative w-full max-w-[520px] mx-auto lg:mx-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] ring-1 ring-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={piece.img}
                  alt={`${piece.style}, par ${piece.artist}`}
                  loading="lazy"
                  decoding="async"
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.55, ease }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Légende éditoriale */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-green-3">{piece.style}</span>
                <p className="font-display text-2xl md:text-[2rem] font-400 leading-[1.25] text-balance mt-4 mb-6">
                  {piece.text}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl font-500 text-canvas">{piece.artist}</span>
                  <span className="h-4 w-px bg-white/20" aria-hidden />
                  <a
                    href={piece.ig}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-mono text-[12px] text-ink-soft hover:text-green-3 transition-colors"
                  >
                    @{piece.handle}
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Vignettes - sélecteur de pièce */}
            <div className="flex items-center gap-3 mt-9 pt-8 border-t border-ink-line">
              {PIECES.map((p, i) => {
                const on = i === active
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Voir : ${p.style}, par ${p.artist}`}
                    aria-pressed={on}
                    className={`relative h-16 w-14 sm:h-[72px] sm:w-16 shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                      on ? 'ring-2 ring-green-3 ring-offset-2 ring-offset-ink' : 'opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img src={p.img} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                )
              })}
              <a
                href="#galerie"
                className="ml-auto group inline-flex items-center gap-1.5 font-sans text-[14px] font-600 text-canvas border-b border-green-3 pb-1 transition-[gap] hover:gap-2.5"
              >
                Toute la galerie
                <ArrowUpRight size={14} className="text-green-3" aria-hidden />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
