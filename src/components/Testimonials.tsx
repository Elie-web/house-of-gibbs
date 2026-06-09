import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, ArrowUpRight } from 'lucide-react'
import { REVIEWS, HOUSE } from '../config'

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} sur 5`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className={i < n ? 'fill-green text-green' : 'fill-line text-line'} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ease = [0.22, 1, 0.36, 1] as const

  const featured = REVIEWS.find((r) => r.highlight) ?? REVIEWS[0]
  const rest = REVIEWS.filter((r) => r !== featured)

  return (
    <section id="avis" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10 bg-canvas-2/50 border-y border-line">
      <div className="max-w-container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-5">Les avis</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-400 tracking-tight text-ink leading-[1.05]">
              Ils le portent <span className="italic-display text-gradient-green-static">depuis des années</span>.
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Stars n={5} />
            <span className="font-display text-2xl font-500 text-gradient-green-static tabular">5,0</span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted">avis Google</span>
          </div>
        </motion.div>

        {/* Citation mise en avant */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="border-t border-line pt-10 mb-12"
        >
          <blockquote className="font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-400 text-ink leading-[1.3] tracking-tight max-w-4xl text-balance">
            <span className="text-gradient-green-static">«&nbsp;</span>
            {featured.text}
            <span className="text-gradient-green-static">&nbsp;»</span>
          </blockquote>
          <figcaption className="flex items-center gap-3 mt-7">
            <Stars n={featured.rating} />
            <span className="font-sans text-sm font-600 text-ink">{featured.name}</span>
            <span className="font-mono text-[11px] text-muted">{featured.date}</span>
          </figcaption>
        </motion.figure>

        {/* Autres avis */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 border-t border-line pt-10">
          {rest.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease }}
            >
              <Stars n={review.rating} />
              <blockquote className="font-sans text-[15px] text-soft leading-relaxed my-4 max-w-md text-pretty">
                {review.text}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="font-sans text-sm font-600 text-ink">{review.name}</span>
                <span className="font-mono text-[11px] text-muted">{review.date}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="mt-12"
        >
          <a
            href={HOUSE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-sans text-sm font-600 text-ink border-b border-green pb-1 hover:gap-2.5 transition-all duration-200"
          >
            Voir tous les avis sur Google
            <ArrowUpRight size={15} className="text-green" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
