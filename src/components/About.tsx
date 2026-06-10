import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ARTISTS } from '../config'

const ease = [0.22, 1, 0.36, 1] as const

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="collectif" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10 bg-canvas">
      <div className="max-w-container mx-auto">

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-5">Le collectif</p>
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-400 tracking-tight text-ink leading-[1.06] mb-7">
              Une maison de famille, <span className="italic-display text-gradient-green-static">pas un salon</span> comme les autres.
            </h2>
            <div className="space-y-4 font-sans text-[15px] md:text-base text-soft leading-relaxed text-pretty">
              <p>
                House of Gibbs, c'est d'abord une famille. Marc tatoue depuis près de trente ans ;
                Isabelle l'a rejoint avec son trait fin et sa couleur ; Indi, leur fils, apporte
                la génération suivante et son langage graphique.
              </p>
              <p>
                Trois mains, trois styles, une même exigence : des pièces pensées pour durer,
                réalisées dans le calme d'un studio privé, jamais à la chaîne. Vous n'êtes pas
                un client de plus : vous entrez dans la maison.
              </p>
            </div>

            <blockquote className="relative pl-5 mt-9">
              <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full" style={{ background: 'linear-gradient(to bottom, #0E5340, #16745A, #11998E)' }} />
              <p className="font-display text-xl md:text-2xl font-400 italic-display text-ink leading-snug text-balance">
                « Exceptional tattoos, timeless memories. »
              </p>
              <footer className="font-mono text-[11px] uppercase tracking-wide text-muted mt-4">
                La devise de la maison
              </footer>
            </blockquote>
          </motion.div>

          {/* Mini-cartes des 3 rôles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="grid sm:grid-cols-3 gap-3.5"
          >
            {ARTISTS.map((a) => (
              <div
                key={a.id}
                style={{ '--accent': a.accent } as React.CSSProperties}
                className="relative rounded-2xl border border-line bg-white p-5 shadow-card overflow-hidden"
              >
                <span className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--accent)' }} />
                <p className="font-mono text-[9.5px] uppercase tracking-widest text-muted mb-3 mt-1">{a.role}</p>
                <p className="font-display text-2xl font-500 text-ink leading-none mb-1">{a.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide mb-4" style={{ color: 'var(--accent)' }}>@{a.handle}</p>
                <p className="font-sans text-[12.5px] text-soft leading-relaxed">{a.specialty}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
