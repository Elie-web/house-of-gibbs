import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Mountain } from 'lucide-react'
import { useBooking } from '../booking'
import { heroLandscape } from '../assets'

const ease = [0.22, 1, 0.36, 1] as const

const STATS = [
  { k: '~30 ans', v: 'de métier' },
  { k: 'Sur RDV', v: 'uniquement' },
  { k: '1 projet', v: 'à la fois' },
]

/**
 * « Le studio » : section verte (fond chaud), en alternance avec les sections
 * blanches. Présente le lieu et l'esprit maison. Une vidéo / photo du salon
 * remplacera l'image de placeholder dès que Mark l'aura envoyée.
 */
export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const { openBooking } = useBooking()

  return (
    <section id="collectif" ref={ref} className="bg-green-bg text-canvas py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">
        {/* En-tête clair (sur fond vert) */}
        <div className="overflow-hidden pb-[0.14em] -mb-[0.14em] mb-14 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={reduce ? false : { y: '115%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{ duration: 0.85, delay: 0.08, ease }}
            className="font-display text-[clamp(2.4rem,6.5vw,4.6rem)] font-600 tracking-[-0.02em] text-canvas leading-[0.98] text-balance"
          >
            Un studio <span className="text-green-3">rien qu'à vous</span>.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Photo du studio (placeholder en attendant la vidéo / les photos du salon) */}
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative overflow-hidden rounded-3xl shadow-luxe ring-1 ring-white/10"
          >
            <img
              src={heroLandscape}
              alt="Le studio privé de House of Gibbs, à Saint-Baldoph"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/3] object-cover"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-green-bg/60 via-transparent to-transparent" />
            <figcaption className="absolute left-4 bottom-4 flex items-center gap-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/40 pl-2.5 pr-4 py-2 shadow-card">
              <span className="w-7 h-7 rounded-full bg-green-tint flex items-center justify-center shrink-0">
                <Mountain size={14} strokeWidth={1.9} className="text-green-2" aria-hidden="true" />
              </span>
              <span className="font-sans text-[12.5px] font-600 text-ink leading-tight">
                Studio privé, sur rendez-vous
              </span>
            </figcaption>
          </motion.figure>

          {/* Texte : l'expérience, pas les coordonnées (elles vivent dans Contact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="flex flex-col"
          >
            <p className="font-sans text-[19px] md:text-[22px] text-canvas leading-snug text-pretty font-500 mb-5">
              Sur rendez-vous uniquement. Ici, c'est votre projet qui compte.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] text-ink-soft leading-relaxed text-pretty mb-8">
              Chaque projet est abordé avec la même exigence : prendre le temps de comprendre
              votre idée, la développer et créer un tatouage unique, pensé pour vous. Chez House
              of Gibbs, nous privilégions les projets personnalisés et les tatouages qui racontent
              une histoire. Notre objectif est simple : proposer un travail de qualité dans un
              environnement calme, humain et accueillant, où chaque client se sent écouté dès la
              première rencontre.
            </p>

            <ul className="flex flex-wrap gap-x-8 gap-y-4 mb-9">
              {STATS.map((s) => (
                <li key={s.k} className="flex flex-col">
                  <span className="font-display text-2xl md:text-[1.7rem] font-500 text-canvas leading-none">{s.k}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-green-3 mt-1.5">{s.v}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => openBooking()}
              className="group self-start inline-flex items-center gap-2 text-canvas font-600 text-[15px] border-b-2 border-green-3 pb-1 transition-[gap] duration-200 hover:gap-3.5 active:scale-[0.98]"
            >
              Prendre rendez-vous
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" className="text-green-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
