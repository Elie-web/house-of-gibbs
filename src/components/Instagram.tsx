import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ARTISTS } from '../config'
import { InstagramIcon } from './icons'
import SectionHeader from './SectionHeader'

// Un échantillon par artiste pour la bande défilante
const FEED = ARTISTS.flatMap((a) =>
  a.gallery.slice(0, 3).map((g) => ({ src: g.src, alt: g.alt, href: a.instagram, accent: a.accent, name: a.name })),
)

export default function Instagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="instagram" ref={ref} className="py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-container mx-auto px-5 md:px-10">

        <SectionHeader
          className="mb-8"
          kicker="Instagram"
          title={<>Entre deux séances, <span className="italic-display text-gradient-green-static">ça continue ici</span>.</>}
          lead="La maison ne s'arrête pas à la porte du studio. Suivez chaque artiste au quotidien."
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mb-10"
        >
          {/* Liens profils par artiste */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {ARTISTS.map((a) => (
              <a
                key={a.id}
                href={a.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--accent': a.accent } as React.CSSProperties}
                className="group inline-flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full border border-line bg-white hover:border-[var(--accent)] transition-colors"
              >
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--accent)' }}>
                  <InstagramIcon size={14} strokeWidth={2.25} />
                </span>
                <span className="font-sans text-[13px] font-600 text-ink">@{a.handle}</span>
                <ArrowUpRight size={14} aria-hidden="true" className="text-muted group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[transform,color]" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Carousel contenu - cartes qui défilent, jamais collées au bord */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory no-scrollbar"
        >
          {FEED.map((post, i) => (
            <a
              key={`${post.src}-${i}`}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--accent': post.accent } as React.CSSProperties}
              className="group relative shrink-0 snap-start w-[72%] sm:w-[45%] lg:w-[31.5%] aspect-square rounded-2xl overflow-hidden bg-canvas-2 border border-line shadow-luxe"
            >
              <img src={post.src} alt={post.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300">
                <InstagramIcon size={24} className="text-canvas opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="absolute left-3 bottom-3 font-mono text-[10px] uppercase tracking-wide text-canvas opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                {post.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
