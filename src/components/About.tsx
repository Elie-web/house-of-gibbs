import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Mountain } from 'lucide-react'
import { useBooking } from '../booking'
import { heroLandscape } from '../assets'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

const STATS = [
  { k: '~30 ans', v: 'de métier' },
  { k: 'Sur RDV', v: 'uniquement' },
  { k: '1 projet', v: 'à la fois' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { openBooking } = useBooking()

  return (
    <section id="collectif" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">
        <SectionHeader
          kicker="Le studio"
          title={<>Tout ça, <span className="italic-display text-gradient-green-static">dans un studio rien qu'à vous</span>.</>}
          lead="Pas de passage, pas de bruit. Quand vous montez ici, le studio est à vous."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Vraie photo : la vue depuis le studio */}
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative overflow-hidden rounded-3xl shadow-luxe ring-1 ring-ink/5"
          >
            <img
              src={heroLandscape}
              alt="Vue sur la chaîne de Belledonne depuis le studio privé de House of Gibbs, à Saint-Baldoph"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/3] object-cover"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            <figcaption className="absolute left-4 bottom-4 flex items-center gap-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/40 pl-2.5 pr-4 py-2 shadow-card">
              <span className="w-7 h-7 rounded-full bg-green-tint flex items-center justify-center shrink-0">
                <Mountain size={14} strokeWidth={1.9} className="text-green-2" aria-hidden="true" />
              </span>
              <span className="font-sans text-[12.5px] font-600 text-ink leading-tight">
                Studio privé en hauteur · vue Belledonne
              </span>
            </figcaption>
          </motion.figure>

          {/* Texte - l'expérience, pas les coordonnées (elles vivent dans Contact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="flex flex-col"
          >
            <p className="font-sans text-[19px] md:text-[22px] text-ink leading-snug text-pretty font-500 mb-5">
              Sur rendez-vous uniquement. Ici, c'est votre projet qui compte.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] text-ink/70 leading-relaxed text-pretty mb-8">
              Pas de file d'attente, pas d'artiste pressé. Mark, Zazz et Indy prennent le temps :
              comprendre votre idée, la développer, en faire une pièce personnalisée, qui raconte
              votre histoire. Un travail soigné, dans un cadre calme, humain et accueillant, où
              l'on vous écoute dès la première rencontre. La vue sur Belledonne, elle, vient en prime.
            </p>

            <ul className="flex flex-wrap gap-x-8 gap-y-4 mb-9">
              {STATS.map((s) => (
                <li key={s.k} className="flex flex-col">
                  <span className="font-display text-2xl md:text-[1.7rem] font-500 text-ink leading-none">{s.k}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-soft mt-1.5">{s.v}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => openBooking()}
              className="group self-start inline-flex items-center gap-2 text-ink font-600 text-[15px] border-b-2 border-green pb-1 transition-[gap] duration-200 hover:gap-3.5 active:scale-[0.98]"
            >
              Prendre rendez-vous
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" className="text-green transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
