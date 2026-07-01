import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Images, MapPin, ImageIcon } from 'lucide-react'
import { ARTISTS } from '../config'
import { InstagramIcon, FacebookIcon } from './icons'
import { useBooking } from '../booking'
import Magnetic from './Magnetic'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

export default function Artists() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { openBooking } = useBooking()

  return (
    <section id="artistes" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">

        {/* En-tête */}
        <SectionHeader
          kicker="Les artistes"
          title={<>Père, mère, fils. <span className="italic-display text-gradient-green-static">Trois mains, un seul studio.</span></>}
          lead="Mark, Zazz et Indy. Une même passion du tatouage, trois univers complémentaires, et à chacun sa façon bien à lui de marquer la peau."
        />

        {/* Cartes artistes */}
        <div className="space-y-5 md:space-y-7">
          {ARTISTS.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
              style={{ '--accent': a.accent } as React.CSSProperties}
              className="group grid md:grid-cols-[260px_1fr] gap-6 md:gap-10 items-center bg-white/70 backdrop-blur-sm rounded-3xl border border-line p-5 md:p-7 shadow-luxe transition-shadow duration-400 hover:shadow-luxe-hover"
            >
              {/* Portrait */}
              <figure className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-canvas-2 w-full md:max-w-[260px] mx-auto">
                {a.portrait ? (
                  <img
                    src={a.portrait}
                    alt={`${a.name}, alias ${a.handle}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted">
                    <ImageIcon size={26} strokeWidth={1.5} style={{ color: a.accent }} />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Photo à venir</span>
                  </div>
                )}
                <span
                  className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  {a.role}
                </span>
              </figure>

              {/* Texte */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-3 flex-wrap mb-1">
                  <h3 className="font-display text-3xl md:text-4xl font-500 text-ink leading-none">{a.name}</h3>
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: 'var(--accent)' }}
                  >
                    @{a.handle}
                  </span>
                </div>
                <p className="font-sans text-sm font-600 text-green-2 mb-5">{a.specialty}</p>

                <p className="font-sans text-base md:text-[17px] text-ink/75 leading-relaxed mb-7 max-w-xl mx-auto md:mx-0 text-pretty">
                  {a.bio}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Magnetic strength={0.3}>
                    <button
                      onClick={() => openBooking(a.id)}
                      className="group/btn inline-flex items-center gap-2 pl-5 pr-4 py-3 text-canvas text-sm font-600 rounded-full shadow-[0_14px_30px_-14px_var(--accent)] transition-transform active:scale-[0.98]"
                      style={{ background: 'var(--accent)' }}
                    >
                      Réserver avec {a.name}
                      <ArrowRight size={15} strokeWidth={2.25} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </Magnetic>
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
                    className="w-11 h-11 flex items-center justify-center text-ink rounded-full border border-line hover:bg-canvas-2 hover:border-ink transition-colors"
                    aria-label={`Instagram de ${a.name}`}
                  >
                    <InstagramIcon size={17} strokeWidth={2} />
                  </a>
                  {a.facebook && (
                    <a
                      href={a.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center text-ink rounded-full border border-line hover:bg-canvas-2 hover:border-ink transition-colors"
                      aria-label={`Facebook de ${a.name}`}
                    >
                      <FacebookIcon size={17} strokeWidth={2} />
                    </a>
                  )}
                  {a.maps && (
                    <a
                      href={a.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center text-ink rounded-full border border-line hover:bg-canvas-2 hover:border-ink transition-colors"
                      aria-label={`${a.name} sur Google Maps`}
                    >
                      <MapPin size={17} strokeWidth={2} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
