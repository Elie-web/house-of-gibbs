import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, ArrowUpRight } from 'lucide-react'
import { REVIEWS, SOCIAL } from '../config'
import { GoogleG } from './icons'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} sur 5`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className={i < n ? 'fill-amber-400 text-amber-400' : 'fill-line text-line'} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = REVIEWS.find((r) => r.highlight) ?? REVIEWS[0]
  const rest = REVIEWS.filter((r) => r !== featured)

  return (
    <section id="avis" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10 bg-canvas-2/50 border-y border-line">
      <div className="max-w-container mx-auto">

        <SectionHeader
          className="mb-6 md:mb-7"
          kicker="Les avis"
          title={<>Ceux qui les portent <span className="italic-display text-gradient-green-static">en parlent mieux que nous</span>.</>}
          lead="Vous avez vu le travail. Voici la voix de celles et ceux qui le portent tous les jours."
        />

        {/* Note Google - prominente */}
        <motion.a
          href={SOCIAL.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="group mx-auto mb-14 md:mb-20 flex w-fit items-center gap-3.5 rounded-full border border-line bg-white pl-5 pr-4 py-2.5 shadow-card hover:shadow-luxe transition-shadow"
          aria-label={`${SOCIAL.rating} sur 5 sur Google, ${SOCIAL.reviewCount} avis`}
        >
          <Stars n={5} size={17} />
          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <span className="flex items-center gap-2">
            <GoogleG size={17} />
            <span className="font-display text-lg font-600 text-ink tabular leading-none">{SOCIAL.rating}</span>
            <span className="font-sans text-sm text-soft">· {SOCIAL.reviewCount} avis</span>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" className="text-muted group-hover:text-green transition-colors" />
        </motion.a>

        {/* Avis mis en avant */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-center max-w-4xl mx-auto mb-14 md:mb-16"
        >
          <blockquote className="font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-400 text-ink leading-[1.3] tracking-tight text-balance">
            <span className="text-gradient-green-static">«&nbsp;</span>
            {featured.text}
            <span className="text-gradient-green-static">&nbsp;»</span>
          </blockquote>
          <figcaption className="flex items-center justify-center gap-3 mt-7">
            <Stars n={featured.rating} />
            <span className="font-sans text-sm font-600 text-ink">{featured.name}</span>
            <span className="font-mono text-[11px] text-muted">{featured.date}</span>
          </figcaption>
        </motion.figure>

        {/* Autres avis - en cartes, centrés */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {rest.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
              className="flex flex-col items-center text-center rounded-2xl bg-white border border-line shadow-luxe p-7 md:p-8"
            >
              <Stars n={review.rating} />
              <blockquote className="font-sans text-base md:text-[17px] text-ink/80 leading-relaxed my-5 text-pretty">
                {review.text}
              </blockquote>
              <figcaption className="flex items-center gap-2.5 mt-auto">
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
          className="mt-12 text-center"
        >
          <a
            href={SOCIAL.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-sans text-sm font-600 text-ink border-b border-green pb-1 hover:gap-2.5 transition-[gap] duration-200"
          >
            Voir tous les avis sur Google
            <ArrowUpRight size={15} aria-hidden="true" className="text-green" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
