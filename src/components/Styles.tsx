import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, ImageIcon } from 'lucide-react'
import { markMountainSleeve, indyAngel, indyRamSkull } from '../assets'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * « Par style » - le client sait en dix secondes si la maison fait ce qu'il
 * cherche. Complète le filtre par artiste de la galerie. Quatre styles, gros
 * visuels, légende sobre. Le fine line de Zazz est en attente de photos.
 */
const STYLES = [
  { img: markMountainSleeve, name: 'Réalisme couleur', desc: 'Dégradés profonds, lumière, détail.', artist: 'Mark', accent: '#2B312E' },
  { img: indyAngel,          name: 'Noir & gris',      desc: 'Contraste, matière, relief.',       artist: 'Indy', accent: '#11998E' },
  { img: indyRamSkull,       name: 'Blackwork & graphique', desc: 'Aplats francs, trait affirmé.', artist: 'Indy', accent: '#11998E' },
  { img: '',                 name: 'Fine line & couleur douce', desc: 'Traits fins, motifs floraux.', artist: 'Zazz', accent: '#16745A' },
]

export default function Styles() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="styles" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">
        <SectionHeader
          kicker="Les styles"
          title={<>Et chacun <span className="italic-display text-gradient-green-static">son langage</span>.</>}
          lead="Réalisme, noir et gris, blackwork ou fine line. Voyez lequel vous ressemble, on vous oriente vers la bonne main."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {STYLES.map((s, i) => (
            <motion.a
              key={s.name}
              href="#galerie"
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease }}
              style={{ '--accent': s.accent } as React.CSSProperties}
              className="group relative block overflow-hidden rounded-2xl aspect-[3/4] bg-canvas-2 ring-1 ring-ink/5"
            >
              {s.img ? (
                <img
                  src={s.img}
                  alt={`Exemple de ${s.name}, par ${s.artist}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted">
                  <ImageIcon size={24} strokeWidth={1.5} style={{ color: s.accent }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest">Photo à venir</span>
                </div>
              )}

              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <span className="flex items-center gap-1.5 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/80">{s.artist}</span>
                </span>
                <h3 className="font-display text-lg md:text-xl font-500 text-canvas leading-tight">{s.name}</h3>
                <p className="font-sans text-[12.5px] text-canvas/70 mt-1 leading-snug">{s.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-sans text-[12px] font-600 text-canvas opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300">
                  Voir la galerie
                  <ArrowUpRight size={13} aria-hidden />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
