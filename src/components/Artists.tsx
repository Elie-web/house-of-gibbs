import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Images } from 'lucide-react'
import { ARTISTS } from '../config'
import { InstagramIcon } from './icons'
import { useBooking } from '../booking'

const ease = [0.22, 1, 0.36, 1] as const

export default function Artists() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { openBooking } = useBooking()

  return (
    <section id="artistes" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10 bg-canvas">
      <div className="max-w-container mx-auto">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-5">Les artistes</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-400 tracking-tight text-ink leading-[1.05]">
            Une famille, <span className="italic-display text-gradient-green-static">trois signatures</span>.
          </h2>
          <p className="font-sans text-[15px] md:text-base text-soft leading-relaxed mt-5">
            Chacun son style, sa main, son univers. Choisissez l'artiste dont le travail
            vous parle — ou laissez-nous vous orienter.
          </p>
        </motion.div>

        {/* Cartes artistes */}
        <div className="space-y-5 md:space-y-7">
          {ARTISTS.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
              style={{ '--accent': a.accent } as React.CSSProperties}
              className={`group grid md:grid-cols-[0.85fr_1.15fr] gap-6 md:gap-10 items-center bg-white rounded-3xl border border-line p-5 md:p-7 shadow-card ${
                i % 2 === 1 ? 'md:[&>figure]:order-2' : ''
              }`}
            >
              {/* Portrait */}
              <figure className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[5/6] bg-canvas-2">
                <img
                  src={a.portrait}
                  alt={`${a.name}, alias ${a.handle}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <span
                  className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  {a.role}
                </span>
              </figure>

              {/* Texte */}
              <div className="md:pr-6">
                <div className="flex items-baseline gap-3 flex-wrap mb-1">
                  <h3 className="font-display text-3xl md:text-4xl font-500 text-ink leading-none">{a.name}</h3>
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: 'var(--accent)' }}
                  >
                    @{a.handle}
                  </span>
                </div>
                <p className="font-sans text-[13px] font-600 text-soft mb-5">{a.specialty}</p>

                <p className="font-sans text-[15px] text-soft leading-relaxed mb-7 max-w-xl text-pretty">
                  {a.bio}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openBooking(a.id)}
                    className="group/btn inline-flex items-center gap-2 pl-5 pr-4 py-3 text-canvas text-sm font-600 rounded-full transition-transform active:scale-[0.98]"
                    style={{ background: 'var(--accent)' }}
                  >
                    Réserver avec {a.name}
                    <ArrowRight size={15} strokeWidth={2.25} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                  <a
                    href={`#galerie`}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-600 text-ink rounded-full border border-line hover:bg-canvas-2 transition-colors"
                  >
                    <Images size={15} strokeWidth={2} />
                    Galerie
                  </a>
                  <a
                    href={a.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center text-ink rounded-full border border-line hover:bg-canvas-2 transition-colors"
                    aria-label={`Instagram de ${a.name}`}
                  >
                    <InstagramIcon size={17} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
